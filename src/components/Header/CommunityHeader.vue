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
       
        <div class="user-nav" v-show="isLoggedIn" @click="toggleProfileMenu">
            <div class="user-image">
                <img src="../../assets/userimage.png">
            </div>
            <UserProfileMenu v-if="showUserMenu" :nav="nav" />
        </div>
            
        <router-link to="/login" class="login_btn" v-if="!isLoggedIn">Login</router-link>
        
        <router-link to="/register" class="register_btn" v-if="!isLoggedIn"> Sign Up </router-link>
    </header>
</template>

<script>
import UserProfileMenu from '@/components/userprofile/UserProfileMenu.vue';

export default {
    name: 'community-header',
    components: { UserProfileMenu },
    data() {

        var isLoggedIn, showUserMenu = false;

        if(localStorage.getItem("access-token")) isLoggedIn = true;
        else isLoggedIn = false;

        return {
            fullname: this.$store.getters.userData.fullname,
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
            showSideBar: false
        }
    },
    methods: { 
       
        
        toggleProfileMenu() {
            this.showUserMenu = !this.showUserMenu;
        },
        toggleSideBar() {
            this.showSideBar = !this.showSideBar;
        },
    }
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
    .logo {
        font-weight: 700;
        font-size: 200%;
        color: var(--burgundy-100);
    }
    
    .dropdown_wrapper {
        /* border: 1px solid; */
        width: 10%;
        margin-left: 5%;
        margin-right: auto;
    }
    .dropdown_wrapper:deep * {
        font-size: 110%;
    }

    div.user-nav {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 45px;
        position: relative;
        cursor: pointer;
        margin-left: auto;
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

    @media screen and (max-width: 1280px) {
        div.drop-down {
            width: 12%;
        }   
    } 

    @media screen and (max-width: 1100px) {
        div.logo {
            font-size: 150%;
        }
        div.drop-down {
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

    @media screen and (max-width: 750px) {
        .menu_bar {
            display: block;
            font-size: 140%;
            margin-right: 2%;
            color: var(--burgundy-100);
        }
        .drop-down, 
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

    @media screen and (max-width: 600px) {
        .mobile_nav_container .mobile_nav_wrapper {
            width: 60%;
        }
    }

</style>

