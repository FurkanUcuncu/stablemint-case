import type { ICurrency } from './currency.types.ts';

export type IStyle = Record<string, string>;

export interface IBaseComponentProps {
    customClass?: string;
    customStyles?: IStyle;
}

export interface IBaseButtonProps extends IBaseComponentProps {
    click?: () => void;
    disabled?: boolean;
}

export interface IBaseCloseProps extends IBaseComponentProps {
    width?: string;
    height?: string;
    color?: string;
}

export interface IBaseInputProps extends IBaseComponentProps {
    modelValue: string | number;
    type?: string;
    sanitize?: (val: string) => string;
}

export interface ICurrencyBadgeProps {
    icon: string;
    label: string;
    imgClass?: string;
    labelClass?: string;
}

export interface IAmountPresetButtonsProps extends IBaseComponentProps {
    labels?: number[];
}

export interface ICurrencySelectorProps {
    selected: ICurrency;
}

export interface IFooterNotesProps {
    notes: string[];
}

export interface IPaymentSummaryProps {
    amount: number;
    rate: number;
    apiKey: string;
}

export interface IPaymentWidgetProps {
    apiKey: string;
    theme?: ITheme;
    labels?: number[];
}

interface IGenericTheme<T extends string = string> {
    customClass?: Partial<Record<T, string>>;
    customStyles?: Partial<Record<T, IStyle>>;
}

type MyThemeKeys = 'layout' | 'title' | 'subtitle' | 'label' | 'button';

export type ITheme = IGenericTheme<MyThemeKeys>;