<template>
  <div class="live_class">
    <div id="video_chat_wrapper"></div>
  </div>
</template>

<script>

import { VideoSDKMeeting } from "@videosdk.live/rtc-js-prebuilt";

export default {
  data() {
    
    const isStudent = (this.$store.getters.userData.role == 'student') ?true :false,
          clientId = this.$store.getters.classData.id,
          title = this.$store.getters.classData.title,
          username = this.$store.getters.userData.fullname,
          VIDEO_SDK_API_KEY = process.env.VUE_APP_VIDEO_SDK_API,
          REDIRECT_URL_FOR_STUDENT = process.env.VUE_APP_VIDEO_SDK_API_REDIRECT_STUDENT_URL,
          REDIRECT_URL_FOR_TUTOR = process.env.VUE_APP_VIDEO_SDK_API_REDIRECT_TUTOR_URL,
          SERVER_RECORDING_WEB_HOOK_URL = process.env.VUE_APP_VIDEO_SDK_API_RECORDING_WEB_HOOK_URL,

  
          config = {

            name: this.capitalize(username),
            meetingId: clientId,
            apiKey: VIDEO_SDK_API_KEY,

            containerId: 'video_chat_wrapper',

            micEnabled: true,
            webcamEnabled: true,
            
            participantCanToggleSelfWebcam: true,
            participantCanToggleSelfMic: true,
            participantCanLeave: true,

            chatEnabled: true,
            screenShareEnabled: true,

            redirectOnLeave: (isStudent) ?REDIRECT_URL_FOR_STUDENT :REDIRECT_URL_FOR_TUTOR,

            recordingEnabled: true,
            recordingWebhookUrl: SERVER_RECORDING_WEB_HOOK_URL + clientId,
            permissions: {
              toggleRecording: false,
              endMeeting: (isStudent) ?false :true,
            },

          };

    return { config }
  },
  methods: {
    capitalize(text) {
      var textarray = text.split(' ');
      var newtextarray = [];

      textarray.forEach(text => {
        newtextarray.push(text.split('')[0].toUpperCase() + text.substr(1, text.length));
      });

      return newtextarray.join(' ');
    }
  },
  mounted() {
    const meeting = new VideoSDKMeeting();
    meeting.init(this.config);
  }
}
</script>

<style scoped>
  #video_chat_wrapper {
    height: 100vh;
  }
  #video_chat_wrapper::selection {
    background: none;
  }
</style>