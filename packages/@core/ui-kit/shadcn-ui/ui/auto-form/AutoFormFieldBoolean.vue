<script setup lang="ts">
import type { FieldProps } from './interface'
import { Checkbox } from '~/packages/@core/ui-kit/shadcn-ui/ui/checkbox'
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '~/packages/@core/ui-kit/shadcn-ui/ui/form'
import { Switch } from '~/packages/@core/ui-kit/shadcn-ui/ui/switch'
import { computed } from 'vue'
import AutoFormLabel from './AutoFormLabel.vue'
import { beautifyObjectName, maybeBooleanishToBoolean } from './utils'

const props = defineProps<FieldProps>()

const booleanComponent = computed(() => props.config?.component === 'switch' ? Switch : Checkbox)
</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem>
      <div class="space-y-0 mb-3 flex items-center gap-3">
        <FormControl>
          <slot v-bind="slotProps">
            <component
              :is="booleanComponent"
              v-bind="{ ...slotProps.componentField }"
              :disabled="maybeBooleanishToBoolean(config?.inputProps?.disabled) ?? disabled"
              :checked="slotProps.componentField.modelValue"
              @update:checked="slotProps.componentField['onUpdate:modelValue']"
            />
          </slot>
        </FormControl>
        <AutoFormLabel v-if="!config?.hideLabel" :required="required">
          {{ config?.label || beautifyObjectName(label ?? fieldName) }}
        </AutoFormLabel>
      </div>

      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
