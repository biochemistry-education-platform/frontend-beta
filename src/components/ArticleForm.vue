<template>
    <div class="column is-12">
        <div class="field">
            <label class="is-size-5 mb-4">Title</label>
            <div class="control">
                <input type="text" class="input" v-model="article.title">
            </div>
        </div>
        <label for="tag-choice">Tags</label>
        <div class="oneline">
            <div class="field tag-field" v-for="index in numberOfTags" :key="index">
                <Tags v-bind:initialTags="tags" v-on:addTag="addTag" v-on:deleteTag="deleteTag" />
            </div>
            <div class="add-tag-btn" @click="addNewTag">+</div>
        </div>
        
    </div>
    <div class="column is-12">
        <div class="field">
            <label class="is-size-5 mb-4">Text</label>
            <div id="maineditor"></div>
            <button class="button is-success" @click="createArticle">Save</button>
        </div>
    </div>
</template>

<script>
import { QuillEditor, Quill } from '@vueup/vue-quill'
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
            numberOfTags: 1
        }
    },
    mounted() {
        var toolbarOptions = [            
            [{ 'header': [1, 2, 3,  false] }],            
            
            [{ 'font': [] }],

            ['bold', 'italic', 'underline'],                  
            
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],    
            
            [{ 'align': ''}, { 'align': 'center'}, { 'align': 'right'}, { 'align': 'justify'}],            
            
            ['image', 'link'],          

            [{ 'color': [] }, { 'background': ['#47FDB0', '#40E3CC', '#52E4FA', '#40A2E3', '#4785FD', '#9359FF', '#A637E6', 
                                               '#73F2BC', '#6EE0D0', '#7AE1F0', '#6EB2E0', '#739EF2', '#A87FF3', '#B567E2', 
                                               '#FFF436', '#FFBF2E', '#FA7325', '#E63034', '#FF4F63', '#E62EA2', '#E82DFA',   
                                               '#F3EC67', '#F3C761', '#F0915B', '#E26365', '#F37886', '#E261B2', '#E360F0'] }],          // dropdown with defaults from theme

        ];

        var quill = new Quill('#maineditor', {
            modules: {
                toolbar: toolbarOptions
            },
            theme: 'snow'
        });
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
        },
        addNewTag(event) {
            this.numberOfTags += 1
        },
        deleteTag(tagToDelete) {
            let inputs = document.getElementsByClassName('tag-input')
            for (let input of inputs) {
                if (input.value == tagToDelete) {
                    input.parentElement.parentElement.remove()
                }
            }
        }
    }
}
</script>

<style>
.add-tag-btn {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    border: 1px solid black;
}

.oneline {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.tag-field {
    padding-right: 20px;
    margin-bottom: 0 !important;
}

#maineditor {
    min-height: 200px;
}
</style>