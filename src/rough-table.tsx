/** 旧版本的基于 table 实现的表单.
 * 老代码当中引用比较多, 目前不打算进行更改, 避免影响业务.
 */

import React, { ReactNode } from "react";
import produce from "immer";
import { css, cx } from "emotion";
import { center, column, flex, rowParted } from "@jimengio/flex-styles";
import Pagination from "antd/lib/pagination";
import Space from "./space";
import { PaginationProps } from "antd/lib/pagination";
import NoDataTableBody from "./common";

interface IColumnDefinition {
  title: string;
  render: (idx?: number) => string | ReactNode;
}

interface IProps {
  className?: string;
  dataSource: { [k: string]: any }[];
  labels?: (string | ReactNode)[];
  renderColumns?: (record: any) => (string | ReactNode)[];
  defineColumns?: (x: any) => IColumnDefinition[];
  styleCell?: string;
  autoLayout?: boolean;
  selectedKeys?: string[];
  rowKey?: string;
  onRowClick?: (record: any) => void;
  setRowClassName?: (record: any) => string;
  pageOptions?: PaginationProps;
  emptyLocale?: string;
}

interface IState {}

export let wrapCol = (title: string, render: () => string | ReactNode) => ({ title, render });

export default class RoughTable extends React.Component<IProps, IState> {
  render() {
    const { selectedKeys, rowKey = "id" } = this.props;

    let hasData = this.props.dataSource.length > 0;

    let labels;
    if (typeof this.props.defineColumns === "function") {
      labels = this.props.defineColumns({}).map((x) => x.title);
    } else {
      labels = this.props.labels;
    }

    let headElement = (
      <thead className={styleHeaderBar}>
        <tr>
          {labels.map((label, idx) => {
            return (
              <th key={idx}>
                <div className={cx(styleCell, this.props.styleCell)}>{label || <span className={styleEmptyCell}>_</span>}</div>
              </th>
            );
          })}
        </tr>
      </thead>
    );

    let bodyElement = (
      <tbody className={styleBody}>
        {hasData
          ? this.props.dataSource.map((record, idx) => {
              let cells;

              if (typeof this.props.defineColumns === "function") {
                cells = this.props.defineColumns(record).map((x) => x.render(idx));
              } else {
                cells = this.props.renderColumns(record);
              }

              let rowClassName;
              if (selectedKeys != null && selectedKeys.includes(record[rowKey])) {
                rowClassName = styleSelectedRow;
              }

              return (
                <tr
                  key={idx}
                  className={cx(styleRow, this.props.onRowClick != null && styleCursorPointer, rowClassName)}
                  onClick={this.props.onRowClick != null ? () => this.props.onRowClick(record) : null}
                >
                  {cells.map((cell, cellIdx) => {
                    return (
                      <td key={cellIdx}>
                        <div className={cx(styleCell, this.props.styleCell)}>{cell || <span className={styleEmptyCell}>-</span>}</div>
                      </td>
                    );
                  })}
                </tr>
              );
            })
          : this.renderNoData()}
      </tbody>
    );

    if (this.props.autoLayout) {
      return (
        <div className={this.props.className}>
          <table className={styleTable}>
            {headElement}
            {bodyElement}
          </table>
          {this.props.pageOptions != null ? this.renderPagination() : null}
        </div>
      );
    }

    return (
      <div className={cx(flex, column, styleTableContainer, this.props.className)}>
        <table className={styleFixedTable}>{headElement}</table>
        <div className={cx(flex, styleBodyContainer)}>
          <table className={styleFixedTable}>{bodyElement}</table>
        </div>
        {this.props.pageOptions != null ? this.renderPagination() : null}
      </div>
    );
  }

  renderPagination() {
    let { pageOptions } = this.props;
    return (
      <>
        <Space height={16} />
        <div className={rowParted}>
          <span />
          <Pagination
            size={pageOptions.size || "small"}
            showQuickJumper={pageOptions.showQuickJumper != null ? pageOptions.showQuickJumper : true}
            {...pageOptions}
          />
        </div>
      </>
    );
  }

  renderNoData() {
    let length;
    if (typeof this.props.defineColumns === "function") {
      length = this.props.defineColumns({}).length;
    } else {
      length = this.props.labels.length;
    }
    return (
      <tr>
        <td colSpan={length}>
          <NoDataTableBody emptyLocale={this.props.emptyLocale} />
        </td>
      </tr>
    );
  }
}

const styleTable = css`
  width: 100%;
  font-size: 14px;
`;

const styleFixedTable = css`
  width: 100%;
  font-size: 14px;
  table-layout: fixed;
`;

const styleCell = css`
  padding: 12px 8px;
  line-height: 21px;
`;

const styleHeaderBar = css`
  background-color: #fafafa;
`;

const styleBody = css`
  color: rgba(0, 0, 0, 0.65);
`;

const styleRow = css`
  &:hover {
    background-color: #e6f7ff;
  }

  border-bottom: 1px solid #e5e5e5;
`;

const styleCursorPointer = css`
  cursor: pointer;
`;

const styleEmptyCell = css`
  color: transparent;
  user-select: none;
`;

const styleTableContainer = null;

const styleBodyContainer = css`
  overflow: auto;
`;

const styleSelectedRow = css`
  background-color: #e6f7ff;
`;
