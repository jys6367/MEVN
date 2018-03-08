<template>
    <v-layout justify-center>
        <v-flex xs12 sm10 md8 lg6>
            <v-card ref="form">
                <v-card-text>
                    <v-form method='post' enctype="multipart/form-data">
                        <v-text-field
                                label="E-mail"
                                v-model="user.email"
                                :rules="emailRules"
                                required
                        ></v-text-field>
                        <v-text-field
                                label="Password"
                                v-model="user.pwd"
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

                        <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                            <img :src="imageUrl" height="150" v-if="imageUrl"/>
                            <v-text-field label="Select Image" @click='pickFile' v-model='imageName'
                                          prepend-icon='attach_file'></v-text-field>
                            <input
                                    type="file"
                                    style="display: none"
                                    ref="image"
                                    accept="image/*"
                                    @change="onFilePicked"
                            >
                        </v-flex>
                    </v-form>
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
    import upload from '../../plugins/upload';
    import _ from 'lodash';

    export default {
        name: "join",
        data: () => ({
            imageName: '',
            imageUrl: '',
            imageFile: '',
            dialog: false,
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
                name: '',
                birthDay: '',
            }
        }),
        computed: {
            checkPasswordRules() {
                return [
                    v => (v && v === this.user.pwd) || '비밀번호가 서로 다릅니다.'
                ]
            }
        },
        methods: {
            pickFile() {
                this.$refs.image.click()
            },
            onFilePicked(e) {
                const files = e.target.files
                if (files[0] !== undefined) {
                    this.imageName = files[0].name
                    if (this.imageName.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader()
                    fr.readAsDataURL(files[0])
                    fr.addEventListener('load', () => {
                        this.imageUrl = fr.result
                        this.imageFile = files[0] // this is an image file that can be sent to server...
                    })
                } else {
                    this.imageName = ''
                    this.imageFile = ''
                    this.imageUrl = ''
                }
            },
            submit() {

                let param = {
                    file: {
                        photo: this.$refs.image.files[0]
                    },
                    body: _.pick(this.user, ['name', 'pwd', 'email', 'birthDay'])
                }

                upload("/api/user/join", param).then(({data}) => {
                    console.log(data)
                })
            },
        }
    }
</script>