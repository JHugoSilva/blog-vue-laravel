<script setup lang="ts">
//@ts-nocheck
import { ref } from 'vue';
import type { IRegisterInput } from './auth-types';
import { email, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import Error from '../../components/Error.vue';
import { createUserHttp } from './actions/ResgiterUser'
import { successMsg, showError } from '../../helper/Toatnotification'
import BaseBtn from '../../components/BaseBtn.vue';
const registerInput = ref<IRegisterInput>({
    name: 'Maria',
    email: 'm@email.com',
    password: '123456'
})

const rules = {
    name: { required },
    email: { required, email },
    password: { required }
}

const loadingStatus = ref(false)

const v$ = useVuelidate(rules, registerInput)

const registerUser = async () => {
    const result = v$.value.$validate()

    if (!result) return

    try {
        loadingStatus.value = true
        const data = await createUserHttp(registerInput.value)
        registerInput.value = {} as IRegisterInput
        successMsg(data.message)
        loadingStatus.value = false
        v$.value.$reset()

    } catch (error: any) {
        loadingStatus.value = false
        showError(error.message)
        /*for (const message of error as string[]) {
            showError(message)
        }*/
    }
}

</script>
<template>
    <div class="card mt-5">

        <h1>Register</h1>
        <form @submit.prevent="registerUser">
            <Error input-label="Name" :form-errors="v$.name.$errors">
                <input type="text" v-model="registerInput.name" class="form-control" />
            </Error>
            <Error input-label="Email" :form-errors="v$.email.$errors">
                <input type="email" v-model="registerInput.email" class="form-control" />
            </Error>
            <Error input-label="Password" :form-errors="v$.password.$errors">
                <input type="password" v-model="registerInput.password" class="form-control" />
            </Error>
            <div class="form-group mt-3 mb-2">
                <!-- <button type="submit" class="btn btn-primary">Register</button> -->
                <BaseBtn label="Register" :loading="loadingStatus" />

            </div>
        </form>
        <div class="col-md-4">
            <router-link to="/login">Login</router-link>
        </div>

    </div>

</template>
