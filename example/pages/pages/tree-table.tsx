import React, { FC } from "react";
import { css } from "emotion";
import RoughTreeTable, { IItemWithChildren } from "../../../src/rough-tree-table";
import { IRoughTableColumn } from "../../../src/rough-div-table";
import { DocSnippet, DocBlock, DocDemo } from "@jimengio/doc-frame";

let columns: IRoughTableColumn[] = [
  {
    dataIndex: "name",
    title: "Name",
    render: (value) => {
      return <span className={styleLink}>value</span>;
    },
  },
  {
    dataIndex: "description",
    title: "Description",
  },
];

interface IData {
  name: string;
  description: string;
}

let treeData: IItemWithChildren<IData>[] = [
  {
    item: { name: "A", description: "A is x of a" },
    children: [
      {
        item: { name: "B", description: "B is like b" },
      },
      { item: { name: "C", description: "C is like c" } },
    ],
  },
  { item: { name: "D", description: "D is x of d" } },
  {
    item: { name: "E", description: "E is x of e" },
    children: [
      {
        item: { name: "F", description: "F is like f" },
        children: [
          {
            item: { name: "C", description: "C is like c" },
          },
        ],
      },
    ],
  },
];

let PageTreeTable: FC<{}> = React.memo((props) => {
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div>
      <DocBlock content={content} />
      <DocDemo title="Rough Tree Table" link={"https://github.com/jimengio/rough-table/blob/master/example/pages/pages/tree-table.tsx#L57"}>
        <RoughTreeTable data={treeData} columns={columns} />
        <DocSnippet code={code} />
      </DocDemo>
    </div>
  );
});

export default PageTreeTable;

let styleLink = css`
  color: hsl(200, 80%, 70%);
  cursor: pointer;
`;

let code = `
import { RoughTreeTable, IRoughTableColumn, IItemWithChildren } from "@jimengio/rough-table";

let columns: IRoughTableColumn[] = [
  {
    dataIndex: "name",
    title: "Name",
    render: (value) => {
      return <span className={styleLink}>value</span>;
    },
  },
  {
    dataIndex: "description",
    title: "Description",
  },
];

let treeData: IItemWithChildren<IData>[] = [
  {
    item: { name: "A", description: "A is x of a" },
    children: [
      {
        item: { name: "B", description: "B is like b" },
      },
      { item: { name: "C", description: "C is like c" } },
    ],
  },
  { item: { name: "D", description: "D is x of d" } },
  {
    item: { name: "E", description: "E is x of e" },
    children: [
      {
        item: { name: "F", description: "F is like f" },
        children: [
          {
            item: { name: "C", description: "C is like c" },
          },
        ],
      },
    ],
  },
];

<RoughTreeTable data={treeData} columns={columns} />
`;

let content = `
RoughTreeTable 是基于 RoughDivTable 实现的一个包含树形结构的表格.

传入的 data 就需要转变, 嵌套成结构:

\`\`\`js
{ item: { ... },
  children: [
    { item: { ... }, children: [ ... ] },
  ]
}
\`\`\`
`;
