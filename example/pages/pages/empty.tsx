import React, { FC } from "react";
import { css } from "emotion";

import RoughDivTable from "../../../src/rough-div-table";
import ActionLinks, { IActionLinkItem } from "../../../src/action-links";

let PageEmpty: FC<{}> = (props) => {
  return (
    <div className={styleContainer}>
      <RoughDivTable
        data={[]}
        labels={["物料编号", "名称", "型号", "操作"]}
        lastColumnWidth={80}
        rowPadding={60}
        renderColumns={(item) => {
          return [item.code, item.name, item.model, <ActionLinks actions={[]} spaced />];
        }}
      />
    </div>
  );
};

export default PageEmpty;

let styleContainer = null;
