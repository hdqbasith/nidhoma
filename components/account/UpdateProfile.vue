<script lang="ts" setup>
import { toast } from 'vue-sonner';

const form = ref();
const auth = useAuthStore();

const state = reactive({
  ...{
    email: auth.user.email,
    name: auth.user.name,
    avatar: auth.user.profile_photo_path,
  },
});

const { refresh: sendEmailVerification, status: resendEmailStatus } = useFetch<any>("verification-notification", {
  method: "POST",
  body: { email: state.email },
  immediate: false,
  watch: false,
  onResponse({ response }) {
    if (response._data?.ok) {
      toast({
        title: response._data.message,
      });
    }
  }
});

const { refresh: onSubmit, status: accountUpdateStatus } = useFetch<any>("account/update", {
  method: "POST",
  body: state,
  immediate: false,
  watch: false,
  async onResponse({ response }) {
    if (response?.status === 422) {
      form.value.setErrors(response._data?.errors);
    } else if (response._data?.ok) {
      toast({
        title: "Account details have been successfully updated.",
      });

      await auth.fetchUser();

      state.name = auth.user.name;
      state.email = auth.user.email;
      state.avatar = auth.user.profile_photo_path;
    }
  }
});
</script>

<template>
  <Form ref="form" :state="state" @submit="onSubmit" class="space-y-4">
    <FormField label="" name="avatar" class="flex">
      <InputUploadAvatar
        v-model="state.avatar"
        accept=".png, .jpg, .jpeg, .webp"
        entity="avatars"
        max-size="2"
      />
    </FormField>

    <FormField label="Name" name="name" required>
      <Input v-model="state.name" type="text" />
    </FormField>

    <FormField label="Email" name="email" required>
      <Input
        v-model="state.email"
        placeholder="you@example.com"
        icon="i-heroicons-envelope"
        trailing
        type="email"
      />
    </FormField>

    <Alert
      v-if="auth.user.must_verify_email"
      icon="i-heroicons-information-circle-20-solid"
      title="Please confirm your email address."
      description="A confirmation email has been sent to your email address. Please click on the confirmation link in the email to verify your email address."
      :actions="[
        {
          label: 'Resend verification email',
          variant: 'solid',
          color: 'gray',
          loading: resendEmailStatus === 'pending',
          click: sendEmailVerification,
        },
      ]"
    />

    <div class="pt-2">
      <Button type="submit" label="Save" :loading="accountUpdateStatus === 'pending'" />
    </div>
  </Form>
</template>
