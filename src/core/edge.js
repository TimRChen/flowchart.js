import { getRandomInt, creatSvgElement } from '../utils/tools.js';

/**
 * flowchart核心库
 * @description 路径类
 * @author TimRChen <timrchen@foxmai.com>
 */
export default class Edge {
    constructor(options = {}) {
        // initial class property.
        this.id = getRandomInt();
        this.source = 0;
        this.target = 0;
        this.lineData = ''; // 路径数据，path属性d对应value值
        this.edge = this.createEdge();
        this.dotLink = ''; // 节点起始连接端点
        this.dotEndLink = ''; // 节点终止连接端点
        this.watchProperty();

        // 连线样式覆盖
        if ('style' in options) {
            Object.assign(this.edge.style, options.style);
        }
    }

    /**
     * 监听属性变化
     */
    watchProperty() {
        let lineData = '';
        // lineDragData属性值可追溯
        Object.defineProperty(this, 'lineData', {
            enumerable: true,
            get: () => lineData,
            set: value => {
                lineData = value;
                this.setPath();
            },
        });
    }

    /**
     * 初始化路径
     */
    setPath() {
        this.edge.setAttribute('d', this.lineData);
    }

    /**
     * 创建路径元
     */
    createEdge() {
        let edge = creatSvgElement('path');
        edge.setAttribute('class', 'link');
        edge.setAttribute('marker-end', 'url(#mark-arrow)');
        edge = this.initializeStyle(edge);
        return edge;
    }

    /**
     * 初始化样式
     * @argument {SVGPathElement} edge
     */
    initializeStyle(edge) {
        // default style
        Object.assign(edge.style, {
            fill: 'none',
            stroke: '#000',
            strokeWidth: 2,
            strokeLinejoin: 'round',
        });
        return edge;
    }
}
