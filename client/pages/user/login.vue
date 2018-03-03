<template>
    <v-layout justify-center>
        <v-flex xs12 sm10 md8 lg6>
            <v-card ref="form">
                <v-card-text>
                    <v-text-field
                            label="E-mail"
                            v-model="email"
                            required
                    ></v-text-field>
                    <v-text-field
                            label="Password"
                            v-model="password"
                            :type="'password'"
                            @keyup.enter="submit"
                            required
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click="submit">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import axios from '../../plugins/axios';

    export default {
        name: "login",
        data: () => ({
            valid: false,
            email: '',
            emailRules: [
                v => !!v || '이메일은 필수 입니다.',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || '이메일은 형식이 올바르지 않습니다.'
            ],
            password: '',
            passwordRules: [
                v => (v && v.length >= 6 && v.length <= 15) || '비밀번호는 6자 이상 15자 이하 입니다.',
                v => /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,15}$/.test(v) || '비밀번호는 최소 1개의 숫자 혹은 특수 문자를 포함해야 합니다.'
            ]
        }),
        methods: {
            submit() {
                let param = {
                    username : this.email,
                    password : this.password
                }

                axios.post("/api/user/login", param).then(({data})=>{
                    console.log(data)
                })
            }
        }
    }
</script>