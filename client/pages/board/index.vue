<template>

    <div>
        <v-dialog v-model="dialog" max-width="500px">
            <v-btn color="primary" dark slot="activator" class="mb-2">New Item</v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">update Form</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Dessert name" v-model="editedItem.title"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Calories" v-model="editedItem.content"></v-text-field>
                            </v-flex>

                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <v-data-table
                :headers="headers"
                :items="boardList"
                hide-actions
                class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.id }}</td>
                <td class="text-xs-left">{{ props.item.title }}</td>
                <td class="text-xs-left">{{ props.item.content }}</td>
                <td class="text-xs-left">{{ props.item.date }}</td>
                <td class="text-xs-left layout px-0">
                    <v-btn icon class="mx-0" @click="editItem(props.item)">
                        <v-icon color="teal">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="del(props.item.id)">
                        <v-icon color="pink">delete</v-icon>
                    </v-btn>
                </td>
            </template>
            <!--            <template slot="no-data">
                            <v-btn color="primary" @click="initialize">Reset</v-btn>
                        </template>-->
        </v-data-table>
    </div>
</template>


<script>

    import axios from '../../plugins/axios';
    import {mapState} from 'vuex';

    export default {
        data: () => ({
            editedItem: {},
            dialog: false,
            headers: [
                {text: 'id', value: 'id'},
                {text: 'title', value: 'title'},
                {text: 'content', value: 'content'},
                {text: 'date', value: 'date'},
                {text: 'Actions', value: 'name', sortable: false}

            ]
        }),
        computed: mapState([
            "boardList"
        ]),
        fetch(context) {
            return context.store.dispatch('getList');
        },
        methods: {
            del(id) {
                if (confirm('삭제하시겠습니까?')) {
                    axios.delete(`/api/board/${id}`).then((res) => {
                        this.$store.dispatch('getList');
                    })
                }

            },
            editItem(item) {
                this.editedItem = Object.assign({}, item)
                this.dialog = true;
            },
            save() {
                if (!this.editedItem.id) {
                    axios.post('/api/board/insert', this.editedItem).then(res => {
                        this.$store.dispatch('getList');
                    })
                } else {
                    axios.put(`/api/board/${this.editedItem.id}`, this.editedItem).then(res => {
                        this.$store.dispatch('getList');
                    });

                }
                this.close();

            },
            close() {
                this.editedItem = {};
                this.dialog = false;
            }
        }
    }
</script>