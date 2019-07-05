import React, { FC } from "react";
import { css } from "emotion";

import RoughDivTable from "../../../src/rough-div-table";

let countMany = Array.from({ length: 100 }, (_, n) => n);

let data = [
  { code: "001", name: "螺丝", model: "DDR6", source: "外购", type: "产品" },
  { code: "003", name: "扳手", model: "DDR6", source: "外购", type: "产品" },
  { code: "004", name: "堵头", model: "33-36", source: "外购", type: "产品" },
  { code: "044", name: "软管", model: "HO", source: "外购", type: "产品" },
];

let PageWide: FC<{}> = (props) => {
  return (
    <div className={styleContainer}>
      <RoughDivTable
        data={data}
        labels={countMany}
        lastColumnWidth={80}
        rowPadding={60}
        renderColumns={(item) => {
          return countMany;
        }}
        pageOptions={{ current: 1, total: 100, pageSize: 10, onChange: (x) => {} }}
      />
    </div>
  );
};

export default PageWide;

let styleContainer = null;
