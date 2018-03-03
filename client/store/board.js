import axios from "../plugins/axios";

export const state = () => ({
    boardList: []
});

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
    }
}