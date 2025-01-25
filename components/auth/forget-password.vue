<script lang="ts" setup>
import { toast } from 'vue-sonner';
import { z } from 'zod';
import { useSanctumError } from '~/lib/useSanctumError';
import { AuthenticationForgetPassword, type VbenFormSchema } from '~/packages/effects/common-ui';
import { $t } from '~/packages/locales';
import type { Recordable } from '~/packages/types';

// import type { VbenFormSchema } from '@vben/common-ui';
// import type { Recordable } from '@vben/types';

// import { computed, ref } from 'vue';

// import { AuthenticationForgetPassword, z } from '@vben/common-ui';
// import { $t } from '@vben/locales';

defineOptions({ name: 'ForgetPassword' });

const loading = ref(false);

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: 'example@example.com',
      },
      fieldName: 'email',
      label: $t('authentication.email'),
      rules: z
        .string()
        .min(1, { message: $t('authentication.emailTip') })
        .email($t('authentication.emailValidErrorTip')),
    },
  ];
});

async function handleSubmit(value: Recordable<any>) {
  // eslint-disable-next-line no-console
  // console.log('reset email:', value);
  const sanctumFetch = useSanctumClient();
  loading.value = true;
  try {
    await sanctumFetch('/auth/forgot-password', {
      method: 'POST',
      body: value,
    })

    // await refreshIdentity()

    navigateTo(useSanctumConfig().redirect.onGuestOnly || '/')
    toast.success('Link reset password sudah dikirim ke e-mail Anda', {
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
  <AuthenticationForgetPassword
    :form-schema="formSchema"
    :loading="loading"
    @submit="handleSubmit"
  />
</template>
