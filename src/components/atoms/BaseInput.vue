<template>
  <input
      :type="type"
      class="w-full h-full text-2xl outline-none"
      :class="customClass"
      :value="modelValue"
      @input="onInput"
      v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import type {IBaseInputProps} from "../../types/props.types.ts";

const props = defineProps<IBaseInputProps>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>();

const onInput = (e: Event) => {
  const input = e.target as HTMLInputElement;
  let value = input.value;

  if (props.sanitize) {
    const sanitized = props.sanitize(value);

    if (sanitized !== value) {
      input.value = sanitized;
    }

    value = sanitized;
  }

  emit('update:modelValue', value);
};
</script>