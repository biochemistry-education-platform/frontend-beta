<template>
    <div class="article-page">
        <div class="article-tags">
            <div v-for="tag in article.tags" class="article-tag">#{{ tag }}</div>
        </div>
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-info">
            <div class="article-author">
                <div><img class="article-author-img" src="@/assets/icons/profile_img.png"></div>
                <div class="article-author-info">
                    <p class="article-author-name">{{ article.author }}</p>
                    <p class="article-author-extra">{{ role }}</p>
                    <p class="article-author-extra">{{ date }}</p>
                </div>
            </div>

            <div class="article-actions">
                <div class="article-action"><p>В избранное</p><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="m323 851 157-94 157 95-42-178 138-120-182-16-71-168-71 167-182 16 138 120-42 178Zm-90 125 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z"/></svg></div>
                <div class="article-action" v-on:click="getPdf"><p>Скачать</p><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M220 896q-24 0-42-18t-18-42V693h60v143h520V693h60v143q0 24-18 42t-42 18H220Zm260-153L287 550l43-43 120 120V256h60v371l120-120 43 43-193 193Z"/></svg></div>
            </div>
        </div>
        
        <hr>
        <div class="article-text" id="articleText"></div>

    </div>
</template>

<script>
export default {
    name: 'ArticleTeacherPage',
}
</script>

<script setup>
import axios from 'axios'
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const fileDownload = require('js-file-download')
let article = reactive({
    author: '',
    tags: [],
    text: '',
    title: ''
})
let date = ref('')
let role = ref('')
const route = useRoute()

async function getArticle() {
    const articleID = route.params.id
    await axios
        .get(`/api/v1/articles/${articleID}`)
        .then(response => {
            article.title = response.data.title            
            article.text = response.data.text
            article.author = response.data.author
            article.tags = response.data.tags
            article.publish_date = response.data.publish_date
            date = (new Date(Date.parse(article.publish_date.slice(0,19)))).toLocaleString('en-GB')
            let text = JSON.parse(article.text)
            console.log(text)
            Object.entries(text).forEach(entry => {
                const [key, value] = entry
                let place = document.getElementById('articleText')
                let node = toDOM(JSON.stringify(value))
                place.appendChild(node)
            })
        })
        .catch(error => {
            console.log(JSON.stringify(error))
        })
}

async function getAuthor() {
    await axios
        .get('/api/v1/clients/')
        .then(response => {
            for (let i=0; i< response.data.length; i++) {
                if (response.data[i].email == article.author) {    
                    article.author = `${response.data[i].surname} ${response.data[i].name}`
                    role = response.data[i].role
                }
            }
            console.log(author)
        })
        .catch(error => {
            console.log(error)
        })
}

function toDOM(input) {
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
            node.appendChild(toDOM(childNode))
        }
    }
    return node
}

function getPdf(event) {
    const articleID = route.params.id
    
    axios
        .get(`/api/v1/articles/${articleID}/generate_pdf/`, {
            responseType: 'blob',
        })
        .then(response => {
            fileDownload(response.data, `${article.title}.pdf`)
        })
        .catch(error => {
            console.log(error)
        })
}

onMounted(async () => {
    await getArticle()
    await getAuthor()
})
</script>

<style>
.article-page {
    padding: 50px 10% 0 10%;
    background: var(--card-color);
    height: 100vh;
}

.article-tags {
    background: var(--tags-color);
    width: fit-content;
    border-radius: 16px;
    padding: 4px 0 4px 12px;
}

.article-tag {
    color: var(--tags-text);
    font-size: 18px;
    display: inline-block;
    padding-right: 12px;
    font-weight: 500;
}

.article-title {
    font-size: 32px;
    color: var(--text-color);
    font-weight: 500;
    padding: 20px 0;
}

.article-info {
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: space-between;
}

.article-author {
    display: flex;
}

.article-author-img{
    width: 120px;
    height: 120px;
}

.article-author-info {
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 26px;
}

.article-author-name {
    font-size: 24px;
    color: var(--text-color);
}

.article-author-extra {
    font-size: 16px;
    color: var(--text-extra);
}

.article-actions {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
}

.article-action {
    color: var(--text-extra);
    font-size: 16px;
    display: flex;
    margin-top: 20px;
}

.article-action:hover {
    cursor: pointer;
}

.article-action svg {
    fill: var(--text-extra);
    margin-left: 10px;
}

hr {
    background: var(--lines-color);
}

.article-text {
    width: 100%;
    color: var(--text-color);
}

*::selection {
    background: var(--tags-color);
}
</style>