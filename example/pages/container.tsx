import React, { FC, useState } from "react";
import { parseRoutePath, IRouteParseResult } from "@jimengio/ruled-router";
import { css } from "emotion";

import "antd/dist/antd.css";

import Home from "./home";
import Content from "./content";

import RoughDivTable from "../../src/rough-div-table";
import ActionLinks, { IActionLinkItem } from "../../src/action-links";
import Space from "../../src/space";

const renderChildPage = (routerTree: IRouteParseResult) => {
  if (routerTree != null) {
    switch (routerTree.name) {
      case "home":
        return <Home />;
      case "content":
        return <Content />;
    }
  }
  return <div>NOTHING</div>;
};

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

let Container: FC<{ router: any }> = (props) => {
  let [selected, setSelected] = useState<string>(null);

  return (
    <div className={styleContainer}>
      <div className={styleTableArea}>
        <div className={styleTitle}>Click to select a row</div>
        <RoughDivTable
          data={data}
          labels={["物料编号", "名称", "型号", "操作"]}
          lastColumnWidth={80}
          rowPadding={60}
          renderColumns={(item) => {
            return [item.code, item.name, item.model, <ActionLinks actions={actions} spaced />];
          }}
        />
        <Space height={40} />
        <div className={styleTitle}>Paginated</div>
        <RoughDivTable
          data={data}
          labels={["物料编号", "名称", "型号", "来源", "类型", "操作"]}
          lastColumnWidth={80}
          rowPadding={60}
          renderColumns={(item) => {
            return [item.code, item.name, item.model, item.source, item.type, <ActionLinks actions={actions} spaced />];
          }}
          pageOptions={{ current: 1, total: 100, pageSize: 10, onChange: (x) => {} }}
        />
        <Space height={40} />
        <div className={styleTitle}>Empty</div>
        <RoughDivTable
          data={[]}
          labels={["物料编号", "名称", "型号", "操作"]}
          lastColumnWidth={80}
          rowPadding={60}
          emptyLocale={"暂无数据"}
          renderColumns={(item) => {
            return [item.code, item.name, item.model, <ActionLinks actions={actions} spaced />];
          }}
        />
        <Space height={40} />
        <div className={styleTitle}>Click to select a row</div>
        <RoughDivTable
          data={data}
          labels={["物料编号", "名称", "型号", "操作"]}
          rowKey="code"
          selectedKeys={[selected]}
          onRowClick={(record) => {
            setSelected(record.code);
          }}
          lastColumnWidth={80}
          rowPadding={60}
          emptyLocale={"暂无数据"}
          renderColumns={(item) => {
            return [item.code, item.name, item.model, <ActionLinks actions={actions} spaced />];
          }}
        />
      </div>
      <Space height={40} />

      {renderChildPage(props.router)}
    </div>
  );
};

export default Container;

const styleContainer = css`
  font-family: "Helvetica";
  padding: 40px;
`;

const styleTitle = css`
  margin-bottom: 16px;
`;

let styleTableArea = css`
  width: 800px;
`;
