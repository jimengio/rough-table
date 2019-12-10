import React, { FC } from "react";
import { css } from "emotion";
import RoughDivTable, { IRoughTableColumn } from "../../../src/rough-div-table";
import ActionLinks, { IActionLinkItem } from "../../../src/action-links";
import { DocDemo, DocSnippet, DocBlock } from "@jimengio/doc-frame";

let content = `
RoughDivTable 使用 \`flex-basis\`属性来控制宽度. 在配置中直接加上 \`width: 80\` 就可以指定宽度.
没有指定宽度的 column 自动按照 \`flex-grow: 1\` 进行伸缩. 特殊情况可以加上 \`style\` 属性对样式进行覆盖.
`;

let code = `
let columns: IRoughTableColumn<IData>[] = [
  { title: "物料编号", width: 80, dataIndex: "code" },
  { title: "名称", dataIndex: "name" },
  { title: "型号", dataIndex: "model" },
  { title: "操作", width: 80, dataIndex: "model", render: (item: any, record: IData) => <ActionLinks actions={actions} spaced /> },
];
`;

let resizeCode = `
let resizedColumns: IRoughTableColumn<IData>[] = [
  { title: "物料编号", dataIndex: "code", render: (item: IData["code"], record: IData) => item },
  {
    title: "名称",
    style: {
      flexBasis: "200px",
    },
    dataIndex: "name",
    render: (item: IData["name"], record: IData) => item,
  },
  { title: "型号", dataIndex: "model", render: (item: IData["model"], record: IData) => item },
  {
    title: "操作",
    style: {
      flexBasis: "200px",
    },
    dataIndex: "model",
    width: 80,
    render: (item: any, record: IData) => <ActionLinks actions={actions} spaced />,
  },
];

<RoughDivTable data={data} columns={resizedColumns} rowPadding={24} />
`;

let resizeContent = `
特殊情况需要手动控制样式, 可以通过 \`style\` 属性来覆盖组件内自动生成的 \`flexBasis\` 数值.
`;

interface IData {
  code: string;
  name: any;
  model: string;
  source: string;
  type: string;
}

let data: IData[] = [
  { code: "001", name: "螺丝", model: "DDR6", source: "外购", type: "产品" },
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

let resizedColumns: IRoughTableColumn<IData>[] = [
  { title: "物料编号", dataIndex: "code", render: (item: IData["code"], record: IData) => item },
  {
    title: "名称",
    style: {
      flexBasis: "200px",
    },
    dataIndex: "name",
    render: (item: IData["name"], record: IData) => item,
  },
  { title: "型号", dataIndex: "model", render: (item: IData["model"], record: IData) => item },
  {
    title: "操作",
    style: {
      flexBasis: "200px",
    },
    dataIndex: "model",
    width: 80,
    render: (item: any, record: IData) => <ActionLinks actions={actions} spaced />,
  },
];

let columns: IRoughTableColumn<IData>[] = [
  { title: "物料编号", width: 80, dataIndex: "code" },
  { title: "名称", dataIndex: "name" },
  { title: "型号", dataIndex: "model" },
  { title: "操作", width: 80, dataIndex: "model", render: (item: any, record: IData) => <ActionLinks actions={actions} spaced /> },
];

let DemoColumnWidth: FC<{}> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div>
      <DocDemo title="Width">
        <DocBlock content={content} />
        <DocSnippet code={code} />

        <RoughDivTable data={data} columns={columns} />
      </DocDemo>

      <DocDemo title="A very simple table" link="https://github.com/jimengio/rough-table/blob/master/example/pages/demo/basic.tsx">
        <DocBlock content={resizeContent} />
        <RoughDivTable data={data} columns={resizedColumns} rowPadding={24} />
        <DocSnippet code={resizeCode} />
      </DocDemo>
    </div>
  );
});

export default DemoColumnWidth;
