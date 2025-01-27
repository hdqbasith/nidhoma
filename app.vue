<script setup lang="ts">
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Toaster } from 'vue-sonner';
import { setupI18n } from './locales';
import { defineOverridesPreferences, initPreferences, preferences, updatePreferences } from './packages/preferences';
import { loadLocaleMessages } from './packages/locales';


dayjs.extend(customParseFormat);
const app = useNuxtApp().vueApp;
console.log(preferences.app.locale);
await setupI18n(app,{defaultLocale:preferences.app.locale});
const namespace = 'nidhoma';
await initPreferences({
  namespace,
  overrides: defineOverridesPreferences({
    app: {
      name: 'Nidhoma',
      accessMode:'backend',
      locale:preferences.app.locale
    },
    breadcrumb:{
      showHome:true,
      styleType:'background'
    },
    copyright:{
      companyName:'HDQ Basith Studio',
      companySiteLink:'https://hdqbasith.blogspot.com',
      date:'2025',
    },
    theme:{
      mode:'dark'
    }
  }),
});
await loadLocaleMessages(preferences.app.locale);
</script>
<template>

  <NuxtLayout name="blank">
  <div>
    <NuxtPage/>
  </div>
  </NuxtLayout>
  <NuxtLoadingIndicator class="!opacity-100" :throttle="0" />
  <Toaster richColors :expand="true" closeButton position="top-right" />
</template>