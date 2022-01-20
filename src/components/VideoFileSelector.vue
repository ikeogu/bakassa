<template>
    <div class="video_file_selector">
        <div class="video_preview_wrapper">
            <video
                class="video"
                :src="source"
                autoplay
                controls
            ></video>
        </div>
        <div class="upload_btn_wrapper">
            <FileSelectorButton
                buttonText="Choose Video" 
                @input="saveAndPreviewFile"
            />
        </div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import FileSelectorButton from "@/components/buttons/FileSelectorButton.vue";

export default defineComponent({
    name: 'video-file-selector',
    components: { FileSelectorButton },
    data() {
        return {
            source: ''
        }
    },
    methods: {
        saveAndPreviewFile(result) {
            this.source = URL.createObjectURL(result.file);
            URL.revokeObjectURL(result);

            this.$emit('video-saved', result.file);
        }
    }

});
</script>

<style scoped>
.video_file_selector {
    width: 100%;
    height: 100%;
}
.video_preview_wrapper {
    width: 100%;
    height: 400px;
    margin: 0 auto;
}
video {
    width: 100%;
    height: 100%;
}
.upload_btn_wrapper {
    height: 40px;
    width: 40%;
    margin: 5% auto 0;
}

</style>