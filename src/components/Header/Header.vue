<template>
    <header>
        <font-awesome-icon
            :icon="['fas', 'bars']"
            class="menu_bar"
            @click="toggleSideBar()"
        />

        <div class="logo">
            <router-link to="/">
                Bukassa
            </router-link>
        </div>

        <div class="drop_down_section">
            <Translator class="translator"/>
            <HeaderNestedDropDown class="currency"/>
        </div>

        <nav>

            <router-link to="/tutors/explore">Find a tutor</router-link>
            <router-link :to="`/community/${this.$store.getters.communityLanguage}`">Community</router-link>
            <router-link to="/become-tutor" v-if="userRole !== 'tutor'">Become a tutor</router-link>
        </nav>

        <div class="user-nav" v-show="isLoggedIn" @click="toggleProfileMenu">
            <div class="user-image">
                <img src="@/assets/userimage.png">
            </div>
            <UserProfileMenu v-if="showUserMenu" :nav="nav" />
        </div>

        <router-link to="/login" class="login_btn" v-if="!isLoggedIn">Login</router-link>

        <router-link to="/register" class="register_btn" v-if="!isLoggedIn"> Sign Up </router-link>


        <div class="mobile_nav_container mobile" v-if="showSideBar">
            <div class="layer" @click="toggleSideBar()"></div>
            <div class="mobile_nav_wrapper">
                <div class="user">
                    <div class="profile_min" v-if="isLoggedIn">
                        <div class="user-image">
                            <img src="@/assets/userimage.png">
                        </div>
                        <div class="name">
                            {{ fullname }}
                        </div>
                    </div>

                    <router-link to="/login" class="mobile_login_btn" v-else>
                        <div class="nav">
                            Login
                        </div>
                    </router-link>
                </div>

                <div class="mobile_nav_list_frame">

                    <router-link to="/tutors/explore">
                        <div class="nav">
                            Find a tutor
                        </div>
                    </router-link>

                    <!-- <router-link to="/community">
                        <div class="nav">
                            Community
                        </div>
                    </router-link> -->

                    <router-link to="/become-tutor" v-if="userRole !== 'tutor'">
                        <div class="nav">
                            Become a tutor
                        </div>
                    </router-link>

                </div>

                <div class="copyright">&copy; 2021 Bukassa, All rights reserved.</div>
            </div>
        </div>

    </header>
</template>

<script>

import HeaderNestedDropDown from '@/components/DropDown/HeaderNestedDropDown.vue';
import UserProfileMenu from '@/components/userprofile/UserProfileMenu.vue';
import Translator from "../Translator.vue";
import axios from "axios";
var IPGeolocationAPI = require('ip-geolocation-api-javascript-sdk');
var ipgeolocationApi = new IPGeolocationAPI("17de5a0f1a0f494e977e73309eaf9461", false);

var isLoggedIn, showUserMenu = false;


export default {
    name: 'Header',
    components: { HeaderNestedDropDown, UserProfileMenu, Translator },
    data() {
         if(localStorage.getItem("access-token")) isLoggedIn = true;
        else isLoggedIn = false;

        let isOptionsVisible = [false, false], selected = [true, true];

        let selectedCurrencyIndex = 0, selectedLanguageIndex = 0;

        const userRole = this.$store.getters.userData.role;

       return {
                defaultLanguageCode: "en",
                myLocation :{
                    currencyName :'',
                    abbr :'',
                    symbol : '',
                    rateFromDollar :''

                },

                fullname: this.$store.getters.userData.fullname ,
                userRole,
                allCurrencies:[

                    {
                        currency_name: 'Great Britain Pound',
                        display_name: "GBP £",
                        value: "£",
                        rateFromDollar: 0.73
                    },
                    {
                        currency_name: 'Nigerian Naira',
                        display_name: "NGN ₦",
                        value: "₦",
                        rateFromDollar: 470.00
                    },
                    {
                        currency_name: 'United States Dollar',
                        display_name: "USD $",
                        value: "$",
                        rateFromDollar: 1
                    }
                ],

                isOptionsVisible,
                selectedCurrencyIndex,
                selectedLanguageIndex,
                selected,
                showUserMenu,
                isLoggedIn,
                nav: [
                    {
                        label: 'Profile',
                        path: '/profile',
                        icon: ''
                    },
                    {
                        label: 'logout',
                        path: '/logout',
                        icon: ''
                    }
                ],
                showSideBar: false,
                allLanguages :[
                    {
                        display_name: "English",
                        value: "english",
                    },
                    {
                        display_name: "French",
                        value: "french"
                    },
                    {
                        display_name: "Yoruba",
                        value: "yoruba"
                    }
                ]

        }



    },

    methods: {
        getSelectedIndex() {
            for (let index = 0; index < this.allCurrencies.length; index++) {
                const element = this.allCurrencies[index];

                if (element.value == this.$store.state.prefCurrency.symbol)
                    this.selectedCurrencyIndex = index;
            }

            for (let index = 0; index < this.allLanguages.length; index++) {
                const element = this.allLanguages[index];

                if (element.value == this.$store.state.prefLanguage)
                    this.selectedLanguageIndex = index;
            }
        },
        hideAllOptions() {
            for(var i=0; i < this.isOptionsVisible.length; i++) {
                this.isOptionsVisible[i] = false;
            };
        },
        toggleOptions(index){
            this.isOptionsVisible[index] = !this.isOptionsVisible[index];
        },
        resetLanguage(index) {
            this.selectedLanguageIndex = index;
            this.selected[0] = true;
            this.toggleOptions(0);
            this.$store.commit('changePrefLanguage', this.allLanguages[this.selectedLanguageIndex]);
        },
        resetCurrency(index) {
            this.selectedCurrencyIndex = index;
            this.selected[1] = true;
            this.toggleOptions(1);
            this.$store.commit('changePrefCurrency', this.allCurrencies[this.selectedCurrencyIndex]);
        },
        toggleProfileMenu() {
            this.showUserMenu = !this.showUserMenu;
        },
        toggleSideBar() {
            this.showSideBar = !this.showSideBar;
        },
         handleResponse(json) {

             this.myLocation.currencyName = json.currency.name;
             this.myLocation.abbr = json.currency.code;
             this.myLocation.symbol =json.currency.symbol
        }

    },
    beforeMount() {


        if(localStorage.getItem("currency") == null ) {

            localStorage.setItem(
                "currency",
                JSON.stringify({
                    currencyName: this.myLocation.currencyName,
                    abbr: this.myLocation.abbr,
                    symbol: this.myLocation.symbol,
                    rateFromDollar: 0.73
                })
            );
            console.log(localStorage.getItem("currency"));
            this.$store.commit('changePrefCurrency', this.allCurrencies[0]);
        }

        if(localStorage.getItem("language") == null ) {
            localStorage.setItem(
                "language",
                JSON.stringify({
                    display_name: "English",
                    value: "english",
                })
            );

            this.$store.commit('changePrefLanguage', this.allLanguages[0]);
        }

        this.getSelectedIndex();
    },

mounted() {
    ipgeolocationApi.getGeolocation(this.handleResponse);




},
}
</script>

<style scoped>
    header {
        box-shadow: 0px 0px 5px 2px var(--shadow-color);
        display: flex;
        align-items: center;
        height: 80px;
        padding: 0% 5%;
    }
    .menu_bar {
        display: none;
    }
    div.logo {
        font-weight: 700;
        font-size: 200%;
        color: var(--burgundy-100);
    }
    .drop_down_section {
        margin-left: auto;
        width: 20%;
        height: 50%;
        position: relative;
        display: flex;
    }
    .drop_down_section > div {
        height: 100% !important;
    }
    .translator {
        width: 75% !important;
    }
    .currency {
        width: 35% !important;
    }

    nav {
        margin: 0% 0% 0% 3%;
        display: flex;
        justify-content: space-between;
    }
    nav > * {
        padding: 0px 30px 0px 0px;
        font-size: 110%;
        font-weight: 500;
        color: var(--paper-grey-600);
    }

    div.user-nav {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 45px;
        position: relative;
        cursor: pointer;
    }
    div.user-image {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        overflow: hidden;
        background: rgb(238, 238, 238);
    }

    div.no_user_nav {
        display: flex;
        justify-content: space-between;
        height: 100%;
    }
    div.no_user_nav > div {
        border-radius: 5px;
        font-weight: 600;
        font-size: 100%;
    }
    .login_btn {
        font-weight: 700;
        margin: auto 0;
        margin-right: 1%;
        width: max-content;
    }

    .become_tutorial_btn,
    .register_btn {
        background: var(--burgundy-100);
        color: white;
        overflow: hidden;
        border-radius: 5px;
        font-weight: 600;
        font-size: 90%;
        height: 50%;
        display: flex;
        align-items: center;
        margin: auto 0;
        padding: 0 1%;
    }

    .become_tutorial_btn {
        margin-left: 2%;
    }

    .mobile {
        display: none;
    }

    @media screen and (max-width: 1200px) {
        div.drop_down_section {
            width: 12%;
        }
    }

    @media screen and (max-width: 1200px) {
        div.logo {
            font-size: 150%;
        }
        div.drop_down_section {
            width: 15%;
            font-size: 80%;
        }
        nav > * {
            padding: 0px 10px 0px 0px;
        }

        .login_btn {
            display: none;
        }
        .register_btn {
            display: none;
        }

        .become_translator_btn {
            font-size: 85%;
            height: 40%;
        }
    }

    @media screen and (max-width: 768px) {
        .menu_bar {
            display: block;
            font-size: 140%;
            margin-right: 2%;
            color: var(--burgundy-100);
        }
        .drop_down_section,
        nav,
        .user-nav,
        .notmobile {
            display: none !important;
        }
        .logo {
            margin-right: auto;
        }

        .mobile {
            display: block;
        }

        .mobile_nav_container {
            display: unset;
            width: 100%;
            height: 100vh;
            position: fixed;
            left: 0;
            top: 0;
        }
        .mobile_nav_container .layer {
            background: rgba(0, 0, 0, 0.568);
            width: 100%;
            height: 100%;
        }
        .mobile_nav_container .mobile_nav_wrapper {
            position: absolute;
            left: 0;
            top: 0;
            background: white;
            width: 40%;
            height: 100%;
            padding: 5% 0;
            z-index: 1;
        }
        .user {
            height: 10%;
        }
        .profile_min {
            width: 90%;
            margin: 0 auto;
        }
        .mobile_login_btn .nav {
            background: black;
            color: white;
            border-radius: 5px;
            width: 70%;
            margin: 0 auto;
        }
        .mobile_nav_list_frame {
            height: 80%;
        }
        .nav {
            height: 50px;
            display: flex;
            align-items: center;
            padding-left: 10%;
            font-weight: 700;
            color: var(--paper-grey-700);
        }

        .copyright {
            color: var(--paper-grey-600);
            font-size: 75%;
            width: 80%;
            height: 5%;
            display: flex;
            align-items: center;
            margin: 0 auto;
        }

    }

    @media screen and (max-width: 578px) {
        .mobile_nav_container .mobile_nav_wrapper {
            width: 60%;
        }
    }

</style>

