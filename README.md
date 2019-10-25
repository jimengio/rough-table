## Rough Table

> A table component for places where antd is too large to fit.

### Usage

![](https://img.shields.io/npm/v/@jimengio/rough-table.svg?style=flat-square)

Currently the main component maintained is `RoughDivTable`. As the name indicated this component is rendered in `<div/>`s. And it has very few features in order to keep fast.

目前提供做 3 个表格组件:

- `RoughTable` 基于 `<table>` 简单封装的 table
- `RoughDivTable` 用 `<div>` 配合 Flexbox 简单封装的 table
- `ScrollDivTable` 用 `<div>` 实现的带横向滚动的 table

```ts
import { RoughDivTable } from "@jimengio/rough-table";

let columns: IRoughTableColumn<IData>[] = [
  { title: "物料编号", dataIndex: "code", render: (item: IData["code"], record: IData) => item },
  { title: "名称", dataIndex: "name", render: (item: IData["name"], record: IData) => item },
  { title: "型号", dataIndex: "model", render: (item: IData["model"], record: IData) => item },
  { title: "操作", dataIndex: "model", width: 80, render: (item: any, record: IData) => <ActionLinks actions={actions} spaced /> },
];

<RoughDivTable data={data} columns={columns} rowPadding={24} pageOptions={{ current: 1, total: 100, pageSize: 10, onChange: (x) => {} }} />;
```

Details about props:

```ts
// a faked data...
interface IData {
  name: string;
}

export interface IRoughTableColumn<IData> {
  title: ReactNode;
  hidden?: boolean;
  width?: number | string;
  className?: string;
  style?: CSSProperties;
  dataIndex: keyof T;
  render?: (value: any, record: T, itemIndex?: number) => ReactNode;
}

interface IProps {
  className?: string;
  data: { [k: string]: any }[];
  /** it renders each item of data into an array */
  columns: IRoughTableColumn<IData>;
  rowPadding?: number;
  cellClassName?: string;
  /** Display empty symbol rather than set it transparent */
  showEmptySymbol?: boolean;
  selectedKeys?: string[];
  rowKey?: string;
  onRowClick?: (record: IData) => void;
  /** antd pagination */
  pageOptions?: PaginationProps;
  /** Default locale is "no data" */
  emptyLocale?: string;
}
```

`ActionLinks` creates the links of editing:

```tsx
import { ActionLinks, IActionLinkItem } from "@jimengio/rough-table";

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
