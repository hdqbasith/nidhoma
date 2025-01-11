<script lang="ts" setup>
import { toast } from 'vue-sonner';

const props = defineProps(["modelValue", "entity", "accept", "maxSize"]);
const emit = defineEmits(["update:modelValue"]);

const { $storage } = useNuxtApp();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const inputRef = ref();
const loading = ref(false);

const onSelect = async (e: any) => {
  const file = e.target.files[0];
  e.target.value = null;

  if (file.size > props.maxSize * 1024 * 1024) {
    return toast({
      title: "File is too large."
    });
  }

  loading.value = true;

  const formData = new FormData();
  formData.append("image", file);

  await $fetch<any>("upload", {
    method: "POST",
    body: formData,
    params: {
      entity: props.entity,
      width: 300,
      height: 300,
    },
    ignoreResponseError: true,
    onResponse({ response }) {
      if (response.status !== 200) {
        toast({
          title: response._data?.message ?? response.statusText ?? 'Something went wrong',
        });
      } else if (response._data?.ok) {
        value.value = response._data?.path;
      }

      loading.value = false;
    },
  });
};
</script>

<template>
  <div class="flex gap-6">
    <div class="relative flex">
      <input ref="inputRef" type="file" class="hidden" :accept="accept" @change="onSelect" />
    </div>
    <div class="text-sm opacity-80">
      <div>Max upload size: {{ maxSize }}Mb</div>
      <div>Accepted formats: {{ accept }}</div>
    </div>
  </div>
</template>
