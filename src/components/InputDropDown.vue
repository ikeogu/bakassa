<template>
  <div class="input_field">
    <label>{{ label }}</label>
    <div class="input">
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
        <DropDown 
            :options="options"
        />
    <div class="error" v-if="model.error != ''">
        {{ model.error }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import DropDown from "@/components/DropDown/DropDown.vue";

export default defineComponent({
    name:'input field',
    components: { DropDown },
    props: ['model', 'label', 'options']
});
</script>

<style scoped>
.input_field {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    /* height: 80px; */
    padding: 1% 0;
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
    height: 40px;
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