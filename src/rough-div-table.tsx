/** DivTable layouts with Flexbox
 * to render data with plenty of columns, use ScrollTable
 */

import React, { FC, ReactNode, CSSProperties, useRef } from "react";
import { css, cx } from "emotion";
import { center, column, flex, rowParted, row, expand } from "@jimengio/shared-utils";
import Pagination from "antd/lib/pagination";
import { PaginationProps } from "antd/lib/pagination";
import { ISimpleObject } from "./types";
import NoDataTableBody, { mergeStyles, getWidthStyle, EmptyCell } from "./common";
import { LoadingIndicator } from "@jimengio/jimo-basics";
import { CSSTransition } from "react-transition-group";

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
  bodyClassName?: string;

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

let RoughDivTable: RoughDivTableProps = (props) => {
  let scrollRef = useRef<HTMLDivElement>();
  let headerRef = useRef<HTMLDivElement>();

  /** Methods */

  let handleScroll = () => {
    let leftOffset = scrollRef.current.scrollLeft;
    headerRef.current.scrollLeft = leftOffset;
  };

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

  let headElements = (
    <div className={cx(row, styleRow, styleHeaderBar)} style={rowPaddingStyle} ref={headerRef}>
      {columns.map((columnConfig, idx) => {
        return (
          <div
            key={idx}
            className={cx(styleCell, props.cellClassName, columnConfig.className)}
            style={mergeStyles(getWidthStyle(columnConfig.width), columnConfig.style)}
          >
            {columnConfig.title || <EmptyCell showSymbol />}
          </div>
        );
      })}
    </div>
  );

  let bodyElements: ReactNode = props.isLoading ? <div className={styleLoadingEmpty} /> : <NoDataTableBody emptyLocale={props.emptyLocale} />;

  if (hasData) {
    bodyElements = props.data.map((record, idx) => {
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
          {columns.map((columnConfig, colIdx) => {
            let value = record[columnConfig.dataIndex as string];
            if (columnConfig.render != null) {
              value = columnConfig.render(value, record, idx);
            }
            return (
              <div
                key={colIdx}
                className={cx(styleCell, props.cellClassName, columnConfig.className)}
                style={mergeStyles(getWidthStyle(columnConfig.width), columnConfig.style)}
              >
                {value == null || value === "" ? <EmptyCell showSymbol={showEmptySymbol} /> : value}
              </div>
            );
          })}
        </div>
      );
    });
  }

  return (
    <div className={cx(flex, column, styleTable, props.wholeBorders ? styleWholeBorders : null, props.className)}>
      {headElements}
      <div ref={scrollRef} className={cx(styleBody, props.bodyClassName)} onScroll={(event) => handleScroll()}>
        {bodyElements}
      </div>
      {props.pageOptions != null ? renderPagination() : null}
      <CSSTransition in={props.isLoading} timeout={200} classNames="fade-in-out" unmountOnExit>
        <div className={cx(center, styleCover)}>
          <LoadingIndicator />
        </div>
      </CSSTransition>
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
  display: flex;
  align-items: center;
`;

const styleHeaderBar = css`
  font-weight: bold;
  background-color: #f2f2f2;
  border: none;
  border-bottom: 1px solid #e5e5e5;
  overflow: hidden;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const styleBody = css`
  color: rgba(0, 0, 0, 0.65);
  flex: 1;
  overflow-y: auto;
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

let styleTable = css`
  position: relative;

  .fade-in-out-enter {
    opacity: 0;
  }
  .fade-in-out-enter-active {
    opacity: 1;
    transition: opacity 200ms;
  }
  .fade-in-out-exit {
    opacity: 1;
  }
  .fade-in-out-exit-active {
    opacity: 0;
    transition: opacity 200ms;
  }
`;

let styleCover = css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: hsla(0, 0%, 100%, 0.65);
`;

let styleLoadingEmpty = css`
  min-height: 80px;
`;
