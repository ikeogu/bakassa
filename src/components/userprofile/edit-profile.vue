<template>
    <div class="editprofile">
        <div class="head">
            <div class="section_title"> Edit Profile </div>
        </div>
        
        <div class="form">
            <form @submit.prevent="signInButtonPressed">

                <div class="form_section">
                    <div class="form_title"> Personal </div>
                    
                    <div class="field col_2">
                        <div class="field">
                            <div class="label">First Name</div>
                            <input
                                v-model="user.fullname.split(' ')[0]"
                                autocomplete="false"
                                readonly
                            >
                        </div>
                        <div class="field">
                            <div class="label">Last Name</div>
                            <input 
                                v-model="user.fullname.split(' ')[1]"
                                autocomplete="false"
                                readonly
                            >
                        </div>
                    </div>
                
                    <div class="field">
                        <div class="label">Email Address</div>
                        <div class="input_field">
                            <input
                                v-model="user.email"
                                readonly
                                autocomplete="false"
                            >
                        </div>
                    </div>
                    
                    <!-- TUTORS PROFILE FIELDS -->

                    <div class="field" v-if="user.role === 'tutor'">
                
                        <div class="field col_2">   
                            <div class="field">
                                <div class="label">Tutor Name</div>
                                <input
                                    type="text"
                                    v-model="tutor.tutorName"
                                    autocomplete="false"
                                >
                            </div>

                            <div class="field">
                                <div class="label">Date Of Birth</div>
                                <input
                                    type="date"
                                    v-model="tutor.dob"
                                    autocomplete="false"
                                    readonly
                                >
                            </div>
                        </div>

                        <div class="field col_2">   
                            <div class="field">
                                <div class="label"> Nationality </div>
                                <input
                                    type="text"
                                    v-model="tutor.nationality"
                                    autocomplete="false"
                                    readonly
                                >
                            </div>

                            <div class="field">
                                <div class="label"> Country Of Residence </div>
                                <input
                                    type="text"
                                    v-model="tutor.residence"
                                    autocomplete="false"
                                >
                            </div>
                        </div>

                        <div class="field col_2">   
                            <div class="field">
                                <div class="label"> Gender </div>
                                <input
                                    type="text"
                                    v-model="tutor.gender"
                                    autocomplete="false"
                                >
                            </div>

                            <div class="field">
                                <div class="label"> City </div>
                                <input
                                    type="text"
                                    v-model="tutor.city"
                                    autocomplete="false"
                                >
                            </div>
                        </div>

                        <div class="field">
                            <div class="label"> Street Address </div>
                            <input
                                type="text"
                                v-model="tutor.str"
                                autocomplete="false"
                                readonly
                            >
                        </div>

                        <div class="field">
                            <div class="label"> Languages </div>
                            <div class="field col_3">
                                <div 
                                    class="field"
                                    v-for="(language, index) in tutor.languages"
                                    :key="index"
                                >
                                    <input
                                        type="text"
                                        v-model="tutor.languages[index]"
                                        autocomplete="false"
                                        readonly
                                    >
                                </div>
                            </div>
                        </div>

                        <div class="field">
                            <div class="form_title"> Education </div>
                             <div class="field sub">
                                <div class="col_3">
                                    <div class="field">
                                        <div class="label"> Institution </div>
                                        <input
                                            type="text"
                                            v-model="tutor.education.institution"
                                            autocomplete="false"
                                            readonly
                                        >
                                    </div>

                                    <div class="field">
                                        <div class="label"> Course </div>
                                        <input
                                            type="text"
                                            v-model="tutor.education.course"
                                            autocomplete="false"
                                            readonly
                                        >
                                    </div>

                                    <div class="field">
                                        <div class="label"> Degree </div>
                                        <input
                                            type="text"
                                            v-model="tutor.education.degree"
                                            autocomplete="false"
                                            readonly
                                        >
                                    </div>
                                </div>

                                <div class="field col_2">
                                    <div class="field">
                                        <div class="label"> From </div>
                                        <input
                                            type="text"
                                            v-model="tutor.education.yearFrom"
                                            autocomplete="false"
                                            readonly
                                        >
                                    </div>

                                    <div class="field">
                                        <div class="label"> To </div>
                                        <input
                                            type="text"
                                            v-model="tutor.education.yearTo"
                                            autocomplete="false"
                                            readonly
                                        >
                                    </div>
                                </div>

                                <div class="field">
                                    <div class="label"> Description </div>
                                    <textarea
                                        v-model="tutor.education.desc"
                                        autocomplete="false"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="field">
                            <div class="form_title"> Work </div>
                             <div class="field sub">
                                <div class="col_2">
                                    <div class="field">
                                        <div class="label"> Company </div>
                                        <input
                                            type="text"
                                            v-model="tutor.work.company"
                                            autocomplete="false"
                                            readonly
                                        >
                                    </div>

                                    <div class="field">
                                        <div class="label"> Position </div>
                                        <input
                                            type="text"
                                            v-model="tutor.work.position"
                                            autocomplete="false"
                                            readonly
                                        >
                                    </div>
                                </div>

                                <div class="field col_2">
                                    <div class="field">
                                        <div class="label"> From </div>
                                        <input
                                            type="text"
                                            v-model="tutor.work.yearFrom"
                                            autocomplete="false"
                                            readonly
                                        >
                                    </div>

                                    <div class="field">
                                        <div class="label"> To </div>
                                        <input
                                            type="text"
                                            v-model="tutor.work.yearTo"
                                            autocomplete="false"
                                            readonly
                                        >
                                    </div>
                                </div>

                                <div class="field">
                                    <div class="label"> Description </div>
                                    <textarea
                                        v-model="tutor.work.desc"
                                        autocomplete="false"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                         <div class="field">
                            <div class="form_title"> Certificate </div>
                            <div class="field sub">
                                <div class="col_2">
                                    <div class="field">
                                        <div class="label"> Title </div>
                                        <input
                                            type="text"
                                            v-model="tutor.certificate.title"
                                            autocomplete="false"
                                            readonly
                                        >
                                    </div>

                                    <div class="field">
                                        <div class="label"> Institution </div>
                                        <input
                                            type="text"
                                            v-model="tutor.certificate.institution"
                                            autocomplete="false"
                                            readonly
                                        >
                                    </div>
                                </div>

                                <div class="field col_2">
                                    <div class="field">
                                        <div class="label"> Year Awarded </div>
                                        <input
                                            type="text"
                                            v-model="tutor.certificate.year"
                                            autocomplete="false"
                                            readonly
                                        >
                                    </div>
                                </div>

                                <div class="field">
                                    <div class="label"> Description </div>
                                    <textarea
                                        v-model="tutor.certificate.desc"
                                        autocomplete="false"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="field">
                            <div class="form-title">Teaching Materials</div>

                            <div class="checkboxes col_3">
                                <div
                                    class="checkbox_option"
                                    v-for="(material, index) in allTeachingMaterials"
                                    :key=index
                                >
                                    <CheckBox 
                                        :label="material.label"
                                        :value="material.value"
                                        :selected="material.selected"
                                        :index="index + 1"
                                        @selectCheckBox="selectCheckBoxItem"
                                    />
                                </div>
                            </div>    
                        </div>
                    </div>

                </div>

                <div class="section_bottom" v-if="tutor">
                    <div class="form_message">
                        <div class="edit_response success_edit" v-if="success">
                            <font-awesome-icon :icon="['fas', 'check-circle']" />
                            <div class="msg">{{ success }}</div>
                        </div>

                        <div class="edit_response error_edit" v-if="error">
                            <font-awesome-icon :icon="['fas', 'times-circle']" />
                            <div class="msg">{{ error }}</div>
                        </div>
                    </div>
                    <div class="form_btn_wrapper">
                        <ButtonPlainText 
                            buttonText="SUBMIT"
                            @buttonAction="submitEdits()"
                        />
                    </div>
                </div>
            </form>
        </div>

    </div>
</template>

<script>
import CheckBox from "../checkbox/CheckBox.vue";
import ButtonPlainText from "../buttons/ButtonPlainText.vue";

export default {
    name: 'EditProfile',
    components: { CheckBox, ButtonPlainText },
    data() {
        const user = this.$store.getters.userData,
              tutor = this.$store.getters.tutorData;

        return {
            user,
            tutor,
            allTeachingMaterials: [
                {
                    label: 'PDF file',
                    value: 'pdf-file',
                    selected: false,
                },
                {
                    label: 'Text Documents',
                    value: 'text-documents',
                    selected: false,
                },
                {
                    label: 'Presentation slides/PPT',
                    value: 'presentation-slides/ppt',
                    selected: false,
                },
                {
                    label: 'Audio files',
                    value: 'audio-files',
                    selected: false,
                },
                {
                    label: 'Image files',
                    value: 'image-files',
                    selected: false,
                },
                {
                    label: 'Video files',
                    value: 'video-files',
                    selected: false,
                },
                {
                    label: 'Flashcards',
                    value: 'flashcards',
                    selected: false,
                },
                {
                    label: 'Articles and news',
                    value: 'articles-and-news',
                    selected: false,
                },
                {
                    label: 'Quizzes',
                    value: 'quizzes',
                    selected: false,
                },
                {
                    label: 'Test templates and examples',
                    value: 'test-templates-and-examples',
                    selected: false,
                },
                {
                    label: 'Graphs and charts',
                    value: 'graphs-and-charts',
                    selected: false,
                },
                {
                    label: 'Homework Assignments',
                    value: 'homework-assignments',
                    selected: false,
                }
            ],
            success: '',
            error: ''
        }
    },
    methods: {
        submitEdits() {
            this.$store.dispatch('edittutorprofile', this.tutor)
            .then((response)=> {
                this.success = 'Profile edit submitted successfully';
            })
            .catch((error) => {
                this.error = 'There was an error submitting edit';
            });
        },
        selectCheckBoxItem(index) { 
            if(index == 0) {
                this.agreementModel.selected = !this.agreementModel.selected;
                this.validateAgreement();
            }
            else {
                const selectedBox = this.allTeachingMaterials[index-1];

                if(this.tutor.teachingMat.includes(selectedBox.value)) {
                var indexof = this.tutor.teachingMat.indexOf(selectedBox.value);

                this.tutor.teachingMat.splice(this.tutor.teachingMat.indexOf(selectedBox.value), 1);
                selectedBox.selected = false;

                } else {
                    this.tutor.teachingMat.push(selectedBox.value);
                    selectedBox.selected = true;
                }
            }
        }
    },
    beforeMount() {
        for(var i=0; i < this.allTeachingMaterials.length; i++) { 
            const item = this.allTeachingMaterials[i]; 
            
            if(this.tutor.teachingMat.includes(item.value)) { 
                this.allTeachingMaterials[i].selected = true;
            } 
        } 
    } 
}
</script>

<style scoped>
    .head {
        display: flex;
    }
    .section_title {
        font-size: 150%;
    }

    .form {
        margin-top: 10%;
        width: 65%;
    }
    .form_section {
        margin-bottom: 10%;
    }
    .form_title {
        margin-bottom: 2%;
        font-weight: 500;
        font-size: 110%;
        color: var(--paper-grey-800);
    }
    .field {
        width: 100%;
        margin-bottom: 1%;
    }
    .field input,
    .field textarea, 
    .drop_down_wrapper,
    .input_field,
    .tag_field {
        width: 95.5%;
        padding: 0 2%;
        height: 50px;
        font-size: 110%;
        border: 1px solid var(--paper-grey-500);
        border-radius: 5px;
        color: var(--paper-grey-800);
    }
    .field textarea {
        resize: none;
        width: 98%;
        height: 100px;
        padding: 1%;
    }
    .col_2 {
        display: flex;
        justify-content: space-between;
    }
    .col_2 .field {
        width: 48%;
    }
    .col_3 {
        display: grid;
        justify-content: space-between;
        grid-template-columns: calc(100% / 3.1) calc(100% / 3.1) calc(100% / 3.1);
        gap: 10px;
    }
    .col_3 .field {
        
    }

    .input_field {
        display: flex;
        align-items: center;
        width: 95%;
    }
    .input_field input, .tag_field input {
        width: 60%;
        border: none;
        outline: none;
    }

    .section_bottom {
        position: sticky;
        bottom: 0;
        width: 100%;
        height: 50px;
        padding: 1%;
        background: white;
        display: flex;
        justify-content: space-between;
    }

    .form_message {
        height: 100%;
        width: 50%;
        display: flex;
        align-items: center;
        font-size: 130%;
    }
    .edit_response {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        padding-left: 3%;
        border-radius: 5px;
    }
    .edit_response .msg {
        margin-left: 2%;
    }
    .success_edit {
        color: green;
        background: rgba(196, 240, 196, 0.4);
    }
    .error_edit {
        color: red;
        background: rgba(255, 174, 174, 0.438);
    }

    .form_btn_wrapper {
        margin-left: auto;
        width: 25%;
        height: 50px;
    }
    .form_btn_wrapper button {
        border-radius: 25px;
        border: none;
        background: var(--burgundy-100);
        color: white;
        outline: none;
    }
</style>