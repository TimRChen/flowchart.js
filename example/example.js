import { Core, Node } from '../dist/index.js';

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

const node1 = new Node({
    position: {
        x: 300,
        y: 300,
    },
    style: {
        width,
        height,
        strokeWidth: 2,
        stroke: 'red',
        cursor: 'grab',
        rx: 70,
    },
});


const node2 = new Node({
    position: {
        x: 600,
        y: 200,
    },
    style: {
        width,
        height,
        strokeWidth: 4,
        stroke: 'blue',
        cursor: 'grab',
        rx: 0,
    },
});

container.addNode(node);
container.addNode(node1);
container.addNode(node2);

