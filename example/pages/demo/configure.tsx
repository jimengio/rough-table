import React, { FC } from "react";
import { css } from "emotion";
import { DocDemo, DocSnippet, DocBlock } from "@jimengio/doc-frame";
import { JimoButton } from "@jimengio/jimo-basics";
import { configureDivTableProps } from "../../../src/rough-div-table";
import { Spin } from "antd";

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
              loadingElement: <Spin spinning />,
            });

            alert("属性已设置, 变化不明显, 请切换其他页面 DivTable.");
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
  /** 配置loading组件，如使用antd的Spin */
  loadingElement: <Spin spinning />,
});
`;

let content = `
如果需要设置页面级别的默认属性, 用下面这个 API.
`;
