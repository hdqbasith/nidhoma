<script lang="ts" setup>
import { toast } from 'vue-sonner';
import { useSanctumError } from '~/lib/useSanctumError';
import { Alert, Form, FormField, Input, VbenButton } from '~/packages/@core/ui-kit/shadcn-ui';
import type { Recordable } from '~/packages/types';

const form = ref();
const state = reactive({
  current_password: "",
  password: "",
  password_confirmation: "",
});

const { user }=useSanctumAuth<User>();
const loading = ref(false);
async function handleSubmit(value: Recordable<any>) {
  // eslint-disable-next-line no-console
  // console.log('reset email:', value);
  const sanctumFetch = useSanctumClient();
  loading.value = true;
  try {
    await sanctumFetch('/auth/reset-password', {
      method: 'POST',
      body: value,
    })

    // await refreshIdentity()

    navigateTo(useSanctumConfig().redirect.onGuestOnly || '/')
    toast.success('Password sudah direset. Silakan gunakan password baru Anda', {
      duration: 10000,
    })
  } catch (error) {
    const err = useSanctumError(error)
    if (err.isValidationError) {
      toast.error(err.bag[0].message)
      // form.value?.setErrors(err.bag)
    }
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <Form
      ref="form"
      :state="state"
      @submit="handleSubmit"
      class="space-y-4"
    >
      <FormField label="Current Password" name="current_password" required>
        <Input v-model="state.current_password" type="password" autocomplete="off" />
      </FormField>

      <FormField
        label="New Password"
        name="password"
        hint="min 8 characters"
        :ui="{ hint: 'text-xs text-gray-500 dark:text-gray-400' }"
        required
      >
        <Input v-model="state.password" type="password" autocomplete="off" />
      </FormField>

      <FormField label="Repeat Password" name="password_confirmation" required>
        <Input
          v-model="state.password_confirmation"
          type="password"
          autocomplete="off"
        />
      </FormField>

      <div class="pt-2">
        <VbenButton type="submit" label="Save" :loading="loading" />
      </div>
    </Form>

    <!-- <Alert
      v-else
      icon="i-heroicons-information-circle-20-solid"
      title="Send a link to your email to reset your password."
      description="To create a password for your account, you must go through the password recovery process."
      :actions="[
        {
          label: 'Send link to Email',
          variant: 'solid',
          color: 'gray',
          loading: loading,
          click: handleSubmit,
        },
      ]"
    /> -->
  </div>
</template>
