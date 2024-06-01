<script setup lang="ts">
const props = defineProps<{
    label: string,
    loading: boolean
}>()
</script>

<template>
    <button :disabled="props.loading" class="btn btn-primary w-100">
        <span v-if="!props.loading">{{ props.label }}</span>
        <div v-if="props.loading" class="d-flex justify-content-center" role="status">
            <div :class="`spinner-border`">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </button>
</template>