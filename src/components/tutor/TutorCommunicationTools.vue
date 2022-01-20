<template>
  <div class="tutor_communication_tools">
    <div class="title_info">
        These are the communication tools your teacher uses. Please choose your preferred communication tool.
    </div>
    <div class="options">

        <div  
            v-for="(commtool, index) in commTools" 
            :class="{ selected: (index === selectedIndex) ? true : false }" 
            :key="index"
            @click="$emit('button-action', index)"
        >   

              <img :src="commtool.image">
              <div class="text">{{commtool.name}}</div>

        </div>
        
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name:"tutor-communication-tools",
    props:['commTools', 'selectedIndex'],
});
</script>

<style scoped>
    .tutor_communication_tools {
        padding: 5% 0;
    }
    .title_info {
        width: 50%;
        margin: 0 auto;
        text-align: center;
        color: grey;
        font-size: 110%;
    }
    div.options {
        display: flex;
        justify-content: space-between;
        width: 70%;
        margin: 5% auto 0;
    }
    div.options > div {
        width: calc(100% / 3.5);
        height: 50px;
        display: flex;
        align-items: center;
        border: 1px solid #e9e9eb;
        padding: 1%;
        border-radius: 5px;
        cursor: pointer;
        box-shadow: 0px 0px 15px 0px rgb(241, 241, 241);
    }
    div.options > .selected {
        transition: .5s;
        background: rgba(195, 243, 239, 0.521);
    }
    div.options img {
        width: 15%;
        object-fit: contain;
    }
    div.options div.text {
        width: 85%;
        text-align: center;
        text-transform: capitalize;
    }
</style>