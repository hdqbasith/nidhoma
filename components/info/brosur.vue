<script setup lang="ts">
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/packages/@core/ui-kit/shadcn-ui';

</script>
<template>

  <Card class="m-6">
    <CardHeader>
      <CardTitle>
        Brosur PPDB
      </CardTitle>
      <CardDescription>
        Klik gambar berikut untuk memperbesar
      </CardDescription>
      <CardContent class="grid grid-rows-2 gap-y-3">
        <a href="https://ma.madrasahtbs.sch.id/wp-content/uploads/2025/01/brosur-belakang-scaled.jpg" target="_blank">
          <img src="https://ma.madrasahtbs.sch.id/wp-content/uploads/2025/01/brosur-depan-scaled.jpg">
        </a>
        <a href="https://ma.madrasahtbs.sch.id/wp-content/uploads/2025/01/brosur-belakang-scaled.jpg" target="_blank">
          <img src="https://ma.madrasahtbs.sch.id/wp-content/uploads/2025/01/brosur-belakang-scaled.jpg">
        </a>
      </CardContent>
    </CardHeader>
  </Card>
</template>