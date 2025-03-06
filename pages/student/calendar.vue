<script setup lang="ts">
import type { Config } from '~/components/calendar/types';

const config=ref<Config>({
  formatDays:"long"
});
</script>
<template>
  <div>
    <CalendarHeader :config="config"/>
    <CalendarContent/>
  </div>
</template>