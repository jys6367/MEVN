<template>
    <div>
        {{board.title}} <br>
        {{board.content}}
    </div>
</template>

<script>
    import axios from "../../plugins/axios";

    export default {
        name: "boardId",
        async asyncData({params}){
            let {data} =await axios.get(`/api/board/${params.id}`)
            return {board: data};
        }
    }
</script>

<style scoped>

</style>