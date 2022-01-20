<template>
    <div class="video">
        <video :src="videoLink"
                :controls=controls
                :allowfullscreen=fullscreen
                controlList="nodownload"
        >
        </video>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'tutor-intro-video',
    props: ['videoLink', 'controls', 'allowfullscreen'],
    data() {
        console.log(this.videoLink);
        return {

        }
    }
})
</script>

<style scoped>
* {
    width: 100%;
    height: 100%; 
}
iframe {
    border-radius: 30px;
    border: none;
}
</style>

    