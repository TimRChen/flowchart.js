import { Core, Node, Edge } from '../core/index.js';
import { typeOf } from '../utils/tools.js';
/**
 * flowchart layout - relationship grap.
 * @description 容器类
 * @author TimRChen <timrchen@foxmai.com>
 */
export default class RSGraph {
    constructor(selectors, config) {
        const { data, coreOptions = {}, direction = 'y-axis' } = config;
        this.nodes = this.initData(data);
        this.core = {};
        this.coreOptions = coreOptions;
        this.direction = direction;
        this.init(selectors, config);
    }

    /**
     * 初始化处理数据
     * @argument {Array} data
     */
    initData(data) {
        if (typeOf(data) === 'Array') {
            return data.map(node => {
                const hasPosition = 'position' in node;
                if (!hasPosition) {
                    node.position = { x: 50, y: 50 };
                }
                return node;
            });
        } else {
            throw TypeError(`${data} is not Array`);
        }
    }

    /**
     * 初始化全局
     * @argument {String} selectors dom选择字符串
     * @argument {Object} config
     */
    init(selectors, config) {
        const { zoom = false, coreOptions = {} } = config;
        const options = {
            linkDot: {
                display: 'none',
            },
        };
        Object.assign(options, coreOptions, { mode: 'render-mode' });
        this.core = new Core(selectors, options);
        this.initialLayout(this.nodes);
        if (zoom) this.core.zoom(selectors);
    }

    /**
     * 布局
     * @argument {Array} nodes
     */
    initialLayout(nodes) {
        // 找出根节点
        const rootNode = this.findRoot(nodes);
        // 判断根节点是否已存在
        const rootIndex = this.core.nodes.findIndex(
            node => node.id === rootNode.id,
        );
        if (rootIndex === -1) {
            // 若根节点不存在则创建
            this.createNode(rootNode);
        }
        // 筛选子节点
        const cNodes = nodes.filter(node => node.parent === rootNode.id);
        // 将后续子孙节点注入递归队列中
        let recursionQueue = [];
        cNodes.forEach(node => {
            if (node.parent === rootNode.id) {
                if (node.children.length > 0) {
                    let list = cNodes.filter(
                        n => node.children.indexOf(n.id) !== -1,
                    );
                    const childs = this.findChilds(this.nodes, node);
                    list = Array.from(new Set([node, ...list, ...childs]));
                    recursionQueue.push(list);
                }
            }
        });

        // 创建子节点并初始化位置 position is the key.
        let lastNodeLen = 0;
        cNodes.forEach((node, index) => {
            const nodeInstance = this.createNode(node);
            const len = node.children.length;
            // 根据子节点个数生成父节点位置
            if (len >= 1) {
                // 明确子节点的子节点的子节点的个数
                const bNodes = this.nodes.filter(n => {
                    if (node.children.indexOf(n.id) !== -1) {
                        return n;
                    }
                });
                const bChildrenLen = bNodes.reduce((acc, curv) => {
                    if (curv.children.length > 0) {
                        return acc + curv.children.length;
                    } else {
                        return acc;
                    }
                }, 0);
                const position = this.getPosition(node, rootNode, lastNodeLen);
                nodeInstance.changePosition(position);
                if (len > 1) {
                    lastNodeLen += len + bChildrenLen;
                } else {
                    lastNodeLen += 1;
                }
            } else {
                const position = this.getPosition(node, rootNode, index);
                nodeInstance.changePosition(position);
                lastNodeLen += 1;
            }
        });

        // 绘制连接
        this.drawLink(cNodes, rootNode);

        // 递归子节点包含有子孙节点情况
        if (recursionQueue.length > 0) {
            recursionQueue.forEach(list => {
                this.initialLayout(list);
            });
        }
    }

    /**
     * 查找根节点
     * @argument {Array} nodes
     * @return {Object} rootNode
     */
    findRoot(nodes) {
        const rootNode = nodes.find(node => {
            if (node.children.length > 0) {
                const index = nodes.findIndex(n => node.parent === n.id);
                return index === -1;
            }
        });
        return rootNode;
    }

    /**
     * 将当前节点下的所有子孙节点找出
     * @description 此 node 具备两个条件：1. 它是当前父节点下的子节点 2. 它有子节点
     * @argument {Array} nodes
     * @argument {Object} node
     * @return {Array}
     */
    findChilds(nodes, node) {
        let cs = [];
        const childs = nodes.filter(n => {
            if (n.parent === node.id) {
                if (n.children.length > 0) {
                    cs = this.findChilds(nodes, n);
                }
                return n;
            }
        });
        return Array.from(new Set([...childs, ...cs]));
    }

    /**
     * 初始化position属性
     * @argument {Object} node
     * @argument {Object} rootNode
     * @argument {Number} len
     * @return {Object} position
     */
    getPosition(node, rootNode, len) {
        const { width, height } = node;
        const { direction } = this;
        if (
            width === 0 ||
            height === 0 ||
            width === undefined ||
            height === undefined
        ) {
            throw Error('node must has "width" an "height" attributes');
        }
        const baseWidth = width * 2;
        const baseHeight = height * 2;
        const { x, y } = rootNode.position;
        let xPosition = 0;
        let yPosition = 0;
        if (direction === 'y-axis') {
            xPosition = x + baseWidth * len;
            yPosition = y + baseHeight;
        } else if (direction === 'x-axis') {
            xPosition = x + baseWidth;
            yPosition = y + baseHeight * len;
        }
        node.position = {
            x: xPosition,
            y: yPosition,
        };
        return node.position;
    }

    /**
     * 创建节点
     * @argument {Object} node
     * @return {Object} node instance
     */
    createNode(node) {
        const domSelectors = `.item[data-rsgraph-id="${node.id}"]`;
        const htmlData = document.querySelector(domSelectors);
        const { width = 0, height = 0, position } = node;
        if (
            width === 0 ||
            height === 0 ||
            width === undefined ||
            height === undefined
        ) {
            throw Error('node must has "width" an "height" attributes');
        }
        let nodeInstance = new Node({
            position,
            style: {
                width,
                height,
                userSelect: 'none',
                rx: 10,
            },
            html: {
                meta: htmlData,
            },
        });
        Object.assign(nodeInstance, node);
        this.core.addNode(nodeInstance);
        return nodeInstance;
    }

    /**
     * 绘制连接关系
     * @argument {Array} nodes
     * @argument {Object} rootNode
     */
    drawLink(nodes, rootNode) {
        const {
            line: { style = {} },
        } = this.coreOptions;
        let dotLink = 'bottom';
        let dotEndLink = 'top';
        if (this.direction === 'x-axis') {
            dotLink = 'right';
            dotEndLink = 'left';
        }
        nodes.forEach(node => {
            const edge = new Edge({ style });
            this.core.addEdge(edge, {
                source: rootNode.id,
                target: node.id,
                dotLink,
                dotEndLink,
            });
        });
    }
}
