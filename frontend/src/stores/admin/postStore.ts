import { ref } from 'vue'
import { defineStore } from 'pinia'
import { IEditPostDataInput } from '../../views/admin/types/admin-types'

const usePostStore = defineStore('post', () => {
  const editPostData = ref<IEditPostDataInput>({
    id: null,
    title: '',
    post_content: ''
  })
  const editPost = ref({
    edit: false
  })

  return { editPostData, editPost }
})

export const postStore = usePostStore()
