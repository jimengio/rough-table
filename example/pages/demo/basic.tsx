import React, { FC, useState, useRef, useEffect } from "react";
import { css } from "emotion";
import Switch from "antd/lib/switch";

import RoughDivTable, { IRoughTableColumn } from "../../../src/rough-div-table";
import ActionLinks, { IActionLinkItem } from "../../../src/action-links";
import RoughTable from "../../../src/rough-table";
import { DocDemo, DocSnippet, DocBlock } from "@jimengio/doc-frame";
import { JimoButton } from "@jimengio/jimo-basics";
import { Space } from "@jimengio/flex-styles";
import produce from "immer";

let code = `
let columns: IRoughTableColumn<IData>[] = [
  { title: "物料编号", dataIndex: "code" },
  { title: "名称", dataIndex: "name" },
  { title: "型号", dataIndex: "model", render: (item: IData["model"], record: IData) => item },
  { title: "操作", dataIndex: "model", width: 80, render: (item: any, record: IData) => <ActionLinks actions={actions} spaced /> },
];

<RoughDivTable data={data} columns={columns} />
`;

let codeHidden = `
{
  title: "物料编号",
  hidden: isHidden, // 显示/隐藏
  dataIndex: "code",
  render: (item: IData["code"], record: IData) => item
},
`;

let codeClampTd = `
{
  title: "型号",
  clampTd: true,
  dataIndex: "model",
}
`;

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
  { title: "物料编号", dataIndex: "code" },
  { title: "名称", dataIndex: "name" },
  { title: "型号", dataIndex: "model", render: (item: IData["model"], record: IData) => item },
  { title: "操作", dataIndex: "model", width: 80, render: (item: any, record: IData) => <ActionLinks actions={actions} spaced /> },
];

let clampTdDemoColumns: IRoughTableColumn<IData>[] = [
  { title: "名称", dataIndex: "name" },
  { title: "型号", dataIndex: "model", clampText: true, render: (item: IData["model"], record: IData) => item },
];

let DemoBasic: FC<{}> = (props) => {
  let [hideColumn, setHideColumn] = useState(false);
  let mightHiddenColumns = produce(columns, (draft) => {
    draft[0].hidden = hideColumn;
  });

  let bodyContainerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    console.log("body", bodyContainerRef.current);
  }, []);

  return (
    <div className={styleContainer}>
      <DocDemo title="A very simple table" link="https://github.com/jimengio/rough-table/blob/master/example/pages/demo/basic.tsx">
        <DocBlock content={contentBasic} />
        <DocSnippet code={code} />
        <RoughDivTable bodyRef={bodyContainerRef} data={data} columns={columns} />
      </DocDemo>

      <DocDemo title="Hide column">
        <div>
          隐藏第一列
          <Space width={8} />
          <Switch checked={hideColumn} onChange={(checked) => setHideColumn(checked)} />
        </div>
        <DocSnippet code={codeHidden} />
        <Space height={16} />
        <RoughDivTable data={data} columns={mightHiddenColumns} />
      </DocDemo>

      <DocDemo title="td overflow handling">
        <div>单元格文字溢出隐藏，鼠标移入展示。</div>
        <DocSnippet code={codeClampTd} />
        <Space height={16} />
        <RoughDivTable data={data} columns={clampTdDemoColumns} />
      </DocDemo>

      <DocDemo title="Table with no data" link="https://github.com/jimengio/rough-table/blob/master/example/pages/demo/basic.tsx">
        <DocBlock content={emptyContent} />
        <RoughTable dataSource={[]} defineColumns={() => []} emptyLocale={"没有数据"} />
      </DocDemo>
    </div>
  );
};

export default DemoBasic;

let styleContainer = css``;

let emptyContent = `无数据时显示.`;

let contentBasic = `显示一个简单的表格`;
