export interface ICurrency {
    label: string;
    icon: string;
}

export interface ICurrencyState {
    selectedCurrency: ICurrency;
    amount: number | string;
    usdToSelectedRate: number;
    baseCurrency: string;
}