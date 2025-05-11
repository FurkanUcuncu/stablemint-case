<template>
  <PaymentSummarySkeleton v-if="isFetching" />
  <p
      v-else-if="isError"
      class="mt-12 text-center text-red-400"
  >
    An error occurred. Please try again later!
  </p>
  <div
      v-else-if="selectedCurrency.label !== 'USD'"
      class="flex flex-col justify-between bg-secondary-tial-light-100 text-secondary-tial-light-800
      p-4 mt-12 h-[98px] rounded-lg font-base border border-secondary-tial-light-200 max-[640px]:mt-6
      max-[640px]:p-2 max-[640px]:h-auto"
  >
    <div class="flex flex-wrap gap-1">
      <div class="text-nowrap text-base max-[640px]:text-sm">You are paying </div>
      <div class="font-semibold text-lg max-[640px]:text-sm">
        {{ amount > 0 ? amount : '--' }} {{ selectedCurrency.label }} for {{ (amount > 0 ? (amount * usdToSelectedRate).toFixed(2) : '--') }} {{ baseCurrency }}
      </div>
    </div>
    <p 
        class="text-sm text-gray-neutral-600 max-[640px]:mt-2"
    >
      1 {{ selectedCurrency.label }} = {{ usdToSelectedRate }} {{ baseCurrency }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useCurrencyStore } from "../../stores/currencyStore.ts";
import { storeToRefs } from "pinia";
import {useExchangeRate} from "../../composables/useExcangeRate.ts";
import PaymentSummarySkeleton from "./PaymentSummarySkeleton.vue";
import type {IPaymentSummaryProps} from "../../types/props.types.ts";

const {apiKey} = defineProps<IPaymentSummaryProps>();

const currencyStore = useCurrencyStore();
const { selectedCurrency, usdToSelectedRate, baseCurrency } = storeToRefs(currencyStore);

const { isFetching, isError } = useExchangeRate(apiKey);

</script>