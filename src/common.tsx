import React, { FC, CSSProperties, ReactNode } from "react";
import { css, cx } from "emotion";
import produce from "immer";

export let mergeStyles = (a: CSSProperties, b: CSSProperties, c?: CSSProperties, d?: CSSProperties): CSSProperties => {
  if (a == null) {
    return b;
  }
  return produce(a, (draft) => {
    if (b != null) {
      for (let k in b) {
        // do not assign undefined/null to base object
        if (b[k] != null) {
          draft[k] = b[k];
        }
      }
    }
    if (c != null) {
      for (let k in c) {
        if (c[k] != null) {
          draft[k] = c[k];
        }
      }
    }
    if (d != null) {
      for (let k in d) {
        if (d[k] != null) {
          draft[k] = d[k];
        }
      }
    }
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
