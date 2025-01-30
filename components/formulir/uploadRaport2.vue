<script setup lang="ts">
import imageCompression from 'browser-image-compression';
import { LoaderCircle } from 'lucide-vue-next';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/packages/@core/ui-kit/shadcn-ui';
import VuePdfEmbed, {useVuePdfEmbed} from 'vue-pdf-embed'
import { toast } from 'vue-sonner';

const { doc } = useVuePdfEmbed({ source: '<PDF_SOURCE>' })

</script>
<template>
    <!-- <VuePdfEmbed :source="doc" @loaded="cek" :page="1" ref="tes" class="hidden" /> -->
</template>