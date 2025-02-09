import { defineStore } from 'pinia'
import type { Meta } from '~/types/meta';

export const useMetaStore = defineStore('meta', () => {
  const client = useSanctumClient();
  const data = ref<Meta>();
  const refresh = () => client<Meta>(
    '/setting/meta',
    {
      method: 'get',
      onResponse({ response }) {
        if (response.status === 200) {
          data.value = response._data;
        }
      },
    });
  refresh();
  return { refresh, data };
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMetaStore, import.meta.hot))
}
