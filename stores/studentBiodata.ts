import { defineStore } from 'pinia'

export const useStudentBiodataStore = defineStore('studentBiodata', () => {
  const studentId = ref()
  const dataPersonal = ref<StudentPersonal>();
  const dataAyah = ref(<StudentFather>{});
  const dataIbu = ref(<StudentMother>{});
  const dataWali = ref(<StudentGuardian>{});
  const dataDomisili = ref(<StudentDomicile>{});
  const { refresh: fetchBiodata } = useFetch<StudentBiodata>(
    () => 'applicant/biodata' + (studentId.value ? '/' + studentId.value : ''),
    {
      immediate: false,
      onResponse({ response }) {
        if (response.status === 200) {
          dataPersonal.value = response._data.dataPersonal;
          dataAyah.value = response._data.dataAyah;
          dataIbu.value = response._data.dataIbu;
          dataWali.value = response._data.dataWali;
          dataDomisili.value = response._data.dataDomisili;
        }
              },
    });
  return { studentId, dataPersonal, dataAyah, dataIbu, dataWali, dataDomisili, fetchBiodata };
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStudentBiodataStore, import.meta.hot))
}
