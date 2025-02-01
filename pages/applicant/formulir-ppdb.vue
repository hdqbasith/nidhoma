<script lang="ts" setup>
import { LucideBuilding, LucideHome, LucideUserCircle, LucideUserRoundCog, LucideUsers, LucideUserSquare2 } from 'lucide-vue-next';
import { Badge, Card } from '~/packages/@core/ui-kit/shadcn-ui';
import { Stepper, StepperDescription, StepperIndicator, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '~/packages/@core/ui-kit/shadcn-ui/ui/stepper';


definePageMeta({
  title: "Formulir PPDB",
  name: "formulir-ppdb",
})

const applicant = (useRoute().query.akun?? '') as string;
const studentStore = useStudentBiodataStore();
if (applicant) {
  studentStore.studentId = applicant;
}
const steps = [{
  step: 1,
  title: 'Personal',
  description: 'Data Pribadi',
  icon: LucideUserCircle,
}, {
  step: 2,
  title: 'Ayah',
  description: 'Data Ayah Kandung',
  icon: LucideUsers,
}, {
  step: 3,
  title: 'Ibu',
  description: 'Data Ibu Kandung',
  icon: LucideUserSquare2,
}, {
  step: 4,
  title: 'Wali',
  description: 'Data Wali (Yang membiayai pendidikan)',
  icon: LucideUserRoundCog,
}, {
  step: 5,
  title: 'Domisili',
  description: 'Data Tempat Tinggal',
  icon: LucideHome,
}, {
  step: 6,
  title: 'Asal Sekolah',
  description: 'Data Riwayat Pendidikan',
  icon: LucideBuilding,
}]
const biodata=useStudentBiodataStore();
</script>
<template>
  <Card class="m-6">
    <Stepper class="overflow-x-scroll flex items-start" :model-value="biodata.stepIndex" :linear="false">
      <StepperItem v-for="item in steps" :key="item.step" class="basis-1/4 flex items-start" :step="item.step">
        <StepperTrigger @click="biodata.stepIndex=item.step">
          <StepperIndicator>
            <component :is="item.icon" class="w-4 h-4" />
          </StepperIndicator>
          <div class="flex flex-col">
            <StepperTitle class="text-[10px]">
              {{ item.step+" "+item.title }}
            </StepperTitle>
            <!-- <StepperDescription class="text-[9px]"> -->
              <!-- {{ item.description }} -->
            <!-- </StepperDescription> -->
          </div>
        </StepperTrigger>
        <StepperSeparator v-if="item.step !== steps[steps.length - 1].step" class="w-full h-px mt-7" />
      </StepperItem>
    </Stepper>

    <FormulirPribadi v-if="biodata.stepIndex==1"></FormulirPribadi>
    <FormulirAyah v-else-if="biodata.stepIndex==2"></FormulirAyah>
    <FormulirIbu v-else-if="biodata.stepIndex==3"></FormulirIbu>
    <FormulirWali v-else-if="biodata.stepIndex==4"></FormulirWali>
    <FormulirDomisili v-else-if="biodata.stepIndex==5"></FormulirDomisili>
    <FormulirAsalSekolah v-else-if="biodata.stepIndex==6"></FormulirAsalSekolah>
  </Card>
</template>
