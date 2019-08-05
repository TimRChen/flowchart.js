[![GitHub stars](https://img.shields.io/github/stars/TimRChen/flowchart-core.svg?style=flat-square)](https://github.com/TimRChen/flowchart-core/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/TimRChen/flowchart-core.svg?style=flat-square)](https://github.com/TimRChen/flowchart-core/issues)
[![GitHub forks](https://img.shields.io/github/forks/TimRChen/flowchart-core.svg?style=flat-square)](https://github.com/TimRChen/flowchart-core/network)
[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square)](https://github.com/TimRChen/flowchart-core)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/TimRChen/flowchart-core)

[![NPM](https://nodei.co/npm/flowchart-core.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/flowchart-core)
[![NPM](https://nodei.co/npm-dl/flowchart-core.png?months=3)](https://www.npmjs.com/package/flowchart-core)

# flowchart-core

A Tiny svg flowchart.js, Quickly use to solve simple process configuration musts.


- self define html embed node

![eg-graph](https://github.com/TimRChen/demo-item-display/blob/master/flowchart-core/example.png)

- flowchart config.

![eg-graph-1](https://github.com/TimRChen/demo-item-display/blob/master/flowchart-core/example1.png)

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
// initial Core.
const container = new Core(svgContainer, {
    style: {
        width: 1000,
        height: 600,
        border: '1px dashed #000',
    },
    control: true,
    // ..
});
// define node container width & height.
const width = 140;
const height = 70;
// initial Node.
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

| prop       | type                          | desc                  | must |
| :--------- | :---------------------------- | :-------------------- | :--- |
| svgElement | `SvgElement<svg>`             | _Svg DOM element_     | `1`  |
| options    | [`coreOptions`](#coreoptions) | _core config options_ | `1`  |

#### `coreOptions`

-   #### Type: `{ style: {}, line: {}, linkDot: {}, control: false }`

-   #### Arguments:

    | prop    | type                                      | desc                                   | must |
    | :------ | :---------------------------------------- | :------------------------------------- | :--- |
    | style   | `stylesheet`                              | _css style_                            | `1`  |
    | line    | [`lineObject`](#line-lineobject)          | _link path config_                     | `0`  |
    | linkDot | [`linkDotObject`](#linkdot-linkdotobject) | _link dot config_                      | `0`  |
    | control | `Boolean`                                 | _(true)link-mode. (false)render-mode._ | `1`  |

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

link line props.

| prop  | type                                | desc                | must |
| :---- | :---------------------------------- | :------------------ | :--- |
| style | `stylesheet`                        | _css style_         | `0`  |
| arrow | [`arrowObject`](#arrow-arrowobject) | _line arrow config_ | `0`  |

##### _line_->_arrow_: `arrowObject`

| prop    | type         | desc                                                                                | must |
| :------ | :----------- | :---------------------------------------------------------------------------------- | :--- |
| style   | `stylesheet` | _css style_                                                                         | `0`  |
| viewBox | `String`     | _[svg viewBox](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/viewBox)_ | `0`  |

##### _linkDot_: `linkDotObject`

> ##### (`Only` the following table styles can be used.)

| prop        | type           | desc                        | must |
| :---------- | :------------- | :-------------------------- | :--- |
| r           | `radius`       | \<circle> _attr `r` radius_ | `0`  |
| fill        | `fill color`   | _color_                     | `0`  |
| stroke      | `stroke color` | _color_                     | `0`  |
| strokeWidth | `stroke width` | _px_                        | `0`  |
| display     | `css display`  | _display value_             | `0`  |

---

### `new Node(config)`

| prop   | type         | desc          | must |
| :----- | :----------- | :------------ | :--- |
| config | `nodeConfig` | `node config` | `1`  |

#### `nodeConfig`

-   #### Type: `{ style: {}, position: { x, y }, html: { meta } }`
-   #### Arguments:

| prop     | type                                           | desc                   | must |
| :------- | :--------------------------------------------- | :--------------------- | :--- |
| style    | `stylesheet`                                   | _css style_            | `1`  |
| position | [`positionObject`](#nodeconfig-positionobject) | _node position in svg_ | `1`  |
| html     | [`htmlObject`](#nodeconfig-htmlobject)         | `1`                    | `1`  |

-   #### Usage:

```js
const config = {
    position: {
        // node position in svg.
        x: 100,
        y: 150,
    },
    style: {
        width: 140,
        height: 70,
    },
    html: {
        meta: '<div>...</div>', // html template.
    },
};
```

##### _nodeConfig_: `positionObject`

| prop | type     | desc   | must |
| :--- | :------- | :----- | :--- |
| x    | `x axis` | _axis_ | `1`  |
| y    | `y axis` | _axis_ | `1`  |

##### _nodeConfig_: `htmlObject`

| prop | type          | desc          | must |
| :--- | :------------ | :------------ | :--- |
| meta | `DomInstance` | _Dom element_ | `1`  |

## Methods

#### Core Methods

| prop               | type       | desc                                                   |
| :----------------- | :--------- | :----------------------------------------------------- |
| `addNode`(node)    | `Function` | _add node in svg container_                            |
| `edgeData`(edge)   | `Function` | _return link path data. the value of \<path> prop `d`_ |
| `deleteNode`(node) | `Function` | _delete node `(just delete nodes data)`_               |
| `deleteEdge`(edge) | `Function` | _delete edge `(just delete edges data)`_               |

## Class Attributes

> More `complex effects` can be achieved through these exposure methods.

### `Core`

-   #### Arguments:

| prop         | type              | desc                        |
| :----------- | :---------------- | :-------------------------- |
| svgContainer | `SvgElement<svg>` | _Svg Dom_                   |
| nodes        | `Array<Object>`   | _node dom list_             |
| edges        | `Array<Object>`   | _edge dom list_             |
| nodeG        | `SvgElement<g>`   | _\<g> tag. nodes container_ |
| edgeG        | `SvgElement<g>`   | _\<g> tag. edges container_ |

-   #### Usage:

```js
// eg. how to appendChild a edge in core instance.
const coreInstance = new Core(svgContainer, { ... });
const edgeInstance = new Edge({ ... });
coreInstance.edgeG.appendChild(edgeInstance.edge);
```

### `Node`

-   #### Arguments:

| prop  | type             | desc                                                                                       |
| :---- | :--------------- | :----------------------------------------------------------------------------------------- |
| id    | `Number`         | _unique node id_                                                                           |
| node  | `SvgElement<g>`  | _node container \<g>. As real node to use. `Accessible to all DOM attribute values on it`_ |
| html  | `String`         | _`html element embed` in node inside_                                                      |
| style | `css stylesheet` | _node style_                                                                               |

-   #### Usage:

```js
// eg. how to make a node instance visible or hidden.
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
// hidden.
Object.assign(nodeInstance.node.style, { display: 'none' });
// visible.
Object.assign(nodeInstance.node.style, { display: 'initial' });
```

### `Edge`

-   #### Arguments:

| prop       | type            | desc                                                          |
| :--------- | :-------------- | :------------------------------------------------------------ |
| id         | `Number`        | _unique edge id_                                              |
| edge       | `SvgElement<g>` | _node container \<g>_                                         |
| source     | `Number`        | _source node id_                                              |
| target     | `Number`        | _target node id_                                              |
| dotLink    | `String`        | node start link dot's position: top \| bottom\| left \| right |
| dotEndLink | `String`        | node end link dot's position: top \| bottom \| left \| right  |
| lineData   | `String`        | _link path data. \<path> prop `d`_                            |

-   #### Usage:

```js
// eg. create edge instance & append child on svg
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
// key step.
edgeInstance.lineData = coreInstance.edgeData(edgeInstance);
coreInstance.edgeG.appendChild(edgeInstance.edge);
```

## Example

#### [Recommand to check more example (`how to embed self define div node`)](./example/example.js)

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
