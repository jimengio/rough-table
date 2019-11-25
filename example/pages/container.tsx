import React, { FC, useState } from "react";
import { css, cx } from "emotion";
import { DocSidebar, ISidebarEntry } from "@jimengio/doc-frame";
import { findRouteTarget } from "@jimengio/ruled-router/lib/dom";

import "antd/dist/antd.css";

import Home from "./home";

import { row, fullscreen, expand } from "@jimengio/shared-utils";
import { genRouter, GenRouterTypeMain } from "controller/generated-router";
import DemoWholeBorders from "./demo/whole-borders";
import DemoPaginated from "./demo/paginated";
import DemoEmpty from "./demo/empty";
import DemoSelected from "./demo/selected";
import DemoWide from "./demo/wide";
import DemoBasic from "./demo/basic";
import DemoTall from "./demo/tall";
import DemoTreeTable from "./demo/tree-table";
import DemoActionLinks from "./demo/action-links";

const renderBody = (routerTree: GenRouterTypeMain) => {
  switch (routerTree?.name) {
    case "basic":
      return <DemoBasic />;
    case "paginated":
      return <DemoPaginated />;
    case "whole-borders":
      return <DemoWholeBorders />;
    case "selected":
      return <DemoSelected />;
    case "wide":
      return <DemoWide />;
    case "tall":
      return <DemoTall />;
    case "tree-table":
      return <DemoTreeTable />;
    case "action-links":
      return <DemoActionLinks />;
    case genRouter.home.name:
      return <Home />;
  }
  return <div>NOTHING</div>;
};

let entries: ISidebarEntry[] = [
  {
    title: "Basic",
    path: genRouter.basic.name,
  },
  {
    title: "Selected",
    path: genRouter.selected.name,
  },
  {
    title: "Whole borders",
    path: genRouter.wholeBorders.name,
  },
  {
    title: "Paginated",
    path: genRouter.paginated.name,
  },
  {
    title: "Wide",
    path: genRouter.wide.name,
  },
  {
    title: "Tall",
    path: genRouter.tall.name,
  },
  {
    title: "Tree Table",
    path: genRouter.treeTable.name,
  },
  {
    title: "Action Links",
    path: genRouter.actionLinks.name,
  },
];

let Container: FC<{ router: GenRouterTypeMain }> = (props) => {
  let [selected, setSelected] = useState<string>(null);

  return (
    <div className={cx(fullscreen, row, styleContainer)}>
      <DocSidebar
        title="Rough Table"
        items={entries}
        currentPath={props.router.name}
        onSwitch={(item) => {
          let target = findRouteTarget(genRouter, item.path);
          if (target != null) {
            target.go();
          } else {
            console.error("Unknown page", item);
          }
        }}
      />
      <div className={cx(expand, styleBody)}>{renderBody(props.router)}</div>
    </div>
  );
};

export default Container;

const styleContainer = css`
  font-family: "Helvetica";
`;

let styleBody = css`
  padding: 40px;
  width: 800px;
`;
