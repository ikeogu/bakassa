<template>
    <div class="profile">
        <Header />
        <section class="profile_frame" v-if="userInfo != ''">
            <div class="side_bar">
                <div class="user">
                    <div class="user_image">
                        <img src="../assets/userimage.png">
                    </div>
                    <div class="user_info">
                        <div class="role">{{ userInfo.role }} (Parent)</div>
                        <div class="name">{{ userInfo.fullname }}</div>
                    </div>
                </div>
                <div class="nav">
                    <div
                        v-for="(navItem, index) in nav"
                        :key="index"
                        class="menu_item"
                    >
                        <router-link
                            class="menu_item_link"
                            :to="navItem.path"
                        >
                            <div class="icon"><img :src="navItem.source" /></div>
                            <div class="label"> {{ navItem.label }} </div>
                        </router-link>
                    </div>
                </div>

                <!-- <div class="user">
                    <div class="user-info">
                        <div class="metrics">
                            <div class="">
                                <div class="title">Total Classes</div>
                                <div class="figure">4</div>
                            </div>
                            <div class="">
                                <div class="title">Classes Taken</div>
                                <div class="figure">1</div>
                            </div>
                            <div class="">
                                <div class="title">Pending Classes</div>
                                <div class="figure">3</div>
                            </div>
                        </div>
                    </div>
                </div> -->

            </div>
            <div class="profile_content">
                <router-view
                    v-if="userInfo.role != 'tutor'"
                />
                <router-view
                    v-else-if="userInfo.role == 'tutor'  && isTutor"
                />
                <div class="complete_registration_wrapper" v-else >
                    <CompleteReg
                        text="To access this you have to complete your tutor registration"
                    />
                </div>
            </div>
        </section>
        <SiteFooter />
    </div>
</template>

<script>
    import Header from '../components/Header/Header.vue';
    import SiteFooter from '../components/SiteFooter.vue';
    import CompleteReg from '../components/tutor/CompleteRegModal.vue'

    export default {
        components: { Header, SiteFooter, CompleteReg },
        data() {

            const studentMenu = [
                {
                    label: 'schedule',
                    path: '/profile/schedule',
                    source: require('../assets/icons/schedule.png')
                },
                {
                    label: 'my lessons',
                    path: '/profile/lessons',
                    source: require('../assets/icons/online-lesson.png')
                },
                {
                    label: 'my Tutors',
                    path: '/profile/tutors',
                    source: require('../assets/icons/tutor.png')
                },
                {
                    label: 'Wallet',
                    path: '/profile/wallet',
                    source: require('../assets/icons/wallet.png')
                },
                {
                    label: 'edit profile',
                    path: '/profile/edit',
                    source: require('../assets/icons/editprofile.png')
                },
                {
                    label: 'logout',
                    path: '/logout',
                    source: require('../assets/icons/logout.png')
                }
            ],
            tutorMenu = [
                {
                    label: 'schedule',
                    path: '/profile/schedule',
                    source: require('../assets/icons/schedule.png')
                },
                {
                    label: 'my classes',
                    path: '/profile/classes',
                    source: require('../assets/icons/online-lesson.png')
                },
                {
                    label: 'my lessons',
                    path: '/profile/lessons',
                    source: require('../assets/icons/online-lesson.png')
                },
                {
                    label: 'my students',
                    path: '/profile/students',
                    source: require('../assets/icons/students.png')
                },
                {
                    label: 'Wallet',
                    path: '/profile/wallet',
                    source: require('../assets/icons/wallet.png')
                },
                {
                    label: 'edit profile',
                    path: '/profile/edit',
                    source: require('../assets/icons/editprofile.png')
                },
                {
                    label: 'logout',
                    path: '/logout',
                    source: require('../assets/icons/logout.png')
                }
            ];

            var nav = [];

            if(this.$store.getters.userData.role == 'student')
                nav = studentMenu;
            if(this.$store.getters.userData.role == 'tutor')
                nav = tutorMenu;

            return {
                userInfo: this.$store.getters.userData,
                nav,
                currentNav: 0,
                isTutor: (this.$store.getters.tutorData == '') ?false :true
            }
        },
        methods: { },
        async beforeMount() {

        }
    }
</script>

<style scoped>
    .profile_frame {
        width: 90%;
        margin: 2% auto;
        display: flex;
    }
    .side_bar {
        box-shadow: 0px 0px 2px 1px var(--paper-grey-200);
        height: 75vh;
        width: 18%;
        border-radius: 10px;
        padding: 1% 0;
    }
    .user {
        width: 100%;
        display: flex;
        margin-top: 5%;
    }
    .user_image {
        border-radius: 50%;
        height: 60px;
        width: 60px;
        overflow: hidden;
        box-shadow: 0px 0px 3px 1px var(--paper-grey-200);
        margin-left: 10%;
    }
    .user_info {
        margin-left: 5%;
        text-transform: capitalize;
    }
    .user_info .role {
        color: var(--paper-grey-600);
        font-size: 100%;
        font-weight: 500;
    }
    .user_info .name {
        font-size: 120%;
        font-weight: 500;
    }

    .metrics {
        display: flex;
    }
    .metrics .title {
        font-size: 80%;
    }

    .nav {
        margin-top: 10%;
    }
    .menu_item {
        height: 50px;
    }
    .menu_item:hover {
        background: var(--paper-grey-100);
    }
    .menu_item .icon {
        width: 25px;
        height: 25px;
    }
    .menu_item .icon img {
        filter: grayscale(100%);
    }
    .menu_item .label {
        text-transform: capitalize;
        font-weight: 600;
        color: var(--paper-grey-700);
        margin-left: 5%;
    }
    .menu_item_link {
        display: flex;
        align-items: center;
        height: 100%;
        padding-left: 15%;
    }
    .menu_item_link.router-link-active {
        background: var(--paper-grey-100);
    }

    .profile_content {
        width: 80%;
        min-height: 70vh;
        padding: 0 1%;
    }
    .complete_registration_wrapper {
        margin-top: 10%;
    }
</style>
