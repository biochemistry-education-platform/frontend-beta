<template>
    <div class="tags-inputs">
        <div v-if="!finished">
            <input list="tags-options" id="tag-choice" name="tag-choice" class="tag-input" v-on:change="saveTag" v-model="currentTag" :placeholder="$t('tag')">
            <datalist id="tags-options" >>
                <option v-for="tag in tags" v-bind:key="tag.id">{{ tag }}</option>
            </datalist>
        </div>
        <div v-else class="finished-tag">{{ currentTag }}<svg @click="deleteTag" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg></div>
    </div>        

</template>

<script>
export default {
    name: 'Tags',
    props: {
        initialTags: Object,
    },
    mounted() {
        console.log(this.tags)
    },
    data() {
        return {
            tags: this.initialTags,
            currentTag: '',
            finished: false
        }
    },
    methods: {
        saveTag(event) {
            this.finished = true
            this.$emit('addTag', this.currentTag)

            //TODO сохранять не при изминении, а собирать значения из инпутов при сохранении всей формы (родителя)
        },
        deleteTag(event) {
            this.$emit('deleteTag', this.currentTag)
        }
    }
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
</style>