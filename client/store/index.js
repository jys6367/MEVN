import axios from "../plugins/axios";
import Vue from 'vue';

export const state = () => ({
    currentUser: {}
});


export const getters = {
    isAuthenticated(state) {
        return !!(state.currentUser && state.currentUser.email);
    },
    isLogin(state, getters) {
        return getters.isAuthenticated;
    }
}

export const mutations = {
    setUser(state, user) {
        state.currentUser = user || {};
    },
}

export const actions = {
    setCurrentUser({commit}) {
        return axios.get("/api/user/currentUser").then(res => {
            commit("setUser", res.data.user);
        })
    },
    login({commit, getters}, user) {
        return axios.post("/api/user/login", user).then(({data}) => {
            commit("setUser", data.user);
            return {
                isSuccess: getters.isLogin,
                message: data
            };
        })
    },
    logout({commit}) {
        commit("setUser", {});
        return axios.post("/api/user/logout");
    }
}