<template>
  <router-view/>
</template>
<script>
import axios from 'axios';
import net from './services/http';

export default {
  created() {
    net.httpSec.interceptors.response.use(undefined, (err) => {
      return new Promise(() => {
        if(err.response.status === 401 && err.response.config && !err.response.config._isRetryRequest) {
          this.$store.dispatch('signout')
          .then(()=> this.$router.push('/signin'));
        }
        throw err;
      });
    });
  }
}
</script>
<style>
  @import url('./style/colors.css');

  * {
    margin: 0px;
    font-family: 'SF Pro Display';
  }
  a {
      text-decoration: none;
      color: inherit;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .loader {
    position: relative;
  }
  .loader div {
    position: absolute;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .loader div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .loader div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .loader div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .loader div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }

  
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  .custom_scroll::-webkit-scrollbar {
    width: 10px;
    background: none;
  }
  .custom_scroll::-webkit-scrollbar-track {
    padding: 5% 0;
  }
  .custom_scroll::-webkit-scrollbar-thumb {
    background: var(--paper-grey-300);
    border-radius: 5px;
    cursor: pointer !important;
  }
  
</style>
