import React, { FC } from "react";
import { css, cx } from "emotion";

import RoughDivTable from "../../../src/rough-div-table";
import ActionLinks, { IActionLinkItem } from "../../../src/action-links";
import { fullHeight } from "@jimengio/shared-utils";
import ScrollDivTable from "../../../src/scroll-div-table";

let data = [
  { code: "001", name: "螺丝", model: "DDR6", source: "外购", type: "产品" },
  { code: "003", name: "扳手", model: "DDR6", source: "外购", type: "产品" },
  { code: "004", name: "堵头", model: "33-36", source: "外购", type: "产品" },
  { code: "044", name: "软管", model: "HO", source: "外购", type: "产品" },
  { code: "045", name: 0, model: "HO", source: "外购", type: "产品" },
];

data = data.concat(data, data, data, data, data, data, data, data, data, data, data);

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

let PageTall: FC<{}> = (props) => {
  return (
    <div>
      <div className={styleContainer}>
        <RoughDivTable
          className={cx(fullHeight)}
          data={data}
          labels={["物料编号", "名称", "型号", "操作"]}
          lastColumnWidth={80}
          rowPadding={60}
          renderColumns={(item) => {
            return [item.code, item.name, item.model, <ActionLinks actions={actions} spaced />];
          }}
          pageOptions={{}}
        />
      </div>
      <div className={styleContainer}>
        <ScrollDivTable
          className={cx(fullHeight)}
          data={data}
          labels={["物料编号", "名称", "型号", "操作"]}
          lastColumnWidth={80}
          rowPadding={60}
          renderColumns={(item) => {
            return [item.code, item.name, item.model, <ActionLinks actions={actions} spaced />];
          }}
          pageOptions={{}}
        />
      </div>
    </div>
  );
};

export default PageTall;

let styleContainer = css`
  height: 600px;
`;
