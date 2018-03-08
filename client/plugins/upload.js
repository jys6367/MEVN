import axios from "./axios";

/*
let param = {
    file: {
        photo: this.$refs.image.files[0]
    },
    body: _.pick(this.user, ['name', 'pwd', 'email'])
}
*/
export default function (url, param) {
    var formData = new FormData();

    for (let k in param.file)
        formData.append(k, param.file[k]);

    for (let k in param.body)
        formData.append(k, param.body[k]);

    return axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

