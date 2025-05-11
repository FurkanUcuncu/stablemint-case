<template>
  <button
      @click="click"
      :style="customStyles"
      class="w-full h-14 rounded-full text-[18px] 
      cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed max-[640px]:text-sm max-[640px]:h-10"
      :disabled="disabled"
      :class="customClass"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import type {IBaseButtonProps} from "../../types/props.types.ts";

const {customClass = 'bg-primary-slate-light text-primary-acid-yellow'} = defineProps<IBaseButtonProps>()
</script>