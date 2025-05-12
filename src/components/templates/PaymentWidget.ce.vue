<template>
  <div
      :style="customStyles?.layout"
      :class="customClass?.layout"
      class="w-dvw h-dvh bg-gray-neutral-100 relative"
  >
    <BaseClose
        @click="$emit('close')" 
        customClass="absolute right-9 top-9 max-[640px]:right-4 max-[640px]:top-4"
        :color="COLORS.gray_neutral_700"
    />
    <div class="max-w-[680px] m-auto py-9 flex flex-col h-full justify-between px-5">
      <div>
        <h1
            :style="customStyles?.title"
            :class="customClass?.title"
            class="text-custom-3xl font-custom mb-[12px] text-primary-slate-light max-[640px]:text-xl"
        >
          Exchange Calculator
        </h1>
        <p
            :style="customStyles?.subtitle"
            :class="customClass?.subtitle"
            class="mb-6 text-custom-md text-gray-neutral-600 max-[640px]:text-sm"
        >
          Calculate how many dollars you need to pay
        </p>
        <AmountInputSection/>
        <AmountPresetButtons
            :customStyles="customStyles?.label"
            :customClass="customClass?.label"
            :labels="labels"
            @select="val => amount = val"
        />
        <PaymentSummary
            :apiKey="apiKey"
            :amount="numericAmount"
            :rate="usdToSelectedRate"
        />
      </div>
      <div>
        <div class="mt-10">
          <BaseButton
              :customClass="customClass?.button"
              :customStyles="customStyles?.button"
              :disabled="numericAmount <= 0"
              @click="handleExternalNavigate('https://google.com')"
          >
            Pay {{ numericAmount > 0 ? currencyFormatter(numericAmount * usdToSelectedRate, 'USD')  : '----' }}
          </BaseButton>
        </div>
        <FooterNotes :notes="footerItems" />
        <CurrencyModal />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '../atoms/BaseButton.vue';
import AmountInputSection from '../organisms/AmountInputSection.vue';
import PaymentSummary from '../organisms/PaymentSummary.vue';
import FooterNotes from '../molecules/FooterNotes.vue';
import CurrencyModal from '../organisms/CurrencyModal.vue';
import {useCurrencyStore} from "../../stores/currencyStore.ts";
import {storeToRefs} from "pinia";
import {currencyFormatter} from "../../utils/currencyFormatter.ts";
import {computed} from "vue";
import BaseClose from "../atoms/BaseClose.vue";
import {COLORS, footerItems} from "../../utils/constants.ts";
import type {IPaymentWidgetProps, ITheme} from "../../types/props.types.ts";
import AmountPresetButtons from "../molecules/AmountPresetButtons.vue";

const rawProps = defineProps<IPaymentWidgetProps>();

const labels = computed(() =>
    typeof rawProps.labels === 'string'
        ? JSON.parse(rawProps.labels)
        : rawProps.labels
);

const theme = computed<ITheme | undefined>(() =>
    typeof rawProps.theme === 'string'
        ? JSON.parse(rawProps.theme)
        : rawProps.theme
);

const currencyStore = useCurrencyStore();
const { amount, usdToSelectedRate } = storeToRefs(currencyStore);

const numericAmount = computed(() => Number(amount.value));
const customClass = computed(() => theme.value?.customClass ?? {});
const customStyles = computed(() => theme.value?.customStyles ?? {});

const handleExternalNavigate = (link: string) => {
  window.location.href = link;
}
</script>