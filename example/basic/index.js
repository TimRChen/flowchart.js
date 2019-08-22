import { Core, Node, Edge } from '../../src/index.js';

const selectors = '#svg-container';

const core = new Core(selectors, {
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
        display: 'none',
    },
    mode: 'link-mode', // must need. default is false 是否可配置流程
});

// 缩放功能，开启后 mode 即变为render-mode，注意，此处再设置为 link-mode 无效
core.zoom();

// 动态设置连接模式
// core.mode = 'render-mode';

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
        x: 50,
        y: 50,
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

core.addNode(mainNode);
core.addNode(childNode1);
core.addNode(childNode2);
core.addNode(parentNode);

// 改变node的位置
mainNode.changePosition({
    x: 100,
    y: 150,
});
// this equal to.
// mainNode.position = {
//     x: 300,
//     y: 100,
// }


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

core.addEdge(edge1, {
    source: mainNode.id,
    target: childNode1.id,
    dotLink: 'bottom',
    dotEndLink: 'top',
});
core.addEdge(edge2, {
    source: mainNode.id,
    target: childNode2.id,
    dotLink: 'bottom',
    dotEndLink: 'top',
});
core.addEdge(edge3, {
    source: mainNode.id,
    target: parentNode.id,
    dotLink: 'right',
    dotEndLink: 'left',
});


// 收展节点.
const bottomDecrease = document.querySelector('.bottom.main-node-decrease');
let clickFlag = false;
bottomDecrease.onclick = function controlClo() {
    const { edges } = core;
    if (!clickFlag) {
        // close
        clickFlag = true;
        core.hiddenSvgElement(childNode1, 'node');
        core.hiddenSvgElement(childNode2, 'node');
        const cNode1Line = edges.find(edge => edge.target === childNode1.id);
        const cNode2Line = edges.find(edge => edge.target === childNode2.id);
        if (cNode1Line && cNode2Line) {
            core.hiddenSvgElement(cNode1Line, 'edge');
            core.hiddenSvgElement(cNode2Line, 'edge');
        }
    } else {
        // open
        clickFlag = false;
        core.showSvgElement(childNode1, 'node');
        core.showSvgElement(childNode2, 'node');
        const cNode1Line = edges.find(edge => edge.target === childNode1.id);
        const cNode2Line = edges.find(edge => edge.target === childNode2.id);
        if (cNode1Line && cNode2Line) {
            core.showSvgElement(cNode1Line, 'edge');
            core.showSvgElement(cNode2Line, 'edge');
        }
    }
};
