import React, { FC, CSSProperties, ReactNode } from "react";
import { css, cx } from "emotion";
import JimoIcon, { EJimoIcon } from "@jimengio/jimo-icons";
import { center } from "@jimengio/flex-styles";
import produce from "immer";

let NoDataTableBody: FC<{ emptyLocale?: string }> = (props) => {
  /** Methods */
  /** Effects */
  /** Renderers */

  return (
    <div className={cx(center, padding16, styleEmpty)}>
      <JimoIcon name={EJimoIcon.emptyData} className={styleEmptyIcon} />
      <span>{props.emptyLocale || "No data"}</span>
    </div>
  );
};

export default NoDataTableBody;

const styleEmpty = css`
  color: #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  font-size: 12px;
`;

let padding16 = css`
  padding: 16px;
`;

let styleEmptyIcon = css`
  font-size: 80px;
  margin-bottom: 8px;
`;

export let mergeStyles = (a: CSSProperties, b: CSSProperties): CSSProperties => {
  if (a == null) {
    return b;
  }
  return produce(a, (draft) => {
    Object.assign(draft, b);
  });
};

/** return width or flexGroup:1 */
export let getWidthStyle = (width: string | number): CSSProperties => {
  if (width != null) {
    return { flexBasis: width };
  } else {
    return { flexGrow: 1 };
  }
};

export let EmptyCell: FC<{ text?: ReactNode; showSymbol?: boolean }> = (props) => {
  /** Methods */
  /** Effects */
  /** Renderers */
  return <span className={cx(styleEmptyCell, props.showSymbol ? null : styleTransparent)}>{props.text || "-"}</span>;
};

const styleEmptyCell = css`
  user-select: none;
`;

let styleTransparent = css`
  color: transparent;
`;
