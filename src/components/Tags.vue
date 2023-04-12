<template>
    <label for="tag-choice">Tags</label>
    

    <div class="tags-inputs">
        <input list="tags-options" id="tag-choice" name="tag-choice" v-on:change="saveTag">
        <datalist id="tags-options" >>
            <option v-for="tag in tags" v-bind:key="tag.id">{{ tag }}</option>
        </datalist>
    </div>        
    <button v-on:click="addTag">+</button>

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
            chosenTags: []
        }
    },
    methods: {
        addTag() {
            let place = document.getElementsByClassName('tags-inputs')[0]
        },
        saveTag(event) {
            let input = document.getElementById('tag-choice').value
            this.chosenTags.push(input)
            this.$emit('addTag', this.chosenTags)

        }
    }
}
</script>

<style>
.tags-inputs {
    display: flex;
    flex-direction: row;
}
</style>