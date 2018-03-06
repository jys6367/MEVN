<template>
    <div>
        <div :id="id"
             :contenteditable="contenteditable"
             v-html="content">
        </div>
        <button @click="startEdit">go</button>
        <br/>
        <button @click="endEdit">exit</button>
        <br/>
        <button @click="reset">reset</button>
    </div>
</template>

<script>

    // CKEDITOR.disabledAutoInline = true;

    export default {
        data: () => ({
            id:"introduction",
            contenteditable: false,
            oriContent: '',
            $editor: {},
        }),
        mounted() {
            this.$editor = document.getElementById(this.id);
            this.oriContent = this.content;
        },
        asyncData({store}) {
            return {
                content: "<h1>sssssssssssssssssss</h1>",
            }
        },
        methods: {
            startEdit() {
                this.contenteditable = true;
                this.enableEditing();
            },
            enableEditing() {
                if (!CKEDITOR.instances.introduction) {
                    CKEDITOR.inline('introduction', {
                        extraAllowedContent: 'a(documentation);abbr[title];code',
                        startupFocus: true
                    });
                }
            },
            endEdit() {
                CKEDITOR.instances.introduction.focusManager.blur(true);
                this.contenteditable = false;
                this.disableEditing();
            },
            disableEditing() {
                if (CKEDITOR.instances.introduction)
                    CKEDITOR.instances.introduction.destroy();
            },
            reset() {
                this.$editor.innerHTML = this.oriContent;
            }
        },
    }
</script>


<!--<template>-->
    <!--<div>-->
        <!--<div id="introduction" v-html="content">-->
        <!--</div>-->
        <!--<button @click="startEdit">go</button>-->
        <!--<br/>-->
        <!--<button @click="endEdit">exit</button>-->
        <!--<br/>-->
        <!--<button @click="reset">reset</button>-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->

    <!--// CKEDITOR.disabledAutoInline = true;-->

    <!--export default {-->
        <!--data: () => ({-->
            <!--oriContent: '',-->
            <!--introduction: {},-->
            <!--isEditingEnabled: false-->
        <!--}),-->
        <!--mounted() {-->
            <!--this.introduction = document.getElementById('introduction');-->
            <!--this.oriContent = this.content;-->
        <!--},-->
        <!--asyncData({store}) {-->
            <!--return {-->
                <!--content: "<h1>sssssssssssssssssss</h1>",-->
            <!--}-->
        <!--},-->
        <!--methods: {-->
            <!--startEdit() {-->
                <!--this.introduction.setAttribute('contenteditable', true);-->
                <!--this.enableEditing();-->
                <!--this.isEditingEnabled = true;-->
            <!--},-->
            <!--enableEditing() {-->
                <!--if (!CKEDITOR.instances.introduction) {-->
                    <!--CKEDITOR.inline('introduction', {-->
                        <!--extraAllowedContent: 'a(documentation);abbr[title];code',-->
                        <!--startupFocus: true-->
                    <!--});-->
                <!--}-->
            <!--},-->
            <!--endEdit() {-->
                <!--console.log(CKEDITOR.instances.introduction)-->
                <!--console.log(this.introduction)-->
                <!--CKEDITOR.instances.introduction.focusManager.blur(true);-->
                <!--this.introduction.setAttribute('contenteditable', false);-->
                <!--this.disableEditing();-->
                <!--this.isEditingEnabled = false;-->
            <!--},-->
            <!--disableEditing() {-->
                <!--if (CKEDITOR.instances.introduction)-->
                    <!--CKEDITOR.instances.introduction.destroy();-->
            <!--},-->
            <!--reset() {-->
                <!--this.introduction.innerHTML = this.oriContent;-->
            <!--}-->
        <!--},-->
    <!--}-->
<!--</script>-->