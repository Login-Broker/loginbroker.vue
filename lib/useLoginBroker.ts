import { ref, watch, onMounted, Ref } from 'vue';

const generateRandomString = (length: number): string => {
  const allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    const randomChar = allowedChars.charAt(randomIndex);
    randomString += randomChar;
  }

  return randomString;
};

export default function useLoginBroker(
  tenantName: string,
  platform: string,
  onSessionReceived: (sessionId: string | null) => void,
  onErrorReceived: (error: string) => void
): {
  sessionId: Ref<string | null>;
  startLoginProcess: () => void;
} {
  const sessionId = ref<string | null>(null);

  const confirmLogin = (): void => {
    fetchStatus(sessionId.value);
  };

  const fetchStatus = (currentSessionId: string | null): void => {
    console.log('fetchStatus starting');
    console.log('currentSessionId:', currentSessionId);
    if (currentSessionId) {
      fetch(`https://api.login.broker/${tenantName}/auth/status/${currentSessionId}`)
        .then((response) => response.text())
        .then(handleStatusResponse)
        .catch(handleError);
    }
  };

  const MAX_RETRY_COUNT = 60;
  let retryCount = 0;
  let hasBeenPending = false;

  const handleStatusResponse = (data: string): void => {
    if (data === 'completed') {
      onSessionReceived(sessionId.value);
    } else if (data === 'failed') {
      console.log('Login failed. Try again');
      onErrorReceived(data);
    } else if (data === 'pending') {
      hasBeenPending = true;
      retryLoginOrGiveUp();
    } else if (hasBeenPending) {
      console.log('Session expired');
      onErrorReceived(data);
    } else {
      console.log('Session not yet available');
      retryLoginOrGiveUp();
    }
  };

  const retryLoginOrGiveUp = (): void => {
    if (retryCount < MAX_RETRY_COUNT) {
      retryCount++;
      setTimeout(confirmLogin, 2000);
    } else {
      console.log('Max retries reached while pending. Giving up.');
      onErrorReceived('Max retries reached while pending. Giving up.');
    }
  };

  const handleError = (error: string): void => {
    console.error(error);
    onErrorReceived(error);
  };

  const startLoginProcess = (): void => {
    const newSessionId = generateRandomString(15);
    window.open(`https://${platform}.login.broker/${tenantName}/auth/${platform}/session/${newSessionId}`);
    
    setTimeout(() => {
      sessionId.value = newSessionId;
    }, 2000);
  };

  onMounted(() => {
    if (sessionId.value) {
      fetchStatus(sessionId.value);
    }
  });

  watch(sessionId, (newVal) => {
    if (newVal) {
      fetchStatus(newVal);
    }
  });

  return {
    sessionId,
    startLoginProcess,
  };
}