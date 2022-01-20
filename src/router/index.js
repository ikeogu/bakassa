import { createRouter, createWebHistory } from 'vue-router'
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=> import('../views/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: ()=> import('../views/SignIn.vue'),
    meta: {
      authRoute: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: ()=> import('../views/Register.vue'),
    meta: {
      authRoute: true
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    beforeEnter: (to, from, next) => {
      store.dispatch('signout')
      .then(()=> router.push('/login'))
      .catch(()=> router.back());
    }
  },
  {
    path: '/tutors/explore',
    name: 'ExploreTutors',
    component: ()=> import('../views/ExploreTutors.vue'),
  },
  {
    path: '/tutor/:name',
    name: 'Tutor',
    component: ()=> import('../views/Tutor.vue'),
  },
  {
    path: '/become-tutor',
    name: 'BecomeTutor',
    component: ()=> import('../views/BecomeTutor/Index.vue'),
    children: [
      {
        path: '', name: 'Become Tutor Welcome',
        component: ()=> import('../views/BecomeTutor/Welcome.vue')
      },
      {  
        path: 'application', name: 'Become Tutor Application',
        component: ()=> import('../views/BecomeTutor/Application.vue'),
        async beforeEnter(to, from, next) {
          if(store.getters.userData) {
            if(store.getters.userData.role !== 'tutor') next()
            else {
              if(store.getters.tutorData == '') next()
            }
          } else {
            if(store.getters.token) {
              await store.dispatch('fetchuserdata')
              .then(async ()=> {
                if(store.getters.userData.role == 'tutor' && store.getters.tutorData == '') {
                  await store.dispatch('fetchtutordata')
                  .then(()=> next())
                  .catch(()=> next())
                
                } 
                else next()
              })
              .catch(()=> next('/logout'));
            } else {
              await store.dispatch('storerole', 'tutor')
              .then(()=> next('/register'));
            }
          }
        },
      }
    ]
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: ()=> import('../views/UserProfile.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'schedule', alias: '', name: 'UserSchedule',
        component:  ()=> import('../components/userprofile/Schedule/schedule.vue'),
      },
      {
        path: 'lessons', name: 'UserLessons',
        component:  ()=> import('../components/userprofile/Lessons/Index.vue'),
        children: [
          {
            path: '', name: 'All Lessons',
            component:  ()=> import('../components/userprofile/Lessons/lessons.vue'),
          },
          {
            path: 'create', name: 'Create Lesson',
            component:  ()=> import('../components/userprofile/Lessons/create.vue'),
          }
        ]
      },
      {
        path: 'tutors', name: 'UserTutors',
        component:  ()=> import('../components/userprofile/tutors.vue'),
      },
      {
        path: 'students', name: 'UserStudents',
        component:  ()=> import('../components/userprofile/Students.vue'),
      },
      {
        path: 'edit', name: 'EditProfile',
        component:  ()=> import('../components/userprofile/edit-profile.vue'),
      },
      {
        path: 'classes', name: 'UserClasses',
        component:  ()=> import('../components/userprofile/Classes/Index.vue'),
        children: [
          {
            path: '', name: 'All Classes',
            component:  ()=> import('@/components/userprofile/Classes/classes.vue'),
          },
          {
            path: 'saved', name: 'Saved',
            component:  ()=> import('@/components/userprofile/Classes/liveclass.vue'),
          }
        ]
      },
      {
        path: 'wallet', name: 'Wallet',
        component: ()=> import('../views/Wallet/Index.vue'),
        meta: { requiresAuth: true },
        children: [
          {
            path: '', name: 'WalletHistory',
            component: ()=> import('../views/Wallet/History.vue'),
          },
          {
            path: 'withdraw', name: 'WalletWithdrawal',
            component: ()=> import('../views/Wallet/History.vue'),
          },
        ]
      },
    ],
  },
  {
    path: '/community',
    name: 'Community',
    component: ()=> import('../views/Community/Index.vue'),
    children: [
      {
        path: '', name: 'Community Welcome',
        component: ()=> import('../views/Community/Welcome.vue'),
      },
      {
        path: ':language', name: 'Community Language',
        component: ()=> import('../views/Community/Questions.vue'),
      },
      {
        path: 'question/:question', name: 'Community Question',
        component: ()=> import('../views/Community/Question.vue'),
      },
      {
        path: 'new', name: 'Create New Question',
        component: ()=> import('../views/Community/New.vue'),
        meta: {
          requiresAuth: true
        },
      }
    ]
  },
  {
    path: '/booking-payment', name: 'BookingPayment',
    component: ()=> import('../views/Payment/Index.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '', name: 'BookingPaymentCheckOut',
        component: ()=> import('../views/Payment/Payment.vue'),
      },
      {
        path: 'success', name: 'BookingPaymentSuccess',
        component: ()=> import('../views/Payment/Success.vue'),
      },
    ]
  },
  {
    path: '/live-class', name: 'Live Class',
    component:  ()=> import('@/views/LiveClass.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});

router.beforeEach ( async (to, from, next)=> {
  
  if(to.matched.some(record=> record.meta.requiresAuth)) {
    if(store.getters.token) {
      if(store.getters.userData != '') {
        if(store.getters.userData.role == 'tutor' && store.getters.tutorData == '') {
          await store.dispatch('fetchtutordata')
          .then(()=> next())
          .catch(()=> next())

        } else next();
      } else {
    
        // fetch user data
        await store.dispatch('fetchuserdata')
        .then(async ()=> {
          if(store.getters.userData.role == 'tutor' && store.getters.tutorData == '') {
            await store.dispatch('fetchtutordata')
            .then(()=> next())
            .catch(()=> next())
          
          } 
          else next()
        })
        .catch(()=> next('/logout'));
      }
    }
    else next('/login');
  }

  else if(to.matched.some(record=> record.meta.isNotTutor)) {
    console.log(store.getters.userData.role);
    if(store.getters.userData.role !== 'tutor') next();
  }

  else next();
});

export default router
