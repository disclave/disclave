import React from "react";

interface LocaleContextData {
  locale: string;
}

export const LocaleContext = React.createContext<LocaleContextData>({
  locale: "en-US",
});
