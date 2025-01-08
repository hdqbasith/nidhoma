<script setup lang="ts">
definePageMeta({
    middleware:'guard',
    title:"page.dashboard.title",
    name:"Formulir"
})
// const akun=useStudentBiodataStore()
// onMounted(() => {
//     toast.promise(akun.fetchBiodata, {
//         loading: 'Sedang mengambil data',
//         success: () => {
//             return `Data sudah dimuat`;
//         }
//     });
// })
</script>
<template>
        <NuxtPage/>
</template>