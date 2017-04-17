/*
** utils.js 工具JS
** auth:whr
** time:2017.3.23
*/
function extend(...args){
	/* 至少传入2个参数，传入的参数都将会被深度复制，不会影响原对象
	** 返回值为所有参数合并后的对象*/
	if(args.length < 2) return;
	let temp = deepCopy(args[0]); //调用复制对象方法，防止第一个参数被篡改
	args.forEach(v => {
		for(let i in v){
			temp[i] = v[i];
		}
	})
	return temp;
}
function deepCopy(p,c = {}){
	/* p [必选] [对象] 被克隆对象
	** c ：[可选] p对象被克隆到c身上，c被改变
	** 返回值为深度克隆后的c*/
	for(let i in p){
	    if (typeof p[i] === 'object') {
	        c[i] = p[i].constructor === Array ? [] : {};
	        deepCopy(p[i],c[i]);
	    } else {
	        c[i] = p[i];
	    }
	}
	return c;
};

// 使用webpack的require功能管理模块
export default {
	extend,
	deepCopy
}