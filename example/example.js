import { Core, Node, Edge } from '../src/index.js';

const svgContainer = document.getElementById('svg-container');

const container = new Core(svgContainer, {
    style: {
        width: '100vw',
        height: '100vh',
        border: '1px dashed #000',
    },
    line: {
        // style: {
        //     stroke: 'deepskyblue',
        // },
        arrow: {
            style: {
                fill: '#888',
            },
            viewBox: '0 0 18 18',
            // d: 'M1,2 L8,6 L1,10 Z',
        },
    },
    linkDot: {
        // limit 4 props.
        // r: 12,
        // fill: '#fff',
        // stroke: 'deepskyblue',
        // strokeWidth: 2,
        fill: 'transparent',
        stroke: 'transparent',
    },
    control: false, // must need. default is false 是否可配置流程
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

// source target relationship point to nodes relationship.
edge1.source = mainNode.id;
edge1.target = childNode1.id;

edge2.source = mainNode.id;
edge2.target = childNode2.id;

edge3.source = mainNode.id;
edge3.target = parentNode.id;

// link dot relationship point.
edge1.dotLink = 'bottom';
edge1.dotEndLink = 'top';

edge2.dotLink = 'bottom';
edge2.dotEndLink = 'top';

edge3.dotLink = 'right';
edge3.dotEndLink = 'left';

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
    const { nodes, edges } = container;
    const cNode1 = nodes.find(node => node.id === childNode1.id);
    const cNode2 = nodes.find(node => node.id === childNode2.id);
    if (!clickFlag) {
        // close
        clickFlag = true;
        // Method 1 (recommand use):
        const closeStyle = { display: 'none' };
        Object.assign(childNode1.node.style, closeStyle);
        Object.assign(childNode2.node.style, closeStyle);
        // Method 2:
        // container.deleteNode(childNode1);
        // container.deleteNode(childNode2);
        // container.nodeG.removeChild(childNode1.node);
        // container.nodeG.removeChild(childNode2.node);

        const cNode1Line = edges.find(edge => edge.target === cNode1.id);
        const cNode2Line = edges.find(edge => edge.target === cNode2.id);
        if (cNode1Line && cNode2Line) {
            // Method 1 (recommand use):
            Object.assign(cNode1Line.edge.style, closeStyle);
            Object.assign(cNode2Line.edge.style, closeStyle);
            // Method 2:
            // container.deleteEdge(cNode1Line);
            // container.deleteEdge(cNode2Line);
            // container.edgeG.removeChild(cNode1Line.edge);
            // container.edgeG.removeChild(cNode2Line.edge);
        }
    } else {
        // open
        clickFlag = false;
        // Method 1 (recommand use):
        const openStyle = { display: 'unset' };
        Object.assign(childNode1.node.style, openStyle);
        Object.assign(childNode2.node.style, openStyle);
        const cNode1Line = edges.find(edge => edge.target === cNode1.id);
        const cNode2Line = edges.find(edge => edge.target === cNode2.id);
        if (cNode1Line && cNode2Line) {
            Object.assign(cNode1Line.edge.style, openStyle);
            Object.assign(cNode2Line.edge.style, openStyle);
        }
        // Method 2:
        // container.addNode(childNode1);
        // container.addNode(childNode2);
        // const edge1 = new Edge(blueLineStyle);
        // const edge2 = new Edge(blueLineStyle);
        // edge1.source = mainNode.id;
        // edge1.target = childNode1.id;
        
        // edge2.source = mainNode.id;
        // edge2.target = childNode2.id;

        // edge1.dotLink = 'bottom';
        // edge1.dotEndLink = 'top';
        
        // edge2.dotLink = 'bottom';
        // edge2.dotEndLink = 'top';
        // edge1.lineData = container.edgeData(edge1);
        // edge2.lineData = container.edgeData(edge2);

        // container.edges = [edge1, edge2, ...container.edges];
        // container.edgeG.appendChild(edge1.edge);
        // container.edgeG.appendChild(edge2.edge);
    }
};
