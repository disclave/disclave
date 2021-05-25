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
    vertical ? "flex-col" : "flex-row",
    {
      "space-x-2": enabled && !vertical,
      "space-y-1.5": enabled && vertical,
    }
  );

  const defaultBtnClasses = classNames(
    "rounded bg-gray-200 focus:outline-none text-xs w-5 h-5",
    { hidden: !enabled }
  );

  const btnIconClasses = "w-5 h-5";

  const upBtnClasses = classNames(defaultBtnClasses, {
    "text-green-600 hover:text-white hover:bg-green-600": !votedUp,
    "text-white bg-green-600": votedUp,
  });

  const downBtnClasses = classNames(defaultBtnClasses, {
    "text-red-600 hover:text-white hover:bg-red-600": !votedDown,
    "text-white bg-red-600": votedDown,
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

  return (
    <div className={wrapperClasses}>
      <button
        className={upBtnClasses}
        onClick={onClickPlus}
        title={votedUp ? t("vote.remove") : t("vote.up")}
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
        title={votedDown ? t("vote.remove") : t("vote.down")}
      >
        <FontAwesomeIcon icon={faMinus} className={btnIconClasses} />
      </button>
    </div>
  );
};
