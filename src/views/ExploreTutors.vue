<template>
    <div class="exploretutors">
        <Header />

        <section class="body">
            <div class="sub-heading">Find the best tutor for you</div>
            <div class="sub">
                <div class="search-form">
                    <form class="search">
                        <input 
                            :type="searchModel.type" 
                            v-model="searchModel.value"
                            placeholder="Search tutors by keyword"
                            @keyup="search"
                        >
                        <button><font-awesome-icon :icon="['fas', 'search']" /></button>
                    </form>
                </div>
                <div class="tutors-found"> {{ allTutors.length }} tutors found</div>
            </div>
            <div class="all-tutors" v-if="allTutors.length > 0">
                <VerticalList :tutors="allTutors"/>
            </div>
            <div class="no_tutors" v-else>
                <EmptyList 
                    text="No tutor found"
                    image="empty"
                    position="center"
                />
            </div>
        </section>

        <SiteFooter />
    </div>
</template>

<script>
import { defineComponent } from '@vue/runtime-core';
import Header from '@/components/Header/Header.vue';
import VerticalList from '@/components/lists/VerticalList.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import EmptyList from "../components/lists/EmptyList.vue";

export default defineComponent({
    name: 'Home',
    components: { Header, VerticalList, EmptyList, SiteFooter },
    data() {
        let searchModel = {
            type: 'text',
            value: ''
        }

        return { 
            allTutors: [],
            searchModel
        }
    },
    methods: {
        async fetchTutors() {
            this.$store.dispatch('fetchtutors')
            .then((tutors)=> {
                this.allTutors = tutors;
            })
            .catch((error)=> {
                console.log(error.response);
            })
        },
        search() {
            if(this.searchModel.value != '') {
                this.allTutors = this.$store.getters.tutors.filter(tutor => {
                    return tutor.tutorName.search(this.searchModel.value) != -1;
                });

               console.log(this.allTutors);
            } else {
                this.allTutors = this.$store.getters.tutors;
            }
        }
    },
    beforeMount(){
        this.fetchTutors();
    }
})
</script>

<style scoped>  
    .body {
        width: 60%;
        margin: 0% auto;
        padding: 5% 0%;
    }
    div.sub-heading {
        font-weight: 400;
        font-size: 150%;
        margin-bottom: 2%;
        color: grey;
    }
    div.sub {
        display: flex;
        align-items: center;
        color: grey;
        margin-bottom: 4%;
    }
    div.tutors-found {
        padding: 1%;
        font-size: 100%;
        margin-left: 5%;
        border-radius: 5px;
        background: rgb(235, 235, 235);
    }
    div.search-form {
        width: 50%;
        height: 40px;
    }
    div.search-form form {
        border: 1px solid var(--border-color);
        border-radius: 5px;
        overflow: hidden;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    form.search input {
        width: 90%;
        border: none;
        outline: none;
        height: 100%;
        padding: 0 5%;
        font-size: 110%;
        font-weight: 300;
    }
    form.search input::placeholder {
        color: var(--border-color);
    }
    form.search button {
        font-size: 110%;
        width: 10%;
        border: none;
        outline: none;
        background: none;
        color: var(--border-color);
        text-align: center;
    }
</style>