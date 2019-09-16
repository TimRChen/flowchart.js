import { RSGraph } from '../../../src/layout/index.js';
const data = require('./config/nodes.json');

// set node width & height
const width = 50;
const height = 50;
const nodes = data.map(node => {
    node.width = width;
    node.height = height;
    return node;
});

// create node div dom element.
nodes.forEach(node => {
    const { title, desc } = node;
    const body = document.querySelector('body');
    const div = document.createElement('div');
    div.setAttribute('data-rsgraph-id', node.id);
    div.setAttribute('class', 'item');
    div.innerHTML = `<div class="desc">${desc}</div><div class="title">${title}</div>`;
    body.appendChild(div);
});

// RSGraph config.
const config = {
    data: nodes,
    // 可选
    zoom: false, // 默认为 false
    direction: 'x-axis', // x-axis || y-axis 默认为 y-axis 即纵向拓扑
    coreOptions: {
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
            display: 'none',
        },
        mode: 'render-mode', // set link-mode will not work.
    },
};

// create rsgraph instance, just use one statement.
const graph = new RSGraph('#container', config);



