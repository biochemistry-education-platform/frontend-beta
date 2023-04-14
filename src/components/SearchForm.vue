<template>
    <div class="column is-12 search-form">
        <img src="@/assets/search-icon.png">
        <input class="search-field" type="text" v-model="name" @input="filterit">
    </div>
    <div class="extra-search">
        <label for="tag-choice">Tags</label>
        <div class="oneline">
            <div class="field tag-field" v-for="index in numberOfTags" :key="index">
                <div class="tags-inputs">
                    <input list="tags-options" id="tag-choice" name="tag-choice" class="tag-input" v-on:change="filterTag">
                    <div class="delete-tag-btn" @click="deleteTag">-</div>
                    <datalist id="tags-options" >
                        <option v-for="tag in tags" v-bind:key="tag.id">{{ tag }}</option>
                    </datalist>
                </div>
            </div>
            <div class="add-tag-btn" @click="addNewTag">+</div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: 'SearchForm',
        props: {
            items: Array
        },
        data() {
            return {
                filteredItems: this.items.reverse(),
                name: '',
                tags: [],
                authors: [],
                date_from: new Date(1000),
                date_to: new Date(),
                numberOfTags: 1,
            }
        },
        methods: {
            filterit(event) {
                if (this.filteredItems[0].title) {
                    this.filteredItems = this.filteredItems.filter(item => item.title.toLowerCase().includes(this.name.toLowerCase()))
                } else {
                    this.filteredItems = this.filteredItems.filter(item => item.based_on_article.toLowerCase().includes(this.name.toLowerCase()))
                }
                this.$emit('filterit', this.filteredItems)
                this.filteredItems = this.items.reverse()
            },
            deleteTag(event) {
                event.target.parentElement.parentElement.remove()
                this.filterTag()
            },
            filterTag() {
                // получить все теги из инпутов, фильтровать filteredItems и показать только те где есть ВСЕ (соединяем через ИЛИ) ??
            },
            addNewTag() {
                this.numberOfTags += 1
            }
        }
    }
</script>

<style>
.search-form{
    display: flex;
    flex-direction: row;
}

.search-form img{
    height: 40px;
    margin-right: 20px;
}

.search-field {
    width: 100%;
    height: 40px;
    font-size: 24px;
}
</style>