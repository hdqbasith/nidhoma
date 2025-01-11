<script setup lang='ts'>
import { Icon } from '@iconify/vue/dist/iconify.js';
import { useMediaQuery } from '@vueuse/core';
import { PackagePlus, Plus, PlusCircle } from 'lucide-vue-next';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/packages/@core/ui-kit/shadcn-ui';

const isDesktop = useMediaQuery('(min-width: 768px)');
const isOpen = ref(false);
const crStore = useClassroomStore();
const props=defineProps<{
	item:DotThree[]
}>();
const emit=defineEmits(['action']);
</script>
<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child class="bg-transparent rounded-full w-fit right-1 absolute top-1">
			<Button variant="secondary">
				<Icon icon="mdi:dots-horizontal" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent class="w-56 bg-green-100 dark:bg-green-800">

			<DropdownMenuItem v-for="i in item" @click="emit('action',i.action)">
				<Icon :icon="i.icon" class="mr-2 h-4 w-4" />
				<span>{{ i.text }}</span>
			</DropdownMenuItem>
			<!-- <DropdownMenuItem>
				<PlusCircle class="mr-2 h-4 w-4" />
				<span>Tambah 1 kelas</span>
			</DropdownMenuItem>
			<DropdownMenuItem>
				<Dialog v-if="isDesktop" v-model:open="isOpen">
					<DialogTrigger as-child>
						<PackagePlus class="mr-2 h-4 w-4" />
						<span>
							Tambah banyak kelas
						</span>
					</DialogTrigger>
					<DialogContent class="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Tambah banyak kelas</DialogTitle>
							<DialogDescription>
								pilih jumlah yang mau ditambahkan
							</DialogDescription>
						</DialogHeader>
						<FormInputText></FormInputText>
					</DialogContent>
				</Dialog>
				<Drawer v-else v-model:open="isOpen">
					<DrawerTrigger as-child>
						<PackagePlus class="mr-2 h-4 w-4" />
						<span>
							Tambah banyak kelas
						</span>
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader class="text-left">
							<DrawerTitle>Tambah banyak kelas</DrawerTitle>
							<DrawerDescription>
								pilih jumlah yang mau ditambahkan
							</DrawerDescription>
						</DrawerHeader>
						<FormInputText></FormInputText>
						<DrawerFooter class="pt-2">
							<DrawerClose as-child>
								<Button variant="outline">
									Cancel
								</Button>
							</DrawerClose>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</DropdownMenuItem>
			<DropdownMenuItem>
				<Icon icon="mdi:clock-arrow" class="mr-2 h-4 w-4" />
				<span>Impor dari tahun lalu</span>
			</DropdownMenuItem>
			<DropdownMenuItem>
				<Icon icon="mdi:import" class="mr-2 h-4 w-4" />
				<span>Impor dari excel ...</span>
			</DropdownMenuItem>
			<DropdownMenuItem>
				<Icon icon="mdi:export" class="mr-2 h-4 w-4" />
				<span>Ekspor ke excel ...</span>
			</DropdownMenuItem> -->
		</DropdownMenuContent>
	</DropdownMenu>
</template>