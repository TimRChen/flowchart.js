[![GitHub stars](https://img.shields.io/github/stars/TimRChen/flowchart-core.svg?style=flat-square)](https://github.com/TimRChen/flowchart-core/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/TimRChen/flowchart-core.svg?style=flat-square)](https://github.com/TimRChen/flowchart-core/issues)
[![GitHub forks](https://img.shields.io/github/forks/TimRChen/flowchart-core.svg?style=flat-square)](https://github.com/TimRChen/flowchart-core/network)
[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square)](https://github.com/TimRChen/flowchart-core)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/TimRChen/flowchart-core)

# Flowchart-core.js
A Tiny svg flowchart.js, Quickly use to solve simple process configuration  musts.

# Example
```bash
 $ npm run dev
```

# Install

#### NPM
```bash
 $ npm install flowchart-core
```

#### Mount

##### mount with global
```js
import { Core, Node } from 'flowchart-core';

const svgContainer = document.getElementById('svg-container');

const container = new Core(svgContainer, {
    style: {
        width: 1000,
        height: 600,
        border: '1px dashed #000'
    },
});

const width = 140;
const height = 70;

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

# API Reference

### `new Core(svgElement, options)`
| prop       | type     | desc | must |
| :--------  | :-----   | :---- | :---- |
| svgElement | `SvgElement<svg>` | *Svg DOM element* | `1` |
| options    | [`coreOptions`](#coreoptions) | *core config options* | `1` |

#### `coreOptions`
| prop       | type     | desc | must |
| :--------  | :-----   | :---- | :---- |
| style | `stylesheet` | *css style* | `1` |
| line | [`lineObject`](#line-lineobject) | *link path config* | `0` |
| linkDot | [`linkDotObject`](#linkdot-linkdotobject) | *link dot config* | `0` |
| control | `Boolean` | *(true)link-mode. (false)render-mode.* | `1` |

##### *line*: `lineObject`
| prop       | type     | desc | must |
| :--------  | :-----   | :---- | :---- |
| style | `stylesheet` | *css style* | `0` |
| arrow | [`arrowObject`](#arrow-arrowobject) | *line arrow config* | `0` |

##### *arrow*: `arrowObject`
| prop       | type     | desc | must |
| :--------  | :-----   | :---- | :---- |
| style | `stylesheet` | *css style* | `0` |
| viewBox | `String` | *svg viewBox* | `0` |

##### *linkDot*: `linkDotObject` 
>##### (Only the following table styles can be used)

| prop       | type     | desc | must |
| :--------  | :-----   | :---- | :---- |
| r | `radius` | \<circle> *attr `r` radius* | `0` |
| fill | `fill color` | *color* | `0` |
| stroke | `stroke color` | *color* | `0` |
| strokeWidth | `stroke width` | *px* | `0` |

### `new Node(config)`
| prop       | type     | desc | must |
| :--------  | :-----   | :---- | :---- |
| config | `nodeConfig` | `1` | `1` |

#### `nodeConfig`
| prop       | type     | desc | must |
| :--------  | :-----   | :---- | :---- |
| style | `stylesheet` | *css style* | `1` |
| position | [`positionObject`](#nodeconfig-positionobject) | *node position in svg* | `1` |
| html | [`htmlObject`](#nodeconfig-htmlobject) | `1` | `1` |

##### *nodeConfig*: `positionObject`
| prop       | type     | desc | must |
| :--------  | :-----   | :---- | :---- |
| x | `px` | *axis* | `1` |
| y | `px` | *axis* | `1` |


##### *nodeConfig*: `htmlObject`
| prop       | type     | desc | must |
| :--------  | :-----   | :---- | :---- |
| meta | `DomInstance` | *Dom element* | `1` |

# Methods

#### Core Methods
| prop       | type     | desc |
| :--------  | :-----   | :---- |
| `addNode`(node) | `Function` | *add node in Svg* |
| `edgeData`(edge) | `Function` | *return edge data* |
| `deleteNode`(node) | `Function` | *delete node `(just delete nodes data)`* |
| `deleteEdge`(edge) | `Function` | *delete edge `(just delete edges data)`* |


# Class Attributes
> More `complex effects` can be achieved through these exposure methods.

## `Core`
| prop       | type     | desc |
| :--------  | :-----   | :---- |
| nodes | `Array<Object>` | *node list* |
| edges | `Array<Object>` | *edge list* |
| svgContainer | `SvgElement<svg>` | *Svg Dom* |
| nodeG | `SvgElement<g>` | *\<g> tag* |
| edgeG | `SvgElement<g>` | *\<g> tag* |


## `Node`
| prop       | type     | desc |
| :--------  | :-----   | :---- |
| id | `Number` | *unique node id* |
| node | `SvgElement<g>` | *node container \<g>* |

## `Edge`
| prop       | type     | desc |
| :--------  | :-----   | :---- |
| id | `Number` | *unique edge id* |
| source | `Number` | *link line source node id* |
| target | `Number` | *link line target node id* |
| dotLink | `String` | *node link start dot marker* |
| dotEndLink | `String` | *node link end dot marker* |
| lineData | `String` | *link path data. \<path> prop `d`* |


# Example
#### [check more example (how to `embed self define div node`)](./example/example.js)

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
        }
    },
    linkDot: {
        r: 2,
        fill: 'deepskyblue',
        stroke: 'deepskyblue',
        strokeWidth: 2,
    }
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

# Author
[TimRChen](http://github.com/TimRChen)
