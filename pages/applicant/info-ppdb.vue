<script lang="ts" setup>
import { Badge, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/packages/@core/ui-kit/shadcn-ui';


definePageMeta({
  title: "Info PPDB",
  name: "info-ppdb",
})

</script>
<template>
  <Card class="m-6">
    <CardHeader>
      <CardTitle>
        Info PPDB
      </CardTitle>
      <CardDescription>
        Info PPDB akan terus dperbarui. Silakan cek halaman ini secara berkala.
      </CardDescription>
      <CardContent class="md:grid md:grid-cols-2">
        <InfoBrosur ></InfoBrosur>
        <infoAdmin ></infoAdmin>
      </CardContent>
      <CardFooter class="italic text-xs">
        Halaman ini diperbarui terakhir pada tanggal 30 Januari 2025
      </CardFooter>
    </CardHeader>
  </Card>
</template>
