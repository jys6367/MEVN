import axios from "../plugins/axios";

export const state = () => ({
    boardList: []
});

export const getters = {
    count(state){
        return state.boardList.length;
    }
}

export const mutations = {
    setBoardList(state, boardList) {
        state.boardList = boardList;
    }
}

export const actions = {
    getList({commit}) {
        return axios.get('/api/board/getList').then((res) => {
            commit("setBoardList", res.data);
        })
    },
    save({}, board){
        return axios.post('/api/board/insert', board).then(res=>{
            if(res.staus) return this.$router.push("insert");
        })
    },
    get({}, id){
        return axios.get(`/api/board/${id}`).then(res=>{
            if(res.staus) return this.$router.push("insert");
        })
    }
}