import React, { FC, useState } from "react";
import { css } from "emotion";
import { JimoButton } from "@jimengio/jimo-basics";
import { attachRoughTableThemeVariables } from "../../src/theme";
import { DocBlock, DocDemo, DocSnippet } from "@jimengio/doc-frame";

import RoughDivTable, { IRoughTableColumn } from "../../src/rough-div-table";
import { Space } from "@jimengio/flex-styles";

interface IData {
  code: string;
  name: any;
  model: string;
  source: string;
  type: string;
}

let data: IData[] = [
  { code: "001", name: "螺丝", model: "DDR6 DDR7 DDR8 DDR9 DDR10 DDR11 DDR12 DDR13 DDR14", source: "外购", type: "产品" },
  { code: "003", name: "扳手", model: "DDR6", source: "外购", type: "产品" },
  { code: "004", name: "堵头", model: "33-36", source: "外购", type: "产品" },
  { code: "044", name: "软管", model: "HO", source: "外购", type: "产品" },
  { code: "045", name: 0, model: "HO", source: "外购", type: "产品" },
];

let columns: IRoughTableColumn<IData>[] = [
  { title: "物料编号", dataIndex: "code" },
  { title: "名称", dataIndex: "name" },
  { title: "型号", dataIndex: "model", render: (item: IData["model"], record: IData) => item },
  { title: "操作", dataIndex: "model", width: 80, render: (item: any, record: IData) => "actions..." },
];

let CustomThemePage: FC<{ className?: string }> = React.memo((props) => {
  let [showEmpty, setShowEmpty] = useState(false);
  let [loading, setLoading] = useState(false);

  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={props.className}>
      <DocDemo title={"Custom Theme"}>
        <JimoButton
          text="插入定制样式"
          onClick={() => {
            attachRoughTableThemeVariables({
              cell: styleCell,
              row: styleRow,
              headerRow: styleHeaderRow,
              resizeDragger: styleResizeDragger,
              placeholder: stylePlaceholder,
            });

            alert("切换到其他页面查看");
          }}
        />

        <DocBlock content={content} />

        <DocSnippet code={code} lang="js" />
      </DocDemo>

      <DocDemo title={"属性覆盖"}>
        <div>
          <JimoButton
            text="Toggle empty"
            onClick={() => {
              setShowEmpty(!showEmpty);
            }}
          />
          <Space width={8} />
          <JimoButton
            text="Toggle loading"
            onClick={() => {
              setLoading(!loading);
            }}
          />
        </div>
        <Space height={16} />

        <div style={{ backgroundColor: "hsla(218, 80%, 15%, 1)" }}>
          <RoughDivTable
            headerClassName={styleRowHeader}
            rowClassName={styleCustomRow}
            cellClassName={styleCustomCell}
            rowSelectedClassName={styleCustomRowSelected}
            resizeDraggerClassName={styleCustomResizeDragger}
            loadingCoverClassName={styleLoadingCover}
            loadingDotClassName={styleLoadingDot}
            data={showEmpty ? [] : data}
            isLoading={loading}
            columns={columns}
            selectedKeys={["001", "003"]}
            rowKey={"code"}
            customBodyRowStyle={(x) => {
              if (x % 2 === 1) {
                return {
                  backgroundColor: "hsla(0, 0%, 100%, 0.1)",
                };
              }
            }}
          />
        </div>
        <DocBlock content={customContent} />
        <DocSnippet code={customCode} />
      </DocDemo>
    </div>
  );
});

export default CustomThemePage;

let styleCell = css`
  font-style: italic;
`;

let styleRow = css`
  border-bottom: 1px solid hsl(0, 0%, 59%);
`;

let styleHeaderRow = css`
  border-bottom: 1px solid hsl(0, 0%, 59%);
  background-color: hsl(0, 0%, 59%);
  color: white;

  &:hover {
    background-color: hsl(0, 0%, 64%);
  }
`;

let styleResizeDragger = css`
  background-color: hsl(0, 0%, 54%);
  border-color: hsl(0, 0%, 54%);
`;

let stylePlaceholder = css`
  color: hsl(0, 0%, 59%);
`;

let code = `
attachRoughTableThemeVariables({
  cell: styleCell, // 单元格
  row: styleRow, // 表格行
  rowSelected: styleRowSelected, // 表格选中行
  headerRow: styleHeaderRow, // 头部特殊的行
  resizeDragger: styleResizeDragger, // 拖拽表格列的分割线
  placeholder: stylePlaceholder, // 表格内容为空时的元素, 主要是颜色
  loadingCover: emptyStyle,
  loadingDot: emptyStyle,
  emptyPlaceholder: emptyStyle,
});
`;

let content = `
通过 emotion css 的方式向特定位置插入样式.
`;

let styleRowHeader = css`
  background-color: hsla(0, 0%, 100%, 0.3);
  border-bottom: none;

  &:hover {
    background-color: hsla(0, 0%, 100%, 0.3);
  }
`;

let styleCustomRow = css`
  border-bottom: none;
  &:hover {
    background-color: transparent;
  }
`;

let styleCustomCell = css`
  color: hsla(0, 0%, 100%, 1);
`;

let styleCustomResizeDragger = css`
  opacity: 0.2;
`;

let customCode = `
className?: string;
rowPadding?: number;
cellClassName?: string;
headerClassName?: string;
bodyClassName?: string;
rowClassName?: string;
resizeDraggerClassName?: string;
loadingCoverClassName?: string;
loadingDotClassName?: string;
customBodyRowStyle?: (idx: number) => CSSProperties;
placeholderClassName?: string;
`;

let customContent = `
单个组件的定制样式, 通过暴露的 className 插口来实现.
`;

let styleCustomRowSelected = css`
  background-color: hsl(200, 50%, 40%);
`;

let styleLoadingCover = css`
  background-color: hsla(218, 93%, 11%, 0.65);
`;

let styleLoadingDot = css`
  background-color: hsla(186, 97%, 74%, 1);
`;
