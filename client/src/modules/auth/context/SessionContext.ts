import React from "react";
import { SessionModel } from "../models";

export const SessionContext = React.createContext<SessionModel | null>(
  undefined
);
