<script lang="ts" setup>
import { toast } from 'vue-sonner';
import ResendNotificationButton from '~/components/auth/ResendNotificationButton.vue';
import { Button } from '~/packages/@core/ui-kit/shadcn-ui';

definePageMeta({
  layout: 'auth',
  middleware: ['sanctum:auth'],
})

useSeoMeta({
  title: 'Verify email',
})

const { user, refreshIdentity,logout } = useSanctumAuth<User>()
const toaster = async () => {
  await refreshIdentity().catch(() => {
    logout()
  });
  if (!user.value?.email_verified_at) {
    toast.error('Email belum diverifikasi. Silakan verifikasi email Anda terlebih dahulu.')
  } else{
    navigateTo('/dashboard')
  }
}
</script>

<template>
  <div
    class="-mt-16 h-screen flex-col-center dark:bg-background-deep bg-background relative px-6 lg:flex-initial lg:px-8">

    <div class="enter-x w-full sm:mx-auto md:max-w-md ">
      <p>
        Terima kasih telah mendaftar! Sebelum memulai, bisakah Anda memverifikasi alamat email Anda dengan mengklik
        tautan yang baru saja kami kirimkan ke Anda? Jika Anda tidak menerima email, kami akan dengan senang hati
        mengirimkannya lagi.
        <!-- Thanks for signing up!
        Before get started, could you verify your email address by clicking on the link we just emailed to you?
        If you did't receive the email, we will gladly send you another. -->
      </p>

      <div class="flex justify-between items-center mt-5">
        <ResendNotificationButton />

        <NuxtLink class="underline underline-offset-2 text-gray-500" @click="toaster">
          <Button variant="ghost">
            Sudah Verifikasi
          </Button>
        </NuxtLink>
      </div>
      <div class="flex justify-between items-center mt-5">
          <Button variant="destructive" @click="logout">
            Logout
          </Button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
