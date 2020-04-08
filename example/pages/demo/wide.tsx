import React, { FC } from "react";
import { css, cx } from "emotion";

import ScrollDivTable from "../../../src/scroll-div-table";
import RoughDivTable, { IRoughTableColumn } from "../../../src/rough-div-table";
import { fullHeight, flex, column } from "@jimengio/flex-styles";
import { DocDemo, DocBlock } from "@jimengio/doc-frame";

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

let data2 = [
  { code: "001", name: "螺丝", model: "DDR6", source: "外购", type: "产品" },
  { code: "003", name: "扳手", model: "DDR6", source: "外购", type: "产品" },
  { code: "004", name: "堵头", model: "33-36", source: "外购", type: "产品" },
  { code: "045", name: "软管", model: "HO", source: "外购", type: "产品" },
  { code: "046", name: "软管", model: "HO", source: "外购", type: "产品" },
  { code: "047", name: "软管", model: "HO", source: "外购", type: "产品" },
  { code: "048", name: "软管", model: "HO", source: "外购", type: "产品" },
  { code: "049", name: "软管", model: "HO", source: "外购", type: "产品" },
  { code: "050", name: "软管", model: "HO", source: "外购", type: "产品" },
  { code: "051", name: "软管", model: "HO", source: "外购", type: "产品" },
  { code: "052", name: "软管", model: "HO", source: "外购", type: "产品" },
  { code: "053", name: "软管", model: "HO", source: "外购", type: "产品" },
  { code: "054", name: "软管", model: "HO", source: "外购", type: "产品" },
  { code: "055", name: "软管", model: "HO", source: "外购", type: "产品" },
  { code: "056", name: "软管", model: "HO", source: "外购", type: "产品" },
  { code: "057", name: "软管", model: "HO", source: "外购", type: "产品" },
];

let columns: IRoughTableColumn<IData>[] = countMany.map((n) => {
  return {
    title: n,
    dataIndex: "id",
    render: () => `DATA${n}`,
  } as IRoughTableColumn;
});

let DemoWide: FC<{}> = (props) => {
  return (
    <div className={styleContainer}>
      <DocDemo title="内容横向滚动" link="https://github.com/jimengio/rough-table/blob/master/example/pages/demo/wide.tsx">
        <DocBlock content={content} />
        <div className={cx(column, styleTallArea)}>
          <ScrollDivTable
            className={flex}
            data={data}
            columns={columns}
            rowPadding={24}
            pageOptions={{ current: 1, total: 100, pageSize: 10, onChange: (x) => {} }}
          />
        </div>
      </DocDemo>

      <DocDemo title="body 部分上下左右滚动(目前头部也发生滚动)" link="https://github.com/jimengio/rough-table/blob/master/example/pages/demo/wide.tsx">
        <DocBlock content={content} />
        <div className={styleRestricted}>
          <ScrollDivTable className={cx(fullHeight)} data={data2} columns={columns} rowPadding={24} pageOptions={{}} />
        </div>
      </DocDemo>

      <DocDemo title="DivTable">
        <DocBlock content={contentDivTable} />
        <div className={styleRestricted}>
          <RoughDivTable className={cx(fullHeight)} data={data2} columns={columns} rowPadding={24} pageOptions={null} />
        </div>
      </DocDemo>
    </div>
  );
};

export default DemoWide;

let styleContainer = null;

let styleRestricted = css`
  height: 400px;
`;

let styleTallArea = css`
  height: 600px;
`;

let content = `
对于数据量较大的表格用 \`<ScrollDivTable />\` 来特殊处理横向纵向的滚动.(目前没有进行虚拟化, 也推荐使用支持虚拟化的 Table 组件.)
`;

let contentDivTable = `
DivTable 在宽度过大的时候也要支持横向滚动.
`;
