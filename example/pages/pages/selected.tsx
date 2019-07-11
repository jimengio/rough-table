import React, { FC, useState } from "react";
import { css } from "emotion";
import RoughDivTable from "../../../src/rough-div-table";
import ActionLinks, { IActionLinkItem } from "../../../src/action-links";

let data = [
  { code: "001", name: "螺丝", model: "DDR6", source: "外购", type: "产品" },
  { code: "003", name: "扳手", model: "DDR6", source: "外购", type: "产品" },
  { code: "004", name: "堵头", model: "33-36", source: "外购", type: "产品" },
  { code: "044", name: "软管", model: "HO", source: "外购", type: "产品" },
];

let actions: IActionLinkItem[] = [
  {
    text: "修改",
    onClick: (e) => {
      e.stopPropagation();
    },
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

let PageSelected: FC<{}> = (props) => {
  let [selected, setSelected] = useState<string>(null);

  console.log("selected", selected);

  return (
    <div className={styleContainer}>
      <RoughDivTable
        data={data}
        labels={["物料编号", "名称", "型号", "操作"]}
        lastColumnWidth={80}
        rowPadding={60}
        wholeBorders
        rowKey="code"
        selectedKeys={[selected]}
        onRowClick={(record) => {
          setSelected(record.code);
        }}
        renderColumns={(item) => {
          return [item.code, item.name, item.model, <ActionLinks actions={actions} spaced />];
        }}
      />
    </div>
  );
};

export default PageSelected;

let styleContainer = null;
