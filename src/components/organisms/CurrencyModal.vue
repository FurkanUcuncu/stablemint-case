<template>
  <div 
      @click="closeModal"
      v-if="isOpen"
      class="fixed inset-0 flex items-center justify-center bg-black/40"
  >
    <div @click.stop class="bg-white px-4 pt-6 pb-4 rounded-xl shadow-xl w-[400px] max-[640px]:w-11/12">
      <div class="flex justify-between items-center mb-4">
        <h2 class="font-semibold text-lg max-[640px]:text-base">Select Currency</h2>
        <BaseClose
            @click="closeModal"
            width="11.67"
            height="11.67"
            :color="COLORS.gray_neutral_600"
        />
      </div>
      <div 
          @click="handleCurrencyChange(option)" 
          v-for="option in currencyOptions" 
          :key="option.label" 
          class="flex items-center justify-between gap-4 p-4 hover:bg-gray-neutral-100 rounded-lg cursor-pointer max-[640px]:gap-2 max-[640px]:p-2" 
          :class="option.label === selectedCurrency.label ? 'bg-gray-neutral-100' : ''"
      >
        <CurrencyBadge
            imgClass="w-10 h-10 max-[640px]:w-7"
            labelClass="text-primary-slate max-[640px]:text-sm"
            :icon="option.icon"
            :label="option.label"
        />
        <span class="text-gray-500 text-xs">{{ option.desc }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CurrencyBadge from '../atoms/CurrencyBadge.vue';
import {useModal} from "../../composables/useModal.ts";
import {useCurrencyStore} from "../../stores/currencyStore.ts";
import {storeToRefs} from "pinia";
import type {ICurrency} from "../../types/currency.types.ts";
import BaseClose from "../atoms/BaseClose.vue";
import {COLORS, currencyOptions} from "../../utils/constants.ts";

const { isOpen, closeModal } = useModal('currency');

const currencyStore = useCurrencyStore();
const { selectedCurrency } = storeToRefs(currencyStore);

const handleCurrencyChange = async (option: ICurrency) => {
  currencyStore.setSelectedCurrency(option);
  
  if (option.label === 'USD') {
    currencyStore.setUsdToSelectedRate(1);
  }
  
  closeModal();
}
</script>