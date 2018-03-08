<template>
    <div>
        <v-content>
            <v-container>
                <v-layout xs2>
                    <ckeditor
                            v-model="content"
                    >
                    </ckeditor>
                    <!--<button @click="test">ccc</button>-->
                </v-layout>
            </v-container>
        </v-content>
    </div>
</template>

<script>
    import ckeditor from '../../components/common/editor/ckeditor'
    import {mapState} from 'vuex'

    export default {
        components: {ckeditor},
        // data: function(){
        //     content: 'aaaaaaaaaaa'
        // },
        asyncData({store}) {
            return {
                content: "sssssssssssssssssss"
            }
        },
        methods: {
            test() {
                console.log(this.content);
            }
        }
    }
</script>