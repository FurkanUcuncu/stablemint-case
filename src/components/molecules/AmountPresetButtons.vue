<template>
  <div class="flex gap-4 justify-center mt-6 mx-auto flex-wrap max-[640px]:gap-3">
    <button
        v-for="preset in labels"
        :key="preset"
        :class="customClass"
        :style="customStyles"
        class="px-8 py-2 rounded-full text-custom-md font-semibold cursor-pointer max-[640px]:px-4 max-[640px]:py-1 max-[640px]:text-sm"
        @click="$emit('select', preset)"
    >
      {{ getCurrency(preset) }}
    </button>
  </div>
</template>

<script setup lang="ts">
import {useCurrencyStore} from "../../stores/currencyStore.ts";
import {storeToRefs} from "pinia";
import {currencyFormatter} from "../../utils/currencyFormatter.ts";
import type {IAmountPresetButtonsProps} from "../../types/props.types.ts";
import {amountLabels} from "../../utils/constants.ts";

const {labels = amountLabels, customClass = 'text-gray-neutral-600 bg-gray-neutral-300'} = defineProps<IAmountPresetButtonsProps>();

const currencyStore = useCurrencyStore();
const {selectedCurrency} = storeToRefs(currencyStore);

const getCurrency = (preset: number) => {
  return currencyFormatter(preset, selectedCurrency.value.label);
}

</script>