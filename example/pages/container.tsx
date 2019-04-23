import React, { SFC } from "react";
import { parseRoutePath, IRouteParseResult } from "@jimengio/ruled-router";
import { css } from "emotion";

import "antd/dist/antd.css";

import Home from "./home";
import Content from "./content";

import RoughDivTable from "../../src/rough-div-table";
import ActionLinks, { IActionLinkItem } from "../../src/action-links";
import { Space } from "../../src";

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

let Container: SFC<{ router: any }> = (props) => {
  let actions: IActionLinkItem[] = [{ text: "Edit", onClick: () => {} }, { text: "Edit", onClick: () => {} }];
  let data = [
    { name: "a ", value: "ada das dasd asd asdasd a sdf sdf sdf sd fsfsdasd sd" },
    { name: "b ss", value: "bdfgdfgd gd gert ertertertert sdf sd ertert" },
  ];

  return (
    <div className={styleContainer}>
      <div className={styleTitle}>Container</div>

      <div className={styleTableArea}>
        <RoughDivTable
          data={data}
          labels={["name", "value", "Operations"]}
          lastColumnWidth={80}
          rowPadding={60}
          renderColumns={(item) => {
            return [item.name, item.value, <ActionLinks actions={actions} spaced />];
          }}
          pageOptions={{ current: 1, total: 100, pageSize: 10, onChange: (x) => {} }}
        />

        <Space height={40} />

        <RoughDivTable
          data={data}
          labels={["name", "value", "Operations"]}
          lastColumnWidth={80}
          rowPadding={60}
          renderColumns={(item) => {
            return [item.name, item.value, <ActionLinks actions={actions} spaced />];
          }}
        />
      </div>

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
