<template>
    <div class="tags-inputs">
        <input list="tags-options" id="tag-choice" name="tag-choice" class="tag-input" v-on:change="saveTag" v-model="currentTag">
        <div class="delete-tag-btn" @click="deleteTag">-</div>
        <datalist id="tags-options" >>
            <option v-for="tag in tags" v-bind:key="tag.id">{{ tag }}</option>
        </datalist>
    </div>        

</template>

<script>
export default {
    name: 'Tags',
    props: {
        initialTags: Object
    },
    mounted() {
        console.log(this.tags)
    },
    data() {
        return {
            tags: this.initialTags,
            chosenTags: [],
            currentTag: ''
        }
    },
    methods: {
        saveTag(event) {
            this.chosenTags.push(this.currentTag)
            this.$emit('addTag', this.chosenTags)

            //TODO сохранять не при изминении, а собирать значения из инпутов при сохранении всей формы (родителя)
        },
        deleteTag(event) {
            if (this.currentTag != '') {
                if (this.chosenTags.includes(this.currentTag)) {
                    this.chosenTags.splice(this.chosenTags.indexOf(this.currentTag))
                }
            }
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

.delete-tag-btn {
    width: 20px;
    height: 20px;
    position: absolute;
    right: -8px;
    top: -8px;
    background-color: red;
    color: white;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: 0.5s;
    z-index: 5;
}

.delete-tag-btn:hover {
    opacity: 1;
}
</style>