<template>
  <button :class="['login-broker-button', `login-broker-${platform}-button`]" @click="startLoginProcess">
    <i :class="['fab', `fa-${platform}`]"></i>
    Login with {{ platform }}
  </button>
</template>

<script setup lang="ts">
import useLoginBroker from './useLoginBroker';

const { platform, tenantName } = defineProps(['platform', 'tenantName']);
const emit = defineEmits(['onSessionReceived', 'onErrorReceived']);
const { startLoginProcess } = useLoginBroker(tenantName, platform, emit);

</script>

<style scoped>
.hide-when-logged-in {
    display: none
}

.show-when-logged-in {
    display: none
}

.fab {
    width: 20px;
}

.login-broker-button {
    padding: 10px 20px;
    padding-left: 35px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: left;
    /* Center the content horizontally */
    width: 250px;
    /* Make the buttons occupy the same width */
    margin-bottom: 10px;
    /* Add spacing between buttons */
}

.login-broker-button i {
    margin-right: 10px;
}

/* Specific styles for Google login */
.login-broker-google-button {
    background-color: #DB4437;
    color: white;
}

/* Specific styles for Facebook login */
.login-broker-facebook-button {
    background-color: #4267B2;
    color: white;
}

/* Specific styles for GitHub login */
.login-broker-github-button {
    background-color: #333;
    color: white;
}

/* Specific styles for Microsoft login */
.login-broker-microsoft-button {
    background-color: #00A4EF;
    color: white;
}

/* Specific styles for Apple login */
.login-broker-apple-button {
    background-color: #000;
    color: white;
}

/* Specific styles for Twitter login */
.login-broker-twitter-button {
    background-color: #1DA1F2;
    color: white;
}

/* Specific styles for Linkedin login */
.login-broker-linkedin-button {
    background-color: #0077B5;
    color: white;
}
</style>