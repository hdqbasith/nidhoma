<script lang="ts" setup>
import { toast } from 'vue-sonner';
import { z } from 'zod'
import { useSanctumError } from '~/lib/useSanctumError';
import { AuthenticationResetPassword, type VbenFormSchema } from '~/packages/effects/common-ui';
import { $t } from '~/packages/locales';
import type { Recordable } from '~/packages/types';

interface Props {
  email: string
  token: string
}

const props = defineProps<Props>()
console.log(props);

defineOptions({ name: 'ResetPassword' });

const loading = ref(false);
// const authStore = useAuthStore();
const formSchema = computed((): VbenFormSchema[] => {
  return [
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
            .min(8, { message: $t('authentication.passwordTip') })
            .refine((value) => value === password, {
              message: $t('authentication.confirmPasswordTip'),
            });
        },
        triggerFields: ['password'],
      },
      fieldName: 'password_confirmation',
      label: $t('authentication.confirmPassword'),
    },
  ];
});
async function handleSubmit(value: Recordable<any>) {
  // authStore.authRegister(value);
  const values = {
    ...value,
    email: props.email,
    token: props.token,
  }
  loading.value = true;
  const sanctumFetch = useSanctumClient();
  console.log(values);
  
  try {
    await sanctumFetch('/auth/reset-password', {
      method: 'POST',
      body: values,
    })

    navigateTo(useSanctumConfig().redirect.onGuestOnly || '/')
    toast.success('Password sudah diganti. Silakan login dengan password baru.', {
      duration: 10000,
    })
  } catch (error) {
    const err = useSanctumError(error)
    if (err.isValidationError) {
      // toast.error('Gagal mengganti password. Token reset password sudah kadaluarsa.')
      toast.error(err.bag[0].message)
      // form.value?.setErrors(err.bag)
    }
  } finally {
    loading.value = false;
  }
}
</script>

<template>
    <AuthenticationResetPassword :form-schema="formSchema" :loading="loading" @submit="handleSubmit" />
</template>

<style scoped></style>
