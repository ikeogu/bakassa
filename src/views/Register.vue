<template>
    <div class="header_wrapper">
        <Header />
    </div>

    <section class="body">
        <div class="image_wrapper">
            <img src="@/assets/class3.jpg" />
            <div class="overlay"></div>
        </div>
        
        <div class="form-box-frame" v-if="roleSelected">
            <div class="form-box">
                <div class="heading">Create A New Account To Get Started Connecting With The Best Tutors</div>
                <div class="form">
                
                <div class="error-msg" v-if="formModel.error != ''">{{ formModel.error }}</div>

                <form @submit.prevent="signInButtonPressed">
                  
                    <input 
                        v-model="firstnameModel.value" 
                        @keyup="validateFirstname()" 
                        :type="firstnameModel.type" 
                        class="fullname" 
                        placeholder="Firstname" 
                        autocomplete="off"
                        :class="{
                            error: (firstnameModel.error != '') ?true :false
                        }"
                    >
                    <div class="error-message" v-if="firstnameModel.error != ''">{{ firstnameModel.error }}</div>

                    <input 
                        v-model="lastnameModel.value" 
                        @keyup="validateLastname()" 
                        :type="lastnameModel.type" 
                        class="fullname" 
                        placeholder="Lastname" 
                        autocomplete="off"
                        :class="{
                            error: (lastnameModel.error != '') ?true :false
                        }"
                    >
                    <div class="error-message" v-if="lastnameModel.error != ''">{{ lastnameModel.error }}</div>

                    <input 
                        v-model="dobModel.value" 
                        @change="validateDOB()"
                        :type="dobModel.type"
                        class="fullname"
                        placeholder="DOB"
                        autocomplete="off"
                        :class="{
                            error: (dobModel.error != '') ?true :false
                        }"
                    >
                    <div class="error-message" v-if="dobModel.error != ''">{{ dobModel.error }}</div>

                    <input 
                        v-model="emailModel.value" 
                        @keyup="validateEmail()" 
                        :type="emailModel.type" 
                        class="email" 
                        placeholder="Email" 
                        autocomplete="off"
                        :class="{
                            error: (emailModel.error != '') ?true :false
                        }"
                    >
                    <div class="error-message" v-if="emailModel.error != ''">{{ emailModel.error }}</div>

                    <input 
                        v-model="passwordModel.value" 
                        @keyup="validatePassword()" 
                        :type="passwordModel.type" 
                        placeholder="Password" 
                        autocomplete="off"
                        :class="{
                            error: (passwordModel.error != '') ?true :false
                        }"
                    >
                    <div class="error-message" v-if="passwordModel.error != ''">{{ passwordModel.error }}</div>

                    <div class="register_btn_wrapper">
                        <ButtonPlainText buttonText="CREATE NEW ACCOUNT" :isLoading="isLoading" @button-action="registerUser" /> 
                    </div>

                    <div class="legal">
                        By signing up, you agree to our Terms, Data Policy and Cookie Policy.
                    </div>

                    <div class="orsignin">
                        Already have an account? <router-link to='/login'>Login</router-link>
                    </div>
                </form>
                </div>
            </div>
        </div>

        <section class="select_role_container" v-else> 
                <div class="title">Select Your Purpose</div>

                <div class="role_options grid_list col_3">
                    <div 
                        class="option" 
                        v-for="(role, index) in roles"
                        :key="index"
                        @click="selectRole(role.value)"
                    >
                        <div class="img_wrapper">
                            <img :src="role.image" />
                        </div>
                        <div class="content_wrapper">
                            <div class="text_wrapper">
                                <div class="title">
                                    <div class="large">{{ role.title }}</div>
                                </div>
                                <div class="desc">
                                    {{ role.desc }}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

        </section>
    </section>
    
</template>

<script>
    
import Header from '../components/Header/Header.vue';
import AccountTypes from '@/components/account-types.vue';
import ButtonPlainText from '@/components/buttons/ButtonPlainText.vue';

export default {
    components: { Header, AccountTypes, ButtonPlainText },
    data() {
        var emailModel = { type: 'email', value: '', error: '' },
        passwordModel = { type: 'password', value: '', error: '' },
        firstnameModel = { type: 'text', value: '', error: '' },
        lastnameModel = { type: 'text', value: '', error: '' },
        dobModel = { type: 'date', value: '', error: '' },
        formModel = { error: '' },

        typeSelected = false;

        return { 
            emailModel,
            passwordModel,
            firstnameModel,
            lastnameModel,
            dobModel,
            formModel,
            typeSelected,
            isLoading: false,
            roleSelected: (this.$store.getters.registrationRole != '') ?true :false,
            role: this.$store.getters.registrationRole,
            roles: [
                {
                    title: 'student',
                    value: 'student',
                    desc: 'Excited to explore and learn new languages from the experts',
                    image: require("../assets/class_student.jpg")
                },
                {
                    title: 'Parent',
                    value: 'student',
                    desc: 'Manage lessons and payments for your child',
                    image: require("../assets/class_parent.jpg")
                },
                {
                    title: 'tutor',
                    value: 'tutor',
                    desc: 'Use your tutoring talents to teach languages to students',
                    image: require("../assets/class_tutor.jpg")
                }
            ]
        }
    },
    methods: {
        async registerUser() {
            if(this.validateInput()) {
                var body = {
                    fullname: this.firstnameModel.value + ' ' + this.lastnameModel.value,
                    email: this.emailModel.value,
                    password: this.passwordModel.value,
                    dob: this.dobModel.value,
                    role: this.$store.getters.registrationRole
                };

                this.isLoading = true;
            
                await this.$store.dispatch('register', body)
                .then(()=> {
                    if(this.$store.state.tempRoute != '') 
                        this.$router.push(`/${this.$store.state.tempRoute}`)

                    else this.$router.push('/profile')
                })
                .catch((error)=> {
                    this.isLoading = false;
                  
                    if( error.response.status == 409 )
                        this.emailModel.error = error.response.data.message
                    if (error.response.status == 422 )
                        this.formModel.error = error.response.data.message;
                });
            }
        },
        validateInput() {
            if(this.validateFirstname() && this.validateLastname() && this.validateDOB() && this.validateEmail() && this.validatePassword()) return true;
            else return false;
        },
        validateFirstname() { 
            if(this.firstnameModel.value.trim() == '') {
                this.firstnameModel.error = 'Firstname field cannot be empty';
                return false;
            }
            // if(this.fullnameModel.value.trim().split(' ').length != 2) {
            //     this.fullnameModel.error = 'Please seperate your first and last name with a space';
            //     return false;
            // }

            this.firstnameModel.error = '';
            return true;
        },
        validateLastname() { 
            if(this.lastnameModel.value.trim() == '') {
                this.lastnameModel.error = 'Lastname field cannot be empty';
                return false;
            }
            // if(this.fullnameModel.value.trim().split(' ').length != 2) {
            //     this.fullnameModel.error = 'Please seperate your first and last name with a space';
            //     return false;
            // }

            this.lastnameModel.error = '';
            return true;
        },
        validateDOB() {
            if(this.dobModel.value.trim() == '') {
                this.dobModel.error = 'Date Of Birth cannot be empty';
                return false;
            }

            if(!this.dateIsEligible(this.dobModel.value)) {
                if(this.role == 'tutor') this.dobModel.error = `You need to be at least 18 years to be a ${this.role}`;
                else this.dobModel.error = `You need to be at least 18 to handle your ${this.role} account yourself, please get your parent or guardian to create one for you.`;
                
                return false;
            }

            this.dobModel.error = '';
            return true;
        },
        validateEmail() { 
            if(this.emailModel.value == '') {
                this.emailModel.error = "Email field cannot be empty";
                return false;
            }
            if(!this.emailValidation(this.emailModel.value)) { 
                this.emailModel.error = "Email isn't valid";
                return false;
            }
            if(!this.checkEmail(this.emailModel.value)) {
                this.emailModel.error = "Email already exist";
                return false;
            }

            this.emailModel.error = '';
            return true;
        },
        validatePassword() {
            if(this.passwordModel.value == '') {
                this.passwordModel.error = "Password field cannot be empty";
                return false;
            }
            if(this.passwordModel.value.length < 8) {
                this.passwordModel.error = "Password cannot be less than 8 characters";
                return false;
            }

            this.passwordModel.error = '';
            return true;
        },
        async checkEmail(email) {
            try {
                await net.httpSec.get(`/user/checkemail/${email}`); 
                return true;

            } catch (error) {
                return false;
            }
        },
        emailValidation(email) {
            const emailRegExp = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
            
            if(emailRegExp.test(email)) return true;
            else false;
        },
        selectRole(value) {

            this.role = value;
            this.$store.dispatch('storerole', this.role)
            .then(()=> this.roleSelected = true );
        },
        dateIsEligible(value) {
            const dateofbirth = new Date(value).getTime(),
            today = new Date().getTime(),
            diffInMs = today - dateofbirth,

            // convert to years 
            years = parseInt(diffInMs / (1000 *  60 * 60 * 24 * 365));

            if(years <= 18) return false;
            return true;
        }
    },
    beforeRouteLeave (to, from, next) {
        this.$store.dispatch('clearrole')
        .then(()=> next());
    }
}
</script>

<style scoped>
    .header_wrapper {
        position: absolute;
        width: 100%;
        z-index: 10000;
    }
    .header_wrapper header {
        box-shadow: none;
    }
    .header_wrapper header:deep > * {
        color: white !important;
    }
    .header_wrapper header:deep nav > * {
        color: white !important;
    }
    .header_wrapper header:deep nav > * {
        color: white !important;
    }
    .header_wrapper header:deep #google_translate_element .goog-te-combo {
        color: white !important;
    }
    .header_wrapper header:deep #google_translate_element .goog-te-combo option {
        color: black !important;
    }

    section.body {
        display: flex;
        padding: 0;
        height: 100vh;
        padding-bottom: 10%;
    }

    div.image_wrapper {
        width: 100%;
        height: 100%;
        position: fixed;
    }
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    .overlay {
        background: linear-gradient(to right, rgba(18, 18, 18, 0.897),  rgba(18, 18, 18, 0.973));
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: absolute;
    }

    div.image-box {
        width: 45%;
        height: 80vh;
        margin: auto 0;
    }
    div.form-box-frame {
        width: 40%;
        min-height: 60%;
        padding: 5% 0;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 10%;
        top: 15vh;
        background: rgba(255, 255, 255, 0.16);
        border-radius: 10px;
    }

    div.error-message{
        text-align: start;
        padding: 0% 5%;
        color: red;
        font-size: 90%;
    }
    div.form-box {
        width: 70%;
        text-align: center;
    }
    div.heading {
        padding: 0% 5%;
        font-weight: 700;
        color: var(--paper-grey-100);
        font-size: 160%;
        margin-bottom: 5%;
        /* width: 75%; */
        text-align: center;
    }
    div.form-box input {
        width: 80%;
        height: 40px;
        font-weight: 500;
        padding: 1% 5%;
        font-size: 110%;
        border: 1px solid var(--paper-grey-100);
        background: none;
        color: white;
        outline: none;
        margin-top: 10px;
        border-radius: 5px;
    }
    
    div.form-box input::placeholder {
        color: var(--paper-grey-400);
    }
    div.form-box input.error {
        border: 1px solid rgb(255, 86, 86);
    }
    div.form-box input.error ~ div.error-message {
        display: block;
    }
    .register_btn_wrapper {
        height: 50px;
        width: 90%;
        margin: 0 auto;
        margin-top: 5%;
    }
    .register_btn_wrapper button {
        border-radius: 5px;
        border: none;
        background: var(--paper-grey-900);
        color: white;
    }
    div.legal{
        text-align: center;
        padding: 8% 0%;
        color: var(--paper-grey-400);
        width: 90%;
        margin: 0 auto;
    }
    div.orsignin {
        width: 80%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        color: var(--paper-grey-300);
    }
    div.orsignin a{
        font-weight: 700;
        font-size: 110%;
        color: var(--paper-grey-200);
    }
    
    .select_role_container {
        margin-top: 7%;
        padding: 2% 0;
        height: 70vh;
        background: rgba(255, 255, 255, 0.203);
        position: absolute;
        width: 80%;
        left: 10%;
        border-radius: 10px;
    }   
    .select_role_container > .title {
        margin-left: 10%;
        color: white;
        font-size: 300%;
        font-weight: 400;
    }
    .role_options {
        width: 80%;
        margin: 8% auto 0;
    }
    
    .grid_list {
        display: grid;
        --div: 3.3;
        grid-template-columns: calc(100% / var(--div)) calc(100% / var(--div)) calc(100% / var(--div));
        justify-content: space-between;
    }
    .option {
        border-radius: 15px;
        height: 400px;
        overflow: hidden;
        position: relative;
        transition: 0.2s;
    }
    .option:hover {
        transform: scale(1.1);
        box-shadow: var(--shadow);
        cursor: pointer;
    }
    .option:active {
        transform: scale(1);
    }
    .option .img_wrapper {
        width: 100%;
        height: 100%;
    }
    .option .content_wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.694);
        padding: 5%;
    }
    .option .text_wrapper {
        position: absolute;
        bottom: 5%;
        width: 100%;
        height: 40%;
    }
    .text_wrapper .title {
        color: var(--paper-grey-100);
        display: flex;
        align-items: center;
        font-size: 180%;
        text-transform: capitalize;
    }
    .text_wrapper .title .small {
        font-size: 80%;
    }
    .text_wrapper .title .large {
        font-size: 150%;
    }
    .text_wrapper .desc {
        color: var(--paper-grey-200);
        width: 70%;
        font-size: 140%;
        font-weight: 400;
    }
   

    .hidden {
        display: none;
    }

    @media screen and (max-width: 1200px) {
        .form-box-frame {
            width: 80%;
            right: 10%;
        }
        .select_role_container {
            margin-top: 10%;
            min-height: 70vh;
            height: unset;
            width: 90%;
            left: 5%;
        }
        .select_role_container > .title {
            margin-left: 5%;
            font-size: 250%;
        }
        .role_options {
            width: 90%;
            margin: 5% auto 0;
        }
        .grid_list {
            --div: 3.2;
        }

        .text_wrapper .title {
            color: var(--paper-grey-100);
            display: flex;
            align-items: center;
            font-size: 130%;
            text-transform: capitalize;
        }
        .text_wrapper .desc {
            width: 85%;
            font-size: 130%;
            font-weight: 400;
        }
    }

    @media screen and (max-width: 800px) {

        .select_role_container {
            margin-top: 20vh;
        }
        .option .text_wrapper {
            width: 90%;
        }
        .text_wrapper .title .small {
            font-size: 80%;
        }
        .text_wrapper .title .large {
            font-size: 140%;
        }
        .text_wrapper .desc {
            width: 90%;
            font-size: 130%;
            font-weight: 400;
        }
    }

    @media screen and (max-width: 630px) {
        div.form-box {
            width: 90%;
        }
        .select_role_container {
            margin-top: 15vh;
        }

        .select_role_container > .title {
            margin: 0 0 0;
            text-align: center;
            font-size: 150%;
        }
        .grid_list {
            display: block;
        }
        .option {
            height: 200px;
            margin-bottom: 3%;
        }
        .option .text_wrapper {
            position: absolute;
            bottom: 5%;
            height: 60%;
        }
    }

    @media screen and (max-width: 500px) {
        div.form-box-frame {
            margin-bottom: 5%;
            width: 90%;
            right: 5%;
            height: unset;
            min-height: 80%;
            text-align: start;
        }
        div.form-box {
            width: 100%;
        }
        div.heading {
            font-size: 130%;
        }

        .option .text_wrapper {
            height: 50%;
        }
        .text_wrapper .title {
            font-size: 150%;
        }
        .text_wrapper .desc {
            font-size: 100%;
            font-weight: 400;
        }

        div.legal{
            font-size: 90%;
        }
        div.orsignin {
            width: 90%;
            font-size: 90%;
        }
    }
</style>