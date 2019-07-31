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
```bash
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

#### new Core(svgElement, options)
| prop       | type     |default |
| :--------  | :-----   | :---- |
| svgElement | `SvgElement` | `1` |
| options    | `Obect`      | `1` |

##### options
| prop       | type     |default |
| :--------  | :-----   | :---- |
| style | `stylesheet` | `1` |

##### core methods
| prop       | type     |default |
| :--------  | :-----   | :---- |
| addNode | `Function` | `1` |


#### new Node(config);
| prop       | type     |default |
| :--------  | :-----   | :---- |
| style | `stylesheet` | `1` |
| position | `{ x: axis, y: axis }` | `1` |


# Author
[TimRChen](http://github.com/TimRChen)
