/** DivTable layouts with Flexbox
 * to render data with plenty of columns, use ScrollTable
 */

import React, { FC, ReactNode, CSSProperties, useRef, useState, useEffect } from "react";
import { css, cx } from "emotion";
import { center, column, flex, rowParted, row, expand } from "@jimengio/shared-utils";
import Pagination from "antd/lib/pagination";
import { PaginationProps } from "antd/lib/pagination";
import { ISimpleObject } from "./types";
import NoDataTableBody, { mergeStyles, getWidthStyle, EmptyCell } from "./common";
import { LoadingIndicator, ClampText, IClampTextProps } from "@jimengio/jimo-basics";
import { CSSTransition } from "react-transition-group";

interface IColumnClampTextProps extends Partial<IClampTextProps> {
  text?: React.ReactNode;
}

export interface IRoughTableColumn<T = ISimpleObject> {
  title: ReactNode;
  hidden?: boolean;
  clampText?: boolean;
  clampTextProps?: IColumnClampTextProps;
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

let configuredProps = {
  rowPadding: 24,
  emptyLocale: undefined,
  showEmptySymbol: false,
  wholeBorders: false,
  loadingElement: undefined,
};

/** 页面级别添加 DivTable 组件的默认值 */
export let configureDivTableProps = (props: Partial<typeof configuredProps>) => {
  Object.assign(configuredProps, props);
};

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
  loadingElement?: React.ReactNode;

  /** detect and watch row width, try to make sure container div covers the whole row.
   * watching window resize might casuse performance issues. be careful in using.
   */
  watchRowResizing?: boolean;
}>;

let RoughDivTable: RoughDivTableProps = (props) => {
  let scrollRef = useRef<HTMLDivElement>();
  let headerRef = useRef<HTMLDivElement>();

  let [rowMinWidth, setRowMinWidth] = useState(0);

  /** Methods */

  let handleScroll = () => {
    let leftOffset = scrollRef.current.scrollLeft;
    headerRef.current.scrollLeft = leftOffset;
  };

  let checkRowWidth = () => {
    let someMinWidth: number;
    if (headerRef.current.scrollWidth > headerRef.current.clientWidth) {
      someMinWidth = headerRef.current.scrollWidth;
    }
    setRowMinWidth(someMinWidth);
  };

  /** Effects */

  useEffect(() => {
    if (props.watchRowResizing) {
      checkRowWidth();
    }
  });

  useEffect(() => {
    if (props.watchRowResizing) {
      let onResize = () => {
        checkRowWidth();
      };
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
      };
    }
  }, []);

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

  const { selectedKeys, rowPadding = configuredProps.rowPadding, rowKey = "id" } = props;
  let columns = props.columns.filter((col) => col != null && !col.hidden);

  let hasData = props.data.length > 0;

  let rowPaddingStyle: CSSProperties = {};
  if (rowPadding != null) {
    rowPaddingStyle = { paddingLeft: rowPadding, paddingRight: rowPadding };
  }

  let showEmptySymbol = props.showEmptySymbol != null ? props.showEmptySymbol : configuredProps.showEmptySymbol;
  let wholeBorders = props.wholeBorders != null ? props.wholeBorders : configuredProps.wholeBorders;

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

  let bodyElements: ReactNode = props.isLoading ? (
    <div className={styleLoadingEmpty} />
  ) : (
    <NoDataTableBody emptyLocale={props.emptyLocale || configuredProps.emptyLocale} />
  );

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
          style={Object.assign({ minWidth: rowMinWidth }, rowPaddingStyle)}
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
                {value == null || value === "" ? (
                  <EmptyCell showSymbol={showEmptySymbol} />
                ) : (
                  <>{columnConfig.clampText ? <ClampText addTooltip={true} {...columnConfig.clampTextProps} text={value} /> : value}</>
                )}
              </div>
            );
          })}
        </div>
      );
    });
  }

  return (
    <div className={cx(flex, column, styleTable, wholeBorders ? styleWholeBorders : null, props.className)}>
      {headElements}
      <div ref={scrollRef} className={cx(styleBody, props.bodyClassName)} onScroll={(event) => handleScroll()}>
        {bodyElements}
      </div>
      {props.pageOptions != null ? renderPagination() : null}
      {props.isLoading ? (
        <>
          {configuredProps.loadingElement ? (
            <div className={cx(center, styleCover)}>{configuredProps.loadingElement}</div>
          ) : (
            <>
              {props.loadingElement ? (
                <div className={cx(center, styleCover)}>{props.loadingElement}</div>
              ) : (
                <CSSTransition in={props.isLoading} timeout={200} classNames="fade-in-out" unmountOnExit>
                  <div className={cx(center, styleCover)}>
                    <LoadingIndicator />
                  </div>
                </CSSTransition>
              )}
            </>
          )}
        </>
      ) : null}
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
  background-color: hsla(0, 0%, 97%, 1);
  border: none;
  border-bottom: 1px solid hsla(216, 14%, 93%, 1);
  overflow: hidden;
  color: hsla(0, 0%, 20%, 1);

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
  border-bottom: 1px solid hsla(0, 0%, 91%, 1);
  width: 100%;
  color: hsla(0, 0%, 20%, 1);
  transition: 240ms;

  &:hover {
    background-color: hsla(220, 53%, 97%, 1);
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
  background-color: hsla(220, 53%, 97%, 1);
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
