<script setup lang="ts">
import { toast } from 'vue-sonner';
import { useUserStore } from '~/packages/stores';
import type { Recordable } from '~/packages/types';

definePageMeta({
    hideInTab:true,
})

const token=ref();
const client = useSanctumClient();
client("/auth/reset-token", {
  method: "get",
  onResponse({ response }) {
    if (response._data) {
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
      useRouter().go(-1);
    }
  })
}
</script>
<template>
  <div>
    <AuthChangePassword @submit="submit"/>
  </div>
</template>