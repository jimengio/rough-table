/** Table which supports horizontal scrolling.
 * code splitted from DivTable
 */

import React, { ReactNode, FC, CSSProperties } from "react";
import { css, cx } from "emotion";
import { center, column, flex, rowParted, row, immerMerge } from "@jimengio/shared-utils";
import { Pagination } from "antd";
import JimoIcon, { EJimoIcon } from "@jimengio/jimo-icons";
import { PaginationProps } from "antd/lib/pagination";
import { IRoughTableColumn } from "./rough-div-table";
import { any } from "prop-types";

type ScrollDivTableProps<T = any> = FC<{
  className?: string;
  data: { [k: string]: T }[];
  /** Displayed in headers */
  columns: IRoughTableColumn<T>[];
  rowPadding?: number;
  styleCell?: string;
  wholeBorders?: boolean;
  /** Display empty symbol rather than set it transparent */
  showEmptySymbol?: boolean;
  selectedKeys?: string[];
  rowKey?: string;
  onRowClick?: (record: any) => void;
  setRowClassName?: (record: any) => string;
  pageOptions?: PaginationProps;
  /** Default locale is "no data" */
  emptyLocale?: string;
}>;

let ScrollDivTable: ScrollDivTableProps = (props) => {
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

  let renderNoData = () => {
    return (
      <div className={cx(center, padding16, styleEmpty)}>
        <JimoIcon name={EJimoIcon.emptyData} className={styleEmptyIcon} />
        <span>{props.emptyLocale || "No data"}</span>
      </div>
    );
  };

  const { selectedKeys, rowPadding = 80, showEmptySymbol, rowKey = "id" } = props;
  let columns = props.columns.filter((col) => col != null && !col.hidden);

  let hasData = props.data.length > 0;

  let getColumnWidthStyle = (idx: number): CSSProperties => {
    let width = columns[idx].width;

    if (width != null) {
      return { width };
    } else {
      return { flexGrow: 1 };
    }
  };

  let rowPaddingStyle = {};
  if (rowPadding != null) {
    rowPaddingStyle = { paddingLeft: rowPadding, paddingRight: rowPadding };
  }

  let headElement = (
    <div className={cx(row, styleRow, styleHeaderBar)} style={rowPaddingStyle}>
      {columns.map((col, idx) => {
        return (
          <div key={idx} className={cx(styleCell, props.styleCell, col.className)} style={immerMerge(col.style || {}, getColumnWidthStyle(idx))}>
            {col.title || <span className={styleEmptyCell}>_</span>}
          </div>
        );
      })}
    </div>
  );

  let bodyElement: any = renderNoData();

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
              value = columnConfig.render(value, record);
            }

            return (
              <div
                key={colIdx}
                className={cx(styleCell, props.styleCell, columnConfig.className)}
                style={immerMerge(columnConfig.style || {}, getColumnWidthStyle(colIdx))}
              >
                {value != null ? value : <span className={cx(styleEmptyCell, showEmptySymbol ? null : styleTransparent)}>-</span>}
              </div>
            );
          })}
        </div>
      );
    });
  }

  return (
    <div className={cx(flex, column, styleContainer, props.wholeBorders ? styleWholeBorders : null, props.className)}>
      <div className={cx(flex, column)}>
        <div className={styleContentArea}>
          {headElement}
          <div className={styleBody}>{bodyElement}</div>
        </div>
      </div>
      {props.pageOptions != null ? renderPagination() : null}
    </div>
  );
};

export default ScrollDivTable;

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
`;

const styleBody = css`
  color: rgba(0, 0, 0, 0.65);
`;

const styleRow = css`
  &:hover {
    background-color: #e6f7ff;
  }

  padding-left: 80px;
  border-bottom: 1px solid #e5e5e5;

  width: 100%;
`;

let styleWholeBorders = css`
  border-left: 1px solid #e5e5e5;
  border-right: 1px solid #e5e5e5;
`;

const styleCursorPointer = css`
  cursor: pointer;
`;

const styleEmpty = css`
  color: #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  font-size: 12px;
`;

const styleEmptyCell = css`
  user-select: none;
`;

let styleTransparent = css`
  color: transparent;
`;

const styleContainer = null;

const styleSelectedRow = css`
  background-color: #e6f7ff;
`;

let padding16 = css`
  padding: 16px;
`;

let stylePageArea = css`
  padding: 16px 8px;
`;

let styleEmptyIcon = css`
  font-size: 80px;
  margin-bottom: 8px;
`;

/** requires Chrome 46 */
let styleContentArea = css`
  min-width: max-content;
`;
