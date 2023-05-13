<template>
    <div class="search-form">
        <div class="search-field">
            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M796 935 533 672q-30 26-69.959 40.5T378 727q-108.162 0-183.081-75Q120 577 120 471t75-181q75-75 181.5-75t181 75Q632 365 632 471.15 632 514 618 554q-14 40-42 75l264 262-44 44ZM377 667q81.25 0 138.125-57.5T572 471q0-81-56.875-138.5T377 275q-82.083 0-139.542 57.5Q180 390 180 471t57.458 138.5Q294.917 667 377 667Z"/></svg>
            <input type="text" v-model="name" @input="filterArticles" placeholder="Найти статью по названию">
        </div>
        
        <div class="extra-search">
            <label class="search-option-label">Tags
                <svg v-if="!isTagListShown" @click="isTagListShown = true" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M480 711 240 471l43-43 197 198 197-197 43 43-240 239Z"/></svg>
                <svg v-if="isTagListShown" @click="isTagListShown = false" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="m283 711-43-43 240-240 240 239-43 43-197-197-197 198Z"/></svg>
                <TransitionGroup>
                    <div v-if="isTagListShown" class="search-options-block">
                        <div class="search-options-option" v-for="tag in tags" :key="tag">
                            <p @click="switchChoosing('tags', tag)">
                                <svg v-if="chosenTags.includes(tag)" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M378 810 154 586l43-43 181 181 384-384 43 43-427 427Z"/></svg>
                                <div v-else class="search-option-padding"></div>{{ tag }}
                            </p>
                            <hr class="search-options-separator">
                        </div> 
                    </div>
                </TransitionGroup>
            </label>

            <label class="search-option-label">Authors
                <svg v-if="!isAuthorListShown" @click="isAuthorListShown = true" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M480 711 240 471l43-43 197 198 197-197 43 43-240 239Z"/></svg>
                <svg v-if="isAuthorListShown" @click="isAuthorListShown = false" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="m283 711-43-43 240-240 240 239-43 43-197-197-197 198Z"/></svg>
                <TransitionGroup>
                    <div v-if="isAuthorListShown" class="search-options-block">
                        <div class="search-options-option" v-for="author in shortAuthors" :key="author">
                            <p @click="switchChoosing('authors', author)">
                                <svg v-if="chosenAuthors.includes(author)" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M378 810 154 586l43-43 181 181 384-384 43 43-427 427Z"/></svg>
                                <div v-else class="search-option-padding"></div>{{ author }}
                            </p>
                            <hr class="search-options-separator">
                        </div> 
                    </div>
                </TransitionGroup>
            </label>

            <label class="search-option-label">Sort
                <svg v-if="!isSortShown" @click="isSortShown = true" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M480 711 240 471l43-43 197 198 197-197 43 43-240 239Z"/></svg>
                <svg v-if="isSortShown" @click="isSortShown = false" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="m283 711-43-43 240-240 240 239-43 43-197-197-197 198Z"/></svg>
                <TransitionGroup>
                    <div v-if="isSortShown" class="search-options-block">
                        <div class="search-options-option" v-for="option in sortingOptions" :key="option">
                            <p @click="switchChoosing('sort', option)">
                                <svg v-if="chosenSorting.includes(option)" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M378 810 154 586l43-43 181 181 384-384 43 43-427 427Z"/></svg>
                                <div v-else class="search-option-padding"></div>{{ option }}
                            </p>
                            <hr class="search-options-separator">
                        </div> 
                    </div>
                </TransitionGroup>
                
            </label>
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
                allItems: this.items,
                filteredItems: this.items,
                name: '',
                tags: ['белки', 'липиды', 'гормоны'],
                chosenTags: [],
                authors: ['Иванов Иван Иванович', 'Петров Петр Петрович', 'Андреев Андрей'],
                shortAuthors: [],
                chosenAuthors: [],
                sortingOptions: ['сначала новые', 'сначала старые', 'по названию А-Я', 'по названию Я-А'],
                chosenSorting: [],
                date_from: new Date(1000),
                date_to: new Date(),
                numberOfTags: 1,
                isTagListShown: false,
                isAuthorListShown: false,
                isSortShown: false
            }
        },
        mounted() {
            this.authors.forEach(author => {
                let splitted = author.split(' ')
                let newName = ''
                if (splitted.length == 3) {
                    newName = splitted[0] + ' ' + splitted[1].charAt(0) + '. ' + splitted[2].charAt(0) + '.'
                }
                else {
                    newName = splitted[0] + ' ' + splitted[1].charAt(0) + '.'
                }
                this.shortAuthors.push(newName)
            })
            this.filteredItems = this.items
        },
        methods: {
            filterArticles(event) {                
                let result = []
                let nameIDs = []
                let tagsIDs = []
                let authorsIDs = []
                if (this.name != '') {
                    let nameFiltered = this.items.filter(item => item.title.toLowerCase().includes(this.name.toLowerCase()))
                    nameFiltered.forEach(item => result.push(item))
                    nameFiltered.forEach(item => nameIDs.push(item.id))
                }

                this.chosenTags.forEach(tag => {
                    let tagsFiltered = this.items.filter(item => item.tags.includes(tag))
                    tagsFiltered.forEach(item => result.push(item))
                    tagsFiltered.forEach(item => tagsIDs.push(item.id))
                })


                this.chosenAuthors.forEach(author => {
                    let fullName = this.authors[this.shortAuthors.indexOf(author)]
                    let authorsFiltered = this.items.filter(item => item.author == fullName)
                    authorsFiltered.forEach(item => result.push(item))
                    authorsFiltered.forEach(item => authorsIDs.push(item.id))
                })

                if (this.chosenTags.length > 0 && this.chosenAuthors.length > 0 && this.name != '') {
                    let temp = []
                    nameIDs.forEach(id => {if (tagsIDs.includes(id) && authorsIDs.includes(id)) {temp.push(id)}} )
                    result = result.filter(item => temp.includes(item.id))
                } else { 
                    if (this.chosenTags.length > 0 && this.chosenAuthors.length > 0) {
                        let temp = []
                        tagsIDs.forEach(id => {if (authorsIDs.includes(id)) {temp.push(id)}} )
                        result = result.filter(item => temp.includes(item.id))
                    }
                    else { 
                        if (this.chosenTags.length > 0 && this.name != '') {
                            let temp = []
                            tagsIDs.forEach(id => {if (nameIDs.includes(id)) {temp.push(id)}} )
                            result = result.filter(item => temp.includes(item.id)) 
                        }
                        else {
                            if (this.chosenAuthors.length > 0 && this.name != '') {
                                let temp = []
                                authorsIDs.forEach(id => {if (nameIDs.includes(id)) {temp.push(id)}} )
                                result = result.filter(item => temp.includes(item.id))
                            }
                            else {
                                if (this.chosenTags.length > 0) {
                                    result = result.filter(item => tagsIDs.includes(item.id))
                                }
                                else {
                                    if (this.chosenAuthors.length > 0) {
                                        result = result.filter(item => authorsIDs.includes(item.id))
                                    }
                                    else {
                                        if (this.name != '') {
                                            result = result.filter(item => nameIDs.includes(item.id))
                                        }
                                        else {
                                            result = this.items //return all the list
                                            console.log(this.items)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                let unique = result.filter((value, index, array) => array.indexOf(value) === index)
                this.filteredArticles = unique
                this.$emit('filterit', unique)
            },
            
            sortArticles() { 
                if (this.filteredItems.length == 0) { this.filteredItems = this.items }

                if (this.chosenSorting[0] == this.sortingOptions[0]) {
                    this.filteredItems.sort((a,b) => new Date(b.publish_date) - new Date(a.publish_date))
                }
                if (this.chosenSorting[0] == this.sortingOptions[1]) {
                    this.filteredItems.sort((a,b) => new Date(a.publish_date) - new Date(b.publish_date))
                }
                if (this.chosenSorting[0] == this.sortingOptions[2]) {
                    this.filteredItems.sort((a,b) => {
                        if (a.title < b.title) { return -1 }
                        if (a.title > b.title) { return 1 }
                        return 0
                    })
                }
                if (this.chosenSorting[0] == this.sortingOptions[3]) {
                    this.filteredItems.sort((a,b) => {
                        if (a.title < b.title) { return 1 }
                        if (a.title > b.title) { return -1 }
                        return 0
                    })
                }

                this.$emit('filterit', this.filteredItems)
            },
            switchChoosing(arr, element) {
                let array
                arr == 'tags' ? array = this.chosenTags : (arr == 'authors' ? array = this.chosenAuthors : array = this.chosenSorting)
                if (array.includes(element)) {
                    const index = array.indexOf(element)
                    if (index > -1) { array.splice(index, 1) }
                }
                else {
                    if (arr == 'sort' && array.length == 1) { array.splice(0,1) }
                    array.push(element)
                }
                if (arr == 'sort') { 
                    this.isSortShown = false
                    this.sortArticles()
                }
                this.filterArticles()
            }
        }
    }
</script>

<style>
.search-form {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 80%;
    margin: auto;
}

.search-field {
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.search-field svg{
    margin-right: 6px;
    fill: var(--text-extra);
}

.search-field input {
    width: calc(100% - 60px);
    height: 24px;
    font-size: 20px;
    background: none;
    border: none;
    outline: none;
    color: var(--text-color);
}

.search-field input::placeholder {
    color: var(--text-extra);
}

.extra-search {
    display: flex;
    flex-direction: row;
}

.search-option-label {
    margin-left: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: var(--text-extra);
    position: relative;
}

.search-option-label svg {
    fill: var(--text-extra);
}

.search-option-label svg:hover {
    cursor: pointer;
}

.search-options-block {
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
}

.search-options-option p{
    margin: 5px 0;
    display: flex;
    white-space: nowrap;
}

.search-options-option p svg{
    margin-right: 4px;
    fill: var(--text-color);
}

.search-options-option p:hover{
    cursor: pointer;
}

.search-option-padding {
    padding-left: 24px;
}

.search-options-separator {
    width: 100%;
    background: var(--lines-color);
    margin: 5px 0;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>