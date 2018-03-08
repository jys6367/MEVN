<template>
    <div>
        <ckeditor :isEdit="isEdit"
                   v-model="content"
        >
        </ckeditor>
        <button @click="test">test</button>
    </div>
</template>

<script>
    import ckeditor from '~/components/common/editor/inlineEditor'
    import {mapState} from 'vuex'

    export default {
        components: {ckeditor},
        data: ()=> ({
            isEdit: true
        }),
        asyncData({store}) {
            return {
                content: "sssssssssssssssssss"
            }
        },
        methods: {
            test() {
                this.isEdit = !this.isEdit;
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
