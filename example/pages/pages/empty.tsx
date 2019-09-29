import React, { FC } from "react";
import { css } from "emotion";

import RoughDivTable, { IRoughTableColumn } from "../../../src/rough-div-table";
import ActionLinks, { IActionLinkItem } from "../../../src/action-links";
import { DocDemo } from "@jimengio/doc-frame";

let columns: IRoughTableColumn<any>[] = [
  { title: "物料编号", dataIndex: "code" },
  { title: "名称", dataIndex: "name" },
  { title: "型号", dataIndex: "model" },
  { title: "操作", dataIndex: "model", width: 80, render: () => <ActionLinks actions={[]} spaced /> },
];

let PageEmpty: FC<{}> = (props) => {
  return (
    <div className={styleContainer}>
      <DocDemo title="Empty table" link="https://github.com/jimengio/rough-table/blob/master/example/pages/pages/empty.tsx">
        <RoughDivTable data={[]} columns={columns} rowPadding={60} />
      </DocDemo>
    </div>
  );
};

export default PageEmpty;

let styleContainer = null;
