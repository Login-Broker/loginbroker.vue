# vue-login-broker-library

Use Login Broker (https://login.broker) to login to your app or website with facebook, google, linkedin, microsoft, apple or github. Sign up for free and get 100,000 monthly active users. No credit card required.

Please note that after the user logs in, this will produce a 'sessionId'. This must be verified on your server-side to complete the authentication.

Get a free API key here and also see the details about how to call the api to verify:
https://login.broker/account/

## Installation

```
npm install vue-login-broker-library
```

## Usage

```
  <template>
    <div class="App">
      <LoginBrokerButton platform="google" tenantName="loginbroker" @onSessionReceived="handleSessionReceived" @onErrorReceived="handleErrorReceived" />
      <LoginBrokerButton platform="github" tenantName="loginbroker" @onSessionReceived="handleSessionReceived" @onErrorReceived="handleErrorReceived" />
    </div>
  </template>
  <script lang="ts">
  import { LoginBrokerButton } from 'vue-login-broker-library';
  import 'vue-login-broker-library/dist/style.css';

  export default {
    components: {
      LoginBrokerButton,
    },
    methods: {
      handleSessionReceived(sessionId: any) {
        debugger
        console.log('Received sessionId', sessionId);
        // Perform further action
        // window.location.href = "https://login.broker/";
      },
      handleErrorReceived(error: any) {
        debugger
        console.log('Error happened', error);
      },
    },
  };
  </script>
```