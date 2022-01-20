<template>
  <div class="page-title">
    {{ title }}
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name:"form-title",
    props: ["title", "align"],
    data (){
        let alignPosition = 'left';
        return { alignPosition }
    },
    mounted (){
        if(this.align == 'left') {
            document.querySelector(".page-title").classList.add("left-align");
        }
        if(this.align == 'right') {
           document.querySelector(".page-title").classList.add("right-align");
        } 
        if(this.align == 'center') {
           document.querySelector(".page-title").classList.add("center-align");
        } 
    }
});
</script>

<style scoped>
.page-title {
    font-size: 120%;
    text-transform: capitalize;
}
.left-align {
    text-align: end;
}
.right-align {
    text-align: start;
}
.center-align {
    text-align: center;
}
</style>