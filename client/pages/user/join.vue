<template>
    <v-layout justify-center>
        <v-flex xs12 sm10 md8 lg6>
            <v-card ref="form">
                <v-card-text>
                    <v-text-field
                            label="E-mail"
                            v-model="user.email"
                            :rules="emailRules"
                            required
                    ></v-text-field>
                    <v-text-field
                            label="Password"
                            v-model="user.password"
                            :rules="passwordRules"
                            :type="'password'"
                            required
                    ></v-text-field>
                    <v-text-field
                            label="Password Check"
                            v-model="checkPassword"
                            :rules="checkPasswordRules"
                            :type="'password'"
                            required
                    ></v-text-field>
                    <v-text-field
                            label="Name"
                            v-model="user.name"
                            :rules="nameRules"
                            :counter="10"
                            required
                    ></v-text-field>
                    <v-dialog
                            ref="dialog"
                            persistent
                            v-model="modal"
                            lazy
                            full-width
                            width="290px"
                            :return-value.sync="user.birthDay"
                    >
                        <v-text-field
                                slot="activator"
                                label="Picker in dialog"
                                v-model="user.birthDay"
                                prepend-icon="event"
                                readonly
                        ></v-text-field>
                        <v-date-picker v-model="user.birthDay" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="$refs.dialog.save(user.birthDay)">OK</v-btn>
                        </v-date-picker>
                    </v-dialog>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click="submit">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
        <nuxt-link :to="{path: 'login'}">로그인</nuxt-link>
    </v-layout>
</template>

<script>
    import axios from '../../plugins/axios';

    export default {
        name: "join",
        data: () => ({
            valid: false,
            modal: false,
            checkPassword: '',
            nameRules: [
                v => !!v || '이름은 필수 입니다.',
                v => v.length < 10 || '이름은 10자 이하 입니다.'
            ],
            emailRules: [
                v => !!v || '이메일은 필수 입니다.',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || '이메일은 형식이 올바르지 않습니다.'
            ],
            passwordRules: [
                v => (v && v.length >= 6 && v.length <= 15) || '비밀번호는 6자 이상 15자 이하 입니다.',
                v => /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,15}$/.test(v) || '비밀번호는 최소 1개의 숫자 혹은 특수 문자를 포함해야 합니다.'
            ],
            user: {
                pwd: '',
                email: '',
                password: '',
                name: '',
                birthDay: ''
            }
        }),
        computed: {
            checkPasswordRules() {
                return [
                    v => (v && v === this.user.password) || '비밀번호가 서로 다릅니다.'
                ]
            }
        },
        methods: {
            submit() {
                axios.post("/api/user/join", this.user).then(({data}) => {
                    if(!data.status) return alert(data.message);
                    this.$route.push({name:'board'});
                })
            }
        }
    }
</script>