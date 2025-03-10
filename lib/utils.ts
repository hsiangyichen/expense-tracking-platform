import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* ------------------ Formats a number as a currency string ----------------- */
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

/* ------------------ Formats a number as currency (USD) ----------------- */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/* ----------------------- Formats URL query parameters --------------------- */
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

/* ----------------------------- Format the text ---------------------------- */
export function toPascalCase(str: string): string {
  const withSpaces = str.replace(/_/g, " ");

  return withSpaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
