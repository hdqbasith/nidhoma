import { isClient } from '@vueuse/core';
import { defineStore } from 'pinia'
import { toast } from 'vue-sonner';

export const useSettingsStore = defineStore('settings', () => {
    const floatInput = ref()
    floatInput.value = 'normal';
    const toggleFloatInput = () => {
        if (floatInput.value == 'normal') floatInput.value = 'outline';
        else if (floatInput.value == 'outline') floatInput.value = 'float';
        else floatInput.value = 'normal';
        toast.success('Tema formulir diganti menjadi ' + floatInput.value, {
            duration: 1000
        });
    }
    return { floatInput, toggleFloatInput }
}, {
    persist: {
        storage: isClient ? localStorage : undefined
    }
})