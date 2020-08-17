import React, { FC, useState, useRef, useEffect } from "react";
import { css } from "emotion";

import RoughDivTable, { IRoughTableColumn } from "../../../src/rough-div-table";
import { DocDemo, DocSnippet, DocBlock } from "@jimengio/doc-frame";
import { Space } from "@jimengio/flex-styles";
import { registerRoughTableRenderer } from "../../../src/registered-renderer";

let code = `
// 项目全局定义
registerRoughTableRenderer("colored", (text, options) => {
  // TODO, check data from options
  let color = options.color || "red";

  return (
    <span className={styleColored} style={{ color: color }}>
      {text}
    </span>
  );
});

// 使用
let columns: IRoughTableColumn<IData>[] = [
  { title: "物料编号", dataIndex: "code" },
  { title: "名称(colored...)", dataIndex: "name", renderType: "colored", renderOptions: { color: "blue" } },
  { title: "名称(colored...)", dataIndex: "source", renderType: "colored", renderOptions: { color: "green" } },
  { title: "型号", dataIndex: "model", render: (item: IData["model"], record: IData) => item },
];

`;

registerRoughTableRenderer("colored", (text, options) => {
  // TODO, check data from options
  let color = options.color || "red";

  return (
    <span className={styleColored} style={{ color: color }}>
      {text}
    </span>
  );
});

interface IData {
  code: string;
  name: any;
  model: string;
  source: string;
  type: string;
}

let data: IData[] = [
  { code: "001", name: "螺丝", model: "DDR6 DDR7 DDR8 DDR9 DDR10 DDR11 DDR12 DDR13 DDR14", source: "外购", type: "产品" },
  { code: "003", name: "扳手", model: "DDR6", source: "外购", type: "产品" },
  { code: "004", name: "堵头", model: "33-36", source: "外购", type: "产品" },
  { code: "044", name: "软管", model: "HO", source: "外购", type: "产品" },
  { code: "045", name: 0, model: "HO", source: "外购", type: "产品" },
];

let columns: IRoughTableColumn<IData>[] = [
  { title: "物料编号", dataIndex: "code" },
  { title: "名称(colored...)", dataIndex: "name", renderType: "colored", renderOptions: { color: "blue" } },
  { title: "来源(colored...)", dataIndex: "source", renderType: "colored", renderOptions: { color: "green" } },
  { title: "型号", dataIndex: "model", render: (item: IData["model"], record: IData) => item },
];

let DemoRegisteredRenderer: FC<{}> = (props) => {
  return (
    <div className={styleContainer}>
      <DocDemo title="A very simple table" link="https://github.com/jimengio/rough-table/blob/master/example/pages/demo/basic.tsx">
        <DocBlock content={contentBasic} />
        <DocSnippet code={code} />
        <RoughDivTable data={data} columns={columns} />
      </DocDemo>
    </div>
  );
};

export default DemoRegisteredRenderer;

let styleContainer = css``;

let contentBasic = `一个注册渲染器的方案. 全局注册渲染函数以后, 表格可以使用 \`renderType\` 属性指定使用该渲染器渲染. 可以减少一部分业务的重复代码.`;

let styleColored = css`
  color: blue;
  font-weight: bold;
  font-size: 16px;
`;
