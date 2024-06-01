<script setup lang="ts">
//@ts-nocheck
import useVuelidate from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { ref } from 'vue';
import { ILoginInput } from './auth-types';
import Error from '../../components/Error.vue';

const loginInput = ref<ILoginInput>({
    email: '',
    password: ''
})

const rules = {
    email: { required, email },
    password: { required }
}
const v$ = useVuelidate(rules, loginInput)

const loginUser = () => {
    const result = v$.value.$validate()
    if (!result) return
}
</script>
<template>
    <div class="card mt-5">
        <h1>Login</h1>
        <form @submit.prevent="loginUser">
            <Error input-label="Email" :form-errors="v$.email.$errors">
                <input type="email" v-model="loginInput.email" class="form-control" />
            </Error>
            <Error input-label="Password" :form-errors="v$.password.$errors">
                <input type="password" v-model="loginInput.password" class="form-control" />
            </Error>
            <div class="form-group my-2">
                <button type="submit" class="btn btn-primary">Login</button>
            </div>
        </form>
    </div>
    <div class="col-md-4 mt-3">
        <router-link to="/register">Create Count</router-link>
    </div>
</template>
