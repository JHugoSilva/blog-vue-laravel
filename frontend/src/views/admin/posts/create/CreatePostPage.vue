<script setup lang="ts">
//@ts-nocheck
import useVuelidate from "@vuelidate/core";
import { ref } from "vue";
import Error from "../../../../components/Error.vue";
import { required } from "@vuelidate/validators";
import type { ICreatePostInput } from './types/create'
import { createPostHttp } from './actions/CreatePost'
import BaseBtn from "../../../../components/BaseBtn.vue";
import { showError, successMsg } from "../../../../helper/Toatnotification";

const postInput = ref<ICreatePostInput>({
    title: '',
    post_content: ''
})

const rules = {
    title: { required },
    post_content: { required }
}

const v$ = useVuelidate(rules, postInput)
const loadingStatus = ref(false)

const createPost = async () => {
    const result = v$.value.$validate()

    if (!result) return

    try {
        loadingStatus.value = true
        const data = await createPostHttp(postInput.value)
        successMsg(data.message)
        postInput.value = {} as ICreatePostInput
        v$.value.$reset()
        loadingStatus.value = false
    } catch (error: any) {
        showError(error.message)
        loadingStatus.value = false
        console.log(error);

    }
}

</script>

<template>
    <div class="card mt-5">
        <div class="card-header">
            Create Post
        </div>
        <div class="card-body">
            <form @submit.prevent="createPost">
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
                    <BaseBtn label="Create post" :loading="loadingStatus" btnwidth="w-40" />
                    <router-link class="btn btn-primary w-40 p-3" to="/list-post">List Post</router-link>
                </div>
            </form>
        </div>
        <div class="card-footer text-body-secondary">
            <p>Tela para cadastro de Posts.</p>
        </div>
    </div>
</template>