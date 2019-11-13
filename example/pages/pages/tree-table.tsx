import React, { FC } from "react";
import { css } from "emotion";
import RoughTreeTable, { IItemWithChildren } from "../../../src/rough-tree-table";
import { IRoughTableColumn } from "../../../src/rough-div-table";

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
      <RoughTreeTable data={treeData} columns={columns} />
    </div>
  );
});

export default PageTreeTable;

let styleLink = css`
  color: hsl(200, 80%, 70%);
  cursor: pointer;
`;
