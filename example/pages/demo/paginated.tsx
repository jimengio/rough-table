import React, { FC } from "react";
import { css } from "emotion";

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

let data = [
  { code: "001", name: "螺丝", model: "DDR6", source: "外购", type: "产品" },
  { code: "003", name: "扳手", model: "DDR6", source: "外购", type: "产品" },
  { code: "004", name: "堵头", model: "33-36", source: "外购", type: "产品" },
  { code: "044", name: "软管", model: "HO", source: "外购", type: "产品" },
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

let DemoPaginated: FC<{}> = (props) => {
  let columns: IRoughTableColumn<IData>[] = [
    { title: "物料编号", dataIndex: "code", render: (item: IData["code"], record: IData) => item },
    { title: "名称", dataIndex: "name", render: (item: IData["name"], record: IData) => item },
    { title: "型号", dataIndex: "model", render: (item: IData["model"], record: IData) => item },
    { title: "操作", dataIndex: "model", width: 80, render: (item: any, record: IData) => <ActionLinks actions={actions} spaced /> },
  ];

  return (
    <div className={styleContainer}>
      <DocDemo title="Paginated" link="https://github.com/jimengio/rough-table/blob/master/example/pages/demo/paginated.tsx">
        <RoughDivTable data={data} columns={columns} rowPadding={24} pageOptions={{ current: 1, total: 100, pageSize: 10, onChange: (x) => {} }} />
        <DocBlock content={content} />
        <DocSnippet code={code} />
      </DocDemo>
    </div>
  );
};

export default DemoPaginated;

let styleContainer = css``;

let code = `
<RoughDivTable
  data={data} columns={columns} rowPadding={24}
  pageOptions={{ current: 1, total: 100, pageSize: 10, onChange: (x) => {} }}
/>
`;

let content = `
分页组件是基于 antd 的 Pagination 组件.
`;
