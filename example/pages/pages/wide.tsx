import React, { FC } from "react";
import { css } from "emotion";

import ScrollDivTable from "../../../src/scroll-div-table";
import { IRoughTableColumn } from "../../../src/rough-div-table";

let countMany = Array.from({ length: 100 }, (_, n) => n);

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

let columns: IRoughTableColumn<IData>[] = countMany.map((n) => {
  return {
    title: n,
    dataIndex: "id",
    render: () => `DATA${n}`,
  } as IRoughTableColumn;
});

let PageWide: FC<{}> = (props) => {
  return (
    <div className={styleContainer}>
      <ScrollDivTable data={data} columns={columns} rowPadding={60} pageOptions={{ current: 1, total: 100, pageSize: 10, onChange: (x) => {} }} />
    </div>
  );
};

export default PageWide;

let styleContainer = null;
