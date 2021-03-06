[![GitHub stars](https://img.shields.io/github/stars/TimRChen/flowchart-core.svg?style=flat-square)](https://github.com/TimRChen/flowchart-core/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/TimRChen/flowchart-core.svg?style=flat-square)](https://github.com/TimRChen/flowchart-core/issues)
[![GitHub forks](https://img.shields.io/github/forks/TimRChen/flowchart-core.svg?style=flat-square)](https://github.com/TimRChen/flowchart-core/network)
[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square)](https://github.com/TimRChen/flowchart-core)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/TimRChen/flowchart-core)

[![NPM](https://nodei.co/npm/flowchart-core.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/flowchart-core)
[![NPM](https://nodei.co/npm-dl/flowchart-core.png?months=3)](https://www.npmjs.com/package/flowchart-core)

# flowchart-core

A tiny svg javascript lib, Ability to quickly draw flowchart and topology graph.

[查看简体中文](https://github.com/TimRChen/flowchart-core/blob/master/README_CN.md)

## Advantage

Two configurable modes: link-mode and render-mode.

-   link-mode: `quickly` start flowchart config.

-   render-mode: `quickly` drawing topological relationships.

## Install

#### NPM

```bash
 $ npm install flowchart-core
```

#### Yarn

```bash
 $ yarn flowchart-core
```

## Layout

### Topology

#### [Check Demo](https://timrchen.github.io/demo-item-display/flowchart-core/rsgraph/dist/index.html) | [Get Usage](https://github.com/TimRChen/flowchart-core/blob/master/example/layout/RSGraph/index.js)

```js
// create topology graph, just use one statement.
import { RSGraph } from 'flowchart-core';
const nodes = [
    {
        id: 'root',
        children: ['node1', 'node2'],
        title: 'start',
        desc: '1',
        parent: null,
    },
    {
        id: 'node1',
        children: [],
        title: 'doing',
        desc: '2',
        parent: 'root',
    },
    {
        id: 'node2',
        children: [],
        title: 'end',
        desc: '3',
        parent: 'root',
    },
];

// create node div dom element. this just a case.
nodes.forEach(node => {
    const { title, desc } = node;
    const body = document.querySelector('body');
    const div = document.createElement('div');
    div.setAttribute('data-rsgraph-id', node.id);
    div.setAttribute('class', 'item');
    div.innerHTML = `<div class="desc">${desc}</div><div class="title">${title}</div>`;
    body.appendChild(div);
});

const config = {
    data: nodes,
    zoom: true, // default is false
    direction: 'x-axis', // x-axis || y-axis. default value is 'y-axis'
    coreOptions: {
        style: {
            borderTop: '1px dashed #000',
            overflow: 'scroll',
        },
        line: {
            style: {
                stroke: 'deepskyblue',
            },
            arrow: {
                style: {
                    fill: '#888',
                },
                viewBox: '0 0 18 18',
            },
        },
        linkDot: {
            display: 'none', // default is display: none
        },
        mode: 'link-mode', // set link-mode will not work.
    },
};

const graph = new RSGraph('#svg-container', config);
```

[`warning`] Add `data-rsgraph-id` attribute to the DOM element of node before using it.

### Flowchart

#### [Check Demo](https://timrchen.github.io/flowchart-vue/dist/index.html)

## Mount

##### mount with global

```html
<!-- html -->
<svg id="svg-container"></svg>
```

```js
import { Core, Node } from 'flowchart-core';
// initial Core.
const core = new Core('#svg-container', {
    style: {
        width: 1000,
        height: 600,
        border: '1px dashed #000',
    },
    mode: 'link-mode',
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

// zoom graph
core.zoom();

// add node to container
core.addNode(node);
```

## API Reference

### new Core(selectors, options)

| prop      | type                                                                            | desc                    | must |
| :-------- | :------------------------------------------------------------------------------ | :---------------------- | :--- |
| selectors | [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) | _Svg DOM selector name_ | 1    |
| options   | [coreOptions](#coreoptions)                                                     | _core config options_   | 1    |

#### coreOptions

-   #### Type: { style: {}, line: {}, linkDot: {}, mode: 'render-mode' }

-   #### Arguments:

    | prop    | type                            | desc                      | must |
    | :------ | :------------------------------ | :------------------------ | :--- |
    | style   | stylesheet                      | _css style_               | 1    |
    | line    | [lineObject](#lineobject)       | _link path config_        | 0    |
    | linkDot | [linkDotObject](#linkdotobject) | _link dot config_         | 0    |
    | mode    | String                          | _link-mode. render-mode._ | 1    |


    ##### lineObject

    link line props.

    | prop  | type                                | desc                | must |
    | :---- | :---------------------------------- | :------------------ | :--- |
    | style | stylesheet                        | _css style_         | 0  |
    | arrow | [arrowObject](#arrowObject) | _line arrow config_ | 0  |

    ##### linkDotObject

    > `Only` the following table styles can be used.

    | prop        | type           | desc                        | must |
    | :---------- | :------------- | :-------------------------- | :--- |
    | r           | radius       | \<circle> _attr `r` radius_ | 0  |
    | fill        | fill color   | _color_                     | 0  |
    | stroke      | stroke color | _color_                     | 0  |
    | strokeWidth | stroke width | _px_                        | 0  |
    | display     | css display  | _display value_             | 0  |

    ##### arrowObject

    | prop    | type         | desc                                                                                | must |
    | :------ | :----------- | :---------------------------------------------------------------------------------- | :--- |
    | style   | `stylesheet` | _css style_                                                                         | 0  |
    | viewBox | `String`     | _[svg viewBox](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/viewBox)_ | 0  |

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

### new Node(config)

| prop   | type       | desc          | must |
| :----- | :--------- | :------------ | :--- |
| config | nodeConfig | `node config` | 1    |

#### nodeConfig

-   #### Type: { style: {}, position: { x, y }, html: { meta } }
-   #### Arguments:

    | prop     | type                              | desc                   | must |
    | :------- | :-------------------------------- | :--------------------- | :--- |
    | style    | stylesheet                        | _css style_            | 1    |
    | position | [positionObject](#positionObject) | _node position in svg_ | 1    |
    | html     | [htmlObject](#htmlobject)         | 1                      | 1    |

    ##### positionObject

    | prop | type     | desc                                                                                        | must |
    | :--- | :------- | :------------------------------------------------------------------------------------------ | :--- |
    | x    | `x axis` | _[MouseEvent.clientX](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/clientX)_ | 1    |
    | y    | `y axis` | _[MouseEvent.clientY](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/clientY)_ | 1    |

    ##### htmlObject

    | prop | type          | desc          | must |
    | :--- | :------------ | :------------ | :--- |
    | meta | `DomInstance` | _Dom element_ | 1    |

*   #### Usage:

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

### new Edge(config)

| prop   | type       | desc          | must |
| :----- | :--------- | :------------ | :--- |
| config | edgeConfig | `edge config` | 0    |

#### edgeConfig

-   #### Type: { style: {} }
-   #### Arguments:

    | prop  | type         | desc        | must |
    | :---- | :----------- | :---------- | :--- |
    | style | `stylesheet` | _css style_ | 1    |

*   #### Usage:

    ```js
    const config = {
        style: {
            stroke: 'deepskyblue',
        },
    };
    ```

### new RSGraph(selectors, config)

| prop      | type                                                                            | desc           | must |
| :-------- | :------------------------------------------------------------------------------ | :------------- | :--- |
| selectors | [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) | css selectors  | 1    |
| config    | rsGraphConfig                                                                   | rsgraph config | 0    |

#### rsGraphConfig

-   #### Type: { data: [], zoom: true, coreOptions: {} }
-   #### Arguments:

    | prop        | type                        | desc                  | must |
    | :---------- | :-------------------------- | :-------------------- | :--- |
    | data        | `Array`                     | _node relation data_  | 1    |
    | zoom        | `Boolean`                   | _zoom in or zoom out_ | 0    |
    | direction   | `String`                    | _change the direction of topological_ | 0    |
    | coreOptions | [coreOptions](#coreoptions) | _core config options_ | 0    |

*   #### Usage:

    ```js
    const config = {
        data: nodes,
        zoom: true,
        direction: 'x-axis', // x-axis || y-axis. default value is 'y-axis'
        coreOptions: {
            style: {
                borderTop: '1px dashed #000',
                overflow: 'scroll',
            },
            linkDot: {
                display: 'none', // default is display: none
            },
            mode: 'link-mode', // set link-mode will not work.
        },
    };
    ```

## Methods

#### Core Methods

| prop                               | type       | desc                                                                                                                                                 |
| :--------------------------------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| addNode(node)                      | `Function` | _add node to svg container_                                                                                                                          |
| addEdge(edge, config)              | `Function` | _add a path to svg container to describe the relationship between nodes, just use in render mode, `config: { source, target, dotLink, dotEndLink }`_ |
| deleteNode(node)                   | `Function` | _delete node data and remove node from svg container_                                                                                                |
| deleteEdge(edge)                   | `Function` | _delete edge data and remove edge from svg container_                                                                                                |
| showSvgElement(svgElement, type)   | `Function` | _show a svg element. enum value is 'node' or 'edge'_                                                                                                 |
| hiddenSvgElement(svgElement, type) | `Function` | _hidden a svg element. enum value is 'node' or 'edge'_                                                                                               |
| zoom()                             | `Function` | _make graph zoom in or zoom out. drag-and-drop are not supported after called zoom()_                                                                |
| zoomClose()                        | `Function` | _close zoom，Core.mode value back to Core.options.mode value_                                                                                        |

#### Usage:

```js
// eg. how to appendChild a edge in core instance.
const coreInstance = new Core('#svg-container', { ... });
const edgeInstance = new Edge({ ... });
coreInstance.addEdge(edgeInstance, {
    source: sourceNode.id,
    target: targetNode.id,
    dotLink: 'bottom',
    dotEndLink: 'top'
});
```

#### Node Methods

| prop                     | type       | desc                                                                                    |
| :----------------------- | :--------- | :-------------------------------------------------------------------------------------- |
| changePosition(position) | `Function` | _change node `position`, attribute is a [`positionObject`](#nodeconfig-positionobject)_ |

#### Usage:

```js
// eg. how to change the position attribute.
const coreInstance = new Core('#svg-container', { ... });
const nodeInstance = new Node({ ... });
nodeInstance.changePosition({
    x: 130,
    y: 100,
});
```

## Class Attributes

> More `complex effects` can be achieved through these exposure methods.

### `Core`

-   #### Arguments:

    | prop      | type              | desc                        |
    | :-------- | :---------------- | :-------------------------- |
    | container | `SvgElement<svg>` | _Svg Dom_                   |
    | nodes     | `Array<Object>`   | _node dom list_             |
    | edges     | `Array<Object>`   | _edge dom list_             |
    | nodeG     | `SvgElement<g>`   | _\<g> tag. nodes container_ |
    | edgeG     | `SvgElement<g>`   | _\<g> tag. edges container_ |

### `Node`

-   #### Arguments:

    | prop  | type            | desc                                                                                       |
    | :---- | :-------------- | :----------------------------------------------------------------------------------------- |
    | id    | `Number`        | _unique node id_                                                                           |
    | node  | `SvgElement<g>` | _node container \<g>. As real node to use. `Accessible to all DOM attribute values on it`_ |
    | html  | `String`        | _`html element embed` in node inside_                                                      |
    | style | `stylesheet`    | _node style_                                                                               |

-   #### Usage:

    ```js
    // eg. how to make a node instance visible or hidden.
    const coreInstance = new Core('#svg-container', { ... });
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
    const operatorType = 'node';
    // hidden.
    coreInstance.hiddenSvgElement(nodeInstance, operatorType);
    // visible.
    coreInstance.showSvgElement(nodeInstance, operatorType);
    ```

### `Edge`

-   #### Arguments:

    | prop       | type            | desc                                                          |
    | :--------- | :-------------- | :------------------------------------------------------------ |
    | id         | `Number`        | _unique edge id_                                              |
    | edge       | `SvgElement<g>` | _edge container \<g>_                                         |
    | source     | `Number`        | _source node id_                                              |
    | target     | `Number`        | _target node id_                                              |
    | dotLink    | `String`        | node start link dot's position: top \| bottom\| left \| right |
    | dotEndLink | `String`        | node end link dot's position: top \| bottom \| left \| right  |
    | lineData   | `String`        | _link path data. \<path> prop `d`_                            |

-   #### Usage:

    ```js
    // eg. create edge instance & append child on svg
    const coreInstance = new Core('#svg-container', { ... })
    const edgeInstance = new Edge({
        style: {
            stroke: 'deepskyblue',
        },
    });
    // key step.
    coreInstance.addEdge(edgeInstance, {
        source: sourceNode.id,
        target: targetNode.id,
        dotLink: 'bottom',
        dotEndLink: 'top'
    });
    ```

## Example

#### [Recommand to check more example (`how to embed self define div node`)](https://github.com/TimRChen/flowchart-core/blob/master/example/example.js)

-   self define html embed node

![eg-graph](https://github.com/TimRChen/demo-item-display/blob/master/flowchart-core/example.png)

-   flowchart config.

![eg-graph-1](https://github.com/TimRChen/demo-item-display/blob/master/flowchart-core/example1.png)

## Author

[TimRChen](http://github.com/TimRChen)
