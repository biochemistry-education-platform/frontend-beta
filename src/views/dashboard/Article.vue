<template>
    <div class="article-page">
        <div class="columns is-multiline">
            <h1 class="title">{{ article.article_title }}</h1>
        </div>

        <div class="column is-12">
            <h2 class="subtitle">{{ article.author }}, {{ date }}</h2>
            <p id="newtags"></p>
        </div>

        <div class="column is-12" id="articleText">

        </div>
        <button class="button is-success" v-on:click="getSelectedText"><strong>Add selected text to the note</strong></button>

    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Article',
    data() {
        return {
            article: {},
            date: ''
        }
    },
    async mounted() {
        await this.getArticle()
    },
    methods: {
        getArticle() {
            const articleID = this.$route.params.id
            axios
                .get(`/api/v1/articles/${articleID}`)
                .then(response => {
                    this.article = response.data
                    this.date = (new Date(Date.parse(this.article.publish_date.slice(0,19)))).toLocaleString('en-GB')
                    let text = JSON.parse(this.article.article_text)
                    Object.entries(text).forEach(entry => {
                        const [key, value] = entry
                        let place = document.getElementById('articleText')
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
        getSelectedText(event) {
            if (window.getSelection()) {
                var select = window.getSelection()
                console.log(select.toString())
                axios
                    .get('/api/v1/notes/')
                    .then(response => {
                        for (let i = 0; i < response.data.length; i++) {
                            // TODO !!! check not by title but by id
                            if (this.article.article_title === response.data[i].based_on_article) {
                                // add text to the existing note
                                let current_text = response.data[i].note_text
                                current_text = current_text.substring(0, current_text.length-1)
                                let new_text = `${current_text},{"nodeType":1,"tagName":"p","childNodes":[{"nodeType":3,"nodeName":"#text","nodeValue":"${select.toString()}"}]}]`
                                console.log(response.data[i].id)
                                axios
                                    .patch(`/api/v1/notes/${response.data[i].id}/`, {note_text: new_text})
                                    .then(response => {
                                        toast({
                                            message: 'The article has been updated',
                                            type: 'is-success',
                                            dismissible: true,
                                            pauseOnHover: true,
                                            duration: 2000,
                                            position: 'top-right',
                                        })

                                        this.$router.push('/dashboard/notes')
                                    })
                                    .catch(error => {
                                        console.log(JSON.stringify(error))
                                    })
                            } else {
                                // create a new note and add text there
                            }                         
                        }
                    })



                    .then(response => {
                        if (response.data) {
                            // add text to the end of the note
                        }
                        else {
                            // create new note and add text there
                        }
                    })
            }
        }
    }
}
</script>

<style>
h1 {
    font-size: 24px;
    font-weight: bold;
}
</style>