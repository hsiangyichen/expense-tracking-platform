<<<<<<< HEAD
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formats a number as a currency string with customizable options.
interface FormatAmountOptions {
  currency?: string;
  locale?: string;
  decimals?: number;
}

export function formatAmount(
  amount: number,
  options: FormatAmountOptions = {}
): string {
  const { currency = "USD", locale = "en-US", decimals = 2 } = options;

  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    return formatter.format(amount);
  } catch (error) {
    console.error("Error formatting amount:", error);
    return `${currency} ${amount.toFixed(decimals)}`;
  }
}

// Formats URL query parameters by updating or removing specified key-value pairs
interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams): string {
  try {
    const currentUrl = qs.parse(params);

    if (value === null) {
      delete currentUrl[key];
    } else {
      currentUrl[key] = value;
    }

    Object.keys(currentUrl).forEach((k) => {
      if (currentUrl[k] === undefined || currentUrl[k] === null) {
        delete currentUrl[k];
      }
    });

    return qs.stringifyUrl(
      {
        url: window.location.pathname,
        query: currentUrl,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );
  } catch (error) {
    console.error("Error formatting URL query:", error);
    return window.location.pathname;
  }
}
=======
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formats a number as a currency string with customizable options.
interface FormatAmountOptions {
  currency?: string;
  locale?: string;
  decimals?: number;
}

export function formatAmount(
  amount: number,
  options: FormatAmountOptions = {}
): string {
  const { currency = "USD", locale = "en-US", decimals = 2 } = options;

  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    return formatter.format(amount);
  } catch (error) {
    console.error("Error formatting amount:", error);
    return `${currency} ${amount.toFixed(decimals)}`;
  }
}

// Formats URL query parameters by updating or removing specified key-value pairs
interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams): string {
  try {
    const currentUrl = qs.parse(params);

    if (value === null) {
      delete currentUrl[key];
    } else {
      currentUrl[key] = value;
    }

    Object.keys(currentUrl).forEach((k) => {
      if (currentUrl[k] === undefined || currentUrl[k] === null) {
        delete currentUrl[k];
      }
    });

    return qs.stringifyUrl(
      {
        url: window.location.pathname,
        query: currentUrl,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );
  } catch (error) {
    console.error("Error formatting URL query:", error);
    return window.location.pathname; // Fallback to current path without query
  }
}
>>>>>>> 43fa397 (feat: Add BankCard and RightSidebar components with utility functions for formatting amounts and URL query parameters)
