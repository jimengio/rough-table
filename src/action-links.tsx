import React, { FC } from "react";
import { css, cx } from "emotion";
import { interpose } from "./util/list";
import Space from "./space";
import { GlobalThemeVariables } from "./theme";

export interface IActionLinkItem {
  text: string;
  /** hidden or null item to skip rendering the link */
  hidden?: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  "data-action"?: string;
}

let ActionLinks: FC<{
  actions: IActionLinkItem[];
  className?: string;
  spaced?: boolean;
}> = (props) => {
  let actions = props.actions.filter((x) => {
    if (x == null) return false;
    if (x.hidden != null && x.hidden === true) return false;
    return true;
  });

  let configuredProps = ActionLinks.defaultProps;

  // null for rendering spaces...
  let items: IActionLinkItem[] = interpose(actions, null);

  let spaced = props.spaced != null ? props.spaced : configuredProps.spaced;

  return (
    <div className={cx(styleContainer, props.className)}>
      {items.map((item, idx) => {
        if (item == null) {
          if (spaced) {
            return <Space key={idx} width={GlobalThemeVariables.actionLinksSpaceSeparatorWidth || 8} />;
          } else {
            return <span key={idx} className={styleSeparator} />;
          }
        } else {
          return (
            <a className={cx(styleLink, GlobalThemeVariables.actionLinkItem)} key={idx} onClick={item.onClick} data-action={item["data-action"] || item.text}>
              {item.text}
            </a>
          );
        }
      })}
    </div>
  );
};

let customizableDefaultProps = {
  /** 使用空白作为分隔符 */
  spaced: false,
};

ActionLinks.defaultProps = customizableDefaultProps;

/** 配置页面级别的 ActionLinks 默认属性 */
export let configureActionLinksProps = (options: Partial<typeof customizableDefaultProps>) => {
  Object.assign(ActionLinks.defaultProps, options);
};

export default ActionLinks;

const styleSeparator = css`
  margin: 0 8px;
  width: 1px;
  height: 14px;
  background-color: #e8e8e8;
  display: inline-block;
`;

let styleLink = css`
  font-size: 14px;
  color: #3674ff;
  cursor: pointer;
  &:hover {
    color: #729dff;
  }
`;

let styleContainer = css`
  display: inline-block;
`;
