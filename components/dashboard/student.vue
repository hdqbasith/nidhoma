<script lang="ts" setup>
import { AlignJustify } from "lucide-vue-next";
import { toast } from "vue-sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/packages/@core/ui-kit/shadcn-ui";
import { useAccessStore, useUserStore } from "~/packages/stores";
import type { Recordable } from "~/packages/types";

const changePassword = ref(false);
const token=ref();
const client = useSanctumClient();
client("/auth/cek-password", {
  method: "get",
  onResponse({ response }) {
    if (response._data) {
      changePassword.value=true
      token.value = response._data;
    }
  },
});
const submit=(val:  Recordable<any>)=>{
  client("auth/reset-password",{
    method:"post",
    body:{
      ...val,
      token:token.value,
      email:useUserStore().userInfo?.username
    },
    onResponse({response}){
      toast.success("Password sudah diganti");
      changePassword.value=false
    }
  })
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Selamat Datang di Nidhoma</CardTitle>
      <CardDescription>Pusat Data MA NU TBS Kudus</CardDescription>
    </CardHeader>
    <CardContent>
      <div v-if="changePassword">
        <p class="my-3">
          Mohon ganti password Anda terlebih dahulu untuk mengamankan akun Anda.
          Gunakanlah kombinasi angka, huruf, dan simbol yang terdiri dari
          minimal 8 karakter
        </p>
        <AuthChangePassword class="max-w-72" @submit="submit"/>
      </div>
      <div v-else>
        Silakan klik ikon <AlignJustify class="inline" /> di pojok kiri atas
        untuk mengakses menu yang tersedia
      </div>
    </CardContent>
    <CardFooter> </CardFooter>
  </Card>
</template>
