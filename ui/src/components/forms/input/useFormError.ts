import { useTranslation } from "react-i18next";
import { FieldError, FieldErrors } from "react-hook-form";
import { LiteralUnion } from "react-hook-form/dist/types/utils";
import { RegisterOptions } from "react-hook-form/dist/types/validator";

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
  const translationKey = `error.${type}` as const;

  const message = t([translationKey, "error.unknown"], { type: error.type });

  return {
    message: message,
    type: error.type,
  };
};
