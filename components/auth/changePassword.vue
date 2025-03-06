<script setup lang="ts">
import { z } from "zod";
import { Button } from "~/packages/@core/ui-kit/shadcn-ui";
import { useVbenForm, type VbenFormSchema } from "~/packages/effects/common-ui";
import { $t } from "~/packages/locales";

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: "VbenInputPassword",
      componentProps: {
        passwordStrength: true,
        placeholder: $t("authentication.password"),
      },
      fieldName: "password",
      label: $t("authentication.password"),
      renderComponentContent() {
        return {
          strengthText: () => $t("authentication.passwordStrength"),
        };
      },
      rules: z.string().min(8, { message: $t("authentication.passwordTip") }),
    },
    {
      component: "VbenInputPassword",
      componentProps: {
        placeholder: $t("authentication.confirmPassword"),
      },
      dependencies: {
        rules(values) {
          const { password } = values;
          return z
            .string({ required_error: $t("authentication.passwordTip") })
            .min(8, { message: $t("authentication.passwordTip") })
            .refine((value) => value === password, {
              message: $t("authentication.confirmPasswordTip"),
            });
        },
        triggerFields: ["password"],
      },
      fieldName: "password_confirmation",
      label: $t("authentication.confirmPassword"),
    },
  ];
});

const [Form, formApi] = useVbenForm(
  reactive({
    commonConfig: {
      hideLabel: true,
      hideRequiredMark: true,
    },
    schema: formSchema,
    showDefaultActions: false,
  })
);
const emit = defineEmits(["submit"]);
const verify = async () => {
  const { valid } = await formApi.validate();
  const values = await formApi.getValues();
  if (valid) {
    emit("submit", values);
  }
};
</script>
<template>
  <div>
    <Form />
    <Button variant="blue" @click="verify()">Ganti Password</Button>
  </div>
</template>
