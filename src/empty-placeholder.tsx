import React, { FC } from "react";
import { css, cx } from "emotion";
import { center, Space } from "@jimengio/flex-styles";
import JimoIcon, { EJimoIcon } from "@jimengio/jimo-icons";
import { ColorScheme } from "@jimengio/jimo-basics";

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
      <JimoIcon className={styleIcon} name={EJimoIcon.emptyData} />
      <Space height={8} />
      <span className={styleText}>{props.emptyLocale || "no data"}</span>
    </div>
  );
});

export default EmptyPlaceholder;

// special empty color
let placeholderColor = "hsl(0, 0%, 88%)";

let styleIcon = css`
  color: ${placeholderColor};

  line-height: 80px;
  font-size: 80px;
`;

let styleText = css`
  color: ${placeholderColor};
  line-height: 20px;
  font-size: 12px;
`;

let styleContainer = css`
  padding: 12px 16px;
`;
