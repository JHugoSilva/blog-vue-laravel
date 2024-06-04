<script setup lang="ts">
import { ref } from 'vue';
import { getUserData } from '../../../../../helper/getUserData';
import { showError, successMsg } from '../../../../../helper/Toatnotification';
import { getSelectedImage } from '../../../../../helper/uploadImage';
import { APP } from '../../../../../shared/App';

const props = defineProps<{ postId: number }>()
const emit = defineEmits<{ (e: 'closeModal'): void }>()
const image = ref<any>()

function selectImage(e: any) {
    const selectedImage = getSelectedImage(e, 'outputImage')
    image.value = selectedImage
}

function uploadImageHeader(file: any, postId: number) {
    const userData = getUserData()
    const headers = new Headers()
    headers.append('Authorization', 'Bearer ' + userData?.token)
    const formData = new FormData()
    formData.append('image', file)
    formData.append('post_id', postId.toString())
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: formData
    }

    return requestOptions
}

const uploadImage = async () => {
    try {
        const reqOptions = uploadImageHeader(image.value, props.postId)
        const response = await fetch(`${APP.apiUrl}/post/upload`, reqOptions)
        const data = await response.json()
        successMsg(data.message)
    } catch (error: any) {
        showError(error?.message)

    }
}
</script>
<template>
    <!-- Modal -->
    <div class="modal fade" id="postModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            {{ image }} --{{ props.postId }}
            <div class="modal-content">
                <form @submit.prevent="uploadImage" enctype="multipart/form-data">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal - {{ postId }}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            @click="emit('closeModal')"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <img style="height: 150px;" id="outputImage" src="">
                            <br>
                            <label for="image">Image</label>
                            <br>
                            <input type="file" @change="selectImage" name="" id="">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="emit('closeModal')"
                            data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>