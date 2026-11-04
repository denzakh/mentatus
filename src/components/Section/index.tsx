import React, { Component } from "react";
import type { ComponentType } from "react";
import { connect } from "react-redux";
import { collectVisibility, blockKey } from "../../lib/layout";
import { areStatePropsEqual } from "../../lib/redux";
import Field from "../Field";
import Group from "../Group";
import type { Layout, LayoutBlock } from "../../types/layout";
import type { Schema } from "../../types/schema";
import type { SectionName, StatusState } from "../../types/status";

/*
Section
рендер формы раздела по декларативному layout (см. `src/store/*Layout.js`)

принимает:
section    - имя среза стора (state[section])
dataBase   - схема раздела (*Data.js)
layout     - массив блоков раскладки
components - карта custom-блоков { имя: компонент }

Новые поля в layout добавляются без правки компонентов: тип берётся из схемы.
Условия видимости (`visibleWhen`) считаются в mapStateToProps, поэтому
перерисовка происходит только при изменении самих условий.
*/

interface OwnProps {
  section: SectionName;
  dataBase: Schema;
  layout: Layout;
  components?: Record<string, ComponentType<{ dataBase?: Schema }>>;
}

interface StateProps {
  visible: Record<string, boolean>;
}

type Props = OwnProps & StateProps;

class Section extends Component<Props> {
  render() {
    return <div>{this.renderBlocks(this.props.layout, [])}</div>;
  }

  renderBlocks(blocks: LayoutBlock[] | undefined, path: number[]) {
    return (blocks || []).map((block, index) =>
      this.renderBlock(block, path.concat(index))
    );
  }

  renderBlock(block: LayoutBlock, path: number[]): React.ReactNode {
    const key = blockKey(path);
    const dataBase = block.dataBase || this.props.dataBase;

    if (block.visibleWhen && !this.props.visible[key]) {
      return null;
    }

    switch (block.type) {
      case "row":
      case "col":
      case "box":
        return (
          <div key={key} className={block.className}>
            {block.title ? (
              <div className="list__title">{block.title}</div>
            ) : null}
            {this.renderBlocks(block.blocks, path)}
          </div>
        );

      case "title":
        return (
          <div key={key} className={block.className || "list__title"}>
            {block.label ? (
              <span className={block.labelClassName || "list__title-lable"}>
                {block.label}
              </span>
            ) : (
              block.text
            )}
            {this.renderBlocks(block.blocks, path)}
          </div>
        );

      case "field":
        return (
          <Field
            key={key}
            name={block.name}
            dataBase={dataBase}
            component={block.component}
            label={block.label}
            style={block.style}
          />
        );

      case "group":
        return (
          <Group
            key={key}
            cicle={block.cicle}
            dataBase={dataBase}
            itemClassName={block.itemClassName}
            autoKritika={block.autoKritika}
          />
        );

      case "custom":
        return this.renderCustom(block, key, dataBase);

      case "br":
        return <br key={key} />;

      default:
        return null;
    }
  }

  // нестандартный блок раздела (NachaloManager, OrientirovkaManager, ...)
  renderCustom(block: LayoutBlock, key: string, dataBase: Schema | undefined) {
    const components = this.props.components || {};
    const Custom = block.component ? components[block.component] : undefined;

    if (!Custom) {
      return null;
    }

    return <Custom key={key} dataBase={dataBase} />;
  }
}

function mapStateToProps(
  state: StatusState,
  ownProps: OwnProps
): StateProps {
  return {
    visible: collectVisibility(ownProps.layout, state[ownProps.section] || {})
  };
}

export default connect<StateProps, unknown, OwnProps>(
  mapStateToProps,
  null,
  null,
  { areStatePropsEqual }
)(Section);
