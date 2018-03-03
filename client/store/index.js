import axios from "../plugins/axios";

export const state = () => ({
    currentUser: undefined
});

export const mutations = {
    login(state, user){
        console.log("login", user);
        state.currentUser = user;
    },
    logout(state){
        state.currentUser = undefined;
    }
}

export const actions = {
    nuxtServerInit ({commit}, {req}){
        console.log(req.session.passport.user);
        if(req.session.passport && req.session.passport.user)
            commit("login", req.session.passport.user)
    }
}