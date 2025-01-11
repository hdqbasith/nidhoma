<script setup lang="ts">

import { cn } from '@/lib/utils';
import { useVModel } from '@vueuse/core';
import type { HTMLAttributes } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input } from '~/packages/@core/ui-kit/shadcn-ui';

const props = defineProps<{
    defaultValue?: string | number
    modelValue?: string | number | Date | null
    class?: HTMLAttributes['class']
    name?: string,
    label?: string,
    variant?: 'normal' | 'float' | 'outline'
}>()

const emits = defineEmits<{ (e: 'update:modelValue', payload: string | number): void }>()

const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
})

const autoLabel = <Record<string, string>>{
    s_tanggal_lahir: 'Tanggal Lahir',
    ak_tgllahir: 'Tanggal Lahir ',
    ik_tgllahir: 'Tanggal Lahir ',
    wali_tgllahir: 'Tanggal Lahir '
}
</script>
<template>
    <FormField v-slot="{ componentField }" :name="name ?? 'input'">
        <FormItem class="relative">
            <FormLabel v-if="!variant || variant == 'normal'">{{ autoLabel[name?? 'Kasih name input'] }}</FormLabel>
            <FormControl>
                <VueDatePicker v-bind="componentField" auto-apply format="dd/MM/yyyy" :text-input="true"
                    input-class-name="peer" :enable-time-picker="false" model-type="yyyy-MM-dd">
                    <template #dp-input="{ value }">
                        <Input type="text" :value="value" :variant="variant" class="peer" placeholder="" />
                        <FormLabel v-if="variant == 'float' || variant == 'outline'"
                            class="absolute bg-card p-1 ms-1 duration-300 transform -translate-y-6 scale-90 top-3 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-90 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                            {{ autoLabel[name?? 'Kasih name input'] }}</FormLabel>
                    </template>
                </VueDatePicker>
                <!-- <VueDatePicker :model-value="form.values.s_tanggal_lahir" @update:model-value="setTglLahir" auto-apply
                    format="dd/MM/yyyy" :text-input="true" input-class-name="" :enable-time-picker="false" />
                 -->
                <!-- <Input v-if="!variant || variant == 'normal'"  />
                <Input v-bind="componentField" :variant="variant" class="peer" placeholder="" /> -->
            </FormControl>
            <FormDescription class="text-xs ms-2">
            </FormDescription>
            <FormMessage />
        </FormItem>
    </FormField>
</template>
<style>
.dp__main {
    font-family: 'Poppins', sans-serif;
}
</style>