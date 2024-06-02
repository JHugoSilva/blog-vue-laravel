<script setup lang="ts">
//@ts-nocheck
import { ref } from 'vue';
import { email, required } from '@vuelidate/validators';
import { showError } from '../../helper/Toatnotification';
import { loginUserHttp } from './actions/LoginUser';
import { ILoginInput } from './auth-types';
import Error from '../../components/Error.vue';
import useVuelidate from '@vuelidate/core';
import BaseBtn from '../../components/BaseBtn.vue';
import { useRouter } from 'vue-router';

const loginInput = ref<ILoginInput>({
    email: 'h@email.com',
    password: '123456'
})

const router = useRouter()

const rules = {
    email: { required, email },
    password: { required }
}
const loadingStatus = ref(false)
const v$ = useVuelidate(rules, loginInput)

const loginUser = async () => {
    const result = v$.value.$validate()
    if (!result) return

    try {
        loadingStatus.value = true
        const data = await loginUserHttp(loginInput.value)
        localStorage.setItem('userData', JSON.stringify(data))
        router.push({ name: 'dashboard' })
        loadingStatus.value = false
    } catch (error) {
        loadingStatus.value = false
        showError(error.message)
        // for (const message of error.erros as string[]) {
        //     showError(message)
        // }
    }
}
</script>
<template>
    <div class="card mt-5">
        <h1>Login</h1>
        {{ loginInput }}
        <form @submit.prevent="loginUser">
            <Error input-label="Email" :form-errors="v$.email.$errors">
                <input type="email" v-model="loginInput.email" class="form-control" />
            </Error>
            <Error input-label="Password" :form-errors="v$.password.$errors">
                <input type="password" v-model="loginInput.password" class="form-control" />
            </Error>
            <div class="form-group my-2">
                <BaseBtn label="Login" :loading="loadingStatus" btnwidth="w-100" />
            </div>
        </form>
    </div>
    <div class="col-md-4 mt-3">
        <router-link to="/register">Create Count</router-link>
    </div>
</template>
