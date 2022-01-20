<template>
    <div class="community_questions">
        <div class="main">
            <div class="head" v-if="languages.options.length > 0">
                <div class="title">
                    All Discussions
                </div>
                
                <div class="dropdown_wrapper">
                    <DropDown
                        :dropdownIndex=0
                        :options=languages.options
                        :selected=languages.selected
                        :selectedIndex=languages.selectedIndex
                        :isOptionsVisible=optionsVisible[0]
                        :hideBorder=false
                        @showOptions=toggleOptionsVisibility
                        @optionSelect=selectOption
                    />
                </div>
                
                <div class="create_new_btn_wrapper">
                    <ButtonIconText 
                        buttonText="Add Question"
                        buttonIcon="plus"
                        @buttonAction="gotocreateform()"
                    /> 
                </div>
            </div>

            <div class="questions_list_frame">
                <QuestionCard 
                    v-for="question in questions"
                    :key="question._id"
                    :id="question._id"
                    :title="question.title"
                    :user="question.user"
                    :date="question.dateCreated"
                    :languages="question.languages"
                    :description="question.desc"
                    :comments="question.comments"
                    :likes="question.likes"
                />
            </div>
        </div>
        <div class="related">
        </div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import Header from "@/components/Header/Header.vue";
import SiteFooter from "@/components/SiteFooter.vue";
import ButtonIconText from "@/components/buttons/ButtonIconText.vue";
import QuestionCard from "@/components/Card/QuestionCard.vue";
import DropDown from '@/components/DropDown/DropDown.vue';

export default defineComponent({
    components: { Header, SiteFooter, ButtonIconText, QuestionCard, DropDown },
    data() {
        return {
            questions: [],
            languages: {
                options: [],
                selected: true,
                selectedIndex: 0,
                selectedOption: 'english'
            },
            optionsVisible: [false],
        }
    },
    methods: {
        loadLanguages() {
            const comLang = this.$store.getters.communityLanguages;
            comLang.forEach(language => {
                console.log(language)
                this.languages.options.push({
                    display_name: language,
                    value: language
                });
            });
        },
        fetchQuestions() {
            this.$store.dispatch('fetchcommunityquestions')
            .then((response)=> {
                console.log(response);
                this.questions = response.reverse();
            })
            .catch((error)=> {
                console.log(error.response);
            });
        },
        storeCommunityLanguage() {
            this.$store.dispatch('storecommunitylanguage', this.languages.selectedOption);
        },
        async fetchLanguages() {
            // this.loadLanguages();

            await this.$store.dispatch('fetchcommunitylanguages')
            .then((response)=> {
              
                const lang = [];
                response.forEach(language => {
                    lang.push({
                        display_name: language.title,
                        value: language.title
                    });
                });

                this.languages.options = lang;
            })
            .catch((error)=> console.log(error.response));
        },
        selectOption(selected) {
            
            if(selected.dropdownIndex == 0) {
                this.languages.selectedIndex = selected.optionIndex;
                this.languages.selected = true;
                this.languages.selectedOption = this.languages.options[selected.optionIndex].value;

                this.storeCommunityLanguage();
                this.fetchQuestions();
            }
       
            this.toggleOptionsVisibility(selected.dropdownIndex);
        },
        toggleOptionsVisibility(index) {
            this.optionsVisible[index] = !this.optionsVisible[index];
        },
        gotocreateform() {
            this.$router.push('new');
        },
    },
    async beforeMount() {
        await this.fetchLanguages();
        this.storeCommunityLanguage();
        this.fetchQuestions();
    }
})
</script>

<style scoped>
    .community_questions {
        
    }
    .main {
        width: 70%;
    }
    .community_questions .head {
        display: flex;
    }
    .head .title {
        font-size: 150%;
        font-weight: 600;
        color: var(--paper-grey-700);
    }

    .dropdown_wrapper {
        margin-left: auto;
        width: 18%;
        height: 35px;
    }
    .dropdown_wrapper:deep > * {
        font-size: 120%;
    }

    .create_new_btn_wrapper {
        margin-left: 2%;
        width: 15%;
        height: 40px;
    }
    .create_new_btn_wrapper button {
        border: none;
        background: var(--burgundy-200);
        color: white;
        border-radius: 5px;
        outline: none;
    }
    
    .questions_list_frame {
        margin-top: 5%;
    }
    .questions_list_frame > * {
        margin-bottom: 5%;
    }
</style>