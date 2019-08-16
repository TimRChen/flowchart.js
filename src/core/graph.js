import { getRandomInt, creatSvgElement } from '../utils/tools.js';

/**
 * flowchart核心库
 * @description 节点类
 * @author TimRChen <timrchen@foxmai.com>
 */
export default class Node {
    constructor(config) {
        const { style = {}, html = {} } = config;
        const defaultStyle = {
            width: 140,
            height: 70,
            strokeWidth: 2,
            stroke: 'black',
            fill: 'transparent',
        };

        // initial class property.
        this.id = getRandomInt();
        this.node = {};
        this.html = html;
        this.style = Object.assign(defaultStyle, style);
        this.dotLink = ''; // 节点起始连接端点
        this.dotEndLink = ''; // 节点终止连接端点
        this.mousedownNode = false; // 标记当前节点拖拽状态
        this.linkActive = false; // 此对象标记当前连线状态
        this.linkNode = {}; // 此对象标记每个连接点的位置
        this.watchProperty(config);
        this.initializeNode();
    }

    /**
     * 监听属性变化
     * @argument {Object} config
     */
    watchProperty(config) {
        if ('position' in config) {
            // position属性值可追溯
            let { position } = config;
            Object.defineProperty(this, 'position', {
                enumerable: true,
                get: () => position,
                set: value => {
                    position = value;
                    this.handlePositionChange(value);
                },
            });
        } else {
            throw Error(
                'There must be have a position attribute in config Object',
            );
        }
    }

    /**
     * 更改position
     * @argument {Object} position
     */
    changePosition(position) {
        if ('x' in position || 'y' in position) {
            this.position = Object.assign({}, this.position, position);
        } else {
            throw Error(
                'There must be have x or y attribute in position Object',
            );
        }
    }

    /**
     * 位置变更处理
     * @argument {Object} position
     */
    handlePositionChange(position) {
        const { x, y } = position;
        this.node.style.transform = `translate(${x}px, ${y}px)`;
        // 位置变更更新连线数据
        this.initialLinkNodeData();
    }

    /**
     * 初始化连线数据
     */
    initialLinkNodeData() {
        const { width: rectWidth, height: rectHeight } = this.style;
        const { x, y } = this.position;
        const midX = x + rectWidth / 2;
        const midY = y + rectHeight / 2;

        this.linkNode = {
            top: {
                x: midX,
                y,
            },
            bottom: {
                x: midX,
                y: y + rectHeight,
            },
            left: {
                x,
                y: midY,
            },
            right: {
                x: x + rectWidth,
                y: midY,
            },
        };
    }

    /**
     * 初始化节点
     */
    initializeNode() {
        this.node = this.createNode(this.style);
    }

    /**
     * 创建节点
     * @argument {Object} style
     */
    createNode(style) {
        let nodeContainer = creatSvgElement('g');
        nodeContainer.setAttribute('class', 'node-container');
        if ('meta' in this.html && this.html.meta) {
            // could diy svg dom structure.
            let foreignObjectDom = creatSvgElement('foreignObject');
            foreignObjectDom.setAttribute('class', 'node');
            // 将diy节点样式插入foreignObject中
            foreignObjectDom.appendChild(this.html.meta);
            // 初始化节点样式
            foreignObjectDom = this.initialNodeStyle(foreignObjectDom, style);
            nodeContainer.appendChild(foreignObjectDom);
        } else {
            // default
            let node = creatSvgElement('rect'); // default node style.
            node.setAttribute('class', 'node');
            // 初始化节点样式
            node = this.initialNodeStyle(node, style);
            nodeContainer.appendChild(node);
        }
        // 设置节点位置
        const { x, y } = this.position;
        nodeContainer.style.transform = `translate(${x}px, ${y}px)`;
        // 实例化节点连接点
        nodeContainer = this.initializeLinkDot(nodeContainer, style);
        // 节点绑定事件
        nodeContainer = this.nodeBindMouseEvent(nodeContainer);
        return nodeContainer;
    }

    /**
     * 为节点绑定mouse event
     * @argument {SVGGElement} node
     */
    nodeBindMouseEvent(node) {
        node.onmousedown = this.dragSvgNode.bind(this);
        return node;
    }

    /**
     * 标记节点为拖拽状态
     */
    dragSvgNode() {
        // 非连线状态时
        if (!this.linkActive) {
            // 标记为拖拽态
            this.mousedownNode = true;
        }
    }

    /**
     * 初始化节点样式
     * @argument {*} node
     * @argument {Object} style
     */
    initialNodeStyle(node, style) {
        Object.assign(node.style, style);
        return node;
    }

    /**
     * 初始化连接点
     * @argument {SVGGElement} nodeContainer
     * @argument {Object} style
     */
    initializeLinkDot(nodeContainer, style) {
        let topDot = creatSvgElement('circle');
        let bottomDot = creatSvgElement('circle');
        let leftDot = creatSvgElement('circle');
        let rightDot = creatSvgElement('circle');

        topDot.setAttribute('class', 'link-dot top');
        bottomDot.setAttribute('class', 'link-dot bottom');
        leftDot.setAttribute('class', 'link-dot left');
        rightDot.setAttribute('class', 'link-dot right');

        const { width: rectWidth, height: rectHeight } = style;
        const midX = rectWidth / 2;
        const midY = rectHeight / 2;

        Object.assign(topDot.style, {
            cx: midX + 'px',
            cy: 0,
        });
        Object.assign(bottomDot.style, {
            cx: midX + 'px',
            cy: rectHeight + 'px',
        });
        Object.assign(leftDot.style, {
            cx: 0,
            cy: midY + 'px',
        });
        Object.assign(rightDot.style, {
            cx: rectWidth + 'px',
            cy: midY + 'px',
        });

        const bindEventDot = this.dotBindMouseEvent({
            topDot,
            bottomDot,
            leftDot,
            rightDot,
        });

        nodeContainer.appendChild(bindEventDot.topDot);
        nodeContainer.appendChild(bindEventDot.bottomDot);
        nodeContainer.appendChild(bindEventDot.leftDot);
        nodeContainer.appendChild(bindEventDot.rightDot);

        // 初始化连接点数据
        this.initialLinkNodeData();

        return nodeContainer;
    }

    /**
     * 为连接点绑定mouse event
     * @argument {Object} dots
     */
    dotBindMouseEvent(dots) {
        const { topDot, bottomDot, leftDot, rightDot } = dots;
        topDot.onmousedown = this.startLinkNode.bind(this, 'top');
        bottomDot.onmousedown = this.startLinkNode.bind(this, 'bottom');
        leftDot.onmousedown = this.startLinkNode.bind(this, 'left');
        rightDot.onmousedown = this.startLinkNode.bind(this, 'right');

        topDot.onmouseup = this.endLinkedNode.bind(this, 'top');
        bottomDot.onmouseup = this.endLinkedNode.bind(this, 'bottom');
        leftDot.onmouseup = this.endLinkedNode.bind(this, 'left');
        rightDot.onmouseup = this.endLinkedNode.bind(this, 'right');

        return {
            topDot,
            bottomDot,
            leftDot,
            rightDot,
        };
    }

    // 开始连线
    startLinkNode(type) {
        this.linkActive = true;
        this.mousedownNode = false;
        this.dotLink = type;
    }

    // 连线终止
    endLinkedNode(type) {
        if (this.dotLink === '') {
            this.linkActive = true;
            this.mousedownNode = false;
            this.dotEndLink = type;
        }
    }
}
