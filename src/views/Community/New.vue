<template>
    <div class="new_community_questions">
        <div class="form_box">
            <form @submit.prevent="signInButtonPressed">
                <div class="form_title">New Question</div>
                <div class="form_fields">
                    <div class="field">
                        <div class="input_field">
                            <label> Topic </label>
                            <input 
                                placeholder="Enter question topic"
                                :type="titleModel.type" 
                                v-model="titleModel.value"
                                autocomplete="false"
                                :class="{
                                    input_error: (titleModel.error != '') ? true : false
                                }"
                                @keyup="$emit('input-action')"
                            >
                            <div class="error" v-if="titleModel.error != ''">
                                {{ titleModel.error }}
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <div class="input_field">
                            <label> Description </label>
                            <textarea
                                placeholder="Describe your question"
                                :type="descModel.type" 
                                v-model="descModel.value"
                                autocomplete="false"
                                :class="{
                                    input_error: (descModel.error != '') ? true : false
                                }"
                                @keyup="$emit('input-action')"
                            ></textarea>
                            <div class="error" v-if="descModel.error != ''">
                                {{ descModel.error }}
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label> Languages </label>
                        <div class="select_input_field">

                            <div 
                                class="selected language_btn_wrapper"
                                v-for="(language, index) in languageModel.value"
                                :key="language"
                            >
                                <ButtonIconText 
                                    buttonIcon="times-circle"
                                    :buttonText="language"
                                    @buttonAction="removeLanguage(index)"
                                    
                                />
                            </div>

                            <div class="add_new language_btn_wrapper">
                                <ButtonIconText 
                                    buttonIcon="plus"
                                    buttonText="Add Language"
                                    @buttonAction="openLanguages()"
                                />
                            </div>

                        </div>
                    </div>

                    <div class="submit_btn_wrapper">
                        <ButtonPlainText 
                            buttonText="Create Question"
                            @buttonAction="submitQuestion()"
                        />
                    </div>

                    <!-- <div class="field">
                        <InputField
                            label="Description"
                            :model="descModel"
                        />
                    </div> -->
                </div>
            </form>
        </div>

        <div class="languages_modal" v-if="showLanguages">
            <div class="languages_list_box">
                <div class="head">
                    <div class="title">Select Language</div>
                    <font-awesome-icon 
                        :icon="['fas', 'times']"
                        class="icon"
                        @click="closeLanguages()"
                    />
                </div>
                <div class="body">
                    <div class="input_field">
                        <input 
                            placeholder="Search language by keyword"
                            :type="languageModel.type"
                            v-model="languageModel.search"
                            autocomplete="false"
                            @keyup="searchLanguageList()"
                        >
                        <div class="create_language_btn_wrapper"
                            :style="{
                                color: (languageModel.search != '' && languageModel.options.length > 0)
                            }"
                        >
                            <ButtonPlainText 
                                buttonText="add"
                                @buttonAction="addLanguage()"
                            />
                        </div>
                    </div>
                    <div class="list">
                        <div
                            class="language_option"
                            v-for="(language, index) in languageModel.options"
                            :key="index"
                            @click="selectLanguage(index)"
                        >
                            {{ language }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import ButtonPlainText from "@/components/buttons/ButtonPlainText.vue";
import DropDown from '@/components/DropDown/DropDown.vue';
import InputField from '@/components/InputField.vue';
import ButtonIconText from "../../components/buttons/ButtonIconText.vue";

export default defineComponent({
    components: { ButtonPlainText, DropDown, InputField, ButtonIconText },
    data() {
        return {
            titleModel: {
                type: 'text',
                value: '',
                error: ''
            },
            descModel: {
                type: 'text',
                value: '',
                error: ''
            },
            languageModel: {
                type: 'search',
                search: '',
                options: [],
                value: [],
                error: ''
            },
            showLanguages: false,
            lang: []
        }
    },
    methods: {
        openLanguages() {
            this.showLanguages = true;
        },
        closeLanguages() {
            this.showLanguages = false;
        },
        selectLanguage(index) {
            const selected = this.languageModel.options[index];
            if(!this.languageModel.value.includes(selected)) {
                this.languageModel.value.push(selected);
            }
            this.closeLanguages();
        },
        addLanguage() {
            if(!this.languageModel.options.includes(this.languageModel.search)) {
                this.languageModel.value.push(this.languageModel.search);
            }
            this.closeLanguages();
        },
        removeLanguage(index) {
            this.languageModel.value.splice(index, 1)
        },
        searchLanguageList() {
            if(this.languageModel.search != '') {
                this.languageModel.options = this.lang.filter(item => {
                    return item.search(this.languageModel.search) != -1
                });
            } else {
                this.languageModel.options = this.lang;
            }
        },
        submitQuestion() {
            const body = {
                title: this.titleModel.value,
                desc: this.descModel.value,
                user: this.$store.getters.userData._id,
                languages: this.languageModel.value
            };

            this.$store.dispatch('createquestion', body)
            .then((questionInfo)=> this.$router.push(`/community/question/${questionInfo._id}`))
            .catch((error)=> {
                console.log(error);
            });
        },
        fetchLanguages() {
            this.$store.dispatch('fetchcommunitylanguages')
            .then((response)=> { 
                response.forEach(language => {
                    this.lang.push(language.title);
                });

                this.languageModel.options = this.lang 
            })
            .catch((error)=> console.log(error.response));
        },
    },
    beforeMount() {
        this.fetchLanguages();
    }
})
</script>

<style scoped>
    .new_community_questions {
    }
    .form_box {
        width: 40%;
        margin: 0 auto;
        box-shadow: var(--shadow-100);
        border-radius: 10px;
    }
    .form_title {
        border-bottom: 1px solid var(--paper-grey-300);
        color: var(--burgundy-100);
        display: flex;
        align-items: center;
        padding: 3% 5%;
        font-weight: 800;
        font-size: 140%;
    }
    .form_fields {
        padding: 2% 0;
        width: 90%;
        margin: 0 auto;
    }
    .field {
        margin-top: 5%;
    }

    .field label {
        font-size: 100%;
        font-weight: 600;
        width: 100%;
        color: var(--burgundy-100);
    }

    .input_field input, textarea, .select_input_field {
        font-weight: 300;
        outline-color: var(--burgundy-faded);
        border-radius: 5px;
        border: 1px solid var(--paper-grey-400);
        color: var(--paper-grey-600);
        height: 50px;
        margin-top: 1%;
        padding: 0 2%;
        width: 95%;
        font-size: 110%;
        font-weight: 400;
    }
    textarea {
        resize: none;
        height: 100px;
        width: 93.5%;
        padding: 3%;
    }
    textarea::placeholder, input::placeholder {
        color: var(--paper-grey-400);
    }

    .select_input_field {
        height: unset;
        padding: 2%;
    }
    .select_input_field > * {
        display: inline-block;
    }
    .language_btn_wrapper {
        height: 35px;
        width: 30%;
    }
    .language_btn_wrapper.add_new:deep button {
        border: none;
        background: var(--paper-grey-300);
        font-weight: 400;
        font-size: 80%; 
        color: rgb(175, 99, 99);
        border-radius: 5px;
    }
    .language_btn_wrapper.selected {
        height: 35px;
        width: unset;
        min-width: 20%;
        margin-right: 1%; 
    }
    .language_btn_wrapper.selected:deep button {
        border: none;
        background: rgb(175, 99, 99);
        font-weight: 400;
        font-size: 80%; 
        color: white;
        border-radius: 5px;
        text-transform: capitalize;
    }

    .submit_btn_wrapper {
        width: 30%;
        height: 40px;
        margin: 5% 0;
        margin-left: auto;
    }
    .submit_btn_wrapper button, .create_language_btn_wrapper button {
        border: none;
        border-radius: 5px;
        background: var(--burgundy-200);
        color: white;
    }

    .languages_modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.473);
    }
    .languages_list_box {
        height: 80vh;
        width: 30%;
        background: white;
        margin: 0 auto;
        margin-top: 10vh;
        border-radius: 5px;
    }
    .languages_list_box .head {
        height: 10%;
        border-bottom: 1px solid var(--paper-grey-100);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0% 2%;
    }
    .head .title {
        font-size: 110%;
        font-weight: 700;
    }
    .head .icon {
        font-size: 130%;
        cursor: pointer;
    }
    .body {
        height: 90%;
    }
    .languages_list_box .input_field {
        border-bottom: 1px solid var(--paper-grey-100);
        height: 10%;
        display: flex;

    }
    .languages_list_box input {
        height: 100%;
        margin: 0;
        border-radius: 0;
        border: 0;
        outline: none;
        width: 80%;
    }
    .create_language_btn_wrapper {
        width: 20%;
        height: 100%;
    }
    .create_language_btn_wrapper button {
        border-radius: 0;
    }
    .list {
        height: 89.5%;
        border-bottom: 1px solid black;
    }
    .language_option {
        text-align: center;
        width: 100%;
        font-size: 120%;
        text-transform: capitalize;
        padding: 3% 0;
        cursor: pointer; 
    }
    .language_option:hover {
        background: var(--paper-grey-100);
    }
    
</style>