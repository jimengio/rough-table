import React, { FC, useState } from "react";
import { css } from "emotion";

import RoughDivTable, { IRoughTableColumn } from "../../../src/rough-div-table";
import ActionLinks, { IActionLinkItem } from "../../../src/action-links";
import { DocDemo, DocSnippet, DocBlock } from "@jimengio/doc-frame";
import { JimoButton } from "@jimengio/jimo-basics";
import { Space } from "@jimengio/flex-styles";

let contentLoading = `
\`isLoading\` 属性可以用来控制显示加载状态.
`;

interface IData {
  code: string;
  name: any;
  model: string;
  source: string;
  type: string;
}

let data: IData[] = [
  { code: "001", name: "螺丝", model: "DDR6", source: "外购", type: "产品" },
  { code: "003", name: "扳手", model: "DDR6", source: "外购", type: "产品" },
  { code: "004", name: "堵头", model: "33-36", source: "外购", type: "产品" },
  { code: "044", name: "软管", model: "HO", source: "外购", type: "产品" },
  { code: "045", name: 0, model: "HO", source: "外购", type: "产品" },
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

let columns: IRoughTableColumn<IData>[] = [
  { title: "物料编号", dataIndex: "code" },
  { title: "名称", dataIndex: "name" },
  { title: "型号", dataIndex: "model", render: (item: IData["model"], record: IData) => item },
  { title: "操作", dataIndex: "model", width: 80, render: (item: any, record: IData) => <ActionLinks actions={actions} spaced /> },
];

let DemoLoading: FC<{}> = (props) => {
  let [isLoading, setLoading] = useState(false);
  let [isEmpty, setEmpty] = useState(false);

  return (
    <div className={styleContainer}>
      <DocDemo title="Loading state">
        <div>
          <DocBlock content={contentLoading} />

          <JimoButton
            text="Loading / Loaded"
            onClick={() => {
              setLoading(!isLoading);
            }}
          ></JimoButton>

          <Space width={8} />

          <JimoButton
            text="Empty / Has data"
            onClick={() => {
              setEmpty(!isEmpty);
            }}
          ></JimoButton>
        </div>
        <Space height={16} />
        <RoughDivTable data={isEmpty ? [] : data} columns={columns} isLoading={isLoading} />
      </DocDemo>
    </div>
  );
};

export default DemoLoading;

let styleContainer = null;
