<script setup lang="ts">
//@ts-nocheck
import useVuelidate from "@vuelidate/core";
import { ref } from "vue";
import Error from "../../../../components/Error.vue";
import { required } from "@vuelidate/validators";
import type { ICreatePostInput } from './types/create'
import type { IUpdatePostInput } from './types/update'
import { createPostHttp } from './actions/CreatePost'
import { updatePostHttp } from './actions/UpdatePost'
import BaseBtn from "../../../../components/BaseBtn.vue";
import { showError, successMsg } from "../../../../helper/Toatnotification";
import { postStore } from '@/stores/admin/postStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const postInput = ref<ICreatePostInput | IUpdatePostInput>({
    id: postStore.editPostData.id,
    title: postStore.editPostData.title,
    post_content: postStore.editPostData.post_content
})

const rules = {
    title: { required },
    post_content: { required }
}

const v$ = useVuelidate(rules, postInput)
const loadingStatus = ref(false)

const createOrUpdatePost = async () => {
    const result = v$.value.$validate()

    if (!result) return

    try {
        loadingStatus.value = true
        postStore.editPost.edit ? await updatePost() : createPost()
        v$.value.$reset()
        loadingStatus.value = false
    } catch (error: any) {
        showError(error.message)
        loadingStatus.value = false
        console.log(error);

    }
}

const createPost = async () => {
    const data = await createPostHttp(postInput.value)
    postInput.value = {} as ICreatePostInput
    successMsg(data.message)
}

const updatePost = async () => {
    const data = await updatePostHttp(postInput.value as IUpdatePostInput)
    postStore.editPostData = {} as IUpdatePostInput
    postInput.value = {} as ICreatePostInput
    postStore.editPost.edit = false
    router.push('/list-post')
    successMsg(data.message)
}

</script>

<template>
    <div class="card mt-5">
        <div class="card-header">
            Create Post {{ postStore.editPostData }}
        </div>
        <div class="card-body">
            <form @submit.prevent="createOrUpdatePost">
                <Error input-label="Title" :form-errors="v$.title.$errors">
                    <input type="text" class="form-control" v-model="postInput.title">
                </Error>
                <div class="mb-3">
                    <Error input-label="Content" :form-errors="v$.post_content.$errors">
                        <textarea class="form-control" v-model="postInput.post_content" id="exampleFormControlTextarea1"
                            rows="3"></textarea>
                    </Error>
                </div>
                <div class="mb-3 d-flex justify-content-around">
                    <BaseBtn :class="postStore.editPost.edit ? 'btn btn-warning' : 'btn btn-success'"
                        :label="postStore.editPost.edit ? 'Update post' : 'Create post'" :loading="loadingStatus"
                        btnwidth="w-40" />
                    <router-link class="btn btn-primary w-40 p-3" to="/list-post">List Post</router-link>
                </div>
            </form>
        </div>
        <div class="card-footer text-body-secondary">
            <p>Tela para cadastro de Posts.</p>
        </div>
    </div>
</template>