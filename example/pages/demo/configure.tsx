import React, { FC } from "react";
import { css } from "emotion";
import { DocDemo, DocSnippet, DocBlock } from "@jimengio/doc-frame";
import { JimoButton } from "@jimengio/jimo-basics";
import { configureDivTableProps } from "../../../src/rough-div-table";
import { configureActionLinksProps } from "../../../src/action-links";

let DemoConfigure: FC<{}> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div>
      <DocDemo title="Configure DivTable">
        <DocBlock content={content} />
        <DocSnippet code={code} />
        <JimoButton
          text={"通用属性"}
          onClick={() => {
            configureDivTableProps({
              rowPadding: 80,
              wholeBorders: true,
              showEmptySymbol: true,
              emptyLocale: "Just empty",
            });

            alert("属性已设置, 变化不明显, 请切换其他页面 DivTable.");
          }}
        />
      </DocDemo>

      <DocDemo title="Configure ActionLinks">
        <DocBlock content={linksContent} />
        <DocSnippet code={linksCode} />
        <JimoButton
          text={"链接样式"}
          onClick={() => {
            configureActionLinksProps({
              spaced: true,
            });

            alert("属性已设置, 变化不明显, 请切换其他页面 ActionLinks.");
          }}
        />
      </DocDemo>
    </div>
  );
});

export default DemoConfigure;

let code = `
configureDivTableProps({
  rowPadding: 80,
  wholeBorders: true,
  showEmptySymbol: true,
  emptyLocale: "Just empty",
});
`;

let content = `
如果需要设置页面级别的默认属性, 用下面这个 API.
`;

let linksContent = `
设置链接之间的分隔符, 是否使用空格.
`;

let linksCode = `
configureActionLinksProps({
  spaced: true
});
`;
