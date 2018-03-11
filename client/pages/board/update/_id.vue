<template>
    <div>
        <v-content>
            <v-container>
                <v-layout>
                    <input type="text" :value="board.title">
                </v-layout>
                <v-layout>
                    <ckeditor
                            v-model="board.content"
                    >
                    </ckeditor>
                    <!--<button @click="test">ccc</button>-->
                </v-layout>
                <v-layout>
                    <v-btn @click="save">
                        수정
                    </v-btn>
                </v-layout>
            </v-container>
        </v-content>
    </div>
</template>
<script>
    import ckeditor from '~/components/common/editor/inlineEditor'
    import {mapState} from 'vuex'

    export default {
        components: {ckeditor},
        data: () => ({
            isEdit: true
        }),
        asyncData: ({store}) => ({
            board: {
                title: "",
                content: "sssssssssssssssssss"
            }
        }),
        methods: {
            save(){

            }
        }
    }
</script>

<!--<template>-->
<!--<div>-->
<!--<inline-editor :editable="edit" v-model="content"></inline-editor>-->

<!--<button @click="start">start</button>-->
<!--<br>-->
<!--<button @click="end">end</button>-->
<!--<br/>-->
<!--<button @click="test">test</button>-->
<!--</div>-->

<!--</template>-->

<!--<script>-->

<!--import editor from "../../components/common/editor/inlineEditor"-->

<!--export default {-->
<!--data: () => ({-->
<!--content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',-->
<!--edit: true-->
<!--}),-->
<!--components: {-->
<!--"inlineEditor": editor-->
<!--},-->
<!--methods:{-->
<!--start(){-->
<!--this.edit = true;-->
<!--},-->
<!--end(){-->
<!--this.edit = false;-->
<!--},-->
<!--test(){-->
<!--console.log(this.content);-->
<!--}-->
<!--}-->
<!--}-->

<!--</script>-->
