<template>
    <div class="biochemistry-page page-flex">
        <input type="text" class="add-article-title" :placeholder="$t('articleTitle')">
        <div class="tagline">        
            <p>{{ $t('tags') }}</p>
            <div class="tag-field" v-for="index in numberOfTags" :key="index">
                <Tags :initialTags="tags" @addTag="addTag" @deleteTag="deleteTag" />
            </div>
            <div class="add-tag-btn" @click="addNewTag">
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M453 776h60V610h167v-60H513V376h-60v174H280v60h173v166Zm27.266 200q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80 658.319 80 575.5q0-82.819 31.5-155.659Q143 347 197.5 293t127.341-85.5Q397.681 176 480.5 176q82.819 0 155.659 31.5Q709 239 763 293t85.5 127Q880 493 880 575.734q0 82.734-31.5 155.5T763 858.316q-54 54.316-127 86Q563 976 480.266 976Zm.234-60Q622 916 721 816.5t99-241Q820 434 721.188 335 622.375 236 480 236q-141 0-240.5 98.812Q140 433.625 140 576q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg>
            </div>
        </div>
        <hr class="biochemistry-page-hr aftertags-hr">
        <div class="add-article-text" id="maineditor">
        </div>
        <div class="add-article-footer">        
            <hr class="biochemistry-page-hr">
            <div class="add-article-footer-actions">
                <div class="attach-file"><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M460 976q-91 0-155.5-62.5T240 760V330q0-64 45.5-109T395 176q65 0 110 45t45 110v394q0 38-26 64.5T460 816q-38 0-64-28.5T370 720V328h40v395q0 22 14.5 37.5T460 776q21 0 35.5-15t14.5-36V330q0-48-33.5-81T395 216q-48 0-81.5 33T280 330v432q0 73 53 123.5T460 936q75 0 127.5-51T640 760V328h40v431q0 91-64.5 154T460 976Z"/></svg>{{ $t('attachFile') }}</div>
                <button class="publish-article-btn">{{ $t('publish') }}</button>
            </div>
        </div>
    </div>
</template>

<script>
import Tags from '@/components/Tags.vue'
import { QuillEditor, Quill } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.bubble.css';

export default {
    name: 'AddArticle',
    data() {
        return {
            tags: ['липиды', 'белки'],
            chosenTags: [],
            numberOfTags: 1
        }
    },
    components: {
        Tags,
        QuillEditor
    },
    mounted() {
        var toolbarOptions = [            
            [{ 'header': [1, 2, 3,  false] }],            
            
            [{ 'font': [] }],
            ['bold', 'italic', 'underline'],                  
            
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],    
            
            [{ 'align': ['', 'center', 'right', 'justify'] }],            
            
            ['image', 'link'],          
            [{ 'color': ['#47FDB0', '#40E3CC', '#52E4FA', '#40A2E3', '#4785FD', '#9359FF', '#A637E6', 
                                               '#73F2BC', '#6EE0D0', '#7AE1F0', '#6EB2E0', '#739EF2', '#A87FF3', '#B567E2', 
                                               '#FFF436', '#FFBF2E', '#FA7325', '#E63034', '#FF4F63', '#E62EA2', '#E82DFA',   
                                               '#F3EC67', '#F3C761', '#F0915B', '#E26365', '#F37886', '#E261B2', '#E360F0'] }, 
             { 'background': ['#47FDB0', '#40E3CC', '#52E4FA', '#40A2E3', '#4785FD', '#9359FF', '#A637E6', 
                                               '#73F2BC', '#6EE0D0', '#7AE1F0', '#6EB2E0', '#739EF2', '#A87FF3', '#B567E2', 
                                               '#FFF436', '#FFBF2E', '#FA7325', '#E63034', '#FF4F63', '#E62EA2', '#E82DFA',   
                                               '#F3EC67', '#F3C761', '#F0915B', '#E26365', '#F37886', '#E261B2', '#E360F0'] }],
        ];
        var quill = new Quill('#maineditor', {
            modules: {
                toolbar: toolbarOptions
            },
            placeholder: this.$t('addArticlePlaceholder'),
            theme: 'bubble'
        });
    },
    methods: {
        addTag(chosenTags) {
            this.chosenTags = chosenTags
        },
        async addNewTag(event) {
            await (this.numberOfTags += 1)
            let inputsLength = document.getElementsByClassName('tag-input').length
            let lastInput = document.getElementsByClassName('tag-input')[inputsLength - 1]
            lastInput.focus()
        },
        deleteTag(tagToDelete) {
            let inputs = document.getElementsByClassName('finished-tag')
            for (let input of inputs) {
                if (input.innerText == tagToDelete) {
                    input.parentElement.parentElement.remove()
                }
            }
        }
    }
}
</script>

<style>
.page-flex {
    display: flex;
    flex-direction: column;
}
.add-article-title {
    margin-left: 10%;
    margin-top: 30px;
    font-size: 32px;
    color: var(--text-color);
    font-weight: 500;
    border: none;
    background: none;
    outline: none;
}

.add-article-title::placeholder {
    color: var(--text-extra);
}

.tagline {
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    font-size: 18px;
    color: var(--text-color);
    margin-top: 10px;
    min-height: 60px;
    max-height: 120px;
    overflow-y: scroll;
}

.tagline::-webkit-scrollbar {
  display: none;
}

.tagline {
  scrollbar-width: none;
}

.tagline p {
    padding-left: 2px;
    padding-right: 12px;
    margin-bottom: 12px;
}

.tag-field {
    padding-right: 12px;
    margin-bottom: 12px;
}

.aftertags-hr {
    margin-top: 0;
}

.add-article-text {
    width: 80%;
    margin: auto;
    font-size: 16px;
    color: var(--text-color);
    flex-grow: 1;
}

.add-tag-btn svg {
    fill: var(--pages-color);
    margin-top: 6.5px;
    margin-bottom: 12px;
}

.add-article-footer {
    width: 100%;
}

.add-article-footer-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    margin: auto;
    margin-bottom: 20px;
}

.attach-file {
    color: var(--text-extra);
    font-size: 16px;
}

.attach-file svg {
    fill: var(--text-extra);
}

.publish-article-btn {
    font-size: 20px;
    color: var(--card-color);
    background: var(--pages-color);
    border-radius: 10px;
    padding: 12px 24px;
    border: none;
}

.ql-bubble .ql-tooltip {
    background: var(--card-color);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>