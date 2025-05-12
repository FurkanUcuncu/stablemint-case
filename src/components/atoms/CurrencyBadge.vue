<template>
  <div
      class="flex items-center gap-3 max-[640px]:gap-2"
  >
    <img
        :src="icon"
        alt="currency"
        :class="imgClass ?? 'w-7 h-7 max-[640px]:w-5'"
    />
    <span
        :class="labelClass ?? 'text-custom-md text-primary-stone max-[640px]:text-sm'"
    >
      {{ label }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type {ICurrencyBadgeProps} from "../../types/props.types.ts";

defineProps<ICurrencyBadgeProps>();
</script>
