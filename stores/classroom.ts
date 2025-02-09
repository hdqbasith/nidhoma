import { defineStore } from 'pinia'

export const useClassroomStore = defineStore('classroom', () => {
  const data = ref<classroom[]>();
  const values = ref<classroom>();

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
  const client = useSanctumClient();
  const refresh = async() => await client<classroom>(
    'admin/classroom/list',
    {
      method: 'get',
      onResponse({ response }) {
        if (response.status === 200) {
          data.value = response._data
        }
      },
    });
  const addClassroom = () => client(
    'admin/classroom/new-single',
    {
      method: 'post',
      body: values.value,
      onResponse({ response }) {
        if (response.status === 201) {
          refresh();
        }
      }
    }
  )
  const editClassroom = () => client(
    'admin/classroom/edit',
    {
      method: 'post',
      body: values.value,
      onResponse({ response }) {
        console.log(values.value);
        console.log(response);
        
        if (response.status === 200) {
          refresh();
        }
        showModalEdit.value = false;
      }
    }
  )
  const deleteClassroom = () => client(
    'admin/classroom/delete',
    {
      method: 'post',
      body: values.value,
      onResponse({ response }) {
        if (response.status === 200) {
          refresh();
          showModalHapus.value = false;
        }
      }
    }
  )
  const importClassroom = () => client(
    'admin/classroom/import',
    {
      method: 'post',
      body: values.value,
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
