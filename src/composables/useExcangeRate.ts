import { storeToRefs } from 'pinia';
import {useQuery} from '@tanstack/vue-query';
import {useCurrencyStore} from "../stores/currencyStore.ts";
import {fetchExchangeRate} from "../services/currencyService.ts";
import {computed, watchEffect} from "vue";
import {QUERY_KEY} from "../utils/constants.ts";

export const useExchangeRate = (apiKey: string) => {
    const currencyStore = useCurrencyStore();
    const { selectedCurrency } = storeToRefs(currencyStore);

    const currencyLabel = computed(() => selectedCurrency.value.label);
    const isEnabled = computed(() => currencyLabel.value !== 'USD');

    const query = useQuery({
        queryKey: computed(() => [QUERY_KEY.exchangeRate, currencyLabel.value]),
        queryFn: () => fetchExchangeRate(apiKey),
        enabled: isEnabled,
        staleTime: 1000 * 60
    });
    
    watchEffect(() => {
        if (query.data.value) {
            currencyStore.setUsdToSelectedRate(query.data.value);
        }
    });
    
    return query;
};