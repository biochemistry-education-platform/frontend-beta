<template>
    <div class="article-page">
        <div class="columns is-multiline">
            <h1 class="title">{{ article.title }}</h1>
        </div>

        <div class="column is-12">
            <h2 class="subtitle">{{ author }}, {{ date }}</h2>
            <div id="newtags">
                <div v-for="tag in article.tags" class="button is-success tag-div">{{ tag }}</div>
            </div>

            <hr>

            <button v-on:click="getPdf" class="button is-dark">Download PDF</button>
        </div>

        <div class="column is-12" id="articleText" @mouseup="showButton">

        </div>
        <button v-if="isSelected" class="add-selected-text-btn" v-on:click="getSelectedText">
            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M453 776h60V610h167v-60H513V376h-60v174H280v60h173v166Zm27.266 200q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80 658.319 80 575.5q0-82.819 31.5-155.659Q143 347 197.5 293t127.341-85.5Q397.681 176 480.5 176q82.819 0 155.659 31.5Q709 239 763 293t85.5 127Q880 493 880 575.734q0 82.734-31.5 155.5T763 858.316q-54 54.316-127 86Q563 976 480.266 976Zm.234-60Q622 916 721 816.5t99-241Q820 434 721.188 335 622.375 236 480 236q-141 0-240.5 98.812Q140 433.625 140 576q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg>
        </button>

    </div>
</template>

<script>
import axios from 'axios'

const fileDownload = require('js-file-download')



export default {
    name: 'Article',
    data() {
        return {
            isSelected: false,
            article: {},
            date: '',
            author: ''
        }
    },
    async mounted() {
        await this.getArticle()
        await this.getAuthor()
    },
    methods: {
        async getArticle() {
            const articleID = this.$route.params.id
            await axios
                .get(`/api/v1/articles/${articleID}`)
                .then(response => {
                    this.article = response.data
                    this.date = (new Date(Date.parse(this.article.publish_date.slice(0,19)))).toLocaleString('en-GB')
                    let text = JSON.parse(this.article.text)
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
        async getAuthor() {
            await axios
                .get('/api/v1/clients/')
                .then(response => {
                    console.log(this.article)
                    for (let i=0; i< response.data.length; i++) {
                        if (response.data[i].email == this.article.author) {
                            
                            this.author = `${response.data[i].surname} ${response.data[i].name} ${response.data[i].patronymic}`
                        }
                    }
                })
                .catch(error => {
                    console.log(error)
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
        async showButton() {
            let select = window.getSelection()
            if (select != '') {
                await (this.isSelected = true)
                let rect = select.getRangeAt(0).getBoundingClientRect()
                console.log(rect.left)
                console.log(rect.right)
                console.log(rect.top)
                let menu = document.getElementsByClassName('add-selected-text-btn')[0]
                menu.style.cssText += `left:${(rect.left + rect.right) / 2 - 14}px;top:${rect.top - 30}px;`                
            }
        },
        async getSelectedText(event) {
            if (window.getSelection()) {
                let isExist = false
                var select = window.getSelection()
                await axios
                    .get('/api/v1/notes/')
                    .then(response => {
                        for (let i = 0; i < response.data.length; i++) {
                            // TODO !!! check not by title but by id (check if the note based on this article already exists)
                            if (this.article.title === response.data[i].based_on_article) {
                                // add text to the existing note
                                isExist = true
                                let current_text = response.data[i].text
                                current_text = current_text.substring(0, current_text.length-1)
                                let new_text = `${current_text},{"nodeType":1,"tagName":"p","childNodes":[{"nodeType":3,"nodeName":"#text","nodeValue":"${select.toString()}"}]}]`
                                axios
                                    .patch(`/api/v1/notes/${response.data[i].id}/`, {text: new_text})
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
                            }                      
                        }
                        if (isExist == false) {
                            const articleID = this.$route.params.id
                            let title = this.article.title
                            let note = {
                                text: `[{"nodeType":1,"tagName":"p","childNodes":[{"nodeType":3,"nodeName":"#text","nodeValue":"${select.toString()}"}]}]`,
                                based_on_article: articleID
                            }
                            axios
                                .post('/api/v1/notes/', note)
                                .then(response => {
                                    toast({
                                        message: 'The note has been created',
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
                        }
                    })
                this.isSelected = false
                window.getSelection().empty()
            }
        },
        getPdf(event) {
            const articleID = this.$route.params.id
            
            axios
                .get(`/api/v1/articles/${articleID}/generate_pdf/`, {
                    responseType: 'blob',
                })
                .then(response => {
                    fileDownload(response.data, `${this.article.title}.pdf`)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
}
</script>

<style>
h1 {
    font-size: 24px;
    font-weight: bold;
}

#newtags {
    display: flex;
    flex-direction: row;
}

.tag-div {
    margin-right: 14px;
    margin-top: 14px;
}

.add-selected-text-btn {
    display: flex;
    position: absolute;
    background: #66D9D3;
    border-radius: 6px;
    z-index: 10;
    padding: 4px;
    width: 28px;
    justify-content: center;
    align-items: center;
    border: none;
}
.add-selected-text-btn svg {
    fill: white;
}

</style>