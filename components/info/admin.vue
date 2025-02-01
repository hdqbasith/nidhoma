<script setup lang="ts">
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/packages/@core/ui-kit/shadcn-ui';
import WaCs from './wa-cs.vue';

</script>
<template>

    <Card class="m-6">
        <CardHeader>
            <CardTitle>
                Admin dan Customer Service (CS) PPDB
            </CardTitle>
            <CardDescription>
                Anda memiliki pertanyaan? Silakan klik tombol WhatsApp di bawah ini untuk menghubungi Bapak Ufiq
            </CardDescription>
            <CardContent class="grid grid-rows-2 gap-y-3">
              <WaCs></WaCs>
            </CardContent>
        </CardHeader>
    </Card>
</template>