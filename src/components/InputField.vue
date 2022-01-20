<template>
  <div class="input_field">
    <label v-if="label != ''">{{ label }}</label>
    <input 
        :type="model.type" 
        v-model="model.value"
        :readonly="model.readonly" 
        autocomplete="false"
        :class="{
            input_error: (model.error != '') ? true : false
        }"
        @keyup="$emit('input-action')"
    >
    <div class="error" v-if="model.error != ''">
        {{ model.error }}
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name:'input field',
    props: ['model', 'label']
});
</script>

<style scoped>
.input_field {
    width: 100%;
    height: 100%;
}
.input_field > * {  
    width: 100%;
}
label {
    height: 20px;
    color: var(--paper-grey-600);
}
input {
    border: 1px solid var(--paper-grey-400);
    color: var(--paper-grey-700);
    padding: 0% 3%;
    width: 94% !important;
    height: 45px;
    font-size: 110%;
    border-radius: 5px;
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