import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "@/i18n";

export interface VoteUIProps {
  enabled: boolean;
  sum: number;
  votedUp: boolean;
  votedDown: boolean;
  vertical: boolean;
  onClickPlus: () => Promise<void>;
  onClickMinus: () => Promise<void>;
}

export const VoteUI: React.VFC<VoteUIProps> = ({
  enabled,
  sum,
  votedDown,
  votedUp,
  vertical,
  ...props
}) => {
  const { t } = useTranslation("voting");

  const wrapperClasses = classNames(
    "flex items-center max-w-max",
    vertical ? "flex-col space-y-1.5" : "flex-row space-x-2"
  );

  const defaultBtnClasses = classNames(
    "rounded bg-gray-200 focus:outline-none text-xs w-5 h-5",
    {
      "text-gray-400": !enabled,
    }
  );

  const btnIconClasses = "w-5 h-5";

  const upBtnClasses = classNames(defaultBtnClasses, {
    "text-green-600 hover-hover:hover:text-white hover-hover:hover:bg-green-600":
      !votedUp && enabled,
    "text-white bg-green-600": votedUp && enabled,
  });

  const downBtnClasses = classNames(defaultBtnClasses, {
    "text-red-600 hover-hover:hover:text-white hover-hover:hover:bg-red-600":
      !votedDown && enabled,
    "text-white bg-red-600": votedDown && enabled,
  });

  const sumClasses = classNames("font-semibold text-sm", {
    "font-bold": votedDown || votedUp,
    "text-green-600": sum > 0,
    "text-red-600": sum < 0,
  });

  const onClickPlus = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await props.onClickPlus();
  };

  const onClickMinus = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await props.onClickMinus();
  };

  const disabledTitle = t("auth required");
  const removeTitle = t("vote.remove");

  const upBtnTitle = !enabled
    ? disabledTitle
    : votedUp
    ? removeTitle
    : t("vote.up");

  const downBtnTitle = !enabled
    ? disabledTitle
    : votedDown
    ? removeTitle
    : t("vote.down");

  return (
    <div className={wrapperClasses}>
      <button
        className={upBtnClasses}
        onClick={onClickPlus}
        disabled={!enabled}
        title={upBtnTitle}
      >
        <FontAwesomeIcon icon={faPlus} className={btnIconClasses} />
      </button>
      <div className={sumClasses} title={t("total.hint", { sum: sum })}>
        {sum > 0 ? "+" : ""}
        {sum}
      </div>
      <button
        className={downBtnClasses}
        onClick={onClickMinus}
        disabled={!enabled}
        title={downBtnTitle}
      >
        <FontAwesomeIcon icon={faMinus} className={btnIconClasses} />
      </button>
    </div>
  );
};
