<template>
  <div :class="isFocused ? 'border-primary-slate' : 'border-gray-neutral-200'" class="flex items-center gap-4 h-24 bg-white rounded-[8px] border-2 max-[640px]:h-16">
    <BaseInput
        v-model="amount"
        type="text"
        placeholder="Add the amount"
        maxLength="16"
        @focus="isFocused = true"
        @blur="isFocused = false"
        custom-class="p-6 flex-1 text-gray-neutral-750 text-[32px] placeholder:text-base placeholder:leading-[32px] max-[640px]:p-2 max-[640px]:text-lg"
        :sanitize="val => val.replace(REGEX_ONLY_NUMBERS, '')"
        @update:modelValue="val => currencyStore.changeAmount(val)"
    />
    <CurrencySelector :selected="selectedCurrency" />
  </div>
</template>

<script setup lang="ts">
import BaseInput from '../atoms/BaseInput.vue';
import CurrencySelector from '../molecules/CurrencySelector.vue';
import {useCurrencyStore} from "../../stores/currencyStore.ts";
import {storeToRefs} from "pinia";
import {REGEX_ONLY_NUMBERS} from "../../utils/constants.ts";
import {ref} from "vue";

const currencyStore = useCurrencyStore();
const { selectedCurrency, amount } = storeToRefs(currencyStore);

const isFocused = ref(false);
</script>
