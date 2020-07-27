import { css } from "emotion";

let emptyStyle = css``;

/** 全局主题配置入口, 通过 emotion 方式修改, 基于 mutable reference */
export let GlobalThemeVariables = {
  // elements
  cell: emptyStyle,
  row: emptyStyle,
  rowSelected: emptyStyle,
  headerRow: emptyStyle,
  resizeDragger: emptyStyle,
  placeholder: emptyStyle,
  loadingCover: emptyStyle,
  loadingDot: emptyStyle,
  emptyPlaceholder: emptyStyle,
  /** link style */
  actionLinkItem: emptyStyle,
  actionLinksSpaceSeparatorWidth: 8,
};

export let attachRoughTableThemeVariables = (customVariables: Partial<typeof GlobalThemeVariables>): void => {
  Object.assign(GlobalThemeVariables, customVariables);
};
