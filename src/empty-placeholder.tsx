import React, { FC } from "react";
import { css, cx } from "emotion";
import { center, Space } from "@jimengio/flex-styles";
import JimoIcon, { EJimoIcon } from "@jimengio/jimo-icons";
import { ColorScheme } from "@jimengio/jimo-basics";
import { GlobalThemeVariables } from "./theme";

let EmptyPlaceholder: FC<{
  className?: string;
  emptyLocale?: string;
}> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={cx(center, styleContainer, props.className)}>
      <JimoIcon className={cx(styleIcon, GlobalThemeVariables.placeholder)} name={EJimoIcon.emptyData} />
      <Space height={8} />
      <span className={cx(styleText, GlobalThemeVariables.placeholder)}>{props.emptyLocale || "no data"}</span>
    </div>
  );
});

export default EmptyPlaceholder;

// special empty color
let placeholderColor = "hsl(0, 0%, 88%)";

let styleIcon = css`
  line-height: 80px;
  font-size: 80px;
`;

let styleText = css`
  line-height: 20px;
  font-size: 12px;
`;

let styleContainer = css`
  color: ${placeholderColor};
  padding: 12px 16px;
`;
