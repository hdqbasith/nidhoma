<script lang="ts" setup>
import { toast } from 'vue-sonner'
import { VbenButton } from '~/packages/effects/common-ui'

const sanctumFetch = useSanctumClient()
const loading = ref(false)
async function sendEmailNotification() {
  try {
    loading.value = true
    const response = await sanctumFetch.raw('/email/verification-notification', { method: 'POST' })

    if (response.type === 'opaqueredirect') {
      await navigateTo(response.headers.get('Location'))
    }

    toast.success('Terkirim! Silakan periksa kotak masuk email Anda.')
  } catch {
    toast.error('Gagal mengirim email verifikasi.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <VbenButton :class="{
    'cursor-wait': loading,
  }" :loading="loading" aria-label="login" class="w-full" @click="sendEmailNotification">
    Kirim ulang
  </VbenButton>
</template>

<style scoped></style>
