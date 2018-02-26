<template>
    <div>
        제목 <input type="text" v-model="board.title">
        내용 <input type="text" v-model="board.content">
        <button @click="save">완료</button>
    </div>
</template>

<script>
    import axios from "../../plugins/axios";

    export default {
        name: "insert",
        data() {
            return {
                board: {},
                test: {}
            }
        },
        methods: {
            save() {
                let board = {
                    title: this.board.title,
                    content: this.board.content
                };
                axios.post("/api/board/insert", board).then(res => {
                    this.$router.push({name: "board"})
                });
            }
        }
    }
</script>

<style scoped>

</style>