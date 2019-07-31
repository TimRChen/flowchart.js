/**
 * 获取随机字符
 * @return {number}
 */
export function getRandomInt() {
    const num = Math.random() * 100000;
    return Math.floor(num);
};

/**
 * 创建svg元素
 * @param {*} tagName 
 */
export function creatSvgElement(tagName) {
    return document.createElementNS('http://www.w3.org/2000/svg', tagName);
};