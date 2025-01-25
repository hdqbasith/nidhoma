<script lang="ts" setup>
import { toast } from 'vue-sonner';
import { z } from 'zod';
import { useSanctumError } from '~/lib/useSanctumError';
import { requestClient } from '~/packages/api/request';
import { AuthenticationRegister, type VbenFormSchema } from '~/packages/effects/common-ui';
import { $t } from '~/packages/locales';
import type { Recordable } from '~/packages/types';

defineOptions({ name: 'Register' });

const loading = ref(false);
// const authStore = useAuthStore();
const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('authentication.usernameTip'),
      },
      fieldName: 'email',
      label: $t('authentication.username'),
      rules: z.string().min(8, { message: $t('authentication.usernameTip') }),
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        passwordStrength: true,
        placeholder: $t('authentication.password'),
      },
      fieldName: 'password',
      label: $t('authentication.password'),
      renderComponentContent() {
        return {
          strengthText: () => $t('authentication.passwordStrength'),
        };
      },
      rules: z.string().min(8, { message: $t('authentication.passwordTip') }),
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: $t('authentication.confirmPassword'),
      },
      dependencies: {
        rules(values) {
          const { password } = values;
          return z
            .string({ required_error: $t('authentication.passwordTip') })
            .min(1, { message: $t('authentication.passwordTip') })
            .refine((value) => value === password, {
              message: $t('authentication.confirmPasswordTip'),
            });
        },
        triggerFields: ['password'],
      },
      fieldName: 'password_confirmation',
      label: $t('authentication.confirmPassword'),
    },
    {
      component: 'VbenCheckbox',
      fieldName: 'agreePolicy',
      renderComponentContent: () => ({
        default: () =>
          h('span', [
            $t('authentication.agree'),
            h(
              'a',
              {
                class: 'vben-link ml-1',
                onClick: () => navigateTo('/privacy-and-policy')
              },
              `${$t('authentication.privacyPolicy')} & ${$t('authentication.terms')}`,
            ),
          ]),
      }),
      rules: z.boolean().refine((value) => !!value, {
        message: $t('authentication.agreeTip'),
      }),
    },
  ];
});
async function handleSubmit(value: Recordable<any>) {
  // authStore.authRegister(value);
  loading.value = true;
  const sanctumFetch = useSanctumClient()
  const { refreshIdentity } = useSanctumAuth()
  try {
    await sanctumFetch('/auth/register', {
      method: 'POST',
      body: value,
    })

    // await refreshIdentity()

    navigateTo(useSanctumConfig().redirect.onGuestOnly || '/')
    toast.success('Pendaftaran berhasil. Silakan cek email Anda untuk verifikasi.', {
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
  <AuthenticationRegister :form-schema="formSchema" :loading="loading" @submit="handleSubmit" />
</template>
