import {Store} from 'vuex';

import axios from "../plugins/axios";

const store = () => new Store({
    state: {
        boardList: []
    },
    mutations: {
        setBoardList(state, boardList) {
            state.boardList = boardList;
        }
    },
    actions: {
        getList({commit}) {
            return axios.get('/api/board/getList').then((res) => {
                commit("setBoardList", res.data);
            })
        }
    }
});

export default store;
