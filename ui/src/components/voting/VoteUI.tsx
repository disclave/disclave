import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "@/i18n";
import { SkeletonBox } from "../loading";

export interface VoteUIProps {
  enabled: boolean;
  loading: boolean;
  sum: number;
  votedUp: boolean;
  votedDown: boolean;
  vertical: boolean;
  onClickPlus: () => Promise<void>;
  onClickMinus: () => Promise<void>;
}

export const VoteUI: React.VFC<VoteUIProps> = ({
  sum,
  votedDown,
  votedUp,
  vertical,
  ...props
}) => {
  const { t } = useTranslation("voting");

  const enabled = props.enabled && !props.loading;

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

  const btnTitle = (voted: boolean, voteT: "vote.up" | "vote.down") => {
    if (props.loading) return t("loading");
    if (!enabled) return t("auth required");
    if (voted) return t("vote.remove");
    return t(voteT);
  };

  const upBtnTitle = btnTitle(votedUp, "vote.up").toString();
  const downBtnTitle = btnTitle(votedDown, "vote.down").toString();

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
      {props.loading ? (
        <div title={t("loading")}>
          <SkeletonBox className="w-7 h-5" />
        </div>
      ) : (
        <div className={sumClasses} title={t("total.hint", { sum: sum })}>
          {sum > 0 ? "+" : ""}
          {sum}
        </div>
      )}
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
