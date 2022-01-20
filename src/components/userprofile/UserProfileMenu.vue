<template>
  <div class="user-profile-menu">
    <router-link
      class="menu_item"
      v-for="(navItem, index) in nav"
      :key="index"
      :to="navItem.path"
    >
      <div class="label"> {{ navItem.label }} </div>
    </router-link>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: "user-profile-menu",
    props: ["hide", "nav"],
    data() {
      return {
      
      }
    },
    methods: { }
});
</script>

<style scoped> 
  .user-profile-menu {
    position: absolute;
    top: 50px;
    right: 0;
    width: 500%;
    max-height: 90vh;
    overflow-y: auto;
    padding: 4% 0%;
    background: white;
    box-shadow: 0px 3px 8px 1px rgba(221, 221, 221, 0.453);
    border-radius: 8px;
    color: rgb(12, 12, 12) !important;
    z-index: 10000000;
  }
  .menu_item {
    padding: 6% 5%;
    display: flex;
    align-items: center;
  }
  .menu_item:hover {
    background: rgba(238, 238, 238, 0.584);
  }
  .menu_item > .anchor {
    width: 100%;
  }
  .menu_item .label {
    margin-left: 7%;
    font-weight: 500;
    text-transform: capitalize;
    color: var(--paper-grey-700);
  }

</style>