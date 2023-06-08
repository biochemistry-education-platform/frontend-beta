<template>
    <div class="tags-inputs">
        <div v-if="!isFinished">
            <input list="tags-options" id="tag-choice" name="tag-choice" class="tag-input" autocomplete="off" @input="filterTags" @keyup.native.enter="saveTag" v-model="currentTag" :placeholder="$t('tag')">
            <div v-if="isTagListShown && filteredTags.length > 0" class="tags-options-block">
                <div class="tags-options-option" v-for="tag in filteredTags" :key="tag.id">
                    <p v-if="props.page == 'AddArticle'" @click="chooseTag(tag)">{{ tag }}</p>
                    <p v-if="props.page == 'Profile'" @click="chooseTag(tag.name)">{{ tag.name }}</p>
                    <hr class="tags-options-separator">
                </div>
            </div>
        </div>
        <div v-else class="finished-tag">{{ currentTag }}<svg @click="deleteTag" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg></div>
    </div>        

</template>

<script>
export default {
    name: 'Tags',
}
</script>

<script setup>
import { ref, defineEmits, defineProps } from 'vue'

const emit = defineEmits(['addTag', 'deleteTag'])

const props = defineProps({
    initialTags: Object,
    page: String
})

let allTags = props.initialTags
let filteredTags = ref(props.initialTags)
let currentTag = ref('')
let isFinished = ref(false)
let isTagListShown = ref(false)

function filterTags() {
    isTagListShown.value = true
    if (props.page == 'AddArticle') { filteredTags.value = allTags.filter(word =>  word.toLowerCase().includes(currentTag.value.toLowerCase())) }
    else if (props.page == 'Profile') { filteredTags.value = allTags.filter(word =>  word.name.toLowerCase().includes(currentTag.value.toLowerCase())) } 
}

function saveTag() {
    isFinished.value = true
    isTagListShown.value = false
    emit('addTag', currentTag.value)   
}

async function chooseTag(tag) {
    await (currentTag.value = tag)
    isFinished.value = true
    isTagListShown.value = false
    emit('addTag', currentTag.value)
}

function deleteTag() {
    emit('deleteTag', currentTag.value)
}
</script>

<style>
.tags-inputs {
    display: flex;
    flex-direction: row;
    position: relative;
}

.tag-input {
    background: none;
    outline: none;
    border: none;
    font-size: 16px;
    color: var(--text-color);
    width: 160px;
    position: relative;
}

.tag-input::placeholder {
    font-size: 16px;
    color: var(--text-extra);
}

.finished-tag {
    padding: 6px 12px;
    background: var(--tags-color);
    color: var(--tags-text);
    font-size: 16px;
    border-radius: 16px;
    display: flex;
    align-items: center;
}

.finished-tag svg {
    fill: var(--tags-text);
    margin-left: 6px;
}

.taglist-bg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 15;
}

.tags-options-block {
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
    right: 0;
    max-height: 200px;
    background: var(--card-color);
    border-radius: 10px;
    box-shadow: 0px 3.2375px 3.2375px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 12px;
    z-index: 25;
    overflow-y: scroll;
}

.tags-options-option p{
    margin: 5px 0;
    display: flex;
    white-space: nowrap;
    color: var(--text-color);
}

.tags-options-option p:hover{
    cursor: pointer;
}

.tags-options-separator {
    width: 100%;
    background: var(--lines-color);
    margin: 5px 0;
    height: 1px;
}

.tags-options-option:last-child hr {
    margin: 0px;
    height: 0px;
    padding: 0;
}

.tags-options-option:last-child p {
    margin-bottom: 0px;
}
</style>