<template>
  <ul class="mt-4 p-4 text-sm bg-white space-y-2.5 rounded-lg">
    <li 
        v-for="(note, index) in notes"
        :key="index"
        class="flex items-center gap-2 text-gray-neutral-600 text-xs"
    >
      <img :src="CheckIcon" alt="check-icon">
      {{ note }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import CheckIcon from '../../assets/check.svg';
import type {IFooterNotesProps} from "../../types/props.types.ts";

defineProps<IFooterNotesProps>()
</script>