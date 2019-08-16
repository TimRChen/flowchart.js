[![GitHub stars](https://img.shields.io/github/stars/TimRChen/flowchart-core.svg?style=flat-square)](https://github.com/TimRChen/flowchart-core/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/TimRChen/flowchart-core.svg?style=flat-square)](https://github.com/TimRChen/flowchart-core/issues)
[![GitHub forks](https://img.shields.io/github/forks/TimRChen/flowchart-core.svg?style=flat-square)](https://github.com/TimRChen/flowchart-core/network)
[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square)](https://github.com/TimRChen/flowchart-core)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/TimRChen/flowchart-core)

[![NPM](https://nodei.co/npm/flowchart-core.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/flowchart-core)
[![NPM](https://nodei.co/npm-dl/flowchart-core.png?months=3)](https://www.npmjs.com/package/flowchart-core)

# flowchart-core

小巧、精悍的 svg 库，可用于快速解决多样复杂的流程配置需求。

-   样例：自定义节点内容

![eg-graph](https://github.com/TimRChen/demo-item-display/blob/master/flowchart-core/example.png)

-   样例：流程配置

![eg-graph-1](https://github.com/TimRChen/demo-item-display/blob/master/flowchart-core/example1.png)

## 特点

可配置两种模式：连接模式&渲染模式

> 连接模式：`快速`配置一个节点间`可拖拽连接`、`移动`节点的流程图

> 渲染模式：`快速`配置一个节点间`不可拖拽连线`、`不可移动`节点用作静态绘制`拓扑`关系的图

## Install

#### NPM

```bash
 $ npm install flowchart-core
```

## Mount

##### mount with global

```html
<!-- html -->
<svg id="svg-container"></svg>
```

```js
import { Core, Node } from 'flowchart-core';
const svgContainer = document.getElementById('svg-container');
// 实例化 Core.
const container = new Core(svgContainer, {
    style: {
        width: 1000,
        height: 600,
        border: '1px dashed #000',
    },
    control: true,
    // ..
});
// 定义 node container 宽 和 高.
const width = 140;
const height = 70;
// 实例化 Node.
const node = new Node({
    position: {
        x: 100,
        y: 50,
    },
    style: {
        width,
        height,
        strokeWidth: 2,
        stroke: 'black',
        cursor: 'grab',
        rx: 10,
    },
});

container.addNode(node);
```

## API Reference

### `new Core(svgElement, options)`

| 属性       | 类型                          | 描述            | 必须 |
| :--------- | :---------------------------- | :-------------- | :--- |
| svgElement | `SvgElement<svg>`             | _Svg DOM 元素_  | `1`  |
| options    | [`coreOptions`](#coreoptions) | _core 配置选项_ | `1`  |

#### `coreOptions`

-   #### 类型: `{ style: {}, line: {}, linkDot: {}, control: false }`

-   #### 参数:

    | 属性    | 类型                                      | 描述                               | 必须 |
    | :------ | :---------------------------------------- | :--------------------------------- | :--- |
    | style   | `stylesheet`                              | _css 样式_                         | `1`  |
    | line    | [`lineObject`](#line-lineobject)          | _连接路径配置_                     | `0`  |
    | linkDot | [`linkDotObject`](#linkdot-linkdotobject) | _连接点配置_                       | `0`  |
    | control | `Boolean`                                 | _(true)连接模式. (false)渲染模式._ | `1`  |

-   #### Usage:

    ```js
    const options = {
        style: {
            width: '100vw',
            height: '100vh',
            border: '1px dashed #000',
        },
        line: {
            style: {
                stroke: 'deepskyblue',
            },
            arrow: {
                style: {
                    fill: 'deepskyblue',
                },
                viewBox: '0 0 18 18',
                d: 'M1,2 L8,6 L1,10 Z',
            },
        },
        linkDot: {
            r: 2,
            fill: 'deepskyblue',
            stroke: 'deepskyblue',
            strokeWidth: 2,
        },
    };
    ```

##### _line_: `lineObject`

连接路径对象.

| 属性  | 类型                                | 描述             | 必须 |
| :---- | :---------------------------------- | :--------------- | :--- |
| style | `stylesheet`                        | _css 样式_       | `0`  |
| arrow | [`arrowObject`](#arrow-arrowobject) | _连接线箭头样式_ | `0`  |

##### _line_->_arrow_: `arrowObject`

| 属性    | 类型         | 描述                                                                                | 必须 |
| :------ | :----------- | :---------------------------------------------------------------------------------- | :--- |
| style   | `stylesheet` | _css 样式_                                                                          | `0`  |
| viewBox | `String`     | _[svg viewBox](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/viewBox)_ | `0`  |

##### _linkDot_: `linkDotObject`

> ##### 目前 `仅` 可以使用下表中的样式

| 属性        | 类型           | 描述                        | 必须 |
| :---------- | :------------- | :-------------------------- | :--- |
| r           | `radius`       | \<circle> _属性 `r` 半径值_ | `0`  |
| fill        | `fill color`   | _色值_                      | `0`  |
| stroke      | `stroke color` | _色值_                      | `0`  |
| strokeWidth | `stroke width` | _像素宽_                    | `0`  |
| display     | `css display`  | _display 值_                | `0`  |

---

### `new Node(config)`

| 属性   | 类型         | 描述       | 必须 |
| :----- | :----------- | :--------- | :--- |
| config | `nodeConfig` | `节点配置` | `1`  |

#### `nodeConfig`

-   #### 类型: `{ style: {}, position: { x, y }, html: { meta } }`
-   #### 参数:

    | 属性     | 类型                                           | 描述                      | 必须 |
    | :------- | :--------------------------------------------- | :------------------------ | :--- |
    | style    | `stylesheet`                                   | _css 样式_                | `1`  |
    | position | [`positionObject`](#nodeconfig-positionobject) | _节点在 Svg 容器中的位置_ | `1`  |
    | html     | [`htmlObject`](#nodeconfig-htmlobject)         | _html 元素_               | `1`  |

-   #### Usage:

    ```js
    const config = {
        position: {
            // 节点在Svg容器中的位置.
            x: 100,
            y: 150,
        },
        style: {
            width: 140,
            height: 70,
        },
        html: {
            meta: '<div>...</div>', // html 元素
        },
    };
    ```

##### _nodeConfig_: `positionObject`

| 属性 | 类型     | 描述                                                                                        | 必须 |
| :--- | :------- | :------------------------------------------------------------------------------------------ | :--- |
| x    | `x axis` | _[MouseEvent.clientX](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/clientX)_ | `1`  |
| y    | `y axis` | _[MouseEvent.clientY](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/clientY)_ | `1`  |

##### _nodeConfig_: `htmlObject`

| 属性 | 类型          | 描述        | 必须 |
| :--- | :------------ | :---------- | :--- |
| meta | `DomInstance` | _html 元素_ | `1`  |

## Methods

#### Core Methods

| 属性                                 | 类型       | 描述                                        |
| :----------------------------------- | :--------- | :------------------------------------------ |
| `addNode`(node)                      | `Function` | _在 Svg 容器中加入节点_                     |
| `edgeData`(edge)                     | `Function` | _获取节点间连线数据. \<path> 属性 `d` 的值_ |
| `deleteNode`(node)                   | `Function` | _删除节点数据并从 SVG 容器中移除节点_       |
| `deleteEdge`(edge)                   | `Function` | _删除连接路径数据并从 SVG 容器中移除路径_   |
| `hiddenSvgElement`(svgElement, type) | `Function` | _隐藏 SVG 元素。枚举值为“node”或“edge”_     |
| `showSvgElement`(svgElement, type)   | `Function` | _显示 SVG 元素。枚举值为“node”或“edge”_     |

#### Node Methods

| prop                       | type       | desc                                                                          |
| :------------------------- | :--------- | :---------------------------------------------------------------------------- |
| `changePosition`(position) | `Function` | _更改 `position` 属性值，传入 [`positionObject`](#nodeconfig-positionobject)_ |

## Class Attributes

> 通过这些暴露参数可以获得`更复杂的效果`

### `Core`

-   #### 参数:

    | 属性         | 类型              | 描述                     |
    | :----------- | :---------------- | :----------------------- |
    | svgContainer | `SvgElement<svg>` | _Svg Dom_                |
    | nodes        | `Array<Object>`   | _node dom list_          |
    | edges        | `Array<Object>`   | _edge dom list_          |
    | nodeG        | `SvgElement<g>`   | _\<g> tag. nodes 的容器_ |
    | edgeG        | `SvgElement<g>`   | _\<g> tag. edges 的容器_ |

-   #### Usage:

    ```js
    // eg. 如何在core实例中插入一条线.
    const coreInstance = new Core(svgContainer, { ... });
    const edgeInstance = new Edge({ ... });
    coreInstance.edgeG.appendChild(edgeInstance.edge);
    ```

### `Node`

-   #### 参数:

| 属性  | 类型             | 描述                                                            |
| :---- | :--------------- | :-------------------------------------------------------------- |
| id    | `Number`         | _unique node id_                                                |
| node  | `SvgElement<g>`  | _节点容器 \<g>. 作为 Dom 节点使用. `可访问它上的所有dom属性值`_ |
| html  | `String`         | _`html 元素嵌入` 在节点内部_                                    |
| style | `css stylesheet` | _节点容器样式_                                                  |

-   #### Usage:

    ```js
    // eg. 如何使得一个节点实例显示或隐藏.
    const nodeInstance = new Node({
        position: {
            x: 100,
            y: 100,
        },
        style: {
            width,
            height,
        },
    });
    // 隐藏.
    Object.assign(nodeInstance.node.style, { display: 'none' });
    // 显示.
    Object.assign(nodeInstance.node.style, { display: 'initial' });
    ```

### `Edge`

-   #### 参数:

    | 属性       | 类型            | 描述                                               |
    | :--------- | :-------------- | :------------------------------------------------- |
    | id         | `Number`        | _unique edge id_                                   |
    | edge       | `SvgElement<g>` | _edge 容器 \<g>_                                   |
    | source     | `Number`        | _连接源节点 ID_                                    |
    | target     | `Number`        | _连接目标节点 ID_                                  |
    | dotLink    | `String`        | 连接点起始位置: top \| bottom\| left \| right      |
    | dotEndLink | `String`        | 连接点终止连接位置: top \| bottom \| left \| right |
    | lineData   | `String`        | _连接路径数据， \<path> 属性 `d`_                  |

-   #### Usage:

    ```js
    // eg. 创建edge实例并添加至svg容器中
    const coreInstance = new Core(svgContainer, { ... })
    const edgeInstance = new Edge({
        style: {
            stroke: 'deepskyblue',
        },
    });
    Object.assign(edgeInstance, {
        source: xNodeInstance.id,
        target: xxNodeInstance.id,
        dotLink: 'bottom',
        dotEndLink: 'top',
    });
    // 关键步骤.
    edgeInstance.lineData = coreInstance.edgeData(edgeInstance);
    coreInstance.edgeG.appendChild(edgeInstance.edge);
    ```

## Example

#### [推荐查看例子 (`如何在渲染模式中内嵌自定义html元素`)](https://github.com/TimRChen/flowchart-core/blob/master/example/example.js)

```js
import { Core, Node } from 'flowchart-core';

const svgContainer = document.getElementById('svg-container');

const container = new Core(svgContainer, {
    style: {
        width: '100vw',
        height: '100vh',
        border: '1px dashed #000',
    },
    line: {
        style: {
            stroke: 'deepskyblue',
        },
        arrow: {
            style: {
                fill: 'deepskyblue',
            },
            viewBox: '0 0 18 18',
            d: 'M1,2 L8,6 L1,10 Z',
        },
    },
    linkDot: {
        r: 2,
        fill: 'deepskyblue',
        stroke: 'deepskyblue',
        strokeWidth: 2,
    },
    control: false,
});

const width = 202;
const height = 157;

const nodeHtml = document.querySelector('.block-1');
const nodeHtml1 = document.querySelector('.block-2');

const node = new Node({
    position: {
        x: 100,
        y: 150,
    },
    style: {
        width,
        height,
        userSelect: 'none',
    },
    html: {
        meta: nodeHtml,
    },
});

const node1 = new Node({
    position: {
        x: 500,
        y: 250,
    },
    style: {
        width,
        height,
        userSelect: 'none',
    },
    html: {
        meta: nodeHtml1,
    },
});

container.addNode(node);
container.addNode(node1);
```

## Author

[TimRChen](http://github.com/TimRChen)
