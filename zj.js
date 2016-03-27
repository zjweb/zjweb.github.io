/*多立即函数放置扩展函数*/
(function(){
    stringExtend()
    arrayExtend()
    functionExtend()
    function stringExtend(){

        /*新增一个方法*/
        String.prototype.formateString=function(data){
            return this.replace(/@\((\w+)\)/g, function(match, key){
                return typeof data[key] === "undefined" ? '' : data[key]});
        }

        /*trim是ES5新增的，以前的版本不支持，一般我们在编程的时候不会直接使用ES5，所以必须自己扩充*/
        String.prototype.trim = function() {
            return this.replace(/(^\s*)|(\s*$)/g, "");
        }

        /*字符串-去掉前空白字符 */
        String.prototype.ltrim = function(){
            return this.replace(/(^\s*)/g, "");
        }

        /**
         *字符串-去掉后空白字符
         */
        String.prototype.rtrim = function(){
            return this.replace(/(\s*$)/g, "");
        }

        /**
         * 将一个字符串的首字母大写，其它字符小写
         */
        String.prototype.capitalize= function() {
            return this.trim().replace(/^(\w{1})(.*)/g, function(match, g1, g2) {
                return g1.toUpperCase() + g2.toLowerCase();
            });
        }

        /**
         * 将字符串中的下划线转换成中划线
         */
        String.prototype.dashString = function() {
            return this.replace(/\_/g, '-');
        }

        /**
         * 检测字符串是否是空串
         */
        String.prototype.isEmpty = function() {
            return this.length === 0;
        }

        /**
         * 检测字符串是否包含特定的字符串
         */
        String.prototype.contains = function(target) {
            return this.indexOf(target) !== -1;
        }

        /**
         * 对字符串中的特殊字符进行转义，避免XSS
         */
        String.prototype.escapeHTML=function() {
            //转义后的字符是可以直接设置成innerHTML的值。
            //replace(/&/g, '&amp;')这条replace()调用一定要写在所有的特殊字符转义的前面，不然转换后有&符号的会再被转一次
            return this.replace(/&/g, '&amp;')
                .replace(/\</g, '&lt;')
                .replace(/\>/g, '&gt;')
                .replace(/\'/g, '&#39;')
                .replace(/\"/g, '&quot;');

            /*var strArr = this.split('');
             for(var pos = 0, l = strArr.length, tmp; pos < l; pos++) {
             tmp = strArr[pos];
             switch(tmp) {
             case '<':
             replaceArr(strArr, pos, '&lt;');
             break;
             case '>':
             replaceArr(strArr, pos, '&gt;');
             break;
             case '\'':
             replaceArr(strArr, pos, '&#39;');
             break;
             case '\"':
             replaceArr(strArr, pos, '&quot;');
             break;
             case '&':
             replaceArr(strArr, pos, '&amp;');
             break;
             default:;
             }
             }
             return strArr.join('');

             function replaceArr(arr, pos, item) {
             return arr.splice(pos, 1, item);
             }*/
        },

        /**
         * 对字符串进行反转义
         */
         String.prototype.unescapeHTML = function() {
                return this.replace(/&amp;/, '&')
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&#39;/g, '\'')
                    .replace(/&quot;/g, '\"')
                    .replace(/&#(\d+)/g, function($0, $1) {
                        return String.formCharCode(parseInt($1, 10));
                    });
            }


        /**
         * 取得字符串的逆序
         */
        String.prototype.reverse = function() {
            return (this.toString()).split('').reverse().join('');
        }

    }
    function arrayExtend(){


        /*--数组扩展方法--*/

        /*数组基础*/
        /* 将数组清空，并返回这个数组的引用*/
        Array.prototype.clear = function() {
            this.length = 0;
            return this;
        }

        /* 返回数组第一项*/
        Array.prototype.first = function() {
            return this[0];
        }

        /* 返回数组最后一项*/
        Array.prototype.last = function() {
            return this[this.length - 1];
        }

        /* 返回数组的大小，即数组长度*/
        Array.prototype.size = function() {
            return this.length;
        }



        /*计算类*/
        function cacl(arr, callback) {
            var ret;
            for (var i=0; i<arr.length;i++) {
                ret = callback(arr[i], ret);
            }
            return ret;
        }
        Array.prototype.max = function () {
            return cacl(this, function (item, max) {
                if (!(max > item)) {
                    return item;
                }
                else {
                    return max;
                }
            });
        };
        Array.prototype.min = function () {
            return cacl(this, function (item, min) {
                if (!(min < item)) {
                    return item;
                }
                else {
                    return min;
                }
            });
        };
        Array.prototype.sum = function () {
            return cacl(this, function (item, sum) {
                if (typeof (sum) == 'undefined') {
                    return item;
                }
                else {
                    return sum += item;
                }
            });
        };
        Array.prototype.avg = function () {
            if (this.length == 0) {
                return 0;
            }
            return this.sum(this) / this.length;
        };


        //数组的交，并，差集
        /* 返回数组与目标数组的交集组成的数组*/
        Array.prototype.intersect = function(target) {
            var originalArr = this.unique(),
                target = target.unique();
            return originalArr.filter(function(e, i, self) {
                for( var i = 0, l = target.length; i < l; ++i) {
                    if(e === target[i]) {
                        return true;
                    }
                }
                return false;
            });
        }

        /* 返回数组与目标数组的并集组成的数组*/
        Array.prototype.union = function(target) {
            return this.concat(target).unique();
        }

        /*返回数组与目标数组的差集组成的数组*/
        Array.prototype.diff = function(target) {
            var originalArr = this.unique(),
                target = target.unique();
            return originalArr.filter(function(e, i, self) {
                for( var i = 0, l = target.length; i < l; ++i) {
                    if(e === target[i]) {
                        return false;
                    }
                }
                return true;
            });
        }



        /* ES5 ES6新增*/
        /*去除数组中的重复项*/
        Array.prototype.unique = function() {
            var a = []; var l = this.length;
            for (var i = 0; i < l; i++) {
                for (var j = i + 1; j < l; j++) {
                    if (this[i] === this[j]) j = ++i;
                }
                a.push(this[i]);
            }
            return a;
        };

        /* 对数组的每一项执行回调,这个方法没返回值*/
        Array.prototype.forEach= function(fn, ctx) {
            for(var i = 0, l = this.length; i < l; i++) {
                fn.call(ctx || null, this[i], i, this);
            }
        }

        /*对数组每项运行回调函数，返回由回调函数的结果组成的数组*/
        Array.prototype.map = function(fn, ctx) {
            var ret = [];
            for(var i = 0, l = this.length; i < l; i++) {
                ret.push(fn.call(ctx || null, this[i], i, this));
            }
            return ret;
        }

        /*对数组每项运行回调函数，返回使回调函数返回值为true组成的数组*/
        Array.prototype.filter = function(fn, ctx) {
            var ret = [];
            for(var i = 0, l = this.length; i < l; i++) {
                fn.call(ctx || null, this[i], i, this) &&
                ret.push(this[i]);
            }
            return ret;
        }

        /*对数组每项运行回调函数，如果所有的回调函数都返回true, 则返回true*/
        Array.prototype.every = function(fn, ctx) {
            for(var i = 0, l = this.length; i < l; i++) {
                !!fn.call(ctx || null, this[i], i, this) === false;
                return false;
            }
            return true;
        }

        /*对数组每项运行回调函数，如果有一项回调函数返回true, 则返回true*/
        Array.prototype.some = function(fn, ctx) {
            for(var i = 0, l = this.length; i < l; i++) {
                !!fn.call(ctx || null, this[i], i, this) === true;
                return true;
            }
            return false;
        }

        /**
         * 从左向右（顺利）对数组的每一项(从第二项开始，即下标为1)运行回调函数。
         * 回调函数包含四个参数prev（上一次回调的返回值）, cur（当前数组项）, index（当前数组项的索引）, self（数组本身）
         */
        Array.prototype.reduce = function(callback) {
            var i = 1, //从数组第二个元素开始
                l = this.length,
                callbackRet = this[0];
            for(; i < l; ++i) {
                callbackRet = callback.call(null, callbackRet, this[i], i, this);
            }
            return callbackRet;
        },


        /**
         * 从右向左（逆序）对数组的每一项(从倒数第二项开始，即下标为arr.length - 2)运行回调函数。
         * 回调函数包含四个参数prev（上一次回调的返回值）, cur（当前数组项）, index（当前数组项的索引）, self（数组本身）
         */
         Array.prototype.reduceRight = function(callback) {
                var l = this.length,
                    i = l - 2, //从数组倒数第二个元素开始
                    callbackRet = this[l - 1]; //回调初始值为数组最后一个元素的值
                for(; i >= 0; --i) {
                    callbackRet = callback.call(null, callbackRet, this[i], i, this);
                }
                return callbackRet;
            }


        /**
         * 返回目标值在数组中第一次出现的位置，搜索从左向右进行。
         * 如果目标值在数组中不存在，则返回-1。可以指定一个搜索起始位置。默认为0
         */
        Array.prototype.indexOf= function(target, start) {
            var l = this.length,
                start = ~~start;//可以指定一个搜索起始位置。默认为0。start不传，默认为undefined,~~undefined -> 0
            if(start < 0)
                start = 0;//如果指定的搜索位置小于0，则设置其开始搜索位置为0
            for(; start < l; ++start) {
                if(this[start] === target)
                    return start;
            }
            return -1;
        },


        /**
         * 返回目标值在数组中的位置。搜索从右向左进行
         * 如果目标值在数组中不存在，则返回-1。可以指定一个搜索起始位置。默认为数组长度
         */
         Array.prototype.lastIndexOf = function(target, start) {
                var l = this.length;
                if(start === void 0)
                    start = this.length;
                else if(start < 0)
                    start = 0;
                for(;start >= 0; --start) {
                    if(this[start] === target)
                        return start;
                }
                return -1;
            }


        /**
         * 对于单一类型的数组，可以使用此方法去重。
         * 但这类数组：[ 'ff', 1, '1' ]会去重失败
         */
        Array.prototype.enhanceUnique = function() {
            var ret = [], tempMap = {}, temp, i = 0, l = this.length, undef = void 0;
            for(; i < l; ++i) {
                temp = this[i];
                if(tempMap[temp] === undef) {
                    ret.push(temp);
                    tempMap[temp] = true;
                }
            }
            return ret;
        }



        /*去掉数组中的目标元素*/
        Array.prototype.without = function() {
            var args = [].slice.call(arguments).unique(),
                i = 0, l = this.length,
                j = 0, k = args.length;

            for(; i < l; ++i) {
                for(; j < k; ++j) {
                    if(this[i] === args[j]) {
                        this.splice(i, 1);
                    }
                }
                j = 0;//将j归0，以便下次循环
            }
            return this;
        }


        /* 递归将数组扁平化*/
        Array.prototype.flatten = function() {
            var ret = [], i = 0, l = this.length, tmp, toString = ({}).toString;
            for(; i < l; ++i) {
                tmp = this[i];
                if(toString.call(tmp) === '[object Array]') {
                    ret = ret.concat(tmp.flatten());
                } else {
                    ret.push(tmp);
                }
            }
            return ret;
        }



        /* 随机返回数组的一项*/
        Array.prototype.random = function(n) {
            //Math.floor():向下取整。Math.floor(1.8) -> 1
            //Math.ceil():向上取整。Math.ceil(1.1) -> 2
            //v = Math.random() * n:会产生一个 0 < v < nv的数
            //v2 = Math.floor(Math.random() * n)：v2为一个大于等于0，小于n的整数
            return this[Math.floor(Math.random() * n || this.length)];
        },



        /* 删除数组指定位置的项*/
        Array.prototype.removeAt = function(pos) {
                this.splice(pos, 1);
                return this;
            }



        /* 检测数组是否包含目标值*/
        Array.prototype.contains= function(target) {
            return this.some(function(e, i, self) {
                return e === target;
            });
        }



    }
    function functionExtend(){
        //给函数扩展方法
        Function.prototype.before = function( func ) {
            var __self = this;
            return function() {
                if ( func.apply( this, arguments ) === false ) {
                    return false;
                }
                return __self.apply( this, arguments );
            }
        }
        Function.prototype.after = function( func ) {
            var __self = this;
            return function() {
                var ret = __self.apply( this, arguments );
                if( ret === false) {
                    return false;
                }
                func.apply( this, arguments );
                return ret;
            }
        }
    }
})();

/*主框架*/
(function(w){
    /*双对象法则 - 第一个对象*/
    var F = function(selector, context) {
        return this.init(selector,context)
    };
    F.prototype.init = function(selector, context) {
        var that = this;
        that.length=0;
        if(!selector){
            return that;
        }
        if(typeof selector === 'string'){
            var nodeList = (context || document).querySelectorAll(selector);
            that.length = nodeList.length;
            //这里遍历应从第1个开始到倒数第二个，而不是最后一个，因为最后一个属性是length
            for (var i=0; i<this.length; i+=1) {
                that[i] = nodeList[i];
            }
        }else if(selector.nodeType){
            that[0] = selector;
            that.length++;
        }

        return that;
    };


    //双对象法则 - 第二个对象
    /*这里zj可以看做一个json对象*/
    var zj = function(selector,context){
        if(typeof selector == 'function'){
            window.onload = selector;
        }else{
            return new F(selector, context);
        }
    }
    /*给json对象 - zj添加一个方法*/
    zj.extend = function() {
        /* 这段代码的意思：
         如果只传递一个参数，表示给F对象添加功能
         如果传递两个参数，表示给指定的对象添加功能*/
        var key
            ,arg = arguments
            ,i = 1
            ,len = arg.length
            ,target = null;
        if(len === 0){
            return;
        }else if(len === 1){
            target = F.prototype;
            i--;
        }else{
            target = arg[0];
        }

        for(; i < len; i++){
            for(key in arg[i]){
                target[key] = arg[i][key];
            }
        }
        return target;
    }

    w.zj = w.$ = zj;
})(window);

/*公共*/
(function(zj){
    //公共模块
    /*需要链式访问*/
    zj.extend({
        each : function(fn) {
            var i=0, length = this.length;
            for (; i<length; i+=1) {
                fn.call(this[i]);
                //fn.call(this.element[i],i,this.element[i]);
            }
            return this;
        }
    });
    /*不需要链式访问*/
    /*公共*/
    zj.extend(zj, {

    });
    /*字符串*/
    zj.extend(zj, {
        camelCase : function(str){
            return str.replace(/\-(\w)/g, function(all, letter){
                return letter.toUpperCase();
            });
        },
        trim : function(str){
            return str.replace(/^\s+|\s+$/g, '')
        },
        //去除左边空格
        ltrim:function(str){
            return str.replace(/(^\s*)/g,'');
        },
        //去除右边空格
        rtrim:function(str){
            return str.replace(/(\s*$)/g,'');
        },
        //ajax - 前面我们学习的
        myAjax:function(URL,fn){
            var xhr = createXHR();	//返回了一个对象，这个对象IE6兼容。
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
                        fn(xhr.responseText);
                    }else{
                        alert("错误的文件！");
                    }
                }
            };
            xhr.open("get",URL,true);
            xhr.send();

            //闭包形式，因为这个函数只服务于ajax函数，所以放在里面
            function createXHR() {
                //本函数来自于《JavaScript高级程序设计 第3版》第21章
                if (typeof XMLHttpRequest != "undefined") {
                    return new XMLHttpRequest();
                } else if (typeof ActiveXObject != "undefined") {
                    if (typeof arguments.callee.activeXString != "string") {
                        var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                                "MSXML2.XMLHttp"
                            ],
                            i, len;

                        for (i = 0, len = versions.length; i < len; i++) {
                            try {
                                new ActiveXObject(versions[i]);
                                arguments.callee.activeXString = versions[i];
                                break;
                            } catch (ex) {
                                //skip
                            }
                        }
                    }

                    return new ActiveXObject(arguments.callee.activeXString);
                } else {
                    throw new Error("No XHR object available.");
                }
            }
        },
        //简单的数据绑定formateString
        formateString:function(str, data){
            return str.replace(/@\((\w+)\)/g, function(match, key){
                return typeof data[key] === "undefined" ? '' : data[key]});
        },
        //将json转换成字符串
        sjson:function (json) {
            return JSON.stringify(json);
        },
        //将字符串转成json
        json:function (str) {
            return eval(str);
        }
    });
    /*数组*/
    zj.extend(zj, {

    });
    /*Math*/
    zj.extend(zj, {
        //随机数
        random: function (begin, end) {
            return Math.floor(Math.random() * (end - begin)) + begin;
        },
    });
    /*数据类型校验*/
    zj.extend(zj, {
        //数据类型检测
        isNumber:function (val){
            return typeof val === 'number' && isFinite(val)
        },
        isBoolean:function (val) {
            return typeof val ==="boolean";
        },
        isString:function (val) {
            return typeof val === "string";
        },
        isUndefined:function (val) {
            return typeof val === "undefined";
        },
        isObj:function (str){
            if(str === null || typeof str === 'undefined'){
                return false;
            }
            return typeof str === 'object';
        },
        isNull:function (val){
            return  val === null;
        },
        isArray:function (arr) {
            if(arr === null || typeof arr === 'undefined'){
                return false;
            }
            return arr.constructor === Array;
        }
    });


})(zj);

/*事件*/
(function(zj){
    /*事件模块*/
    /*需要参与链式访问*/
    zj.extend({
        // 添加事件
        on : function(type, fn){
            var i = this.length - 1;
            if(document.addEventListener){
                for(; i >= 0; i--){
                    this[i].addEventListener(type, fn, false);
                }
            }else if(document.attachEvent){
                for(; i >= 0; i--){
                    this[i].attachEvent('on' + type, fn);
                }
            }else{
                for(; i >= 0; i--){
                    this[i]['on' + type] = fn;
                }
            }
            return this;
        },
        // 解除事件
        un : function(type, fn){
            var i = this.length - 1;
            if(document.removeEventListener){
                for(; i >= 0; i--){
                    this[i].removeEventListener(type, fn);
                }
            }else if(document.detachEvent){
                for(; i >= 0; i--){
                    this[i].attachEvent('on' + type, fn);
                }
            }else{
                for(; i >= 0; i--){
                    this[i]['on' + type] = null;
                }
            }
            return this;
        },
        /*点击*/
        click : function(fn){
            this.on('click',fn);
            return this;
        },
        mouseover:function(fn){
            this.on('mouseover',fn);
            return this;
        },
        mouseout:function(fn){
            this.on('mouseout',fn);
            return this;
        },
        mousemove:function(){

        },
        /*悬浮*/
        hover : function(fnOver,fnOut){
            var i =0 ;
            for(i = 0; i < this.length; i++){
                if(fnOver){
                    this.on("mouseover",fnOver);
                }
                if(fnOut){
                    this.on("mouseout",fnOut);
                }
            }

            return this;
        },
        toggle:function () {
            var that = this;
            var _arguments=arguments;

            for(var i=0;i<this.length;i++) {
                addToggle(this[i]);
            }

            function addToggle(obj) {
                var count=0;
                that.on('click', function (){
                    _arguments[count++%_arguments.length].call(obj);
                });
            }
        }
    });
    /*不需要参加链式访问*/
    zj.extend(zj, {
        // 获取事件对象
        getEvent : function(event){
            return event ? event : window.event;
        }
        // 获取元素
        ,getTarget : function(event){
            var event = this.getEvent(event);
            return event.target || event.srcElement;
        }
        // 阻止冒泡以及捕获
        ,stopPropagation : function(event){
            var event = this.getEvent(event);
            if(event.stopPropagation){
                event.stopPropagation();
            }else{
                event.cancelBubble = true;
            }
        }
        // 阻止默认行为
        ,preventDefault : function(event){
            var event = this.getEvent(event);
            if(event.preventDefault){
                event.preventDefault();
            }else{
                event.returnValue = false;
            }
        }
        ,getDetail : function(event){
            var event = this.getEvent(event);
            if(event.wheelDelta){
                return event.wheelDelta;
            }else{
                return -event.detail * 40;
            }
        }
    });
})(zj);

/*css*/
(function(zj){
    //css样式框架
    zj.extend({
        css : function(){
            var arg = arguments,
                len = arg.length;
            if(this.length < 1){
                return this;
            }
            if(len === 1){
                if(typeof arg[0] === 'string'){
                    if(this[0].currentStyle){
                        return this[0].currentStyle[arg[0]];
                    }else{
                        return getComputedStyle(this[0],false)[arg[0]];
                    }
                }else if(typeof arg[0] === 'object'){
                    for(var i in arg[0]){
                        for(var j = this.length - 1; j >= 0; j--){
                            this[j].style[zj.camelCase(i)] = arg[0][i];
                        }
                    }
                }
            }else if(len === 2){
                for(var j = this.length - 1; j >= 0; j--){
                    this[j].style[zj.camelCase(arg[0])] = arg[1];
                }
            }
            return this;
        },
        /*hide*/
        hide : function() {
            this.each(function() {
                this.style.display = "none";
            });
        },
        /*show*/
        show :function() {
            this.each(function() {
                this.style.display = "block";
            });
        },
        //元素高度宽度概述
        //计算方式：clientHeight clientWidth innerWidth innerHeight
        //元素的实际高度+border，也不包含滚动条
        width:function (){
            return this[0].clientWidth
        },
        height:function (){
            return this[0].clientHeight
        },

        //元素的滚动高度和宽度
        //当元素出现滚动条时候，这里的高度有两种：可视区域的高度 实际高度（可视高度+不可见的高度）
        //计算方式 scrollwidth
        scrollWidth:function (){
            return this[0].scrollWidth
        },
        scrollHeight:function (){
            return this[0].scrollHeight
        },

        //元素滚动的时候 如果出现滚动条 相对于左上角的偏移量
        //计算方式 scrollTop scrollLeft
        scrollTop:function (){
            return this[0].scrollTop
        },
        scrollLeft:function (){
            return this[0].scrollLeft
        },
    });
    /*不需要链式访问*/
    zj.extend(zj, {
        //获取屏幕的高度和宽度
        screenHeight:function (){
            return  window.screen.height
        },
        screenWidth:function (){
            return  window.screen.width
        },

        //文档视口的高度和宽度
        wWidth:function (){
            return document.documentElement.clientWidth
        },
        wHeight:function (){
            return document.documentElement.clientHeight
        },
        //文档滚动区域的整体的高和宽
        wScrollHeight:function () {
            return document.body.scrollHeight
        },
        wScrollWidth:function () {
            return document.body.scrollWidth
        },
        //获取滚动条相对于其顶部的偏移
        wScrollTop:function () {
            var scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
            return scrollTop
        },
        //获取滚动条相对于其左边的偏移
        wScrollLeft:function () {
            var scrollLeft = document.body.scrollLeft || (document.documentElement && document.documentElement.scrollLeft);
            return scrollLeft
        }
    });
})(zj);

/*属性 内容*/
(function(zj){
    //属性
    zj.extend({
        attr : function(){
            var arg = arguments,
                len = arg.length;
            if(this.length < 1){
                return this;
            }
            if(len === 1){
                if(typeof arg[0] === 'string'){
                    return this[0].getAttribute(arg[0]);
                }else if(typeof arg[0] === 'object'){
                    for(var i in arg[0]){
                        for(var j = this.length - 1; j >= 0; j--){
                            this[j].setAttribute(i, arg[0][i]);
                        }
                    }
                }
            }else if(len === 2){
                for(var j = this.length - 1; j >= 0; j--){
                    this[j].setAttribute(arg[0], arg[1]);
                }
            }
            return this;
        },
        hasClass : function(val){
            if(!this[0]){
                return;
            }
            var value = zj.trim(val);
            console.log('测试属性'+value)
            return this[0].className.indexOf(value) >= 0 ? true : false;
        },
        addClass : function(val){
            console.log('测试属性'+val)
            var value = zj.trim(val),
                str = '';
            for(var i = 0, len = this.length; i < len; i++){
                str = this[i].className;
                if(str.indexOf(value) < 0){
                    this[i].className += ' ' + value;
                }
            }
            return this;
        },
        removeClass : function(val){
            console.log('测试属性'+val)
            var value = zj.trim(val);
            for(var i = 0, len = this.length; i < len; i++){
                this[i].className = zj.trim(this[i].className.replace(value, ''));
            }
            return this;
        },
        toggleClass : function(val){
            var value = zj.trim(val);
            for(var i = 0, len = this.length; i < len; i++){
                if(this[i].className.indexOf(value) >= 0){
                    this[i].className = this[i].className.replace(value, '');
                }else{
                    this[i].className += ' ' + value;
                }
            }
            return this;
        }
    });
    /*不需要链式访问*/
    zj.extend(zj, {

    });

    //内容
    zj.extend({
        html:function(){
            var arg = arguments,
                len = arg.length;
            //如果用户使用html（），则表示获取元素的内容
            if(len === 0){
                return this[0].innerHTML;
            }else if(len === 1){
                //如果用户这样使用html（‘王书奎’），则以此遍历对象从第一个到倒数第二个
                //for(var i =0;i< this.length; i++){
                //this[i].innerHTML = arg[0];
                //}
                this.each(function(){
                    this.innerHTML=arg[0]
                });
            }
            return this;
        },
        htmlOther : function(){
            var arg = arguments,
                len = arg.length;
            if(this.length < 1){
                return this;
            }
            if(len === 0){
                for(var i = this.length - 1; i >= 0; i--){
                    this[i].innerHTML = '';
                }
            }else if(len === 1){
                for(var i = this.length - 1; i >= 0; i--){
                    this[i].innerHTML = arg[0];
                }
            }else if(len === 2 && arg[1]){
                for(var i = this.length - 1; i >= 0; i--){
                    this[i].innerHTML += arg[0];
                }
            }
            return this;
        }
    });
    /*不需要链式访问*/
    zj.extend(zj, {

    });


})(zj);

/*DOM*/
(function(zj){

    //dom
    //不参与原型链
    zj.extend(zj, {
        create : function(type, value,html){
            var dom = document.createElement(type);
            return zj().add(dom).attr(value).html(html);
        },
        directChildren : function(dom, tag){
            var result = [], children,
                tag = tag;
            if(typeof dom == 'string'){
                dom = F.prototype.init(dom);
            }
            if(dom.length){
                for(var i = 0, len = dom.length; i < len; i++){
                    getDom(dom[i].children);
                }
            }else{
                getDom(dom.children);
            }
            function getDom(doms){
                for(var c = 0, clen = doms.length; c < clen; c++){
                    if(doms[c].tagName.toLowerCase() == tag.toLowerCase()){
                        result.push(doms[c]);
                    }
                }
            }
            return zj(result);
        },

        //id选择器
        $id:function(id){
            return document.getElementById(id);
        },
        //tag选择器
        $tag:function(tag,context){
            if(typeof context == 'string'){
                context = zj.$id(context);
            }

            if(context){
                return context.getElementsByTagName(tag);
            }else{
                return document.getElementsByTagName(tag);
            }
        },
        //class选择器
        $class:function(className,context){
            var i=0,len,dom=[],arr=[];
            //如果传递过来的是字符串 ，则转化成元素对象
            if(context && zj.isString(context)){
                context = document.getElementById(context);
            }else{
                context = document;
            }
//        如果兼容getElementsByClassName
            if(context.getElementsByClassName){
                return context.getElementsByClassName(className);
            }else{
                //如果浏览器不支持
                dom = context.getElementsByTagName('*');

                for(i;len=dom.length,i<len;i++)
                {
                    if(dom[i].className)
                    {
                        arr.push(dom[i]);
                    }
                }
            }
            return arr;
        },
        //分组选择器
        $group:function(content) {
            var result=[],doms=[];
            var arr = zj.trim(content).split(',');
            //alert(arr.length);
            for(var i=0,len=arr.length;i<len;i++) {
                var item = zj.trim(arr[i])
                var first= item.charAt(0)
                var index = item.indexOf(first)
                if(first === '.') {
                    doms=zj.$class(item.slice(index+1))
                    //每次循环将doms保存在reult中
                    //result.push(doms);//错误来源

                    //陷阱1解决 封装重复的代码成函数
                    pushArray(doms,result)

                }else if(first ==='#'){
                    doms=[zj.$id(item.slice(index+1))]//陷阱：之前我们定义的doms是数组，但是$id获取的不是数组，而是单个元素
                    //封装重复的代码成函数
                    pushArray(doms,result)
                }else{
                    doms = zj.$tag(item)
                    pushArray(doms,result)
                }
            }
            return result;

            //封装重复的代码
            function pushArray(doms,result){
                for(var j= 0, domlen = doms.length; j < domlen; j++){
                    result.push(doms[j])
                }
            }
        },
        //层次选择器
        $cengci:function (select){
            //个个击破法则 -- 寻找击破点
            var sel = zj.trim(select).split(' ');
            var result=[];
            var context=[];
            for(var i = 0, len = sel.length; i < len; i++){
                result=[];
                var item = zj.trim(sel[i]);
                var first = sel[i].charAt(0)
                var index = item.indexOf(first)
                if(first ==='#'){
                    //如果是#，找到该元素，
                    pushArray([zj.$id(item.slice(index + 1))]);
                    context = result;
                }else if(first ==='.'){
                    //如果是.
                    //如果是.
                    //找到context中所有的class为【s-1】的元素 --context是个集合
                    if(context.length){
                        for(var j = 0, contextLen = context.length; j < contextLen; j++){
                            pushArray(zj.$class(item.slice(index + 1), context[j]));
                        }
                    }else{
                        pushArray(zj.$class(item.slice(index + 1)));
                    }
                    context = result;
                }else{
                    //如果是标签
                    //遍历父亲，找到父亲中的元素==父亲都存在context中
                    if(context.length){
                        for(var j = 0, contextLen = context.length; j < contextLen; j++){
                            pushArray(zj.$tag(item, context[j]));
                        }
                    }else{
                        pushArray(zj.$tag(item));
                    }
                    context = result;
                }
            }

            return context;

            //封装重复的代码
            function pushArray(doms){
                for(var j= 0, domlen = doms.length; j < domlen; j++){
                    result.push(doms[j])
                }
            }
        },
        //多组+层次
        $select:function(str) {
            var result = [];
            var item = zj.trim(str).split(',');
            for(var i = 0, glen = item.length; i < glen; i++){
                var select = zj.trim(item[i]);
                var context = [];
                context = zj.$cengci(select);
                pushArray(context);

            };
            return result;

            //封装重复的代码
            function pushArray(doms){
                for(var j= 0, domlen = doms.length; j < domlen; j++){
                    result.push(doms[j])
                }
            }
        },
    })
    /*参与原型链*/
    zj.extend({
        add : function(dom){
            this[this.length] = dom;
            this.length++;
            return this;
        },
        append : function(child){
            var doms = zj(child);
            for(var j = this.length - 1; j >= 0; j--){
                for(var i = 0,len = doms.length;i<len;i++){
                    this[j].appendChild(doms[i]);
                }
            }
            return this;
        },
        appendTo : function(parent){
            var doms = zj(parent);
            for(var i = 0; i < doms.length; i++){
                for(var j = this.length - 1; j >= 0; j--){
                    doms[i].appendChild(this[j]);
                }
            }
            return this;
        },
        /*获取dom元素对象*/
        get : function(num){
            return this[num] ? this[num] : null;
        },
        /*返回单个对象 - 类数组*/
        eq : function(num){
            console.log('ffffff')
            return zj(this.get(num));
        },
        /*first*/
        first : function() {
            return this.eq(0);
        },
        /*last*/
        last : function() {
            return this.eq(this.length-1);
        },

        find:function (str) {
            var result=[];
            for(var i=0;i<this.length;i++) {
                switch(str.charAt(0)) {
                    case '.':
                        //class
                        var doms = zj.$class(str.substring(1),this[i]);
                        pushArray(doms);
                        break;
                    default:
                        //标签
                        var doms = zj.$tag(str,this[i]);
                        pushArray(doms);
                }
            }

            var that = this;
            this.length = result.length;
            //这里遍历应从第1个开始到倒数第二个，而不是最后一个，因为最后一个属性是length
            for (var i=0; i<this.length; i+=1) {
                that[i] = result[i];
            }
            return this;

            //封装重复的代码
            function pushArray(doms){
                for(var j= 0, domlen = doms.length; j < domlen; j++){
                    result.push(doms[j])
                }
            }
        },
        /*获取子孙*/
        children: function () {
            var that = this;
            var children = getChildren(this[0]);//children是子元素的dom
            that.length = children.length;


            //先删除father的所有dom
            for (var i = 0; i < that.length; i += 1) {
                delete that[i];
            }

            //这里遍历应从第1个开始到倒数第二个，而不是最后一个，因为最后一个属性是length
            for (var i = 0; i < children.length; i ++) {
                that[i] = children[i];
            }
            return that;
            function getChildren(obj) {
                return obj.children;
            }
        },
        /*获取父亲*/
        parent: function () {
            var parent = getParent(this[0]);

            //先删除son的所有dom
            for (var i = 0; i < this.length; i ++) {
                delete this[i];
            }

            this[0] = parent;
            this.length = 1;

            function getParent(obj) {
                return obj.parentNode;
            }

            return this;
        },
        /*获取索引值*/
        index:function () {
            return getIndex(this[0]);
            function getIndex(obj) {
                var children=obj.parentNode.children;
                for(var i=0;i<children.length;i++) {
                    if(children[i]==obj) {
                        return i;
                    }
                }
            }
        },
        siblings:function(){
            var that = this;
            var siblings = getSiblings(this[0]);//children是子元素的dom
            console.log('获取兄弟'+siblings)
            that.length = siblings.length;

            //先删除原先伪数组中的所有dom
            for (var i = 0; i < that.length; i += 1) {
                delete that[i];
            }
            //这里遍历应从第1个开始到倒数第二个，而不是最后一个，因为最后一个属性是length
            for (var i = 0; i < siblings.length; i ++) {
                that[i] = siblings[i];
            }
            return that;

            function getSiblings(o){
                //参数o就是想取谁的兄弟节点，就把那个元素传进去
                var a=[];//定义一个数组，用来存o的兄弟元素
                var p=o.previousSibling;
                while(p){//先取o的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行  p表示previousSibling
                    if(p.nodeType===1){
                        a.push(p);
                    }
                    p=p.previousSibling//最后把上一个节点赋给p
                }
                a.reverse()//把顺序反转一下 这样元素的顺序就是按先后的了
                var n=o.nextSibling;//再取o的弟弟
                while(n){//判断有没有下一个弟弟结点 n是nextSibling的意思
                    if(n.nodeType===1){
                        a.push(n);
                    }
                    n=n.nextSibling;
                }
                return a//最后按从老大到老小的顺序，把这一组元素返回
            }
        },
    })


})(zj);

/*缓存*/
(function(zj){
    //缓存框架 - 内存篇
    zj.cache = {
        data:[],
        get:function(key){
            console.log('111')
            var value = null;
            console.log(this.data)
            for(var i= 0,len=this.data.length;i<len; i++){
                var item = this.data[i]
                if (key == item.key) {
                    value = item.value;
                }
            }
            console.log('get'+value)
            return value;
        },
        add:function(key,value){
            var json= { key: key, value: value};
            this.data.push(json);
        },
        delete:function(key){
            var status = false;
            for(var i= 0,len=this.data.length;i<len; i++){
                var item = this.data[i]
                // 循环数组元素
                if (item.key.trim() == key) {
                    this.data.splice(i, 1);//开始位置,删除个数
                    status = true;
                    break;
                }
            }
            return status;
        },
        update:function(key,value){
            var status = false;
            // 循环数组元素
            for(var i= 0,len=this.data.length;i<len; i++){
                var item = this.data[i]
                if (item.key.trim() === key.trim()) {
                    item.value = value.trim();
                    status = true;
                    break;
                }
            }
            return status;
        },
        isExist:function(key){
            for(var i= 0,len=this.data.length;i<len; i++){
                var item = this.data[i]
                if (key === item.key) {
                    return true;
                }else{
                    return false;
                }
            }
        }
    }

    //cookie框架
    zj.cookie = {
        //设置coolie
        setCookie: function (name,value,days,path){
            var name = escape(name);
            var value = escape(value);
            var expires = new Date();
            expires.setTime(expires.getTime() + days*24*60*60*1000);
            path = path == "" ? "" : ";path=" + path;
            _expires = (typeof hours) == "string" ? "" : ";expires=" + expires.toUTCString();
            document.cookie = name + "=" + value + _expires + path;
        },
        //获取cookie值
        getCookie:function (name){
            var name = escape(name);
            //读cookie属性，这将返回文档的所有cookie
            var allcookies = document.cookie;

            //查找名为name的cookie的开始位置
            name += "=";
            var pos = allcookies.indexOf(name);
            //如果找到了具有该名字的cookie，那么提取并使用它的值
            if (pos != -1){                                             //如果pos值为-1则说明搜索"version="失败
                var start = pos + name.length;                  //cookie值开始的位置
                var end = allcookies.indexOf(";",start);        //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置
                if (end == -1) end = allcookies.length;        //如果end值为-1说明cookie列表里只有一个cookie
                var value = allcookies.substring(start,end);  //提取cookie的值
                return unescape(value);                           //对它解码
            }
            else return "";                                             //搜索失败，返回空字符串
        },
        //删除cookie
        deleteCookie:function (name,path){
            var name = escape(name);
            var expires = new Date(0);
            path = path == "" ? "" : ";path=" + path;
            document.cookie = name + "="+ ";expires=" + expires.toUTCString() + path;
        }
    }

    //本地存储框架
    zj.store = (function () {
        var api               = {},
            win               = window,
            doc               = win.document,
            localStorageName  = 'localStorage',
            globalStorageName = 'globalStorage',
            storage;

        api.set    = function (key, value) {};
        api.get    = function (key)        {};
        api.remove = function (key)        {};
        api.clear  = function ()           {};

        if (localStorageName in win && win[localStorageName]) {
            storage    = win[localStorageName];
            api.set    = function (key, val) { storage.setItem(key, val) };
            api.get    = function (key)      { return storage.getItem(key) };
            api.remove = function (key)      { storage.removeItem(key) };
            api.clear  = function ()         { storage.clear() };

        } else if (globalStorageName in win && win[globalStorageName]) {
            storage    = win[globalStorageName][win.location.hostname];
            api.set    = function (key, val) { storage[key] = val };
            api.get    = function (key)      { return storage[key] && storage[key].value };
            api.remove = function (key)      { delete storage[key] };
            api.clear  = function ()         { for (var key in storage ) { delete storage[key] } };

        } else if (doc.documentElement.addBehavior) {
            function getStorage() {
                if (storage) { return storage }
                storage = doc.body.appendChild(doc.createElement('div'));
                storage.style.display = 'none';
                // See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
                // and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
                storage.addBehavior('#default#userData');
                storage.load(localStorageName);
                return storage;
            }
            api.set = function (key, val) {
                var storage = getStorage();
                storage.setAttribute(key, val);
                storage.save(localStorageName);
            };
            api.get = function (key) {
                var storage = getStorage();
                return storage.getAttribute(key);
            };
            api.remove = function (key) {
                var storage = getStorage();
                storage.removeAttribute(key);
                storage.save(localStorageName);
            }
            api.clear = function () {
                var storage = getStorage();
                var attributes = storage.XMLDocument.documentElement.attributes;;
                storage.load(localStorageName);
                for (var i=0, attr; attr = attributes[i]; i++) {
                    storage.removeAttribute(attr.name);
                }
                storage.save(localStorageName);
            }
        }
        return api;
    })();

})(zj);


