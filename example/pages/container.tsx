import React, { FC, useState } from "react";
import { parseRoutePath, IRouteParseResult } from "@jimengio/ruled-router";
import { css, cx } from "emotion";
import { DocSidebar, ISidebarEntry } from "@jimengio/doc-frame";
import { findRouteTarget } from "@jimengio/ruled-router/lib/dom";

import "antd/dist/antd.css";

import Home from "./home";

import { row, fullscreen } from "@jimengio/shared-utils";
import { genRouter } from "controller/generated-router";
import PageWholeBorders from "./pages/whole-borders";
import PagePaginated from "./pages/paginated";
import PageEmpty from "./pages/empty";
import PageSelected from "./pages/selected";
import PageWide from "./pages/wide";
import PageBasic from "./pages/basic";
import PageTall from "./pages/tall";

const renderBody = (routerTree: IRouteParseResult) => {
  if (routerTree != null) {
    switch (routerTree.name) {
      case genRouter.basic.name:
        return <PageBasic />;
      case genRouter.paginated.name:
        return <PagePaginated />;
      case genRouter.empty.name:
        return <PageEmpty />;
      case genRouter.wholeBorders.name:
        return <PageWholeBorders />;
      case genRouter.selected.name:
        return <PageSelected />;
      case genRouter.wide.name:
        return <PageWide />;
      case genRouter.tall.name:
        return <PageTall />;

      case genRouter.home.name:
        return <Home />;
    }
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
    title: "Empty",
    path: genRouter.empty.name,
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
];

let Container: FC<{ router: any }> = (props) => {
  let [selected, setSelected] = useState<string>(null);

  return (
    <div className={cx(fullscreen, row, styleContainer)}>
      <DocSidebar
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
      <div className={styleBody}>{renderBody(props.router)}</div>
    </div>
  );
};

export default Container;

const styleContainer = css`
  font-family: "Helvetica";
`;

let styleBody = css`
  padding: 16px;
  width: 800px;
`;
