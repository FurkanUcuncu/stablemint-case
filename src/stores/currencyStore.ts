import { defineStore } from 'pinia';
import type {ICurrency, ICurrencyState} from "../types/currency.types.ts";
import {initialCurrencyState} from "../utils/constants.ts";

export const useCurrencyStore = defineStore('currency', {
    state: (): ICurrencyState => ({
       ...initialCurrencyState
    }),

    actions: {
        setSelectedCurrency(currency: ICurrency) {
            this.selectedCurrency = currency;
        },
        changeAmount(amount: number | string) {
            console.log(typeof amount, 'typeof amount')
            if (!amount || isNaN(Number(amount))) return;
            this.amount = Number(amount);
        },
        setUsdToSelectedRate(rate: number) {
            this.usdToSelectedRate = rate;
        }
    }
});