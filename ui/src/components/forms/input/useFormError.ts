import {
  FieldError,
  FieldErrors,
  LiteralUnion,
  RegisterOptions,
} from "react-hook-form";
import { useTranslation } from "../../../i18n";

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
  const { t } = useTranslation("form");

  if (!errors) return;

  const error: FieldError | undefined = errors[name];
  if (!error) return;

  if (error.message) {
    return {
      message: error.message,
      type: error.type,
    };
  }

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
