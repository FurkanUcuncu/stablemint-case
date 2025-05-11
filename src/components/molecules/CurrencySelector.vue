<template>
  <div 
      class="flex items-center justify-between mr-6 px-2 py-1 cursor-pointer 
      bg-gray-neutral-800 rounded-[100px] w-[117px] h-10 max-[640px]:mr-2 max-[640px]:w-[96px]" 
      @click="openModal"
  >
    <CurrencyBadge :icon="selected.icon" :label="selected.label" />
    <img :src="ChevronDownIcon" alt="close-icon">
  </div>
</template>

<script setup lang="ts">
import CurrencyBadge from '../atoms/CurrencyBadge.vue';
import {useModal} from "../../composables/useModal.ts";
import ChevronDownIcon from '../../assets/chevronDown.svg';
import type {ICurrencySelectorProps} from "../../types/props.types.ts";

defineProps<ICurrencySelectorProps>();

const { openModal } = useModal('currency');
</script>