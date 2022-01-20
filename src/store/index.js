import { createStore } from 'vuex';
import net from "../services/http";
import axios from "axios";

const baseURL = process.env.VUE_APP_API_BASE_URL;

export default createStore({
    state: {
        isSignedIn: false,
        token: localStorage.getItem('access-token') || '',
        user: '',
        tutor: '',
        tutors: [],
        prefCurrency: JSON.parse(localStorage.getItem('currency')),
        prefLanguage: localStorage.getItem('language'),
        bookingInfo: '',
        counter: 0,
        tempRoute: '',
        class: '',
        role: '',
        communityLanguage: 'english',
        communityLanguages: ['']
    },
    mutations: {
        changePrefCurrency(state, payload){
            var selectedCurrency = {
                currencyName: payload.currency_name,
                abbr: payload.display_name,
                rateFromDollar: payload.rateFromDollar,
                symbol: payload.value
            };
            
            localStorage.setItem(
                "currency", 
                JSON.stringify(selectedCurrency)
            );
            
            state.prefCurrency = selectedCurrency;
        },
        changePrefLanguage(state, payload){
            var selectedlang = payload.value;
            
            localStorage.setItem('language', selectedlang);
            state.prefLanguage = selectedlang;
        },
        store_event(state, payload) {
            localStorage.setItem('bookinginfo', JSON.stringify(payload));
            state.bookingInfo = payload;
        },
        saveUser(state, payload) {
            localStorage.setItem('user', JSON.stringify(payload));
            state.user = payload;
        },
        store_user(state, payload) {
            state.user = payload;
        },
        store_tutor(state, payload) {
            state.tutor = payload;
        },
        store_tutors(state, payload) {
            state.tutors = payload;
        },
        store_token(state, payload) {
            localStorage.setItem('access-token', payload);
            state.token = payload;
        },
        save_class_info(state, payload) {
            state.class = payload;
        },
        clear_user(state) {
            state.user = {};
            state.token = '';
            localStorage.removeItem('access-token');
            this.commit('update_auth_status', true);
        },
        update_auth_status(state, payload) {
            state.isSignedIn = payload;
        },
        auth_success(state, payload) {
            this.commit('store_token', payload.token);
            this.commit('store_user', payload.user);
            this.commit('update_auth_status', true);
        },
        store_user_role(state, payload) {
            state.role = payload;
        },
        clear_user_role(state, payload) {
            state.role = '';
        },
        store_community_language(state, payload) {
            state.communityLanguage = payload;
        },
        store_community_languages(state, payload) {
            state.communityLanguages = payload;
        }
    },
    actions: { 
        storerole({commit}, payload){
            return new Promise((resolve)=> {
                commit('store_user_role', payload);
                resolve();
            })
        },
        signin({commit}, payload) {    
            return new Promise( async (resolve, reject)=>{
                await axios.post(`${baseURL}/user/auth`,  payload)
                .then((response)=> {
                    const token = response.data.token,
                    user = response.data.user;

                    commit('auth_success', { token, user });

                    resolve();

                })
                .catch((error)=> {
                    commit('clear_user');
                    reject(error);
                });
            });
        },
        updatesigninstatus({commit}, payload){
            return new Promise(async (resolve, reject)=> {
                commit('update_auth_status', payload);
                resolve();
            });
        },
        register({commit}, payload) {    
            return new Promise( async (resolve, reject)=>{
                await axios.post(`${baseURL}/user/register`, payload)
                .then((response)=> {
                    const token = response.data.token,
                    user = response.data.user;

                    commit('auth_success', { token, user });
                    commit('clear_user_role');

                    resolve();

                })
                .catch((error)=> {
                    commit('clear_user');
                    commit('clear_user_role');

                    reject(error);
                });
            });
        },
        signout({commit}) {
            return new Promise( resolve=> {
                commit('clear_user');
                commit('clear_user_role');
                
                resolve();
            });
        },
        fetchuserdata({commit}) {
            return new Promise(async (resolve, reject)=> {
                
                const headers = { 'x-access-token':`Bearer ${this.state.token}` }
                
                await axios.get(
                    `${baseURL}/user/profile/me`,
                    { headers: headers }
                )
                .then((response)=> {
              
                    const user = response.data.user;
                    commit('store_user', user);

                    resolve(user);
                })
                .catch((error)=> {
                    reject(error);
                });
            });
        },
        fetchtutordata({commit}) {
            return new Promise(async (resolve, reject)=> {

                const headers = { 'x-access-token':`Bearer ${this.state.token}` };

                await axios.get(
                    `${baseURL}/tutors/me/${this.state.user.email}`,
                    { headers: headers }
                )
                .then((response)=> {
                    const tutor = response.data.data;
                    commit('store_tutor', tutor);
                    
                    resolve();
                })
                .catch((error)=> {
                    console.log(error.response);
                    reject(error);
                });
            });
        },
        submittutorapplication({commit}, payload) {
            return new Promise(async (resolve, reject)=> {
                
                const headers = {
                    'Content-Type': 'multipart/form-data',
                    'x-access-token':`Bearer ${this.state.token}`
                };
                
                await axios.post(`${baseURL}/tutors/becometutor`, payload, 
                    { headers: headers })
                .then((response)=> {
                    
                    const tutor = response.data.tutor,
                    user = response.data.user;

                    commit('store_tutor', tutor);
                    commit('store_user', user);

                    resolve();
                })
                .catch((error)=> {
                    console.log(error.response);
                    reject(error);
                });
            });
        },
        createlesson({commit}, payload) {
            return new Promise(async (resolve, reject)=> {
                const headers = { 'x-access-token':`Bearer ${this.state.token}` };

                await axios.post(
                    `${baseURL}/tutors/createlesson`, payload,
                    { headers: headers }
                )
                .then((response)=> {
                    const tutor = response.data.tutor;
                    commit('store_tutor', tutor);

                    resolve();
                })
                .catch((error)=> reject(error));
            });
        },
        fetchtutors({commit}) {
            return new Promise(async (resolve, reject)=> {
                await axios.get(`${baseURL}/tutors/explore`)
                .then((response)=> {                
                    const tutors = response.data.data;
                    commit('store_tutors', tutors);

                    resolve(tutors);
                })
                .catch((error)=> {
                    console.log(error);
                    reject(error);
                });
            });
        },
        fetchtutor({commit}, payload) {
            return new Promise(async (resolve, reject)=> {
                await axios.get(`${baseURL}/tutors/explore/${payload}`)
                .then((response)=> {
                    const tutor = response.data.data;
                    resolve(tutor);
                })
                .catch((error)=> {
                    console.log(error);
                    reject(error);
                });
            });
        },
        storenewevent({commit}, payload) {
            commit('store_event', payload);
        },
        createevent({commit}, payload) {
            return new Promise(async (resolve, reject)=> {
                const headers= { 'x-access-token':`Bearer ${this.state.token}` };
                
                await axios.post(
                    `${baseURL}/tutors/${payload.tutorname}/newevent`, 
                    { newevent: payload },
                    { headers: headers }
                ).then((updatedUserInfo)=> {
                    commit('store_user', updatedUserInfo);
                    resolve();

                }).catch((error)=> {
                    console.log(error);
                    reject(error)

                });
            });
        },
        sendmessage({commit}, payload) {
            return new Promise(async (resolve, reject)=> {
                const headers= {'x-access-token':`Bearer ${this.state.token}`};

                await axios.post(
                    `${baseURL}/chat/sendmessage`, payload,
                    { headers: headers }
                ).then((response)=> {
                    resolve(response.data.messages);

                }).catch((error)=> {
                    console.log(error);
                    reject(error)

                });
            });
        },
        fetchmessages({commit}, payload) {
            return new Promise(async (resolve, reject) => {
                const headers = {'x-access-token':`Bearer ${this.state.token}`}
                
                await axios.get(`${baseURL}/chat/${payload}`,
                    { headers: headers }
                ).then((response)=> {
                    resolve(response.data.messages);

                }).catch((error)=> {
                    console.log(error);
                    reject(error)

                });
            });
        },
        fetchuser({commit}, payload) {
            return new Promise( async (resolve, reject)=> {
                const headers = {'x-access-token':`Bearer ${this.state.token}`};

                await axios.get(
                    `${baseURL}/user/profile/${payload}`,
                    { headers: headers }
                )
                .then((response)=> {
                    resolve(response.data.user);
                })
                .catch((error)=> {
                    reject(error);
                });
            });
        },
        setupclass({commit}, payload) {
            return new Promise((resolve, reject)=> {
                commit('save_class_info', payload);
                resolve();
            })
        },
        edittutorprofile({commit}, payload) {
            return new Promise( async (resolve, reject)=> {
                const headers = {'x-access-token':`Bearer ${this.state.token}`},
                endpoint = `${baseURL}/tutors/edit/`;
                
                await axios.post(endpoint, payload, { headers: headers })
                .then((response)=> resolve(response.data.user))
                .catch((error)=> reject(error));
            });
        },
        clearrole({commit}){
            commit('clear_user_role');
        },
        storecommunitylanguage({commit}, payload) {
            return new Promise((resolve, reject)=> {
                commit('store_community_language', payload);
                resolve();
            });
        },
        fetchcommunityquestions({commit}) {
            return new Promise(async (resolve, reject)=> {
             
                const url = `${baseURL}/community/questions/${this.state.communityLanguage}`;
                
                await axios.get(url)
                .then((response)=> resolve(response.data.data))
                .catch((error)=> reject(error));
            });
        },
        fetchcommunityquestion({commit}, payload) {
            return new Promise(async (resolve, reject)=> {
             
                const url = `${baseURL}/community/question/${payload}`;
                
                await axios.get(url)
                .then((response)=> resolve(response.data.data))
                .catch((error)=> reject(error));
            });
        },
        createquestion({commit}, payload) {
            return new Promise(async (resolve, reject)=> {
                
                const headers = {'x-access-token':`Bearer ${this.state.token}`},
                url = `${baseURL}/community/questions/create`;
                
                await axios.post(url, payload, 
                { headers: headers })
                .then((response)=> resolve(response.data.data))
                .catch((error)=> reject(error));
            });
        },
        submitcomment({commit}, payload) {
            return new Promise(async (resolve, reject)=> {
                const headers = {'x-access-token':`Bearer ${this.state.token}`},
                url = `${baseURL}/community/comment/create`;

                await axios.post(url, payload, { headers: headers })
                .then((response)=> resolve(response.data.data))
                .catch((error)=> reject(error));
            });
        },
        fetchcommunitylanguages({commit}) {
            return new Promise(async (resolve, reject)=> {
                const url = `${baseURL}/community/languages`;

                await axios.get(url)
                .then((response)=> {
                    resolve(response.data.data);
                })
                .catch((error)=> reject(error));
            });
        },
        submitcommentreply({commit}, payload) {
            return new Promise(async (resolve, reject)=> {
                const headers = {'x-access-token':`Bearer ${this.state.token}`},
                url = `${baseURL}/community/comment/reply`;

                await axios.post(url, payload, { headers: headers })
                .then((response)=> resolve(response.data.data))
                .catch((error)=> reject(error));
            });
        },
        submitreplytoreply({commit}, payload) {
            return new Promise(async (resolve, reject)=> {
                const headers = {'x-access-token':`Bearer ${this.state.token}`},
                url = `${baseURL}/community/comment/replytoreply`;

                await axios.post(url, payload, { headers: headers })
                .then((response)=> resolve(response.data.data))
                .catch((error)=> reject(error));
            });
        },
        submitwithdrawalrequest({commit}, payload) {
            return new Promise(async (resolve, reject)=> {
                const headers = {'x-access-token':`Bearer ${this.state.token}`},
                url = `${baseURL}/tutors/withdraw`;

                axios.post(url, payload, { headers: headers })
                .then((response)=> {
                    commit('store_tutor', response.data.tutor);
                    resolve(response.data.tutor);
                })
                .catch((error)=> {
                    console.log(error)
                    reject(error)
                });
            });
        }
    },
    getters: { 
        registrationRole: state => state.role,
        tempRoute: state => state.tempRoute,
        isSignedIn: state => state.isSignedIn,
        userData: state => state.user,
        tutorData: state => state.tutor,
        tutors: state => state.tutors,
        token: state => state.token,
        bookingData: state => (state.bookingInfo == '') ?JSON.parse(localStorage.getItem('bookinginfo')) : state.bookingInfo,
        classData: state => state.class,
        communityLanguage: state => state.communityLanguage,
        communityLanguages: state => state.communityLanguages
    }

});