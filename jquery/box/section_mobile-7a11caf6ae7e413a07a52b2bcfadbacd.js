
var Base=function(){};Base.extend=function(_instance,_static){var extend=Base.prototype.extend;Base._prototyping=true;var proto=new this;extend.call(proto,_instance);proto.base=function(){};delete Base._prototyping;var constructor=proto.constructor;var klass=proto.constructor=function(){if(!Base._prototyping){if(this._constructing||this.constructor==klass){this._constructing=true;constructor.apply(this,arguments);delete this._constructing;}else if(arguments[0]!=null){return(arguments[0].extend||extend).call(arguments[0],proto);}}};klass.ancestor=this;klass.extend=this.extend;klass.forEach=this.forEach;klass.implement=this.implement;klass.prototype=proto;klass.toString=this.toString;klass.valueOf=function(type){return(type=="object")?klass:constructor.valueOf();};extend.call(klass,_static);if(typeof klass.init=="function")klass.init();return klass;};Base.prototype={extend:function(source,value){if(arguments.length>1){var ancestor=this[source];if(ancestor&&(typeof value=="function")&&(!ancestor.valueOf||ancestor.valueOf()!=value.valueOf())&&/\bbase\b/.test(value)){var method=value.valueOf();value=function(){var previous=this.base||Base.prototype.base;this.base=ancestor;var returnValue=method.apply(this,arguments);this.base=previous;return returnValue;};value.valueOf=function(type){return(type=="object")?value:method;};value.toString=Base.toString;}
this[source]=value;}else if(source){var extend=Base.prototype.extend;if(!Base._prototyping&&typeof this!="function"){extend=this.extend||extend;}
var proto={toSource:null};var hidden=["constructor","toString","valueOf"];var i=Base._prototyping?0:1;while(key=hidden[i++]){if(source[key]!=proto[key]){extend.call(this,key,source[key]);}}
for(var key in source){if(!proto[key])extend.call(this,key,source[key]);}}
return this;}};Base=Base.extend({constructor:function(){this.extend(arguments[0]);}},{ancestor:Object,version:"1.1",forEach:function(object,block,context){for(var key in object){if(this.prototype[key]===undefined){block.call(context,object[key],key,object);}}},implement:function(){for(var i=0;i<arguments.length;i++){if(typeof arguments[i]=="function"){arguments[i](this.prototype);}else{this.prototype.extend(arguments[i]);}}
return this;},toString:function(){return String(this.valueOf());}});(function(window,undefined){var document=window.document,navigator=window.navigator,location=window.location;var jQuery=(function(){var jQuery=function(selector,context){return new jQuery.fn.init(selector,context,rootjQuery);},_jQuery=window.jQuery,_$=window.$,rootjQuery,quickExpr=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,rnotwhite=/\S/,trimLeft=/^\s+/,trimRight=/\s+$/,rdigit=/\d/,rsingleTag=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,rvalidchars=/^[\],:{}\s]*$/,rvalidescape=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rvalidtokens=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rvalidbraces=/(?:^|:|,)(?:\s*\[)+/g,rwebkit=/(webkit)[ \/]([\w.]+)/,ropera=/(opera)(?:.*version)?[ \/]([\w.]+)/,rmsie=/(msie) ([\w.]+)/,rmozilla=/(mozilla)(?:.*? rv:([\w.]+))?/,rdashAlpha=/-([a-z]|[0-9])/ig,rmsPrefix=/^-ms-/,fcamelCase=function(all,letter){return(letter+"").toUpperCase();},userAgent=navigator.userAgent,browserMatch,readyList,DOMContentLoaded,toString=Object.prototype.toString,hasOwn=Object.prototype.hasOwnProperty,push=Array.prototype.push,slice=Array.prototype.slice,trim=String.prototype.trim,indexOf=Array.prototype.indexOf,class2type={};jQuery.fn=jQuery.prototype={constructor:jQuery,init:function(selector,context,rootjQuery){var match,elem,ret,doc;if(!selector){return this;}
if(selector.nodeType){this.context=this[0]=selector;this.length=1;return this;}
if(selector==="body"&&!context&&document.body){this.context=document;this[0]=document.body;this.selector=selector;this.length=1;return this;}
if(typeof selector==="string"){if(selector.charAt(0)==="<"&&selector.charAt(selector.length-1)===">"&&selector.length>=3){match=[null,selector,null];}else{match=quickExpr.exec(selector);}
if(match&&(match[1]||!context)){if(match[1]){context=context instanceof jQuery?context[0]:context;doc=(context?context.ownerDocument||context:document);ret=rsingleTag.exec(selector);if(ret){if(jQuery.isPlainObject(context)){selector=[document.createElement(ret[1])];jQuery.fn.attr.call(selector,context,true);}else{selector=[doc.createElement(ret[1])];}}else{ret=jQuery.buildFragment([match[1]],[doc]);selector=(ret.cacheable?jQuery.clone(ret.fragment):ret.fragment).childNodes;}
return jQuery.merge(this,selector);}else{elem=document.getElementById(match[2]);if(elem&&elem.parentNode){if(elem.id!==match[2]){return rootjQuery.find(selector);}
this.length=1;this[0]=elem;}
this.context=document;this.selector=selector;return this;}}else if(!context||context.jquery){return(context||rootjQuery).find(selector);}else{return this.constructor(context).find(selector);}}else if(jQuery.isFunction(selector)){return rootjQuery.ready(selector);}
if(selector.selector!==undefined){this.selector=selector.selector;this.context=selector.context;}
return jQuery.makeArray(selector,this);},selector:"",jquery:"1.7",length:0,size:function(){return this.length;},toArray:function(){return slice.call(this,0);},get:function(num){return num==null?this.toArray():(num<0?this[this.length+num]:this[num]);},pushStack:function(elems,name,selector){var ret=this.constructor();if(jQuery.isArray(elems)){push.apply(ret,elems);}else{jQuery.merge(ret,elems);}
ret.prevObject=this;ret.context=this.context;if(name==="find"){ret.selector=this.selector+(this.selector?" ":"")+selector;}else if(name){ret.selector=this.selector+"."+name+"("+selector+")";}
return ret;},each:function(callback,args){return jQuery.each(this,callback,args);},ready:function(fn){jQuery.bindReady();readyList.add(fn);return this;},eq:function(i){return i===-1?this.slice(i):this.slice(i,+i+1);},first:function(){return this.eq(0);},last:function(){return this.eq(-1);},slice:function(){return this.pushStack(slice.apply(this,arguments),"slice",slice.call(arguments).join(","));},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem);}));},end:function(){return this.prevObject||this.constructor(null);},push:push,sort:[].sort,splice:[].splice};jQuery.fn.init.prototype=jQuery.fn;jQuery.extend=jQuery.fn.extend=function(){var options,name,src,copy,copyIsArray,clone,target=arguments[0]||{},i=1,length=arguments.length,deep=false;if(typeof target==="boolean"){deep=target;target=arguments[1]||{};i=2;}
if(typeof target!=="object"&&!jQuery.isFunction(target)){target={};}
if(length===i){target=this;--i;}
for(;i<length;i++){if((options=arguments[i])!=null){for(name in options){src=target[name];copy=options[name];if(target===copy){continue;}
if(deep&&copy&&(jQuery.isPlainObject(copy)||(copyIsArray=jQuery.isArray(copy)))){if(copyIsArray){copyIsArray=false;clone=src&&jQuery.isArray(src)?src:[];}else{clone=src&&jQuery.isPlainObject(src)?src:{};}
target[name]=jQuery.extend(deep,clone,copy);}else if(copy!==undefined){target[name]=copy;}}}}
return target;};jQuery.extend({noConflict:function(deep){if(window.$===jQuery){window.$=_$;}
if(deep&&window.jQuery===jQuery){window.jQuery=_jQuery;}
return jQuery;},isReady:false,readyWait:1,holdReady:function(hold){if(hold){jQuery.readyWait++;}else{jQuery.ready(true);}},ready:function(wait){if((wait===true&&!--jQuery.readyWait)||(wait!==true&&!jQuery.isReady)){if(!document.body){return setTimeout(jQuery.ready,1);}
jQuery.isReady=true;if(wait!==true&&--jQuery.readyWait>0){return;}
readyList.fireWith(document,[jQuery]);if(jQuery.fn.trigger){jQuery(document).trigger("ready").unbind("ready");}}},bindReady:function(){if(readyList){return;}
readyList=jQuery.Callbacks("once memory");if(document.readyState==="complete"){return setTimeout(jQuery.ready,1);}
if(document.addEventListener){document.addEventListener("DOMContentLoaded",DOMContentLoaded,false);window.addEventListener("load",jQuery.ready,false);}else if(document.attachEvent){document.attachEvent("onreadystatechange",DOMContentLoaded);window.attachEvent("onload",jQuery.ready);var toplevel=false;try{toplevel=window.frameElement==null;}catch(e){}
if(document.documentElement.doScroll&&toplevel){doScrollCheck();}}},isFunction:function(obj){return jQuery.type(obj)==="function";},isArray:Array.isArray||function(obj){return jQuery.type(obj)==="array";},isWindow:function(obj){return obj&&typeof obj==="object"&&"setInterval"in obj;},isNumeric:function(obj){return obj!=null&&rdigit.test(obj)&&!isNaN(obj);},type:function(obj){return obj==null?String(obj):class2type[toString.call(obj)]||"object";},isPlainObject:function(obj){if(!obj||jQuery.type(obj)!=="object"||obj.nodeType||jQuery.isWindow(obj)){return false;}
try{if(obj.constructor&&!hasOwn.call(obj,"constructor")&&!hasOwn.call(obj.constructor.prototype,"isPrototypeOf")){return false;}}catch(e){return false;}
var key;for(key in obj){}
return key===undefined||hasOwn.call(obj,key);},isEmptyObject:function(obj){for(var name in obj){return false;}
return true;},error:function(msg){throw msg;},parseJSON:function(data){if(typeof data=="object")return data;if(typeof data!=="string"||!data){return null;}
data=jQuery.trim(data);if(window.JSON&&window.JSON.parse){return window.JSON.parse(data);}
if(rvalidchars.test(data.replace(rvalidescape,"@").replace(rvalidtokens,"]").replace(rvalidbraces,""))){return(new Function("return "+data))();}
jQuery.error("Invalid JSON: "+data);},parseXML:function(data){var xml,tmp;try{if(window.DOMParser){tmp=new DOMParser();xml=tmp.parseFromString(data,"text/xml");}else{xml=new ActiveXObject("Microsoft.XMLDOM");xml.async="false";xml.loadXML(data);}}catch(e){xml=undefined;}
if(!xml||!xml.documentElement||xml.getElementsByTagName("parsererror").length){jQuery.error("Invalid XML: "+data);}
return xml;},noop:function(){},globalEval:function(data){if(data&&rnotwhite.test(data)){(window.execScript||function(data){window["eval"].call(window,data);})(data);}},camelCase:function(string){return string.replace(rmsPrefix,"ms-").replace(rdashAlpha,fcamelCase);},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toUpperCase()===name.toUpperCase();},each:function(object,callback,args){var name,i=0,length=object.length,isObj=length===undefined||jQuery.isFunction(object);if(args){if(isObj){for(name in object){if(callback.apply(object[name],args)===false){break;}}}else{for(;i<length;){if(callback.apply(object[i++],args)===false){break;}}}}else{if(isObj){for(name in object){if(callback.call(object[name],name,object[name])===false){break;}}}else{for(;i<length;){if(callback.call(object[i],i,object[i++])===false){break;}}}}
return object;},trim:trim?function(text){return text==null?"":trim.call(text);}:function(text){return text==null?"":text.toString().replace(trimLeft,"").replace(trimRight,"");},makeArray:function(array,results){var ret=results||[];if(array!=null){var type=jQuery.type(array);if(array.length==null||type==="string"||type==="function"||type==="regexp"||jQuery.isWindow(array)){push.call(ret,array);}else{jQuery.merge(ret,array);}}
return ret;},inArray:function(elem,array,i){var len;if(array){if(indexOf){return indexOf.call(array,elem,i);}
len=array.length;i=i?i<0?Math.max(0,len+i):i:0;for(;i<len;i++){if(i in array&&array[i]===elem){return i;}}}
return-1;},merge:function(first,second){var i=first.length,j=0;if(typeof second.length==="number"){for(var l=second.length;j<l;j++){first[i++]=second[j];}}else{while(second[j]!==undefined){first[i++]=second[j++];}}
first.length=i;return first;},grep:function(elems,callback,inv){var ret=[],retVal;inv=!!inv;for(var i=0,length=elems.length;i<length;i++){retVal=!!callback(elems[i],i);if(inv!==retVal){ret.push(elems[i]);}}
return ret;},map:function(elems,callback,arg){var value,key,ret=[],i=0,length=elems.length,isArray=elems instanceof jQuery||length!==undefined&&typeof length==="number"&&((length>0&&elems[0]&&elems[length-1])||length===0||jQuery.isArray(elems));if(isArray){for(;i<length;i++){value=callback(elems[i],i,arg);if(value!=null){ret[ret.length]=value;}}}else{for(key in elems){value=callback(elems[key],key,arg);if(value!=null){ret[ret.length]=value;}}}
return ret.concat.apply([],ret);},guid:1,proxy:function(fn,context){if(typeof context==="string"){var tmp=fn[context];context=fn;fn=tmp;}
if(!jQuery.isFunction(fn)){return undefined;}
var args=slice.call(arguments,2),proxy=function(){return fn.apply(context,args.concat(slice.call(arguments)));};proxy.guid=fn.guid=fn.guid||proxy.guid||jQuery.guid++;return proxy;},access:function(elems,key,value,exec,fn,pass){var length=elems.length;if(typeof key==="object"){for(var k in key){jQuery.access(elems,k,key[k],exec,fn,value);}
return elems;}
if(value!==undefined){exec=!pass&&exec&&jQuery.isFunction(value);for(var i=0;i<length;i++){fn(elems[i],key,exec?value.call(elems[i],i,fn(elems[i],key)):value,pass);}
return elems;}
return length?fn(elems[0],key):undefined;},now:function(){return(new Date()).getTime();},uaMatch:function(ua){ua=ua.toLowerCase();var match=rwebkit.exec(ua)||ropera.exec(ua)||rmsie.exec(ua)||ua.indexOf("compatible")<0&&rmozilla.exec(ua)||[];return{browser:match[1]||"",version:match[2]||"0"};},sub:function(){function jQuerySub(selector,context){return new jQuerySub.fn.init(selector,context);}
jQuery.extend(true,jQuerySub,this);jQuerySub.superclass=this;jQuerySub.fn=jQuerySub.prototype=this();jQuerySub.fn.constructor=jQuerySub;jQuerySub.sub=this.sub;jQuerySub.fn.init=function init(selector,context){if(context&&context instanceof jQuery&&!(context instanceof jQuerySub)){context=jQuerySub(context);}
return jQuery.fn.init.call(this,selector,context,rootjQuerySub);};jQuerySub.fn.init.prototype=jQuerySub.fn;var rootjQuerySub=jQuerySub(document);return jQuerySub;},browser:{}});jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(i,name){class2type["[object "+name+"]"]=name.toLowerCase();});browserMatch=jQuery.uaMatch(userAgent);if(browserMatch.browser){jQuery.browser[browserMatch.browser]=true;jQuery.browser.version=browserMatch.version;}
if(jQuery.browser.webkit){jQuery.browser.safari=true;}
if(rnotwhite.test("\xA0")){trimLeft=/^[\s\xA0]+/;trimRight=/[\s\xA0]+$/;}
rootjQuery=jQuery(document);if(document.addEventListener){DOMContentLoaded=function(){document.removeEventListener("DOMContentLoaded",DOMContentLoaded,false);jQuery.ready();};}else if(document.attachEvent){DOMContentLoaded=function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",DOMContentLoaded);jQuery.ready();}};}
function doScrollCheck(){if(jQuery.isReady){return;}
try{document.documentElement.doScroll("left");}catch(e){setTimeout(doScrollCheck,1);return;}
jQuery.ready();}
if(typeof define==="function"&&define.amd&&define.amd.jQuery){define("jquery",[],function(){return jQuery;});}
return jQuery;})();var flagsCache={};function createFlags(flags){var object=flagsCache[flags]={},i,length;flags=flags.split(/\s+/);for(i=0,length=flags.length;i<length;i++){object[flags[i]]=true;}
return object;}
jQuery.Callbacks=function(flags){flags=flags?(flagsCache[flags]||createFlags(flags)):{};var
list=[],stack=[],memory,firing,firingStart,firingLength,firingIndex,add=function(args){var i,length,elem,type,actual;for(i=0,length=args.length;i<length;i++){elem=args[i];type=jQuery.type(elem);if(type==="array"){add(elem);}else if(type==="function"){if(!flags.unique||!self.has(elem)){list.push(elem);}}}},fire=function(context,args){args=args||[];memory=!flags.memory||[context,args];firing=true;firingIndex=firingStart||0;firingStart=0;firingLength=list.length;for(;list&&firingIndex<firingLength;firingIndex++){if(list[firingIndex].apply(context,args)===false&&flags.stopOnFalse){memory=true;break;}}
firing=false;if(list){if(!flags.once){if(stack&&stack.length){memory=stack.shift();self.fireWith(memory[0],memory[1]);}}else if(memory===true){self.disable();}else{list=[];}}},self={add:function(){if(list){var length=list.length;add(arguments);if(firing){firingLength=list.length;}else if(memory&&memory!==true){firingStart=length;fire(memory[0],memory[1]);}}
return this;},remove:function(){if(list){var args=arguments,argIndex=0,argLength=args.length;for(;argIndex<argLength;argIndex++){for(var i=0;i<list.length;i++){if(args[argIndex]===list[i]){if(firing){if(i<=firingLength){firingLength--;if(i<=firingIndex){firingIndex--;}}}
list.splice(i--,1);if(flags.unique){break;}}}}}
return this;},has:function(fn){if(list){var i=0,length=list.length;for(;i<length;i++){if(fn===list[i]){return true;}}}
return false;},empty:function(){list=[];return this;},disable:function(){list=stack=memory=undefined;return this;},disabled:function(){return!list;},lock:function(){stack=undefined;if(!memory||memory===true){self.disable();}
return this;},locked:function(){return!stack;},fireWith:function(context,args){if(stack){if(firing){if(!flags.once){stack.push([context,args]);}}else if(!(flags.once&&memory)){fire(context,args);}}
return this;},fire:function(){self.fireWith(this,arguments);return this;},fired:function(){return!!memory;}};return self;};var
sliceDeferred=[].slice;jQuery.extend({Deferred:function(func){var doneList=jQuery.Callbacks("once memory"),failList=jQuery.Callbacks("once memory"),progressList=jQuery.Callbacks("memory"),state="pending",lists={resolve:doneList,reject:failList,notify:progressList},promise={done:doneList.add,fail:failList.add,progress:progressList.add,state:function(){return state;},isResolved:doneList.fired,isRejected:failList.fired,then:function(doneCallbacks,failCallbacks,progressCallbacks){deferred.done(doneCallbacks).fail(failCallbacks).progress(progressCallbacks);return this;},always:function(){return deferred.done.apply(deferred,arguments).fail.apply(deferred,arguments);},pipe:function(fnDone,fnFail,fnProgress){return jQuery.Deferred(function(newDefer){jQuery.each({done:[fnDone,"resolve"],fail:[fnFail,"reject"],progress:[fnProgress,"notify"]},function(handler,data){var fn=data[0],action=data[1],returned;if(jQuery.isFunction(fn)){deferred[handler](function(){returned=fn.apply(this,arguments);if(returned&&jQuery.isFunction(returned.promise)){returned.promise().then(newDefer.resolve,newDefer.reject,newDefer.notify);}else{newDefer[action+"With"](this===deferred?newDefer:this,[returned]);}});}else{deferred[handler](newDefer[action]);}});}).promise();},promise:function(obj){if(obj==null){obj=promise;}else{for(var key in promise){obj[key]=promise[key];}}
return obj;}},deferred=promise.promise({}),key;for(key in lists){deferred[key]=lists[key].fire;deferred[key+"With"]=lists[key].fireWith;}
deferred.done(function(){state="resolved";},failList.disable,progressList.lock).fail(function(){state="rejected";},doneList.disable,progressList.lock);if(func){func.call(deferred,deferred);}
return deferred;},when:function(firstParam){var args=sliceDeferred.call(arguments,0),i=0,length=args.length,pValues=new Array(length),count=length,pCount=length,deferred=length<=1&&firstParam&&jQuery.isFunction(firstParam.promise)?firstParam:jQuery.Deferred(),promise=deferred.promise();function resolveFunc(i){return function(value){args[i]=arguments.length>1?sliceDeferred.call(arguments,0):value;if(!(--count)){deferred.resolveWith(deferred,args);}};}
function progressFunc(i){return function(value){pValues[i]=arguments.length>1?sliceDeferred.call(arguments,0):value;deferred.notifyWith(promise,pValues);};}
if(length>1){for(;i<length;i++){if(args[i]&&args[i].promise&&jQuery.isFunction(args[i].promise)){args[i].promise().then(resolveFunc(i),deferred.reject,progressFunc(i));}else{--count;}}
if(!count){deferred.resolveWith(deferred,args);}}else if(deferred!==firstParam){deferred.resolveWith(deferred,length?[firstParam]:[]);}
return promise;}});jQuery.support=(function(){var div=document.createElement("div"),documentElement=document.documentElement,all,a,select,opt,input,marginDiv,support,fragment,body,testElementParent,testElement,testElementStyle,tds,events,eventName,i,isSupported;div.setAttribute("className","t");div.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/><nav></nav>";all=div.getElementsByTagName("*");a=div.getElementsByTagName("a")[0];if(!all||!all.length||!a){return{};}
select=document.createElement("select");opt=select.appendChild(document.createElement("option"));input=div.getElementsByTagName("input")[0];support={leadingWhitespace:(div.firstChild.nodeType===3),tbody:!div.getElementsByTagName("tbody").length,htmlSerialize:!!div.getElementsByTagName("link").length,style:/top/.test(a.getAttribute("style")),hrefNormalized:(a.getAttribute("href")==="/a"),opacity:/^0.55/.test(a.style.opacity),cssFloat:!!a.style.cssFloat,unknownElems:!!div.getElementsByTagName("nav").length,checkOn:(input.value==="on"),optSelected:opt.selected,getSetAttribute:div.className!=="t",enctype:!!document.createElement("form").enctype,submitBubbles:true,changeBubbles:true,focusinBubbles:false,deleteExpando:true,noCloneEvent:true,inlineBlockNeedsLayout:false,shrinkWrapBlocks:false,reliableMarginRight:true};input.checked=true;support.noCloneChecked=input.cloneNode(true).checked;select.disabled=true;support.optDisabled=!opt.disabled;try{delete div.test;}catch(e){support.deleteExpando=false;}
if(!div.addEventListener&&div.attachEvent&&div.fireEvent){div.attachEvent("onclick",function(){support.noCloneEvent=false;});div.cloneNode(true).fireEvent("onclick");}
input=document.createElement("input");input.value="t";input.setAttribute("type","radio");support.radioValue=input.value==="t";input.setAttribute("checked","checked");div.appendChild(input);fragment=document.createDocumentFragment();fragment.appendChild(div.lastChild);support.checkClone=fragment.cloneNode(true).cloneNode(true).lastChild.checked;div.innerHTML="";div.style.width=div.style.paddingLeft="1px";body=document.getElementsByTagName("body")[0];testElement=document.createElement(body?"div":"body");testElementStyle={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"};if(body){jQuery.extend(testElementStyle,{position:"absolute",left:"-999px",top:"-999px"});}
for(i in testElementStyle){testElement.style[i]=testElementStyle[i];}
testElement.appendChild(div);testElementParent=body||documentElement;testElementParent.insertBefore(testElement,testElementParent.firstChild);support.appendChecked=input.checked;support.boxModel=div.offsetWidth===2;if("zoom"in div.style){div.style.display="inline";div.style.zoom=1;support.inlineBlockNeedsLayout=(div.offsetWidth===2);div.style.display="";div.innerHTML="<div style='width:4px;'></div>";support.shrinkWrapBlocks=(div.offsetWidth!==2);}
div.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";tds=div.getElementsByTagName("td");isSupported=(tds[0].offsetHeight===0);tds[0].style.display="";tds[1].style.display="none";support.reliableHiddenOffsets=isSupported&&(tds[0].offsetHeight===0);div.innerHTML="";if(document.defaultView&&document.defaultView.getComputedStyle){marginDiv=document.createElement("div");marginDiv.style.width="0";marginDiv.style.marginRight="0";div.appendChild(marginDiv);support.reliableMarginRight=(parseInt((document.defaultView.getComputedStyle(marginDiv,null)||{marginRight:0}).marginRight,10)||0)===0;}
if(div.attachEvent){for(i in{submit:1,change:1,focusin:1}){eventName="on"+i;isSupported=(eventName in div);if(!isSupported){div.setAttribute(eventName,"return;");isSupported=(typeof div[eventName]==="function");}
support[i+"Bubbles"]=isSupported;}}
jQuery(function(){var container,outer,inner,table,td,offsetSupport,conMarginTop=1,ptlm="position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",vb="visibility:hidden;border:0;",style="style='"+ptlm+"border:5px solid #000;padding:0;'",html="<div "+style+"><div></div></div>"+"<table "+style+" cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>";body=document.getElementsByTagName("body")[0];if(!body){return;}
container=document.createElement("div");container.style.cssText=vb+"width:0;height:0;position:static;top:0;margin-top:"+conMarginTop+"px";body.insertBefore(container,body.firstChild);testElement=document.createElement("div");testElement.style.cssText=ptlm+vb;testElement.innerHTML=html;container.appendChild(testElement);outer=testElement.firstChild;inner=outer.firstChild;td=outer.nextSibling.firstChild.firstChild;offsetSupport={doesNotAddBorder:(inner.offsetTop!==5),doesAddBorderForTableAndCells:(td.offsetTop===5)};inner.style.position="fixed";inner.style.top="20px";offsetSupport.fixedPosition=(inner.offsetTop===20||inner.offsetTop===15);inner.style.position=inner.style.top="";outer.style.overflow="hidden";outer.style.position="relative";offsetSupport.subtractsBorderForOverflowNotVisible=(inner.offsetTop===-5);offsetSupport.doesNotIncludeMarginInBodyOffset=(body.offsetTop!==conMarginTop);body.removeChild(container);testElement=container=null;jQuery.extend(support,offsetSupport);});testElement.innerHTML="";testElementParent.removeChild(testElement);testElement=fragment=select=opt=body=marginDiv=div=input=null;return support;})();jQuery.boxModel=jQuery.support.boxModel;var rbrace=/^(?:\{.*\}|\[.*\])$/,rmultiDash=/([A-Z])/g;jQuery.extend({cache:{},uuid:0,expando:"jQuery"+(jQuery.fn.jquery+Math.random()).replace(/\D/g,""),noData:{"embed":true,"object":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000","applet":true},hasData:function(elem){elem=elem.nodeType?jQuery.cache[elem[jQuery.expando]]:elem[jQuery.expando];return!!elem&&!isEmptyDataObject(elem);},data:function(elem,name,data,pvt){if(!jQuery.acceptData(elem)){return;}
var privateCache,thisCache,ret,internalKey=jQuery.expando,getByName=typeof name==="string",isNode=elem.nodeType,cache=isNode?jQuery.cache:elem,id=isNode?elem[jQuery.expando]:elem[jQuery.expando]&&jQuery.expando,isEvents=name==="events";if((!id||!cache[id]||(!isEvents&&!pvt&&!cache[id].data))&&getByName&&data===undefined){return;}
if(!id){if(isNode){elem[jQuery.expando]=id=++jQuery.uuid;}else{id=jQuery.expando;}}
if(!cache[id]){cache[id]={};if(!isNode){cache[id].toJSON=jQuery.noop;}}
if(typeof name==="object"||typeof name==="function"){if(pvt){cache[id]=jQuery.extend(cache[id],name);}else{cache[id].data=jQuery.extend(cache[id].data,name);}}
privateCache=thisCache=cache[id];if(!pvt){if(!thisCache.data){thisCache.data={};}
thisCache=thisCache.data;}
if(data!==undefined){thisCache[jQuery.camelCase(name)]=data;}
if(isEvents&&!thisCache[name]){return privateCache.events;}
if(getByName){ret=thisCache[name];if(ret==null){ret=thisCache[jQuery.camelCase(name)];}}else{ret=thisCache;}
return ret;},removeData:function(elem,name,pvt){if(!jQuery.acceptData(elem)){return;}
var thisCache,i,l,internalKey=jQuery.expando,isNode=elem.nodeType,cache=isNode?jQuery.cache:elem,id=isNode?elem[jQuery.expando]:jQuery.expando;if(!cache[id]){return;}
if(name){thisCache=pvt?cache[id]:cache[id].data;if(thisCache){if(jQuery.isArray(name)){name=name;}else if(name in thisCache){name=[name];}else{name=jQuery.camelCase(name);if(name in thisCache){name=[name];}else{name=name.split(" ");}}
for(i=0,l=name.length;i<l;i++){delete thisCache[name[i]];}
if(!(pvt?isEmptyDataObject:jQuery.isEmptyObject)(thisCache)){return;}}}
if(!pvt){delete cache[id].data;if(!isEmptyDataObject(cache[id])){return;}}
if(jQuery.support.deleteExpando||!cache.setInterval){delete cache[id];}else{cache[id]=null;}
if(isNode){if(jQuery.support.deleteExpando){delete elem[jQuery.expando];}else if(elem.removeAttribute){elem.removeAttribute(jQuery.expando);}else{elem[jQuery.expando]=null;}}},_data:function(elem,name,data){return jQuery.data(elem,name,data,true);},acceptData:function(elem){if(elem.nodeName){var match=jQuery.noData[elem.nodeName.toLowerCase()];if(match){return!(match===true||elem.getAttribute("classid")!==match);}}
return true;}});jQuery.fn.extend({data:function(key,value){var parts,attr,name,data=null;if(typeof key==="undefined"){if(this.length){data=jQuery.data(this[0]);if(this[0].nodeType===1&&!jQuery._data(this[0],"parsedAttrs")){attr=this[0].attributes;for(var i=0,l=attr.length;i<l;i++){name=attr[i].name;if(name.indexOf("data-")===0){name=jQuery.camelCase(name.substring(5));dataAttr(this[0],name,data[name]);}}
jQuery._data(this[0],"parsedAttrs",true);}}
return data;}else if(typeof key==="object"){return this.each(function(){jQuery.data(this,key);});}
parts=key.split(".");parts[1]=parts[1]?"."+parts[1]:"";if(value===undefined){data=this.triggerHandler("getData"+parts[1]+"!",[parts[0]]);if(data===undefined&&this.length){data=jQuery.data(this[0],key);data=dataAttr(this[0],key,data);}
return data===undefined&&parts[1]?this.data(parts[0]):data;}else{return this.each(function(){var $this=jQuery(this),args=[parts[0],value];$this.triggerHandler("setData"+parts[1]+"!",args);jQuery.data(this,key,value);$this.triggerHandler("changeData"+parts[1]+"!",args);});}},removeData:function(key){return this.each(function(){jQuery.removeData(this,key);});}});function dataAttr(elem,key,data){if(data===undefined&&elem.nodeType===1){var name="data-"+key.replace(rmultiDash,"-$1").toLowerCase();data=elem.getAttribute(name);if(typeof data==="string"){try{data=data==="true"?true:data==="false"?false:data==="null"?null:jQuery.isNumeric(data)?parseFloat(data):rbrace.test(data)?jQuery.parseJSON(data):data;}catch(e){}
jQuery.data(elem,key,data);}else{data=undefined;}}
return data;}
function isEmptyDataObject(obj){for(var name in obj){if(name==="data"&&jQuery.isEmptyObject(obj[name])){continue;}
if(name!=="toJSON"){return false;}}
return true;}
function handleQueueMarkDefer(elem,type,src){var deferDataKey=type+"defer",queueDataKey=type+"queue",markDataKey=type+"mark",defer=jQuery._data(elem,deferDataKey);if(defer&&(src==="queue"||!jQuery._data(elem,queueDataKey))&&(src==="mark"||!jQuery._data(elem,markDataKey))){setTimeout(function(){if(!jQuery._data(elem,queueDataKey)&&!jQuery._data(elem,markDataKey)){jQuery.removeData(elem,deferDataKey,true);defer.fire();}},0);}}
jQuery.extend({_mark:function(elem,type){if(elem){type=(type||"fx")+"mark";jQuery._data(elem,type,(jQuery._data(elem,type)||0)+1);}},_unmark:function(force,elem,type){if(force!==true){type=elem;elem=force;force=false;}
if(elem){type=type||"fx";var key=type+"mark",count=force?0:((jQuery._data(elem,key)||1)-1);if(count){jQuery._data(elem,key,count);}else{jQuery.removeData(elem,key,true);handleQueueMarkDefer(elem,type,"mark");}}},queue:function(elem,type,data){var q;if(elem){type=(type||"fx")+"queue";q=jQuery._data(elem,type);if(data){if(!q||jQuery.isArray(data)){q=jQuery._data(elem,type,jQuery.makeArray(data));}else{q.push(data);}}
return q||[];}},dequeue:function(elem,type){type=type||"fx";var queue=jQuery.queue(elem,type),fn=queue.shift(),hooks={};if(fn==="inprogress"){fn=queue.shift();}
if(fn){if(type==="fx"){queue.unshift("inprogress");}
jQuery._data(elem,type+".run",hooks);fn.call(elem,function(){jQuery.dequeue(elem,type);},hooks);}
if(!queue.length){jQuery.removeData(elem,type+"queue "+type+".run",true);handleQueueMarkDefer(elem,type,"queue");}}});jQuery.fn.extend({queue:function(type,data){if(typeof type!=="string"){data=type;type="fx";}
if(data===undefined){return jQuery.queue(this[0],type);}
return this.each(function(){var queue=jQuery.queue(this,type,data);if(type==="fx"&&queue[0]!=="inprogress"){jQuery.dequeue(this,type);}});},dequeue:function(type){return this.each(function(){jQuery.dequeue(this,type);});},delay:function(time,type){time=jQuery.fx?jQuery.fx.speeds[time]||time:time;type=type||"fx";return this.queue(type,function(next,hooks){var timeout=setTimeout(next,time);hooks.stop=function(){clearTimeout(timeout);};});},clearQueue:function(type){return this.queue(type||"fx",[]);},promise:function(type,object){if(typeof type!=="string"){object=type;type=undefined;}
type=type||"fx";var defer=jQuery.Deferred(),elements=this,i=elements.length,count=1,deferDataKey=type+"defer",queueDataKey=type+"queue",markDataKey=type+"mark",tmp;function resolve(){if(!(--count)){defer.resolveWith(elements,[elements]);}}
while(i--){if((tmp=jQuery.data(elements[i],deferDataKey,undefined,true)||(jQuery.data(elements[i],queueDataKey,undefined,true)||jQuery.data(elements[i],markDataKey,undefined,true))&&jQuery.data(elements[i],deferDataKey,jQuery.Callbacks("once memory"),true))){count++;tmp.add(resolve);}}
resolve();return defer.promise();}});var rclass=/[\n\t\r]/g,rspace=/\s+/,rreturn=/\r/g,rtype=/^(?:button|input)$/i,rfocusable=/^(?:button|input|object|select|textarea)$/i,rclickable=/^a(?:rea)?$/i,rboolean=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,getSetAttribute=jQuery.support.getSetAttribute,nodeHook,boolHook,fixSpecified;jQuery.fn.extend({attr:function(name,value){return jQuery.access(this,name,value,true,jQuery.attr);},removeAttr:function(name){return this.each(function(){jQuery.removeAttr(this,name);});},prop:function(name,value){return jQuery.access(this,name,value,true,jQuery.prop);},removeProp:function(name){name=jQuery.propFix[name]||name;return this.each(function(){try{this[name]=undefined;delete this[name];}catch(e){}});},addClass:function(value){var classNames,i,l,elem,setClass,c,cl;if(jQuery.isFunction(value)){return this.each(function(j){jQuery(this).addClass(value.call(this,j,this.className));});}
if(value&&typeof value==="string"){classNames=value.split(rspace);for(i=0,l=this.length;i<l;i++){elem=this[i];if(elem.nodeType===1){if(!elem.className&&classNames.length===1){elem.className=value;}else{setClass=" "+elem.className+" ";for(c=0,cl=classNames.length;c<cl;c++){if(!~setClass.indexOf(" "+classNames[c]+" ")){setClass+=classNames[c]+" ";}}
elem.className=jQuery.trim(setClass);}}}}
return this;},removeClass:function(value){var classNames,i,l,elem,className,c,cl;if(jQuery.isFunction(value)){return this.each(function(j){jQuery(this).removeClass(value.call(this,j,this.className));});}
if((value&&typeof value==="string")||value===undefined){classNames=(value||"").split(rspace);for(i=0,l=this.length;i<l;i++){elem=this[i];if(elem.nodeType===1&&elem.className){if(value){className=(" "+elem.className+" ").replace(rclass," ");for(c=0,cl=classNames.length;c<cl;c++){className=className.replace(" "+classNames[c]+" "," ");}
elem.className=jQuery.trim(className);}else{elem.className="";}}}}
return this;},toggleClass:function(value,stateVal){var type=typeof value,isBool=typeof stateVal==="boolean";if(jQuery.isFunction(value)){return this.each(function(i){jQuery(this).toggleClass(value.call(this,i,this.className,stateVal),stateVal);});}
return this.each(function(){if(type==="string"){var className,i=0,self=jQuery(this),state=stateVal,classNames=value.split(rspace);while((className=classNames[i++])){state=isBool?state:!self.hasClass(className);self[state?"addClass":"removeClass"](className);}}else if(type==="undefined"||type==="boolean"){if(this.className){jQuery._data(this,"__className__",this.className);}
this.className=this.className||value===false?"":jQuery._data(this,"__className__")||"";}});},hasClass:function(selector){var className=" "+selector+" ",i=0,l=this.length;for(;i<l;i++){if(this[i].nodeType===1&&(" "+this[i].className+" ").replace(rclass," ").indexOf(className)>-1){return true;}}
return false;},val:function(value){var hooks,ret,isFunction,elem=this[0];if(!arguments.length){if(elem){hooks=jQuery.valHooks[elem.nodeName.toLowerCase()]||jQuery.valHooks[elem.type];if(hooks&&"get"in hooks&&(ret=hooks.get(elem,"value"))!==undefined){return ret;}
ret=elem.value;return typeof ret==="string"?ret.replace(rreturn,""):ret==null?"":ret;}
return undefined;}
isFunction=jQuery.isFunction(value);return this.each(function(i){var self=jQuery(this),val;if(this.nodeType!==1){return;}
if(isFunction){val=value.call(this,i,self.val());}else{val=value;}
if(val==null){val="";}else if(typeof val==="number"){val+="";}else if(jQuery.isArray(val)){val=jQuery.map(val,function(value){return value==null?"":value+"";});}
hooks=jQuery.valHooks[this.nodeName.toLowerCase()]||jQuery.valHooks[this.type];if(!hooks||!("set"in hooks)||hooks.set(this,val,"value")===undefined){this.value=val;}});}});jQuery.extend({valHooks:{option:{get:function(elem){var val=elem.attributes.value;return!val||val.specified?elem.value:elem.text;}},select:{get:function(elem){var value,i,max,option,index=elem.selectedIndex,values=[],options=elem.options,one=elem.type==="select-one";if(index<0){return null;}
i=one?index:0;max=one?index+1:options.length;for(;i<max;i++){option=options[i];if(option.selected&&(jQuery.support.optDisabled?!option.disabled:option.getAttribute("disabled")===null)&&(!option.parentNode.disabled||!jQuery.nodeName(option.parentNode,"optgroup"))){value=jQuery(option).val();if(one){return value;}
values.push(value);}}
if(one&&!values.length&&options.length){return jQuery(options[index]).val();}
return values;},set:function(elem,value){var values=jQuery.makeArray(value);jQuery(elem).find("option").each(function(){this.selected=jQuery.inArray(jQuery(this).val(),values)>=0;});if(!values.length){elem.selectedIndex=-1;}
return values;}}},attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},attr:function(elem,name,value,pass){var ret,hooks,notxml,nType=elem.nodeType;if(!elem||nType===3||nType===8||nType===2){return undefined;}
if(pass&&name in jQuery.attrFn){return jQuery(elem)[name](value);}
if(!("getAttribute"in elem)){return jQuery.prop(elem,name,value);}
notxml=nType!==1||!jQuery.isXMLDoc(elem);if(notxml){name=name.toLowerCase();hooks=jQuery.attrHooks[name]||(rboolean.test(name)?boolHook:nodeHook);}
if(value!==undefined){if(value===null){jQuery.removeAttr(elem,name);return undefined;}else if(hooks&&"set"in hooks&&notxml&&(ret=hooks.set(elem,value,name))!==undefined){return ret;}else{elem.setAttribute(name,""+value);return value;}}else if(hooks&&"get"in hooks&&notxml&&(ret=hooks.get(elem,name))!==null){return ret;}else{ret=elem.getAttribute(name);return ret===null?undefined:ret;}},removeAttr:function(elem,value){var propName,attrNames,name,l,i=0;if(elem.nodeType===1){attrNames=(value||"").split(rspace);l=attrNames.length;for(;i<l;i++){name=attrNames[i].toLowerCase();propName=jQuery.propFix[name]||name;jQuery.attr(elem,name,"");elem.removeAttribute(getSetAttribute?name:propName);if(rboolean.test(name)&&propName in elem){elem[propName]=false;}}}},attrHooks:{type:{set:function(elem,value){if(rtype.test(elem.nodeName)&&elem.parentNode){jQuery.error("type property can't be changed");}else if(!jQuery.support.radioValue&&value==="radio"&&jQuery.nodeName(elem,"input")){var val=elem.value;elem.setAttribute("type",value);if(val){elem.value=val;}
return value;}}},value:{get:function(elem,name){if(nodeHook&&jQuery.nodeName(elem,"button")){return nodeHook.get(elem,name);}
return name in elem?elem.value:null;},set:function(elem,value,name){if(nodeHook&&jQuery.nodeName(elem,"button")){return nodeHook.set(elem,value,name);}
elem.value=value;}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(elem,name,value){var ret,hooks,notxml,nType=elem.nodeType;if(!elem||nType===3||nType===8||nType===2){return undefined;}
notxml=nType!==1||!jQuery.isXMLDoc(elem);if(notxml){name=jQuery.propFix[name]||name;hooks=jQuery.propHooks[name];}
if(value!==undefined){if(hooks&&"set"in hooks&&(ret=hooks.set(elem,value,name))!==undefined){return ret;}else{return(elem[name]=value);}}else{if(hooks&&"get"in hooks&&(ret=hooks.get(elem,name))!==null){return ret;}else{return elem[name];}}},propHooks:{tabIndex:{get:function(elem){var attributeNode=elem.getAttributeNode("tabindex");return attributeNode&&attributeNode.specified?parseInt(attributeNode.value,10):rfocusable.test(elem.nodeName)||rclickable.test(elem.nodeName)&&elem.href?0:undefined;}}}});jQuery.attrHooks.tabindex=jQuery.propHooks.tabIndex;boolHook={get:function(elem,name){var attrNode,property=jQuery.prop(elem,name);return property===true||typeof property!=="boolean"&&(attrNode=elem.getAttributeNode(name))&&attrNode.nodeValue!==false?name.toLowerCase():undefined;},set:function(elem,value,name){var propName;if(value===false){jQuery.removeAttr(elem,name);}else{propName=jQuery.propFix[name]||name;if(propName in elem){elem[propName]=true;}
elem.setAttribute(name,name.toLowerCase());}
return name;}};if(!getSetAttribute){fixSpecified={name:true,id:true};nodeHook=jQuery.valHooks.button={get:function(elem,name){var ret;ret=elem.getAttributeNode(name);return ret&&(fixSpecified[name]?ret.nodeValue!=="":ret.specified)?ret.nodeValue:undefined;},set:function(elem,value,name){var ret=elem.getAttributeNode(name);if(!ret){ret=document.createAttribute(name);elem.setAttributeNode(ret);}
return(ret.nodeValue=value+"");}};jQuery.attrHooks.tabindex.set=nodeHook.set;jQuery.each(["width","height"],function(i,name){jQuery.attrHooks[name]=jQuery.extend(jQuery.attrHooks[name],{set:function(elem,value){if(value===""){elem.setAttribute(name,"auto");return value;}}});});jQuery.attrHooks.contenteditable={get:nodeHook.get,set:function(elem,value,name){if(value===""){value="false";}
nodeHook.set(elem,value,name);}};}
if(!jQuery.support.hrefNormalized){jQuery.each(["href","src","width","height"],function(i,name){jQuery.attrHooks[name]=jQuery.extend(jQuery.attrHooks[name],{get:function(elem){var ret=elem.getAttribute(name,2);return ret===null?undefined:ret;}});});}
if(!jQuery.support.style){jQuery.attrHooks.style={get:function(elem){return elem.style.cssText.toLowerCase()||undefined;},set:function(elem,value){return(elem.style.cssText=""+value);}};}
if(!jQuery.support.optSelected){jQuery.propHooks.selected=jQuery.extend(jQuery.propHooks.selected,{get:function(elem){var parent=elem.parentNode;if(parent){parent.selectedIndex;if(parent.parentNode){parent.parentNode.selectedIndex;}}
return null;}});}
if(!jQuery.support.enctype){jQuery.propFix.enctype="encoding";}
if(!jQuery.support.checkOn){jQuery.each(["radio","checkbox"],function(){jQuery.valHooks[this]={get:function(elem){return elem.getAttribute("value")===null?"on":elem.value;}};});}
jQuery.each(["radio","checkbox"],function(){jQuery.valHooks[this]=jQuery.extend(jQuery.valHooks[this],{set:function(elem,value){if(jQuery.isArray(value)){return(elem.checked=jQuery.inArray(jQuery(elem).val(),value)>=0);}}});});var rnamespaces=/\.(.*)$/,rformElems=/^(?:textarea|input|select)$/i,rperiod=/\./g,rspaces=/ /g,rescape=/[^\w\s.|`]/g,rtypenamespace=/^([^\.]*)?(?:\.(.+))?$/,rhoverHack=/\bhover(\.\S+)?/,rkeyEvent=/^key/,rmouseEvent=/^(?:mouse|contextmenu)|click/,rquickIs=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,quickParse=function(selector){var quick=rquickIs.exec(selector);if(quick){quick[1]=(quick[1]||"").toLowerCase();quick[3]=quick[3]&&new RegExp("(?:^|\\s)"+quick[3]+"(?:\\s|$)");}
return quick;},quickIs=function(elem,m){return((!m[1]||elem.nodeName.toLowerCase()===m[1])&&(!m[2]||elem.id===m[2])&&(!m[3]||m[3].test(elem.className)));},hoverHack=function(events){return jQuery.event.special.hover?events:events.replace(rhoverHack,"mouseenter$1 mouseleave$1");};jQuery.event={add:function(elem,types,handler,data,selector){var elemData,eventHandle,events,t,tns,type,namespaces,handleObj,handleObjIn,quick,handlers,special;if(elem.nodeType===3||elem.nodeType===8||!types||!handler||!(elemData=jQuery._data(elem))){return;}
if(handler.handler){handleObjIn=handler;handler=handleObjIn.handler;}
if(!handler.guid){handler.guid=jQuery.guid++;}
events=elemData.events;if(!events){elemData.events=events={};}
eventHandle=elemData.handle;if(!eventHandle){elemData.handle=eventHandle=function(e){return typeof jQuery!=="undefined"&&(!e||jQuery.event.triggered!==e.type)?jQuery.event.dispatch.apply(eventHandle.elem,arguments):undefined;};eventHandle.elem=elem;}
types=hoverHack(types).split(" ");for(t=0;t<types.length;t++){tns=rtypenamespace.exec(types[t])||[];type=tns[1];namespaces=(tns[2]||"").split(".").sort();special=jQuery.event.special[type]||{};type=(selector?special.delegateType:special.bindType)||type;special=jQuery.event.special[type]||{};handleObj=jQuery.extend({type:type,origType:tns[1],data:data,handler:handler,guid:handler.guid,selector:selector,namespace:namespaces.join(".")},handleObjIn);if(selector){handleObj.quick=quickParse(selector);if(!handleObj.quick&&jQuery.expr.match.POS.test(selector)){handleObj.isPositional=true;}}
handlers=events[type];if(!handlers){handlers=events[type]=[];handlers.delegateCount=0;if(!special.setup||special.setup.call(elem,data,namespaces,eventHandle)===false){if(elem.addEventListener){elem.addEventListener(type,eventHandle,false);}else if(elem.attachEvent){elem.attachEvent("on"+type,eventHandle);}}}
if(special.add){special.add.call(elem,handleObj);if(!handleObj.handler.guid){handleObj.handler.guid=handler.guid;}}
if(selector){handlers.splice(handlers.delegateCount++,0,handleObj);}else{handlers.push(handleObj);}
jQuery.event.global[type]=true;}
elem=null;},global:{},remove:function(elem,types,handler,selector){var elemData=jQuery.hasData(elem)&&jQuery._data(elem),t,tns,type,namespaces,origCount,j,events,special,handle,eventType,handleObj;if(!elemData||!(events=elemData.events)){return;}
types=hoverHack(types||"").split(" ");for(t=0;t<types.length;t++){tns=rtypenamespace.exec(types[t])||[];type=tns[1];namespaces=tns[2];if(!type){namespaces=namespaces?"."+namespaces:"";for(j in events){jQuery.event.remove(elem,j+namespaces,handler,selector);}
return;}
special=jQuery.event.special[type]||{};type=(selector?special.delegateType:special.bindType)||type;eventType=events[type]||[];origCount=eventType.length;namespaces=namespaces?new RegExp("(^|\\.)"+namespaces.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;if(handler||namespaces||selector||special.remove){for(j=0;j<eventType.length;j++){handleObj=eventType[j];if(!handler||handler.guid===handleObj.guid){if(!namespaces||namespaces.test(handleObj.namespace)){if(!selector||selector===handleObj.selector||selector==="**"&&handleObj.selector){eventType.splice(j--,1);if(handleObj.selector){eventType.delegateCount--;}
if(special.remove){special.remove.call(elem,handleObj);}}}}}}else{eventType.length=0;}
if(eventType.length===0&&origCount!==eventType.length){if(!special.teardown||special.teardown.call(elem,namespaces)===false){jQuery.removeEvent(elem,type,elemData.handle);}
delete events[type];}}
if(jQuery.isEmptyObject(events)){handle=elemData.handle;if(handle){handle.elem=null;}
jQuery.removeData(elem,["events","handle"],true);}},customEvent:{"getData":true,"setData":true,"changeData":true},trigger:function(event,data,elem,onlyHandlers){if(elem&&(elem.nodeType===3||elem.nodeType===8)){return;}
var type=event.type||event,namespaces=[],cache,exclusive,i,cur,old,ontype,special,handle,eventPath,bubbleType;if(type.indexOf("!")>=0){type=type.slice(0,-1);exclusive=true;}
if(type.indexOf(".")>=0){namespaces=type.split(".");type=namespaces.shift();namespaces.sort();}
if((!elem||jQuery.event.customEvent[type])&&!jQuery.event.global[type]){return;}
event=typeof event==="object"?event[jQuery.expando]?event:new jQuery.Event(type,event):new jQuery.Event(type);event.type=type;event.isTrigger=true;event.exclusive=exclusive;event.namespace=namespaces.join(".");event.namespace_re=event.namespace?new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.)?")+"(\\.|$)"):null;ontype=type.indexOf(":")<0?"on"+type:"";if(onlyHandlers||!elem){event.preventDefault();}
if(!elem){cache=jQuery.cache;for(i in cache){if(cache[i].events&&cache[i].events[type]){jQuery.event.trigger(event,data,cache[i].handle.elem,true);}}
return;}
event.result=undefined;if(!event.target){event.target=elem;}
data=data!=null?jQuery.makeArray(data):[];data.unshift(event);special=jQuery.event.special[type]||{};if(special.trigger&&special.trigger.apply(elem,data)===false){return;}
eventPath=[[elem,special.bindType||type]];if(!onlyHandlers&&!special.noBubble&&!jQuery.isWindow(elem)){bubbleType=special.delegateType||type;old=null;for(cur=elem.parentNode;cur;cur=cur.parentNode){eventPath.push([cur,bubbleType]);old=cur;}
if(old&&old===elem.ownerDocument){eventPath.push([old.defaultView||old.parentWindow||window,bubbleType]);}}
for(i=0;i<eventPath.length;i++){cur=eventPath[i][0];event.type=eventPath[i][1];handle=(jQuery._data(cur,"events")||{})[event.type]&&jQuery._data(cur,"handle");if(handle){handle.apply(cur,data);}
handle=ontype&&cur[ontype];if(handle&&jQuery.acceptData(cur)){handle.apply(cur,data);}
if(event.isPropagationStopped()){break;}}
event.type=type;if(!event.isDefaultPrevented()){if((!special._default||special._default.apply(elem.ownerDocument,data)===false)&&!(type==="click"&&jQuery.nodeName(elem,"a"))&&jQuery.acceptData(elem)){if(ontype&&elem[type]&&((type!=="focus"&&type!=="blur")||event.target.offsetWidth!==0)&&!jQuery.isWindow(elem)){old=elem[ontype];if(old){elem[ontype]=null;}
jQuery.event.triggered=type;elem[type]();jQuery.event.triggered=undefined;if(old){elem[ontype]=old;}}}}
return event.result;},dispatch:function(event){event=jQuery.event.fix(event||window.event);var handlers=((jQuery._data(this,"events")||{})[event.type]||[]),delegateCount=handlers.delegateCount,args=[].slice.call(arguments,0),run_all=!event.exclusive&&!event.namespace,specialHandle=(jQuery.event.special[event.type]||{}).handle,handlerQueue=[],i,j,cur,ret,selMatch,matched,matches,handleObj,sel,hit,related;args[0]=event;event.delegateTarget=this;if(delegateCount&&!event.target.disabled&&!(event.button&&event.type==="click")){for(cur=event.target;cur!=this;cur=cur.parentNode||this){selMatch={};matches=[];for(i=0;i<delegateCount;i++){handleObj=handlers[i];sel=handleObj.selector;hit=selMatch[sel];if(handleObj.isPositional){hit=(hit||(selMatch[sel]=jQuery(sel))).index(cur)>=0;}else if(hit===undefined){hit=selMatch[sel]=(handleObj.quick?quickIs(cur,handleObj.quick):jQuery(cur).is(sel));}
if(hit){matches.push(handleObj);}}
if(matches.length){handlerQueue.push({elem:cur,matches:matches});}}}
if(handlers.length>delegateCount){handlerQueue.push({elem:this,matches:handlers.slice(delegateCount)});}
for(i=0;i<handlerQueue.length&&!event.isPropagationStopped();i++){matched=handlerQueue[i];event.currentTarget=matched.elem;for(j=0;j<matched.matches.length&&!event.isImmediatePropagationStopped();j++){handleObj=matched.matches[j];if(run_all||(!event.namespace&&!handleObj.namespace)||event.namespace_re&&event.namespace_re.test(handleObj.namespace)){event.data=handleObj.data;event.handleObj=handleObj;ret=(specialHandle||handleObj.handler).apply(matched.elem,args);if(ret!==undefined){event.result=ret;if(ret===false){event.preventDefault();event.stopPropagation();}}}}}
return event.result;},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(event,original){if(event.which==null){event.which=original.charCode!=null?original.charCode:original.keyCode;}
return event;}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement wheelDelta".split(" "),filter:function(event,original){var eventDoc,doc,body,button=original.button,fromElement=original.fromElement;if(event.pageX==null&&original.clientX!=null){eventDoc=event.target.ownerDocument||document;doc=eventDoc.documentElement;body=eventDoc.body;event.pageX=original.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc&&doc.clientLeft||body&&body.clientLeft||0);event.pageY=original.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc&&doc.clientTop||body&&body.clientTop||0);}
if(!event.relatedTarget&&fromElement){event.relatedTarget=fromElement===event.target?original.toElement:fromElement;}
if(!event.which&&button!==undefined){event.which=(button&1?1:(button&2?3:(button&4?2:0)));}
return event;}},fix:function(event){if(event[jQuery.expando]){return event;}
var i,prop,originalEvent=event,fixHook=jQuery.event.fixHooks[event.type]||{},copy=fixHook.props?this.props.concat(fixHook.props):this.props;event=jQuery.Event(originalEvent);for(i=copy.length;i;){prop=copy[--i];event[prop]=originalEvent[prop];}
if(!event.target){event.target=originalEvent.srcElement||document;}
if(event.target.nodeType===3){event.target=event.target.parentNode;}
if(event.metaKey===undefined){event.metaKey=event.ctrlKey;}
return fixHook.filter?fixHook.filter(event,originalEvent):event;},special:{ready:{setup:jQuery.bindReady},focus:{delegateType:"focusin",noBubble:true},blur:{delegateType:"focusout",noBubble:true},beforeunload:{setup:function(data,namespaces,eventHandle){if(jQuery.isWindow(this)){this.onbeforeunload=eventHandle;}},teardown:function(namespaces,eventHandle){if(this.onbeforeunload===eventHandle){this.onbeforeunload=null;}}}},simulate:function(type,elem,event,bubble){var e=jQuery.extend(new jQuery.Event(),event,{type:type,isSimulated:true,originalEvent:{}});if(bubble){jQuery.event.trigger(e,null,elem);}else{jQuery.event.dispatch.call(elem,e);}
if(e.isDefaultPrevented()){event.preventDefault();}}};jQuery.event.handle=jQuery.event.dispatch;jQuery.removeEvent=document.removeEventListener?function(elem,type,handle){if(elem.removeEventListener){elem.removeEventListener(type,handle,false);}}:function(elem,type,handle){if(elem.detachEvent){elem.detachEvent("on"+type,handle);}};jQuery.Event=function(src,props){if(!(this instanceof jQuery.Event)){return new jQuery.Event(src,props);}
if(src&&src.type){this.originalEvent=src;this.type=src.type;this.isDefaultPrevented=(src.defaultPrevented||src.returnValue===false||src.getPreventDefault&&src.getPreventDefault())?returnTrue:returnFalse;}else{this.type=src;}
if(props){jQuery.extend(this,props);}
this.timeStamp=src&&src.timeStamp||jQuery.now();this[jQuery.expando]=true;};function returnFalse(){return false;}
function returnTrue(){return true;}
jQuery.Event.prototype={preventDefault:function(){this.isDefaultPrevented=returnTrue;var e=this.originalEvent;if(!e){return;}
if(e.preventDefault){e.preventDefault();}else{e.returnValue=false;}},stopPropagation:function(){this.isPropagationStopped=returnTrue;var e=this.originalEvent;if(!e){return;}
if(e.stopPropagation){e.stopPropagation();}
e.cancelBubble=true;},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=returnTrue;this.stopPropagation();},isDefaultPrevented:returnFalse,isPropagationStopped:returnFalse,isImmediatePropagationStopped:returnFalse};jQuery.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(orig,fix){jQuery.event.special[orig]=jQuery.event.special[fix]={delegateType:fix,bindType:fix,handle:function(event){var target=this,related=event.relatedTarget,handleObj=event.handleObj,selector=handleObj.selector,oldType,ret;if(!related||handleObj.origType===event.type||(related!==target&&!jQuery.contains(target,related))){oldType=event.type;event.type=handleObj.origType;ret=handleObj.handler.apply(this,arguments);event.type=oldType;}
return ret;}};});if(!jQuery.support.submitBubbles){jQuery.event.special.submit={setup:function(){if(jQuery.nodeName(this,"form")){return false;}
jQuery.event.add(this,"click._submit keypress._submit",function(e){var elem=e.target,form=jQuery.nodeName(elem,"input")||jQuery.nodeName(elem,"button")?elem.form:undefined;if(form&&!form._submit_attached){jQuery.event.add(form,"submit._submit",function(event){if(this.parentNode){jQuery.event.simulate("submit",this.parentNode,event,true);}});form._submit_attached=true;}});},teardown:function(){if(jQuery.nodeName(this,"form")){return false;}
jQuery.event.remove(this,"._submit");}};}
if(!jQuery.support.changeBubbles){jQuery.event.special.change={setup:function(){if(rformElems.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio"){jQuery.event.add(this,"propertychange._change",function(event){if(event.originalEvent.propertyName==="checked"){this._just_changed=true;}});jQuery.event.add(this,"click._change",function(event){if(this._just_changed){this._just_changed=false;jQuery.event.simulate("change",this,event,true);}});}
return false;}
jQuery.event.add(this,"beforeactivate._change",function(e){var elem=e.target;if(rformElems.test(elem.nodeName)&&!elem._change_attached){jQuery.event.add(elem,"change._change",function(event){if(this.parentNode&&!event.isSimulated){jQuery.event.simulate("change",this.parentNode,event,true);}});elem._change_attached=true;}});},handle:function(event){var elem=event.target;if(this!==elem||event.isSimulated||event.isTrigger||(elem.type!=="radio"&&elem.type!=="checkbox")){return event.handleObj.handler.apply(this,arguments);}},teardown:function(){jQuery.event.remove(this,"._change");return rformElems.test(this.nodeName);}};}
if(!jQuery.support.focusinBubbles){jQuery.each({focus:"focusin",blur:"focusout"},function(orig,fix){var attaches=0,handler=function(event){jQuery.event.simulate(fix,event.target,jQuery.event.fix(event),true);};jQuery.event.special[fix]={setup:function(){if(attaches++===0){document.addEventListener(orig,handler,true);}},teardown:function(){if(--attaches===0){document.removeEventListener(orig,handler,true);}}};});}
jQuery.fn.extend({on:function(types,selector,data,fn,one){var origFn,type;if(typeof types==="object"){if(typeof selector!=="string"){data=selector;selector=undefined;}
for(type in types){this.on(type,selector,data,types[type],one);}
return this;}
if(data==null&&fn==null){fn=selector;data=selector=undefined;}else if(fn==null){if(typeof selector==="string"){fn=data;data=undefined;}else{fn=data;data=selector;selector=undefined;}}
if(fn===false){fn=returnFalse;}else if(!fn){return this;}
if(one===1){origFn=fn;fn=function(event){jQuery().off(event);return origFn.apply(this,arguments);};fn.guid=origFn.guid||(origFn.guid=jQuery.guid++);}
return this.each(function(){jQuery.event.add(this,types,fn,data,selector);});},one:function(types,selector,data,fn){return this.on.call(this,types,selector,data,fn,1);},off:function(types,selector,fn){if(types&&types.preventDefault&&types.handleObj){var handleObj=types.handleObj;jQuery(types.delegateTarget).off(handleObj.namespace?handleObj.type+"."+handleObj.namespace:handleObj.type,handleObj.selector,handleObj.handler);return this;}
if(typeof types==="object"){for(var type in types){this.off(type,selector,types[type]);}
return this;}
if(selector===false||typeof selector==="function"){fn=selector;selector=undefined;}
if(fn===false){fn=returnFalse;}
return this.each(function(){jQuery.event.remove(this,types,fn,selector);});},bind:function(types,data,fn){return this.on(types,null,data,fn);},unbind:function(types,fn){return this.off(types,null,fn);},live:function(types,data,fn){jQuery(this.context).on(types,this.selector,data,fn);return this;},die:function(types,fn){jQuery(this.context).off(types,this.selector||"**",fn);return this;},delegate:function(selector,types,data,fn){return this.on(types,selector,data,fn);},undelegate:function(selector,types,fn){return arguments.length==1?this.off(selector,"**"):this.off(types,selector,fn);},trigger:function(type,data){return this.each(function(){jQuery.event.trigger(type,data,this);});},triggerHandler:function(type,data){if(this[0]){return jQuery.event.trigger(type,data,this[0],true);}},toggle:function(fn){var args=arguments,guid=fn.guid||jQuery.guid++,i=0,toggler=function(event){var lastToggle=(jQuery._data(this,"lastToggle"+fn.guid)||0)%i;jQuery._data(this,"lastToggle"+fn.guid,lastToggle+1);event.preventDefault();return args[lastToggle].apply(this,arguments)||false;};toggler.guid=guid;while(i<args.length){args[i++].guid=guid;}
return this.click(toggler);},hover:function(fnOver,fnOut){return this.mouseenter(fnOver).mouseleave(fnOut||fnOver);}});jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick "+"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave "+"change select submit keydown keypress keyup error contextmenu").split(" "),function(i,name){jQuery.fn[name]=function(data,fn){if(fn==null){fn=data;data=null;}
return arguments.length>0?this.bind(name,data,fn):this.trigger(name);};if(jQuery.attrFn){jQuery.attrFn[name]=true;}
if(rkeyEvent.test(name)){jQuery.event.fixHooks[name]=jQuery.event.keyHooks;}
if(rmouseEvent.test(name)){jQuery.event.fixHooks[name]=jQuery.event.mouseHooks;}});(function(){var chunker=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,expando="sizcache"+(Math.random()+'').replace('.',''),done=0,toString=Object.prototype.toString,hasDuplicate=false,baseHasDuplicate=true,rBackslash=/\\/g,rReturn=/\r\n/g,rNonWord=/\W/;[0,0].sort(function(){baseHasDuplicate=false;return 0;});var Sizzle=function(selector,context,results,seed){results=results||[];context=context||document;var origContext=context;if(context.nodeType!==1&&context.nodeType!==9){return[];}
if(!selector||typeof selector!=="string"){return results;}
var m,set,checkSet,extra,ret,cur,pop,i,prune=true,contextXML=Sizzle.isXML(context),parts=[],soFar=selector;do{chunker.exec("");m=chunker.exec(soFar);if(m){soFar=m[3];parts.push(m[1]);if(m[2]){extra=m[3];break;}}}while(m);if(parts.length>1&&origPOS.exec(selector)){if(parts.length===2&&Expr.relative[parts[0]]){set=posProcess(parts[0]+parts[1],context,seed);}else{set=Expr.relative[parts[0]]?[context]:Sizzle(parts.shift(),context);while(parts.length){selector=parts.shift();if(Expr.relative[selector]){selector+=parts.shift();}
set=posProcess(selector,set,seed);}}}else{if(!seed&&parts.length>1&&context.nodeType===9&&!contextXML&&Expr.match.ID.test(parts[0])&&!Expr.match.ID.test(parts[parts.length-1])){ret=Sizzle.find(parts.shift(),context,contextXML);context=ret.expr?Sizzle.filter(ret.expr,ret.set)[0]:ret.set[0];}
if(context){ret=seed?{expr:parts.pop(),set:makeArray(seed)}:Sizzle.find(parts.pop(),parts.length===1&&(parts[0]==="~"||parts[0]==="+")&&context.parentNode?context.parentNode:context,contextXML);set=ret.expr?Sizzle.filter(ret.expr,ret.set):ret.set;if(parts.length>0){checkSet=makeArray(set);}else{prune=false;}
while(parts.length){cur=parts.pop();pop=cur;if(!Expr.relative[cur]){cur="";}else{pop=parts.pop();}
if(pop==null){pop=context;}
Expr.relative[cur](checkSet,pop,contextXML);}}else{checkSet=parts=[];}}
if(!checkSet){checkSet=set;}
if(!checkSet){Sizzle.error(cur||selector);}
if(toString.call(checkSet)==="[object Array]"){if(!prune){results.push.apply(results,checkSet);}else if(context&&context.nodeType===1){for(i=0;checkSet[i]!=null;i++){if(checkSet[i]&&(checkSet[i]===true||checkSet[i].nodeType===1&&Sizzle.contains(context,checkSet[i]))){results.push(set[i]);}}}else{for(i=0;checkSet[i]!=null;i++){if(checkSet[i]&&checkSet[i].nodeType===1){results.push(set[i]);}}}}else{makeArray(checkSet,results);}
if(extra){Sizzle(extra,origContext,results,seed);Sizzle.uniqueSort(results);}
return results;};Sizzle.uniqueSort=function(results){if(sortOrder){hasDuplicate=baseHasDuplicate;results.sort(sortOrder);if(hasDuplicate){for(var i=1;i<results.length;i++){if(results[i]===results[i-1]){results.splice(i--,1);}}}}
return results;};Sizzle.matches=function(expr,set){return Sizzle(expr,null,null,set);};Sizzle.matchesSelector=function(node,expr){return Sizzle(expr,null,null,[node]).length>0;};Sizzle.find=function(expr,context,isXML){var set,i,len,match,type,left;if(!expr){return[];}
for(i=0,len=Expr.order.length;i<len;i++){type=Expr.order[i];if((match=Expr.leftMatch[type].exec(expr))){left=match[1];match.splice(1,1);if(left.substr(left.length-1)!=="\\"){match[1]=(match[1]||"").replace(rBackslash,"");set=Expr.find[type](match,context,isXML);if(set!=null){expr=expr.replace(Expr.match[type],"");break;}}}}
if(!set){set=typeof context.getElementsByTagName!=="undefined"?context.getElementsByTagName("*"):[];}
return{set:set,expr:expr};};Sizzle.filter=function(expr,set,inplace,not){var match,anyFound,type,found,item,filter,left,i,pass,old=expr,result=[],curLoop=set,isXMLFilter=set&&set[0]&&Sizzle.isXML(set[0]);while(expr&&set.length){for(type in Expr.filter){if((match=Expr.leftMatch[type].exec(expr))!=null&&match[2]){filter=Expr.filter[type];left=match[1];anyFound=false;match.splice(1,1);if(left.substr(left.length-1)==="\\"){continue;}
if(curLoop===result){result=[];}
if(Expr.preFilter[type]){match=Expr.preFilter[type](match,curLoop,inplace,result,not,isXMLFilter);if(!match){anyFound=found=true;}else if(match===true){continue;}}
if(match){for(i=0;(item=curLoop[i])!=null;i++){if(item){found=filter(item,match,i,curLoop);pass=not^found;if(inplace&&found!=null){if(pass){anyFound=true;}else{curLoop[i]=false;}}else if(pass){result.push(item);anyFound=true;}}}}
if(found!==undefined){if(!inplace){curLoop=result;}
expr=expr.replace(Expr.match[type],"");if(!anyFound){return[];}
break;}}}
if(expr===old){if(anyFound==null){Sizzle.error(expr);}else{break;}}
old=expr;}
return curLoop;};Sizzle.error=function(msg){throw"Syntax error, unrecognized expression: "+msg;};var getText=Sizzle.getText=function(elem){var i,node,nodeType=elem.nodeType,ret="";if(nodeType){if(nodeType===1){if(typeof elem.textContent==='string'){return elem.textContent;}else if(typeof elem.innerText==='string'){return elem.innerText.replace(rReturn,'');}else{for(elem=elem.firstChild;elem;elem=elem.nextSibling){ret+=getText(elem);}}}else if(nodeType===3||nodeType===4){return elem.nodeValue;}}else{for(i=0;(node=elem[i]);i++){if(node.nodeType!==8){ret+=getText(node);}}}
return ret;};var Expr=Sizzle.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(elem){return elem.getAttribute("href");},type:function(elem){return elem.getAttribute("type");}},relative:{"+":function(checkSet,part){var isPartStr=typeof part==="string",isTag=isPartStr&&!rNonWord.test(part),isPartStrNotTag=isPartStr&&!isTag;if(isTag){part=part.toLowerCase();}
for(var i=0,l=checkSet.length,elem;i<l;i++){if((elem=checkSet[i])){while((elem=elem.previousSibling)&&elem.nodeType!==1){}
checkSet[i]=isPartStrNotTag||elem&&elem.nodeName.toLowerCase()===part?elem||false:elem===part;}}
if(isPartStrNotTag){Sizzle.filter(part,checkSet,true);}},">":function(checkSet,part){var elem,isPartStr=typeof part==="string",i=0,l=checkSet.length;if(isPartStr&&!rNonWord.test(part)){part=part.toLowerCase();for(;i<l;i++){elem=checkSet[i];if(elem){var parent=elem.parentNode;checkSet[i]=parent.nodeName.toLowerCase()===part?parent:false;}}}else{for(;i<l;i++){elem=checkSet[i];if(elem){checkSet[i]=isPartStr?elem.parentNode:elem.parentNode===part;}}
if(isPartStr){Sizzle.filter(part,checkSet,true);}}},"":function(checkSet,part,isXML){var nodeCheck,doneName=done++,checkFn=dirCheck;if(typeof part==="string"&&!rNonWord.test(part)){part=part.toLowerCase();nodeCheck=part;checkFn=dirNodeCheck;}
checkFn("parentNode",part,doneName,checkSet,nodeCheck,isXML);},"~":function(checkSet,part,isXML){var nodeCheck,doneName=done++,checkFn=dirCheck;if(typeof part==="string"&&!rNonWord.test(part)){part=part.toLowerCase();nodeCheck=part;checkFn=dirNodeCheck;}
checkFn("previousSibling",part,doneName,checkSet,nodeCheck,isXML);}},find:{ID:function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);return m&&m.parentNode?[m]:[];}},NAME:function(match,context){if(typeof context.getElementsByName!=="undefined"){var ret=[],results=context.getElementsByName(match[1]);for(var i=0,l=results.length;i<l;i++){if(results[i].getAttribute("name")===match[1]){ret.push(results[i]);}}
return ret.length===0?null:ret;}},TAG:function(match,context){if(typeof context.getElementsByTagName!=="undefined"){return context.getElementsByTagName(match[1]);}}},preFilter:{CLASS:function(match,curLoop,inplace,result,not,isXML){match=" "+match[1].replace(rBackslash,"")+" ";if(isXML){return match;}
for(var i=0,elem;(elem=curLoop[i])!=null;i++){if(elem){if(not^(elem.className&&(" "+elem.className+" ").replace(/[\t\n\r]/g," ").indexOf(match)>=0)){if(!inplace){result.push(elem);}}else if(inplace){curLoop[i]=false;}}}
return false;},ID:function(match){return match[1].replace(rBackslash,"");},TAG:function(match,curLoop){return match[1].replace(rBackslash,"").toLowerCase();},CHILD:function(match){if(match[1]==="nth"){if(!match[2]){Sizzle.error(match[0]);}
match[2]=match[2].replace(/^\+|\s*/g,'');var test=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(match[2]==="even"&&"2n"||match[2]==="odd"&&"2n+1"||!/\D/.test(match[2])&&"0n+"+match[2]||match[2]);match[2]=(test[1]+(test[2]||1))-0;match[3]=test[3]-0;}
else if(match[2]){Sizzle.error(match[0]);}
match[0]=done++;return match;},ATTR:function(match,curLoop,inplace,result,not,isXML){var name=match[1]=match[1].replace(rBackslash,"");if(!isXML&&Expr.attrMap[name]){match[1]=Expr.attrMap[name];}
match[4]=(match[4]||match[5]||"").replace(rBackslash,"");if(match[2]==="~="){match[4]=" "+match[4]+" ";}
return match;},PSEUDO:function(match,curLoop,inplace,result,not){if(match[1]==="not"){if((chunker.exec(match[3])||"").length>1||/^\w/.test(match[3])){match[3]=Sizzle(match[3],null,null,curLoop);}else{var ret=Sizzle.filter(match[3],curLoop,inplace,true^not);if(!inplace){result.push.apply(result,ret);}
return false;}}else if(Expr.match.POS.test(match[0])||Expr.match.CHILD.test(match[0])){return true;}
return match;},POS:function(match){match.unshift(true);return match;}},filters:{enabled:function(elem){return elem.disabled===false&&elem.type!=="hidden";},disabled:function(elem){return elem.disabled===true;},checked:function(elem){return elem.checked===true;},selected:function(elem){if(elem.parentNode){elem.parentNode.selectedIndex;}
return elem.selected===true;},parent:function(elem){return!!elem.firstChild;},empty:function(elem){return!elem.firstChild;},has:function(elem,i,match){return!!Sizzle(match[3],elem).length;},header:function(elem){return(/h\d/i).test(elem.nodeName);},text:function(elem){var attr=elem.getAttribute("type"),type=elem.type;return elem.nodeName.toLowerCase()==="input"&&"text"===type&&(attr===type||attr===null);},radio:function(elem){return elem.nodeName.toLowerCase()==="input"&&"radio"===elem.type;},checkbox:function(elem){return elem.nodeName.toLowerCase()==="input"&&"checkbox"===elem.type;},file:function(elem){return elem.nodeName.toLowerCase()==="input"&&"file"===elem.type;},password:function(elem){return elem.nodeName.toLowerCase()==="input"&&"password"===elem.type;},submit:function(elem){var name=elem.nodeName.toLowerCase();return(name==="input"||name==="button")&&"submit"===elem.type;},image:function(elem){return elem.nodeName.toLowerCase()==="input"&&"image"===elem.type;},reset:function(elem){var name=elem.nodeName.toLowerCase();return(name==="input"||name==="button")&&"reset"===elem.type;},button:function(elem){var name=elem.nodeName.toLowerCase();return name==="input"&&"button"===elem.type||name==="button";},input:function(elem){return(/input|select|textarea|button/i).test(elem.nodeName);},focus:function(elem){return elem===elem.ownerDocument.activeElement;}},setFilters:{first:function(elem,i){return i===0;},last:function(elem,i,match,array){return i===array.length-1;},even:function(elem,i){return i%2===0;},odd:function(elem,i){return i%2===1;},lt:function(elem,i,match){return i<match[3]-0;},gt:function(elem,i,match){return i>match[3]-0;},nth:function(elem,i,match){return match[3]-0===i;},eq:function(elem,i,match){return match[3]-0===i;}},filter:{PSEUDO:function(elem,match,i,array){var name=match[1],filter=Expr.filters[name];if(filter){return filter(elem,i,match,array);}else if(name==="contains"){return(elem.textContent||elem.innerText||getText([elem])||"").indexOf(match[3])>=0;}else if(name==="not"){var not=match[3];for(var j=0,l=not.length;j<l;j++){if(not[j]===elem){return false;}}
return true;}else{Sizzle.error(name);}},CHILD:function(elem,match){var first,last,doneName,parent,cache,count,diff,type=match[1],node=elem;switch(type){case"only":case"first":while((node=node.previousSibling)){if(node.nodeType===1){return false;}}
if(type==="first"){return true;}
node=elem;case"last":while((node=node.nextSibling)){if(node.nodeType===1){return false;}}
return true;case"nth":first=match[2];last=match[3];if(first===1&&last===0){return true;}
doneName=match[0];parent=elem.parentNode;if(parent&&(parent[expando]!==doneName||!elem.nodeIndex)){count=0;for(node=parent.firstChild;node;node=node.nextSibling){if(node.nodeType===1){node.nodeIndex=++count;}}
parent[expando]=doneName;}
diff=elem.nodeIndex-last;if(first===0){return diff===0;}else{return(diff%first===0&&diff/first>=0);}}},ID:function(elem,match){return elem.nodeType===1&&elem.getAttribute("id")===match;},TAG:function(elem,match){return(match==="*"&&elem.nodeType===1)||!!elem.nodeName&&elem.nodeName.toLowerCase()===match;},CLASS:function(elem,match){return(" "+(elem.className||elem.getAttribute("class"))+" ").indexOf(match)>-1;},ATTR:function(elem,match){var name=match[1],result=Sizzle.attr?Sizzle.attr(elem,name):Expr.attrHandle[name]?Expr.attrHandle[name](elem):elem[name]!=null?elem[name]:elem.getAttribute(name),value=result+"",type=match[2],check=match[4];return result==null?type==="!=":!type&&Sizzle.attr?result!=null:type==="="?value===check:type==="*="?value.indexOf(check)>=0:type==="~="?(" "+value+" ").indexOf(check)>=0:!check?value&&result!==false:type==="!="?value!==check:type==="^="?value.indexOf(check)===0:type==="$="?value.substr(value.length-check.length)===check:type==="|="?value===check||value.substr(0,check.length+1)===check+"-":false;},POS:function(elem,match,i,array){var name=match[2],filter=Expr.setFilters[name];if(filter){return filter(elem,i,match,array);}}}};var origPOS=Expr.match.POS,fescape=function(all,num){return"\\"+(num-0+1);};for(var type in Expr.match){Expr.match[type]=new RegExp(Expr.match[type].source+(/(?![^\[]*\])(?![^\(]*\))/.source));Expr.leftMatch[type]=new RegExp(/(^(?:.|\r|\n)*?)/.source+Expr.match[type].source.replace(/\\(\d+)/g,fescape));}
var makeArray=function(array,results){array=Array.prototype.slice.call(array,0);if(results){results.push.apply(results,array);return results;}
return array;};try{Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType;}catch(e){makeArray=function(array,results){var i=0,ret=results||[];if(toString.call(array)==="[object Array]"){Array.prototype.push.apply(ret,array);}else{if(typeof array.length==="number"){for(var l=array.length;i<l;i++){ret.push(array[i]);}}else{for(;array[i];i++){ret.push(array[i]);}}}
return ret;};}
var sortOrder,siblingCheck;if(document.documentElement.compareDocumentPosition){sortOrder=function(a,b){if(a===b){hasDuplicate=true;return 0;}
if(!a.compareDocumentPosition||!b.compareDocumentPosition){return a.compareDocumentPosition?-1:1;}
return a.compareDocumentPosition(b)&4?-1:1;};}else{sortOrder=function(a,b){if(a===b){hasDuplicate=true;return 0;}else if(a.sourceIndex&&b.sourceIndex){return a.sourceIndex-b.sourceIndex;}
var al,bl,ap=[],bp=[],aup=a.parentNode,bup=b.parentNode,cur=aup;if(aup===bup){return siblingCheck(a,b);}else if(!aup){return-1;}else if(!bup){return 1;}
while(cur){ap.unshift(cur);cur=cur.parentNode;}
cur=bup;while(cur){bp.unshift(cur);cur=cur.parentNode;}
al=ap.length;bl=bp.length;for(var i=0;i<al&&i<bl;i++){if(ap[i]!==bp[i]){return siblingCheck(ap[i],bp[i]);}}
return i===al?siblingCheck(a,bp[i],-1):siblingCheck(ap[i],b,1);};siblingCheck=function(a,b,ret){if(a===b){return ret;}
var cur=a.nextSibling;while(cur){if(cur===b){return-1;}
cur=cur.nextSibling;}
return 1;};}
(function(){var form=document.createElement("div"),id="script"+(new Date()).getTime(),root=document.documentElement;form.innerHTML="<a name='"+id+"'/>";root.insertBefore(form,root.firstChild);if(document.getElementById(id)){Expr.find.ID=function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);return m?m.id===match[1]||typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue===match[1]?[m]:undefined:[];}};Expr.filter.ID=function(elem,match){var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");return elem.nodeType===1&&node&&node.nodeValue===match;};}
root.removeChild(form);root=form=null;})();(function(){var div=document.createElement("div");div.appendChild(document.createComment(""));if(div.getElementsByTagName("*").length>0){Expr.find.TAG=function(match,context){var results=context.getElementsByTagName(match[1]);if(match[1]==="*"){var tmp=[];for(var i=0;results[i];i++){if(results[i].nodeType===1){tmp.push(results[i]);}}
results=tmp;}
return results;};}
div.innerHTML="<a href='#'></a>";if(div.firstChild&&typeof div.firstChild.getAttribute!=="undefined"&&div.firstChild.getAttribute("href")!=="#"){Expr.attrHandle.href=function(elem){return elem.getAttribute("href",2);};}
div=null;})();if(document.querySelectorAll){(function(){var oldSizzle=Sizzle,div=document.createElement("div"),id="__sizzle__";div.innerHTML="<p class='TEST'></p>";if(div.querySelectorAll&&div.querySelectorAll(".TEST").length===0){return;}
Sizzle=function(query,context,extra,seed){context=context||document;if(!seed&&!Sizzle.isXML(context)){var match=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(query);if(match&&(context.nodeType===1||context.nodeType===9)){if(match[1]){return makeArray(context.getElementsByTagName(query),extra);}else if(match[2]&&Expr.find.CLASS&&context.getElementsByClassName){return makeArray(context.getElementsByClassName(match[2]),extra);}}
if(context.nodeType===9){if(query==="body"&&context.body){return makeArray([context.body],extra);}else if(match&&match[3]){var elem=context.getElementById(match[3]);if(elem&&elem.parentNode){if(elem.id===match[3]){return makeArray([elem],extra);}}else{return makeArray([],extra);}}
try{return makeArray(context.querySelectorAll(query),extra);}catch(qsaError){}}else if(context.nodeType===1&&context.nodeName.toLowerCase()!=="object"){var oldContext=context,old=context.getAttribute("id"),nid=old||id,hasParent=context.parentNode,relativeHierarchySelector=/^\s*[+~]/.test(query);if(!old){context.setAttribute("id",nid);}else{nid=nid.replace(/'/g,"\\$&");}
if(relativeHierarchySelector&&hasParent){context=context.parentNode;}
try{if(!relativeHierarchySelector||hasParent){return makeArray(context.querySelectorAll("[id='"+nid+"'] "+query),extra);}}catch(pseudoError){}finally{if(!old){oldContext.removeAttribute("id");}}}}
return oldSizzle(query,context,extra,seed);};for(var prop in oldSizzle){Sizzle[prop]=oldSizzle[prop];}
div=null;})();}
(function(){var html=document.documentElement,matches=html.matchesSelector||html.mozMatchesSelector||html.webkitMatchesSelector||html.msMatchesSelector;if(matches){var disconnectedMatch=!matches.call(document.createElement("div"),"div"),pseudoWorks=false;try{matches.call(document.documentElement,"[test!='']:sizzle");}catch(pseudoError){pseudoWorks=true;}
Sizzle.matchesSelector=function(node,expr){expr=expr.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!Sizzle.isXML(node)){try{if(pseudoWorks||!Expr.match.PSEUDO.test(expr)&&!/!=/.test(expr)){var ret=matches.call(node,expr);if(ret||!disconnectedMatch||node.document&&node.document.nodeType!==11){return ret;}}}catch(e){}}
return Sizzle(expr,null,null,[node]).length>0;};}})();(function(){var div=document.createElement("div");div.innerHTML="<div class='test e'></div><div class='test'></div>";if(!div.getElementsByClassName||div.getElementsByClassName("e").length===0){return;}
div.lastChild.className="e";if(div.getElementsByClassName("e").length===1){return;}
Expr.order.splice(1,0,"CLASS");Expr.find.CLASS=function(match,context,isXML){if(typeof context.getElementsByClassName!=="undefined"&&!isXML){return context.getElementsByClassName(match[1]);}};div=null;})();function dirNodeCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){var match=false;elem=elem[dir];while(elem){if(elem[expando]===doneName){match=checkSet[elem.sizset];break;}
if(elem.nodeType===1&&!isXML){elem[expando]=doneName;elem.sizset=i;}
if(elem.nodeName.toLowerCase()===cur){match=elem;break;}
elem=elem[dir];}
checkSet[i]=match;}}}
function dirCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){var match=false;elem=elem[dir];while(elem){if(elem[expando]===doneName){match=checkSet[elem.sizset];break;}
if(elem.nodeType===1){if(!isXML){elem[expando]=doneName;elem.sizset=i;}
if(typeof cur!=="string"){if(elem===cur){match=true;break;}}else if(Sizzle.filter(cur,[elem]).length>0){match=elem;break;}}
elem=elem[dir];}
checkSet[i]=match;}}}
if(document.documentElement.contains){Sizzle.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):true);};}else if(document.documentElement.compareDocumentPosition){Sizzle.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16);};}else{Sizzle.contains=function(){return false;};}
Sizzle.isXML=function(elem){var documentElement=(elem?elem.ownerDocument||elem:0).documentElement;return documentElement?documentElement.nodeName!=="HTML":false;};var posProcess=function(selector,context,seed){var match,tmpSet=[],later="",root=context.nodeType?[context]:context;while((match=Expr.match.PSEUDO.exec(selector))){later+=match[0];selector=selector.replace(Expr.match.PSEUDO,"");}
selector=Expr.relative[selector]?selector+"*":selector;for(var i=0,l=root.length;i<l;i++){Sizzle(selector,root[i],tmpSet,seed);}
return Sizzle.filter(later,tmpSet);};Sizzle.attr=jQuery.attr;Sizzle.selectors.attrMap={};jQuery.find=Sizzle;jQuery.expr=Sizzle.selectors;jQuery.expr[":"]=jQuery.expr.filters;jQuery.unique=Sizzle.uniqueSort;jQuery.jtext=Sizzle.getText;jQuery.isXMLDoc=Sizzle.isXML;jQuery.contains=Sizzle.contains;})();var runtil=/Until$/,rparentsprev=/^(?:parents|prevUntil|prevAll)/,rmultiselector=/,/,isSimple=/^.[^:#\[\.,]*$/,slice=Array.prototype.slice,POS=jQuery.expr.match.POS,guaranteedUnique={children:true,contents:true,next:true,prev:true};jQuery.fn.extend({find:function(selector){var self=this,i,l;if(typeof selector!=="string"){return jQuery(selector).filter(function(){for(i=0,l=self.length;i<l;i++){if(jQuery.contains(self[i],this)){return true;}}});}
var ret=this.pushStack("","find",selector),length,n,r;for(i=0,l=this.length;i<l;i++){length=ret.length;jQuery.find(selector,this[i],ret);if(i>0){for(n=length;n<ret.length;n++){for(r=0;r<length;r++){if(ret[r]===ret[n]){ret.splice(n--,1);break;}}}}}
return ret;},has:function(target){var targets=jQuery(target);return this.filter(function(){for(var i=0,l=targets.length;i<l;i++){if(jQuery.contains(this,targets[i])){return true;}}});},not:function(selector){return this.pushStack(winnow(this,selector,false),"not",selector);},filter:function(selector){return this.pushStack(winnow(this,selector,true),"filter",selector);},is:function(selector){return!!selector&&(typeof selector==="string"?POS.test(selector)?jQuery(selector,this.context).index(this[0])>=0:jQuery.filter(selector,this).length>0:this.filter(selector).length>0);},closest:function(selectors,context){var ret=[],i,l,cur=this[0];if(jQuery.isArray(selectors)){var level=1;while(cur&&cur.ownerDocument&&cur!==context){for(i=0;i<selectors.length;i++){if(jQuery(cur).is(selectors[i])){ret.push({selector:selectors[i],elem:cur,level:level});}}
cur=cur.parentNode;level++;}
return ret;}
var pos=POS.test(selectors)||typeof selectors!=="string"?jQuery(selectors,context||this.context):0;for(i=0,l=this.length;i<l;i++){cur=this[i];while(cur){if(pos?pos.index(cur)>-1:jQuery.find.matchesSelector(cur,selectors)){ret.push(cur);break;}else{cur=cur.parentNode;if(!cur||!cur.ownerDocument||cur===context||cur.nodeType===11){break;}}}}
ret=ret.length>1?jQuery.unique(ret):ret;return this.pushStack(ret,"closest",selectors);},index:function(elem){if(!elem){return(this[0]&&this[0].parentNode)?this.prevAll().length:-1;}
if(typeof elem==="string"){return jQuery.inArray(this[0],jQuery(elem));}
return jQuery.inArray(elem.jquery?elem[0]:elem,this);},add:function(selector,context){var set=typeof selector==="string"?jQuery(selector,context):jQuery.makeArray(selector&&selector.nodeType?[selector]:selector),all=jQuery.merge(this.get(),set);return this.pushStack(isDisconnected(set[0])||isDisconnected(all[0])?all:jQuery.unique(all));},andSelf:function(){return this.add(this.prevObject);}});function isDisconnected(node){return!node||!node.parentNode||node.parentNode.nodeType===11;}
jQuery.each({parent:function(elem){var parent=elem.parentNode;return parent&&parent.nodeType!==11?parent:null;},parents:function(elem){return jQuery.dir(elem,"parentNode");},parentsUntil:function(elem,i,until){return jQuery.dir(elem,"parentNode",until);},next:function(elem){return jQuery.nth(elem,2,"nextSibling");},prev:function(elem){return jQuery.nth(elem,2,"previousSibling");},nextAll:function(elem){return jQuery.dir(elem,"nextSibling");},prevAll:function(elem){return jQuery.dir(elem,"previousSibling");},nextUntil:function(elem,i,until){return jQuery.dir(elem,"nextSibling",until);},prevUntil:function(elem,i,until){return jQuery.dir(elem,"previousSibling",until);},siblings:function(elem){return jQuery.sibling(elem.parentNode.firstChild,elem);},children:function(elem){return jQuery.sibling(elem.firstChild);},contents:function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes);}},function(name,fn){jQuery.fn[name]=function(until,selector){var ret=jQuery.map(this,fn,until),args=slice.call(arguments);if(!runtil.test(name)){selector=until;}
if(selector&&typeof selector==="string"){ret=jQuery.filter(selector,ret);}
ret=this.length>1&&!guaranteedUnique[name]?jQuery.unique(ret):ret;if((this.length>1||rmultiselector.test(selector))&&rparentsprev.test(name)){ret=ret.reverse();}
return this.pushStack(ret,name,args.join(","));};});jQuery.extend({filter:function(expr,elems,not){if(not){expr=":not("+expr+")";}
return elems.length===1?jQuery.find.matchesSelector(elems[0],expr)?[elems[0]]:[]:jQuery.find.matches(expr,elems);},dir:function(elem,dir,until){var matched=[],cur=elem[dir];while(cur&&cur.nodeType!==9&&(until===undefined||cur.nodeType!==1||!jQuery(cur).is(until))){if(cur.nodeType===1){matched.push(cur);}
cur=cur[dir];}
return matched;},nth:function(cur,result,dir,elem){result=result||1;var num=0;for(;cur;cur=cur[dir]){if(cur.nodeType===1&&++num===result){break;}}
return cur;},sibling:function(n,elem){var r=[];for(;n;n=n.nextSibling){if(n.nodeType===1&&n!==elem){r.push(n);}}
return r;}});function winnow(elements,qualifier,keep){qualifier=qualifier||0;if(jQuery.isFunction(qualifier)){return jQuery.grep(elements,function(elem,i){var retVal=!!qualifier.call(elem,i,elem);return retVal===keep;});}else if(qualifier.nodeType){return jQuery.grep(elements,function(elem,i){return(elem===qualifier)===keep;});}else if(typeof qualifier==="string"){var filtered=jQuery.grep(elements,function(elem){return elem.nodeType===1;});if(isSimple.test(qualifier)){return jQuery.filter(qualifier,filtered,!keep);}else{qualifier=jQuery.filter(qualifier,filtered);}}
return jQuery.grep(elements,function(elem,i){return(jQuery.inArray(elem,qualifier)>=0)===keep;});}
function createSafeFragment(document){var list=nodeNames.split(" "),safeFrag=document.createDocumentFragment();if(safeFrag.createElement){while(list.length){safeFrag.createElement(list.pop());}}
return safeFrag;}
var nodeNames="abbr article aside audio canvas datalist details figcaption figure footer "+"header hgroup mark meter nav output progress section summary time video",rinlinejQuery=/ jQuery\d+="(?:\d+|null)"/g,rleadingWhitespace=/^\s+/,rxhtmlTag=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,rtagName=/<([\w:]+)/,rtbody=/<tbody/i,rhtml=/<|&#?\w+;/,rnoInnerhtml=/<(?:script|style)/i,rnocache=/<(?:script|object|embed|option|style)/i,rnoshimcache=new RegExp("<(?:"+nodeNames.replace(" ","|")+")","i"),rchecked=/checked\s*(?:[^=]|=\s*.checked.)/i,rscriptType=/\/(java|ecma)script/i,rcleanScript=/^\s*<!(?:\[CDATA\[|\-\-)/,wrapMap={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},safeFragment=createSafeFragment(document);wrapMap.optgroup=wrapMap.option;wrapMap.tbody=wrapMap.tfoot=wrapMap.colgroup=wrapMap.caption=wrapMap.thead;wrapMap.th=wrapMap.td;if(!jQuery.support.htmlSerialize){wrapMap._default=[1,"div<div>","</div>"];}
jQuery.fn.extend({text:function(text){if(jQuery.isFunction(text)){return this.each(function(i){var self=jQuery(this);self.text(text.call(this,i,self.text()));});}
if(typeof text!=="object"&&text!==undefined){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(text));}
return jQuery.jtext(this);},wrapAll:function(html){if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapAll(html.call(this,i));});}
if(this[0]){var wrap=jQuery(html,this[0].ownerDocument).eq(0).clone(true);if(this[0].parentNode){wrap.insertBefore(this[0]);}
wrap.map(function(){var elem=this;while(elem.firstChild&&elem.firstChild.nodeType===1){elem=elem.firstChild;}
return elem;}).append(this);}
return this;},wrapInner:function(html){if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapInner(html.call(this,i));});}
return this.each(function(){var self=jQuery(this),contents=self.contents();if(contents.length){contents.wrapAll(html);}else{self.append(html);}});},wrap:function(html){return this.each(function(){jQuery(this).wrapAll(html);});},unwrap:function(){return this.parent().each(function(){if(!jQuery.nodeName(this,"body")){jQuery(this).replaceWith(this.childNodes);}}).end();},append:function(){return this.domManip(arguments,true,function(elem){if(this.nodeType===1){this.appendChild(elem);}});},prepend:function(){return this.domManip(arguments,true,function(elem){if(this.nodeType===1){this.insertBefore(elem,this.firstChild);}});},before:function(){if(this[0]&&this[0].parentNode){return this.domManip(arguments,false,function(elem){this.parentNode.insertBefore(elem,this);});}else if(arguments.length){var set=jQuery(arguments[0]);set.push.apply(set,this.toArray());return this.pushStack(set,"before",arguments);}},after:function(){if(this[0]&&this[0].parentNode){return this.domManip(arguments,false,function(elem){this.parentNode.insertBefore(elem,this.nextSibling);});}else if(arguments.length){var set=this.pushStack(this,"after",arguments);set.push.apply(set,jQuery(arguments[0]).toArray());return set;}},remove:function(selector,keepData){for(var i=0,elem;(elem=this[i])!=null;i++){if(!selector||jQuery.filter(selector,[elem]).length){if(!keepData&&elem.nodeType===1){jQuery.cleanData(elem.getElementsByTagName("*"));jQuery.cleanData([elem]);}
if(elem.parentNode){elem.parentNode.removeChild(elem);}}}
return this;},empty:function(){for(var i=0,elem;(elem=this[i])!=null;i++){if(elem.nodeType===1){jQuery.cleanData(elem.getElementsByTagName("*"));}
while(elem.firstChild){elem.removeChild(elem.firstChild);}}
return this;},clone:function(dataAndEvents,deepDataAndEvents){dataAndEvents=dataAndEvents==null?false:dataAndEvents;deepDataAndEvents=deepDataAndEvents==null?dataAndEvents:deepDataAndEvents;return this.map(function(){return jQuery.clone(this,dataAndEvents,deepDataAndEvents);});},html:function(value){if(value===undefined){return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(rinlinejQuery,""):null;}else if(typeof value==="string"&&!rnoInnerhtml.test(value)&&(jQuery.support.leadingWhitespace||!rleadingWhitespace.test(value))&&!wrapMap[(rtagName.exec(value)||["",""])[1].toLowerCase()]){value=value.replace(rxhtmlTag,"<$1></$2>");try{for(var i=0,l=this.length;i<l;i++){if(this[i].nodeType===1){jQuery.cleanData(this[i].getElementsByTagName("*"));this[i].innerHTML=value;}}}catch(e){this.empty().append(value);}}else if(jQuery.isFunction(value)){this.each(function(i){var self=jQuery(this);self.html(value.call(this,i,self.html()));});}else{this.empty().append(value);}
return this;},replaceWith:function(value){if(this[0]&&this[0].parentNode){if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this),old=self.html();self.replaceWith(value.call(this,i,old));});}
if(typeof value!=="string"){value=jQuery(value).detach();}
return this.each(function(){var next=this.nextSibling,parent=this.parentNode;jQuery(this).remove();if(next){jQuery(next).before(value);}else{jQuery(parent).append(value);}});}else{return this.length?this.pushStack(jQuery(jQuery.isFunction(value)?value():value),"replaceWith",value):this;}},detach:function(selector){return this.remove(selector,true);},domManip:function(args,table,callback){var results,first,fragment,parent,value=args[0],scripts=[];if(!jQuery.support.checkClone&&arguments.length===3&&typeof value==="string"&&rchecked.test(value)){return this.each(function(){jQuery(this).domManip(args,table,callback,true);});}
if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this);args[0]=value.call(this,i,table?self.html():undefined);self.domManip(args,table,callback);});}
if(this[0]){parent=value&&value.parentNode;if(jQuery.support.parentNode&&parent&&parent.nodeType===11&&parent.childNodes.length===this.length){results={fragment:parent};}else{results=jQuery.buildFragment(args,this,scripts);}
fragment=results.fragment;if(fragment.childNodes.length===1){first=fragment=fragment.firstChild;}else{first=fragment.firstChild;}
if(first){table=table&&jQuery.nodeName(first,"tr");for(var i=0,l=this.length,lastIndex=l-1;i<l;i++){callback.call(table?root(this[i],first):this[i],results.cacheable||(l>1&&i<lastIndex)?jQuery.clone(fragment,true,true):fragment);}}
if(scripts.length){jQuery.each(scripts,evalScript);}}
return this;}});function root(elem,cur){return jQuery.nodeName(elem,"table")?(elem.getElementsByTagName("tbody")[0]||elem.appendChild(elem.ownerDocument.createElement("tbody"))):elem;}
function cloneCopyEvent(src,dest){if(dest.nodeType!==1||!jQuery.hasData(src)){return;}
var type,i,l,oldData=jQuery._data(src),curData=jQuery._data(dest,oldData),events=oldData.events;if(events){delete curData.handle;curData.events={};for(type in events){for(i=0,l=events[type].length;i<l;i++){jQuery.event.add(dest,type+(events[type][i].namespace?".":"")+events[type][i].namespace,events[type][i],events[type][i].data);}}}
if(curData.data){curData.data=jQuery.extend({},curData.data);}}
function cloneFixAttributes(src,dest){var nodeName;if(dest.nodeType!==1){return;}
if(dest.clearAttributes){dest.clearAttributes();}
if(dest.mergeAttributes){dest.mergeAttributes(src);}
nodeName=dest.nodeName.toLowerCase();if(nodeName==="object"){dest.outerHTML=src.outerHTML;}else if(nodeName==="input"&&(src.type==="checkbox"||src.type==="radio")){if(src.checked){dest.defaultChecked=dest.checked=src.checked;}
if(dest.value!==src.value){dest.value=src.value;}}else if(nodeName==="option"){dest.selected=src.defaultSelected;}else if(nodeName==="input"||nodeName==="textarea"){dest.defaultValue=src.defaultValue;}
dest.removeAttribute(jQuery.expando);}
jQuery.buildFragment=function(args,nodes,scripts){var fragment,cacheable,cacheresults,doc,first=args[0];if(nodes&&nodes[0]){doc=nodes[0].ownerDocument||nodes[0];}
if(!doc.createDocumentFragment){doc=document;}
if(args.length===1&&typeof first==="string"&&first.length<512&&doc===document&&first.charAt(0)==="<"&&!rnocache.test(first)&&(jQuery.support.checkClone||!rchecked.test(first))&&(!jQuery.support.unknownElems&&rnoshimcache.test(first))){cacheable=true;cacheresults=jQuery.fragments[first];if(cacheresults&&cacheresults!==1){fragment=cacheresults;}}
if(!fragment){fragment=doc.createDocumentFragment();jQuery.clean(args,doc,fragment,scripts);}
if(cacheable){jQuery.fragments[first]=cacheresults?fragment:1;}
return{fragment:fragment,cacheable:cacheable};};jQuery.fragments={};jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(selector){var ret=[],insert=jQuery(selector),parent=this.length===1&&this[0].parentNode;if(parent&&parent.nodeType===11&&parent.childNodes.length===1&&insert.length===1){insert[original](this[0]);return this;}else{for(var i=0,l=insert.length;i<l;i++){var elems=(i>0?this.clone(true):this).get();jQuery(insert[i])[original](elems);ret=ret.concat(elems);}
return this.pushStack(ret,name,insert.selector);}};});function getAll(elem){if(typeof elem.getElementsByTagName!=="undefined"){return elem.getElementsByTagName("*");}else if(typeof elem.querySelectorAll!=="undefined"){return elem.querySelectorAll("*");}else{return[];}}
function fixDefaultChecked(elem){if(elem.type==="checkbox"||elem.type==="radio"){elem.defaultChecked=elem.checked;}}
function findInputs(elem){var nodeName=(elem.nodeName||"").toLowerCase();if(nodeName==="input"){fixDefaultChecked(elem);}else if(nodeName!=="script"&&typeof elem.getElementsByTagName!=="undefined"){jQuery.grep(elem.getElementsByTagName("input"),fixDefaultChecked);}}
jQuery.extend({clone:function(elem,dataAndEvents,deepDataAndEvents){var clone=elem.cloneNode(true),srcElements,destElements,i;if((!jQuery.support.noCloneEvent||!jQuery.support.noCloneChecked)&&(elem.nodeType===1||elem.nodeType===11)&&!jQuery.isXMLDoc(elem)){cloneFixAttributes(elem,clone);srcElements=getAll(elem);destElements=getAll(clone);for(i=0;srcElements[i];++i){if(destElements[i]){cloneFixAttributes(srcElements[i],destElements[i]);}}}
if(dataAndEvents){cloneCopyEvent(elem,clone);if(deepDataAndEvents){srcElements=getAll(elem);destElements=getAll(clone);for(i=0;srcElements[i];++i){cloneCopyEvent(srcElements[i],destElements[i]);}}}
srcElements=destElements=null;return clone;},clean:function(elems,context,fragment,scripts){var checkScriptType;context=context||document;if(typeof context.createElement==="undefined"){context=context.ownerDocument||context[0]&&context[0].ownerDocument||document;}
var ret=[],j;for(var i=0,elem;(elem=elems[i])!=null;i++){if(typeof elem==="number"){elem+="";}
if(!elem){continue;}
if(typeof elem==="string"){if(!rhtml.test(elem)){elem=context.createTextNode(elem);}else{elem=elem.replace(rxhtmlTag,"<$1></$2>");var tag=(rtagName.exec(elem)||["",""])[1].toLowerCase(),wrap=wrapMap[tag]||wrapMap._default,depth=wrap[0],div=context.createElement("div");if(context===document){safeFragment.appendChild(div);}else{createSafeFragment(context).appendChild(div);}
div.innerHTML=wrap[1]+elem+wrap[2];while(depth--){div=div.lastChild;}
if(!jQuery.support.tbody){var hasBody=rtbody.test(elem),tbody=tag==="table"&&!hasBody?div.firstChild&&div.firstChild.childNodes:wrap[1]==="<table>"&&!hasBody?div.childNodes:[];for(j=tbody.length-1;j>=0;--j){if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length){tbody[j].parentNode.removeChild(tbody[j]);}}}
if(!jQuery.support.leadingWhitespace&&rleadingWhitespace.test(elem)){div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]),div.firstChild);}
elem=div.childNodes;}}
var len;if(!jQuery.support.appendChecked){if(elem[0]&&typeof(len=elem.length)==="number"){for(j=0;j<len;j++){findInputs(elem[j]);}}else{findInputs(elem);}}
if(elem.nodeType){ret.push(elem);}else{ret=jQuery.merge(ret,elem);}}
if(fragment){checkScriptType=function(elem){return!elem.type||rscriptType.test(elem.type);};for(i=0;ret[i];i++){if(scripts&&jQuery.nodeName(ret[i],"script")&&(!ret[i].type||ret[i].type.toLowerCase()==="text/javascript")){scripts.push(ret[i].parentNode?ret[i].parentNode.removeChild(ret[i]):ret[i]);}else{if(ret[i].nodeType===1){var jsTags=jQuery.grep(ret[i].getElementsByTagName("script"),checkScriptType);ret.splice.apply(ret,[i+1,0].concat(jsTags));}
fragment.appendChild(ret[i]);}}}
return ret;},cleanData:function(elems){var data,id,cache=jQuery.cache,special=jQuery.event.special,deleteExpando=jQuery.support.deleteExpando;for(var i=0,elem;(elem=elems[i])!=null;i++){if(elem.nodeName&&jQuery.noData[elem.nodeName.toLowerCase()]){continue;}
id=elem[jQuery.expando];if(id){data=cache[id];if(data&&data.events){for(var type in data.events){if(special[type]){jQuery.event.remove(elem,type);}else{jQuery.removeEvent(elem,type,data.handle);}}
if(data.handle){data.handle.elem=null;}}
if(deleteExpando){delete elem[jQuery.expando];}else if(elem.removeAttribute){elem.removeAttribute(jQuery.expando);}
delete cache[id];}}}});function evalScript(i,elem){if(elem.src){jQuery.ajax({url:elem.src,async:false,dataType:"script"});}else{jQuery.globalEval((elem.text||elem.textContent||elem.innerHTML||"").replace(rcleanScript,"/*$0*/"));}
if(elem.parentNode){elem.parentNode.removeChild(elem);}}
var ralpha=/alpha\([^)]*\)/i,ropacity=/opacity=([^)]*)/,rupper=/([A-Z]|^ms)/g,rnumpx=/^-?\d+(?:px)?$/i,rnum=/^-?\d/,rrelNum=/^([\-+])=([\-+.\de]+)/,cssShow={position:"absolute",visibility:"hidden",display:"block"},cssWidth=["Left","Right"],cssHeight=["Top","Bottom"],curCSS,getComputedStyle,currentStyle;jQuery.fn.css=function(name,value){if(arguments.length===2&&value===undefined){return this;}
return jQuery.access(this,name,value,true,function(elem,name,value){return value!==undefined?jQuery.style(elem,name,value):jQuery.css(elem,name);});};jQuery.extend({cssHooks:{opacity:{get:function(elem,computed){if(computed){var ret=curCSS(elem,"opacity","opacity");return ret===""?"1":ret;}else{return elem.style.opacity;}}}},cssNumber:{"fillOpacity":true,"fontWeight":true,"lineHeight":true,"opacity":true,"orphans":true,"widows":true,"zIndex":true,"zoom":true},cssProps:{"float":jQuery.support.cssFloat?"cssFloat":"styleFloat"},style:function(elem,name,value,extra){if(!elem||elem.nodeType===3||elem.nodeType===8||!elem.style){return;}
var ret,type,origName=jQuery.camelCase(name),style=elem.style,hooks=jQuery.cssHooks[origName];name=jQuery.cssProps[origName]||origName;if(value!==undefined){type=typeof value;if(type==="string"&&(ret=rrelNum.exec(value))){value=(+(ret[1]+1)*+ret[2])+parseFloat(jQuery.css(elem,name));type="number";}
if(value==null||type==="number"&&isNaN(value)){return;}
if(type==="number"&&!jQuery.cssNumber[origName]){value+="px";}
if(!hooks||!("set"in hooks)||(value=hooks.set(elem,value))!==undefined){try{style[name]=value;}catch(e){}}}else{if(hooks&&"get"in hooks&&(ret=hooks.get(elem,false,extra))!==undefined){return ret;}
return style[name];}},css:function(elem,name,extra){var ret,hooks;name=jQuery.camelCase(name);hooks=jQuery.cssHooks[name];name=jQuery.cssProps[name]||name;if(name==="cssFloat"){name="float";}
if(hooks&&"get"in hooks&&(ret=hooks.get(elem,true,extra))!==undefined){return ret;}else if(curCSS){return curCSS(elem,name);}},swap:function(elem,options,callback){var old={};for(var name in options){old[name]=elem.style[name];elem.style[name]=options[name];}
callback.call(elem);for(name in options){elem.style[name]=old[name];}}});jQuery.curCSS=jQuery.css;jQuery.each(["height","width"],function(i,name){jQuery.cssHooks[name]={get:function(elem,computed,extra){var val;if(computed){if(elem.offsetWidth!==0){return getWH(elem,name,extra);}else{jQuery.swap(elem,cssShow,function(){val=getWH(elem,name,extra);});}
return val;}},set:function(elem,value){if(rnumpx.test(value)){value=parseFloat(value);if(value>=0){return value+"px";}}else{return value;}}};});if(!jQuery.support.opacity){jQuery.cssHooks.opacity={get:function(elem,computed){return ropacity.test((computed&&elem.currentStyle?elem.currentStyle.filter:elem.style.filter)||"")?(parseFloat(RegExp.$1)/100)+"":computed?"1":"";},set:function(elem,value){var style=elem.style,currentStyle=elem.currentStyle,opacity=jQuery.isNumeric(value)?"alpha(opacity="+value*100+")":"",filter=currentStyle&&currentStyle.filter||style.filter||"";style.zoom=1;if(value>=1&&jQuery.trim(filter.replace(ralpha,""))===""){style.removeAttribute("filter");if(currentStyle&&!currentStyle.filter){return;}}
style.filter=ralpha.test(filter)?filter.replace(ralpha,opacity):filter+" "+opacity;}};}
jQuery(function(){if(!jQuery.support.reliableMarginRight){jQuery.cssHooks.marginRight={get:function(elem,computed){var ret;jQuery.swap(elem,{"display":"inline-block"},function(){if(computed){ret=curCSS(elem,"margin-right","marginRight");}else{ret=elem.style.marginRight;}});return ret;}};}});if(document.defaultView&&document.defaultView.getComputedStyle){getComputedStyle=function(elem,name){var ret,defaultView,computedStyle;name=name.replace(rupper,"-$1").toLowerCase();if(!(defaultView=elem.ownerDocument.defaultView)){return undefined;}
if((computedStyle=defaultView.getComputedStyle(elem,null))){ret=computedStyle.getPropertyValue(name);if(ret===""&&!jQuery.contains(elem.ownerDocument.documentElement,elem)){ret=jQuery.style(elem,name);}}
return ret;};}
if(document.documentElement.currentStyle){currentStyle=function(elem,name){var left,rsLeft,uncomputed,ret=elem.currentStyle&&elem.currentStyle[name],style=elem.style;if(ret===null&&style&&(uncomputed=style[name])){ret=uncomputed;}
if(!rnumpx.test(ret)&&rnum.test(ret)){left=style.left;rsLeft=elem.runtimeStyle&&elem.runtimeStyle.left;if(rsLeft){elem.runtimeStyle.left=elem.currentStyle.left;}
style.left=name==="fontSize"?"1em":(ret||0);ret=style.pixelLeft+"px";style.left=left;if(rsLeft){elem.runtimeStyle.left=rsLeft;}}
return ret===""?"auto":ret;};}
curCSS=getComputedStyle||currentStyle;function getWH(elem,name,extra){var val=name==="width"?elem.offsetWidth:elem.offsetHeight,which=name==="width"?cssWidth:cssHeight;if(val>0){if(extra!=="border"){jQuery.each(which,function(){if(!extra){val-=parseFloat(jQuery.css(elem,"padding"+this))||0;}
if(extra==="margin"){val+=parseFloat(jQuery.css(elem,extra+this))||0;}else{val-=parseFloat(jQuery.css(elem,"border"+this+"Width"))||0;}});}
return val+"px";}
val=curCSS(elem,name,name);if(val<0||val==null){val=elem.style[name]||0;}
val=parseFloat(val)||0;if(extra){jQuery.each(which,function(){val+=parseFloat(jQuery.css(elem,"padding"+this))||0;if(extra!=="padding"){val+=parseFloat(jQuery.css(elem,"border"+this+"Width"))||0;}
if(extra==="margin"){val+=parseFloat(jQuery.css(elem,extra+this))||0;}});}
return val+"px";}
if(jQuery.expr&&jQuery.expr.filters){jQuery.expr.filters.hidden=function(elem){var width=elem.offsetWidth,height=elem.offsetHeight;return(width===0&&height===0)||(!jQuery.support.reliableHiddenOffsets&&((elem.style&&elem.style.display)||jQuery.css(elem,"display"))==="none");};jQuery.expr.filters.visible=function(elem){return!jQuery.expr.filters.hidden(elem);};}
var r20=/%20/g,rbracket=/\[\]$/,rCRLF=/\r?\n/g,rhash=/#.*$/,rheaders=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,rinput=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,rlocalProtocol=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,rnoContent=/^(?:GET|HEAD)$/,rprotocol=/^\/\//,rquery=/\?/,rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,rselectTextarea=/^(?:select|textarea)/i,rspacesAjax=/\s+/,rts=/([?&])_=[^&]*/,rurl=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,_load=jQuery.fn.load,prefilters={},transports={},ajaxLocation,ajaxLocParts,allTypes=["*/"]+["*"];try{ajaxLocation=location.href;}catch(e){ajaxLocation=document.createElement("a");ajaxLocation.href="";ajaxLocation=ajaxLocation.href;}
ajaxLocParts=rurl.exec(ajaxLocation.toLowerCase())||[];function addToPrefiltersOrTransports(structure){return function(dataTypeExpression,func){if(typeof dataTypeExpression!=="string"){func=dataTypeExpression;dataTypeExpression="*";}
if(jQuery.isFunction(func)){var dataTypes=dataTypeExpression.toLowerCase().split(rspacesAjax),i=0,length=dataTypes.length,dataType,list,placeBefore;for(;i<length;i++){dataType=dataTypes[i];placeBefore=/^\+/.test(dataType);if(placeBefore){dataType=dataType.substr(1)||"*";}
list=structure[dataType]=structure[dataType]||[];list[placeBefore?"unshift":"push"](func);}}};}
function inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR,dataType,inspected){dataType=dataType||options.dataTypes[0];inspected=inspected||{};inspected[dataType]=true;var list=structure[dataType],i=0,length=list?list.length:0,executeOnly=(structure===prefilters),selection;for(;i<length&&(executeOnly||!selection);i++){selection=list[i](options,originalOptions,jqXHR);if(typeof selection==="string"){if(!executeOnly||inspected[selection]){selection=undefined;}else{options.dataTypes.unshift(selection);selection=inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR,selection,inspected);}}}
if((executeOnly||!selection)&&!inspected["*"]){selection=inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR,"*",inspected);}
return selection;}
function ajaxExtend(target,src){var key,deep,flatOptions=jQuery.ajaxSettings.flatOptions||{};for(key in src){if(src[key]!==undefined){(flatOptions[key]?target:(deep||(deep={})))[key]=src[key];}}
if(deep){jQuery.extend(true,target,deep);}}
jQuery.fn.extend({load:function(url,params,callback){if(typeof url!=="string"&&_load){return _load.apply(this,arguments);}else if(!this.length){return this;}
var off=url.indexOf(" ");if(off>=0){var selector=url.slice(off,url.length);url=url.slice(0,off);}
var type="GET";if(params){if(jQuery.isFunction(params)){callback=params;params=undefined;}else if(typeof params==="object"){params=jQuery.param(params,jQuery.ajaxSettings.traditional);type="POST";}}
var self=this;jQuery.ajax({url:url,type:type,dataType:"html",data:params,complete:function(jqXHR,status,responseText){responseText=jqXHR.responseText;if(jqXHR.isResolved()){jqXHR.done(function(r){responseText=r;});self.html(selector?jQuery("<div>").append(responseText.replace(rscript,"")).find(selector):responseText);}
if(callback){self.each(callback,[responseText,status,jqXHR]);}}});return this;},serialize:function(){return jQuery.param(this.serializeArray());},serializeArray:function(){return this.map(function(){return this.elements?jQuery.makeArray(this.elements):this;}).filter(function(){return this.name&&!this.disabled&&(this.checked||rselectTextarea.test(this.nodeName)||rinput.test(this.type));}).map(function(i,elem){var val=jQuery(this).val();return val==null?null:jQuery.isArray(val)?jQuery.map(val,function(val,i){return{name:elem.name,value:val.replace(rCRLF,"\r\n")};}):{name:elem.name,value:val.replace(rCRLF,"\r\n")};}).get();}});jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(i,o){jQuery.fn[o]=function(f){return this.bind(o,f);};});jQuery.each(["get","post"],function(i,method){jQuery[method]=function(url,data,callback,type){if(jQuery.isFunction(data)){type=type||callback;callback=data;data=undefined;}
return jQuery.ajax({type:method,url:url,data:data,success:callback,dataType:type});};});jQuery.extend({getScript:function(url,callback){return jQuery.get(url,undefined,callback,"script");},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json");},ajaxSetup:function(target,settings){if(settings){ajaxExtend(target,jQuery.ajaxSettings);}else{settings=target;target=jQuery.ajaxSettings;}
ajaxExtend(target,settings);return target;},ajaxSettings:{url:ajaxLocation,isLocal:rlocalProtocol.test(ajaxLocParts[1]),global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":allTypes},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":window.String,"text html":true,"text json":jQuery.parseJSON,"text xml":jQuery.parseXML},flatOptions:{context:true,url:true}},ajaxPrefilter:addToPrefiltersOrTransports(prefilters),ajaxTransport:addToPrefiltersOrTransports(transports),ajax:function(url,options){if(typeof url==="object"){options=url;url=undefined;}
options=options||{};var
s=jQuery.ajaxSetup({},options),callbackContext=s.context||s,globalEventContext=callbackContext!==s&&(callbackContext.nodeType||callbackContext instanceof jQuery)?jQuery(callbackContext):jQuery.event,deferred=jQuery.Deferred(),completeDeferred=jQuery.Callbacks("once memory"),statusCode=s.statusCode||{},ifModifiedKey,requestHeaders={},requestHeadersNames={},responseHeadersString,responseHeaders,transport,timeoutTimer,parts,state=0,fireGlobals,i,jqXHR={readyState:0,setRequestHeader:function(name,value){if(!state){var lname=name.toLowerCase();name=requestHeadersNames[lname]=requestHeadersNames[lname]||name;requestHeaders[name]=value;}
return this;},getAllResponseHeaders:function(){return state===2?responseHeadersString:null;},getResponseHeader:function(key){var match;if(state===2){if(!responseHeaders){responseHeaders={};while((match=rheaders.exec(responseHeadersString))){responseHeaders[match[1].toLowerCase()]=match[2];}}
match=responseHeaders[key.toLowerCase()];}
return match===undefined?null:match;},overrideMimeType:function(type){if(!state){s.mimeType=type;}
return this;},abort:function(statusText){statusText=statusText||"abort";if(transport){transport.abort(statusText);}
done(0,statusText);return this;}};function done(status,nativeStatusText,responses,headers){if(state===2){return;}
state=2;if(timeoutTimer){clearTimeout(timeoutTimer);}
transport=undefined;responseHeadersString=headers||"";jqXHR.readyState=status>0?4:0;var isSuccess,success,error,statusText=nativeStatusText,response=responses?ajaxHandleResponses(s,jqXHR,responses):undefined,lastModified,etag;if(status>=200&&status<300||status===304){if(s.ifModified){if((lastModified=jqXHR.getResponseHeader("Last-Modified"))){jQuery.lastModified[ifModifiedKey]=lastModified;}
if((etag=jqXHR.getResponseHeader("Etag"))){jQuery.etag[ifModifiedKey]=etag;}}
if(status===304){statusText="notmodified";isSuccess=true;}else{try{success=ajaxConvert(s,response);statusText="success";isSuccess=true;}catch(e){statusText="parsererror";error=e;}}}else{error=statusText;if(!statusText||status){statusText="error";if(status<0){status=0;}}}
jqXHR.status=status;jqXHR.statusText=""+(nativeStatusText||statusText);if(isSuccess){deferred.resolveWith(callbackContext,[success,statusText,jqXHR]);}else{deferred.rejectWith(callbackContext,[jqXHR,statusText,error]);}
jqXHR.statusCode(statusCode);statusCode=undefined;if(fireGlobals){globalEventContext.trigger("ajax"+(isSuccess?"Success":"Error"),[jqXHR,s,isSuccess?success:error]);}
completeDeferred.fireWith(callbackContext,[jqXHR,statusText]);if(fireGlobals){globalEventContext.trigger("ajaxComplete",[jqXHR,s]);if(!(--jQuery.active)){jQuery.event.trigger("ajaxStop");}}}
deferred.promise(jqXHR);jqXHR.success=jqXHR.done;jqXHR.error=jqXHR.fail;jqXHR.complete=completeDeferred.add;jqXHR.statusCode=function(map){if(map){var tmp;if(state<2){for(tmp in map){statusCode[tmp]=[statusCode[tmp],map[tmp]];}}else{tmp=map[jqXHR.status];jqXHR.then(tmp,tmp);}}
return this;};s.url=((url||s.url)+"").replace(rhash,"").replace(rprotocol,ajaxLocParts[1]+"//");s.dataTypes=jQuery.trim(s.dataType||"*").toLowerCase().split(rspacesAjax);if(s.crossDomain==null){parts=rurl.exec(s.url.toLowerCase());s.crossDomain=!!(parts&&(parts[1]!=ajaxLocParts[1]||parts[2]!=ajaxLocParts[2]||(parts[3]||(parts[1]==="http:"?80:443))!=(ajaxLocParts[3]||(ajaxLocParts[1]==="http:"?80:443))));}
if(s.data&&s.processData&&typeof s.data!=="string"){s.data=jQuery.param(s.data,s.traditional);}
inspectPrefiltersOrTransports(prefilters,s,options,jqXHR);if(state===2){return false;}
fireGlobals=s.global;s.type=s.type.toUpperCase();s.hasContent=!rnoContent.test(s.type);if(fireGlobals&&jQuery.active++===0){jQuery.event.trigger("ajaxStart");}
if(!s.hasContent){if(s.data){s.url+=(rquery.test(s.url)?"&":"?")+s.data;delete s.data;}
ifModifiedKey=s.url;if(s.cache===false){var ts=jQuery.now(),ret=s.url.replace(rts,"$1_="+ts);s.url=ret+((ret===s.url)?(rquery.test(s.url)?"&":"?")+"_="+ts:"");}}
if(s.data&&s.hasContent&&s.contentType!==false||options.contentType){jqXHR.setRequestHeader("Content-Type",s.contentType);}
if(s.ifModified){ifModifiedKey=ifModifiedKey||s.url;if(jQuery.lastModified[ifModifiedKey]){jqXHR.setRequestHeader("If-Modified-Since",jQuery.lastModified[ifModifiedKey]);}
if(jQuery.etag[ifModifiedKey]){jqXHR.setRequestHeader("If-None-Match",jQuery.etag[ifModifiedKey]);}}
jqXHR.setRequestHeader("Accept",s.dataTypes[0]&&s.accepts[s.dataTypes[0]]?s.accepts[s.dataTypes[0]]+(s.dataTypes[0]!=="*"?", "+allTypes+"; q=0.01":""):s.accepts["*"]);for(i in s.headers){jqXHR.setRequestHeader(i,s.headers[i]);}
if(s.beforeSend&&(s.beforeSend.call(callbackContext,jqXHR,s)===false||state===2)){jqXHR.abort();return false;}
for(i in{success:1,error:1,complete:1}){jqXHR[i](s[i]);}
transport=inspectPrefiltersOrTransports(transports,s,options,jqXHR);if(!transport){done(-1,"No Transport");}else{jqXHR.readyState=1;if(fireGlobals){globalEventContext.trigger("ajaxSend",[jqXHR,s]);}
if(s.async&&s.timeout>0){timeoutTimer=setTimeout(function(){jqXHR.abort("timeout");},s.timeout);}
try{state=1;transport.send(requestHeaders,done);}catch(e){if(state<2){done(-1,e);}else{jQuery.error(e);}}}
return jqXHR;},param:function(a,traditional){var s=[],add=function(key,value){value=jQuery.isFunction(value)?value():value;s[s.length]=encodeURIComponent(key)+"="+encodeURIComponent(value);};if(traditional===undefined){traditional=jQuery.ajaxSettings.traditional;}
if(jQuery.isArray(a)||(a.jquery&&!jQuery.isPlainObject(a))){jQuery.each(a,function(){add(this.name,this.value);});}else{for(var prefix in a){buildParams(prefix,a[prefix],traditional,add);}}
return s.join("&").replace(r20,"+");}});function buildParams(prefix,obj,traditional,add){if(jQuery.isArray(obj)){jQuery.each(obj,function(i,v){if(traditional||rbracket.test(prefix)){add(prefix,v);}else{buildParams(prefix+"["+(typeof v==="object"||jQuery.isArray(v)?i:"")+"]",v,traditional,add);}});}else if(!traditional&&obj!=null&&typeof obj==="object"){for(var name in obj){buildParams(prefix+"["+name+"]",obj[name],traditional,add);}}else{add(prefix,obj);}}
jQuery.extend({active:0,lastModified:{},etag:{}});function ajaxHandleResponses(s,jqXHR,responses){var contents=s.contents,dataTypes=s.dataTypes,responseFields=s.responseFields,ct,type,finalDataType,firstDataType;for(type in responseFields){if(type in responses){jqXHR[responseFields[type]]=responses[type];}}
while(dataTypes[0]==="*"){dataTypes.shift();if(ct===undefined){ct=s.mimeType||jqXHR.getResponseHeader("content-type");}}
if(ct){for(type in contents){if(contents[type]&&contents[type].test(ct)){dataTypes.unshift(type);break;}}}
if(dataTypes[0]in responses){finalDataType=dataTypes[0];}else{for(type in responses){if(!dataTypes[0]||s.converters[type+" "+dataTypes[0]]){finalDataType=type;break;}
if(!firstDataType){firstDataType=type;}}
finalDataType=finalDataType||firstDataType;}
if(finalDataType){if(finalDataType!==dataTypes[0]){dataTypes.unshift(finalDataType);}
return responses[finalDataType];}}
function ajaxConvert(s,response){if(s.dataFilter){response=s.dataFilter(response,s.dataType);}
var dataTypes=s.dataTypes,converters={},i,key,length=dataTypes.length,tmp,current=dataTypes[0],prev,conversion,conv,conv1,conv2;for(i=1;i<length;i++){if(i===1){for(key in s.converters){if(typeof key==="string"){converters[key.toLowerCase()]=s.converters[key];}}}
prev=current;current=dataTypes[i];if(current==="*"){current=prev;}else if(prev!=="*"&&prev!==current){conversion=prev+" "+current;conv=converters[conversion]||converters["* "+current];if(!conv){conv2=undefined;for(conv1 in converters){tmp=conv1.split(" ");if(tmp[0]===prev||tmp[0]==="*"){conv2=converters[tmp[1]+" "+current];if(conv2){conv1=converters[conv1];if(conv1===true){conv=conv2;}else if(conv2===true){conv=conv1;}
break;}}}}
if(!(conv||conv2)){jQuery.error("No conversion from "+conversion.replace(" "," to "));}
if(conv!==true){response=conv?conv(response):conv2(conv1(response));}}}
return response;}
var jsc=jQuery.now(),jsre=/(\=)\?(&|$)|\?\?/i;jQuery.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return jQuery.expando+"_"+(jsc++);}});jQuery.ajaxPrefilter("json jsonp",function(s,originalSettings,jqXHR){var inspectData=s.contentType==="application/x-www-form-urlencoded"&&(typeof s.data==="string");if(s.dataTypes[0]==="jsonp"||s.jsonp!==false&&(jsre.test(s.url)||inspectData&&jsre.test(s.data))){var responseContainer,jsonpCallback=s.jsonpCallback=jQuery.isFunction(s.jsonpCallback)?s.jsonpCallback():s.jsonpCallback,previous=window[jsonpCallback],url=s.url,data=s.data,replace="$1"+jsonpCallback+"$2";if(s.jsonp!==false){url=url.replace(jsre,replace);if(s.url===url){if(inspectData){data=data.replace(jsre,replace);}
if(s.data===data){url+=(/\?/.test(url)?"&":"?")+s.jsonp+"="+jsonpCallback;}}}
s.url=url;s.data=data;window[jsonpCallback]=function(response){responseContainer=[response];};jqXHR.always(function(){window[jsonpCallback]=previous;if(responseContainer&&jQuery.isFunction(previous)){window[jsonpCallback](responseContainer[0]);}});s.converters["script json"]=function(){if(!responseContainer){jQuery.error(jsonpCallback+" was not called");}
return responseContainer[0];};s.dataTypes[0]="json";return"script";}});jQuery.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(text){jQuery.globalEval(text);return text;}}});jQuery.ajaxPrefilter("script",function(s){if(s.cache===undefined){s.cache=false;}
if(s.crossDomain){s.type="GET";s.global=false;}});jQuery.ajaxTransport("script",function(s){if(s.crossDomain){var script,head=document.head||document.getElementsByTagName("head")[0]||document.documentElement;return{send:function(_,callback){script=document.createElement("script");script.async="async";if(s.scriptCharset){script.charset=s.scriptCharset;}
script.src=s.url;script.onload=script.onreadystatechange=function(_,isAbort){if(isAbort||!script.readyState||/loaded|complete/.test(script.readyState)){script.onload=script.onreadystatechange=null;if(head&&script.parentNode){head.removeChild(script);}
script=undefined;if(!isAbort){callback(200,"success");}}};head.insertBefore(script,head.firstChild);},abort:function(){if(script){script.onload(0,1);}}};}});var
xhrOnUnloadAbort=window.ActiveXObject?function(){for(var key in xhrCallbacks){xhrCallbacks[key](0,1);}}:false,xhrId=0,xhrCallbacks;function createStandardXHR(){try{return new window.XMLHttpRequest();}catch(e){}}
function createActiveXHR(){try{return new window.ActiveXObject("Microsoft.XMLHTTP");}catch(e){}}
jQuery.ajaxSettings.xhr=window.ActiveXObject?function(){return!this.isLocal&&createStandardXHR()||createActiveXHR();}:createStandardXHR;(function(xhr){jQuery.extend(jQuery.support,{ajax:!!xhr,cors:!!xhr&&("withCredentials"in xhr)});})(jQuery.ajaxSettings.xhr());if(jQuery.support.ajax){jQuery.ajaxTransport(function(s){if(!s.crossDomain||jQuery.support.cors){var callback;return{send:function(headers,complete){var xhr=s.xhr(),handle,i;if(s.username){xhr.open(s.type,s.url,s.async,s.username,s.password);}else{xhr.open(s.type,s.url,s.async);}
if(s.xhrFields){for(i in s.xhrFields){xhr[i]=s.xhrFields[i];}}
if(s.mimeType&&xhr.overrideMimeType){xhr.overrideMimeType(s.mimeType);}
if(!s.crossDomain&&!headers["X-Requested-With"]){headers["X-Requested-With"]="XMLHttpRequest";}
try{for(i in headers){xhr.setRequestHeader(i,headers[i]);}}catch(_){}
if(jQuery.ajaxPerf)jQuery.ajaxPerf.start(s)
xhr.send((s.hasContent&&s.data)||null);callback=function(_,isAbort){var status,statusText,responseHeaders,responses,xml;try{if(callback&&(isAbort||xhr.readyState===4)){callback=undefined;if(handle){xhr.onreadystatechange=jQuery.noop;if(xhrOnUnloadAbort){delete xhrCallbacks[handle];}}
if(isAbort){if(xhr.readyState!==4){xhr.abort();}}else{status=xhr.status;responseHeaders=xhr.getAllResponseHeaders();responses={};xml=xhr.responseXML;if(xml&&xml.documentElement){responses.xml=xml;}
responses.text=xhr.responseText;try{statusText=xhr.statusText;}catch(e){statusText="";}
if(!status&&s.isLocal&&!s.crossDomain){status=responses.text?200:404;}else if(status===1223){status=204;}}}}catch(firefoxAccessException){if(!isAbort){complete(-1,firefoxAccessException);}}
if(responses){if(jQuery.ajaxPerf)jQuery.ajaxPerf.measureRtt(s);complete(status,statusText,responses,responseHeaders);}};if(!s.async||xhr.readyState===4){callback();}else{handle=++xhrId;if(xhrOnUnloadAbort){if(!xhrCallbacks){xhrCallbacks={};jQuery(window).unload(xhrOnUnloadAbort);}
xhrCallbacks[handle]=callback;}
xhr.onreadystatechange=callback;}},abort:function(){if(callback){callback(0,1);}}};}});}
var elemdisplay={},iframe,iframeDoc,rfxtypes=/^(?:toggle|show|hide)$/,rfxnum=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,timerId,fxAttrs=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],fxNow;jQuery.fn.extend({show:function(speed,easing,callback){var elem,display;if(speed||speed===0){return this.animate(genFx("show",3),speed,easing,callback);}else{for(var i=0,j=this.length;i<j;i++){elem=this[i];if(elem.style){display=elem.style.display;if(!jQuery._data(elem,"olddisplay")&&display==="none"){display=elem.style.display="";}
if(display===""&&jQuery.css(elem,"display")==="none"){jQuery._data(elem,"olddisplay",defaultDisplay(elem.nodeName));}}}
for(i=0;i<j;i++){elem=this[i];if(elem.style){display=elem.style.display;if(display===""||display==="none"){elem.style.display=jQuery._data(elem,"olddisplay")||"";}}}
return this;}},hide:function(speed,easing,callback){if(speed||speed===0){return this.animate(genFx("hide",3),speed,easing,callback);}else{var elem,display,i=0,j=this.length;for(;i<j;i++){elem=this[i];if(elem.style){display=jQuery.css(elem,"display");if(display!=="none"&&!jQuery._data(elem,"olddisplay")){jQuery._data(elem,"olddisplay",display);}}}
for(i=0;i<j;i++){if(this[i].style){this[i].style.display="none";}}
return this;}},_toggle:jQuery.fn.toggle,toggle:function(fn,fn2,callback){var bool=typeof fn==="boolean";if(jQuery.isFunction(fn)&&jQuery.isFunction(fn2)){this._toggle.apply(this,arguments);}else if(fn==null||bool){this.each(function(){var state=bool?fn:jQuery(this).is(":hidden");jQuery(this)[state?"show":"hide"]();});}else{this.animate(genFx("toggle",3),fn,fn2,callback);}
return this;},fadeTo:function(speed,to,easing,callback){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:to},speed,easing,callback);},animate:function(prop,speed,easing,callback){var optall=jQuery.speed(speed,easing,callback);if(jQuery.isEmptyObject(prop)){return this.each(optall.complete,[false]);}
prop=jQuery.extend({},prop);function doAnimation(){if(optall.queue===false){jQuery._mark(this);}
var opt=jQuery.extend({},optall),isElement=this.nodeType===1,hidden=isElement&&jQuery(this).is(":hidden"),name,val,p,e,parts,start,end,unit,method;opt.animatedProperties={};for(p in prop){name=jQuery.camelCase(p);if(p!==name){prop[name]=prop[p];delete prop[p];}
val=prop[name];if(jQuery.isArray(val)){opt.animatedProperties[name]=val[1];val=prop[name]=val[0];}else{opt.animatedProperties[name]=opt.specialEasing&&opt.specialEasing[name]||opt.easing||'swing';}
if(val==="hide"&&hidden||val==="show"&&!hidden){return opt.complete.call(this);}
if(isElement&&(name==="height"||name==="width")){opt.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY];if(jQuery.css(this,"display")==="inline"&&jQuery.css(this,"float")==="none"){if(!jQuery.support.inlineBlockNeedsLayout||defaultDisplay(this.nodeName)==="inline"){this.style.display="inline-block";}else{this.style.zoom=1;}}}}
if(opt.overflow!=null){this.style.overflow="hidden";}
for(p in prop){e=new jQuery.fx(this,opt,p);val=prop[p];if(rfxtypes.test(val)){method=jQuery._data(this,"toggle"+p)||(val==="toggle"?hidden?"show":"hide":0);if(method){jQuery._data(this,"toggle"+p,method==="show"?"hide":"show");e[method]();}else{e[val]();}}else{parts=rfxnum.exec(val);start=e.cur();if(parts){end=parseFloat(parts[2]);unit=parts[3]||(jQuery.cssNumber[p]?"":"px");if(unit!=="px"){jQuery.style(this,p,(end||1)+unit);start=((end||1)/e.cur())*start;jQuery.style(this,p,start+unit);}
if(parts[1]){end=((parts[1]==="-="?-1:1)*end)+start;}
e.custom(start,end,unit);}else{e.custom(start,val,"");}}}
return true;}
return optall.queue===false?this.each(doAnimation):this.queue(optall.queue,doAnimation);},stop:function(type,clearQueue,gotoEnd){if(typeof type!=="string"){gotoEnd=clearQueue;clearQueue=type;type=undefined;}
if(clearQueue&&type!==false){this.queue(type||"fx",[]);}
return this.each(function(){var i,hadTimers=false,timers=jQuery.timers,data=jQuery._data(this);if(!gotoEnd){jQuery._unmark(true,this);}
function stopQueue(elem,data,i){var hooks=data[i];jQuery.removeData(elem,i,true);hooks.stop(gotoEnd);}
if(type==null){for(i in data){if(data[i].stop&&i.indexOf(".run")===i.length-4){stopQueue(this,data,i);}}}else if(data[i=type+".run"]&&data[i].stop){stopQueue(this,data,i);}
for(i=timers.length;i--;){if(timers[i].elem===this&&(type==null||timers[i].queue===type)){if(gotoEnd){timers[i](true);}else{timers[i].saveState();}
hadTimers=true;timers.splice(i,1);}}
if(!(gotoEnd&&hadTimers)){jQuery.dequeue(this,type);}});}});function createFxNow(){setTimeout(clearFxNow,0);return(fxNow=jQuery.now());}
function clearFxNow(){fxNow=undefined;}
function genFx(type,num){var obj={};jQuery.each(fxAttrs.concat.apply([],fxAttrs.slice(0,num)),function(){obj[this]=type;});return obj;}
jQuery.each({slideDown:genFx("show",1),slideUp:genFx("hide",1),slideToggle:genFx("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(name,props){jQuery.fn[name]=function(speed,easing,callback){return this.animate(props,speed,easing,callback);};});jQuery.extend({speed:function(speed,easing,fn){var opt=speed&&typeof speed==="object"?jQuery.extend({},speed):{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&!jQuery.isFunction(easing)&&easing};opt.duration=jQuery.fx.off?0:typeof opt.duration==="number"?opt.duration:opt.duration in jQuery.fx.speeds?jQuery.fx.speeds[opt.duration]:jQuery.fx.speeds._default;if(opt.queue==null||opt.queue===true){opt.queue="fx";}
opt.old=opt.complete;opt.complete=function(noUnmark){if(jQuery.isFunction(opt.old)){opt.old.call(this);}
if(opt.queue){jQuery.dequeue(this,opt.queue);}else if(noUnmark!==false){jQuery._unmark(this);}};return opt;},easing:{linear:function(p,n,firstNum,diff){return firstNum+diff*p;},swing:function(p,n,firstNum,diff){return((-Math.cos(p*Math.PI)/2)+0.5)*diff+firstNum;}},timers:[],fx:function(elem,options,prop){this.options=options;this.elem=elem;this.prop=prop;options.orig=options.orig||{};}});jQuery.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this);}
(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this);},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop];}
var parsed,r=jQuery.css(this.elem,this.prop);return isNaN(parsed=parseFloat(r))?!r||r==="auto"?0:r:parsed;},custom:function(from,to,unit){var self=this,fx=jQuery.fx;this.startTime=fxNow||createFxNow();this.end=to;this.now=this.start=from;this.pos=this.state=0;this.unit=unit||this.unit||(jQuery.cssNumber[this.prop]?"":"px");function t(gotoEnd){return self.step(gotoEnd);}
t.queue=this.options.queue;t.elem=this.elem;t.saveState=function(){if(self.options.hide&&jQuery._data(self.elem,"fxshow"+self.prop)===undefined){jQuery._data(self.elem,"fxshow"+self.prop,self.start);}};if(t()&&jQuery.timers.push(t)&&!timerId){timerId=setInterval(fx.tick,fx.interval);}},show:function(){var dataShow=jQuery._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=dataShow||jQuery.style(this.elem,this.prop);this.options.show=true;if(dataShow!==undefined){this.custom(this.cur(),dataShow);}else{this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());}
jQuery(this.elem).show();},hide:function(){this.options.orig[this.prop]=jQuery._data(this.elem,"fxshow"+this.prop)||jQuery.style(this.elem,this.prop);this.options.hide=true;this.custom(this.cur(),0);},step:function(gotoEnd){var p,n,complete,t=fxNow||createFxNow(),done=true,elem=this.elem,options=this.options;if(gotoEnd||t>=options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();options.animatedProperties[this.prop]=true;for(p in options.animatedProperties){if(options.animatedProperties[p]!==true){done=false;}}
if(done){if(options.overflow!=null&&!jQuery.support.shrinkWrapBlocks){jQuery.each(["","X","Y"],function(index,value){elem.style["overflow"+value]=options.overflow[index];});}
if(options.hide){jQuery(elem).hide();}
if(options.hide||options.show){for(p in options.animatedProperties){jQuery.style(elem,p,options.orig[p]);jQuery.removeData(elem,"fxshow"+p,true);jQuery.removeData(elem,"toggle"+p,true);}}
complete=options.complete;if(complete){options.complete=false;complete.call(elem);}}
return false;}else{if(options.duration==Infinity){this.now=t;}else{n=t-this.startTime;this.state=n/options.duration;this.pos=jQuery.easing[options.animatedProperties[this.prop]](this.state,n,0,1,options.duration);this.now=this.start+((this.end-this.start)*this.pos);}
this.update();}
return true;}};jQuery.extend(jQuery.fx,{tick:function(){var timer,timers=jQuery.timers,i=0;for(;i<timers.length;i++){timer=timers[i];if(!timer()&&timers[i]===timer){timers.splice(i--,1);}}
if(!timers.length){jQuery.fx.stop();}},interval:13,stop:function(){clearInterval(timerId);timerId=null;},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(fx){jQuery.style(fx.elem,"opacity",fx.now);},_default:function(fx){if(fx.elem.style&&fx.elem.style[fx.prop]!=null){fx.elem.style[fx.prop]=fx.now+fx.unit;}else{fx.elem[fx.prop]=fx.now;}}}});jQuery.each(["width","height"],function(i,prop){jQuery.fx.step[prop]=function(fx){jQuery.style(fx.elem,prop,Math.max(0,fx.now));};});if(jQuery.expr&&jQuery.expr.filters){jQuery.expr.filters.animated=function(elem){return jQuery.grep(jQuery.timers,function(fn){return elem===fn.elem;}).length;};}
function defaultDisplay(nodeName){if(!elemdisplay[nodeName]){var body=document.body,elem=jQuery("<"+nodeName+">").appendTo(body),display=elem.css("display");elem.remove();if(display==="none"||display===""){if(!iframe){iframe=document.createElement("iframe");iframe.frameBorder=iframe.width=iframe.height=0;}
body.appendChild(iframe);if(!iframeDoc||!iframe.createElement){iframeDoc=(iframe.contentWindow||iframe.contentDocument).document;iframeDoc.write((document.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>");iframeDoc.close();}
elem=iframeDoc.createElement(nodeName);iframeDoc.body.appendChild(elem);display=jQuery.css(elem,"display");body.removeChild(iframe);}
elemdisplay[nodeName]=display;}
return elemdisplay[nodeName];}
var rtable=/^t(?:able|d|h)$/i,rroot=/^(?:body|html)$/i;if("getBoundingClientRect"in document.documentElement){jQuery.fn.offset=function(options){var elem=this[0],box;if(options){return this.each(function(i){jQuery.offset.setOffset(this,options,i);});}
if(!elem||!elem.ownerDocument){return null;}
if(elem===elem.ownerDocument.body){return jQuery.offset.bodyOffset(elem);}
try{box=elem.getBoundingClientRect();}catch(e){}
var doc=elem.ownerDocument,docElem=doc.documentElement;if(!box||!jQuery.contains(docElem,elem)){return box?{top:box.top,left:box.left}:{top:0,left:0};}
var body=doc.body,win=getWindow(doc),clientTop=docElem.clientTop||body.clientTop||0,clientLeft=docElem.clientLeft||body.clientLeft||0,scrollTop=win.pageYOffset||jQuery.support.boxModel&&docElem.scrollTop||body.scrollTop,scrollLeft=win.pageXOffset||jQuery.support.boxModel&&docElem.scrollLeft||body.scrollLeft,top=box.top+scrollTop-clientTop,left=box.left+scrollLeft-clientLeft;return{top:top,left:left};};}else{jQuery.fn.offset=function(options){var elem=this[0];if(options){return this.each(function(i){jQuery.offset.setOffset(this,options,i);});}
if(!elem||!elem.ownerDocument){return null;}
if(elem===elem.ownerDocument.body){return jQuery.offset.bodyOffset(elem);}
var computedStyle,offsetParent=elem.offsetParent,prevOffsetParent=elem,doc=elem.ownerDocument,docElem=doc.documentElement,body=doc.body,defaultView=doc.defaultView,prevComputedStyle=defaultView?defaultView.getComputedStyle(elem,null):elem.currentStyle,top=elem.offsetTop,left=elem.offsetLeft;while((elem=elem.parentNode)&&elem!==body&&elem!==docElem){if(jQuery.support.fixedPosition&&prevComputedStyle.position==="fixed"){break;}
computedStyle=defaultView?defaultView.getComputedStyle(elem,null):elem.currentStyle;top-=elem.scrollTop;left-=elem.scrollLeft;if(elem===offsetParent){top+=elem.offsetTop;left+=elem.offsetLeft;if(jQuery.support.doesNotAddBorder&&!(jQuery.support.doesAddBorderForTableAndCells&&rtable.test(elem.nodeName))){top+=parseFloat(computedStyle.borderTopWidth)||0;left+=parseFloat(computedStyle.borderLeftWidth)||0;}
prevOffsetParent=offsetParent;offsetParent=elem.offsetParent;}
if(jQuery.support.subtractsBorderForOverflowNotVisible&&computedStyle.overflow!=="visible"){top+=parseFloat(computedStyle.borderTopWidth)||0;left+=parseFloat(computedStyle.borderLeftWidth)||0;}
prevComputedStyle=computedStyle;}
if(prevComputedStyle.position==="relative"||prevComputedStyle.position==="static"){top+=body.offsetTop;left+=body.offsetLeft;}
if(jQuery.support.fixedPosition&&prevComputedStyle.position==="fixed"){top+=Math.max(docElem.scrollTop,body.scrollTop);left+=Math.max(docElem.scrollLeft,body.scrollLeft);}
return{top:top,left:left};};}
jQuery.offset={bodyOffset:function(body){var top=body.offsetTop,left=body.offsetLeft;if(jQuery.support.doesNotIncludeMarginInBodyOffset){top+=parseFloat(jQuery.css(body,"marginTop"))||0;left+=parseFloat(jQuery.css(body,"marginLeft"))||0;}
return{top:top,left:left};},setOffset:function(elem,options,i){var position=jQuery.css(elem,"position");if(position==="static"){elem.style.position="relative";}
var curElem=jQuery(elem),curOffset=curElem.offset(),curCSSTop=jQuery.css(elem,"top"),curCSSLeft=jQuery.css(elem,"left"),calculatePosition=(position==="absolute"||position==="fixed")&&jQuery.inArray("auto",[curCSSTop,curCSSLeft])>-1,props={},curPosition={},curTop,curLeft;if(calculatePosition){curPosition=curElem.position();curTop=curPosition.top;curLeft=curPosition.left;}else{curTop=parseFloat(curCSSTop)||0;curLeft=parseFloat(curCSSLeft)||0;}
if(jQuery.isFunction(options)){options=options.call(elem,i,curOffset);}
if(options.top!=null){props.top=(options.top-curOffset.top)+curTop;}
if(options.left!=null){props.left=(options.left-curOffset.left)+curLeft;}
if("using"in options){options.using.call(elem,props);}else{curElem.css(props);}}};jQuery.fn.extend({position:function(){if(!this[0]){return null;}
var elem=this[0],offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=rroot.test(offsetParent[0].nodeName)?{top:0,left:0}:offsetParent.offset();offset.top-=parseFloat(jQuery.css(elem,"marginTop"))||0;offset.left-=parseFloat(jQuery.css(elem,"marginLeft"))||0;parentOffset.top+=parseFloat(jQuery.css(offsetParent[0],"borderTopWidth"))||0;parentOffset.left+=parseFloat(jQuery.css(offsetParent[0],"borderLeftWidth"))||0;return{top:offset.top-parentOffset.top,left:offset.left-parentOffset.left};},offsetParent:function(){return this.map(function(){var offsetParent=this.offsetParent||document.body;while(offsetParent&&(!rroot.test(offsetParent.nodeName)&&jQuery.css(offsetParent,"position")==="static")){offsetParent=offsetParent.offsetParent;}
return offsetParent;});}});jQuery.each(["Left","Top"],function(i,name){var method="scroll"+name;jQuery.fn[method]=function(val){var elem,win;if(val===undefined){elem=this[0];if(!elem){return null;}
win=getWindow(elem);return win?("pageXOffset"in win)?win[i?"pageYOffset":"pageXOffset"]:jQuery.support.boxModel&&win.document.documentElement[method]||win.document.body[method]:elem[method];}
return this.each(function(){win=getWindow(this);if(win){win.scrollTo(!i?val:jQuery(win).scrollLeft(),i?val:jQuery(win).scrollTop());}else{this[method]=val;}});};});function getWindow(elem){return jQuery.isWindow(elem)?elem:elem.nodeType===9?elem.defaultView||elem.parentWindow:false;}
jQuery.each(["Height","Width"],function(i,name){var type=name.toLowerCase();jQuery.fn["inner"+name]=function(){var elem=this[0];return elem?elem.style?parseFloat(jQuery.css(elem,type,"padding")):this[type]():null;};jQuery.fn["outer"+name]=function(margin){var elem=this[0];return elem?elem.style?parseFloat(jQuery.css(elem,type,margin?"margin":"border")):this[type]():null;};jQuery.fn[type]=function(size){var elem=this[0];if(!elem){return size==null?null:this;}
if(jQuery.isFunction(size)){return this.each(function(i){var self=jQuery(this);self[type](size.call(this,i,self[type]()));});}
if(jQuery.isWindow(elem)){var docElemProp=elem.document.documentElement["client"+name],body=elem.document.body;return elem.document.compatMode==="CSS1Compat"&&docElemProp||body&&body["client"+name]||docElemProp;}else if(elem.nodeType===9){return Math.max(elem.documentElement["client"+name],elem.body["scroll"+name],elem.documentElement["scroll"+name],elem.body["offset"+name],elem.documentElement["offset"+name]);}else if(size===undefined){var orig=jQuery.css(elem,type),ret=parseFloat(orig);return jQuery.isNumeric(ret)?ret:orig;}else{return this.css(type,typeof size==="string"?size:size+"px");}};});window.jQuery=window.$=jQuery;})(window);$j=$;(function($){$.ajaxSetup({dataFilter:function(data,dataType){if(dataType=="json"&&data.substr(0,5)=="boxon")
{var encoded_params;var unencoded_params={};var data_length=data.length;var delimitor=':';for(var pos=0;pos<data_length;)
{var pos_1=data.indexOf(delimitor,pos);var path=data.substring(pos,pos_1);var pos_2=data.indexOf(delimitor,pos_1+1);var length=parseInt(data.substring(pos_1+1,pos_2));var next_pos=pos_2+length+1;var value=data.substring(pos_2+1,next_pos);if(!encoded_params)
{encoded_params=value;}
else
{unencoded_params[path]=value;}
pos=next_pos+1;}
if(this.boxon_preparsing_callback)
{this.boxon_preparsing_callback(encoded_params,unencoded_params);}
var json=$j.parseJSON(encoded_params);if(typeof UniDB!='undefined'&&UniDB.is_unidb(json))
{json=UniDB.decode(json);}
for(var path in unencoded_params)
{var value=unencoded_params[path];var path_array=path.split('.');var path_length=path_array.length;var path_object=json;for(var i=0;i<path_length-1;i++)
{if(!path_object[path_array[i]])
{path_object[path_array[i]]={};}
path_object=path_object[path_array[i]];}
path_object[path_array[path_length-1]]=value;}
return json;}
else if(dataType=='json'&&typeof UniDB!='undefined')
{var encoded_json=$j.parseJSON(data);if(UniDB.is_unidb(encoded_json))
{return UniDB.decode(encoded_json);}
return data;}
return data;},beforeSend:function(xhr,settings)
{if(settings.type.toLowerCase()!='post')return true;if(typeof settings.data=='string')
{if(settings.data.indexOf('request_token=')==-1)
{if(settings.data.length>0)settings.data+='&';settings.data+='request_token='+window.request_token;}
if(settings.data.length>0)settings.data+='&';if(typeof(Realtime_Notification)!='undefined')
{settings.data+='realtime_subscriber_id='+Realtime_Notification.subscriber_id;}}
else
{if(!settings.data)settings.data={};if(!settings.data.request_token)settings.data.request_token=window.request_token;if(typeof(Realtime_Notification)!='undefined')
{settings.data.realtime_subscriber_id=Realtime_Notification.subscriber_id;}}
return true;}});var create_ajax_function=function(function_type,function_data_type)
{return function(url,data,callback,data_type,params)
{if(function_data_type!='')
{params=data_type;data_type=function_data_type;}
if(jQuery.isFunction(data)){params=callback;callback=data;data=null;}
params=$.extend({},params,{type:function_type,url:url,data:data,success:callback,dataType:data_type});return $.ajax(params);};};$.extend({get:create_ajax_function('GET',''),getJSON:create_ajax_function('GET','json'),getCrossDomain:function(){if($.support.cors){return create_ajax_function('GET','json');}
return create_ajax_function('GET','jsonp');}(),arrayDiff:function(a1,a2){if(a1.length==0&&a2.length==0)return[];var array,other;if(a1.length-a2.length>=0)
{array=a1;other=a2;}
else
{array=a2;other=a1;}
for(var i=0;i<array.length;i++)
{if(other.indexOf(array[i])==-1)return true;}
return false;},post:create_ajax_function('POST',''),postJSON:create_ajax_function('POST','json'),ajaxPerf:{performance:{},count:0,start:function(s){var ajaxPerfEnabled=window.Features&&window.Features.ajax_perf;if(ajaxPerfEnabled)
{this.start=this.startMeasure;this.startMeasure(s);}
else
{this.start=function(){};this.measureRtt=function(){};this.measureCallback=function(){};}},startMeasure:function(s){var start_time=(new Date).getTime();if(!this.isRequestValid(s))return;this.count++;if(this.count>20)
{this.performance={};this.count=1;}
this.performance[this.getHashId(s.url)]={start_time:start_time,url:s.url,runmode:s.url.substring(s.url.indexOf('?rm=')+4,(s.url.indexOf('&')!=-1?s.url.indexOf('&'):s.url.length)),type:s.type,data_type:s.dataType};},measureRtt:function(s){var respond_time=(new Date).getTime();var id=this.getHashId(s.url);if(!this.isRequestValid(s)||!this.performance[id])return;this.performance[id].respond_time=respond_time;this.performance[id].round_trip_time=this.performance[id].respond_time-this.performance[id].start_time;},measureCallback:function(s){var callback_done_time=(new Date).getTime();var id=this.getHashId(s.url+(s.data?'&'+s.data:''));if(!this.isRequestValid(s)||!this.performance[id])return;this.performance[id].callback_done_time=callback_done_time;this.performance[id].callback_time=this.performance[id].callback_done_time-this.performance[id].respond_time;Common_Global.send_log('ajax_performance','AJAX_REQUEST',this.performance[id]);$.log(this.performance);},getHashId:function(str){var len=str.length;return len+str.substring(len-3,len);},isRequestValid:function(s){return s.dataType&&(s.url.indexOf('realtime')<0);}},box:{formatQuery:function(query){function toURIComponents(obj,prefix,data){prefix=prefix||'';data=data||[];if(typeof obj=='string'||typeof obj=='number'){data.push(prefix+'='+encodeURIComponent(obj));}else if(typeof obj=='boolean'){data.push(prefix+'='+(obj?1:0));}else{for(var p in obj){data=toURIComponents(obj[p],prefix+'['+p+']',data);}}
return data;}
return toURIComponents(query,'q').join('&');},getFlashVersion:function(){var plugin=navigator.plugins?(navigator.plugins['Shockwave Flash']||navigator.plugins['Shockwave Flash 2.0']):null;if(plugin)return plugin.description.split(' ')[2];function try_get_version(suffix){try{var flash=new ActiveXObject('ShockwaveFlash.ShockwaveFlash'+suffix);return flash.GetVariable('$version');}catch(e){return(typeof flash!='undefined')?-1:0;}}
var version=try_get_version('.7');if(!version)version=try_get_version('.6');if(version==-1)return 6.0;if(!version)version=try_get_version('.3');if(version==-1)return 3.0;if(!version){version=try_get_version('');if(version==-1)return 2.0;}
if(version){var version_array=version.split(' ')[1].split(',');return version_array[0]+'.'+version_array[1];}
return 0;},isEmail:function(str){var email_regex=new RegExp("^[a-zA-Z0-9'._%+-]+@([a-zA-Z0-9-]+\\.)+([a-zA-Z]{2}|aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel)$",'i');return email_regex.exec(str)?true:false;},translate:function(eng,id){var args=Array.prototype.slice.call(arguments);args=(args.length>2)?args.slice(2).reverse():null;if(typeof Features!='undefined'&&Features.emit_translation_tags)
{return id;}
var t_part=(typeof(enable_ajax_translation)!='undefined'&&enable_ajax_translation)?'^'+id+'^':'';var truncate=function(text,id){var delimiter_pos=id.search(':');if(delimiter_pos==-1)return text;var parts=id.split(':',2);var max_length=parts[1];return text.substring(0,max_length);};var sprintf2=function(text,id){if(!text)return text;if(!args)return truncate(text,id);var counter=args.length;for(index in args){text=text.replace('%'+counter,args[index]);counter--;}
return truncate(text,id)+t_part;};if(typeof(LANGUAGE)=='undefined'||LANGUAGE=='eng'){return sprintf2(eng,id);}
else if(!TRANSLATIONS[id]){if(show_untranslated_marker){return eng.replace(/[A-Za-z0-9]/g,'?');}
else{return sprintf2(eng,id);}}
return sprintf2(TRANSLATIONS[id][LANGUAGE]||eng,id)+t_part;},local_date:function(timestamp,format,timezone_offset,options){if(!timestamp)return 0;if(isNaN(parseInt(timestamp)))return timestamp;if(isNaN(parseInt(timezone_offset)))timezone_offset=user_timezone_offset;if(!options)options=0;if(!format)format='RFC_822';var current_date=new Date();var local_offset=current_date.getTimezoneOffset()*60;var offset_from_local=timezone_offset+local_offset;var final_timestamp_in_milli=(offset_from_local+parseInt(timestamp))*1000;var final_date=new Date(final_timestamp_in_milli);if(options==1)
{if(current_date.getDate()==final_date.getDate()&&current_date.getMonth()==final_date.getMonth()&&current_date.getFullYear()==final_date.getFullYear())
{final_date='Today';}
else if(current_date.getDate()==final_date.getDate()+1&&current_date.getMonth()==final_date.getMonth()&&current_date.getFullYear()==final_date.getFullYear())
{final_date='Yesterday';}
else
{final_date=$.datepicker.formatDate(format,final_date);}}
else
{final_date=$.datepicker.formatDate(format,final_date);}
return final_date;}},fsize:function(bytes,precision)
{if(precision==undefined)precision=1;bytes=parseInt(bytes);var data_size_units=['B','KB','MB','GB','TB'];var i=Math.floor(Math.log(bytes)/Math.log(1024));if(i<0)
{i=0;}
if(i>=data_size_units.length)
{i=data_size_units.length-1;}
var formatted_num=new Number(bytes/Math.pow(1024,i)).toFixed(precision);var unit=data_size_units[i];return formatted_num+' '+unit;},text:function(text,text_filter){if(!window['__convert_to_text_div'])window['__convert_to_text_div']=document.createElement('div');var div=window['__convert_to_text_div'];(typeof div.innerText!='undefined')?div.innerText=text:div.textContent=((text===0)?text+'':text||'');var prefiltered_text=div.innerHTML.replace(/"/g,'&quot;').replace(/'/g,'&#039;');if(text_filter)
{return text_filter(prefiltered_text);}
return prefiltered_text;},capitalize:function(str)
{return(str+'').replace(/^([a-z])|\s+([a-z])|_([a-z])/g,function(word)
{return word.toUpperCase();});},log:function()
{if((typeof(live_site)=='undefined'||!live_site)&&typeof(console)!='undefined'&&console.log&&console.log.constructor==Function)
{console.log.apply(console,arguments);}},throw_error:function()
{error_arguments=$j.makeArray(arguments);error_arguments.unshift('Uncaught Error:');$j.log.apply($j,error_arguments);},not_implemented:function(message)
{$j.throw_error('not implement yet',message);},abstract_function:function()
{$j.throw_error('Abstract function not defined in',this);},size:function(object)
{if(object.hasOwnProperty('length'))return object.length;var length=0;for(var i in object)length++;return length;},in_array:function(elem,array)
{return $j.inArray(elem,array)!=-1;},index_by:function(array,index)
{var indexed_array={};for(var i in array)
{var object=array[i];indexed_array[object[index]]=object;}
return indexed_array;},force_reload_DOM_event:function()
{$j('body').addClass(' ').removeClass(' ');},nl2br:function(str)
{return str.replace(/(\n\r|\n)/g,'<br/>');},br2nl:function(str)
{return str.replace(/(<br\/>|<br>)/gi,"\n");}});$.extend($.expr[':'],{focus:function(element){return element==document.activeElement;}});$t=$.box.translate;$.fn.extend({attach:function(element){var offset=$j(this).offset();var height=$j(this).outerHeight();$j(element).css({position:'absolute',top:offset.top+height,left:offset.left});return this;},boxDatePicker:function(settings){var box_settings=$.extend({},DATEPICKER_DEFAULTS,{mandatory:true},settings);this.datepicker(box_settings);},fastHtml:function(html){if(!html)return this.html();return this.each(function(){this.innerHTML=html;});},fastText:function(str){if(!str)return this.text();return this.each(function(){(typeof this.innerText!='undefined')?this.innerText=str:this.textContent=str;});},hasParent:function(str){return(this.parents(str).length>0);},setClass:function(className,state){return this[state?'addClass':'removeClass'](className);}});$.addRequestTokens=function(o){$.box.appendRequestToken=function(form){var j_request_token=$(form).find("input[name='request_token']");if(j_request_token.length>0)
{j_request_token.val(window.request_token);}
else
{$('<input type="hidden" name="request_token" style="display: none;" />').val(window.request_token).appendTo(form);}};$('form').each(function(){var j_this=$(this);if(j_this.prop('method').toLowerCase()!='post')return;if(j_this.find("input[name='request_token']").length>0)return;$.box.appendRequestToken(this);});};$(function(){$.addRequestTokens();$('textarea[maxlength][maxlength!=-1]').each(function()
{$(this).maxLength($(this).attr('maxlength'));});if($.validator)
{$.validator.setDefaults({errorElement:'span',errorPlacement:function(error,element){error.addClass('img icon sprite_16x16 sprite_16x16_error').css('position','absolute').text('').insertAfter(element);var el_position=element.position();var el_outer_height=element.outerHeight();var top_margin=(el_outer_height-error.outerHeight())/2;var el_margin_top=parseInt(element.css('margin-top').replace('px',''))||0,el_margin_left=parseInt(element.css('margin-left').replace('px',''))||0;var error_margin_right=error.css('margin-right');error_margin_right=error_margin_right.substring(0,error_margin_right.length-2);var error_margin_top=error.css('margin-top');error_margin_top=error_margin_top.substring(0,error_margin_top.length-2);if(isNaN(parseInt(error_margin_right)))error_margin_right=0;if(isNaN(parseInt(error_margin_top)))error_margin_top=0;error_margin_top=parseInt(error_margin_top);var left=el_position.left+element.outerWidth()-error.outerWidth()-error_margin_right+el_margin_left;var pos_top=el_position.top+top_margin+error_margin_top+el_margin_top;error.css('left',left+'px').css('top',pos_top+'px');if($j('.error_msg').is(':visible'))
{error.data('position_fixed',true);}
error.removeClass('img icon sprite_16x16 sprite_16x16_error');},showErrors:function(errorMap,errorList){this.defaultShowErrors();var list_length=errorList.length;for(var i=0;this.errorList[i];i++){var error_info=this.errorList[i];var element=error_info.element;var error=this.errorsFor(element);if($j(error_info.message).find('a').get(0))
{Canvas.get().add_user_form.showErrors(element,error_info.message,error);}
else
{error.addClass('img icon sprite_16x16 sprite_16x16_error').text('').attr('data-tooltip',error_info.message);$j(element).attr('data-tooltip',error_info.message);var j_error_msg=$j('.error_msg');if(j_error_msg.is(':visible')&&!error.data('position_fixed'))
{error.css('top',error.position().top+j_error_msg.outerHeight()).data('position_fixed',true);}}
$j(element).parent().children('label').addClass('error');$j(element).parent().children('label').contents().filter(function(){return this.nodeType==3;}).wrap('<span></span>');$j(element).parent().children('label').children('span').attr('data-tooltip',error_info.message);if(list_length==1&&!$j(element).is(':focus'))
{var error_element=error;if(error.attr('generated'))
{error_element=error.parent().find('input');}
Common_Global.show_tooltips({element:error_element.get(0),duration:400});}}
var resize_timer;$j(window).resize(function(){clearTimeout(resize_timer);resize_timer=setTimeout(function(){$j('.error.icon').remove();},200);});},unhighlight:function(element,errorClass,validClass)
{$j(element).removeClass(errorClass).addClass(validClass);$j(element).removeAttr('title data-tooltip');$j(element).parent().children('label').removeClass('error');$j(element).parent().children('label').children('span').removeAttr('title data-tooltip');var j_form_help=$j(element).parent().find('.form_help');if(j_form_help.data('form_help_text'))
{j_form_help.text(j_form_help.data('form_help_text'));j_form_help.removeClass('ptn mtn');}}});}});$.in_error=0;$.oldAjax=$.ajax;$.ajax=function(s){var oldSuccess=s.success;s.success=function(response){$.in_error=0;if(typeof response=='object'&&response)
{if(response.profiling_message)
{alert(response.profiling_message);s.url=s.url+'&no_profiling_message=1';$.oldAjax(s);return false;}
if(response.e_session)
{var path_prefix=window.path_prefix?window.path_prefix:'';window.onbeforeunload=null;if(window.embed_widget)
{embed_widget.handle_ajax_error(response);return false;}
else if(response.errormessage=='session limit reached')
{Box_Global.window_location(site_root+path_prefix+'logout');}
else if(response.errormessage=='request token invalid')
{alert('The page you were viewing has expired. Please try your request again.');window.location.reload();}
else if(response.errormessage=='redirect required')
{alert('The page you were viewing has expired. Please try your request again.');window.location.reload();}
else if(response.errormessage=='feature access not allowed')
{Box_Global.window_location(site_root+'master/settings/account');}
else
{Box_Global.window_location(site_root+path_prefix+'login');}
return false;}}
if($.isFunction(oldSuccess))oldSuccess.apply(this,arguments);$.ajaxPerf.measureCallback(s);};var oldError=s.error;s.error=function(xhr,error,exception){if($.popup&&$.popup.get().is(':visible')){$.popup.revert();}
if($.in_error==0){$.in_error=1;var url=site_root+'index.php?rm=box_ajax_log_response_error';if(error&&error!='timeout')
{var code=xhr.status;var response=xhr.responseText;try
{var statustext=xhr.statusText;}
catch(e)
{var statustext='';}}
var data={error:error,code:typeof code=='undefined'?'':code,response:typeof response=='undefined'?'':response,statustext:typeof statustext=='undefined'?'':statustext,exception:typeof exception=='undefined'?'':exception,request_url:s.url,request_type:s.type,request_data:s.data,current_location:window.location.href};$.post(url,data);}
if($.isFunction(oldError))oldError.apply(this,arguments);};if(typeof current_rm!='undefined'&&((current_rm=='box_shared_show'||current_rm=='box_shared_show_by_name'||current_rm=='box_view_vanity_url')||(window.embed_widget&&current_rm=='box_files')))
{var query_params={context:Canvas.get().context()};if(window.Features&&Features.embed_widget_partner_integration&&window.additional_context)
{query_params.additional_context=window.additional_context;}
var query=$j.box.formatQuery(query_params);if(typeof s.data=='string')
{s.data+=(s.data?'&':'')+query;}
else
{s.url+=(s.url.indexOf('?')>0?'&':'?')+query;}}
if(window.embed_widget&&window.widget_hash)
{if(typeof s.data=='string')
{s.data+=(s.data?'&':'')+'widget_hash='+encodeURIComponent(window.widget_hash);}
else
{s.url+=(s.url.indexOf('?')>0?'&':'?')+'widget_hash='+encodeURIComponent(window.widget_hash);}}
var progress_callback=s.progress_callback;if(progress_callback&&!$.isFunction(progress_callback))
{var request_key=Math.random();if(typeof s.data!=="string")
{s.data.request_key_for_adding_progress_results=request_key;}
else
{s.data+=(s.data?'&':'')+'request_key_for_adding_progress_results='+encodeURIComponent(request_key);}
var request_finished=false;var failed_attempt_count=0;var get_progress_results=function()
{$.getJSON('/index.php?rm=box_get_progress_results',{request_key:request_key},function(json)
{var progress_finished=json.status=='finished';if(progress_finished||request_finished)
{progress_callback(json.progress_results,request_finished);return;}
else if(json.status=='progressing')
{progress_callback(json.progress_results);setTimeout(get_progress_results,100);}
else if(json.status=='not_started'||json.status=='empty_progress_results')
{failed_attempt_count++;if(failed_attempt_count>=50)return;setTimeout(get_progress_results,100);}});};var old_success=s.success;s.success=function(json)
{request_finished=true;var progress_results=[];progress_callback(progress_results,request_finished);old_success(json);};}
$.oldAjax(s);if(get_progress_results)
{get_progress_results();}};$.oldPost=$.post;$.post=function(url,data,callback,type,progress_callback)
{if(jQuery.isEmptyObject(data))
{if(typeof data!=="string")
{data={'dummy_variable_that_wont_have_namespace_conflict':"true"};}}
$.oldPost(url,data,callback,type,progress_callback);};$.isEmptyObj=function(o){var i,v;if($.typeOf(o)==='object'){for(i in o){v=o[i];if(v!==undefined&&$.typeOf(v)!=='function'){return false;}}}return true;};$.typeOf=function(value){var s=typeof value;if(s==='object'){if(value){if(typeof value.length==='number'&&!(value.propertyIsEnumerable('length'))&&typeof value.splice==='function'){s='array';}}else{s='null';}}return s;};$.ps_timeout_id=null;$.fn.password_strength=function(options){options=options||{};var test_password=function()
{if($._ps_timeout_id)
{clearTimeout($._ps_timeout_id);$._ps_timeout_id=null;}
var me=this;$._ps_timeout_id=setTimeout(function(){$j.postJSON('/index.php?rm=box_password_strength_meter',{password:me.value},function(json)
{$j('#password_strength_meter').parent().html(json.html);});},75);};if(this.val())
{$j.postJSON('/index.php?rm=box_password_strength_meter',{password:this.val()},function(json)
{$j('#password_strength_meter').parent().html(json.html);});}
this.keyup(test_password).blur(test_password);};$.stopEvent=function(e){if(!e)e=window.event;e.cancelBubble=true;e.returnValue=false;if(e.stopPropagation){e.stopPropagation();e.preventDefault();}
return false;};$.fn.loading_dots=function(options){options=options||{};options.period=options.period||400;this.append('<span class="loading_dots">.</span>');var me=this.find('.loading_dots');timer_dots=window.setInterval(function()
{var dots='.';var current=me.text();if(current.length<3)
{dots+=(current.length==1)?'.':'..';}
me.text(dots);},options.period);};$.fn.hasAncestor=function(ancestor){return!!$(this).closest(ancestor).length;};$.fn.copyCSS=function(src,properties){src=$(src);var dest=$(this);var length=properties.length;var arr=[];for(var i=0;i<length;i++)
{var prop=properties[i];if({padding:1,margin:1}[prop])
{arr=[prop+'-top',prop+'-right',prop+'-bottom',prop+'-left'];copyCSSFromArray(dest,src,arr);}
else if(prop=='font')
{arr=[prop+'-size',prop+'-family',prop+'-style',prop+'-weight'];copyCSSFromArray(dest,src,arr);}
else
{dest.css(prop,src.css(prop));}}
function copyCSSFromArray(dest,src,arr)
{var length=arr.length;for(var i=0;i<length;i++)
{var currArr=arr[i];dest.css(currArr,src.css(currArr));}}
return dest;};$.fn.rotator=function(options)
{options=options||{};options.step=options.step||1;options.virtual_frames=options.virtual_frames||0;return this.each(function()
{var current=0,i;var arrow_left=$(this).find('.slideshow_button_left');var arrow_right=$(this).find('.slideshow_button_right');var items=$(this).find('.slideshow_tab_item');var count=items.length;var frame=$(this).find('.slideshow_tab_item').filter(':visible').length;var step=options.step;if(step=='frame')step=frame;if(count>frame)
{arrow_right.removeClass('slideshow_button_right_disabled');arrow_left.click(function()
{if(current<=0)return false;items.hide();current-=step;for(i=0;i<step;i++)
{$(items[current+i]).show();}
if(current==0)$(this).addClass('slideshow_button_left_disabled');if(current+frame<count)arrow_right.removeClass('slideshow_button_right_disabled');});arrow_right.click(function()
{if(count<=current+step)return false;items.hide();for(i=0;i<step;i++)
{if(current+step+i<=count)
{$(items[current+step+i]).show();}}
current+=step;if(count<=current+step)$(this).addClass('slideshow_button_right_disabled');if(current)arrow_left.removeClass('slideshow_button_left_disabled');});}
$j(this).bind('reset',function(){arrow_left.addClass('slideshow_button_left_disabled');arrow_right.toggleClass('slideshow_button_right_disabled',count<=frame);current=0;items.hide();for(i=0;i<step;i++)
{$(items[current+i]).show();}});});};})(jQuery);function replaceHtml(el,html){var oldEl=typeof el==="string"?document.getElementById(el):el;var newEl=oldEl.cloneNode(false);newEl.innerHTML=html;oldEl.parentNode.replaceChild(newEl,oldEl);return newEl;}
function escape_html_tags(tag_array,html_string)
{var okay_tags="";for(var j=0;j<tag_array.length;j++)
{if(tag_array[j]=="a")
{okay_tags+="(?!/?"+tag_array[j]+"[^>]*>)";var regEx_a=new RegExp('<a\\s[^>]*(href="[^"]*")[^>]*>',"g");html_string=html_string.replace(regEx_a,'<a $1 target="_blank">');regEx_a=new RegExp('<a\\s[^h][^>]*>',"g");html_string=html_string.replace(regEx_a,'&lt;a>');}
else
{okay_tags+="(?!/?"+tag_array[j]+">)";var regEx=new RegExp('<'+tag_array[j]+'\\s[^>]*>',"g");html_string=html_string.replace(regEx,'<'+tag_array[j]+'>');}
regEx=new RegExp('</'+tag_array[j]+'\\s[^>]*>');html_string=html_string.replace(regEx,'</'+tag_array[j]+'>');}
var regex_string='<'+okay_tags;try
{var escape_regex=new RegExp(regex_string,"gi");}
catch(e)
{console.log(e);}
html_string=html_string.replace(escape_regex,'&lt;');html_string=html_string.replace(new RegExp('\n',"g"),'<br>');html_string=html_string.replace(new RegExp('\r',"g"),'<br>');return html_string;}
function escape_markup_tags(html_string)
{var tag_array=new Array("b","strong","i","em","u","a","span");return escape_html_tags(tag_array,html_string);}
function array_to_object(arr,params){if(arr==null||arr.constructor!=Array)return{};var toLowerCase=(params&&params.toLowerCase)||false;var keyBecomesValue=(params&&params.keyBecomesValue)||false;var defaultKey=(params&&params.defaultKey)||true;var obj={},value;for(var i=arr.length;i--;)
{value=toLowerCase?arr[i].toLowerCase():arr[i];if(!keyBecomesValue)obj[value]=defaultKey;else obj[i]=value;}
return obj;}
function fix_IE(version,versions_below,ele_to_fix,css_obj)
{if($j.browser.msie)
{var current_version=parseInt($j.browser.version,10);var which_version=versions_below?current_version<=version:current_version==version;if(which_version)
{setTimeout(function(){ele_to_fix.css(css_obj);},500);}}}
function array_flip_expanded(object)
{var result={};var value;for(key in object)
{value=object[key];if($j.isArray(value)){$j.each(value,function(index,expanded_value)
{result[expanded_value]=key;});}
else
{result[value]=key;}}
return result;};(function($){$.fn.ajaxSubmit=function(options){if(!this.length){log('ajaxSubmit: skipping submit process - no element selected');return this;}
var method,action,url,$form=this;if(typeof options=='function'){options={success:options};}
method=this.attr('method');action=this.attr('action');url=(typeof action==='string')?$.trim(action):'';url=url||window.location.href||'';if(url){url=(url.match(/^([^#]+)/)||[])[1];}
options=$.extend(true,{url:url,success:$.ajaxSettings.success,type:method||'GET',iframeSrc:/^https/i.test(window.location.href||'')?'javascript:false':'about:blank'},options);var veto={};this.trigger('form-pre-serialize',[this,options,veto]);if(veto.veto){log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');return this;}
if(options.beforeSerialize&&options.beforeSerialize(this,options)===false){log('ajaxSubmit: submit aborted via beforeSerialize callback');return this;}
var traditional=options.traditional;if(traditional===undefined){traditional=$.ajaxSettings.traditional;}
var qx,n,v,a=this.formToArray(options.semantic);if(options.data){options.extraData=options.data;qx=$.param(options.data,traditional);}
if(options.beforeSubmit&&options.beforeSubmit(a,this,options)===false){log('ajaxSubmit: submit aborted via beforeSubmit callback');return this;}
this.trigger('form-submit-validate',[a,this,options,veto]);if(veto.veto){log('ajaxSubmit: submit vetoed via form-submit-validate trigger');return this;}
var q=$.param(a,traditional);if(qx){q=(q?(q+'&'+qx):qx);}
if(options.type.toUpperCase()=='GET'){options.url+=(options.url.indexOf('?')>=0?'&':'?')+q;options.data=null;}
else{options.data=q;}
var callbacks=[];if(options.resetForm){callbacks.push(function(){$form.resetForm();});}
if(options.clearForm){callbacks.push(function(){$form.clearForm(options.includeHidden);});}
if(!options.dataType&&options.target){var oldSuccess=options.success||function(){};callbacks.push(function(data){var fn=options.replaceTarget?'replaceWith':'html';$(options.target)[fn](data).each(oldSuccess,arguments);});}
else if(options.success){callbacks.push(options.success);}
options.success=function(data,status,xhr){var context=options.context||options;for(var i=0,max=callbacks.length;i<max;i++){callbacks[i].apply(context,[data,status,xhr||$form,$form]);}};var fileInputs=$('input:file:enabled[value]',this);var hasFileInputs=fileInputs.length>0;var mp='multipart/form-data';var multipart=($form.attr('enctype')==mp||$form.attr('encoding')==mp);var fileAPI=!!(hasFileInputs&&fileInputs.get(0).files&&window.FormData);log("fileAPI :"+fileAPI);var shouldUseFrame=(hasFileInputs||multipart)&&!fileAPI;if(options.iframe!==false&&(options.iframe||shouldUseFrame)){if(options.closeKeepAlive){$.get(options.closeKeepAlive,function(){fileUploadIframe(a);});}
else{fileUploadIframe(a);}}
else if((hasFileInputs||multipart)&&fileAPI){options.progress=options.progress||$.noop;fileUploadXhr(a);}
else{$.ajax(options);}
this.trigger('form-submit-notify',[this,options]);return this;function fileUploadXhr(a){var formdata=new FormData();for(var i=0;i<a.length;i++){if(a[i].type=='file')
continue;formdata.append(a[i].name,a[i].value);}
$form.find('input:file:enabled').each(function(){var name=$(this).attr('name'),files=this.files;if(name){for(var i=0;i<files.length;i++)
formdata.append(name,files[i]);}});if(options.extraData){for(var k in options.extraData)
formdata.append(k,options.extraData[k])}
options.data=null;var _beforeSend=options.beforeSend;options.beforeSend=function(xhr,options){options.data=formdata;if(xhr.upload){xhr.upload.onprogress=function(event){options.progress(event.position,event.total);}}
if(_beforeSend)
_beforeSend.call(options,xhr,options);}
$.ajax(options);}
function fileUploadIframe(a){var form=$form[0],el,i,s,g,id,$io,io,xhr,sub,n,timedOut,timeoutHandle;var useProp=!!$.fn.prop;if(a){if(useProp){for(i=0;i<a.length;i++){el=$(form[a[i].name]);el.prop('disabled',false);}}else{for(i=0;i<a.length;i++){el=$(form[a[i].name]);el.removeAttr('disabled');}};}
if($(':input[name=submit],:input[id=submit]',form).length){alert('Error: Form elements must not have name or id of "submit".');return;}
s=$.extend(true,{},$.ajaxSettings,options);s.context=s.context||s;id='jqFormIO'+(new Date().getTime());if(s.iframeTarget){$io=$(s.iframeTarget);n=$io.attr('name');if(n==null)
$io.attr('name',id);else
id=n;}
else{$io=$('<iframe name="'+id+'" src="'+s.iframeSrc+'" />');$io.css({position:'absolute',top:'-1000px',left:'-1000px'});}
io=$io[0];xhr={aborted:0,responseText:null,responseXML:null,status:0,statusText:'n/a',getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(status){var e=(status==='timeout'?'timeout':'aborted');log('aborting upload... '+e);this.aborted=1;$io.attr('src',s.iframeSrc);xhr.error=e;s.error&&s.error.call(s.context,xhr,e,status);g&&$.event.trigger("ajaxError",[xhr,s,e]);s.complete&&s.complete.call(s.context,xhr,e);}};g=s.global;if(g&&!$.active++){$.event.trigger("ajaxStart");}
if(g){$.event.trigger("ajaxSend",[xhr,s]);}
if(s.beforeSend&&s.beforeSend.call(s.context,xhr,s)===false){if(s.global){$.active--;}
return;}
if(xhr.aborted){return;}
sub=form.clk;if(sub){n=sub.name;if(n&&!sub.disabled){s.extraData=s.extraData||{};s.extraData[n]=sub.value;if(sub.type=="image"){s.extraData[n+'.x']=form.clk_x;s.extraData[n+'.y']=form.clk_y;}}}
if(!s.extraData)
{s.extraData={}}
s.extraData['jform']=1;var CLIENT_TIMEOUT_ABORT=1;var SERVER_ABORT=2;function getDoc(frame){var doc=frame.contentWindow?frame.contentWindow.document:frame.contentDocument?frame.contentDocument:frame.document;return doc;}
var csrf_token=$('meta[name=csrf-token]').attr('content');var csrf_param=$('meta[name=csrf-param]').attr('content');if(csrf_param&&csrf_token){s.extraData=s.extraData||{};s.extraData[csrf_param]=csrf_token;}
function doSubmit(){var t=$form.attr('target'),a=$form.attr('action');form.setAttribute('target',id);if(!method){form.setAttribute('method','POST');}
if(a!=s.url){form.setAttribute('action',s.url);}
if(!s.skipEncodingOverride&&(!method||/post/i.test(method))){$form.attr({encoding:'multipart/form-data',enctype:'multipart/form-data'});}
if(s.timeout){timeoutHandle=setTimeout(function(){timedOut=true;cb(CLIENT_TIMEOUT_ABORT);},s.timeout);}
function checkState(){try{var state=getDoc(io).readyState;log('state = '+state);if(state.toLowerCase()=='uninitialized')
setTimeout(checkState,50);}
catch(e){log('Server abort: ',e,' (',e.name,')');cb(SERVER_ABORT);timeoutHandle&&clearTimeout(timeoutHandle);timeoutHandle=undefined;}}
var extraInputs=[];try{if(s.extraData){for(var n in s.extraData){extraInputs.push($('<input type="hidden" name="'+n+'">').attr('value',s.extraData[n]).appendTo(form)[0]);}}
if(!s.iframeTarget){$io.appendTo('body');io.attachEvent?io.attachEvent('onload',cb):io.addEventListener('load',cb,false);}
setTimeout(checkState,15);form.submit();}
finally{form.setAttribute('action',a);if(t){form.setAttribute('target',t);}else{$form.removeAttr('target');}
$(extraInputs).remove();}}
if(s.forceSync){doSubmit();}
else{setTimeout(doSubmit,10);}
var data,doc,domCheckCount=50,callbackProcessed;function cb(e){if(xhr.aborted||callbackProcessed){return;}
try{doc=getDoc(io);}
catch(ex){log('cannot access response document: ',ex);e=SERVER_ABORT;}
if(e===CLIENT_TIMEOUT_ABORT&&xhr){xhr.abort('timeout');return;}
else if(e==SERVER_ABORT&&xhr){xhr.abort('server abort');return;}
if(!doc||doc.location.href==s.iframeSrc){if(!timedOut)
return;}
io.detachEvent?io.detachEvent('onload',cb):io.removeEventListener('load',cb,false);var status='success',errMsg;try{if(timedOut){throw'timeout';}
var isXml=s.dataType=='xml'||doc.XMLDocument||$.isXMLDoc(doc);log('isXml='+isXml);if(!isXml&&window.opera&&(doc.body==null||doc.body.innerHTML=='')){if(--domCheckCount){log('requeing onLoad callback, DOM not available');setTimeout(cb,250);return;}}
var docRoot=doc.body?doc.body:doc.documentElement;xhr.responseText=docRoot?docRoot.innerHTML:null;xhr.responseXML=doc.XMLDocument?doc.XMLDocument:doc;if(isXml)
s.dataType='xml';xhr.getResponseHeader=function(header){var headers={'content-type':s.dataType};return headers[header];};if(docRoot){xhr.status=Number(docRoot.getAttribute('status'))||xhr.status;xhr.statusText=docRoot.getAttribute('statusText')||xhr.statusText;}
var dt=(s.dataType||'').toLowerCase();var scr=/(json|script|text)/.test(dt);if(scr||s.textarea){var ta=doc.getElementsByTagName('textarea')[0];if(ta){xhr.responseText=ta.value;xhr.status=Number(ta.getAttribute('status'))||xhr.status;xhr.statusText=ta.getAttribute('statusText')||xhr.statusText;}
else if(scr){var pre=doc.getElementsByTagName('pre')[0];var b=doc.getElementsByTagName('body')[0];if(pre){xhr.responseText=pre.textContent?pre.textContent:pre.innerText;}
else if(b){xhr.responseText=b.textContent?b.textContent:b.innerText;}}}
else if(dt=='xml'&&!xhr.responseXML&&xhr.responseText!=null){xhr.responseXML=toXml(xhr.responseText);}
try{data=httpData(xhr,dt,s);}
catch(e){status='parsererror';xhr.error=errMsg=(e||status);}}
catch(e){log('error caught: ',e);status='error';xhr.error=errMsg=(e||status);}
if(xhr.aborted){log('upload aborted');status=null;}
if(xhr.status){status=(xhr.status>=200&&xhr.status<300||xhr.status===304)?'success':'error';}
if(status==='success'){s.success&&s.success.call(s.context,data,'success',xhr);g&&$.event.trigger("ajaxSuccess",[xhr,s]);}
else if(status){if(errMsg==undefined)
errMsg=xhr.statusText;s.error&&s.error.call(s.context,xhr,status,errMsg);g&&$.event.trigger("ajaxError",[xhr,s,errMsg]);}
g&&$.event.trigger("ajaxComplete",[xhr,s]);if(g&&!--$.active){$.event.trigger("ajaxStop");}
s.complete&&s.complete.call(s.context,xhr,status);callbackProcessed=true;if(s.timeout)
clearTimeout(timeoutHandle);setTimeout(function(){if(!s.iframeTarget)
$io.remove();xhr.responseXML=null;},100);}
var toXml=$.parseXML||function(s,doc){if(window.ActiveXObject){doc=new ActiveXObject('Microsoft.XMLDOM');doc.async='false';doc.loadXML(s);}
else{doc=(new DOMParser()).parseFromString(s,'text/xml');}
return(doc&&doc.documentElement&&doc.documentElement.nodeName!='parsererror')?doc:null;};var parseJSON=$.parseJSON||function(s){return window['eval']('('+s+')');};var httpData=function(xhr,type,s){var ct=xhr.getResponseHeader('content-type')||'',xml=type==='xml'||!type&&ct.indexOf('xml')>=0,data=xml?xhr.responseXML:xhr.responseText;if(xml&&data.documentElement.nodeName==='parsererror'){$.error&&$.error('parsererror');}
if(s&&s.dataFilter){data=s.dataFilter(data,type);}
if(typeof data==='string'){if(type==='json'||!type&&ct.indexOf('json')>=0){data=parseJSON(data);}else if(type==="script"||!type&&ct.indexOf("javascript")>=0){$.globalEval(data);}}
return data;};}};$.fn.ajaxForm=function(options){if(this.length===0){var o={s:this.selector,c:this.context};if(!$.isReady&&o.s){log('DOM not ready, queuing ajaxForm');$(function(){$(o.s,o.c).ajaxForm(options);});return this;}
log('terminating; zero elements found by selector'+($.isReady?'':' (DOM not ready)'));return this;}
return this.ajaxFormUnbind().bind('submit.form-plugin',function(e){if(!e.isDefaultPrevented()){e.preventDefault();$(this).ajaxSubmit(options);}}).bind('click.form-plugin',function(e){var target=e.target;var $el=$(target);if(!($el.is(":submit,input:image"))){var t=$el.closest(':submit');if(t.length==0){return;}
target=t[0];}
var form=this;form.clk=target;if(target.type=='image'){if(e.offsetX!=undefined){form.clk_x=e.offsetX;form.clk_y=e.offsetY;}else if(typeof $.fn.offset=='function'){var offset=$el.offset();form.clk_x=e.pageX-offset.left;form.clk_y=e.pageY-offset.top;}else{form.clk_x=e.pageX-target.offsetLeft;form.clk_y=e.pageY-target.offsetTop;}}
setTimeout(function(){form.clk=form.clk_x=form.clk_y=null;},100);});};$.fn.ajaxFormUnbind=function(){return this.unbind('submit.form-plugin click.form-plugin');};$.fn.formToArray=function(semantic){var a=[];if(this.length===0){return a;}
var form=this[0];var els=semantic?form.getElementsByTagName('*'):form.elements;if(!els){return a;}
var i,j,n,v,el,max,jmax;for(i=0,max=els.length;i<max;i++){el=els[i];n=el.name;if(!n){continue;}
if(semantic&&form.clk&&el.type=="image"){if(!el.disabled&&form.clk==el){a.push({name:n,value:$(el).val(),type:el.type});a.push({name:n+'.x',value:form.clk_x},{name:n+'.y',value:form.clk_y});}
continue;}
v=$.fieldValue(el,true);if(v&&v.constructor==Array){for(j=0,jmax=v.length;j<jmax;j++){a.push({name:n,value:v[j]});}}
else if(v!==null&&typeof v!='undefined'){a.push({name:n,value:v,type:el.type});}}
if(!semantic&&form.clk){var $input=$(form.clk),input=$input[0];n=input.name;if(n&&!input.disabled&&input.type=='image'){a.push({name:n,value:$input.val()});a.push({name:n+'.x',value:form.clk_x},{name:n+'.y',value:form.clk_y});}}
return a;};$.fn.formSerialize=function(semantic){return $.param(this.formToArray(semantic));};$.fn.fieldSerialize=function(successful){var a=[];this.each(function(){var n=this.name;if(!n){return;}
var v=$.fieldValue(this,successful);if(v&&v.constructor==Array){for(var i=0,max=v.length;i<max;i++){a.push({name:n,value:v[i]});}}
else if(v!==null&&typeof v!='undefined'){a.push({name:this.name,value:v});}});return $.param(a);};$.fn.fieldValue=function(successful){for(var val=[],i=0,max=this.length;i<max;i++){var el=this[i];var v=$.fieldValue(el,successful);if(v===null||typeof v=='undefined'||(v.constructor==Array&&!v.length)){continue;}
v.constructor==Array?$.merge(val,v):val.push(v);}
return val;};$.fieldValue=function(el,successful){var n=el.name,t=el.type,tag=el.tagName.toLowerCase();if(successful===undefined){successful=true;}
if(successful&&(!n||el.disabled||t=='reset'||t=='button'||(t=='checkbox'||t=='radio')&&!el.checked||(t=='submit'||t=='image')&&el.form&&el.form.clk!=el||tag=='select'&&el.selectedIndex==-1)){return null;}
if(tag=='select'){var index=el.selectedIndex;if(index<0){return null;}
var a=[],ops=el.options;var one=(t=='select-one');var max=(one?index+1:ops.length);for(var i=(one?index:0);i<max;i++){var op=ops[i];if(op.selected){var v=op.value;if(!v){v=(op.attributes&&op.attributes['value']&&!(op.attributes['value'].specified))?op.text:op.value;}
if(one){return v;}
a.push(v);}}
return a;}
return $(el).val();};$.fn.clearForm=function(includeHidden){return this.each(function(){$('input,select,textarea',this).clearFields(includeHidden);});};$.fn.clearFields=$.fn.clearInputs=function(includeHidden){var re=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var t=this.type,tag=this.tagName.toLowerCase();if(re.test(t)||tag=='textarea'||(includeHidden&&/hidden/.test(t))){this.value='';}
else if(t=='checkbox'||t=='radio'){this.checked=false;}
else if(tag=='select'){this.selectedIndex=-1;}});};$.fn.resetForm=function(){return this.each(function(){if(typeof this.reset=='function'||(typeof this.reset=='object'&&!this.reset.nodeType)){this.reset();}});};$.fn.enable=function(b){if(b===undefined){b=true;}
return this.each(function(){this.disabled=!b;});};$.fn.selected=function(select){if(select===undefined){select=true;}
return this.each(function(){var t=this.type;if(t=='checkbox'||t=='radio'){this.checked=select;}
else if(this.tagName.toLowerCase()=='option'){var $sel=$(this).parent('select');if(select&&$sel[0]&&$sel[0].type=='select-one'){$sel.find('option').selected(false);}
this.selected=select;}});};$.fn.ajaxSubmit.debug=false;function log(){if(!$.fn.ajaxSubmit.debug)
return;var msg='[jquery.form] '+Array.prototype.join.call(arguments,'');if(window.console&&window.console.log){window.console.log(msg);}
else if(window.opera&&window.opera.postError){window.opera.postError(msg);}};})(jQuery);(function($){$.extend($.fn,{validate:function(options){if(!this.length){options&&options.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing");return;}
var validator=$.data(this[0],'validator');if(validator){return validator;}
validator=new $.validator(options,this[0]);$.data(this[0],'validator',validator);if(validator.settings.onsubmit){this.find("input, button").filter(".cancel").click(function(){validator.cancelSubmit=true;});if(validator.settings.submitHandler){this.find("input, button").filter(":submit").click(function(){validator.submitButton=this;});}
this.submit(function(event){if(validator.settings.debug)
event.preventDefault();function handle(){if(validator.settings.submitHandler){if(validator.submitButton){var hidden=$("<input type='hidden'/>").attr("name",validator.submitButton.name).val(validator.submitButton.value).appendTo(validator.currentForm);}
validator.settings.submitHandler.call(validator,validator.currentForm);if(validator.submitButton){hidden.remove();}
return false;}
return true;}
if(validator.cancelSubmit){validator.cancelSubmit=false;return handle();}
if(validator.form()){if(validator.pendingRequest){validator.formSubmitted=true;return false;}
return handle();}else{validator.focusInvalid();return false;}});}
return validator;},valid:function(){if($(this[0]).is('form')){return this.validate().form();}else{var valid=true;var validator=$(this[0].form).validate();this.each(function(){valid&=validator.element(this);});return valid;}},removeAttrs:function(attributes){var result={},$element=this;$.each(attributes.split(/\s/),function(index,value){result[value]=$element.attr(value);$element.removeAttr(value);});return result;},rules:function(command,argument){var element=this[0];if(command){var settings=$.data(element.form,'validator').settings;var staticRules=settings.rules;var existingRules=$.validator.staticRules(element);switch(command){case"add":$.extend(existingRules,$.validator.normalizeRule(argument));staticRules[element.name]=existingRules;if(argument.messages)
settings.messages[element.name]=$.extend(settings.messages[element.name],argument.messages);break;case"remove":if(!argument){delete staticRules[element.name];return existingRules;}
var filtered={};$.each(argument.split(/\s/),function(index,method){filtered[method]=existingRules[method];delete existingRules[method];});return filtered;}}
var data=$.validator.normalizeRules($.extend({},$.validator.metadataRules(element),$.validator.classRules(element),$.validator.attributeRules(element),$.validator.staticRules(element)),element);if(data.required){var param=data.required;delete data.required;data=$.extend({required:param},data);}
return data;}});$.extend($.expr[":"],{blank:function(a){return!$.trim(""+a.value);},filled:function(a){return!!$.trim(""+a.value);},unchecked:function(a){return!a.checked;}});$.validator=function(options,form){this.settings=$.extend(true,{},$.validator.defaults,options);this.currentForm=form;this.init();};$.validator.format=function(source,params){if(arguments.length==1)
return function(){var args=$.makeArray(arguments);args.unshift(source);return $.validator.format.apply(this,args);};if(arguments.length>2&&params.constructor!=Array){params=$.makeArray(arguments).slice(1);}
if(params.constructor!=Array){params=[params];}
$.each(params,function(i,n){source=source.replace(new RegExp("\\{"+i+"\\}","g"),n);});return source;};$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:true,ignore:[],ignoreTitle:false,onfocusin:function(element){this.lastActive=element;if(this.settings.focusCleanup&&!this.blockFocusCleanup){this.settings.unhighlight&&this.settings.unhighlight.call(this,element,this.settings.errorClass,this.settings.validClass);this.addWrapper(this.errorsFor(element)).hide();}},onfocusout:function(element){if(!this.checkable(element)&&(element.name in this.submitted||!this.optional(element))){this.element(element);}},onkeyup:function(element){if(element.name in this.submitted||element==this.lastElement){this.element(element);}},onclick:function(element){if(element.name in this.submitted)
this.element(element);else if(element.parentNode.name in this.submitted)
this.element(element.parentNode);},highlight:function(element,errorClass,validClass){if(element.type==='radio'){this.findByName(element.name).addClass(errorClass).removeClass(validClass);}else{$(element).addClass(errorClass).removeClass(validClass);}},unhighlight:function(element,errorClass,validClass){if(element.type==='radio'){this.findByName(element.name).removeClass(errorClass).addClass(validClass);}else{$(element).removeClass(errorClass).addClass(validClass);}}},setDefaults:function(settings){$.extend($.validator.defaults,settings);},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",accept:"Please enter a value with a valid extension.",maxlength:$.validator.format("Please enter no more than {0} characters."),minlength:$.validator.format("Please enter at least {0} characters."),rangelength:$.validator.format("Please enter a value between {0} and {1} characters long."),range:$.validator.format("Please enter a value between {0} and {1}."),max:$.validator.format("Please enter a value less than or equal to {0}."),min:$.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){this.labelContainer=$(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||$(this.currentForm);this.containers=$(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var groups=(this.groups={});$.each(this.settings.groups,function(key,value){$.each(value.split(/\s/),function(index,name){groups[name]=key;});});var rules=this.settings.rules;$.each(rules,function(key,value){rules[key]=$.validator.normalizeRule(value);});function delegate(event){var validator=$.data(this[0].form,"validator"),eventType="on"+event.type.replace(/^validate/,"");validator.settings[eventType]&&validator.settings[eventType].call(validator,this[0]);}
$(this.currentForm).validateDelegate(":text, :password, :file, select, textarea","focusin focusout keyup",delegate).validateDelegate(":radio, :checkbox, select, option","click",delegate);if(this.settings.invalidHandler)
$(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler);},form:function(){this.checkForm();$.extend(this.submitted,this.errorMap);this.invalid=$.extend({},this.errorMap);if(!this.valid())
$(this.currentForm).triggerHandler("invalid-form",[this]);this.showErrors();return this.valid();},checkForm:function(){this.prepareForm();for(var i=0,elements=(this.currentElements=this.elements());elements[i];i++){this.check(elements[i]);}
return this.valid();},element:function(element){element=this.clean(element);this.lastElement=element;this.prepareElement(element);this.currentElements=$(element);var result=this.check(element);if(result){delete this.invalid[element.name];}else{this.invalid[element.name]=true;}
if(!this.numberOfInvalids()){this.toHide=this.toHide.add(this.containers);}
this.showErrors();return result;},showErrors:function(errors){if(window.was_validation_form_reset)return;if(errors){$.extend(this.errorMap,errors);this.errorList=[];for(var name in errors){this.errorList.push({message:errors[name],element:this.findByName(name)[0]});}
this.successList=$.grep(this.successList,function(element){return!(element.name in errors);});}
this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors();},resetForm:function(){if($.fn.resetForm)
{window.was_validation_form_reset=true;$(this.currentForm).resetForm();setTimeout(function(){window.was_validation_form_reset=false},500);}
this.submitted={};this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass);},numberOfInvalids:function(){return this.objectLength(this.invalid);},objectLength:function(obj){var count=0;for(var i in obj)
count++;return count;},hideErrors:function(){this.addWrapper(this.toHide).hide();},valid:function(){return this.size()==0;},size:function(){return this.errorList.length;},focusInvalid:function(){if(this.settings.focusInvalid){try{$(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin");}catch(e){}}},findLastActive:function(){var lastActive=this.lastActive;return lastActive&&$.grep(this.errorList,function(n){return n.element.name==lastActive.name;}).length==1&&lastActive;},elements:function(){var validator=this,rulesCache={};return $(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){!this.name&&validator.settings.debug&&window.console&&console.error("%o has no name assigned",this);if(this.name in rulesCache||!validator.objectLength($(this).rules()))
return false;rulesCache[this.name]=true;return true;});},clean:function(selector){return $(selector)[0];},errors:function(){return $(this.settings.errorElement+"."+this.settings.errorClass,this.errorContext);},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=$([]);this.toHide=$([]);this.currentElements=$([]);},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers);},prepareElement:function(element){this.reset();this.toHide=this.errorsFor(element);},check:function(element){element=this.clean(element);if(this.checkable(element)){element=this.findByName(element.name).not(this.settings.ignore)[0];}
var rules=$(element).rules();var dependencyMismatch=false;for(var method in rules){var rule={method:method,parameters:rules[method]};try{var result=$.validator.methods[method].call(this,element.value.replace(/\r/g,""),element,rule.parameters);if(result=="dependency-mismatch"){dependencyMismatch=true;continue;}
dependencyMismatch=false;if(result=="pending"){this.toHide=this.toHide.not(this.errorsFor(element));return;}
if(!result){this.formatAndAdd(element,rule);return false;}}catch(e){this.settings.debug&&window.console&&console.log("exception occured when checking element "+element.id
+", check the '"+rule.method+"' method",e);throw e;}}
if(dependencyMismatch)
return;if(this.objectLength(rules))
this.successList.push(element);return true;},customMetaMessage:function(element,method){if(!$.metadata)
return;var meta=this.settings.meta?$(element).metadata()[this.settings.meta]:$(element).metadata();return meta&&meta.messages&&meta.messages[method];},customMessage:function(name,method){var m=this.settings.messages[name];return m&&(m.constructor==String?m:m[method]);},findDefined:function(){for(var i=0;i<arguments.length;i++){if(arguments[i]!==undefined)
return arguments[i];}
return undefined;},defaultMessage:function(element,method){return this.findDefined(this.customMessage(element.name,method),this.customMetaMessage(element,method),!this.settings.ignoreTitle&&element.title||undefined,$.validator.messages[method],"<strong>Warning: No message defined for "+element.name+"</strong>");},formatAndAdd:function(element,rule){var message=this.defaultMessage(element,rule.method),theregex=/\$?\{(\d+)\}/g;if(typeof message=="function"){message=message.call(this,rule.parameters,element);}else if(theregex.test(message)){message=jQuery.format(message.replace(theregex,'{$1}'),rule.parameters);}
this.errorList.push({message:message,element:element});this.errorMap[element.name]=message;this.submitted[element.name]=message;},addWrapper:function(toToggle){if(this.settings.wrapper)
toToggle=toToggle.add(toToggle.parent(this.settings.wrapper));return toToggle;},defaultShowErrors:function(){for(var i=0;this.errorList[i];i++){var error=this.errorList[i];this.settings.highlight&&this.settings.highlight.call(this,error.element,this.settings.errorClass,this.settings.validClass);this.showLabel(error.element,error.message);}
if(this.errorList.length){this.toShow=this.toShow.add(this.containers);}
if(this.settings.success){for(var i=0;this.successList[i];i++){this.showLabel(this.successList[i]);}}
if(this.settings.unhighlight){for(var i=0,elements=this.validElements();elements[i];i++){this.settings.unhighlight.call(this,elements[i],this.settings.errorClass,this.settings.validClass);}}
this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show();},validElements:function(){return this.currentElements.not(this.invalidElements());},invalidElements:function(){return $(this.errorList).map(function(){return this.element;});},showLabel:function(element,message){var label=this.errorsFor(element);if(label.length){label.removeClass().addClass(this.settings.errorClass);label.attr("generated")&&label.html(message);}else{label=$("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(element),generated:true}).addClass(this.settings.errorClass).html(message||"");if(this.settings.wrapper){label=label.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();}
if(!this.labelContainer.append(label).length)
this.settings.errorPlacement?this.settings.errorPlacement(label,$(element)):label.insertAfter(element);}
if(!message&&this.settings.success){label.text("");typeof this.settings.success=="string"?label.addClass(this.settings.success):this.settings.success(label);}
this.toShow=this.toShow.add(label);},errorsFor:function(element){var name=this.idOrName(element);return this.errors().filter(function(){return $(this).attr('for')==name;});},idOrName:function(element){return this.groups[element.name]||(this.checkable(element)?element.name:element.id||element.name);},checkable:function(element){return/radio|checkbox/i.test(element.type);},findByName:function(name){var form=this.currentForm;return $(document.getElementsByName(name)).map(function(index,element){return element.form==form&&element.name==name&&element||null;});},getLength:function(value,element){switch(element.nodeName.toLowerCase()){case'select':return $("option:selected",element).length;case'input':if(this.checkable(element))
return this.findByName(element.name).filter(':checked').length;}
return value.length;},depend:function(param,element){return this.dependTypes[typeof param]?this.dependTypes[typeof param](param,element):true;},dependTypes:{"boolean":function(param,element){return param;},"string":function(param,element){return!!$(param,element.form).length;},"function":function(param,element){return param(element);}},optional:function(element){return!$.validator.methods.required.call(this,$.trim(element.value),element)&&"dependency-mismatch";},startRequest:function(element){if(!this.pending[element.name]){this.pendingRequest++;this.pending[element.name]=true;}},stopRequest:function(element,valid){this.pendingRequest--;if(this.pendingRequest<0)
this.pendingRequest=0;delete this.pending[element.name];if(valid&&this.pendingRequest==0&&this.formSubmitted&&this.form()){$(this.currentForm).submit();this.formSubmitted=false;}else if(!valid&&this.pendingRequest==0&&this.formSubmitted){$(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=false;}},previousValue:function(element){return $.data(element,"previousValue")||$.data(element,"previousValue",{old:null,valid:true,message:this.defaultMessage(element,"remote")});}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(className,rules){className.constructor==String?this.classRuleSettings[className]=rules:$.extend(this.classRuleSettings,className);},classRules:function(element){var rules={};var classes=$(element).attr('class');classes&&$.each(classes.split(' '),function(){if(this in $.validator.classRuleSettings){$.extend(rules,$.validator.classRuleSettings[this]);}});return rules;},attributeRules:function(element){var rules={};var $element=$(element);for(var method in $.validator.methods){var value=$element.attr(method);if(value){rules[method]=value;}}
if(rules.maxlength&&/-1|2147483647|524288/.test(rules.maxlength)){delete rules.maxlength;}
return rules;},metadataRules:function(element){if(!$.metadata)return{};var meta=$.data(element.form,'validator').settings.meta;return meta?$(element).metadata()[meta]:$(element).metadata();},staticRules:function(element){var rules={};var validator=$.data(element.form,'validator');if(validator.settings.rules){rules=$.validator.normalizeRule(validator.settings.rules[element.name])||{};}
return rules;},normalizeRules:function(rules,element){$.each(rules,function(prop,val){if(val===false){delete rules[prop];return;}
if(val.param||val.depends){var keepRule=true;switch(typeof val.depends){case"string":keepRule=!!$(val.depends,element.form).length;break;case"function":keepRule=val.depends.call(element,element);break;}
if(keepRule){rules[prop]=val.param!==undefined?val.param:true;}else{delete rules[prop];}}});$.each(rules,function(rule,parameter){rules[rule]=$.isFunction(parameter)?parameter(element):parameter;});$.each(['minlength','maxlength','min','max'],function(){if(rules[this]){rules[this]=Number(rules[this]);}});$.each(['rangelength','range'],function(){if(rules[this]){rules[this]=[Number(rules[this][0]),Number(rules[this][1])];}});if($.validator.autoCreateRanges){if(rules.min&&rules.max){rules.range=[rules.min,rules.max];delete rules.min;delete rules.max;}
if(rules.minlength&&rules.maxlength){rules.rangelength=[rules.minlength,rules.maxlength];delete rules.minlength;delete rules.maxlength;}}
if(rules.messages){delete rules.messages;}
return rules;},normalizeRule:function(data){if(typeof data=="string"){var transformed={};$.each(data.split(/\s/),function(){transformed[this]=true;});data=transformed;}
return data;},addMethod:function(name,method,message){$.validator.methods[name]=method;$.validator.messages[name]=message!=undefined?message:$.validator.messages[name];if(method.length<3){$.validator.addClassRules(name,$.validator.normalizeRule(name));}},methods:{required:function(value,element,param){if(!this.depend(param,element))
return"dependency-mismatch";switch(element.nodeName.toLowerCase()){case'select':var val=$(element).val();return val&&val.length>0;case'input':if(this.checkable(element))
return this.getLength(value,element)>0;default:return $.trim(value).length>0;}},remote:function(value,element,param){if(this.optional(element))
return"dependency-mismatch";var previous=this.previousValue(element);if(!this.settings.messages[element.name])
this.settings.messages[element.name]={};previous.originalMessage=this.settings.messages[element.name].remote;this.settings.messages[element.name].remote=previous.message;param=typeof param=="string"&&{url:param}||param;if(this.pending[element.name]){return"pending";}
if(previous.old===value){return previous.valid;}
previous.old=value;var validator=this;this.startRequest(element);var data={};data[element.name]=value;$.ajax($.extend(true,{url:param,mode:"abort",port:"validate"+element.name,dataType:"json",data:data,success:function(response){validator.settings.messages[element.name].remote=previous.originalMessage;var valid=response===true;if(valid){var submitted=validator.formSubmitted;validator.prepareElement(element);validator.formSubmitted=submitted;validator.successList.push(element);validator.showErrors();}else{var errors={};var message=response||validator.defaultMessage(element,"remote");errors[element.name]=previous.message=$.isFunction(message)?message(value):message;validator.showErrors(errors);}
previous.valid=valid;validator.stopRequest(element,valid);$j(element).keyup();}},param));return"pending";},minlength:function(value,element,param){return this.optional(element)||this.getLength($.trim(value),element)>=param;},maxlength:function(value,element,param){return this.optional(element)||this.getLength($.trim(value),element)<=param;},rangelength:function(value,element,param){var length=this.getLength($.trim(value),element);return this.optional(element)||(length>=param[0]&&length<=param[1]);},min:function(value,element,param){return this.optional(element)||value>=param;},max:function(value,element,param){return this.optional(element)||value<=param;},range:function(value,element,param){return this.optional(element)||(value>=param[0]&&value<=param[1]);},email:function(value,element){return this.optional(element)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);},url:function(value,element){return this.optional(element)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);},date:function(value,element){return this.optional(element)||!/Invalid|NaN/.test(new Date(value));},dateISO:function(value,element){return this.optional(element)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(value);},number:function(value,element){return this.optional(element)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);},digits:function(value,element){return this.optional(element)||/^\d+$/.test(value);},creditcard:function(value,element){if(this.optional(element))
return"dependency-mismatch";if(/[^0-9-]+/.test(value))
return false;var nCheck=0,nDigit=0,bEven=false;value=value.replace(/\D/g,"");for(var n=value.length-1;n>=0;n--){var cDigit=value.charAt(n);var nDigit=parseInt(cDigit,10);if(bEven){if((nDigit*=2)>9)
nDigit-=9;}
nCheck+=nDigit;bEven=!bEven;}
return(nCheck%10)==0;},accept:function(value,element,param){param=typeof param=="string"?param.replace(/,/g,'|'):"png|jpe?g|gif";return this.optional(element)||value.match(new RegExp(".("+param+")$","i"));},equalTo:function(value,element,param){var target=$(param).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){$(element).valid();});return value==target.val();}}});$.format=$.validator.format;})(jQuery);;(function($){var pendingRequests={};if($.ajaxPrefilter){$.ajaxPrefilter(function(settings,_,xhr){var port=settings.port;if(settings.mode=="abort"){if(pendingRequests[port]){pendingRequests[port].abort();}
pendingRequests[port]=xhr;}});}else{var ajax=$.ajax;$.ajax=function(settings){var mode=("mode"in settings?settings:$.ajaxSettings).mode,port=("port"in settings?settings:$.ajaxSettings).port;if(mode=="abort"){if(pendingRequests[port]){pendingRequests[port].abort();}
return(pendingRequests[port]=ajax.apply(this,arguments));}
return ajax.apply(this,arguments);};}})(jQuery);;(function($){if(!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener){$.each({focus:'focusin',blur:'focusout'},function(original,fix){$.event.special[fix]={setup:function(){this.addEventListener(original,handler,true);},teardown:function(){this.removeEventListener(original,handler,true);},handler:function(e){arguments[0]=$.event.fix(e);arguments[0].type=fix;return $.event.handle.apply(this,arguments);}};function handler(e){e=$.event.fix(e);e.type=fix;return $.event.handle.call(this,e);}});};$.extend($.fn,{validateDelegate:function(delegate,type,handler){return this.bind(type,function(event){var target=$(event.target);if(target.is(delegate)){return handler.apply(target,arguments);}});}});})(jQuery);(function(){function stripHtml(value){return value.replace(/<.[^<>]*?>/g,' ').replace(/&nbsp;|&#160;/gi,' ').replace(/[0-9.(),;:!?%#$'"_+=\/-]*/g,'');}
jQuery.validator.addMethod("maxWords",function(value,element,params){return this.optional(element)||stripHtml(value).match(/\b\w+\b/g).length<params;},jQuery.validator.format("Please enter {0} words or less."));jQuery.validator.addMethod("minWords",function(value,element,params){return this.optional(element)||stripHtml(value).match(/\b\w+\b/g).length>=params;},jQuery.validator.format("Please enter at least {0} words."));jQuery.validator.addMethod("rangeWords",function(value,element,params){return this.optional(element)||stripHtml(value).match(/\b\w+\b/g).length>=params[0]&&value.match(/bw+b/g).length<params[1];},jQuery.validator.format("Please enter between {0} and {1} words."));})();jQuery.validator.addMethod("letterswithbasicpunc",function(value,element){return this.optional(element)||/^[a-z-.,()'\"\s]+$/i.test(value);},"Letters or punctuation only please");jQuery.validator.addMethod("alphanumeric",function(value,element){return this.optional(element)||/^\w+$/i.test(value);},"Letters, numbers, spaces or underscores only please");jQuery.validator.addMethod("lettersonly",function(value,element){return this.optional(element)||/^[a-z]+$/i.test(value);},"Letters only please");jQuery.validator.addMethod("nowhitespace",function(value,element){return this.optional(element)||/^\S+$/i.test(value);},"No white space please");jQuery.validator.addMethod("ziprange",function(value,element){return this.optional(element)||/^90[2-5]\d\{2}-\d{4}$/.test(value);},"Your ZIP-code must be in the range 902xx-xxxx to 905-xx-xxxx");jQuery.validator.addMethod("integer",function(value,element){return this.optional(element)||/^-?\d+$/.test(value);},"A positive or negative non-decimal number please");jQuery.validator.addMethod("email",function(value,element){return this.optional(element)||$j.box.isEmail(value);},"Please enter a valid email address");jQuery.validator.addMethod("vinUS",function(v){if(v.length!=17)
return false;var i,n,d,f,cd,cdv;var LL=["A","B","C","D","E","F","G","H","J","K","L","M","N","P","R","S","T","U","V","W","X","Y","Z"];var VL=[1,2,3,4,5,6,7,8,1,2,3,4,5,7,9,2,3,4,5,6,7,8,9];var FL=[8,7,6,5,4,3,2,10,0,9,8,7,6,5,4,3,2];var rs=0;for(i=0;i<17;i++){f=FL[i];d=v.slice(i,i+1);if(i==8){cdv=d;}
if(!isNaN(d)){d*=f;}
else{for(n=0;n<LL.length;n++){if(d.toUpperCase()===LL[n]){d=VL[n];d*=f;if(isNaN(cdv)&&n==8){cdv=LL[n];}
break;}}}
rs+=d;}
cd=rs%11;if(cd==10){cd="X";}
if(cd==cdv){return true;}
return false;},"The specified vehicle identification number (VIN) is invalid.");jQuery.validator.addMethod("dateITA",function(value,element){var check=false;var re=/^\d{1,2}\/\d{1,2}\/\d{4}$/;if(re.test(value)){var adata=value.split('/');if($(element).hasClass('date_us'))
{var gg=parseInt(adata[1],10);var mm=parseInt(adata[0],10);}
else
{var gg=parseInt(adata[0],10);var mm=parseInt(adata[1],10);}
var aaaa=parseInt(adata[2],10);var xdata=new Date(aaaa,mm-1,gg);if((xdata.getFullYear()==aaaa)&&(xdata.getMonth()==mm-1)&&(xdata.getDate()==gg))
check=true;else
check=false;}else
check=false;return this.optional(element)||check;},"Please enter a correct date");jQuery.validator.addMethod("dateNL",function(value,element){return this.optional(element)||/^\d\d?[\.\/-]\d\d?[\.\/-]\d\d\d?\d?$/.test(value);},"Vul hier een geldige datum in.");jQuery.validator.addMethod("time",function(value,element){return this.optional(element)||/^([01][0-9])|(2[0123]):([0-5])([0-9])$/.test(value);},"Please enter a valid time, between 00:00 and 23:59");jQuery.validator.addMethod("phoneUS",function(phone_number,element){phone_number=phone_number.replace(/\s+/g,"");return this.optional(element)||phone_number.length>9&&phone_number.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);},"Please specify a valid phone number");jQuery.validator.addMethod('phoneUK',function(phone_number,element){return this.optional(element)||phone_number.length>9&&phone_number.match(/^(\(?(0|\+44)[1-9]{1}\d{1,4}?\)?\s?\d{3,4}\s?\d{3,4})$/);},'Please specify a valid phone number');jQuery.validator.addMethod('mobileUK',function(phone_number,element){return this.optional(element)||phone_number.length>9&&phone_number.match(/^((0|\+44)7(5|6|7|8|9){1}\d{2}\s?\d{6})$/);},'Please specify a valid mobile number');jQuery.validator.addMethod("strippedminlength",function(value,element,param){return jQuery(value).text().length>=param;},jQuery.validator.format("Please enter at least {0} characters"));jQuery.validator.addMethod("email2",function(value,element,param){return this.optional(element)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);},jQuery.validator.messages.email);jQuery.validator.addMethod("url2",function(value,element,param){return this.optional(element)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);},jQuery.validator.messages.url);jQuery.validator.addMethod("creditcardtypes",function(value,element,param){if(/[^0-9-]+/.test(value))
return false;value=value.replace(/\D/g,"");var validTypes=0x0000;if(param.mastercard)
validTypes|=0x0001;if(param.visa)
validTypes|=0x0002;if(param.amex)
validTypes|=0x0004;if(param.dinersclub)
validTypes|=0x0008;if(param.enroute)
validTypes|=0x0010;if(param.discover)
validTypes|=0x0020;if(param.jcb)
validTypes|=0x0040;if(param.unknown)
validTypes|=0x0080;if(param.all)
validTypes=0x0001|0x0002|0x0004|0x0008|0x0010|0x0020|0x0040|0x0080;if(validTypes&0x0001&&/^(51|52|53|54|55)/.test(value)){return value.length==16;}
if(validTypes&0x0002&&/^(4)/.test(value)){return value.length==16;}
if(validTypes&0x0004&&/^(34|37)/.test(value)){return value.length==15;}
if(validTypes&0x0008&&/^(300|301|302|303|304|305|36|38)/.test(value)){return value.length==14;}
if(validTypes&0x0010&&/^(2014|2149)/.test(value)){return value.length==15;}
if(validTypes&0x0020&&/^(6011)/.test(value)){return value.length==16;}
if(validTypes&0x0040&&/^(3)/.test(value)){return value.length==16;}
if(validTypes&0x0040&&/^(2131|1800)/.test(value)){return value.length==15;}
if(validTypes&0x0080){return true;}
return false;},"Please enter a valid credit card number.");jQuery.validator.addMethod("ipv4",function(value,element,param){return this.optional(element)||/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/i.test(value);},"Please enter a valid IP v4 address.");jQuery.validator.addMethod("ipv6",function(value,element,param){return this.optional(element)||/^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i.test(value);},"Please enter a valid IP v6 address.");var Common_Global=Base.extend({},{get_object_position:function(obj)
{var oPosition={x:0,y:0};if(obj==null)
return oPosition;if(obj.offsetParent)
{while(obj.offsetParent)
{oPosition.x+=obj.offsetLeft;oPosition.y+=obj.offsetTop;obj=obj.offsetParent;}}
else if(obj.x)
{oPosition.x+=obj.x;oPosition.y+=obj.y;}
return oPosition;},get_event_position:function(e)
{var oPosition={x:0,y:0};if(typeof(e)=='undefined')
e=window.event;if(typeof(e.pageX)!='undefined')
{oPosition.x=e.pageX;oPosition.y=e.pageY;}
else
{oPosition.x=e.clientX+document.documentElement.scrollLeft+document.body.scrollLeft;oPosition.y=e.clientY+document.documentElement.scrollTop+document.body.scrollTop;}
return oPosition;},set_center_position:function(obj,top)
{var x,y;var height_difference=$(window).height()-$j(obj).outerHeight();if(self.pageYOffset)
{x=self.pageXOffset;y=self.pageYOffset;}
else if(document.documentElement&&document.documentElement.scrollTop)
{x=document.documentElement.scrollLeft;y=document.documentElement.scrollTop;}
else if(document.body)
{x=document.body.scrollLeft;y=document.body.scrollTop;}
if('undefined'==typeof(top))
{top=240;}
if(height_difference>0&&height_difference<top)
{top=Math.ceil(height_difference/2);}
else if(height_difference<=0)
{top=0;}
obj.style.top=y+top+'px';obj.style.left=document.body.clientWidth/2-(obj.offsetWidth/2)+'px';},get_document_size:function()
{var x,y;if(self.innerHeight)
{x=self.innerWidth;y=self.innerHeight;}
else if(document.documentElement&&document.documentElement.clientHeight)
{x=document.documentElement.clientWidth;y=document.documentElement.clientHeight;}
else if(document.body)
{x=document.body.clientWidth;y=document.body.clientHeight;}
var xx,yy;var test1=document.body.scrollHeight;var test2=document.body.offsetHeight;if(test1>test2)
{xx=document.body.scrollWidth;yy=document.body.scrollHeight;}
else
{xx=document.body.offsetWidth;yy=document.body.offsetHeight;}
if($j('#wrp').get(0))yy=$j('#wrp').get(0).offsetHeight;var oSize={width:0,height:0};oSize.height=((y>yy)?y:yy);oSize.width=xx;return oSize;},is_image_file:function(file_name)
{if(file_name)
{var dot=file_name.lastIndexOf('.');if(dot!=-1)
{var ext=file_name.substr(dot).toLowerCase();var allowed={'.jpg':1,'.jpeg':1,'.png':1,'.bmp':1,'.gif':1};return(allowed[ext]);}}
return false;},new_win:function(link,params)
{params=params||{};var width=params['width']||400;var height=params['height']||400;var left=params['left']||200;var top=params['top']||200;var resizable=params['resizable']?'yes':'no';window.open(link,'_blank',"height="+height+", width="+width+", left="+left+", top="+top+", status=no,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable="+resizable);return false;},new_win_info:function(link,width,height)
{this.new_win(link,{width:width,height:height});return false;},epoch_time:function()
{return Math.floor((new Date().getTime())/1000);},getCookie:function(name)
{var prefix=name+'=';var cookieStartIndex=document.cookie.indexOf(prefix);if(cookieStartIndex==-1)
return null;var cookieEndIndex=document.cookie.indexOf(';',cookieStartIndex+prefix.length);if(cookieEndIndex==-1)
cookieEndIndex=document.cookie.length;return decodeURIComponent(document.cookie.substring(cookieStartIndex+prefix.length,cookieEndIndex));},deleteCookie:function(name)
{var domain=hostname?hostname:null;if(domain)
{if(domain.indexOf('.box.net')>=0)
{domain='box.net';}
if(domain.indexOf('.box.com')>=0)
{domain='box.com';}}
Common_Global.setCookie(name,'',(new Date()).getTime()-(1000*3600*24),'/',domain);},setCookie:function(name,value,expires,path,domain,secure)
{var expires_date=new Date();if(typeof expires=='undefined'||expires==null)
{expires=expires_date.getTime()+(1000*3600*24*60);}
expires_date.setTime(expires);var cookie=name+'='+encodeURIComponent(value);cookie+='; expires='+expires_date.toGMTString();if(path)cookie+='; path='+path;if(domain)cookie+='; domain='+domain;if(secure)cookie+='; secure';document.cookie=cookie;},clone:function(o,in_recursion)
{var c;if(typeof o=='object')
{if(!o)
{c=null;}
else if(o instanceof Base)
{if(typeof in_recursion!="undefined")
{c=o;}
else
{var same_class_but_no_constructor=function(){};same_class_but_no_constructor.prototype=o.constructor.prototype;c=new same_class_but_no_constructor();for(var i in o)
{if(!o.hasOwnProperty(i))continue;c[i]=Common_Global.clone(o[i],"object["+i+"]");}}}
else if(o instanceof Array)
{c=[];for(var j=0;j<o.length;j++)
{c[j]=Common_Global.clone(o[j],in_recursion+"["+j+"]");}}
else
{c={};for(var k in o)
{c[k]=Common_Global.clone(o[k],in_recursion+"["+k+"]");}}}
else
{c=o;}
return c;},object_keys:function(obj)
{if(typeof obj!='object'||!obj)throw"Parameter should be an object";var keys=[];for(var key in obj)
{if(obj.hasOwnProperty(key))
{keys.push(key);}}
return keys;},trigger_tooltips:function(e)
{if(e.target.tagName&&e.target.tagName.toLowerCase()=='object')return;Common_Global.show_tooltips({hide_event_type:'mouseout.tooltip',element:e.target,delay:200,event:e});},tooltip_timeout:null,show_tooltips:function(params)
{var me=this;var target_element=params.element;var j_target_element=$j(target_element);var delay=(params.delay)?params.delay:0;if(this.tooltip_timeout)
{clearTimeout(this.tooltip_timeout);}
this.tooltip_timeout=null;var tooltip;while(!Common_Global.is_invalid_element(target_element))
{j_target_element=$j(target_element);tooltip=j_target_element.attr('data-tooltip');if(!tooltip)
{tooltip=j_target_element.attr('title');if(tooltip)
{j_target_element.attr('data-tooltip',tooltip);j_target_element.removeAttr('title');}}
if(tooltip)break;target_element=target_element.parentNode;}
if(tooltip&&typeof tooltip=='string')
{var j_target_element=$j(target_element);var hide_tooltip=function(fade_out)
{var j_tooltip=$j('#tooltip');if(me.tooltip_timeout)
{clearTimeout(me.tooltip_timeout);me.tooltip_timeout=null;return;}
if(fade_out)
{if(!$j.browser.msie)j_tooltip.fadeOut('slow');else j_tooltip.fadeOut();}
else
{j_tooltip.remove();}
if(params.hide_event_type)j_target_element.unbind(params.hide_event_type);};if(params.hide_event_type)
{j_target_element.bind(params.hide_event_type,function(e)
{hide_tooltip(true);});}
Common_Global.destroy_current_tooltip=function()
{hide_tooltip(false);};var show_tooltip=function(){me.tooltip_timeout=null;var content_html='';var pipe_index=tooltip.indexOf('|');var large_tooltip_length=250;var large_tooltip=false;if(pipe_index==-1)
{content_html=tooltip;if(tooltip.length>large_tooltip_length)large_tooltip=true;}
else
{var header=tooltip.substr(0,pipe_index);var body=tooltip.substr(pipe_index+1);content_html='<h4>'+header+'</h4><p>'+body+'</p>';if(header.length+body.length>large_tooltip_length)large_tooltip=true;}
$j('#tooltip').remove();var j_tooltip=$j('<div id="tooltip" style="display: none;" class="tooltip_wrapper"><div class="tooltip"><div class="inner">'
+content_html
+'</div><b></b></div></div>');var j_tooltip_container=j_tooltip.children('.tooltip');if(large_tooltip)
{j_tooltip_container.addClass('tooltip_large');}
var pos=j_target_element.offset();if(pos.top==0&&pos.left==0&&params.event)
{pos.top=params.event.pageY;pos.left=params.event.pageX;}
j_tooltip.css({'position':'absolute','left':0,'top':0});$j('body').append(j_tooltip);var j_window=$j(window);var element_height=j_target_element.height();var element_width=j_target_element.outerWidth();var element_top_padding=parseInt(j_target_element.css('padding-top'));var tooltip_placement_padding=Math.max(10-element_top_padding,0);var tooltip_height=j_tooltip.height()+10+tooltip_placement_padding;var tooltip_width=j_tooltip.css('left','-99999px').appendTo($j('body')).fadeIn(300).outerWidth();if(large_tooltip&&tooltip_width>350)
{tooltip_width=j_tooltip.css('width','350px').outerWidth();}
else if(!large_tooltip&&tooltip_width>200)
{tooltip_width=j_tooltip.css('width','200px').outerWidth();}
if(j_target_element.parents().andSelf().hasClass('use_sideways_tooltip'))
{pos.top-=9;var pos_left_offset=13;if(pos.left-tooltip_width<j_window.scrollLeft())
{j_tooltip_container.addClass('left');pos.left+=element_width+pos_left_offset;}
else
{j_tooltip_container.addClass('right');pos.left-=tooltip_width+pos_left_offset;}}
else
{pos.left-=10;if(pos.left+tooltip_width>j_window.width())
{pos.left=pos.left+j_target_element.outerWidth()-tooltip_width+20;if(pos.left+tooltip_width>j_window.width())
{pos.left=j_window.width()-tooltip_width;}
j_tooltip.find('b').css({'left':(tooltip_width-30)+'px'});}
else
{if(pos.left<j_window.scrollLeft())
{pos.left=j_window.scrollLeft();}}
if(pos.top-tooltip_height>=j_window.scrollTop())
{j_tooltip_container.addClass('down');pos.top-=tooltip_height;var j_tooltip_table=j_tooltip_container.find('.tooltip_table');if(j_tooltip_table.length>0)
{j_tooltip_table.closest('.tooltip').addClass('down_tooltip_table');}}
else
{j_tooltip_container.addClass('up');pos.top+=element_height;}}
j_tooltip.css({'left':pos.left+'px','top':pos.top+'px'});var fade_in_callback=function(){if(params.duration)
{setTimeout(function()
{hide_tooltip(true);},params.duration);}};if(!$j.browser.msie)j_tooltip.fadeIn('slow',fade_in_callback);else j_tooltip.fadeIn(null,fade_in_callback);};if(delay)
{this.tooltip_timeout=setTimeout(show_tooltip,delay);}
else
{show_tooltip();}}},hide_tooltips:function(clear_timeout)
{$j('#tooltip').remove();if(clear_timeout)
{clearTimeout(this.tooltip_timeout);}},is_invalid_element:function(element)
{return(element==document.body||element==null||(this.element&&element==this.element)||element==window);},upper_case_first:function(str)
{str+='';var f=str.charAt(0).toUpperCase();return f+str.substr(1);},send_log:function(category,event_type,keys_and_values,callback,runmode_options,sync)
{keys_and_values=keys_and_values||{};runmode_options=runmode_options||{};var request_data={"category":category,"event_type":event_type,"keys_and_values":keys_and_values,"runmode_options":runmode_options};$j.ajax({url:"/gen204",data:request_data,success:function(data)
{if(!data){Common_Global.last_success=(new Date()).getTime();}
if(callback)
{callback();}},async:sync?false:true,type:"GET"});},send_eloqua:function(form_name,contact_method,referrer_hash)
{var request_data={'form_name':form_name,'contact_method':contact_method,'referrer_hash':referrer_hash};$j.get("/gen204/_send_eloqua",request_data,function(data)
{if(!data)
{Common_Global.last_success=(new Date()).getTime();}});},wait_for_eloqua_GUID_and_set:function()
{var timerId=null,timeout=5;var WaitUntilCustomerGUIDIsRetrieved=function()
{if(!!(timerId))
{if(timeout==0)
{return;}
if(typeof this.GetElqCustomerGUID==='function')
{$('input[name="elqCustomerGUID"]').val(GetElqCustomerGUID());return;}
timeout-=1;}
timerId=setTimeout(WaitUntilCustomerGUIDIsRetrieved,500);return;};WaitUntilCustomerGUIDIsRetrieved();_elqQ.push(['elqGetCustomerGUID']);},disable_elements:function(j_elm,tooltip)
{tooltip=tooltip||'';j_elm.prop('readonly',true).css({'opacity':0.6}).attr('data-tooltip',tooltip);j_elm.parent().on('click',j_elm.selector,function(){return false;});},enable_elements:function(j_elm,tooltip)
{tooltip=tooltip||'';j_elm.prop('readonly',false).css({'opacity':''}).attr('data-tooltip',tooltip);j_elm.parent().off('click',j_elm.selector);},window_location:function(url)
{window.location.href=url;},get_spacing_class_pixel_amount:function(spacing_class)
{var chars=spacing_class.split('');var spacing_amount=0;if(chars.length>=3)
{var location_char=chars[1];var amount_chars=chars.slice(2).join('');var amount_lookup={s:5,m:10,l:20};spacing_amount=amount_lookup[amount_chars]||spacing_amount;if(location_char=='h'||location_char=='v'||location_char=='a')
{spacing_amount*=2;}}
return spacing_amount;},_asset_index:function()
{if(window.box_cached_asset_index==null)
{$j.ajax({type:'GET',url:window.assets_index_file,dataType:'text',cache:'true',async:false,success:function(data)
{window.box_cached_asset_index={};var lines=data.split('\n');for(var i=0;i<lines.length;i++)
{var parts=lines[i].split('\t');if(parts.length==2&&parts[0].length>0)
{window.box_cached_asset_index[parts[0]]=parts[1];}}},error:function(req)
{$j.log("WARN: asset index loading failed with status %s",req.status);window.box_cached_asset_index=false;}});}
return window.box_cached_asset_index;},_asset_normalize:function(_asset)
{return _asset.replace(/^\//,'');},_remote_asset_hash:function(_asset)
{var event={'asset':_asset,'preshipped_is_null':(window.box_preshipped_asset_index==null)};Common_Global.send_log('gen204','remote_index_load',event);var index=this._asset_index();if(index===false)
{return false;}
var asset=this._asset_normalize(_asset);if(!index[asset])
{$j.log("WARN: unknown asset %s",asset);return false;}
return index[asset];},_preshipped_asset_hash:function(_asset)
{if(window.box_preshipped_asset_index!=null)
{var hash=window.box_preshipped_asset_index[_asset];if(hash!=null)
{return hash;}}
return false;},asset_hash:function(_asset)
{return this._preshipped_asset_hash(_asset)||this._remote_asset_hash(_asset);},_asset_path:function(_asset)
{var asset=this._asset_normalize(_asset);var hash=this.asset_hash(_asset);if(hash===false)
{return false;}
var file=asset.replace(/(\w+)(\.\w+)?$/,'$1-'+hash+'$2');return'/'+file;},_asset_bucket:function(asset,total_buckets)
{var hash=this.asset_hash(_asset);return parseInt(hash.slice(0,-4),16)%total_buckets;},asset_url:function(dir,file,cdn)
{if(file==undefined)
{file='';}
if(cdn==undefined)
{cdn=true;}
var asset=this._asset_normalize(dir+file);var ASSETS_PREFIX="/"+assets_base;var default_result="/"+asset;if(!Features.asset_caching)
{if(!window.box_asset_caching_off_logged)
{window.box_asset_caching_off_logged=true;$j.log("INFO: asset_caching feature off: asset_url('%s') -> '%s'",asset,default_result);}
return default_result;}
var path=this._asset_path(asset);if(path==false){return default_result;}
var result;if(cdn)
{result=ASSETS_PREFIX+path;}
else
{result=ASSETS_PREFIX+path;}
return result;},format_date_for_history:function(day)
{if(!day)
{return'';}
else
{return day.replace(/\//g,'-');}}});$j(function()
{if(!Common_Global.getCookie('referrer'))
{Common_Global.setCookie('referrer',document.referrer,null,'/',document.domain,0);}});(function(){var m=Math,vendor=(/webkit/i).test(navigator.appVersion)?'webkit':(/firefox/i).test(navigator.userAgent)?'Moz':'opera'in window?'O':'',has3d='WebKitCSSMatrix'in window&&'m11'in new WebKitCSSMatrix(),hasTouch='ontouchstart'in window,hasTransform=vendor+'Transform'in document.documentElement.style,isAndroid=(/android/gi).test(navigator.appVersion),isIDevice=(/iphone|ipad/gi).test(navigator.appVersion),isPlaybook=(/playbook/gi).test(navigator.appVersion),hasTransitionEnd=isIDevice||isPlaybook,nextFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){return setTimeout(callback,17);}})(),cancelFrame=(function(){return window.cancelRequestAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||clearTimeout})(),RESIZE_EV='onorientationchange'in window?'orientationchange':'resize',START_EV=hasTouch?'touchstart':'mousedown',MOVE_EV=hasTouch?'touchmove':'mousemove',END_EV=hasTouch?'touchend':'mouseup',CANCEL_EV=hasTouch?'touchcancel':'mouseup',WHEEL_EV=vendor=='Moz'?'DOMMouseScroll':'mousewheel',trnOpen='translate'+(has3d?'3d(':'('),trnClose=has3d?',0)':')',iScroll=function(el,options){var that=this,doc=document,i;that.wrapper=typeof el=='object'?el:doc.getElementById(el);that.wrapper.style.overflow='hidden';that.scroller=that.wrapper.children[0];that.options={hScroll:true,vScroll:true,bounce:true,bounceLock:false,momentum:true,lockDirection:true,useTransform:true,useTransition:false,checkDOMChanges:false,hScrollbar:true,vScrollbar:true,fixedScrollbar:isAndroid,hideScrollbar:isIDevice,fadeScrollbar:isIDevice&&has3d,scrollbarClass:'',zoom:false,zoomMin:1,zoomMax:4,doubleTapZoom:2,snap:false,snapThreshold:1,onRefresh:null,onBeforeScrollStart:function(e){e.preventDefault();},onScrollStart:null,onBeforeScrollMove:null,onScrollMove:null,onBeforeScrollEnd:null,onScrollEnd:null,onTouchEnd:null,onDestroy:null,onZoomStart:null,onZoom:null,onZoomEnd:null};for(i in options)that.options[i]=options[i];that.options.useTransform=hasTransform?that.options.useTransform:false;that.options.hScrollbar=that.options.hScroll&&that.options.hScrollbar;that.options.vScrollbar=that.options.vScroll&&that.options.vScrollbar;that.options.zoom=that.options.useTransform&&that.options.zoom;that.options.useTransition=hasTransitionEnd&&that.options.useTransition;that.scroller.style[vendor+'TransitionProperty']=that.options.useTransform?'-'+vendor.toLowerCase()+'-transform':'top left';that.scroller.style[vendor+'TransitionDuration']='0';that.scroller.style[vendor+'TransformOrigin']='0 0';if(that.options.useTransition)that.scroller.style[vendor+'TransitionTimingFunction']='cubic-bezier(0.33,0.66,0.66,1)';if(that.options.useTransform)that.scroller.style[vendor+'Transform']=trnOpen+'0,0'+trnClose;else that.scroller.style.cssText+=';top:0;left:0';if(that.options.useTransition)that.options.fixedScrollbar=true;that.refresh();that._bind(RESIZE_EV,window);that._bind(START_EV);if(!hasTouch){that._bind('mouseout',that.wrapper);that._bind(WHEEL_EV);}
if(that.options.checkDOMChanges)that.checkDOMTime=setInterval(function(){that._checkDOMChanges()},500);};iScroll.prototype={enabled:true,x:0,y:0,steps:[],scale:1,currPageX:0,currPageY:0,pagesX:[],pagesY:[],aniTime:null,handleEvent:function(e){var that=this;switch(e.type){case START_EV:that._start(e);break;case MOVE_EV:that._move(e);break;case END_EV:case CANCEL_EV:that._end(e);break;case RESIZE_EV:that._resize();break;case WHEEL_EV:that._wheel(e);break;case'mouseout':that._mouseout(e);break;case'webkitTransitionEnd':that._transitionEnd(e);break;}},_checkDOMChanges:function(){if(this.moved||this.zoomed||this.animating||(this.scrollerW==this.scroller.offsetWidth*this.scale&&this.scrollerH==this.scroller.offsetHeight*this.scale))return;this.refresh();},_scrollbar:function(dir){var that=this,doc=document,bar;if(!that[dir+'Scrollbar']){if(that[dir+'ScrollbarWrapper']){if(hasTransform)that[dir+'ScrollbarIndicator'].style[vendor+'Transform']='';that[dir+'ScrollbarWrapper'].parentNode.removeChild(that[dir+'ScrollbarWrapper']);that[dir+'ScrollbarWrapper']=null;that[dir+'ScrollbarIndicator']=null;}
return;}
if(!that[dir+'ScrollbarWrapper']){bar=doc.createElement('div');if(that.options.scrollbarClass)bar.className=that.options.scrollbarClass+dir.toUpperCase();else bar.style.cssText='position:absolute;z-index:100;'+(dir=='h'?'height:7px;bottom:1px;left:2px;right:'+(that.vScrollbar?'7':'2')+'px':'width:7px;bottom:'+(that.hScrollbar?'7':'2')+'px;top:2px;right:1px');bar.style.cssText+=';pointer-events:none;-'+vendor+'-transition-property:opacity;-'+vendor+'-transition-duration:'+(that.options.fadeScrollbar?'350ms':'0')+';overflow:hidden;opacity:'+(that.options.hideScrollbar?'0':'1');that.wrapper.appendChild(bar);that[dir+'ScrollbarWrapper']=bar;bar=doc.createElement('div');if(!that.options.scrollbarClass){bar.style.cssText='position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);-'+vendor+'-background-clip:padding-box;-'+vendor+'-box-sizing:border-box;'+(dir=='h'?'height:100%':'width:100%')+';-'+vendor+'-border-radius:3px;border-radius:3px';}
bar.style.cssText+=';pointer-events:none;-'+vendor+'-transition-property:-'+vendor+'-transform;-'+vendor+'-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);-'+vendor+'-transition-duration:0;-'+vendor+'-transform:'+trnOpen+'0,0'+trnClose;if(that.options.useTransition)bar.style.cssText+=';-'+vendor+'-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)';that[dir+'ScrollbarWrapper'].appendChild(bar);that[dir+'ScrollbarIndicator']=bar;}
if(dir=='h'){that.hScrollbarSize=that.hScrollbarWrapper.clientWidth;that.hScrollbarIndicatorSize=m.max(m.round(that.hScrollbarSize*that.hScrollbarSize/that.scrollerW),8);that.hScrollbarIndicator.style.width=that.hScrollbarIndicatorSize+'px';that.hScrollbarMaxScroll=that.hScrollbarSize-that.hScrollbarIndicatorSize;that.hScrollbarProp=that.hScrollbarMaxScroll/that.maxScrollX;}else{that.vScrollbarSize=that.vScrollbarWrapper.clientHeight;that.vScrollbarIndicatorSize=m.max(m.round(that.vScrollbarSize*that.vScrollbarSize/that.scrollerH),8);that.vScrollbarIndicator.style.height=that.vScrollbarIndicatorSize+'px';that.vScrollbarMaxScroll=that.vScrollbarSize-that.vScrollbarIndicatorSize;that.vScrollbarProp=that.vScrollbarMaxScroll/that.maxScrollY;}
that._scrollbarPos(dir,true);},_resize:function(){this.refresh();},_pos:function(x,y){x=this.hScroll?x:0;y=this.vScroll?y:0;if(this.options.useTransform){this.scroller.style[vendor+'Transform']=trnOpen+x+'px,'+y+'px'+trnClose+' scale('+this.scale+')';}else{x=m.round(x);y=m.round(y);this.scroller.style.left=x+'px';this.scroller.style.top=y+'px';}
this.x=x;this.y=y;this._scrollbarPos('h');this._scrollbarPos('v');},_scrollbarPos:function(dir,hidden){var that=this,pos=dir=='h'?that.x:that.y,size;if(!that[dir+'Scrollbar'])return;pos=that[dir+'ScrollbarProp']*pos;if(pos<0){if(!that.options.fixedScrollbar){size=that[dir+'ScrollbarIndicatorSize']+m.round(pos*3);if(size<8)size=8;that[dir+'ScrollbarIndicator'].style[dir=='h'?'width':'height']=size+'px';}
pos=0;}else if(pos>that[dir+'ScrollbarMaxScroll']){if(!that.options.fixedScrollbar){size=that[dir+'ScrollbarIndicatorSize']-m.round((pos-that[dir+'ScrollbarMaxScroll'])*3);if(size<8)size=8;that[dir+'ScrollbarIndicator'].style[dir=='h'?'width':'height']=size+'px';pos=that[dir+'ScrollbarMaxScroll']+(that[dir+'ScrollbarIndicatorSize']-size);}else{pos=that[dir+'ScrollbarMaxScroll'];}}
that[dir+'ScrollbarWrapper'].style[vendor+'TransitionDelay']='0';that[dir+'ScrollbarWrapper'].style.opacity=hidden&&that.options.hideScrollbar?'0':'1';that[dir+'ScrollbarIndicator'].style[vendor+'Transform']=trnOpen+(dir=='h'?pos+'px,0':'0,'+pos+'px')+trnClose;},_start:function(e){var that=this,point=hasTouch?e.touches[0]:e,matrix,x,y,c1,c2,target;if(!that.enabled)return;if(that.options.onBeforeScrollStart)that.options.onBeforeScrollStart.call(that,e);if(that.options.useTransition)that._transitionTime(0);that.moved=false;that.animating=false;that.zoomed=false;that.distX=0;that.distY=0;that.absDistX=0;that.absDistY=0;that.dirX=0;that.dirY=0;if(that.options.zoom&&hasTouch&&e.touches.length>1){c1=m.abs(e.touches[0].pageX-e.touches[1].pageX);c2=m.abs(e.touches[0].pageY-e.touches[1].pageY);that.touchesDistStart=m.sqrt(c1*c1+c2*c2);that.originX=m.abs(e.touches[0].pageX+e.touches[1].pageX-that.wrapperOffsetLeft*2)/2-that.x;that.originY=m.abs(e.touches[0].pageY+e.touches[1].pageY-that.wrapperOffsetTop*2)/2-that.y;if(that.options.onZoomStart)that.options.onZoomStart.call(that,e);}
if(that.options.momentum){if(that.options.useTransform){matrix=getComputedStyle(that.scroller,null)[vendor+'Transform'].replace(/[^0-9-.,]/g,'').split(',');x=matrix[4]*1;y=matrix[5]*1;}else{x=getComputedStyle(that.scroller,null).left.replace(/[^0-9-]/g,'')*1;y=getComputedStyle(that.scroller,null).top.replace(/[^0-9-]/g,'')*1;}
if(x!=that.x||y!=that.y){if(that.options.useTransition)that._unbind('webkitTransitionEnd');else cancelFrame(that.aniTime);that.steps=[];that._pos(x,y);}}
that.absStartX=that.x;that.absStartY=that.y;that.startX=that.x;that.startY=that.y;that.pointX=point.pageX;that.pointY=point.pageY;that.startTime=e.timeStamp||(new Date()).getTime();if(that.options.onScrollStart)that.options.onScrollStart.call(that,e);that._bind(MOVE_EV);that._bind(END_EV);that._bind(CANCEL_EV);},_move:function(e){var that=this,point=hasTouch?e.touches[0]:e,deltaX=point.pageX-that.pointX,deltaY=point.pageY-that.pointY,newX=that.x+deltaX,newY=that.y+deltaY,c1,c2,scale,timestamp=e.timeStamp||(new Date()).getTime();if(that.options.onBeforeScrollMove)that.options.onBeforeScrollMove.call(that,e);if(that.options.zoom&&hasTouch&&e.touches.length>1){c1=m.abs(e.touches[0].pageX-e.touches[1].pageX);c2=m.abs(e.touches[0].pageY-e.touches[1].pageY);that.touchesDist=m.sqrt(c1*c1+c2*c2);that.zoomed=true;scale=1/that.touchesDistStart*that.touchesDist*this.scale;if(scale<0.5)scale=0.5;else if(scale>that.options.zoomMax)scale=that.options.zoomMax;that.lastScale=scale/this.scale;newX=this.originX-this.originX*that.lastScale+this.x,newY=this.originY-this.originY*that.lastScale+this.y;this.scroller.style[vendor+'Transform']=trnOpen+newX+'px,'+newY+'px'+trnClose+' scale('+scale+')';if(that.options.onZoom)that.options.onZoom.call(that,e);return;}
that.pointX=point.pageX;that.pointY=point.pageY;if(newX>0||newX<that.maxScrollX){newX=that.options.bounce?that.x+(deltaX/2):newX>=0||that.maxScrollX>=0?0:that.maxScrollX;}
if(newY>0||newY<that.maxScrollY){newY=that.options.bounce?that.y+(deltaY/2):newY>=0||that.maxScrollY>=0?0:that.maxScrollY;}
if(that.absDistX<6&&that.absDistY<6){that.distX+=deltaX;that.distY+=deltaY;that.absDistX=m.abs(that.distX);that.absDistY=m.abs(that.distY);return;}
if(that.options.lockDirection){if(that.absDistX>that.absDistY+5){newY=that.y;deltaY=0;}else if(that.absDistY>that.absDistX+5){newX=that.x;deltaX=0;}}
that.moved=true;that._pos(newX,newY);that.dirX=deltaX>0?-1:deltaX<0?1:0;that.dirY=deltaY>0?-1:deltaY<0?1:0;if(timestamp-that.startTime>300){that.startTime=timestamp;that.startX=that.x;that.startY=that.y;}
if(that.options.onScrollMove)that.options.onScrollMove.call(that,e);},_end:function(e){if(hasTouch&&e.touches.length!=0)return;var that=this,point=hasTouch?e.changedTouches[0]:e,target,ev,momentumX={dist:0,time:0},momentumY={dist:0,time:0},duration=(e.timeStamp||(new Date()).getTime())-that.startTime,newPosX=that.x,newPosY=that.y,distX,distY,newDuration;that._unbind(MOVE_EV);that._unbind(END_EV);that._unbind(CANCEL_EV);if(that.options.onBeforeScrollEnd)that.options.onBeforeScrollEnd.call(that,e);if(that.zoomed){that.scale=that.scale*that.lastScale;that.x=that.originX-that.originX*that.lastScale+that.x;that.y=that.originY-that.originY*that.lastScale+that.y;that.scroller.style.webkitTransform=trnOpen+that.x+'px,'+that.y+'px'+trnClose+' scale('+that.scale+')';that.refresh();if(that.options.onZoomEnd)that.options.onZoomEnd.call(that,e);return;}
if(!that.moved){if(hasTouch){if(that.doubleTapTimer&&that.options.zoom){clearTimeout(that.doubleTapTimer);that.doubleTapTimer=null;that.zoom(that.pointX,that.pointY,that.scale==1?that.options.doubleTapZoom:1);}else{that.doubleTapTimer=setTimeout(function(){that.doubleTapTimer=null;target=point.target;while(target.nodeType!=1)target=target.parentNode;if(target.tagName!='SELECT'&&target.tagName!='INPUT'&&target.tagName!='TEXTAREA'){ev=document.createEvent('MouseEvents');ev.initMouseEvent('click',true,true,e.view,1,point.screenX,point.screenY,point.clientX,point.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,0,null);ev._fake=true;target.dispatchEvent(ev);}},that.options.zoom?250:0);}}
that._resetPos(200);if(that.options.onTouchEnd)that.options.onTouchEnd.call(that,e);return;}
if(duration<300&&that.options.momentum){momentumX=newPosX?that._momentum(newPosX-that.startX,duration,-that.x,that.scrollerW-that.wrapperW+that.x,that.options.bounce?that.wrapperW:0):momentumX;momentumY=newPosY?that._momentum(newPosY-that.startY,duration,-that.y,(that.maxScrollY<0?that.scrollerH-that.wrapperH+that.y:0),that.options.bounce?that.wrapperH:0):momentumY;newPosX=that.x+momentumX.dist;newPosY=that.y+momentumY.dist;if((that.x>0&&newPosX>0)||(that.x<that.maxScrollX&&newPosX<that.maxScrollX))momentumX={dist:0,time:0};if((that.y>0&&newPosY>0)||(that.y<that.maxScrollY&&newPosY<that.maxScrollY))momentumY={dist:0,time:0};}
if(momentumX.dist||momentumY.dist){newDuration=m.max(m.max(momentumX.time,momentumY.time),10);if(that.options.snap){distX=newPosX-that.absStartX;distY=newPosY-that.absStartY;if(m.abs(distX)<that.options.snapThreshold&&m.abs(distY)<that.options.snapThreshold){that.scrollTo(that.absStartX,that.absStartY,200);}
else{snap=that._snap(newPosX,newPosY);newPosX=snap.x;newPosY=snap.y;newDuration=m.max(snap.time,newDuration);}}
that.scrollTo(newPosX,newPosY,newDuration);if(that.options.onTouchEnd)that.options.onTouchEnd.call(that,e);return;}
if(that.options.snap){distX=newPosX-that.absStartX;distY=newPosY-that.absStartY;if(m.abs(distX)<that.options.snapThreshold&&m.abs(distY)<that.options.snapThreshold)that.scrollTo(that.absStartX,that.absStartY,200);else{snap=that._snap(that.x,that.y);if(snap.x!=that.x||snap.y!=that.y)that.scrollTo(snap.x,snap.y,snap.time);}
if(that.options.onTouchEnd)that.options.onTouchEnd.call(that,e);return;}
that._resetPos(200);if(that.options.onTouchEnd)that.options.onTouchEnd.call(that,e);},_resetPos:function(time){var that=this,resetX=that.x>=0?0:that.x<that.maxScrollX?that.maxScrollX:that.x,resetY=that.y>=0||that.maxScrollY>0?0:that.y<that.maxScrollY?that.maxScrollY:that.y;if(resetX==that.x&&resetY==that.y){if(that.moved){that.moved=false;if(that.options.onScrollEnd)that.options.onScrollEnd.call(that);}
if(that.hScrollbar&&that.options.hideScrollbar){if(vendor=='webkit')that.hScrollbarWrapper.style[vendor+'TransitionDelay']='300ms';that.hScrollbarWrapper.style.opacity='0';}
if(that.vScrollbar&&that.options.hideScrollbar){if(vendor=='webkit')that.vScrollbarWrapper.style[vendor+'TransitionDelay']='300ms';that.vScrollbarWrapper.style.opacity='0';}
return;}
that.scrollTo(resetX,resetY,time||0);},_wheel:function(e){var that=this,deltaX,deltaY;if('wheelDeltaX'in e){deltaX=that.x+e.wheelDeltaX/12,deltaY=that.y+e.wheelDeltaY/12;}else if('detail'in e){deltaX=that.x-e.detail*3,deltaY=that.y-e.detail*3;}else{deltaX=that.x-e.wheelDelta,deltaY=that.y-e.wheelDelta;}
if(deltaX>0)deltaX=0;else if(deltaX<that.maxScrollX)deltaX=that.maxScrollX;if(deltaY>0)deltaY=0;else if(deltaY<that.maxScrollY)deltaY=that.maxScrollY;that.scrollTo(deltaX,deltaY,0);},_mouseout:function(e){var t=e.relatedTarget;if(!t){this._end(e);return;}
while(t=t.parentNode)if(t==this.wrapper)return;this._end(e);},_transitionEnd:function(e){var that=this;if(e.target!=that.scroller)return;that._unbind('webkitTransitionEnd');that._startAni();},_startAni:function(){var that=this,startX=that.x,startY=that.y,startTime=(new Date).getTime(),step,easeOut;if(that.animating)return;if(!that.steps.length){that._resetPos(400);return;}
step=that.steps.shift();if(step.x==startX&&step.y==startY)step.time=0;that.animating=true;that.moved=true;if(that.options.useTransition){that._transitionTime(step.time);that._pos(step.x,step.y);that.animating=false;if(step.time)that._bind('webkitTransitionEnd');else that._resetPos(0);return;}
(function animate(){var now=(new Date).getTime(),newX,newY;if(now>=startTime+step.time){that._pos(step.x,step.y);that.animating=false;if(that.options.onAnimationEnd)that.options.onAnimationEnd.call(that);that._startAni();return;}
now=(now-startTime)/step.time-1;easeOut=m.sqrt(1-now*now);newX=(step.x-startX)*easeOut+startX;newY=(step.y-startY)*easeOut+startY;that._pos(newX,newY);if(that.animating)that.aniTime=nextFrame(animate);})();},_transitionTime:function(time){time+='ms';this.scroller.style[vendor+'TransitionDuration']=time;if(this.hScrollbar)this.hScrollbarIndicator.style[vendor+'TransitionDuration']=time;if(this.vScrollbar)this.vScrollbarIndicator.style[vendor+'TransitionDuration']=time;},_momentum:function(dist,time,maxDistUpper,maxDistLower,size){var deceleration=0.0006,speed=m.abs(dist)/time,newDist=(speed*speed)/(2*deceleration),newTime=0,outsideDist=0;if(dist>0&&newDist>maxDistUpper){outsideDist=size/(6/(newDist/speed*deceleration));maxDistUpper=maxDistUpper+outsideDist;speed=speed*maxDistUpper/newDist;newDist=maxDistUpper;}else if(dist<0&&newDist>maxDistLower){outsideDist=size/(6/(newDist/speed*deceleration));maxDistLower=maxDistLower+outsideDist;speed=speed*maxDistLower/newDist;newDist=maxDistLower;}
newDist=newDist*(dist<0?-1:1);newTime=speed/deceleration;return{dist:newDist,time:m.round(newTime)};},_offset:function(el){var left=-el.offsetLeft,top=-el.offsetTop;while(el=el.offsetParent){left-=el.offsetLeft;top-=el.offsetTop;}
if(el!=this.wrapper){left*=this.scale;top*=this.scale;}
return{left:left,top:top};},_snap:function(x,y){var that=this,i,l,page,time,sizeX,sizeY;page=that.pagesX.length-1;for(i=0,l=that.pagesX.length;i<l;i++){if(x>=that.pagesX[i]){page=i;break;}}
if(page==that.currPageX&&page>0&&that.dirX<0)page--;x=that.pagesX[page];sizeX=m.abs(x-that.pagesX[that.currPageX]);sizeX=sizeX?m.abs(that.x-x)/sizeX*500:0;that.currPageX=page;page=that.pagesY.length-1;for(i=0;i<page;i++){if(y>=that.pagesY[i]){page=i;break;}}
if(page==that.currPageY&&page>0&&that.dirY<0)page--;y=that.pagesY[page];sizeY=m.abs(y-that.pagesY[that.currPageY]);sizeY=sizeY?m.abs(that.y-y)/sizeY*500:0;that.currPageY=page;time=m.round(m.max(sizeX,sizeY))||200;return{x:x,y:y,time:time};},_bind:function(type,el,bubble){(el||this.scroller).addEventListener(type,this,!!bubble);},_unbind:function(type,el,bubble){(el||this.scroller).removeEventListener(type,this,!!bubble);},destroy:function(){var that=this;that.scroller.style[vendor+'Transform']='';that.hScrollbar=false;that.vScrollbar=false;that._scrollbar('h');that._scrollbar('v');that._unbind(RESIZE_EV,window);that._unbind(START_EV);that._unbind(MOVE_EV);that._unbind(END_EV);that._unbind(CANCEL_EV);if(that.options.hasTouch){that._unbind('mouseout',that.wrapper);that._unbind(WHEEL_EV);}
if(that.options.useTransition)that._unbind('webkitTransitionEnd');if(that.options.checkDOMChanges)clearInterval(that.checkDOMTime);if(that.options.onDestroy)that.options.onDestroy.call(that);},refresh:function(){var that=this,offset,pos=0,page=0;if(that.scale<that.options.zoomMin)that.scale=that.options.zoomMin;that.wrapperW=that.wrapper.clientWidth||1;that.wrapperH=that.wrapper.clientHeight||1;that.scrollerW=m.round(that.scroller.offsetWidth*that.scale);that.scrollerH=m.round(that.scroller.offsetHeight*that.scale);that.maxScrollX=that.wrapperW-that.scrollerW;that.maxScrollY=that.wrapperH-that.scrollerH;that.dirX=0;that.dirY=0;that.hScroll=that.options.hScroll&&that.maxScrollX<0;that.vScroll=that.options.vScroll&&(!that.options.bounceLock&&!that.hScroll||that.scrollerH>that.wrapperH);that.hScrollbar=that.hScroll&&that.options.hScrollbar;that.vScrollbar=that.vScroll&&that.options.vScrollbar&&that.scrollerH>that.wrapperH;offset=that._offset(that.wrapper);that.wrapperOffsetLeft=-offset.left;that.wrapperOffsetTop=-offset.top;if(typeof that.options.snap=='string'){that.pagesX=[];that.pagesY=[];els=that.scroller.querySelectorAll(that.options.snap);for(i=0,l=els.length;i<l;i++){pos=that._offset(els[i]);pos.left+=that.wrapperOffsetLeft;pos.top+=that.wrapperOffsetTop;that.pagesX[i]=pos.left<that.maxScrollX?that.maxScrollX:pos.left*that.scale;that.pagesY[i]=pos.top<that.maxScrollY?that.maxScrollY:pos.top*that.scale;}}else if(that.options.snap){that.pagesX=[];while(pos>=that.maxScrollX){that.pagesX[page]=pos;pos=pos-that.wrapperW;page++;}
if(that.maxScrollX%that.wrapperW)that.pagesX[that.pagesX.length]=that.maxScrollX-that.pagesX[that.pagesX.length-1]+that.pagesX[that.pagesX.length-1];pos=0;page=0;that.pagesY=[];while(pos>=that.maxScrollY){that.pagesY[page]=pos;pos=pos-that.wrapperH;page++;}
if(that.maxScrollY%that.wrapperH)that.pagesY[that.pagesY.length]=that.maxScrollY-that.pagesY[that.pagesY.length-1]+that.pagesY[that.pagesY.length-1];}
that._scrollbar('h');that._scrollbar('v');that.scroller.style[vendor+'TransitionDuration']='0';that._resetPos(200);},scrollTo:function(x,y,time,relative){var that=this,step=x,i,l;that.stop();if(!step.length)step=[{x:x,y:y,time:time,relative:relative}];for(i=0,l=step.length;i<l;i++){if(step[i].relative){step[i].x=that.x-step[i].x;step[i].y=that.y-step[i].y;}
that.steps.push({x:step[i].x,y:step[i].y,time:step[i].time||0});}
that._startAni();},scrollToElement:function(el,time){var that=this,pos;el=el.nodeType?el:that.scroller.querySelector(el);if(!el)return;pos=that._offset(el);pos.left+=that.wrapperOffsetLeft;pos.top+=that.wrapperOffsetTop;pos.left=pos.left>0?0:pos.left<that.maxScrollX?that.maxScrollX:pos.left;pos.top=pos.top>0?0:pos.top<that.maxScrollY?that.maxScrollY:pos.top;time=time===undefined?m.max(m.abs(pos.left)*2,m.abs(pos.top)*2):time;that.scrollTo(pos.left,pos.top,time);},scrollToPage:function(pageX,pageY,time){var that=this,x,y;if(that.options.snap){pageX=pageX=='next'?that.currPageX+1:pageX=='prev'?that.currPageX-1:pageX;pageY=pageY=='next'?that.currPageY+1:pageY=='prev'?that.currPageY-1:pageY;pageX=pageX<0?0:pageX>that.pagesX.length-1?that.pagesX.length-1:pageX;pageY=pageY<0?0:pageY>that.pagesY.length-1?that.pagesY.length-1:pageY;that.currPageX=pageX;that.currPageY=pageY;x=that.pagesX[pageX];y=that.pagesY[pageY];}else{x=-that.wrapperW*pageX;y=-that.wrapperH*pageY;if(x<that.maxScrollX)x=that.maxScrollX;if(y<that.maxScrollY)y=that.maxScrollY;}
that.scrollTo(x,y,time||400);},disable:function(){this.stop();this._resetPos(0);this.enabled=false;this._unbind(MOVE_EV);this._unbind(END_EV);this._unbind(CANCEL_EV);},enable:function(){this.enabled=true;},stop:function(){if(this.options.useTransition)this._unbind('webkitTransitionEnd');else cancelFrame(this.aniTime);this.steps=[];this.moved=false;this.animating=false;},zoom:function(x,y,scale,time){var that=this,relScale=scale/that.scale;if(!that.options.useTransform)return;time=(time||200)+'ms'
x=x-that.wrapperOffsetLeft-that.x;y=y-that.wrapperOffsetTop-that.y;that.x=x-x*relScale+that.x;that.y=y-y*relScale+that.y;that.scale=scale;that.scroller.style[vendor+'TransitionDuration']=time;that.scroller.style[vendor+'Transform']=trnOpen+that.x+'px,'+that.y+'px'+trnClose+' scale('+scale+')';that.refresh();},isReady:function(){return!this.moved&&!this.zoomed&&!this.animating;}};if(typeof exports!=='undefined')exports.iScroll=iScroll;else window.iScroll=iScroll;})();var Validator={file_name_regex:"^((COM\\d)|(LPT\\d)|(CON)|(PRN)|(AUX)|(NUL)|CLOCK\\$)$|[*<>?|:/\\\\\"]|\\.$",discussion_name_regex:"^((COM\\d)|(LPT\\d)|(CON)|(PRN)|(AUX)|(NUL)|CLOCK\\$)$|[<>|/\\\\\"]|\\.$",url_protocol_regex:'^(HTTP|FTP)S?:\/\/.*$',url_regex:"^(https?|ftp):\\/\\/(((([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!\\$&'\\(\\)\\*\\+,;=]|:)*@)?(((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|((([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])*([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))\\.)+(([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])*([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))\\.?)(:\\d*)?)(\\/((([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!\\$&'\\(\\)\\*\\+,;=]|:|@)+(\\/(([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!\\$&'\\(\\)\\*\\+,;=]|:|@)*)*)?)?(\\?((([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!\\$&'\\(\\)\\*\\+,;=]|:|@)|[\\uE000-\\uF8FF]|\\/|\\?)*)?(\\#((([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!\\$&'\\(\\)\\*\\+,;=]|:|@)|\\/|\\?)*)?$",file_name_special_chars:'(\\, /, ", :, <, >, |, *, ?, .)',discussion_name_special_chars:'(\\, /, <, >, |)',file_name_special_char_replacement:'_',validate_login:function(login)
{return Validator.prototype.validate_email(login);},validate_empty_field:function(value)
{if(value==="")
{return false;}
return true;},validate_email:function(email)
{return $j.box.isEmail(email);},validate_password:function(value,allow_empty)
{allow_empty=allow_empty||false;if(allow_empty)
{return Validator.validate_string(value,0,255);}
return Validator.validate_string(value,1,255);},validate_confirm_password:function(password,confirm_password)
{return(password===confirm_password);},validate_phone:function(value)
{var phone=$j.trim(value);return(Boolean)(phone.match(/^\+?\d([\d\-\.\s]*\d)?(\s*(x|ext\.?|extension)\s*\d+)?$/g));},validate_string:function(value,min_length,max_length)
{if(value.length!=undefined)
{if((value.length>=min_length)&&(value.length<=max_length))
{return true;}}
return false;},validate_nonnegative_float:function(number)
{if(typeof number!='number')
{var regex=/^[0-9\.]*$/;if(!regex.test(number))
{return false;}
number=parseFloat(number);}
return(number>=0);},validate_positive_integer:function(number)
{if(typeof number!='number')
{var regex=/^[0-9]*$/;if(!regex.test(number))
{return false;}
number=parseInt(number);}
return(number>0);},validate_nonnegative_integer:function(number)
{if(typeof number!='number')
{var regex=/^[0-9]*$/;if(!regex.test(number))
{return false;}
number=parseInt(number);}
return(number>=0);},validate_public_name:function(value)
{return Validator.validate_name(value);},validate_name:function(value)
{return Validator.validate_string(value,1,255);},validate_company:function(value)
{return Validator.validate_string(value,1,255);},validate_slave_count:function(value)
{return Validator.validate_positive_integer(value);},validate_space_amount:function(value)
{return Validator.validate_positive_integer(value);},validate_slave_space_amount:function(value)
{if(Validator.validate_nonnegative_float(value))
{if(window.enterprise&&window.enterprise.space_amount)
{var enterprise_space_amount=Validator.convert_units(window.enterprise.space_amount,'bytes','gigabytes');if(value>enterprise_space_amount)
{return false;}
else
{return true;}}
return true;}
else
{return false;}},validate_enterprise_type:function(value)
{if(value=='business')
{return true;}
else if(value=='enterprise')
{return true;}
return false;},validate_deal_status:function(value)
{if(value=='live_deal')
{return true;}
else if(value=='potential_deal')
{return true;}
else if(value=='trial')
{return true;}
else if(value=='trial_extension')
{return true;}
return false;},validate_subdomain:function(subdomain)
{subdomain=$j.trim(subdomain).toLowerCase();var subdomain_regex=/^[a-zA-Z0-9]*(-[a-zA-Z0-9]+)*$/;if(subdomain.match(subdomain_regex)==null)
{return false;}
if(subdomain.indexOf('www')==0)
{return false;}
if(subdomain.length<3)
{return false;}
return true;},validate_group_tag_name:function(value)
{if(value&&value.toLowerCase()=='none')return false;return Validator.validate_string(value,1,255);},validate_file_name:function(name)
{var regex=new RegExp(Validator.file_name_regex);var pattern=name.toUpperCase();return regex.exec(pattern)==null;},validate_discussion_name:function(name)
{var regex=new RegExp(Validator.discussion_name_regex);var pattern=name.toUpperCase();return regex.exec(pattern)==null;},validate_url_protocol:function(url)
{var regex=new RegExp(Validator.url_protocol_regex);var pattern=url.toUpperCase();if(pattern.indexOf("://")===-1)pattern='HTTP://'+pattern;return regex.exec(pattern)!=null;},validate_url:function(url,optional_protocol)
{if(optional_protocol)
{if(!url.match(/^(http|ftp)s?:\/\//i))
{url='http://'+url;}}
var regex=new RegExp(Validator.url_regex,"i");return regex.test(url);},validate_partial_url:function(str)
{var regex=/^[A-Za-z0-9-]+$/;return regex.test(str);},fix_file_name:function(name)
{var regex=new RegExp(Validator.file_name_regex,'g');name=name.replace(regex,Validator.file_name_special_char_replacement);return name;},convert_units:function(number,from_units,to_units)
{var converted_number=0;if(from_units=="bytes")
{if(to_units=="gigabytes")
{converted_number=Math.round(number/Math.pow(2,30));}
else
{throw new Error('Unknown units type passed to "convert_units" function as the "to_units" parameter. The units might just not be implemented yet. to_units: "'+to_units+'"');}}
else
{throw new Error('Unknown units type passed to "convert_units" function as the "from_units" parameter. The units might just not be implemented yet. from_units: "'+from_units+'"');}
return converted_number;}};var Mobile=Base.extend({},{attach_tap_events:function()
{$j('.home_collapsibles').find('.ui-collapsible-heading').live('tap',function(){var j_this=$j(this);window.scrollTo(0,j_this.offset().top);$j.mobile.activePage.find('.ui-collapsible-content').css({opacity:0});j_this.parent('.ui-collapsible-contain').removeClass('home_collapsible_hidden');j_this.next('.ui-collapsible-content').css({opacity:1});j_this.next().find('.ui-input-text input').val('');});$j('.login_form').live('submit',function(){var j_this=$j(this);if(j_this.find('.login_email').val()=='')
{alert('Please enter your email.');return false;}});$j('.sign_up_form').live('submit',function(){var j_this=$j(this);if(j_this.find('.sign_up_email').val()=='')
{alert('Please enter a valid email.');return false;}
if(j_this.find('.sign_up_password').val()=='')
{alert('Please enter a password.');return false;}});$j('#load_all_comments').live('tap',function(){Mobile.get_comments({all:true});return false;});$j('.search_button').live('tap',function(){Mobile.show_search();return false;});$j('.search_overlay, .search_cancel_wrap').live('tap',function(){Mobile.hide_search();return false;});$j('.modal_close, .modal_overlay').live('tap',function(){Mobile._reset_rename_modal_input();Mobile.hide_modal('.modal');return false;});$j('.share_button').live('tap',function(){Mobile.show_modal('.share_modal');});$j('.share_submit').live('tap',function(e){if(!Mobile.validate_share())
{e.preventDefault();}
else
{$j.mobile.activePage.find('.share_form').submit();}
return false;});$j('.download_button').live('tap',function(){window.open($j(this).attr('href'));return false;});$j('.create_folder_button').live('tap',function(){Mobile.show_modal('.create_folder_modal');return false;});$j('.create_folder_submit').live('tap',function(){Mobile.create_folder();return false;});$j('.delete_button').live('tap',function(){Mobile.delete_item();return false;});$j('.folder_email_upload_button').live('tap',function(){Mobile.show_email_upload();return false;});$j('.rename_button').live('tap',function(){Mobile.original_file_name=$j('.rename_modal .rename_input').attr('value');$j('.rename_form .notification').hide();Mobile.show_modal('.rename_modal');return false;});$j('.rename_submit').live('tap',function(){Mobile.rename_item();return false;});$j('.pagination_select').live('tap',function(){Mobile.show_modal('.pagination_modal');return false;});$j('.rename_cancel').live('tap',function(){Mobile._reset_rename_modal_input();Mobile.hide_modal('.rename_modal');});$j('.pagination_row').live('tap',function(){Mobile.hide_modal('.pagination_modal');});$j('.info_button').live('tap',function(){Mobile.show_modal('.info_modal');});$j('.info_cancel').live('tap',function(){Mobile.hide_modal('.info_modal');});$j('.info_settings').live('tap',function(){Mobile.hide_modal('.info_modal');Mobile.show_modal('.settings_modal');});$j('.settings_info').live('tap',function(){Mobile.hide_modal('.settings_modal');Mobile.show_modal('.info_modal');});$j('.settings_cancel').live('tap',function(){Mobile.hide_modal('.settings_modal');});$j('.smart_app_banner_close').live('tap',function(){Mobile.hide_smart_app_banner();if($(".search_overlay").length)
{Mobile.show_search_overlay();}});$j('.options_button, .options_dropdown a').live('tap',function(){var dropdown=$j.mobile.activePage.find('.options_dropdown');if(dropdown.is(':visible'))
{Mobile.hide_options();}
else
{Mobile.show_options();}});},create_breadcrumb_scroller:function()
{if($j.mobile.activePage)
{var container=$j.mobile.activePage.find('.scroll-container:first');var scroller=$j.mobile.activePage.find('.scroller:first');var breadcrumb=$j.mobile.activePage.find('.breadcrumb:first');if(navigator.userAgent.toLowerCase().indexOf('blackberry')==-1)
{setTimeout(function(){if(breadcrumb&&container[0])
{if(Mobile.scroller)
{Mobile.scroller.destroy();}
var width=0;breadcrumb.children().each(function(){width+=$j(this).width();});scroller.width(width);Mobile.scroller=new iScroll(container[0],{hScroll:true,vScroll:false,hScrollbar:false});Mobile.scroller.scrollToElement(breadcrumb.children(':last')[0],10);setTimeout(function(){container.css({opacity:100});},300);}},1);}
else
{setTimeout(function(){container.css({opacity:100});},300);}}},create_comment:function(params)
{$j.mobile.pageLoading();var listview=$j.mobile.activePage.find('#comments_listview');var user_login=params.user_login;var is_shared=params.is_shared||listview.jqmData('is_shared');var shared_name=params.shared_name||listview.jqmData('shared_name');var vanity_name=params.vanity_name||listview.jqmData('vanity_name');var context={shared_item:{vanity_name:vanity_name,shared_name:shared_name,password:params.password}};var url='/index.php?rm=box_comments_create';if(is_shared)
{url+='&'+$j.box.formatQuery({context:context});}
var message=listview.find('#message').val();if(message==''||message.match(/^\s*$/))
{alert('Please enter a comment.');$j.mobile.pageLoading(true);return false;}
var data={message:message,commentable_item_typed_id:listview.find('#commentable_item_typed_id').val(),request_token:listview.find('#request_token').val()};if(listview.find('#author_name').length)
{data.author_name=listview.find('#author_name').val();if(data.author_name==''||data.author_name.match(/^\s*$/))
{alert('A name is required to make a comment.');$j.mobile.pageLoading(true);return false;}}
$j.post(url,data,function(response){var params={typed_id:listview.find('#commentable_item_typed_id').val(),all:false,is_shared:is_shared,shared_name:shared_name};if(is_shared)
{window.location.reload();}
else
{Mobile.get_comments(params);listview.find('#message').val('');}});return false;},create_folder:function()
{var folder_name=$j.mobile.activePage.find('.folder_name_input').val();if(Mobile.validate_item_name(folder_name))
{Mobile.hide_modal('.create_folder_modal');$j.mobile.pageLoading();var typed_id=$j.mobile.activePage.attr('id');var url='/index.php?rm=box_create_folder';var data={'q[id]':typed_id,'q[folder_name]':folder_name,'request_token':request_token};$j.post(url,data,function(){window.location.reload();});}},delete_item:function()
{var confirm_response=confirm('Are you sure you want to delete '+$j.trim($j.mobile.activePage.find('.item_name').text())+'?');if(confirm_response)
{$j.mobile.pageLoading();var typed_id=$j.mobile.activePage.attr('id');var url='/index.php?rm=box_delete_items';var data={'q[item_typed_ids][0]':typed_id,'request_token':request_token};$j.post(url,data,function(){window.location.href=$j.mobile.activePage.find('.back_button').attr('href');});}},disable_zoom:function()
{$j('.meta_enable_zoom').remove();$j('head').prepend('<meta class="meta_disable_zoom" name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">');},enable_zoom:function()
{$j('.meta_disable_zoom').remove();$j('head').prepend('<meta class="meta_enable_zoom" name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=0.1, maximum-scale=10.0, user-scalable=1">');},get_comments:function(params)
{var listview=$j.mobile.activePage.find('#comments_listview');var typed_id=params.typed_id||listview.jqmData('typed_id');var is_shared=params.is_shared||listview.jqmData('is_shared');var shared_name=params.shared_name||listview.jqmData('shared_name');var all=params.all;$j.mobile.pageLoading();var url='';if(is_shared)
{url='/view_shared/'+shared_name;if(typed_id)
{url+='/'+typed_id;}}
else
{url='/view/'+typed_id;}
url+=(all?'&show_all=true':'')+'&json=true';$j.getJSON(url,function(response){listview.parent().html(response.html);var load_all_comments_row=listview.find('#load_all_comments_row');if(all||response.length<3)
{load_all_comments_row.hide();}
else
{load_all_comments_row.show();}
load_all_comments_row.removeClass('ui-btn-active');listview=$j.mobile.activePage.find('#comments_listview');listview.listview();listview.find('#comment_form_row').page();$j.mobile.pageLoading(true);});},get_display_date:function(date)
{var months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];return months[date.getMonth()]+' '+date.getDate()+', '+date.getFullYear();},handle_orientation_change:function()
{setTimeout(function(){Mobile.orientation=($j(window).height()>$j(window).width())?'portrait':'landscape';if(Mobile.orientation=='portrait')
{$j('.updated_by').hide();}
else
{$j('.updated_by').show();}},100);Mobile.set_name();},hide_modal:function(selector)
{$j.mobile.activePage.find(selector).hide();$j('.modal_overlay').remove();},hide_options:function()
{$j.mobile.activePage.find('.options_dropdown').hide();$j.mobile.activePage.find('.options_button').removeClass('options_button_highlighted');$j.mobile.activePage.find('.options_button_arrow').attr({src:'/img/mobile/ic_arrow_down.png'});},hide_search:function()
{$j.mobile.activePage.find('.nav_container').show();$j.mobile.activePage.find('.search_container').hide();$j.mobile.activePage.find('.search_input').blur();$j('.search_overlay').remove();},hide_smart_app_banner:function()
{$('.smart_app_banner').remove();var expires_date=new Date();expires_date.setTime((new Date()).getTime()+(1000*3600*24));var d=document.domain.split('.');if(d.length>2)d=d.slice(1);document.cookie='hide_smart_app_banner=1; expires='+expires_date.toGMTString()+'; domain=.'+d.join('.')+'; path=/';},rename_item:function()
{var item_name=$j.mobile.activePage.find('.rename_input').val();if(Mobile.validate_item_name(item_name))
{var typed_id=$j.mobile.activePage.attr('id');var url='/index.php?rm=box_files_update_item_info';var index=typed_id.lastIndexOf('_');if(typed_id.substring(0,index)=='f')
{var item_type='file';}
else if(typed_id.substring(0,index)=='d')
{var item_type='folder';}
var data={'item_id':typed_id.substring(index+1),'item_type':item_type,'field':'name','value':item_name};$j.post(url,data,function(response){if(response.error)
{$j('.rename_form .notification').html('<p>'+response.error+'</p>').show();}
else
{$j.mobile.pageLoading();Mobile._reload();}});return false;}},show_email_upload:function()
{$j.mobile.pageLoading();var typed_id=$j.mobile.activePage.attr('id');var url='/index.php?rm=box_email_folder_enable&folder_id='+typed_id.substring(2);$j.getJSON(url,function(response){if(response)
{$j.mobile.activePage.find('.folder_upload_email_input').val(response.address);$j.mobile.pageLoading(true);Mobile.show_modal('.folder_email_upload_modal');}});return false;},show_modal:function(selector)
{var top=$j(window).scrollTop();$j.mobile.activePage.find(selector).css({marginTop:top+30}).show();$j('<div class="modal_overlay">').height($j(document).height()).appendTo($j('body'));},show_options:function()
{$j.mobile.activePage.find('.options_dropdown').show();$j.mobile.activePage.find('.options_button').addClass('options_button_highlighted');},show_search:function()
{$j.mobile.activePage.find('.nav_container').hide();$j.mobile.activePage.find('.search_container').show();Mobile.show_search_overlay();},show_search_overlay:function()
{var top=$j.mobile.activePage.find('.navbar').offset().top;$j('.search_overlay').remove();$j('<div class="search_overlay">').css({top:top+40}).height($j(document).height()).width($j(document).width()).appendTo($j('body'));},upload_file:function()
{var form=$j.mobile.activePage.find('.upload_form');var file=form.find('.upload_file_input').val();file=file.substring(file.lastIndexOf('\\')+1).replace(/ /g,'+');var folder_id=form.find('.upload_folder_id').val();var file_id=form.find('.upload_file_id').val();var url='/index.php?rm=box_ajax_upload_begin&files_count=1&name='+file;url+='&folder_id='+folder_id;if(file_id)
{url+='&file_id='+file_id;}
$j.getJSON(url,function(response){$j.mobile.pageLoading();var action='/cgi-bin/indiv_file_upload.pl?usid='+response.upload_session_id;if(file_id)
{action+='&file_id='+file_id;}
form.attr('action',action);form.ajaxSubmit({success:function(){$j.mobile.pageLoading(true);window.location.reload();},error:function(){alert('Upload Rate Limit Exceeded');$j.mobile.pageLoading(true);window.location.reload();}});});return false;},validate_share:function()
{var input=$j.mobile.activePage.find('#share_email').val();var emails=input.split(/[\s,]+/);if(input.match(/^\s*$/))
{alert('Enter a valid email address.');return false;}
for(var email in emails)
{emails[email]=emails[email].replace(/\s/g,'');if(!Validator.validate_email(emails[email])&&emails[email]!="")
{alert(emails[email]+' is not a valid email address.');return false;}}
return true;},validate_item_name:function(file_name)
{if(!Validator.validate_file_name(file_name)||file_name.match(/^\s*$/))
{alert('Please enter a valid name.');return false;}
return true;},validate_search:function(search_string)
{if(!search_string||search_string.length<3)
{alert('Please enter a search for three or more characters.');return false;}
return true;},calculate_character_amount_to_display:function()
{var window_width=$j(window).width();var char_count=null;if(window_width<400)
{char_count=20;}
else if(window_width<600)
{char_count=30;}
else if(window_width<800)
{char_count=40;}
return char_count;},set_name:function()
{var chars=Mobile.calculate_character_amount_to_display();$j('.row_title').each(function(index)
{var file_name=$j(this).attr('data-name');$j(this).text(Mobile.truncate_string(file_name,chars));});},truncate_string:function(str,chars)
{if(chars&&chars<str.length+3)
{return str.substr(0,chars/2)+'...'+str.substr(str.length-chars/2);}
else
{return str;}},_reload:function()
{window.location.reload();},_reset_rename_modal_input:function()
{$j('.rename_modal .rename_input').attr('value',Mobile.original_file_name);}});$j(document).bind('mobileinit',function(){Mobile.create_breadcrumb_scroller();});$j(function(){$j('body').on('pagebeforeshow',function(){Mobile.handle_orientation_change();Mobile.set_name();if($j.mobile.activePage)
{Mobile.create_breadcrumb_scroller();if($j.mobile.activePage.hasClass('home_splash'))
{if(localStorage['hide_splash'])
{$j.mobile.changePage($j('#home'),{transition:'none'});}
localStorage['hide_splash']='1';}}
Mobile.hide_modal('.modal');Mobile.hide_search();Mobile.hide_options();setTimeout(function(){$j('.ui-btn-hover-d').removeClass('ui-btn-hover-d').addClass('ui-btn-up-d');},1);$j('.rename_form').submit(function(){Mobile.rename_item();return false;});$j('.search_form').submit(function(){return Mobile.validate_search(this.search_string.value);});$j('.create_folder_form').submit(function(){Mobile.create_folder();return false;});});$j(window).bind('orientationchange',function(){Mobile.handle_orientation_change();});Mobile.attach_tap_events();});