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
                    <v-btn @click="preView">
                        미리보기 {{isPreView ? "닫기" : ""}}
                    </v-btn>
                    <v-btn @click="save(board)">
                        등록
                    </v-btn>
                    <v-btn :to="{}">
                        등록
                    </v-btn>
                </v-layout>
                <v-layout v-html="board.content" v-if="isPreView">
                </v-layout>
            </v-container>
        </v-content>
    </div>
</template>

<script>
    import ckeditor from '../../components/common/editor/ckeditor'
    import {mapState, mapActions} from 'vuex'

    export default {
        components: {
            ckeditor,
        },
        data: () => ({
            isPreView: false
        }),
        asyncData({store}) {
            return {
                board: {
                    title: 'myTitle',
                    content: ""
                }
            }
        },
        methods: {
            preView() {
                this.isPreView = !this.isPreView
            },
            ...mapActions('board', [
                "save"
            ])
        }
    }
</script>