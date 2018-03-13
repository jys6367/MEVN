module.exports = {
    srcDir: "client/",
    /*
    ** Headers of the page
    */
    head: {
        title: 'Raccoon',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'Nuxt.js project'}
        ],
        script: [
            {src: '//cdn.ckeditor.com/4.6.2/full/ckeditor.js'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'}
        ]
    },
    router: {
        middleware: "checkAuth"
    },
    plugins: [
        '~/plugins/vuetify.js',
    ],
    css: ['~/assets/style/app.styl'],
    loading: {color: '#060580'},
    build: {
        vendor: [
            'axios',
            '~/plugins/vuetify.js',
            'vue2-medium-editor'
        ],
        extractCSS: true,
    }
}
