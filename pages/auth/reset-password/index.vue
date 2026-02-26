<script lang="ts" setup>
// definePageMeta({
//   middleware: ['sanctum:guest'],
// })

useSeoMeta({
  title: 'Reset password',
})

const route = useRoute()

const email = (route.query.email ?? '') as string
const resetToken = route.query.token as string
</script>

<template>
    <div class="flex-col-center dark:bg-background-deep bg-background relative px-6 py-10 lg:flex-initial lg:px-8">
      <AuthResetPassword
      :email="email"
      :token="resetToken"
      class="enter-x mt-6 w-full sm:mx-auto md:max-w-md"
      />
    </div>
</template>

<style scoped></style>
