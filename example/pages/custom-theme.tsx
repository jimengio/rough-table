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
          text="Change theme styles for input"
          onClick={() => {
            attachRoughTableThemeVariables({
              cell: styleCell,
              row: styleRow,
            });

            alert("切换到其他页面查看");
          }}
        />

        <DocBlock content={content} />

        <DocSnippet code={code} />
      </DocDemo>
    </div>
  );
});

export default CustomThemePage;

let styleCell = css`
  font-style: italic;
`;

let styleRow = css`
  border-bottom: 1px solid red;
`;

let code = `
attachRoughTableThemeVariables({
  cell: styleCell,
  row: styleRow,
});
`;

let content = `
定制样式
`;
