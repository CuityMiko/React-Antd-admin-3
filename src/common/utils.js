/*
** utils.js 工具JS
** auth:whr
** time:2017.3.23
*/
/* eslint-disable */
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

function jsonp(url,config){  
    var data = config && config.data || [];  
    var paraArr=[],paraString='';//get请求的参数。  
    var urlArr;  
    var callbackName;//每个回调函数一个名字。按时间戳。  
    var script,head;//要生成script标签。head标签。  
    var supportLoad;//是否支持 onload。是针对IE的兼容处理。  
    var onEvent;//onload或onreadystatechange事件。  
    var timeout = config && config.timeout || 0;//超时功能。  
    for(var i in data){  
        if(data.hasOwnProperty(i)){  
            paraArr.push(encodeURIComponent(i) + "=" +encodeURIComponent(data[i]));  
        }  
    }  
    urlArr = url.split("?");//链接中原有的参数。  
    if(urlArr.length>1){  
        paraArr.push(urlArr[1]);  
    }  
    callbackName = 'callback'+new Date().getTime();  
    paraArr.push('callback='+callbackName);  
    paraString = paraArr.join("&");  
    url = urlArr[0] + "?"+ paraString;  
    script = document.createElement("script");
    script.loaded = false;//为了实现IE下的onerror做的处理。JSONP的回调函数总是在script的onload事件（IE为onreadystatechange）之前就被调用了。因此我们在正向回调执行之时，为script标签添加一个属性，然后待到onload发生时，再检测有没有这个属性就可以判定是否请求成功，没有成功当然就调用我们的error。  
    //将回调函数添加到全局。  
    window[callbackName] = function(arg){  
        var callback = config && config.callback;  
        callback && callback(arg);  
        script.loaded = true;  
    }  
    head = document.getElementsByTagName("head")[0];  
    head.insertBefore(script, head.firstChild) //chrome下第二个参数不能为null  
    script.src = url;  
    supportLoad = "onload" in script;  
    onEvent = supportLoad ? "onload" : "onreadystatechange";  
    script[onEvent] = function(){  
        if(script.readyState && script.readyState !== "loaded"){  
            return;  
        }  
        if(script.readyState === 'loaded' && script.loaded === false){  
            script.onerror();  
            return;  
        }  
        //删除节点。  
        (script.parentNode && script.parentNode.removeChild(script))&& (head.removeNode && head.removeNode(this));    
        script = script[onEvent] = script.onerror = window[callbackName] = null;  
    }
    script.onerror = function(){  
        if(window[callbackName] == null){  
            console.log("请求超时，请重试！");  
        }  
        config.error && config.error();//如果有专门的error方法的话，就调用。  
        (script.parentNode && script.parentNode.removeChild(script))&& (head.removeNode && head.removeNode(this));    
        script = script[onEvent] = script.onerror = window[callbackName] = null;  
    }  
    if(timeout!= 0){
        setTimeout(function() {  
            if(script && script.loaded === false){  
                window[callbackName] = null;//超时，且未加载结束，注销函数  
                script.onerror();                 
            }  
        }, timeout);  
    }  
}

function tryget(o, path, v) {
    var parts = path.split('.'),
        part, len = parts.length;
    for (var t = o, i = 0; i < len; ++i) {
        part = parts[i];
        if (part in t) {
            t = t[parts[i]];
        } else {
            return v;
        }
    }
    return t;
}
function formatDate(formatStr,dateObj){
    /**
    * ##str.format(formatString, ...)##
    * @param {String} formatString
    * @return {String}
    *
    * ```javascript
    * //Simple
    * str.format('{0}',2014) //Error
    * str.format('{0}',[2014])
    * => 2014
    *
    * str.format('{2}/{1}/{0}',[2014,6,3])
    * => "3/6/2014"
    *
    * str.format('{2}/{1}/{0}',2014,6,3)
    * => "3/6/2014"
    *
    * str.format("{year}-{month}-{date}",{year:2014,month:6,date:3})
    * => "2014-6-3"
    *
    * //Advanced
    * str.format('{2,2,0}/{1,2,0}/{0}',[2014,6,3]);
    * => "03/06/2014"
    *
    * str.format('{2,2,!}/{1,2,*}/{0}',[2014,6,3]);
    * => "!3/*6/2014"
    *
    * str.format("{year}-{month,2,0}-{date,2,0}",{year:2014,month:6,date:3})
    * => "2014-06-03"
    *
    * str.format('{0,-5}',222014)
    * => "22014"
    *
    * format('{0,6,-}{1,3,-}','bar','')
    * => "---bar---"
    * ```
    */
    var format = (function() {
        function postprocess(ret, a) {
            var align = parseInt(a.align),
                absAlign = Math.abs(a.align),
                result, retStr;

            if (ret == null) {
                retStr = '';
            } else if (typeof ret == 'number') {
                retStr = '' + ret;
            } else {
                throw new Error('Invalid argument type!');
            }

            if (absAlign === 0) {
                return ret;
            } else if (absAlign < retStr.length) {
                result = align > 0 ? retStr.slice(0, absAlign) : retStr.slice(-absAlign);
            } else {
                result = Array(absAlign - retStr.length + 1).join(a.pad || format.DefaultPaddingChar);
                result = align > 0 ? result + retStr : retStr + result;
            }
            return result;
        }

        function p(all) {
            var ret = {},
                p1, p2, sep = format.DefaultFieldSeperator;
            p1 = all.indexOf(sep);
            if (p1 < 0) {
                ret.index = all;
            } else {
                ret.index = all.substr(0, p1);
                p2 = all.indexOf(sep, p1 + 1);
                if (p2 < 0) {
                    ret.align = all.substring(p1 + 1, all.length);
                } else {
                    ret.align = all.substring(p1 + 1, p2);
                    ret.pad = all.substring(p2 + 1, all.length);
                }
            }
            return ret; //{index,pad,align}
        }

        return function(self, args) {
            var len = arguments.length;
            if (len > 2) {
                args = Array.prototype.slice.call(arguments, 1);
            } else if (len === 2) {
                // args = [args];
            } else if (len === 1) {
                return self;
            }
            return self.replace(format.InterpolationPattern, function(all, m) {
                var a = p(m),
                    ret = tryget(args, a.index);
                if (ret == null) ret = a.index;
                return a.align == null && a.pad == null ? ret : postprocess(ret, a) || ret;
            });
        };
    })();

    format.DefaultPaddingChar = ' ';
    format.DefaultFieldSeperator = ',';
    format.InterpolationPattern = /\{(.*?)\}/g;

    return format(formatStr, dateObj)
}

export {
  extend,
  deepCopy,
  jsonp,
  formatDate
}

