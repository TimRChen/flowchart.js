# Flowchart-core.js
A Tiny svg flowchart.js, Quickly use to solve simple process configuration needs.

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

#### `new Core(svgElement, options)`
| prop       | type     |default |
| :--------  | :-----   | :---- |
| svgElement | `SvgElement` | `1` |
| options    | `coreOptions`      | `1` |

#### `coreOptions`
| prop       | type     |default |
| :--------  | :-----   | :---- |
| style | `stylesheet` | `1` |
| line | `lineObject` | `0` |
| linkDot | `linkDotObject` | `0` |

#### coreOptions->`lineObject`
| prop       | type     |default |
| :--------  | :-----   | :---- |
| style | `stylesheet` | `1` |
| arrow | `arrowObject` | `0` |

#### coreOptions->`linkDotObject`
| prop       | type     |default |
| :--------  | :-----   | :---- |
| r | `radius` | `0` |
| fill | `fill color` | `0` |
| stroke | `stroke color` | `0` |
| strokeWidth | `stroke width` | `0` |

#### coreOptions->lineObject->`arrowObject`
| prop       | type     |default |
| :--------  | :-----   | :---- |
| style | `stylesheet` | `1` |
| viewBox | `String` | `0` |

#### `new Node(config)`
| prop       | type     |default |
| :--------  | :-----   | :---- |
| config | `nodeConfig` | `1` |

#### `nodeConfig`
| prop       | type     |default |
| :--------  | :-----   | :---- |
| style | `stylesheet` | `1` |
| position | `{ x: axis, y: axis }` | `1` |
| html | `{ meta: DomInstance }` | `1` |


# Methods
#### Core Methods
| prop       | type     |default |
| :--------  | :-----   | :---- |
| addNode | `Function` | `1` |


# Example
more example
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
