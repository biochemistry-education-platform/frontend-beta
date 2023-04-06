<template>
    <div class="article-page">
        <div class="columns is-multiline">
            <h1 class="title">{{ article.article_title }}</h1>
        </div>

        <div class="column is-12">
            <h2 class="subtitle">{{ article.author }}, {{ date }}</h2>
            <!-- <h2 class="subtitle">{{ (new Date(Date.parse(article.publish_date.slice(0,19)))).toLocaleString('en-GB') }}</h2> -->
            <p id="newtags"></p>
        </div>

        <div class="column is-12" id="articleText">

        </div>
        <button class="button is-success" v-on:click="getSelectedText"><strong>Get selected text</strong></button>

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