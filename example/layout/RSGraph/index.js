import { RSGraph } from '../../../src/layout/index.js';
const data = require('./config/nodes.json');

// sort data.
data.sort((a, b) => (a.title > b.title ? 1 : -1));
// random data.
// data.sort(() => (Math.random() * 10 > 5 ? -1 : 1))

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
    zoom: true,
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
            display: 'none',
        },
        mode: 'link-mode', // set link-mode will not work.
    },
};

// create rsgraph instance, just use one statement.
const graph = new RSGraph('#container', config);



