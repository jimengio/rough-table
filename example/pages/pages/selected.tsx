import React, { FC, useState } from "react";
import { css } from "emotion";
import RoughDivTable, { IRoughTableColumn } from "../../../src/rough-div-table";
import ActionLinks, { IActionLinkItem } from "../../../src/action-links";
import { type } from "os";

interface IData {
  code: string;
  name: string;
  model: string;
  source: string;
  type: string;
}

let data: IData[] = [
  { code: "001", name: "螺丝", model: "DDR6", source: "外购", type: "产品" },
  { code: "003", name: "扳手", model: "DDR6", source: "外购", type: "产品" },
  { code: "004", name: "堵头", model: "33-36", source: "外购", type: "产品" },
  { code: "044", name: "软管", model: "HO", source: "外购", type: "产品" },
];

let actions: IActionLinkItem[] = [
  { text: "修改", onClick: (e) => e.stopPropagation() },
  { text: "删除", onClick: () => {} },
  { hidden: true, text: "恢复", onClick: () => {} },
  null,
];

let PageSelected: FC<{}> = (props) => {
  let [selected, setSelected] = useState<string>(null);

  let columns: IRoughTableColumn<IData>[] = [
    { title: "物料编号", dataIndex: "code", render: (item: IData["code"], record: IData) => item },
    { title: "名称", dataIndex: "name", render: (item: IData["name"], record: IData) => item },
    { title: "型号", dataIndex: "model", render: (item: IData["model"], record: IData) => item },
    { title: "操作", dataIndex: "model", width: 80, render: (item: any, record: IData) => <ActionLinks actions={actions} spaced /> },
  ];

  return (
    <div className={styleContainer}>
      <RoughDivTable
        data={data}
        rowPadding={60}
        wholeBorders
        rowKey="code"
        selectedKeys={[selected]}
        onRowClick={(record) => {
          setSelected(record.code);
        }}
        columns={columns}
      />
    </div>
  );
};

export default PageSelected;

let styleContainer = null;
