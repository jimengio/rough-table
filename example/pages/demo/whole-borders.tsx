import React, { FC, useState } from "react";
import { css } from "emotion";

import RoughDivTable, { IRoughTableColumn } from "../../../src/rough-div-table";
import ActionLinks, { IActionLinkItem } from "../../../src/action-links";
import { DocDemo, DocBlock, DocSnippet } from "@jimengio/doc-frame";
import { JimoButton } from "@jimengio/jimo-basics";
import { Space } from "@jimengio/flex-styles";

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

let DemoWholeBorders: FC<{}> = (props) => {
  let [whole, setWhole] = useState(true);

  let columns: IRoughTableColumn<IData>[] = [
    { title: "物料编号", dataIndex: "code" },
    { title: "名称", dataIndex: "name" },
    { title: "型号", dataIndex: "model", render: (item: IData["model"], record: IData) => item },
    { title: "操作", dataIndex: "model", width: 80, render: (item: any, record: IData) => <ActionLinks actions={actions} spaced /> },
  ];

  return (
    <div className={styleContainer}>
      <DocDemo title="Table with borders on all edges" link="https://github.com/jimengio/rough-table/blob/master/example/pages/demo/whole-borders.tsx">
        <DocBlock content={content} />
        <div>
          <JimoButton text={"Whole / Partial"} onClick={() => setWhole(!whole)} />
        </div>
        <DocSnippet code={code} />
        <Space height={16} />
        <RoughDivTable data={data} columns={columns} rowPadding={24} wholeBorders={whole} />
      </DocDemo>
    </div>
  );
};

export default DemoWholeBorders;

let styleContainer = null;

let content = `默认只有上下有边框, 通过参数开启全局边框.`;

let code = `<RoughDivTable data={data} columns={columns} rowPadding={24}
                           wholeBorders={true} />`;
