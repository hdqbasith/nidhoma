<script setup lang="ts">
definePageMeta({
    // title:"Applicant",
    // name:"Applicant",
    middleware: "sanctum:verified"
})

// import { useQuery } from '@tanstack/vue-query'

// const fetcher = async () =>
//     await fetch('https://jsonplaceholder.typicode.com/posts').then((response) =>
//         response.json(),
//     )

// const { data, suspense } = useQuery({ queryKey: ['test'], queryFn: fetcher })

// await suspense()
</script>
<template>
    <NuxtLayout>
        <NuxtPage></NuxtPage>
    </NuxtLayout>
</template>