<template>
    <div class="header_wrapper">
        <Header />
    </div>
    <section class="body">
        <div class="image_wrapper">
            <img src="@/assets/class1.jpg" />
            <div class="overlay"></div>
        </div>
        <div class="form-box-frame">
            <div class="form-box">
                <div class="heading">Log into <br /> your account  </div>
                <div class="form">

                    <div class="error-msg" v-if="formModel.error != ''">{{ formModel.error }}</div>
                    
                    <form @submit.prevent="signInButtonPressed">

                        <input 
                            :class="{
                                error: (emailModel.error != '') ?true :false
                            }"
                            v-model="emailModel.value" 
                            @keyup="validateEmail()" 
                            :type="emailModel.type" 
                            class="email" placeholder="Email" 
                            autocomplete="off"
                        >
                        <div class="error-message" v-if="emailModel.error != ''">{{ emailModel.error }}</div>

                        <input
                            :class="{
                                error: (passwordModel.error != '') ?true :false
                            }"
                            v-model="passwordModel.value" 
                            @keyup="validatePassword()" 
                            :type="passwordModel.type" 
                            placeholder="Password" 
                            autocomplete="off"
                        >
                        <div class="error-message" v-if="passwordModel.error != ''">{{ passwordModel.error }}</div>

                        <div class="link">
                            <router-link to="/"> Forgot your password? </router-link>
                        </div>
                        
                        <div class="signin_btn_wrapper">
                            <ButtonPlainText 
                                buttonText='SIGN IN' 
                                :isLoading="isLoading" 
                                @button-action="signUserIn" 
                            />
                        </div>

                    </form>
                    <div class="orsignup">
                        Don't have an account? 
                        <router-link to="/register"> Create account </router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Header from '../components/Header/Header.vue';
    import ButtonPlainText from '@/components/buttons/ButtonPlainText.vue';
    
    export default {
        components: { Header, ButtonPlainText },
        data() {
            var emailModel = {
                    type: 'email',
                    value: '',
                    error: ''
                },
                passwordModel = {
                    type: 'password',
                    value: '',
                    error: ''
                },
                formModel = {
                    error: ''
                },
                isDisabled = true;

            return { 
                emailModel,
                passwordModel, 
                formModel, 
                isDisabled,
                isLoading: false
            }
        },
        methods: {
            async signUserIn() {
                if (this.validateInput()) {
                    
                    this.isLoading = true;
                    
                    var body = {
                        email: this.emailModel.value,
                        password: this.passwordModel.value
                    };

                    await this.$store.dispatch("signin", body)
                    .then(()=> {
                        if(this.$store.getters.tempRoute)
                            this.$router.push(`/${this.$store.getters.tempRoute}`)
                        else this.$router.push('/profile')
                    })
                    .catch(error => {

                        console.log(error);
                        this.isLoading = false;

                        if(error.response.status == 404)
                            this.formModel.error = "Invalid Login Credentials";
                        else
                            this.formModel.error = "A server error occurred, please try logging in again";
                    });
           
                }
            },
            validateInput() {
                if(this.validateEmail() && this.validatePassword()) return true;
                else false;
            },
            validateEmail() {
                if(this.emailModel.value == '') {
                    this.emailModel.error = "Email field cannot be empty";
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

                this.passwordModel.error = '';
                return true;
            }
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
        color: white;
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
    }
    
    div.image_wrapper {
        width: 100%;
        height: 100%;
        position: relative;
    }
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    .overlay {
        background: linear-gradient(to right, rgba(18, 18, 18, 0.432),  rgba(18, 18, 18, 0.808));
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: absolute;
    }

    div.form-box-frame {
        width: 40%;
        height: 80%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 10%;
        bottom: 5%;
        background: rgba(255, 255, 255, 0.16);
        border-radius: 10px;
    }

    div.error-message, div.error-msg {
        text-align: start;
        padding: 0% 5%;
        color: rgb(255, 86, 86);
        font-size: 90%;
    }
    div.error-msg {
        font-size: 100%;
    }

    div.form-box {
        width: 70%;
        text-align: center;
    }
    div.heading {
        padding: 0% 5%;
        font-weight: 700;
        color: var(--paper-grey-100);
        font-size: 220%;
        margin-bottom: 5%;
        text-align: start;
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
    div.link{
        text-align: right;
        width: 95%;
        padding: 0% 0% 0%;
        margin: 2% 0%;
        color: white;
        font-size: 90%;
        font-weight: 500; 
    }
    div.orsignup {
        width: 90%;
        margin: 10% auto 0;
        display: flex;
        justify-content: space-between;
        color: var(--paper-grey-300);
    }
    div.orsignup a{
        font-weight: 700;
        font-size: 100%;
        color: var(--paper-grey-200);
    }
    .signin_btn_wrapper {
        height: 50px;
        width: 90%;
        margin: 0 auto;
        margin-top: 5%;
    }
    .signin_btn_wrapper button {
        border-radius: 5px;
        border: none;
        background: var(--paper-grey-900);
        color: white;
    }

    @media screen and (max-width: 1280px) {
        .header_wrapper {
            
        }
    } 

    @media screen and (max-width: 1200px) {
        div.form-box-frame {
            width: 80%;
            right: 10%;
        }
    }

    @media screen and (max-width: 630px) {
        div.form-box {
            width: 90%;
        }
    }

    @media screen and (max-width: 500px) {
        div.form-box-frame {
            width: 90%;
            right: 5%;
        }
        div.form-box {
            width: 100%;
        }

        div.orsignup {
            width: 90%;
            font-size: 90%;
        }
    }
</style>