<template>
    <section class="lessons_frame">
        <div class="head">
            <div class="section_title"> Create New Lesson </div>
            <div class="cancel_btn_wrapper">
                <ButtonIcon
                    buttonIcon="times"
                    @buttonAction="closeCreate"
                />
            </div>
        </div>
       <div class="create_form">
           <form @submit.prevent="signInButtonPressed">
                
                <div class="field_wrapper double">
                    <div class="field three_third title">
                        <div class="label">Lesson Title</div>
                        <textarea
                            placeholder="Enter lesson title..."
                            v-model="titleModel.value"
                        /> 
                    </div>
                </div>
                <div class="field_wrapper">
                    <div class="dropdown_wrapper one_third">
                        <div class="label">Lesson Languauge</div>
                        <DropDown
                            :dropdownIndex=0
                            searchBarSwitch=true
                            :options="languageModel.options"
                            :selected="languageModel.selected"
                            :selectedIndex="languageModel.selectedIndex"
                            :isOptionsVisible="showOptions[0]"
                            :hideBorder=false
                            @showOptions="toggleDropdownOptions"
                            @optionSelect="selectDropDownOption"
                        />
                    </div>
                    <div class="field one_fifth">
                        <div class="label">Duration</div>
                        <div class="duration">
                            <input
                                :type="durationModel.type"
                                v-model="durationModel.value"
                                @keyup="convertToMilliSecs()"
                            />
                            <DropDown
                                :dropdownIndex=1
                                searchBarSwitch=false
                                :options="durationModel.options"
                                :selected="durationModel.selected"
                                :selectedIndex="durationModel.selectedIndex"
                                :isOptionsVisible="showOptions[1]"
                                :hideBorder=true
                                @showOptions="toggleDropdownOptions"
                                @optionSelect="selectDropDownOption"
                            />
                        </div>
                    </div>
                    <div class="field one_third">
                        <InputField 
                            label="Price ($) "
                            :model="priceModel"
                        />
                    </div>
                </div>

                <div class="submit_btn_wrapper">
                    <ButtonPlainText 
                        buttonText="SUBMIT"
                        :isLoading="loading"
                        @buttonAction="createLesson"
                    />
                </div>
           </form>
       </div>
    </section>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import InputField from "@/components/InputField.vue";
import DropDown from "@/components/DropDown/DropDown.vue";
import ButtonIcon from "@/components/buttons/ButtonIcon.vue";
import ButtonPlainText from "@/components/buttons/ButtonPlainText.vue";

export default defineComponent({
    name:"lessons",
    components: { InputField, DropDown, ButtonIcon, ButtonPlainText },
    data()  {
        
        console.log(this.$store.getters.tutorData.languages);

        return {
            titleModel: {
                type: 'email',
                value: '',
                error: '',
                readonly: false
            },
            languageModel: {
                type: 'text',
                value: '',
                error: '',
                readonly: false,
                options: [],
                selected: true,
                selectedIndex: 0,
            },
            durationModel: {
                type: 'number',
                value: '',
                error: '',
                readonly: false,
                options: [
                    {
                        display_name: 'Seconds',
                        value: 'secs'
                    },
                    {
                        display_name: 'Minutes',
                        value: 'mins'
                    },
                    {
                        display_name: 'Hours',
                        value: 'hrs'
                    }
                ],
                selected: true,
                selectedIndex: 0,
                inMilliSecs: 0
            },
            priceModel: {
                type: 'number',
                value: '',
                error: '',
                readonly: false
            },
            formModel: {
                error: ''
            },
            showOptions: [false],
            loading: false
        }
    },
    methods: {
        createLesson() {
            this.loading = true;

            var body = {
                title: this.titleModel.value.toLowerCase(),
                language: this.languageModel.value,
                duration: this.durationModel.inMilliSecs,
                price: this.priceModel.value
            };

            this.$store.dispatch('createlesson', body)
            .then(()=> {
                this.$router.push('/profile/lessons')
            })
            .catch((error)=> {
                this.loading = false;
                console.log(error.response);
                this.formModel.error = error.response.message
            });
        },
        closeCreate() {
            this.$router.push('/profile/lessons');
        },
        convertToMilliSecs() {
           var selected = this.durationModel.options[this.durationModel.selectedIndex].value;
           if(selected == 'secs') {
               this.durationModel.inMilliSecs = this.durationModel.value * 1000;
           }
           if(selected == 'mins') {
               this.durationModel.inMilliSecs = this.durationModel.value * 60000;
           }
           if(selected == 'hrs') {
                this.durationModel.inMilliSecs = this.durationModel.value * 3600000;
           }
        },
        toggleDropdownOptions(index) {
            if(!this.showOptions[index])
                this.hideAllDropDownOptions();
            this.showOptions[index] = !this.showOptions[index];
        },
        hideAllDropDownOptions () {
            for(var i = 0; i < this.showOptions.length; i++) {
                this.showOptions[i] = false; 
            }
        },
        selectDropDownOption(selected) {
            if(selected.dropdownIndex == 0) {
                this.languageModel.selectedIndex = selected.optionIndex;
                this.languageModel.value = this.languageModel.options[selected.optionIndex].value;
            }

            if(selected.dropdownIndex == 1) {
                this.durationModel.selectedIndex = selected.optionIndex;
                this.convertToMilliSecs();
            }

            this.hideAllDropDownOptions();
        }
    },
    beforeMount() {
        console.log(this.$store.getters.tutorData.languages);
        this.$store.getters.tutorData.languages.forEach(element => {
            this.languageModel.options.push({
                display_name: element,
                value: element
            });
        });

        this.languageModel.value = this.languageModel.options[0].value;
    }
});
</script>

<style scoped>
    .lessons_frame {
        padding: 1%;
        position: relative;
        height: 100%;
    }
    .head {
        display: flex;
    }
    .section_title {
        font-size: 150%;
    }
    .cancel_btn_wrapper {
        margin-left: auto;
    }
    .cancel_btn_wrapper button {
        background: none;
        border: none;
        font-size: 200%;
        color: var(--paper-grey-600);
    }

    .create_form {
        width: 80%;
        margin-top: 5%;
    }
    .field_wrapper {
        display: flex;
        justify-content: space-between;
        margin-bottom: 3%;
    }
    .field_wrapper.double.equal .field {
        width: calc(calc(100% - 5%)/2);
    }
    .field {
    
    }
    .field input {
        color: var(--paper-grey-700);
        padding: 0% 3%;
        height: 40px;
        font-size: 110%;
        outline: none;
    }

    .title textarea {
        padding: 2%;
        outline: none;
        width: 96%;
        height: 70px;
        border: none;
        color: var(--paper-grey-700);
        font-size: 200%;
        font-weight: 500;
        resize: none;
    }
    textarea::placeholder {
        color: var(--paper-grey-400);
    }

    .dropdown_wrapper {
        height: 40px;
    }

    .duration {
        display: flex;
        border-radius: 5px;
        border: 1px solid var(--paper-grey-400);
        padding: 1px;
        height: 43px;
        width: 100%;
    }
    .duration > * {
        height: 100% !important;
    }
    .duration input {
        border: none;
        width: 60%;
        font-weight: 800;
        font-size: 150%;
        text-align: center;
        border-right: 1px solid var(--paper-grey-400);
    }
    .duration select {
        width: 30%;
    }

    .label {
        height: 20px;
        color: var(--paper-grey-700);
    }
    
    .one_fifth {
        width: 20%;
    }

    .one_third {
        width: 30%;
    }
    .two_third {
        width: 60%; 
    }
    .three_third {
        width: calc(100% / 1)
    }

    .submit_btn_wrapper {
        width: 15%;
        margin-left: auto;
        margin-top: 10%;
    }
    .submit_btn_wrapper button {
        border-radius: 25px;
        height: 50px;
        background: var(--paper-light-blue-100);
        color: var(--paper-light-blue-800);
        border: none;
        box-shadow: var(--shadow-100);
    }
</style>