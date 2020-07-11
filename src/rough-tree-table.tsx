import React, { FC, useState, ReactNode, createContext, useContext, useMemo } from "react";
import { css, cx } from "emotion";
import { flatMap } from "lodash-es";
import { useImmer } from "use-immer";

import RoughDivTable, { RoughTableRow, IRoughTableColumn } from "./rough-div-table";
import { PaginationProps } from "antd/lib/pagination";
import { Space, row, rowMiddle } from "@jimengio/flex-styles";
import { ISimpleObject } from "./types";

export interface IRoughTreeTableColumn<T> extends IRoughTableColumn<T> {
  children?: IRoughTreeTableColumn<T>;
}

export interface IItemWithChildren<T> {
  item: T;
  children?: IItemWithChildren<T>[];
}

interface IRoughPreset {
  foldedSymbol: ReactNode;
  unfoldedSymbol: ReactNode;
}

export let roughTreePreset: IRoughPreset = {
  foldedSymbol: "▶",
  unfoldedSymbol: "▼",
};

type RoughTreeTableProps<T = any> = FC<{
  className?: string;
  data: IItemWithChildren<T>[];
  /** Displayed in headers */
  columns: IRoughTableColumn<T>[];
  rowPadding?: number;
  cellClassName?: string;

  rowKey?: keyof T;
  selectedKeys?: string[];
  onRowClick?: (record: any) => void;

  pageOptions?: PaginationProps;

  /** Default locale is "no data" */
  emptyLocale?: string;
  /** Display empty symbol rather than set it transparent */
  showEmptySymbol?: boolean;
  wholeBorders?: boolean;

  isLoading?: boolean;
}>;

let expandChildren = (xs: IItemWithChildren<any>[], path: number[], foldingState: ISimpleObject): any[] => {
  return flatMap(xs, (x, idx) => {
    if (foldingState[path.join("_")]) {
      return [];
    } else {
      return [x.item].concat(expandChildren(x.children, path.concat([idx]), foldingState));
    }
  });
};

let findPathInTree = (x: any, tree: IItemWithChildren<any>[]): number[] => {
  for (let idx = 0; idx < (tree ?? []).length; idx++) {
    let child = tree[idx];
    if (child.item === x) {
      return [idx];
    } else {
      let childPath = findPathInTree(x, child.children);
      if (childPath.length > 0) {
        return [idx].concat(childPath);
      }
    }
  }
  return [];
};

let detectRecordChildren = (x: any, tree: IItemWithChildren<any>[]): boolean => {
  for (let idx = 0; idx < (tree ?? []).length; idx++) {
    let child = tree[idx];
    if (child.item === x) {
      return child.children != null && child.children.length > 0;
    } else {
      let childResult = detectRecordChildren(x, child.children);
      if (childResult != null) {
        return childResult;
      }
    }
  }
  return undefined;
};

let detectFolded = (path: number[], state: ISimpleObject): boolean => {
  if (path.length === 0) {
    return false;
  }
  if (state[path.join("_")]) {
    return true;
  }
  return detectFolded(path.slice(0, path.length - 1), state);
};

let DepthContext = createContext(0);
interface IFoldContext {
  hasChildren: boolean;
  folded: boolean;
  setFolded(newState: boolean | ((v: boolean) => boolean)): void;
}
let FoldContext = createContext<IFoldContext>({ hasChildren: false, folded: false, setFolded() {} });

type RoughTreeTableRowProps<T = any> = FC<{
  item: T;
  children?: IItemWithChildren<T>[];
  depth: number;
  folded?: boolean;
  indexMap: WeakMap<object, number>;
}>;

let RoughTreeTableRow: RoughTreeTableRowProps = (props) => {
  let hasChildren = props.children?.length > 0;
  let [folded, setFolded] = useState(false);
  return (
    <>
      <FoldContext.Provider value={{ hasChildren, folded, setFolded }}>
        {!props.folded && <RoughTableRow record={props.item} index={props.indexMap.get(props.item)} />}
      </FoldContext.Provider>
      <DepthContext.Provider value={props.depth + 1}>
        {props.children?.map((row, idx) => (
          <RoughTreeTableRow
            key={idx}
            item={row.item}
            children={row.children}
            depth={props.depth + 1}
            folded={props.folded || folded}
            indexMap={props.indexMap}
          />
        ))}
      </DepthContext.Provider>
    </>
  );
};

type HeadColumnProps<T = any> = FC<{
  value: T[keyof T];
  record: T;
  index: number;
}>;

let HeadColumn: HeadColumnProps = ({ value, index }) => {
  let depth = useContext(DepthContext);
  let { hasChildren, folded, setFolded } = useContext(FoldContext);
  return (
    <div className={cx(rowMiddle, styleCell)}>
      <div style={{ width: depth * 28 }} className={styleSpace} />
      <span
        className={styleFold}
        onClick={() => {
          setFolded((v) => !v);
        }}
      >
        {hasChildren ? (folded ? roughTreePreset.foldedSymbol : roughTreePreset.unfoldedSymbol) : ""}
      </span>
      <Space width={8} />
      {value}
    </div>
  );
};

let RoughTreeTable: RoughTreeTableProps = React.memo((props) => {
  // let [foldingState, updateFoldingState] = useImmer({});

  /** Methods */
  /** Effects */
  /** Renderers */

  // let expandedData = expandChildren(props.data, [], foldingState);
  let indexMap = useMemo(() => {
    let index = 0;
    let weakMap = new WeakMap();
    const map = (arr) => {
      arr?.forEach((data) => {
        weakMap.set(data.item, index);
        index += 1;
        map(data.children);
      });
    };
    map(props.data);
    return weakMap;
  }, [props.data]);

  let headColumn: IRoughTableColumn = {
    ...props.columns[0],
    dataIndex: props.columns[0].dataIndex as any, // TODO
    render: (value, record, idx) => {
      if (props.columns[0].render != null) {
        value = props.columns[0].render(value, record, idx);
      }

      return <HeadColumn value={value} record={record} index={idx} />;
    },
  };
  let expandedColumns = [headColumn].concat(props.columns.slice(1));

  return (
    <RoughDivTable {...props} data={null} columns={expandedColumns}>
      {props.data?.map((row, index) => (
        <RoughTreeTableRow key={index} item={row.item} children={row.children} depth={0} indexMap={indexMap} />
      ))}
    </RoughDivTable>
  );
});

export default RoughTreeTable;

let styleSpace = css`
  display: inline-block;
  height: 1px;
`;

let styleFold = css`
  color: hsla(0, 0%, 59%, 1);
  cursor: pointer;
  font-size: 12px;
  display: inline-block;
  width: 16px;
`;

let styleCell = css`
  max-width: 100%;
`;
