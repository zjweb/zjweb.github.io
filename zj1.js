/**
 *
 * ������ͨ�ÿ��
 */
(function(w){
    var zj = function(){}
    zj.prototype ={
        /*extend���������ˣ���Ϊ����Ĵ�����Ҫ�õ��������*/
        /*�����еĺ������к��� �з���*/
        elements:[],
        extend: function (target,source) {
            //��������
            /* ��ȥ��Ϯ100��*/
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

    /*�ô���ģ�黯 ������� ͼ��ݷ������*/
    /*�ַ�������ģ��*/
    $$.extend($$,{
        /*ȥ��һ���ַ������ߵĿո�*/
        //ȥ����߿ո�
        ltrim:function(str){
            return str.replace(/(^\s*)/g,'');
        },
        //ȥ���ұ߿ո�
        rtrim:function(str){
            return str.replace(/(\s*$)/g,'');
        },
        //ȥ���ո�
        trim:function(str){
            return str.replace(/(^\s*)|(\s*$)/g, '');
        },
        //�򵥵����ݰ�formateString
        formateString:function(str, data){
            return str.replace(/@\((\w+)\)/g, function(match, key){
                return typeof data[key] === "undefined" ? '' : data[key]});
        },
        bindArttemplate:function (str,data){
            var render = template.compile(str);
            var html = render(data)
            return html;
        },
        //��ѯ�ַ���  ҳ��֮��Ĵ���  location.search
        querystring:function() {//��ȡURL��ѯ�ַ�������ֵ��ͨ�ú���
            var str = window.location.search.substring(1);//��ȡ��ѯ�ַ�������"id=1&name=location"�Ĳ���
            var arr = str.split("&");//��&����Ϊ��Ѳ�ѯ�ַ����ָ������
            var json = {};//����һ����ʱ����
            //��������
            for(var i=0;i<arr.length;i++) {
                var c = arr[i].indexOf("=");//��ȡÿ�������еĵȺ�С���λ��
                if(c==-1) continue;//���û�з��ֲ�������һ��ѭ����������


                var d = arr[i].substring(0,c);  //��ȡ�Ⱥ�ǰ�Ĳ������ƣ�����ֱ���id��name
                var e = arr[i].substring(c+1);  //��ȡ�Ⱥź�Ĳ���ֵ
                json[d] = e;//����/ֵ�Ե���ʽ�洢�ڶ�����
            }
            return json;//���ض���
        },
    })

    /*�������ͼ��ģ��*/
    $$.extend($$,{
        /*�ж�һ�������ǲ�����ֵ��*/
        isNumber:function (val){
            return typeof val === 'number'
        },
        /*�ж�һ�������ǲ��ǲ�����*/
        isBoolean:function (val) {
            return typeof val ==="boolean";
        },
        /*�ж�һ�������ǲ����ַ���*/
        isString:function (val) {
            return typeof val === "string";
        },
        /*�ж�һ�������ǲ���isUndefined��*/
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
        /*�ж�һ�������ǲ�����������*/
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
        //��һ���������书��
    })

    /*ѡ�������ģ�� id tag classѡ�� */
    $$.extend($$,{
        /*idѡ����*/
        $id:function(id){
            this.element =  document.getElementById(id);
            return this
            //����������this ��Ȼ�Ͳ��������ˣ��� ��ô�죿��
        },
        /*tag��ǩѡ����*/
        $tag:function (tag,id){

            /*��дע��*/
            /*�����˼ά����ģ�黯*/
            /*��˼�����д Ȼ��ͨ��ע��д�����˼·��Ȼ����ȥ����*/
            /*��һ������ȡ����Ԫ�� --��С��Χ*/
            var dom = getDOM(id);
            /*�ڶ���������tag ��ĳ�����������ȡ���е�Ԫ��*/
            var elements =getElements(dom,tag);
            return elements;


            /*���뷨��*/
            /*�����ǵĴ���ָ�������֣�����Ĳ�����������Ĳ���*/
            /*�ڶ����ֲ���Ҫȥ���Ǵ��ݽ����ĵ������ַ�������dom
             Ҳ����Ҫ����id������undefined������ȷ��
             ��һ�е����ⶼ��������һ�����������ҽ�� ��ֻ�ý���õı������б��*/


            /*֪ʶ�㣺�Ӻ���*/
            /*��һ�������ڲ����԰�������һ������  -�Ӻ��� ��Ƕ���� �ֲ�����*/
            // ��һ�� ����id��ȡdom -- ������Χ
            function getDOM(id){
                var dom ;
                if($$.isString(id)){
                    dom = document.getElementById(id)
                }else{
                    dom = id
                }
                return dom;
            }
            //�ڶ��� �������Χ����ȥѰ��������Ҫ��Ԫ��
            function getElements(context,tag){
                if(context){
                    return context.getElementsByTagName(tag)
                }else{
                    return document.getElementsByTagName(tag)
                }

            }
        },
        /*classѡ����*/
        $classOld:function (className,mycontext){
            //��һ�� ��ȡ��Χ�������dom
            var mydom = getDOM(mycontext)
            /*�ڶ������ٴ������Χ����Ѱ��Ԫ��*/
            var elements = getElements(className,mydom)
            return elements;


            //��һ�� ��ȡ��Χ�������dom
            function getDOM(context){
                /*���contextû�д��ݹ�����undefined������ʾֻ��һ������,��ô���Ǿʹ�documentȥѰ��Ԫ��*/
                /*���context����ֵ�ģ��ֳַ�����������ַ�����dom����
                 ������ַ��������ǽ���ת����dom
                 �����dom�Ļ���ֱ��ʹ��*/

                /*����Ԫ���ʽ���߶�·���ʽ�������*/
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
            /*�ڶ������ٴ������Χ����Ѱ��Ԫ��*/
            function getElements(className,dom){
                if(dom.getElementsByClassName){
                    /*ʹ��ԭ���Ļ�ȡԪ��*/
                    return dom.getElementsByClassName(className)
                }else{
                    /*��������� ʹ���Զ����������ȡԪ��*/
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
        /*���ú���������д��*/
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

            //�������getElementsByClassName
            if(context.getElementsByClassName){
                return context.getElementsByClassName(className);
            }else{
                //����������֧��
                dom = context.getElementsByTagName('*');
                for(var i,len=dom.length;i<len;i++) {
                    if(dom[i].className && dom[i].className ==className ) {
                        elements.push(dom[i]);
                    }
                }
            }
            return elements;
        },
        //����ѡ����
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
                    //ÿ��ѭ����doms������reult��
                    //result.push(doms);//������Դ

                    //����1��� ��װ�ظ��Ĵ���ɺ���
                    pushArray(doms,result)

                }else if(first ==='#'){
                    doms=[$$.$id(item.slice(index+1))]//���壺֮ǰ���Ƕ����doms�����飬����$id��ȡ�Ĳ������飬���ǵ���Ԫ��
                    //��װ�ظ��Ĵ���ɺ���
                    pushArray(doms,result)
                }else{
                    doms = $$.$tag(item)
                    pushArray(doms,result)
                }
            }
            return result;

            //��װ�ظ��Ĵ���
            function pushArray(doms,result){
                for(var j= 0, domlen = doms.length; j < domlen; j++){
                    result.push(doms[j])
                }
            }
        },
        //���ѡ���� - �㷨���� -- �������� --�߼�˼ά����
        $cengci:function (select){
            //�������Ʒ��� -- Ѱ�һ��Ƶ�
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
                    //�����#���ҵ���Ԫ�أ�
                    pushArray([$$.$id(name)]);
                    context = result;
                }else if(first ==='.'){
                    //�����.
                    //�����.
                    //�ҵ�context�����е�classΪ��s-1����Ԫ�� --context�Ǹ�����
                    if(context.length){
                        for(var j = 0, contextLen = context.length; j < contextLen; j++){
                            pushArray($$.$classOld(name, context[j]));
                        }
                    }else{
                        pushArray($$.$class(name));
                    }
                    context = result;
                }else{
                    //����Ǳ�ǩ
                    //�������ף��ҵ������е�Ԫ��==���׶�����context��
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

            //��װ�ظ��Ĵ���
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

            //��װ�ظ��Ĵ���
            function pushArray(doms){
                for(var j= 0, domlen = doms.length; j < domlen; j++){
                    result.push(doms[j])
                }
            }
        },
        $all:function (str,context){
            /*��������*/
            /*��·���ʽ��Ҳ�ܱ�֤���ֵ����һ��������Ҳ�ܹ���������*/
            context = context|| document;
            this.elements = context.querySelectorAll(str)
            return this;
        },
        $allOld:function (str,context){
            /*��������*/
            /*��·���ʽ��Ҳ�ܱ�֤���ֵ����һ��������Ҳ�ܹ���������*/
            context = context|| document;
            return context.querySelectorAll(str)
        }
    })

    /*�¼����*/
    $$.extend($$,{
        //������Ҫ��дһ������ ����ͬʱ�ܹ��������е������  -�ص� -���˱���Ҫ��
        on:function (type,fn){
            var doms = this.elements;
            /*��Ԫ���ʽ*/
         /*   var dom = $$.isString(id)? $$.$id(id):id;*/
            /*����ж�������Ƿ����ĳ������*/
            /*��ʵ�����ж�ĳ�������Ƿ����ĳ������*/
            for(var i = 0 ;i<doms.length;i++){
                var dom = doms[i]
                if(dom.addEventListener){
                    /*ʹ��addEventListener����д�¼�*/
                    dom.addEventListener(type, fn, false);
                }else{
                    if(dom.attachEvent){
                        /*ʹ��΢��˾�ļ�������д�¼�*/
                        dom.attachEvent('on' + type, fn);
                    }
                }
            }

            return this;

        },
        /*����� -- û��Ҫ����˽� --֪���Ϳ�����*/
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

        //ģ�����¼� ����¼������� click
        /*click mouseover hover bind one*/
        click: function (fn){
            $$.on('click',fn);
        },

        /*��������¼�*/
        mouseover:function (fn){
            $$.on('mouseover',fn);
        },

        /*����Ƴ��¼�*/
        mouseout:function (fn){
            $$.on('mouseout',fn);
        },
        /*������Ϻ��Ƴ��¼������������*/
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
        //ע�ͱȴ�����Ҫ
        /*����д��ܵ�Ŀ���Ǹ�����ʹ�õ�
         �����д��ҳ ע�Ͳ��Ǻ���Ҫ*/
        /*��ȡevent����*/
        getEventOld:function (e){
            //�����ie����� --- ʹ��window.event����ȡevent����
            //�������ie���������������������֧�ֱ�׼�ģ���ô����ֱ���ں����мӸ�������ϵͳ���Զ����������������event����
            var event;
            if(e){
                event = e;
            }else if(window.event){
                event = window.event;
            }

            return event
        },
        getEvent:function (e){
            /*��Ԫ���ʽ*/
            return e?e:window.event;
        },
        /*��ȡ�¼�Ŀ��  --��ΪΪ�˱�֤��ͬ��������̵Ĳ�ͬ�汾������*/
        getTarget:function  (event){
            var e = $$.getEvent(event);
            /*��·���ʽ*/
            return e.target|| e.srcElement;
        },
        //��ֹĬ����Ϊ
        preventDefault:function (event){
            var event = $$.getEvent(event);
            if(event.preventDefault){
                event.preventDefault();
            }else{
                event.returnValue = false;
            }
        },
        //��ֹð��
        stopPropagation:function (event){
            var event = $$.getEvent(event);
            if(event.stopPropagation){
                event.stopPropagation();
            }else{
                event.cancelBubble = true;
            }
        }

    })

    /*css ��ʽ������ع���*/
    $$.extend($$,{
        /*���û�ȡ��ʽ*/
        /*css*/
        css:function(key, value){
            var doms = this.elements
            //���������
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
        /*����Ԫ��*/
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

    /*���Կ�� ���Բ�����ع���*/
    $$.extend($$,{
        //��ȡ������������
        attr:function (key,value){
            //˼· �Ǽ�
            /*var doms = $$.$all(context)*/
            var doms = this.elements;
            /*����ģʽ ��ȡģʽ*/
            if(value){
                //����ģʽ  ����ģʽ����Ҫreturn
                for(var i=0;i<doms.length;i++){
                    doms[i].setAttribute(key,value)
                }
            }else{
                /*��ȡģʽ ��Ҫreturn*/
                return doms[0].getAttribute(key)
            }
            return this;
        },
        /*ɾ������ ֪ʶ��arguments*/
        removeAttr:function (){
            var list = Array.prototype.slice.call(arguments)
            var context = list[0]
            /*var doms = $$.$all(context)*/
            var doms = this.elements;
            //Ϊʲô������Ҫ��argumentsתΪ�����飺
            var names = list.slice(1)
            for(var i =0;i<doms.length;i++){
                removeOneElementAttrs(doms[i])
            }
            /*��Ҫ��ĳ��Ԫ�ص����е����Զ�ȥ����*/
            function removeOneElementAttrs(dom){
                for(var j=0;j<names.length;j++){
                    dom.removeAttribute(names[j])
                }
            }
            return this;
        },
        //����class
        addClass:function (className){
            //�����Ȼ�ȡԪ�� -- �ѻ�ȡ��Ԫ�ط���һ����������
            var doms = this.elements;
            //�������ϣ����θ�ÿ��Ԫ�����class
            for(var i=0;i<doms.length;i++){
                addClassName(doms[i])
            }
            //��һ��Ԫ�ص�class����һ��class
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

    /*���ݿ��*/
    $$.extend($$,{
        html:function (str){
            var doms = this.elements;
            if(str){
                /*����ģʽ */
                for(var i=0;i<doms.length;i++){
                    doms[i].innerHTML =str
                }
            }else{
                /*��ȡģʽ*/
                return doms[0].innerHTML;
            }
            return this;
        },
    })

    /*�������*/
    function Animate(){
        /*����������������*/
        this.timer;
        //���ǿ��Զ���һ�����������ԣ�������������������Ҫ��һ������
        this.obj={}
        this._queen=[]
    }
    Animate.prototype = {
        /*
         ���в�
         ְ�������������п����ص�һЩ����      */

        //�����ı���
        /*������ʵ�ܼ򵥣�����һ��ѭ����ÿ��ѭ����ʲô�����أ� �����Ǹı�left*/
        /*�ϴ�*/
        run:function(){
            var that =this;
            that.timer = setInterval(function(){that.loop() },16)


        },
        /*�϶�*/
        move:function(obj){
            var pass = +new Date();
            var that =this;
            var tween = this.getTween(obj.now,pass,obj.duration,'easeOutBounce')
            //����ֹͣ������
            if(tween>=1) {
                /*ֹͣ����*/
                that.stop()
            }else {
                that.setManyProperty(obj.id,obj.styles,tween)
            }
        },
        /*��ȡ����ʱ�����*/
        getTween:function (now,pass,all,ease){
            var eases = {
                //��������
                linear:function (t, b, c, d){
                    return (c - b) * (t/ d);
                },
                //�����˶�
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
                //����
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
        /*ֹͣ*/
        stop:function (){
            /* var tween =1;*/
            var that = this;
            clearInterval(that.timer);
        },
        //����һ����ʽ
        setOneProperty:function (id,name,start,juli,tween){
            /*͸���� ����Ҫpx
             ����width top height left right px*/
            if(name == 'opacity'){
                $$.css(id,name,start + juli*tween)
            }else{
                $$.css(id,name,(start + juli*tween)+'px')
            }
        },
        /*���ö����ʽ*/
        setManyProperty:function (id,styles,tween){
            for(var i =0;i<styles.length;i++){
                var item = styles[i];
                this.setOneProperty(id,item.name,item.start,item.juli,tween)
            }
        },
        //��������һ��loop�Դ����ÿ���������˶� --��ʵ���Ǳ���ÿ������Ȼ������ִ��move����
        loop:function(){
            for(var i= 0,len=this._queen.length;i<len;i++){
                this.move(this._queen[i])
            }
        },


        /*��Ӳ�*/
        /*ְ��������׼���ز� �������Ҫ�ĸ����زĸ���׼���� Ϊ���в�����*/

        /*�û���Ҫ���õķ��� �û�ֻ��Ҫ֪����������Ϳ�����*/
        addOld:function(id,json,duration){
            this.apdapterMany(id,json,duration)
            this.run();
        },
        add:function(){
            /*ϵͳ���Զ�����һ��arguments������ʵ�Σ��û����ݵĲ�����*/
            var list = arguments;
            var id =list[0];
            var json =list[1];
            var duration =list[2]
            this.apdapterMany(id,json,duration)
            this.run();
        },
        /*������ ��������Ҫ�����ݷ���һ��ͳһ����*/
        /*��������� �Ȱ�������Ҫ�Ĳ���׼���ã�Ȼ����ȥ���*/
        apdapterOne:function(id,json,duration){
            /*  Ϊ������û����飬����һ�㽫�����Ҫ�Ĳ���Խ�򵥣�Խ��Խ�ã�
             ���� �����ڱ�̵���Ҫ�Ĳ�����Щ���ݣ�������Ҫ�Ӹ������������û�������������ת��������Ҫ������*/
            /*���ʣ�������Ҫ��Щ���� ����ֵ*/
            /*Ϊ�˱�̷��㣬���ǿ��Զ���һ��json�������������ж��������Ҫ��һ������*/
            var obj={}
            obj.id = id;
            obj.now  = +new Date();
            obj.pass= +new Date();
            obj.tween = 0;
            obj.duration = duration
            obj.styles=this.getStyles(id,json)
            return obj;
        },
        /*��ȡ�����ʽ*/
        getStyles:function (id,source){
            var styles=[]
            for(var item in source){
                /*˼·*/
                /*   name :item
                 start:parseFloat($$.css(id,item))
                 juli:���յ�λ�� -- ��ʼλ��  source[item] - start*/
                var style={};
                style.name = item;
                style.start = parseFloat($$.css(id,item))
                style.juli = parseFloat(source[item]) - style.start
                styles.push(style)

            }
            return styles;
        },
        //������������� --��һְ��ԭ��
        apdapterMany:function (id,source,duration){
            var _obj = this.apdapterOne(id,source,duration)
            this._queen.push(_obj)
        },


        /*���ڲ�*/
        /*��ƨ�ɲ��� �ڴ����*/
        /*��ҵ��HR ������ ���� ������ ϴ�µ� ��Ϣ���� */
        destroy:function(){}

    }
    $$.animate = function(id,json,duration){
        var animate =  new Animate()
        animate.add(id,json,duration)
    }



    /*˫������*/
    /*ʵ�ֺ�jqueryһģһ���Ĵ���*/
    /*����һ������ ����������ֽ�$*/

    function $(context){
        //
        return $$.$all(context)
    }

var test = $('.div')
    w.$ = $;



})(window);

