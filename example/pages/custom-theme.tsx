import React, { FC } from "react";
import { css } from "emotion";
import { JimoButton } from "@jimengio/jimo-basics";
import { attachRoughTableThemeVariables } from "../../src/theme";
import { DocBlock, DocDemo, DocSnippet } from "@jimengio/doc-frame";

let CustomThemePage: FC<{ className?: string }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={props.className}>
      <DocDemo title={"Custom Theme"}>
        <JimoButton
          text="插入定制样式"
          onClick={() => {
            attachRoughTableThemeVariables({
              cell: styleCell,
              row: styleRow,
              headerRow: styleHeaderRow,
              resizeDragger: styleResizeDragger,
              placeholder: stylePlaceholder,
            });

            alert("切换到其他页面查看");
          }}
        />

        <DocBlock content={content} />

        <DocSnippet code={code} lang="js" />
      </DocDemo>
    </div>
  );
});

export default CustomThemePage;

let styleCell = css`
  font-style: italic;
`;

let styleRow = css`
  border-bottom: 1px solid hsl(0, 0%, 59%);
`;

let styleHeaderRow = css`
  border-bottom: 1px solid hsl(0, 0%, 59%);
  background-color: hsl(0, 0%, 59%);
  color: white;

  &:hover {
    background-color: hsl(0, 0%, 64%);
  }
`;

let styleResizeDragger = css`
  background-color: hsl(0, 0%, 54%);
  border-color: hsl(0, 0%, 54%);
`;

let stylePlaceholder = css`
  color: hsl(0, 0%, 59%);
`;

let code = `
attachRoughTableThemeVariables({
  cell: styleCell, // 单元格
  row: styleRow, // 表格行
  headerRow: styleHeaderRow, // 头部特殊的行
  resizeDragger: styleResizeDragger, // 拖拽表格列的分割线
  placeholder: stylePlaceholder, // 表格内容为空时的元素, 主要是颜色
});
`;

let content = `
通过 emotion css 的方式向特定位置插入样式.
`;
