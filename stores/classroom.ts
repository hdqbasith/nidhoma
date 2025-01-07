import { defineStore } from 'pinia'

export const useClassroomStore = defineStore('classroom', () => {
  const data = ref<classroom[]>();
  const values = ref();

  const menu10 = <DotThree[]>[
    {
      icon: 'mdi:plus',
      text: 'Tambah 1 kelas',
      action: 'new10'
    }
  ]
  const menu11 = <DotThree[]>[
    {
      icon: 'mdi:plus',
      text: 'Tambah 1 kelas',
      action: 'new11'
    }
  ]
  const menu12 = <DotThree[]>[
    {
      icon: 'mdi:plus',
      text: 'Tambah 1 kelas',
      action: 'new12'
    }
  ]
  const menuPerKelas = <DotThree[]>[
    {
      icon: 'mdi:pencil',
      text: 'Edit',
      action: 'editKelas'
    },
    {
      icon: 'mdi:trash',
      text: 'Hapus',
      action: 'hapusKelas'
    },
    {
      icon: 'mdi:import',
      text: 'Import Siswa',
      action: 'importSiswa'
    },
    {
      icon: 'mdi:plus',
      text: 'Tambah Siswa',
      action: 'tambahSiswa'
    }
  ]
  const { refresh } = useFetch<classroom>(
    'admin/classroom/list',
    {
      method: 'get',
      immediate: false,
      watch: false,
      onResponse({ response }) {
        if (response.status === 200) {
          data.value = response._data
        }
      },
    });
  const { refresh: addClassroom } = useFetch(
    'admin/classroom/new-single',
    {
      method: 'post',
      body: values,
      immediate: false,
      watch: false,
      onResponse({ response }) {
        if (response.status === 201) {
          refresh();
        }
      }
    }
  )
  const { refresh: editClassroom } = useFetch(
    'admin/classroom/edit',
    {
      method: 'post',
      body: values,
      immediate: false,
      watch: false,
      onResponse({ response }) {
        if (response.status === 200) {
          refresh();
        }
        showModalEdit.value = false;
      }
    }
  )
  const { refresh: deleteClassroom } = useFetch(
    'admin/classroom/delete',
    {
      method: 'post',
      body: values,
      immediate: false,
      watch: false,
      onResponse({ response }) {
        if (response.status === 200) {
          refresh();
          showModalHapus.value = false;
        }
      }
    }
  )
  const { refresh: importClassroom } = useFetch(
    'admin/classroom/import',
    {
      method: 'post',
      body: values,
      immediate: false,
      watch: false,
      onResponse({ response }) {
        if (response.status === 200) {
          refresh();
          showModalImport.value = false;
        }
              }
    }
  )
  const showModalEdit = ref(false);
  const showModalHapus = ref(false);
  const showModalImport = ref(false);
  return { menu10, menu11, menu12, menuPerKelas, refresh, data, values, addClassroom, editClassroom, deleteClassroom, importClassroom, showModalEdit, showModalHapus, showModalImport };
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useClassroomStore, import.meta.hot))
}
