import DollarIcon from '../assets/dollar.svg'
import type {ICurrencyState} from "../types/currency.types.ts";
import EuroIcon from "../assets/euro.svg";
import type {ITheme} from "../types/props.types.ts";

export const initialCurrencyState: ICurrencyState = {
    selectedCurrency: {
        label: 'USD',
        icon: DollarIcon
    },
    amount: '',
    usdToSelectedRate: 1,
    baseCurrency: 'USD'
}

export const COLORS = {
    gray_neutral_600: '#767F88',
    gray_neutral_700: '#5F666E'
}

export const REGEX_ONLY_NUMBERS = /[^0-9.]/g;

export const QUERY_KEY = {
    exchangeRate: 'exchangeRate',
}

export const currencyOptions = [
    { icon: DollarIcon, label: 'USD', desc: 'American Dollar' },
    { icon: EuroIcon, label: 'EUR', desc: 'Euro' },
];

export const footerItems = ['Terms and Conditions', 'footer note', 'footer note'];

export const amountLabels = [100, 250, 500, 1000];

export const theme: ITheme = {
    customClass: {
        layout: 'bg-red-500',
        title: 'text-red-300',
        subtitle: 'text-red-300',
        label: 'bg-blue-300 text-white',
        button: 'bg-blue-300 text-red-300'
    },
    customStyles: {
        layout: {
            backgroundColor: '#000',
        },
        title: {
            color: '#535353'
        },
        subtitle: {
            color: '#444444'
        },
        label: {
            color: '#fff',
            backgroundColor: '#000'
        },
        button: {
            color: '#fff',
            backgroundColor: '#000',
        }
    }
}