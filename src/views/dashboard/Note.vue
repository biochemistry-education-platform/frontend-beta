<template>
    <div class="note-page">
        <div class="columns is-multiline">
            <h1 class="title">{{ note.based_on_article }}</h1>
        </div>

        <div class="column is-12">
            <h2 class="subtitle">{{ note.created_by }}</h2>
            <p id="newtags"></p>
        </div>

        <hr>

        <div v-if="!isEditMode" class="column is-12" id="noteText">
        </div>
        <button v-if="!isEditMode" class="button is-success" v-on:click="editNote"><strong>Edit</strong></button>
        <div class="column is-12" v-if="isEditMode">
            <div class="field">
                <label class="is-size-5 mb-4">Text</label>
                <QuillEditor theme="snow"/>
                <button class="button is-success" @click="saveNote">Save</button>
            </div>
        </div>
        <button class="button is-danger" v-on:click="deleteNote"><strong>Delete</strong></button>

    </div>
</template>

<script>
import axios from 'axios'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default {
    name: 'Note',
    components: {
        QuillEditor
    },
    data() {
        return {
            note: {},
            date: '',
            isEditMode: false
        }
    },
    async mounted() {
        await this.getNote()
    },
    methods: {
        getNote() {
            const noteID = this.$route.params.id
            axios
                .get(`/api/v1/notes/${noteID}`)
                .then(response => {
                    this.note = response.data
                    let text = JSON.parse(this.note.note_text)
                    Object.entries(text).forEach(entry => {
                        const [key, value] = entry
                        let place = document.getElementById('noteText')
                        let node = this.toDOM(JSON.stringify(value))
                        place.appendChild(node)
                    })
                })
                .catch(error => {
                    console.log(JSON.stringify(error))
                })
        },
        toDOM(input) {
            let obj = typeof input === 'string' ? JSON.parse(input) : input
            let propFix = { for: 'htmlFor', class: 'className' }
            let node
            let nodeType = obj.nodeType
            switch (nodeType) {
                // ELEMENT_NODE
                case 1: {
                    node = document.createElement(obj.tagName)
                    if (obj.attributes) {
                        for (let [attrName, value] of obj.attributes) {
                            let propName = propFix[attrName] || attrName
                            // Note: this will throw if setting the value of an input[type=file]
                            node[propName] = value
                        }
                    }
                    break
                }
                // TEXT_NODE
                case 3: {
                    return document.createTextNode(obj.nodeValue)
                }
                // COMMENT_NODE
                case 8: {
                    return document.createComment(obj.nodeValue)
                }
                // DOCUMENT_FRAGMENT_NODE
                case 11: {
                    node = document.createDocumentFragment()
                    break
                }
                default: {
                    // Default to an empty fragment node.
                    return document.createDocumentFragment()
                }
            }
            if (obj.childNodes && obj.childNodes.length) {
                for (let childNode of obj.childNodes) {
                    node.appendChild(this.toDOM(childNode))
                }
            }
            return node
        },
        deleteNote(event) {
            const noteID = this.$route.params.id
            axios.delete(`/api/v1/notes/${noteID}`)
        },
        async editNote(event) {
            await (this.isEditMode = true)
            let text = JSON.parse(this.note.note_text)
            let place = document.getElementsByClassName('ql-editor')[0]   
            place.removeChild(place.firstChild)            
            console.log(place.children)
            Object.entries(text).forEach(entry => {
                const [key, value] = entry
                let node = this.toDOM(JSON.stringify(value))
                place.appendChild(node)
            })

        },
        async saveNote(event) {
            const noteID = this.$route.params.id
            const textarea = document.getElementsByClassName('ql-editor')[0]
            const children = textarea.children;

            let arr = []
            Array.from(children).forEach(element => {
                arr.push(this.toJSON(element))
            })
            let jsonresult = JSON.stringify(arr)
            this.note.note_text = jsonresult
            
            axios
            .patch(`/api/v1/notes/${noteID}/`, {note_text: this.note.note_text})
                .then(response => {
                    toast({
                        message: 'The note has been updated',
                        type: 'is-success',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'top-right',
                    })
                })
                .catch(error => {
                    console.log(JSON.stringify(error))
                })
            await (this.isEditMode = false)

            let text = JSON.parse(this.note.note_text)
            Object.entries(text).forEach(entry => {
                const [key, value] = entry
                let place = document.getElementById('noteText')
                let node = this.toDOM(JSON.stringify(value))
                place.appendChild(node)
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
        }
    }
}
</script>

<style>
h1 {
    font-size: 24px;
    font-weight: bold;
}
.subtitle {
    margin: 0 !important;
}
</style>