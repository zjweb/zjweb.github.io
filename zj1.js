/**
 *
 * 描述：通用框架
 */
(function(w){
    var zj = function(){}
    zj.prototype ={
        /*extend必须放在最顶端，因为后面的代码需要用到这个方法*/
        /*对象中的函数不叫函数 叫方法*/
        elements:[],
        extend: function (target,source) {
            //遍历对象
            /* 回去抄袭100遍*/
            /* var json ={name:'iphone'}
             json.name
             json['name']*/
            for(var i in source){
                target[i] = source[i];
            }
            return target;
        },
    }
    var $$ = new zj()

    /*好处：模块化 分类管理 图书馆分类管理*/
    /*字符串操作模块*/
    $$.extend($$,{
        /*去除一个字符串两边的空格*/
        //去除左边空格
        ltrim:function(str){
            return str.replace(/(^\s*)/g,'');
        },
        //去除右边空格
        rtrim:function(str){
            return str.replace(/(\s*$)/g,'');
        },
        //去除空格
        trim:function(str){
            return str.replace(/(^\s*)|(\s*$)/g, '');
        },
        //简单的数据绑定formateString
        formateString:function(str, data){
            return str.replace(/@\((\w+)\)/g, function(match, key){
                return typeof data[key] === "undefined" ? '' : data[key]});
        },
        bindArttemplate:function (str,data){
            var render = template.compile(str);
            var html = render(data)
            return html;
        },
        //查询字符串  页面之间的传参  location.search
        querystring:function() {//获取URL查询字符串参数值的通用函数
            var str = window.location.search.substring(1);//获取查询字符串，即"id=1&name=location"的部分
            var arr = str.split("&");//以&符号为界把查询字符串分割成数组
            var json = {};//定义一个临时对象
            //遍历数组
            for(var i=0;i<arr.length;i++) {
                var c = arr[i].indexOf("=");//获取每个参数中的等号小标的位置
                if(c==-1) continue;//如果没有发现测跳到下一次循环继续操作


                var d = arr[i].substring(0,c);  //截取等号前的参数名称，这里分别是id和name
                var e = arr[i].substring(c+1);  //截取等号后的参数值
                json[d] = e;//以名/值对的形式存储在对象中
            }
            return json;//返回对象
        },
    })

    /*数据类型检测模块*/
    $$.extend($$,{
        /*判断一个变量是不是数值型*/
        isNumber:function (val){
            return typeof val === 'number'
        },
        /*判断一个变量是不是布尔型*/
        isBoolean:function (val) {
            return typeof val ==="boolean";
        },
        /*判断一个变量是不是字符串*/
        isString:function (val) {
            return typeof val === "string";
        },
        /*判断一个变量是不是isUndefined型*/
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
        /*判断一个变量是不是数组类型*/
        isArray:function (arr) {
            /*toString.call*/
            if(arr === null || typeof arr === 'undefined'){
                return false;
            }
            return arr.constructor === Array;
        },
        isArray2:function (arr) {
            return Object.prototype.toString.call(arr) === '[object Array]';
        },
        //给一个对象扩充功能
    })

    /*选择器框架模块 id tag class选择 */
    $$.extend($$,{
        /*id选择器*/
        $id:function(id){
            this.element =  document.getElementById(id);
            return this
            //这里有两个this 当然就不起作用了？？ 怎么办？？
        },
        /*tag标签选择器*/
        $tag:function (tag,id){

            /*先写注释*/
            /*将你的思维进行模块化*/
            /*先思考如何写 然后通过注释写出你的思路，然后再去代码*/
            /*第一步：获取容器元素 --缩小范围*/
            var dom = getDOM(id);
            /*第二步：根据tag 从某个容器里面获取所有的元素*/
            var elements =getElements(dom,tag);
            return elements;


            /*隔离法则：*/
            /*将我们的代码分割成两部分，下面的部分依赖上面的部分*/
            /*第二部分不需要去考虑传递进来的到底是字符串还是dom
             也不需要考虑id到底是undefined还是正确的
             这一切的问题都交给另外一个哥们来帮我解决 我只用解决好的变量进行编程*/


            /*知识点：子函数*/
            /*在一个函数内部可以包含另外一个函数  -子函数 内嵌函数 局部变量*/
            // 第一步 根据id获取dom -- 缩减范围
            function getDOM(id){
                var dom ;
                if($$.isString(id)){
                    dom = document.getElementById(id)
                }else{
                    dom = id
                }
                return dom;
            }
            //第二步 从这个范围里面去寻找我们需要的元素
            function getElements(context,tag){
                if(context){
                    return context.getElementsByTagName(tag)
                }else{
                    return document.getElementsByTagName(tag)
                }

            }
        },
        /*class选择器*/
        $classOld:function (className,mycontext){
            //第一步 获取范围容器这个dom
            var mydom = getDOM(mycontext)
            /*第二步：再从这个范围里面寻找元素*/
            var elements = getElements(className,mydom)
            return elements;


            //第一步 获取范围容器这个dom
            function getDOM(context){
                /*如果context没有传递过来（undefined），表示只有一个参数,那么我们就从document去寻找元素*/
                /*如果context是有值的，又分成两种情况：字符串，dom对象
                 如果是字符串：我们将其转换成dom
                 如果是dom的话，直接使用*/

                /*用三元表达式或者短路表达式改造代码*/
                if(context){
                    if($$.isString(context)){
                        return document.getElementById(context)
                    }else{
                        return context;
                    }
                } else{
                    return document;
                }

            }
            /*第二步：再从这个范围里面寻找元素*/
            function getElements(className,dom){
                if(dom.getElementsByClassName){
                    /*使用原生的获取元素*/
                    return dom.getElementsByClassName(className)
                }else{
                    /*如果不兼容 使用自定义代码来获取元素*/
                    var doms = dom.getElementsByTagName('*')
                    var elements =[];
                    for(var i = 0,len=doms.length;i<len;i++){
                        if(doms[i].className == className){
                            elements.push(doms[i])
                        }
                    }
                    return elements;
                }
            }
        },
        /*不用函数的最终写法*/
        $class:function(className,context){
            var elements=[];
            var dom;
            if (context){
                if($$.isString(context)){
                    context = $$.$id(context);
                }
            }else{
                context = document;
            }

            //如果兼容getElementsByClassName
            if(context.getElementsByClassName){
                return context.getElementsByClassName(className);
            }else{
                //如果浏览器不支持
                dom = context.getElementsByTagName('*');
                for(var i,len=dom.length;i<len;i++) {
                    if(dom[i].className && dom[i].className ==className ) {
                        elements.push(dom[i]);
                    }
                }
            }
            return elements;
        },
        //分组选择器
        $group:function(content) {
            var result=[],doms=[];
            var arr = $$.trim(content).split(',');
            //alert(arr.length);
            for(var i=0,len=arr.length;i<len;i++) {
                var item = $$.trim(arr[i])
                var first= item.charAt(0)
                var index = item.indexOf(first)
                if(first === '.') {
                    doms=$$.$class(item.slice(index+1))
                    //每次循环将doms保存在reult中
                    //result.push(doms);//错误来源

                    //陷阱1解决 封装重复的代码成函数
                    pushArray(doms,result)

                }else if(first ==='#'){
                    doms=[$$.$id(item.slice(index+1))]//陷阱：之前我们定义的doms是数组，但是$id获取的不是数组，而是单个元素
                    //封装重复的代码成函数
                    pushArray(doms,result)
                }else{
                    doms = $$.$tag(item)
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
        //层次选择器 - 算法能力 -- 抽象能力 --逻辑思维能力
        $cengci:function (select){
            //个个击破法则 -- 寻找击破点
            var sel = $$.trim(select).split(' ');
            var result=[];
            var context=[];
            for(var i = 0, len = sel.length; i < len; i++){
                result=[];
                var item = $$.trim(sel[i]);
                var first = sel[i].charAt(0)
                var index = item.indexOf(first)
                var name = item.slice(index+1)
                if(first ==='#'){
                    //如果是#，找到该元素，
                    pushArray([$$.$id(name)]);
                    context = result;
                }else if(first ==='.'){
                    //如果是.
                    //如果是.
                    //找到context中所有的class为【s-1】的元素 --context是个集合
                    if(context.length){
                        for(var j = 0, contextLen = context.length; j < contextLen; j++){
                            pushArray($$.$classOld(name, context[j]));
                        }
                    }else{
                        pushArray($$.$class(name));
                    }
                    context = result;
                }else{
                    //如果是标签
                    //遍历父亲，找到父亲中的元素==父亲都存在context中
                    if(context.length){
                        for(var j = 0, contextLen = context.length; j < contextLen; j++){
                            pushArray($$.$tag(item, context[j]));
                        }
                    }else{
                        pushArray($$.$tag(item));
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
        $groupLayer:function (str) {
            var result = [];
            var item = $$.trim(str).split(',');
            for(var i = 0, glen = item.length; i < glen; i++){
                var select = $$.trim(item[i]);
                var context = [];
                context = $$.$cengci(select);
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
        $all:function (str,context){
            /*完美法则*/
            /*短路表达式：也能保证如果值传递一个参数，也能够正常运行*/
            context = context|| document;
            this.elements = context.querySelectorAll(str)
            return this;
        },
        $allOld:function (str,context){
            /*完美法则*/
            /*短路表达式：也能保证如果值传递一个参数，也能够正常运行*/
            context = context|| document;
            return context.querySelectorAll(str)
        }
    })

    /*事件框架*/
    $$.extend($$,{
        //我们需要编写一个函数 让他同时能够兼容所有的浏览器  -重点 -人人必须要会
        on:function (type,fn){
            var doms = this.elements;
            /*三元表达式*/
         /*   var dom = $$.isString(id)? $$.$id(id):id;*/
            /*如何判断浏览器是否兼容某个功能*/
            /*其实就是判断某个对象是否兼容某个方法*/
            for(var i = 0 ;i<doms.length;i++){
                var dom = doms[i]
                if(dom.addEventListener){
                    /*使用addEventListener来编写事件*/
                    dom.addEventListener(type, fn, false);
                }else{
                    if(dom.attachEvent){
                        /*使用微软公司的技术来编写事件*/
                        dom.attachEvent('on' + type, fn);
                    }
                }
            }

            return this;

        },
        /*解除绑定 -- 没必要深刻了解 --知道就可以了*/
        un:function(type, fn){
            //var dom = document.getElementById(id);
            var dom = this.elements;
           /* var dom = $$.isString(id)?document.getElementById(id):id;*/
            if(dom.removeEventListener){
                dom.removeEventListener(type, fn);
            }else if(dom.detachEvent){
                dom.detachEvent(type, fn);
            }
            return this;

        },

        //模拟点击事件 点击事件的类型 click
        /*click mouseover hover bind one*/
        click: function (fn){
            $$.on('click',fn);
        },

        /*鼠标移上事件*/
        mouseover:function (fn){
            $$.on('mouseover',fn);
        },

        /*鼠标移出事件*/
        mouseout:function (fn){
            $$.on('mouseout',fn);
        },
        /*鼠标移上和移除事件（鼠标悬浮）*/
        hover:function (fnOver,fnOut){
            if(fnOver){
                $$.on("mouseover",fnOver);
                /* mouseover(id,fnOver)*/
            }
            if(fnOut){
                $$.on("mouseout",fnOut);
                /* mouseout(id,fnOut)*/
            }
        },
        //注释比代码重要
        /*我们写框架的目的是给别人使用的
         如果你写网页 注释不是很重要*/
        /*获取event对象*/
        getEventOld:function (e){
            //如果是ie浏览器 --- 使用window.event来获取event对象
            //如果不是ie（其余所有浏览器）都是支持标准的，怎么做：直接在函数中加个参数，系统会自动将这个参数看做是event对象
            var event;
            if(e){
                event = e;
            }else if(window.event){
                event = window.event;
            }

            return event
        },
        getEvent:function (e){
            /*三元表达式*/
            return e?e:window.event;
        },
        /*获取事件目标  --因为为了保证不同浏览器厂商的不同版本都兼容*/
        getTarget:function  (event){
            var e = $$.getEvent(event);
            /*短路表达式*/
            return e.target|| e.srcElement;
        },
        //阻止默认行为
        preventDefault:function (event){
            var event = $$.getEvent(event);
            if(event.preventDefault){
                event.preventDefault();
            }else{
                event.returnValue = false;
            }
        },
        //阻止冒泡
        stopPropagation:function (event){
            var event = $$.getEvent(event);
            if(event.stopPropagation){
                event.stopPropagation();
            }else{
                event.cancelBubble = true;
            }
        }

    })

    /*css 样式操作相关功能*/
    $$.extend($$,{
        /*设置获取样式*/
        /*css*/
        css:function(key, value){
            var doms = this.elements
            //如果是数组
            for(var i = doms.length - 1; i >= 0; i--){
                setStyle(doms[i],key, value);
            }
            function getStyle(dom){
                if(dom.currentStyle){
                    return dom.currentStyle[key];
                }else{
                    return getComputedStyle(dom,null)[key];
                }
            }
            function setStyle(dom,key,value){
                dom.style[key] = value;
            }
            return this;
        },
        /*隐藏元素*/
        hide:function(){
            for(var i = 0;i<this.elements.length;i++){
                this.elements[i].style.display = 'none'
            }
        return this;
    },
        show:function(){
            for(var i = 0;i<this.elements.length;i++){
                this.elements[i].style.display = 'block'
            }
            return this;
        },
    })

    /*属性框架 属性操作相关功能*/
    $$.extend($$,{
        //获取或者设置属性
        attr:function (key,value){
            //思路 骨架
            /*var doms = $$.$all(context)*/
            var doms = this.elements;
            /*设置模式 获取模式*/
            if(value){
                //设置模式  设置模式不需要return
                for(var i=0;i<doms.length;i++){
                    doms[i].setAttribute(key,value)
                }
            }else{
                /*获取模式 需要return*/
                return doms[0].getAttribute(key)
            }
            return this;
        },
        /*删除属性 知识点arguments*/
        removeAttr:function (){
            var list = Array.prototype.slice.call(arguments)
            var context = list[0]
            /*var doms = $$.$all(context)*/
            var doms = this.elements;
            //为什么我们需要将arguments转为真数组：
            var names = list.slice(1)
            for(var i =0;i<doms.length;i++){
                removeOneElementAttrs(doms[i])
            }
            /*需要将某个元素的所有的属性都去除掉*/
            function removeOneElementAttrs(dom){
                for(var j=0;j<names.length;j++){
                    dom.removeAttribute(names[j])
                }
            }
            return this;
        },
        //新增class
        addClass:function (className){
            //首先先获取元素 -- 把获取的元素放在一个集合里面
            var doms = this.elements;
            //遍历集合，依次给每个元素添加class
            for(var i=0;i<doms.length;i++){
                addClassName(doms[i])
            }
            //给一个元素的class新增一个class
            function addClassName(dom){
                dom.className += " " +className
            }
            return this;
        },
        removeClass:function (name){
            var doms = this.elements;
            for(var i= 0,len=doms.length;i<len;i++){
                removeName(doms[i],name);
            }

            function removeName(dom,name){
                dom.className =  dom.className.replace(name,'')
            }
            return this;
        }
    })

    /*内容框架*/
    $$.extend($$,{
        html:function (str){
            var doms = this.elements;
            if(str){
                /*设置模式 */
                for(var i=0;i<doms.length;i++){
                    doms[i].innerHTML =str
                }
            }else{
                /*获取模式*/
                return doms[0].innerHTML;
            }
            return this;
        },
    })

    /*动画框架*/
    function Animate(){
        /*将变量提炼成属性*/
        this.timer;
        //我们可以定义一个变量（属性）来保存运行这个框架需要的一切数据
        this.obj={}
        this._queen=[]
    }
    Animate.prototype = {
        /*
         运行部
         职责描述：和运行框架相关的一些方法      */

        //动画的本质
        /*动画其实很简单：就是一个循环，每次循环做什么事情呢？ 不就是改变left*/
        /*老大*/
        run:function(){
            var that =this;
            that.timer = setInterval(function(){that.loop() },16)


        },
        /*老二*/
        move:function(obj){
            var pass = +new Date();
            var that =this;
            var tween = this.getTween(obj.now,pass,obj.duration,'easeOutBounce')
            //动画停止的条件
            if(tween>=1) {
                /*停止动画*/
                that.stop()
            }else {
                that.setManyProperty(obj.id,obj.styles,tween)
            }
        },
        /*获取动画时间进程*/
        getTween:function (now,pass,all,ease){
            var eases = {
                //线性匀速
                linear:function (t, b, c, d){
                    return (c - b) * (t/ d);
                },
                //弹性运动
                easeOutBounce:function (t, b, c, d) {
                    if ((t/=d) < (1/2.75)) {
                        return c*(7.5625*t*t) + b;
                    } else if (t < (2/2.75)) {
                        return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
                    } else if (t < (2.5/2.75)) {
                        return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
                    } else {
                        return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
                    }
                },
                //其他
                swing: function (t, b, c, d) {
                    return this.easeOutQuad(t, b, c, d);
                },
                easeInQuad: function (t, b, c, d) {
                    return c*(t/=d)*t + b;
                },
                easeOutQuad: function (t, b, c, d) {
                    return -c *(t/=d)*(t-2) + b;
                },
                easeInOutQuad: function (t, b, c, d) {
                    if ((t/=d/2) < 1) return c/2*t*t + b;
                    return -c/2 * ((--t)*(t-2) - 1) + b;
                },
                easeInCubic: function (t, b, c, d) {
                    return c*(t/=d)*t*t + b;
                },
                easeOutCubic: function (t, b, c, d) {
                    return c*((t=t/d-1)*t*t + 1) + b;
                },
                easeInOutCubic: function (t, b, c, d) {
                    if ((t/=d/2) < 1) return c/2*t*t*t + b;
                    return c/2*((t-=2)*t*t + 2) + b;
                },
                easeInQuart: function (t, b, c, d) {
                    return c*(t/=d)*t*t*t + b;
                },
                easeOutQuart: function (t, b, c, d) {
                    return -c * ((t=t/d-1)*t*t*t - 1) + b;
                },
                easeInOutQuart: function (t, b, c, d) {
                    if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
                    return -c/2 * ((t-=2)*t*t*t - 2) + b;
                },
                easeInQuint: function (t, b, c, d) {
                    return c*(t/=d)*t*t*t*t + b;
                },
                easeOutQuint: function (t, b, c, d) {
                    return c*((t=t/d-1)*t*t*t*t + 1) + b;
                },
                easeInOutQuint: function (t, b, c, d) {
                    if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
                    return c/2*((t-=2)*t*t*t*t + 2) + b;
                },
                easeInSine: function (t, b, c, d) {
                    return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
                },
                easeOutSine: function (t, b, c, d) {
                    return c * Math.sin(t/d * (Math.PI/2)) + b;
                },
                easeInOutSine: function (t, b, c, d) {
                    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
                },
                easeInExpo: function (t, b, c, d) {
                    return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
                },
                easeOutExpo: function (t, b, c, d) {
                    return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
                },
                easeInOutExpo: function (t, b, c, d) {
                    if (t==0) return b;
                    if (t==d) return b+c;
                    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
                    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
                },
                easeInCirc: function (t, b, c, d) {
                    return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
                },
                easeOutCirc: function (t, b, c, d) {
                    return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
                },
                easeInOutCirc: function (t, b, c, d) {
                    if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
                    return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
                },
                easeInElastic: function (t, b, c, d) {
                    var s=1.70158;var p=0;var a=c;
                    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                    if (a < Math.abs(c)) { a=c; var s=p/4; }
                    else var s = p/(2*Math.PI) * Math.asin (c/a);
                    return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                },
                easeOutElastic: function (t, b, c, d) {
                    var s=1.70158;var p=0;var a=c;
                    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                    if (a < Math.abs(c)) { a=c; var s=p/4; }
                    else var s = p/(2*Math.PI) * Math.asin (c/a);
                    return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
                },
                easeInOutElastic: function (t, b, c, d) {
                    var s=1.70158;var p=0;var a=c;
                    if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
                    if (a < Math.abs(c)) { a=c; var s=p/4; }
                    else var s = p/(2*Math.PI) * Math.asin (c/a);
                    if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                    return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
                },
                easeInBack: function (t, b, c, d, s) {
                    if (s == undefined) s = 1.70158;
                    return c*(t/=d)*t*((s+1)*t - s) + b;
                },
                easeOutBack: function (t, b, c, d, s) {
                    if (s == undefined) s = 1.70158;
                    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
                },
                easeInOutBack: function (t, b, c, d, s) {
                    if (s == undefined) s = 1.70158;
                    if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
                    return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
                },
                easeInBounce: function (t, b, c, d) {
                    return c - this.easeOutBounce (d-t, 0, c, d) + b;
                },
                easeInOutBounce: function (t, b, c, d) {
                    if (t < d/2) return this.easeInBounce (t*2, 0, c, d) * .5 + b;
                    return this.easeOutBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
                }
            }
            var yongshi = pass -now;
            return eases[ease](yongshi,0,1,all)
        },
        /*停止*/
        stop:function (){
            /* var tween =1;*/
            var that = this;
            clearInterval(that.timer);
        },
        //设置一个样式
        setOneProperty:function (id,name,start,juli,tween){
            /*透明度 不需要px
             但是width top height left right px*/
            if(name == 'opacity'){
                $$.css(id,name,start + juli*tween)
            }else{
                $$.css(id,name,(start + juli*tween)+'px')
            }
        },
        /*设置多个样式*/
        setManyProperty:function (id,styles,tween){
            for(var i =0;i<styles.length;i++){
                var item = styles[i];
                this.setOneProperty(id,item.name,item.start,item.juli,tween)
            }
        },
        //我们新增一个loop以此针对每个物体做运动 --其实就是遍历每个对象，然后依次执行move方法
        loop:function(){
            for(var i= 0,len=this._queen.length;i<len;i++){
                this.move(this._queen[i])
            }
        },


        /*添加部*/
        /*职责描述：准备素材 将烹饪需要的各种素材给你准备好 为运行部服务*/

        /*用户需要调用的方法 用户只需要知道这个方法就可以了*/
        addOld:function(id,json,duration){
            this.apdapterMany(id,json,duration)
            this.run();
        },
        add:function(){
            /*系统会自动生成一个arguments来保存实参（用户传递的参数）*/
            var list = arguments;
            var id =list[0];
            var json =list[1];
            var duration =list[2]
            this.apdapterMany(id,json,duration)
            this.run();
        },
        /*适配器 将我们需要的数据放在一起统一管理*/
        /*就类似烹饪 先把我们需要的材料准备好，然后再去编程*/
        apdapterOne:function(id,json,duration){
            /*  为了提高用户体验，我们一般将框架需要的参数越简单，越少越好，
             但是 我们在编程的需要的不是这些数据，我们需要加个适配器，将用户传进来的数据转成我们需要的数据*/
            /*请问：我们需要哪些数据 变量值*/
            /*为了编程方便，我们可以定义一个json变量来保存运行动画框架需要的一切数据*/
            var obj={}
            obj.id = id;
            obj.now  = +new Date();
            obj.pass= +new Date();
            obj.tween = 0;
            obj.duration = duration
            obj.styles=this.getStyles(id,json)
            return obj;
        },
        /*获取多个样式*/
        getStyles:function (id,source){
            var styles=[]
            for(var item in source){
                /*思路*/
                /*   name :item
                 start:parseFloat($$.css(id,item))
                 juli:最终的位置 -- 起始位置  source[item] - start*/
                var style={};
                style.name = item;
                style.start = parseFloat($$.css(id,item))
                style.juli = parseFloat(source[item]) - style.start
                styles.push(style)

            }
            return styles;
        },
        //适配器多个物体 --单一职责原则
        apdapterMany:function (id,source,duration){
            var _obj = this.apdapterOne(id,source,duration)
            this._queen.push(_obj)
        },


        /*后勤部*/
        /*擦屁股部门 内存回收*/
        /*企业：HR 做饭的 卫生 看病的 洗衣的 信息化的 */
        destroy:function(){}

    }
    $$.animate = function(id,json,duration){
        var animate =  new Animate()
        animate.add(id,json,duration)
    }



    /*双对象法则*/
    /*实现和jquery一模一样的代码*/
    /*新增一个函数 这个函数名字叫$*/

    function $(context){
        //
        return $$.$all(context)
    }

var test = $('.div')
    w.$ = $;



})(window);

