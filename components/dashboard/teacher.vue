<script lang="ts" setup>
import { AlignJustify } from 'lucide-vue-next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/packages/@core/ui-kit/shadcn-ui';

</script>

<template>
  <Card class="m-2">
    <CardHeader>
      <CardTitle>Selamat Datang di Nidhoma</CardTitle>
      <CardDescription>Pusat Data MA NU TBS Kudus</CardDescription>
    </CardHeader>
    <CardContent> 
      Silakan klik ikon <AlignJustify class="inline"/> di pojok kiri atas untuk mengakses menu yang tersedia
    </CardContent>
    <CardFooter>
      
    </CardFooter>
  </Card>
</template>
