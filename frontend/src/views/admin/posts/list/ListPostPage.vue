<script setup lang="ts">
//@ts-nocheck
import { onMounted, ref } from "vue";
import { getPostHttp } from './actions/GetPostList'
import { closeModal, myDebounce, openModal } from '../../../../helper/util'
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import { confirmDelation } from '../../../../helper/SweetAlert'
import { deletePostHttp } from './actions/DeletePost'
import { showError, successMsg } from "../../../../helper/Toatnotification";
import Tables from "./components/Tables.vue";
import UploadaModal from "./components/UploadaModal.vue";
import { IEditPostDataInput } from "../../types/admin-types";
import { postStore } from "../../../../stores/admin/postStore";
import { useRouter } from "vue-router";


const posts = ref<getResponseType>()
const query = ref<string>('')
const router = useRouter()

const showPost = async (page = 1, query = '') => {
    const data = await getPostHttp(page, query)
    posts.value = data
}

const searchPost = myDebounce(async function () {
    await showPost(1, query.value)
}, 300)

const editPost = (postData: IEditPostDataInput) => {
    postStore.editPostData.id = postData.id
    postStore.editPostData.title = postData.title
    postStore.editPostData.post_content = postData.post_content
    postStore.editPost.edit = true
    router.push('/create-post')

}

const deletePost = (id, i) => {
    confirmDelation().then(async () => {
        posts.value.data.splice(i, 1)
        const data = await deletePostHttp(id)
        successMsg(data.message)
    }).catch((error) => {
        showError(error.message)
    })
}

const currentPostId = ref<number>(0)
const showModal = async (postId: number) => {
    openModal('postModal', postId).then(postId => {
        currentPostId.value = postId
    })
}

onMounted(async () => {
    await showPost()
})


</script>
<template>
    <div class="card mt-5">
        <div class="card-body">
            <h5 class="card-title">Buscar Post</h5>
            <input type="text" placeholder="Search..." @keydown="searchPost" v-model="query" class="form-control">
        </div>
    </div>
    <div class="card mt-5">
        <UploadaModal :post-id="currentPostId" @close-modal="closeModal('postModal')" @refresh-table="showPost" />
        <Tables :posts="posts" @delete-post="deletePost" @show-modal="showModal" @edit-post="editPost" />
        <div v-if="posts" class="pagination justify-content-center">
            <Bootstrap5Pagination :data="posts" @pagination-change-page="showPost" />
        </div>
    </div>
</template>