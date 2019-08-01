import Edge from './edge.js';
import { creatSvgElement } from '../utils/tools.js';
import {
    getRectWH,
    getFittedEndX,
    handleTheSameLinkDot,
    handleTheColSameLinkDot,
    handleNotSameLinkDotAndAlongStraightLine,
    handelNotSameLinkDotAndAlongColStraightLine,
    getMidXPath,
    getMidYPath,
} from '../utils/path.js';

/**
 * flowchart核心库
 * @description 容器类
 * @author TimRChen <timrchen@foxmai.com>
 */
export default class Core {
    constructor(svgContainer, options = {}) {
        // initial class property.
        this.nodes = [];
        this.edges = [];
        this.svgContainer = svgContainer;
        this.options = options;
        this.nodeG = this.createGroup(svgContainer, 'graph');
        this.virtualG = this.createGroup(svgContainer, 'virtual-edge');
        this.edgeG = this.createGroup(svgContainer, 'edges');
        this.initializeContinaer(svgContainer, options);
        this.edge = {};
        this.virtualEdge = new Edge({
            style: {
                strokeDasharray: 8,
                stroke: '#888',
            },
        });
    }

    /**
     * 产生容器组
     * @argument {SVGElement} container
     * @argument {string} className
     */
    createGroup(container, className) {
        const g = creatSvgElement('g');
        g.setAttribute('class', className);
        container.appendChild(g);
        return g;
    }

    /**
     * 初始化容器
     * @argument {SVGElement} container
     * @argument {Object} options
     */
    initializeContinaer(container, options) {
        Object.assign(container.style, options.style);
        this.createExtraElement(container);
        this.bindMouseEvent(container);
    }

    /**
     * 创建额外元素
     * @argument {SVGElement} container
     */
    createExtraElement(container) {
        // 设置连接线箭头样式
        const defs = creatSvgElement('defs');
        const marker = creatSvgElement('marker');
        const path = creatSvgElement('path');
        marker.setAttribute('id', 'mark-arrow');
        marker.setAttribute('viewBox', '0 0 11 11');
        marker.setAttribute('refX', '8');
        marker.setAttribute('refY', '6');
        marker.setAttribute('markerWidth', '10');
        marker.setAttribute('markerHeight', '10');
        marker.setAttribute('orient', 'auto');
        path.setAttribute('d', 'M1,2 L8,6 L1,10 Z');
        // diy arrow style.
        if ('line' in this.options) {
            if ('arrow' in this.options.line) {
                const line = this.options.line;
                if ('style' in line.arrow) {
                    Object.assign(path.style, line.arrow.style);
                }
                if ('d' in line.arrow && typeof line.arrow.d === 'string') {
                    path.setAttribute('d', line.arrow.d);
                }
                if (
                    'viewBox' in line.arrow &&
                    typeof line.arrow.viewBox === 'string'
                ) {
                    marker.setAttribute('viewBox', line.arrow.viewBox);
                }
            }
        }
        marker.appendChild(path);
        defs.appendChild(marker);
        container.appendChild(defs);

        // 设置link dot基础样式
        const graphStyle = document.createElement('style');
        graphStyle.setAttribute('class', 'flowchart-core-style');
        const head = document.querySelector('head');
        graphStyle.innerText = `
            .link-dot:hover {
                r: 12px!important;
                stroke: red!important;
                fill: transparent!important;
            }
        `;
        // diy dot style.
        const { r = 2, fill = '#000', stroke = '#000', strokeWidth = 2 } =
            this.options.linkDot || {};
        graphStyle.innerText += `
                .link-dot {
                    r: ${r}px;
                    fill: ${fill};
                    stroke: ${stroke};
                    stroke-width: ${strokeWidth}px;
                    transition: all 0.2s ease-in-out;
                }
            `;
        if (!document.querySelector('.flowchart-core-style')) {
            head.appendChild(graphStyle);
        }
    }

    /**
     * 为svg容器绑定mouse event
     * @argument {SVGElement} container
     */
    bindMouseEvent(container) {
        if (this.options.control) {
            // 用户设置为可控制时，绑定相关事件
            container.onmousemove = this.svgMouseMove.bind(this);
            container.onmouseup = this.svgMouseUp.bind(this);
        }
    }

    /**
     * 全局SVG mouse move handle
     * @description 核心方法 - 处理连线轨迹 - 更新节点拖拽变化值
     * @argument {MouseEvent} event - mouse event
     */
    svgMouseMove(event) {
        // 拖拽节点
        this.handleDragNode(event);
        // 连接节点
        this.handleLinkNode(event);
    }

    /**
     * 全局SVG mouse up handle.
     * @description 核心方法 - 处理连线轨迹 - 更新节点拖拽变化值
     */
    svgMouseUp() {
        // 处理连接至另一节点，即连接完毕
        this.handleLinkNodeOver();
        // 连线后初始化相关变量
        this.initializeLinkEnv();
    }

    /**
     * 节点拖拽处理
     * @argument {MouseEvent} event - mouse event
     */
    handleDragNode(event) {
        const node = this.nodes.find(node => node.mousedownNode === true);
        if (node) {
            // 更新节点位置
            const { movementX, movementY } = event;
            const { x, y } = node.position;
            node.position = {
                x: x + movementX,
                y: y + movementY,
            };

            // 获取矩形宽高
            getRectWH(node.style);

            // 连线数据随节点位置变更实时变更处理
            if (this.edges.length > 0) {
                this.edges.forEach(edge => {
                    edge.lineData = this.edgeData(edge);
                    return edge;
                });
            }
        }
    }

    /**
     * 变更鼠标样式
     * @argument {string} stage
     */
    changeMouseStyle(stage) {
        let cursor = 'initial';
        if (stage === 'start') cursor = 'crosshair';
        Object.assign(this.svgContainer.style, { cursor });
    }

    /**
     * 节点连接处理
     * @argument {MouseEvent} event - mouse event
     */
    handleLinkNode(event) {
        const linkNode = this.nodes.find(node => node.dotLink !== '');
        if (linkNode) {
            // 插入连线预览
            console.log('start link..');
            // 设置连线时鼠标样式
            this.changeMouseStyle('start');
            // diy line style.
            let style = {};
            if ('line' in this.options) {
                if ('style' in this.options.line) {
                    style = this.options.line.style;
                }
            }
            // 生成edge实例
            this.edge = new Edge({ style });
            this.edge.source = linkNode.id;
            this.edge.dotLink = linkNode.dotLink;
            // 插入虚拟edge实例
            this.virtualG.appendChild(this.virtualEdge.edge);
            this.virtualEdge.lineData = this.caclPathDragData(linkNode, event);
        }
    }

    /**
     * 节点连接完毕处理
     */
    handleLinkNodeOver() {
        const endLinkNode = this.nodes.find(node => node.dotEndLink !== '');
        if (endLinkNode) {
            console.log('end link.');
            // 设置连线完毕时鼠标样式
            this.changeMouseStyle('end');
            // 判断路径是否已存在，对连接路径数进行限制，两个节点之间最大连接路径数为2
            const edgeExist =
                this.edges.find(edge => edge.target === endLinkNode.id) ||
                false;
            if (!edgeExist) {
                this.edge.target = endLinkNode.id;
                this.edge.dotEndLink = endLinkNode.dotEndLink;
                this.edge.lineData = this.edgeData(this.edge);
                // 新连接路径推入路径栈中
                this.edges.push(this.edge);
                // 向路径容器中插入路径
                this.edgeG.appendChild(this.edge.edge);
            }
            // 清空被连接端节点，末尾连接点类型数据
            endLinkNode.dotEndLink = '';
        }
    }

    /**
     * 初始化连接环境
     */
    initializeLinkEnv() {
        this.nodes.forEach(node => {
            if (node.mousedownNode) {
                node.mousedownNode = false;
            }
            if (node.linkActive) {
                node.linkActive = false;
                node.dotLink = '';
                if (this.virtualG.hasChildNodes()) {
                    this.virtualG.removeChild(this.virtualEdge.edge);
                }
            }
            return node;
        });
    }

    /**
     * 动态计算路径拖拽数据
     * @argument {NodeClass} mousedownNode - 当前 mousedown 状态节点
     * @argument {MouseEvent} event - mouse event
     * @return {string} path attr 'd' value
     */
    caclPathDragData(mousedownNode, event) {
        const { offsetX: endX, offsetY: endY } = event;
        const { linkNode } = mousedownNode;
        const dotLink = mousedownNode.dotLink;
        const startX = linkNode[dotLink].x;
        const startY = linkNode[dotLink].y;
        return `M ${startX},${startY} L ${endX},${endY}`;
    }

    /**
     * 连线数据
     * @argument edge - 路径元数据
     */
    edgeData(edge) {
        const { dotLink, dotEndLink } = edge;
        if (edge.source && edge.target) {
            const {
                linkNode: sourceLinkNode,
                y: sourceNodeY,
            } = this.nodes.find(node => node.id === edge.source);
            const { linkNode: targetLinkNode } = this.nodes.find(
                node => node.id === edge.target,
            );

            let startX = sourceLinkNode[dotLink].x;
            let startY = sourceLinkNode[dotLink].y;
            let endX = targetLinkNode[dotEndLink].x;
            let endY = targetLinkNode[dotEndLink].y;

            const linkData = {
                dotLink,
                dotEndLink,
                startX,
                startY,
                endX,
                endY,
            };

            // 连接端点同侧
            const sameLinkDotResult = handleTheSameLinkDot(linkData);

            if (sameLinkDotResult !== '') {
                return sameLinkDotResult;
            }

            // link dot is left or right.
            if (
                dotLink !== 'top' &&
                dotLink !== 'bottom' &&
                dotEndLink !== 'top' &&
                dotEndLink !== 'bottom'
            ) {
                return this.linkDotIsLeftOrRight(linkData, edge, sourceNodeY);
            }

            // link dot is top or bottom.
            if (
                dotLink !== 'left' &&
                dotLink !== 'right' &&
                dotEndLink !== 'left' &&
                dotEndLink !== 'right'
            ) {
                return this.linkDotIsTopOrBottom(linkData);
            }

            return this.linkDotIsOthers(linkData);
        }
    }

    /**
     * 连接点仅为左或右
     */
    linkDotIsLeftOrRight(linkData, edge, sourceNodeY) {
        let { startX, startY, endX, endY } = linkData;
        // 连接端点同侧
        const sameLinkDotResult = handleTheSameLinkDot(linkData);

        if (sameLinkDotResult !== '') {
            return sameLinkDotResult;
        }

        // 连接端点不同侧且节点之间处于同一纵向水平线的
        const NotSameLinkDotAndACSLResult = handelNotSameLinkDotAndAlongColStraightLine(
            linkData,
        );

        if (NotSameLinkDotAndACSLResult !== '') {
            return NotSameLinkDotAndACSLResult;
        }

        // 纵坐标最小连线误差直线拟合
        const minY = Math.abs(startY - endY);
        const rangeNum = 3;
        if (minY < rangeNum) {
            endY = startY;
            this.nodes.forEach(i => {
                if (i.id === edge.target) {
                    i.y = sourceNodeY;
                    return i;
                }
            });
        }
        // 连接端点不同侧且为水平线连接（最常见的连接情况）
        const { midX1, midY1, midX2, midY2 } = getMidXPath(
            startX,
            startY,
            endX,
            endY,
        );

        return `M ${startX},${startY} L ${midX1},${midY1} L ${midX2},${midY2} L ${endX},${endY}`;
    }

    /**
     * 连接点仅为上或下
     */
    linkDotIsTopOrBottom(linkData) {
        let { startX, startY, endX, endY } = linkData;
        // 连接纵向端点同侧
        const sameLinkDotResult = handleTheColSameLinkDot(linkData);

        if (sameLinkDotResult !== '') {
            return sameLinkDotResult;
        }

        // 连接端点为纵向不同侧且节点之间处于同一水平线的
        const NotSameLinkDotAndASLResult = handleNotSameLinkDotAndAlongStraightLine(
            linkData,
        );

        if (NotSameLinkDotAndASLResult !== '') {
            return NotSameLinkDotAndASLResult;
        }

        // 横坐标最小连线误差直线拟合
        endX = getFittedEndX(startX, endX);

        // 连接端点不同侧且为纵向水平线连接（最常见的连接情况）
        const { midX1, midY1, midX2, midY2 } = getMidYPath(
            startX,
            startY,
            endX,
            endY,
        );
        return `M ${startX},${startY} L ${midX1},${midY1} L ${midX2},${midY2} L ${endX},${endY}`;
    }

    /**
     * 连接点为水平方向与纵向时
     */
    linkDotIsOthers(linkData) {
        let { startX, startY, endX, endY } = linkData;
        return `M ${startX},${startY} L ${endX},${endY}`;
    }

    /**
     * 增加节点
     * @argument {SVGGElement} node
     */
    addNode(node) {
        this.nodes.push(node);
        this.nodeG.appendChild(node.node);
    }

    /**
     * 删除节点
     * @argument {SVGGElement} node
     */
    deleteNode(node) {
        const index = this.nodes.findIndex(n => n.id === node.id);
        if (index !== -1) {
            this.nodes.splice(index, 1);
        }
    }

    /**
     * 删除路径
     * @argument {SVGPathElement} edge
     */
    deleteEdge(edge) {
        const index = this.edges.findIndex(e => e.id === edge.id);
        if (index !== -1) {
            this.edges.splice(index, 1);
        }
    }

    /**
     * 获取svg JSON数据
     */
    getCoreData() {
        // const nodes = this.nodes.map(node => {
        //     const { id, linkNode, style } = node;
        //     return {
        //         id,
        //         linkNode,
        //         style,
        //     };
        // });
        // const edges = this.edges.map(edge => {
        //     const { id, lineData, source, target, dotLink, dotEndLink } = edge;
        //     return { id, lineData, source, target, dotLink, dotEndLink };
        // });
        return {
            nodes: this.nodes,
            edges: this.edges,
        };
    }
}
