<template>
  <div class="input_field">
    <label>{{ label }}</label>
    <textarea
        :placeholder=model.placeholder
        :type="model.type" 
        v-model="model.value" 
        autocomplete="false"
        :class="{
            input_error: (model.error != '') ? true : false
        }"
        @keyup="$emit('input-action')"
    ></textarea>
    <div class="error" v-if="model.error != ''">
        {{ model.error }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name:'textarea-field',
    props: ['model', 'label'],
});
</script>

<style scoped>
.input_field {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    padding: 1% 0;
}
.input_field > * {  
    width: 100%;
}
label {
    padding: 1% 0;
    color: rgb(92, 92, 92);
}
textarea {
    border: 1px solid grey;
    padding: 3%;
    height: 94%;
    width: 100%;
    font-size: 100%;
    border-radius: 5px;
    outline-color: var(--burgundy-400);
    resize: none;
    outline: none;
}
.error {
    color: rgb(201, 60, 60);
    font-size: 80%;
}
.input_error {
    border: 1px solid rgb(201, 60, 60);
}
</style>