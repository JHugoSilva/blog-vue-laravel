<script setup lang="ts">
import { ref } from 'vue';
import { showError, successMsg } from '../../../../../helper/Toatnotification';
import { getSelectedImage } from '../../../../../helper/uploadImage';
import { uploadPostHttp } from '../actions/uploadImagePost'

const props = defineProps<{ postId: number }>()
const emit = defineEmits<{ (e: 'closeModal'): void, (e: 'refreshTable'): void }>()
const image = ref<any>()

function selectImage(e: any) {
    const selectedImage = getSelectedImage(e, 'outputImage')
    image.value = selectedImage
}

const uploadImage = async (e: any) => {
    try {
        if (image.value !== '' && image.value !== undefined) {
            const data = await uploadPostHttp(image.value, props.postId)
            successMsg(data.message)
            image.value = ''
            const imgTag = document.getElementById('outputImage') as HTMLImageElement
            imgTag.src = '';
            e.target.reset()
            emit('closeModal')
            emit('refreshTable')
        } else {
            showError('Selecionar uma imagem e obrigatorio')
        }
    } catch (error: any) {
        showError(error?.message)
    }
}
</script>
<template>
    <!-- Modal -->
    <div class="modal fade" id="postModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
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
                        <button type="submit" class="btn btn-primary">Upload</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>