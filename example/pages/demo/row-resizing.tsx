import React, { FC, useState } from "react";
import { css } from "emotion";
import Switch from "antd/lib/switch";

import RoughDivTable, { IRoughTableColumn } from "../../../src/rough-div-table";
import ActionLinks, { IActionLinkItem } from "../../../src/action-links";
import { DocDemo, DocSnippet, DocBlock } from "@jimengio/doc-frame";

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

let actions: IActionLinkItem[] = [
  {
    text: "修改",
    onClick: () => {},
  },
  {
    text: "删除",
    onClick: () => {},
  },
  {
    hidden: true,
    text: "恢复",
    onClick: () => {},
  },
  null,
];

let columns: IRoughTableColumn<IData>[] = [
  { title: "物料编号", dataIndex: "code", render: (item: IData["code"], record: IData) => item },
  { title: "名称", dataIndex: "name", render: (item: IData["name"], record: IData) => item },
  { title: "名称", dataIndex: "name", render: (item: IData["name"], record: IData) => item },
  { title: "名称", dataIndex: "name", render: (item: IData["name"], record: IData) => item },
  { title: "名称", dataIndex: "name", render: (item: IData["name"], record: IData) => item },
  { title: "名称", dataIndex: "name", render: (item: IData["name"], record: IData) => item },
  { title: "型号", dataIndex: "model", render: (item: IData["model"], record: IData) => item },
  { title: "操作", dataIndex: "model", width: 80, render: (item: any, record: IData) => <ActionLinks actions={actions} spaced /> },
];

let DemoRowResizing: FC<{}> = (props) => {
  return (
    <div className={styleContainer}>
      <DocDemo title="A very simple table" link="https://github.com/jimengio/rough-table/blob/master/example/pages/demo/basic.tsx">
        <DocBlock content={content} />
        <DocSnippet code={code} />
      </DocDemo>
      <RoughDivTable data={data} columns={columns} rowPadding={24} watchRowResizing />
    </div>
  );
};

export default DemoRowResizing;

let styleContainer = null;

let code = `
<RoughDivTable data={data} columns={columns} rowPadding={24}
               watchRowResizing />
`;

let content = `
DivTable 采用 Flexbox 布局, 但是存在一个 [row container 无法正常撑开的问题](https://stackoverflow.com/q/20984488/883571). 当前的临时方案是通过 \`watchRowResizing\` 属性进行控制. 启用之后会对 resize 事件进行监听, 检测布局强行进行修正.

看原理, 这个方案是比较可能存在性能问题的. 除非宽度明显不够, 不建议用. 并且, 表格不建议设计成容易出现横向滚动条的样子.

(缩放窗口宽度来查看效果.)
`;
