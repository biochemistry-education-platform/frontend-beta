<template>
    <div class="column is-12">
        <div class="field">
            <label class="is-size-5 mb-4">Title</label>
            <div class="control">
                <input type="text" class="input" v-model="article.title">
            </div>
        </div>
        <div class="field">
            <Tags v-bind:initialTags="tags" v-on:addTag="addTag" />
        </div>
    </div>
    <div class="column is-12">
        <div class="field">
            <label class="is-size-5 mb-4">Text</label>
            <QuillEditor theme="snow"/>
            <button class="button is-success" @click="createArticle">Save</button>
        </div>
    </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import axios from 'axios'
import { toast } from 'bulma-toast'
import Tags from './Tags.vue'

export default {
    name: 'ArticleForm',
    props: {
        initialArticle: Object,
        initialTags: Object
    },
    components: {
        QuillEditor,
        Tags
    },
    data() {
        return {
            article: this.initialArticle,
            tags: this.initialTags,
            chosenTags: [],
            textarea: '',
        }
    },
    methods: {
        createArticle() {
            const textarea = document.getElementsByClassName('ql-editor')[0]
            const children = textarea.children;

            let arr = []
            Array.from(children).forEach(element => {
                arr.push(this.toJSON(element))
            })
            let jsonresult = JSON.stringify(arr)
            this.article.title = this.article.title
            this.article.text = jsonresult
            this.article.tags = this.chosenTags
            
            this.chosenTags.forEach(tag => {
                if (!this.tags.includes(tag)) {
                    let newTag = {
                        name: tag
                    }
                    axios
                        .post('/api/v1/tags/', newTag)
                }
            })
           
            
            axios
                .post('/api/v1/articles/', this.article)
                .then(response => {
                    toast({
                        message: 'The article has been created',
                        type: 'is-success',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'top-right',
                    })

                    this.$router.push('/dashboard/articles')
                })
                .catch(error => {
                    console.log(JSON.stringify(error))
                })
        },
        toJSON(element) {
            let propFix = { for: 'htmlFor', class: 'className' };
            let specialGetters = {
                style: (node) => node.style.cssText,
            }
            let attrDefaultValues = { style: '' }
            let obj = {
                nodeType: element.nodeType
            }
            if (element.tagName) {
                obj.tagName = element.tagName.toLowerCase();
            } else if (element.nodeName) {
                obj.nodeName = element.nodeName;
            }
            if (element.nodeValue) {
                obj.nodeValue = element.nodeValue;
            }
            let attrs = element.attributes;
            if (attrs) {
                let defaultValues = new Map()
                for (let i = 0; i < attrs.length; i++) {
                    let name = attrs[i].nodeName
                    defaultValues.set(name, attrDefaultValues[name])
                }
                let arr = []
                for (let [name, defaultValue] of defaultValues) {
                    let propName = propFix[name] || name
                    let specialGetter = specialGetters[propName]
                    let value = specialGetter ? specialGetter(element) : element[propName]
                    if (value !== defaultValue) {
                        arr.push([name, value])
                    }
                }
                if (arr.length) {
                    obj.attributes = arr
                }
            }
            let childNodes = element.childNodes
            if (obj.tagName !== 'textarea' && childNodes && childNodes.length) {
                let arr = (obj.childNodes = []);
                for (let i = 0; i < childNodes.length; i++) {
                    arr[i] = this.toJSON(childNodes[i])
                }
            }
            return obj
        },
        addTag(chosenTags) {
            this.chosenTags = chosenTags
        }
    }
}
</script>