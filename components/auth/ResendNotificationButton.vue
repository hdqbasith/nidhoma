<script lang="ts" setup>
import { toast } from 'vue-sonner'
import { Button } from '~/packages/@core/ui-kit/shadcn-ui'

const sanctumFetch = useSanctumClient()

async function sendEmailNotification() {
  try {
    const response = await sanctumFetch.raw('/email/verification-notification', { method: 'POST' })

    if (response.type === 'opaqueredirect') {
      await navigateTo(response.headers.get('Location'))
    }

    toast.success('Terkirim! Silakan periksa kotak masuk email Anda.')
  }
  catch {
    toast.error('Gagal mengirim email verifikasi.')
  }
}
</script>

<template>
  <Button @click="sendEmailNotification">
    Resend verification email
  </Button>
</template>

<style scoped></style>
