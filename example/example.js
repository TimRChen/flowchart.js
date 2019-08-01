// import { Core, Node } from '../dist/index.js';
import { Core, Node } from '../src/index.js';

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
            // d: 'M1,2 L8,6 L1,10 Z',
        }
    },
    linkDot: { // limit 4 props.
        // r: 2,
        fill: 'deepskyblue',
        stroke: 'deepskyblue',
        // strokeWidth: 2,
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

// const node2 = new Node({
//     position: {
//         x: 600,
//         y: 200,
//     },
//     style: {
//         width,
//         height,
//         strokeWidth: 4,
//         stroke: 'blue',
//         cursor: 'grab',
//         rx: 0,
//     },
// });

container.addNode(node);
container.addNode(node1);
// container.addNode(node2);
