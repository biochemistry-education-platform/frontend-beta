<template>
    <div class="column is-12 search-form">
        <img src="@/assets/search-icon.png">
        <input class="search-field" type="text" v-model="name" @input="filterit">
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
                date_to: new Date()
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