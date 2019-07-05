import React, { FC, useState } from "react";
import { parseRoutePath, IRouteParseResult } from "@jimengio/ruled-router";
import { css, cx } from "emotion";

import "antd/dist/antd.css";

import Home from "./home";

import { row, fullscreen } from "@jimengio/shared-utils";
import { genRouter } from "controller/generated-router";
import PageWholeBorders from "./pages/whole-borders";
import PagePaginated from "./pages/paginated";
import PageEmpty from "./pages/empty";
import PageSelected from "./pages/selected";
import PageWide from "./pages/wide";

const renderBody = (routerTree: IRouteParseResult) => {
  if (routerTree != null) {
    switch (routerTree.name) {
      case genRouter.basic.name:
        return <PageWholeBorders />;
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

      case genRouter.home.name:
        return <Home />;
    }
  }
  return <div>NOTHING</div>;
};

let entries = [
  {
    title: "Basic",
    name: genRouter.basic.name,
    go: genRouter.basic.go,
  },
  {
    title: "Selected",
    name: genRouter.selected.name,
    go: genRouter.selected.go,
  },
  {
    title: "Empty",
    name: genRouter.empty.name,
    go: genRouter.empty.go,
  },
  {
    title: "Whole borders",
    name: genRouter.wholeBorders.name,
    go: genRouter.wholeBorders.go,
  },
  {
    title: "Paginated",
    name: genRouter.paginated.name,
    go: genRouter.paginated.go,
  },
  {
    title: "Wide",
    name: genRouter.wide.name,
    go: genRouter.wide.go,
  },
];

let Container: FC<{ router: any }> = (props) => {
  let [selected, setSelected] = useState<string>(null);

  return (
    <div className={cx(fullscreen, row, styleContainer)}>
      <div className={styleSidebar}>
        {entries.map((entry) => {
          return (
            <div key={entry.title} onClick={entry.go} className={cx(styleEntry, props.router.name === entry.name ? styleSelectedEntry : null)}>
              {entry.title}
            </div>
          );
        })}
      </div>
      <div className={styleBody}>{renderBody(props.router)}</div>
    </div>
  );
};

export default Container;

const styleContainer = css`
  font-family: "Helvetica";
`;

let styleSidebar = css`
  padding: 16px 0px;
  width: 240px;
  line-height: 32px;
  border-right: 1px solid #eee;
`;

let styleBody = css`
  padding: 16px;
  width: 800px;
`;

let styleSelectedEntry = css`
  background-color: blue;
  color: white;
`;

let styleEntry = css`
  cursor: pointer;
  padding: 0 8px;
`;
