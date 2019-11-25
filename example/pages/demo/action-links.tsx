import React, { FC } from "react";
import { css } from "emotion";
import ActionLinks, { IActionLinkItem } from "../../../src/action-links";
import { DocDemo, DocSnippet, DocBlock } from "@jimengio/doc-frame";

let code = `
let actions: IActionLinkItem[] = [
  { text: "修改", onClick: () => {} },
  { text: "删除", onClick: () => {} },
  { hidden: true, text: "恢复", onClick: () => {} },
  null,
];

<ActionLinks actions={actions} />
`;

let codeSpaced = `
<ActionLinks actions={actions} spaced />
`;

let content = `
\`null\` 或者 \`hidden: true\` 可以用来关闭显示.
`;

let contentSpaced = `
通过 spaced 属性控制不用分割线而使用空白作为分隔
`;

let actions: IActionLinkItem[] = [
  { text: "修改", onClick: () => {} },
  { text: "删除", onClick: () => {} },
  { hidden: true, text: "恢复", onClick: () => {} },
  null,
];

let DemoActionLinks: FC<{}> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div>
      <DocDemo title="Links">
        <ActionLinks actions={actions} />
        <DocSnippet code={code} />
        <DocBlock content={content} />
      </DocDemo>

      <DocDemo title="Links with space">
        <ActionLinks actions={actions} spaced />
        <DocBlock content={contentSpaced} />
        <DocSnippet code={codeSpaced} />
      </DocDemo>
    </div>
  );
});

export default DemoActionLinks;
