<template>
    <div>
        제목 <input type="text" v-model="board.title">
        내용 <input type="text" v-model="board.content">
        <button @click="update">완료</button>
    </div>
</template>

<script>
    import axios from "../../plugins/axios";

    export default {
        name: "update",
        async asyncData({query}) {
            let {data} = await axios.get(`/api/board/${query.id}`)
            return {board: data};
        },
        methods:{
            update(){
                let board = {
                    title : this.board.title,
                    content: this.board.content
                }
                axios.put(`/api/board/${this.board.id}`, board).then(res=>{
                    this.$router.push({name:"board"})
                })
            }
        }
    }
</script>

<style scoped>

</style>