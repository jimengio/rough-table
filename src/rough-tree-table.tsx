import React, { FC, useState, ReactNode } from "react";
import { css } from "emotion";
import { flatMap } from "lodash-es";
import { useImmer } from "use-immer";

import RoughDivTable, { IRoughTableColumn } from "./rough-div-table";
import { PaginationProps } from "antd/lib/pagination";
import { Space } from "@jimengio/flex-styles";
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

let RoughTreeTable: RoughTreeTableProps = React.memo((props) => {
  let [foldingState, updateFoldingState] = useImmer({});

  /** Methods */
  /** Effects */
  /** Renderers */

  let expandedData = expandChildren(props.data, [], foldingState);

  let headColumn: IRoughTableColumn = {
    ...props.columns[0],
    dataIndex: props.columns[0].dataIndex as any, // TODO
    render: (value, record, idx) => {
      let treePath = findPathInTree(record, props.data);

      let stringPath = treePath.join("_");
      let folded = foldingState[stringPath];

      let hasChildren = detectRecordChildren(record, props.data);

      if (props.columns[0].render != null) {
        value = props.columns[0].render(value, record, idx);
      }

      return (
        <div>
          <div style={{ width: (treePath.length - 1) * 28 }} className={styleSpace} />
          <span
            className={styleFold}
            onClick={() => {
              updateFoldingState((draft) => {
                draft[stringPath] = !folded;
              });
            }}
          >
            {hasChildren ? (folded ? roughTreePreset.foldedSymbol : roughTreePreset.unfoldedSymbol) : ""}
          </span>
          <Space width={8} />
          {value}
        </div>
      );
    },
  };
  let expandedColumns = [headColumn].concat(props.columns.slice(1));

  return <RoughDivTable {...props} data={expandedData} columns={expandedColumns} />;
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
