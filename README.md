## Rough Table

> A table component for places where antd is too large to fit.

### Usage

![](https://img.shields.io/npm/v/@jimengio/rough-table.svg?style=flat-square)

Currently the main component maintained is `RoughDivTable`. As the name indicated this component is rendered in `<div/>`s. And it has very few features in order to keep fast.

```ts
import { RoughDivTable } from "@jimengio/rough-table";

<RoughDivTable
  data={data}
  labels={["物料编号", "名称", "型号", "来源", "类型", "操作"]}
  lastColumnWidth={80}
  rowPadding={60}
  renderColumns={(item) => {
    return [item.code, item.name, item.model, item.source, item.type, <ActionLinks actions={actions} spaced />];
  }}
  pageOptions={{ current: 1, total: 100, pageSize: 10, onChange: (x) => {} }}
/>;
```

Details about props:

```ts
interface IProps {
  className?: string;
  data: { [k: string]: any }[];
  /** the headers are separated from body on purpose */
  labels: (string | ReactNode)[];
  /** it renders each item of data into an array */
  renderColumns: (record: any, idx?: number) => (string | ReactNode)[];
  rowPadding?: number;
  /** Use number of string to specify CSS width */
  columnWidths?: any[];
  lastColumnWidth?: number;
  styleCell?: string;
  /** Display empty symbol rather than set it transparent */
  showEmptySymbol?: boolean;
  selectedKeys?: string[];
  rowKey?: string;
  onRowClick?: (record: any) => void;
  setRowClassName?: (record: any) => string;
  /**  antd pagination */
  pageOptions?: {
    current: number;
    total: number;
    pageSize: number;
    onChange: (x: number) => void;
  };
  /** Default locale is "no data" */
  emptyLocale?: string;
}
```

`ActionLinks` creates the links of editing:

```tsx
import ActionLinks, { IActionLinkItem } from "@jimengio/rough-table";

let actions: IActionLinkItem[] = [
  {
    text: "修改",
    onClick: () => {},
  },
  {
    text: "删除",
    onClick: () => {},
  },
];
<ActionLinks actions={actions} spaced />;
```

### Workflow

https://github.com/jimengio/ts-workflow

### License

MIT
