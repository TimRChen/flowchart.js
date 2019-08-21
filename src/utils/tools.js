/**
 * 获取随机字符
 * @return {number}
 */
export function getRandomStr() {
    const width = 32;
    const charStr = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    // 去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
    const maxPos = charStr.length;
    let randomStr = '';
    for (let i = 0; i < width; i++) {
        randomStr += charStr.charAt(Math.floor(Math.random() * maxPos));
    }
    return randomStr;
}

/**
 * 创建svg元素
 * @param {*} tagName
 */
export function creatSvgElement(tagName) {
    return document.createElementNS('http://www.w3.org/2000/svg', tagName);
}

/**
 * 获取数据类型
 * @param {*} data
 */
export function typeOf(data) {
    return Object.prototype.toString.call(data).slice(8, -1);
}
