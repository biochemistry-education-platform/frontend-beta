<template>
    <div class="modal-bg" @click="emit('cancel')"></div>
    <div class="confirm-modal">
        <h2 v-if="props.type == 'file'" class="confirm-modal-title">{{ $t('fileDeletionTitle') }}</h2>
        <h2 v-else-if="props.type == 'note'" class="confirm-modal-title">{{ $t('noteDeletionTitle') }}</h2>
        <h2 v-else-if="props.type == 'acceptArticle'" class="confirm-modal-title">{{ $t('acceptArticleTitle') }}</h2>
        <h2 v-else-if="props.type == 'deleteArticle'" class="confirm-modal-title">{{ $t('declineArticleTitle') }}</h2>
        <h2 v-else class="confirm-modal-title">{{ $t('confirmUnsub') }}</h2>
        <p class="confirm-modal-text" v-if="props.type == 'tag'">{{ $t('unsubTag') }} «{{ props.text }}»?</p>
        <p class="confirm-modal-text" v-if="props.type == 'author'">{{ $t('unsubAuthor') }} «{{ props.text }}»?</p>
        <p class="confirm-modal-text" v-if="props.type == 'file'">{{ $t('fileDeletionText') }} «{{ props.text }}»?</p>
        <p class="confirm-modal-text" v-if="props.type == 'acceptArticle'">{{ $t('acceptArticleText') }} «{{ props.text }}»?</p>
        <p class="confirm-modal-text" v-if="props.type == 'deleteArticle'">{{ $t('declineArticleText') }} «{{ props.text }}»?</p>
        <p class="confirm-modal-text" v-if="props.type == 'note'">{{ $t('noteDeletionText') }} «{{ props.text }}»?</p>
        <div class="confirm-modal-actions">
            <p v-if="props.type == 'acceptArticle' || props.type == 'deleteArticle'" class="modal-cancel" @click="emit('cancel')">{{ $t('cancelAction') }}</p>
            <p v-else class="modal-cancel" @click="emit('cancel')">{{ $t('cancelUnsub') }}</p>
            <button v-if="props.type == 'file' || props.type == 'note' || props.type == 'deleteArticle'" class="modal-confirm-btn" @click="emit('delete')">{{ $t('acceptDeletion') }}</button>
            <button v-else-if="props.type == 'acceptArticle'" class="modal-confirm-btn" @click="emit('accept')">{{ $t('publish') }}</button>
            <button v-else class="modal-confirm-btn" @click="emit('delete')">{{ $t('acceptUnsub') }}</button>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
const props = defineProps({
    text: String,
    type: String
})
const emit = defineEmits(['cancel', 'delete', 'accept'])
</script>

<style>
.modal-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    z-index: 15;
}

.confirm-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
    width: 500px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--card-color);
    box-shadow: 0px 3.2375px 3.2375px rgba(0, 0, 0, 0.25);
    border-radius: 0;
}

.confirm-modal-title {
    color: var(--text-color);
    font-size: 24px;
}

.confirm-modal-text {
    color: var(--text-extra);
    font-size: 16px;
    padding: 20px 0;
}

.confirm-modal-actions {
    display: flex;
    flex-direction: row;
}

.modal-confirm-btn {
    background: var(--pages-color);
    width: 230px;
    height: 40px;
    color: var(--card-color);
    font-size: 16px;
    line-height: 16px;
    padding: 12px 0;
    text-align: center;
    border: none;
    border-radius: 10px;
    margin: 0;
    cursor: pointer;
}

.modal-cancel {
    display: inline-block;
    width: 230px;
    height: 40px;
    color: var(--text-extra);
    font-size: 12px;
    line-height: 12px;
    padding: 14px 0;
    margin: 0;
    text-align: center;
    cursor: pointer;
}
</style>