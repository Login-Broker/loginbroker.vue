<template>
  <div class="App">
    <LoginBrokerButton platform="google" tenantName="loginbroker" @onSessionReceived="handleSessionReceived" @onErrorReceived="handleErrorReceived" />
    <LoginBrokerButton platform="github" tenantName="loginbroker" @onSessionReceived="handleSessionReceived" @onErrorReceived="handleErrorReceived" />
  </div>
</template>
<script lang="ts">
import LoginBrokerButton from '../lib/LoginBrokerButton.vue';

export default {
  components: {
    LoginBrokerButton,
  },
  methods: {
    handleSessionReceived(sessionId: string) {
      console.log('Received sessionId', sessionId);
      // Perform further action
      // window.location.href = "https://login.broker/";
    },
    handleErrorReceived(error: any) {
      console.log('Error happened', error);
    },
  },
};
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
