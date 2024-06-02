<script setup lang="ts">
//@ts-nocheck
import CountPost from './componets/CountPost.vue'
import { countPostHttp } from './actions/CountPost'
import { onMounted, ref } from 'vue'

const numberOfPost = ref<number>(0)

onMounted(async () => {
    const data = await countPostHttp()
    numberOfPost.value = data
})
</script>

<template>
    <div class="row">
        <h1>DASHBOARD</h1>
        <div class="row">
            <div class="col-md-4">
                <CountPost :countPost="numberOfPost" />
            </div>
        </div>
    </div>
</template>