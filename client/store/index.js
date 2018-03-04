import axios from "../plugins/axios";
import Vue from 'vue';

export const state = () => ({
    currentUser: {}
});


export const getters = {
    isAuthenticated(state) {
        return !!(state.currentUser && state.currentUser.email);
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
    login({commit}, user) {
        return axios.post("/api/user/login", user).then(res => {
            commit("setUser", res.data.user);
            return res;
        })
    },
    logout({commit}) {
        commit("delUser");
        return axios.post("/api/user/logout");
    }
}