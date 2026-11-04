import React, { Component } from "react";
import { connect } from "react-redux";
import { collectVisibility, blockKey } from "../../lib/layout";
import { areStatePropsEqual } from "../../lib/redux";
import Field from "../Field";
import Group from "../Group";

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

class Section extends Component {
  render() {
    return <div>{this.renderBlocks(this.props.layout, [])}</div>;
  }

  renderBlocks(blocks, path) {
    return (blocks || []).map((block, index) =>
      this.renderBlock(block, path.concat(index))
    );
  }

  renderBlock(block, path) {
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
  renderCustom(block, key, dataBase) {
    const components = this.props.components || {};
    const Custom = components[block.component];

    if (!Custom) {
      return null;
    }

    return <Custom key={key} dataBase={dataBase} />;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    visible: collectVisibility(ownProps.layout, state[ownProps.section] || {})
  };
}

export default connect(mapStateToProps, null, null, { areStatePropsEqual })(
  Section
);
