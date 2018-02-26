<template>
    <div>
        <table>
            <thead>
                <tr>
                    <td>제목</td>
                    <td>날짜</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="board in boardList" :key="board.id">
                    <th>
                        <v-list-tile
                                :to="{ name: 'board-id', params: { id: board.id }}"
                        >
                            {{board.title}}
                        </v-list-tile>
                    </th>
                    <th>{{board.date}}</th>
                    <td>
                        <v-btn
                                color="error"
                                @click="del(board.id)"
                        >
                            삭제
                        </v-btn>
                        <!--<button @click="del(board.id)">삭제</button>-->
                    </td>
                    <td>
                        <v-list-tile
                                :to="{name: 'board-update', query: {id:board.id}}">
                            <v-btn color="info">수정</v-btn>
                        </v-list-tile>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td>
                        <nuxt-link :to="{ name: 'board-insert'}">
                            test
                        </nuxt-link>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    import axios from "../../plugins/axios";

    export default {
        name: "board",
        // computed: mapState([
        //     'boardList'
        // ]),
        computed: {
            boardList() {
                return this.$store.state.boardList;
            }
        },
        fetch({store}) {
            return store.dispatch("getList")
        },
        methods: {
            del(id) {
                console.log(this);
                axios.delete(`/api/board/${id}`).then(res => {
                    this.$store.dispatch("getList");
                })
            }
        }
    }
</script>

<style scoped>

</style>