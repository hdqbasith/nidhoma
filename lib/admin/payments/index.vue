<script setup lang="ts">
definePageMeta({
  middleware: ["auth",'role-admin'],
});
</script>
<template>
    <div>
        <!-- <PaymentsTable /> -->
        <PaymentsForm />

    </div>
</template>