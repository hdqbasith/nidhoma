import { defineStore } from 'pinia'
import type { Meta } from '~/types/meta';

export const useMetaStore = defineStore('meta', () => {
  const { refresh, data } = useFetch<Meta>(
    'meta',
    {
      immediate: true,
      method: 'get',
      onResponse({ response }) {
        if (response.status === 200) {
          data.value = response._data
        }
              },
    });
  return { refresh, data };
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMetaStore, import.meta.hot))
}
