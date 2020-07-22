import React, { FC, useState } from "react";
import { css, cx } from "emotion";
import { DocSidebar, ISidebarEntry } from "@jimengio/doc-frame";
import { findRouteTarget, HashRedirect } from "@jimengio/ruled-router/lib/dom";

import "antd/dist/antd.css";

import { row, fullscreen, expand } from "@jimengio/flex-styles";
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
import DemoColumnWidth from "./demo/column-width";
import DemoLoading from "./demo/loading";
import DemoRowResizing from "./demo/row-resizing";
import DemoConfigure from "./demo/configure";
import DemoEmptyPlaceholder from "./demo/empty-placeholder";
import CustomThemePage from "./custom-theme";
import DemoRegisteredRenderer from "./demo/registered-renderer";

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
    case "row-resizing":
      return <DemoRowResizing />;
    case "tall":
      return <DemoTall />;
    case "tree-table":
      return <DemoTreeTable />;
    case "action-links":
      return <DemoActionLinks />;
    case "column-width":
      return <DemoColumnWidth />;
    case "loading":
      return <DemoLoading />;
    case "configure":
      return <DemoConfigure />;
    case "empty-placeholder":
      return <DemoEmptyPlaceholder />;
    case "custom-theme":
      return <CustomThemePage />;
    case "registered-renderer":
      return <DemoRegisteredRenderer />;
    case "home":
      return <HashRedirect to={genRouter.basic.path()} noDelay />;
  }
  return <div>NOTHING</div>;
};

let entries: ISidebarEntry[] = [
  {
    title: "Basic",
    cnTitle: "基础功能",
    path: genRouter.basic.name,
  },
  {
    title: "Column Width",
    cnTitle: "定制列宽度",
    path: genRouter.columnWidth.name,
  },
  {
    title: "Loading",
    cnTitle: "加载动画",
    path: genRouter.loading.name,
  },
  {
    title: "Selected row",
    cnTitle: "选中行",
    path: genRouter.selected.name,
  },
  {
    title: "Row resizing",
    cnTitle: "行宽跟随宽度调整",
    path: genRouter.rowResizing.name,
  },
  {
    title: "Paginated",
    cnTitle: "分页",
    path: genRouter.paginated.name,
  },
  {
    title: "Action Links",
    cnTitle: "链接演示",
    path: genRouter.actionLinks.name,
  },
  {
    title: "Tree Table",
    cnTitle: "树形表格",
    path: genRouter.treeTable.name,
  },
  {
    title: "Whole Borders",
    cnTitle: "全包围的边框",
    path: genRouter.wholeBorders.name,
  },
  {
    title: "Configure",
    cnTitle: "配置默认属性",
    path: genRouter.configure.name,
  },
  {
    title: "Tall",
    cnTitle: "纵向滚动",
    path: genRouter.tall.name,
  },
  {
    title: "Wide",
    cnTitle: "超宽的横向滚动",
    path: genRouter.wide.name,
  },
  {
    title: "Empty Placeholder",
    cnTitle: "暂无数据提示",
    path: genRouter.emptyPlaceholder.name,
  },
  {
    title: "Custom Theme",
    cnTitle: "主题样式",
    path: genRouter.customTheme.name,
  },
  {
    title: "Register Renderer",
    cnTitle: "注册渲染器",
    path: genRouter.registeredRenderer.name,
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
