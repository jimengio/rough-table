/** DivTable layouts with Flexbox
 * to render data with plenty of columns, use ScrollTable
 */

import React, { FC, ReactNode, CSSProperties } from "react";
import { css, cx } from "emotion";
import { center, column, flex, rowParted, row, expand } from "@jimengio/shared-utils";
import { Pagination } from "antd";
import { PaginationProps } from "antd/lib/pagination";
import { ISimpleObject } from "./types";
import NoDataTableBody, { mergeStyles, getWidthStyle, EmptyCell } from "./common";

export interface IRoughTableColumn<T = ISimpleObject> {
  title: ReactNode;
  hidden?: boolean;
  width?: number | string;
  className?: string;
  style?: CSSProperties;
  dataIndex: keyof T;
  /** cell renderer in body
   * @param value
   * @param record, data of item
   * @param itemIndex, index of item in data list
   */
  render?: (value: any, record: T, itemIndex?: number) => ReactNode;
}

type RoughDivTableProps<T = any> = FC<{
  className?: string;
  data: T[];
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
}>;

let RoughDivTable: RoughDivTableProps = (props) => {
  /** Methods */
  /** Effects */
  /** Renderers */

  let renderPagination = () => {
    let { pageOptions } = props;
    return (
      <div className={stylePageArea}>
        <div className={rowParted}>
          <span />
          <Pagination
            size={pageOptions.size || "small"}
            showQuickJumper={pageOptions.showQuickJumper != null ? pageOptions.showQuickJumper : true}
            {...pageOptions}
          />
        </div>
      </div>
    );
  };

  const { selectedKeys, rowPadding = 24, showEmptySymbol, rowKey = "id" } = props;
  let columns = props.columns.filter((col) => col != null && !col.hidden);

  let hasData = props.data.length > 0;

  let rowPaddingStyle = {};
  if (rowPadding != null) {
    rowPaddingStyle = { paddingLeft: rowPadding, paddingRight: rowPadding };
  }

  let headElement = (
    <div className={cx(row, styleRow, styleHeaderBar)} style={rowPaddingStyle}>
      {columns.map((columnConfig, idx) => {
        return (
          <div
            key={idx}
            className={cx(styleCell, props.cellClassName, columnConfig.className)}
            style={mergeStyles(columnConfig.style, getWidthStyle(columnConfig.width))}
          >
            {columnConfig.title || <EmptyCell showSymbol />}
          </div>
        );
      })}
    </div>
  );

  let bodyElement: ReactNode = <NoDataTableBody emptyLocale={props.emptyLocale} />;

  if (hasData) {
    bodyElement = props.data.map((record, idx) => {
      let rowClassName: string;
      if (selectedKeys != null && selectedKeys.includes(record[rowKey])) {
        rowClassName = styleSelectedRow;
      }

      return (
        <div
          key={idx}
          className={cx(row, styleRow, props.onRowClick != null && styleCursorPointer, rowClassName)}
          style={rowPaddingStyle}
          onClick={props.onRowClick != null ? () => props.onRowClick(record) : null}
        >
          {props.columns.map((columnConfig, colIdx) => {
            let value = record[columnConfig.dataIndex as string];
            if (columnConfig.render != null) {
              value = columnConfig.render(value, record, idx);
            }
            return (
              <div key={colIdx} className={cx(styleCell, props.cellClassName)} style={mergeStyles(getWidthStyle(columnConfig.width), columnConfig.style)}>
                {value == null || value === "" ? <EmptyCell showSymbol={showEmptySymbol} /> : value}
              </div>
            );
          })}
        </div>
      );
    });
  }

  return (
    <div className={cx(flex, column, props.wholeBorders ? styleWholeBorders : null, props.className)}>
      {headElement}
      <div className={cx(styleBody)}>{bodyElement}</div>
      {props.pageOptions != null ? renderPagination() : null}
    </div>
  );
};

export default RoughDivTable;

const styleCell = css`
  padding: 10px 8px;
  line-height: 20px;
  flex-basis: 100px;
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const styleHeaderBar = css`
  font-weight: bold;
  background-color: #f2f2f2;
  border: none;
  border-bottom: 1px solid #e5e5e5;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const styleBody = css`
  color: rgba(0, 0, 0, 0.65);
  flex-grow: 1;
`;

const styleRow = css`
  padding-left: 80px;
  border-bottom: 1px solid #e5e5e5;

  width: 100%;

  &:hover {
    background-color: #e6f7ff;
  }
`;

let styleWholeBorders = css`
  border-left: 1px solid #e5e5e5;
  border-right: 1px solid #e5e5e5;
`;

const styleCursorPointer = css`
  cursor: pointer;
`;

const styleSelectedRow = css`
  background-color: #e6f7ff;
`;

let stylePageArea = css`
  padding: 16px 8px;
`;

/** requires Chrome 46 */
let styleContentArea = css`
  min-width: max-content;
`;
