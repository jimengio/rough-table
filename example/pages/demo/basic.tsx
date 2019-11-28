import React, { FC } from "react";
import { css } from "emotion";

import RoughDivTable, { IRoughTableColumn } from "../../../src/rough-div-table";
import ActionLinks, { IActionLinkItem } from "../../../src/action-links";
import RoughTable from "../../../src/rough-table";
import { DocDemo, DocSnippet, DocBlock } from "@jimengio/doc-frame";

let code = `
let columns: IRoughTableColumn<IData>[] = [
  { title: "物料编号", dataIndex: "code", render: (item: IData["code"], record: IData) => item },
  { title: "名称", dataIndex: "name", render: (item: IData["name"], record: IData) => item },
  { title: "型号", dataIndex: "model", render: (item: IData["model"], record: IData) => item },
  { title: "操作", dataIndex: "model", width: 80, render: (item: any, record: IData) => <ActionLinks actions={actions} spaced /> },
];

<RoughDivTable data={data} columns={columns} rowPadding={24} />
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
DivTable 用了 Flexbox 布局和 flex-basis 属性, 如果需要自定义 column 的宽度, 就需要配置  flex-basis.
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

let columns: IRoughTableColumn<IData>[] = [
  { title: "物料编号", dataIndex: "code", render: (item: IData["code"], record: IData) => item },
  { title: "名称", dataIndex: "name", render: (item: IData["name"], record: IData) => item },
  { title: "型号", dataIndex: "model", render: (item: IData["model"], record: IData) => item },
  { title: "操作", dataIndex: "model", width: 80, render: (item: any, record: IData) => <ActionLinks actions={actions} spaced /> },
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

let DemoBasic: FC<{}> = (props) => {
  return (
    <div className={styleContainer}>
      <DocDemo title="A very simple table" link="https://github.com/jimengio/rough-table/blob/master/example/pages/demo/basic.tsx">
        <RoughDivTable data={data} columns={columns} rowPadding={24} />
        <DocSnippet code={code} />
      </DocDemo>

      <DocDemo title="A very simple table" link="https://github.com/jimengio/rough-table/blob/master/example/pages/demo/basic.tsx">
        <DocBlock content={resizeContent} />
        <RoughDivTable data={data} columns={resizedColumns} rowPadding={24} />
        <DocSnippet code={resizeCode} />
      </DocDemo>

      <DocDemo title="Table with no data" link="https://github.com/jimengio/rough-table/blob/master/example/pages/demo/basic.tsx">
        <RoughTable dataSource={[]} defineColumns={() => []} emptyLocale={"没有数据"} />
      </DocDemo>
    </div>
  );
};

export default DemoBasic;

let styleContainer = null;