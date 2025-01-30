import { defineStore } from 'pinia'
import { toast } from 'vue-sonner';
import { useSanctumError } from '~/lib/useSanctumError';
import type { StudentAsalSekolah, StudentBiodata, StudentDomicile, StudentFather, StudentGuardian, StudentMother, StudentPersonal } from '~/types/user/biodataSiswa';

export const useStudentBiodataStore = defineStore('studentBiodata', () => {
  const studentId = ref();
  const stepIndex=ref(1);
  const dataPersonal = ref<StudentPersonal>();
  const dataAyah = ref(<StudentFather>{});
  const dataIbu = ref(<StudentMother>{});
  const dataWali = ref(<StudentGuardian>{});
  const dataDomisili = ref(<StudentDomicile>{});
  const dataAsalSekolah = ref(<StudentAsalSekolah>{});
  const client = useSanctumClient();
  const fetchBiodata = () => client<StudentBiodata>('/applicant/biodata', {
    method: 'GET',
    onResponse({ response }) {
      if (response.status === 200) {
        dataPersonal.value = response._data.dataPersonal;
        dataAyah.value = response._data.dataAyah;
        dataIbu.value = response._data.dataIbu;
        dataWali.value = response._data.dataWali;
        dataDomisili.value = response._data.dataDomisili;
        dataAsalSekolah.value = response._data.dataPersonal;
        console.log(response._data);
        
      }
    }
  }).catch((error) => {
    const err = useSanctumError(error);
    toast(err.bag[0].message);
  });
  // const { refresh: fetchBiodata } = useFetch<StudentBiodata>(
  //   () => 'applicant/biodata' + (studentId.value ? '/' + studentId.value : ''),
  //   {
  //     immediate: false,
  //     onResponse({ response }) {
  //       if (response.status === 200) {
  //         dataPersonal.value = response._data.dataPersonal;
  //         dataAyah.value = response._data.dataAyah;
  //         dataIbu.value = response._data.dataIbu;
  //         dataWali.value = response._data.dataWali;
  //         dataDomisili.value = response._data.dataDomisili;
  //       }
  //     },
  //   });
  return { studentId, stepIndex, dataPersonal, dataAyah, dataIbu, dataWali, dataDomisili, dataAsalSekolah, fetchBiodata };
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStudentBiodataStore, import.meta.hot))
}
