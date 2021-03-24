import { useTranslation } from "react-i18next";
import {
  FieldError,
  FieldErrors,
  LiteralUnion,
  RegisterOptions,
} from "react-hook-form";

type FormError = {
  message: string;
  type: LiteralUnion<keyof RegisterOptions, string>;
};

type TranslationKey =
  | "required"
  | "min"
  | "max"
  | "minLength"
  | "maxLength"
  | "pattern"
  | "validate";

export const useFormError = (
  name: string,
  errors?: FieldErrors
): FormError | undefined => {
  if (!errors) return;

  const error: FieldError | undefined = errors[name];
  if (!error) return;

  if (error.message) {
    return {
      message: error.message,
      type: error.type,
    };
  }

  const { t } = useTranslation("form");

  const type = error.type as TranslationKey;
  const translationKey = `input validation error.${type}` as const;

  const message = t([translationKey, "input validation error.unknown"], {
    type: error.type,
  });

  return {
    message: message,
    type: error.type,
  };
};
