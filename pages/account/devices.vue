<script lang="ts" setup>
const dayjs = useDayjs();
const auth = useAuthStore();
const loading = ref(false);
const devices = ref([]);

async function fetchData() {
  loading.value = true;

  const response = await $fetch<any>("devices");

  if (response.ok) {
    devices.value = response.devices;
  }

  loading.value = false;
};

const columns = [
  {
    key: "name",
    label: "Device",
  },
  {
    key: "last_used_at",
    label: "Last used at",
    class: "max-w-[9rem] w-[9rem] min-w-[9rem]",
  },
  {
    key: "actions",
  },
];

const items = (row: any) => [
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: async () => {
        await $fetch<any>("devices/disconnect", {
          method: "POST",
          body: {
            hash: row.hash,
          },
          async onResponse({ response }) {
            if (response._data?.ok) {
              await fetchData();
              await auth.fetchUser();
            }
          }
        });
      },
    },
  ],
];

if (process.client) {
  fetchData();
}
</script>
<template>
  <Card>
    <ClientOnly>
      {{ devices }}
    </ClientOnly>
  </Card>
</template>
