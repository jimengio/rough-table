import React, { FC, CSSProperties, ReactNode } from "react";
import { css, cx } from "emotion";
import produce from "immer";

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
