<script setup lang="ts">
//@ts-nocheck
import { onMounted, ref } from "vue";
import { getPostHttp } from './actions/GetPostList'
import { myDebounce } from '../../../../helper/util'
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import { confirmDelation } from '../../../../helper/SweetAlert'
import { deletePostHttp } from './actions/DeletePost'
import { showError, successMsg } from "../../../../helper/Toatnotification";
import Tables from "./components/Tables.vue";

const posts = ref<getResponseType>()
const query = ref<string>('')

const showPost = async (page = 1, query = '') => {
    const data = await getPostHttp(page, query)
    posts.value = data
}

const searchPost = myDebounce(async function () {
    await showPost(1, query.value)
}, 300)

const deletePost = (id, i) => {
    confirmDelation().then(async () => {
        posts.value.data.splice(i, 1)
        const data = await deletePostHttp(id)
        successMsg(data.message)
    }).catch((error) => {
        showError(error.message)
    })
}

const showModal = (postId: number) => {
    console.log(postId);

}

onMounted(async () => {
    await showPost()
})

function openModal(element: string) {
    var modal = document.getElementById() as HTMLElement
    AULA - 12 TEMPO - 31: 54
    if (modal) {
        setTimeout(() => {
            modal.classList.add('fade', 'show')
            modal.style.display = 'block'
            modal.classList.add('in')
        }, 500)

        document.body.classList.add('modal-open')

        var modalBackdrop = document.createElement('div')
        modalBackdrop.className = 'modal-backdrop fade show'
        document.body.appendChild(modalBackdrop)
    }
}
</script>
<template>
    <div class="card mt-5">
        <div class="card-body">
            <h5 class="card-title">Buscar Post</h5>
            <input type="text" placeholder="Search..." @keydown="searchPost" v-model="query" class="form-control">
        </div>
    </div>
    <div class="card mt-5">
        <Tables :posts="posts" @delete-post="deletePost" @showModal="showModal" />
        <div v-if="posts" class="pagination justify-content-center">
            <Bootstrap5Pagination :data="posts" @pagination-change-page="showPost" />
        </div>
    </div>
</template>