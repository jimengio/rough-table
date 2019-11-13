import React, { FC, useState } from "react";
import { css, cx } from "emotion";
import { DocSidebar, ISidebarEntry } from "@jimengio/doc-frame";
import { findRouteTarget } from "@jimengio/ruled-router/lib/dom";

import "antd/dist/antd.css";

import Home from "./home";

import { row, fullscreen, expand } from "@jimengio/shared-utils";
import { genRouter, GenRouterTypeMain } from "controller/generated-router";
import PageWholeBorders from "./pages/whole-borders";
import PagePaginated from "./pages/paginated";
import PageEmpty from "./pages/empty";
import PageSelected from "./pages/selected";
import PageWide from "./pages/wide";
import PageBasic from "./pages/basic";
import PageTall from "./pages/tall";
import PageTreeTable from "./pages/tree-table";

const renderBody = (routerTree: GenRouterTypeMain) => {
  switch (routerTree?.name) {
    case "basic":
      return <PageBasic />;
    case "paginated":
      return <PagePaginated />;
    case "whole-borders":
      return <PageWholeBorders />;
    case "selected":
      return <PageSelected />;
    case "wide":
      return <PageWide />;
    case "tall":
      return <PageTall />;
    case "tree-table":
      return <PageTreeTable />;
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
