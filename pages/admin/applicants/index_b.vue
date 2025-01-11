<script lang="ts" setup>
import { Settings } from 'lucide-vue-next';

definePageMeta({
  middleware: ["auth"],
});
// type Link = {
//   url: null | string;
//   label: string;
//   active: boolean;
// }
type Melanjutkan = {
  current_page: number;
  data: StudentPersonal[];
  per_page: number;
  last_page: number;
  from: number;
  to: number;
  first_page_url: string;
  next_page_url: string;
  prev_page_url: string;
  total: number;
}

const data = ref<Melanjutkan>()
const uri = ref('')
const query = ref<string | null>('')
const { refresh, pending } = useFetch(
  () => 'admin/' + uri.value + query.value,
  {
    method: "get",
    immediate: false,
    watch: false,
    lazy: true,
    async onResponse({ response }) {
      if (response.status === 200) {
        if (uri.value == 'list-melanjutkan') data.value = response._data.melanjutkan

      }
    }
  })
const getList = (a: string, b?: string | null) => {
  alert(a)
  uri.value = a
  query.value = b ?? ''
  refresh()
}
onMounted(() => {
  getList('list-melanjutkan')
})

const accordionItems = [
  { value: 'item-1', title: 'Is it accessible?', content: 'Yes. It adheres to the WAI-ARIA design pattern.' },
  { value: 'item-2', title: 'Is it unstyled?', content: 'Yes. It\'s unstyled by default, giving you freedom over the look and feel.' },
  { value: 'item-3', title: 'Can it be animated?', content: 'Yes! You can use the transition prop to configure the animation.' },
]
const defaultValue = 'item-1'
type tom = {
  label: string;
  action: string;
  show: boolean;
  variant: "link" | "default" | "blue" | "yellow" | "red" | "sky" | "outline" | "destructive" | "secondary" | "ghost" | "green" | "purple" | null | undefined
}
const tombol = ref<tom[]>([
  {
    label: 'Edit',
    action: 'edit',
    show: true,
    variant: 'blue'
  },
  {
    label: 'bayar',
    action: 'bayar',
    show: true,
    variant: 'yellow'
  },
  {
    label: 'Hapus',
    action: 'delete',
    show: true,
    variant: 'red'
  },
  {
    label: 'Detail',
    action: 'detail',
    show: true,
    variant: 'sky'
  }
])
</script>
<template>
  <Card class="m-10">
    <Dialog>
      <DialogTrigger as="div" class="absolute right-10">
        <Button variant="yellow" class="text-xs text-black">
          <Settings class="inline" /> Setting
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Pengaturan akan direset ketika meninggalkan halaman
          </DialogDescription>
        </DialogHeader>
        <Tabs default-value="tombol" class="w-full max-h-80 overflow-scroll">
          <TabsList class="grid w-full grid-cols-2">
            <TabsTrigger value="tombol">
              Tombol
            </TabsTrigger>
            <TabsTrigger value="Kolom">
              Kolom
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tombol" class="space-y-2">
            <div class="flex items-center space-x-2" v-for="(t, i) in tombol">
              <Switch :id="t.action" :checked="t.show" @update:checked="tombol[i].show = !tombol[i].show"
                class="!bg-blue-100" />
              <Label :for="t.action">{{ t.label }}</Label>
            </div>
          </TabsContent>
          <TabsContent value="Kolom">
            <Card>
              <CardHeader>
                <CardTitle>Kolom</CardTitle>
                <CardDescription>
                  Change your Kolom here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent class="space-y-2">
                <div class="space-y-1">
                  <Label for="current">Current Kolom</Label>
                  <Input id="current" type="Kolom" />
                </div>
                <div class="space-y-1">
                  <Label for="new">New Kolom</Label>
                  <Input id="new" type="Kolom" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Kolom</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <DialogClose as-child>
            <Button variant="blue">OK</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- {{ data }} -->
    <CardHeader variant="green">
      <CardTitle class="text-white">Pendaftar dari MTs TBS</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <div class="flex items-center gap-1.5 max-w-xs mb-5">
          <Input @keyup.enter="" placeholder="Cari" name="as_npsn" @update:model-value="" />
        </div>
        <TableCaption class="text-red-500">terakhir diperbarui: 3 Juni 2024</TableCaption>
        <TableHeader class="text-blue-300 font-bold">
          <TableRow>
            <TableHead class="w-fit"> No. </TableHead>
            <TableHead class="w-fit">NISN</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(k, l) in data?.data" v-show="!pending">
            <TableCell>{{ l + (data?.from ?? 0) }}</TableCell>
            <TableCell>{{ k.s_nisn }}</TableCell>
            <TableCell>{{ k.s_nama_lengkap }}</TableCell>
            <TableCell>{{ k.as_kelas_mts }}</TableCell>
            <TableCell>
              <Badge>Sudah bayar</Badge>
            </TableCell>
            <TableCell>
              <Button class="text-xs" v-for="t in tombol" :key="t.action" v-show="t.show"
                :variant="t.variant ?? 'default'" @click="getList('manage-applicant/' + t.action+'/' + k.s_akun)">{{
                  t.label }}</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div class="justify-end space-x-2 text-right text-xs">
        <span>Halaman {{ data?.current_page }} dari {{ data?.last_page }}</span>
        <Button @click="getList('list-melanjutkan', data?.prev_page_url)"
          v-show="data?.prev_page_url != null ? true : false">Prev</Button>
        <Button @click="getList('list-melanjutkan', data?.next_page_url)"
          v-show="data?.next_page_url != null ? true : false">Next</Button>
      </div>
    </CardContent>
    <CardFooter>
    </CardFooter>
  </Card>

</template>
