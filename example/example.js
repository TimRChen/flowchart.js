import { Core, Node, Edge } from '../src/index.js';

const svgContainer = document.getElementById('svg-container');

const container = new Core(svgContainer, {
    style: {
        width: '100vw',
        height: '100vh',
        border: '1px dashed #000',
    },
    line: {
        style: {
            stroke: '#000',
            strokeWidth: '1px',
        },
        arrow: {
            style: {
                fill: '#888',
            },
            viewBox: '0 0 18 18',
        },
    },
    linkDot: {
        // limit 4 props.
        // display: 'none',
    },
    control: true, // must need. default is false 是否可配置流程
});

// 从这里开始是业务逻辑.

const nodeHtml = document.querySelector('.block-1');
const nodeHtml1 = document.querySelector('.block-2');
const nodeHtml2 = document.querySelector('.block-3');
const nodeHtml3 = document.querySelector('.block-4');

const Dx = 50;
const Dy = 100;
// 节点容器宽高，为节点定义的html实例宽高
const width = 215;
const height = 170;

const mainNode = new Node({
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

const childNode1 = new Node({
    position: {
        x: 100,
        y: 150 + height + Dy,
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

const childNode2 = new Node({
    position: {
        x: 100 + width + Dx,
        y: 150 + height + Dy,
    },
    style: {
        width,
        height,
        userSelect: 'none',
    },
    html: {
        meta: nodeHtml2,
    },
});

const parentNode = new Node({
    position: {
        x: 100 + width + Dx * 3,
        y: 150,
    },
    style: {
        width,
        height,
        userSelect: 'none',
    },
    html: {
        meta: nodeHtml3,
    },
});

container.addNode(mainNode);
container.addNode(childNode1);
container.addNode(childNode2);
container.addNode(parentNode);

// 创建连接线.

const blueLineStyle = {
    style: {
        stroke: 'deepskyblue',
    },
};

const redLineStyle = {
    style: {
        stroke: 'pink',
    },
};

// create edge instance.
const edge1 = new Edge(blueLineStyle);
const edge2 = new Edge(blueLineStyle);
const edge3 = new Edge(redLineStyle);

// source target relationship point torelationship.
Object.assign(edge1, {
    source: mainNode.id,
    target: childNode1.id,
    dotLink: 'bottom',
    dotEndLink: 'top'
});

Object.assign(edge2, {
    source: mainNode.id,
    target: childNode2.id,
    dotLink: 'bottom',
    dotEndLink: 'top'
});

Object.assign(edge3, {
    source: mainNode.id,
    target: parentNode.id,
    dotLink: 'right',
    dotEndLink: 'left'
});

// line data.
edge1.lineData = container.edgeData(edge1);
edge2.lineData = container.edgeData(edge2);
edge3.lineData = container.edgeData(edge3);

// edges push & insert in the edgeG Dom.
container.edges = [edge1, edge2, edge3, ...container.edges];
container.edgeG.appendChild(edge1.edge);
container.edgeG.appendChild(edge2.edge);
container.edgeG.appendChild(edge3.edge);

// 收展节点.
const bottomDecrease = document.querySelector('.bottom.main-node-decrease');
let clickFlag = false;
bottomDecrease.onclick = function controlClo () {
    const { edges } = container;
    if (!clickFlag) {
        // close
        clickFlag = true;
        container.hiddenSvgElement(childNode1, 'node');
        container.hiddenSvgElement(childNode2, 'node');
        const cNode1Line = edges.find(edge => edge.target === childNode1.id);
        const cNode2Line = edges.find(edge => edge.target === childNode2.id);
        if (cNode1Line && cNode2Line) {
            container.hiddenSvgElement(cNode1Line, 'edge');
            container.hiddenSvgElement(cNode2Line, 'edge');
        }
    } else {
        // open
        clickFlag = false;
        container.showSvgElement(childNode1, 'node');
        container.showSvgElement(childNode2, 'node');
        const cNode1Line = edges.find(edge => edge.target === childNode1.id);
        const cNode2Line = edges.find(edge => edge.target === childNode2.id);
        if (cNode1Line && cNode2Line) {
            container.showSvgElement(cNode1Line, 'edge');
            container.showSvgElement(cNode2Line, 'edge');
        }
    }
};
