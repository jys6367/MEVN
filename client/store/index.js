import axios from "../plugins/axios";

export const state = () => ({
    currentUser: undefined
});

export const getters = {
    isAuthenticated(state) {
        return !!state.currentUser;
    }
}

export const mutations = {
    setUser(state, user) {
        state.currentUser = user
    },
    delUser(state) {
        state.currentUser = undefined;
    }
}

export const actions = {
    setCurrentUser({commit}) {
        return axios.get("/api/user/currentUser").then(res => {
            commit("setUser", res.data);
        })
    },
    login({commit}, user) {
        return axios.post("/api/user/login", user).then(res => {
            commit("setUser", res.data && res.data.user);
            return res;
        })
    },
    logout({commit}) {
        commit("delUser");
        return axios.post("/api/user/logout");
    }
}