<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getUserData } from './helper/getUserData';
import { showError, successMsg } from './helper/Toatnotification';
import { logoutUserHttp } from './views/auth/actions/LogoutUser';
import { ILogoutInput } from './views/auth/auth-types';
import { userIsLoggedInHttp } from './views/auth/actions/UserLoggedIn'
const userData = getUserData()
const router = useRouter()

const logoutInput = ref<ILogoutInput>({
  id: ''
})

const logout = async () => {
  const userId = userData?.user?.id!
  if (typeof userId !== 'undefined') {
    const data: any = await logoutUserHttp(logoutInput.value)
    localStorage.clear()
    setTimeout(() => {
      successMsg(data.message)
      router.push({ name: 'login' })
    }, 2000)
  }
}

const userIsLoggedIn = async () => {
  try {
    await userIsLoggedInHttp().then((response) => {
      if (response.message === 'Unauthenticated.') {
        console.log('EE2');
        router.push('/login')
      }
    })
  } catch (error: any) {
    if (error?.message === 'Unauthenticated.') {
      router.push('/login')
      showError(error.message)
    }
  }
}

onMounted(async () => {
  await userIsLoggedIn()
})
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Navbar</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/register">Register</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{ userData?.user?.name }}
            </a>
            <ul class="dropdown-menu">
              <li><router-link class="dropdown-item" to="/create-post">Create Post</router-link></li>
              <li><router-link class="dropdown-item" to="/list-post">List Post</router-link></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><router-link class="dropdown-item" to="/dashboard">Dahsboard</router-link></li>
              <li><a href="#" @click="logout" class="dropdown-item">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
    <RouterView></RouterView>
  </div>
</template>
