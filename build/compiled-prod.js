!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};b[g][0].call(j.exports,function(a){var c=b[g][1][a];return e(c?c:a)},j,j.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){var c=Object.prototype.toString;b.exports=function(a){switch(c.call(a)){case"[object Function]":return"function";case"[object Date]":return"date";case"[object RegExp]":return"regexp";case"[object Arguments]":return"arguments";case"[object Array]":return"array";case"[object String]":return"string"}if("object"==typeof a&&a&&"number"==typeof a.length)try{if("function"==typeof a.callee)return"arguments"}catch(b){if(b instanceof TypeError)return"arguments"}return null===a?"null":void 0===a?"undefined":a&&1===a.nodeType?"element":a===Object(a)?"object":typeof a}},{}],2:[function(a,b,c){var d,e,f,g,h,i,j;d="https://www.cine.io/api/1/-",e="rtmp://publish-sfo1.cine.io:1936/live",h={},j=Object.prototype.hasOwnProperty,i=function(a,b,c,d){return"function"==typeof c&&(d=c,c={}),j.call(c,"readFromCache")||(c.readFromCache=!0),c.readFromCache&&h[a]?setTimeout(function(){return d(null,h[a])}):g({url:a,dataType:"jsonp",success:function(b){return h[a]=b,d(null,b)},error:function(){return d(b)}}),null},c.getStreamDetails=function(a,b,c){var e,g;return g=""+d+"/stream?publicKey="+f.config.publicKey+"&id="+a,e="Could not fetch stream "+a,i(g,e,b,c)},c.nearestServer=function(a,b){var c,e;return e=""+d+"/nearest-server?default=ok",c="Could not fetch nearest server",i(e,c,a,b)},c.getStreamRecordings=function(a,b,c){var e,g;return g=""+d+"/stream/recordings?publicKey="+f.config.publicKey+"&id="+a,e="Could not fetch stream recordings for "+a,i(g,e,b,c)},c.defaultBaseUrl=function(){return e},c._clear=function(){return h={}},f=a("./main"),g=a("./vendor/ajax")},{"./main":5,"./vendor/ajax":9}],3:[function(a,b){[].slice;b.exports=function(){return function(){}}},{}],4:[function(a,b){var c,d;d=null,c=function(){return d||navigator},b.exports=function(){var a;try{if(new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))return!0}catch(b){if(a=b,"undefined"==typeof c())return!1;if(!c().mimeTypes)return!1;if(void 0===c().mimeTypes["application/x-shockwave-flash"])return!1;if(c().mimeTypes["application/x-shockwave-flash"].enabledPlugin)return!0}return!1},b.exports._injectNavigator=function(a){return d=a}},{}],5:[function(a,b){var c,d,e,f,g,h;a("./debug"),h=function(){if(!d.config.publicKey)throw new Error("CineIO.init(CINE_IO_PUBLIC_KEY) has not been called.")},g=function(){},d={version:"0.2.9",config:{},init:function(a,b){var c,e,f;if(!a)throw new Error("Public Key required");d.config.publicKey=a,f=[];for(c in b)e=b[c],f.push(d.config[c]=e);return f},reset:function(){return d.config={}},publish:function(a,b,c,d){if(null==d&&(d={}),h(),!a)throw new Error("Stream ID required.");if(!b)throw new Error("Password required.");if(!c)throw new Error("DOM node required.");return f["new"](a,b,c,d)},play:function(a,b,c,d){if(null==c&&(c={}),null==d&&(d=g),h(),!a)throw new Error("Stream ID required.");if(!b)throw new Error("DOM node required.");return"function"==typeof c&&(d=c,c={}),e.live(a,b,c,d)},playRecording:function(a,b,c,d,f){if(null==d&&(d={}),null==f&&(f=g),h(),!a)throw new Error("Stream ID required.");if(!b)throw new Error("Recording name required.");if(!c)throw new Error("DOM node required.");return"function"==typeof d&&(f=d,d={}),e.recording(a,b,c,d,f)},getStreamDetails:function(a,b){if(h(),!a)throw new Error("Stream ID required.");return c.getStreamDetails(a,b)},getStreamRecordings:function(a,b,d){if(h(),!a)throw new Error("Stream ID required.");return c.getStreamRecordings(a,b,d)}},"undefined"!=typeof window&&(window.CineIO=d),b.exports=d,e=a("./play_stream"),f=a("./publish_stream"),c=a("./api_bridge")},{"./api_bridge":2,"./debug":3,"./play_stream":6,"./publish_stream":7}],6:[function(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w;s=!1,m=!1,w=[],e=a("./debug")("cine:broadcast:play_stream"),n=function(){},f={stretching:"uniform",width:"100%",aspectratio:"16:9",primary:"flash",autostart:!0,metaData:!0,controls:!0,mute:!1,rtmp:{subscribe:!0}},l=function(){var a,b;return b="//jwpsrv.com/library/sq8RfmIXEeOtdhIxOQfUww.js",a="https:"===location.protocol?"https:":"http:",""+a+b},r=function(){var a,b,c;for(s=!0,b=0,c=w.length;c>b;b++)a=w[b],a.call();return w.length=0},g=function(a){return w.push(a)},h=function(a){return s?a():m?g(a):(m=!0,k(u("jwpsrv.com/library/sq8RfmIXEeOtdhIxOQfUww.js"),r),g(a))},v=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)?a[b]:f[b]},p=function(a,b,c,d){var e,f,g;return g={width:v(c,"width"),height:"100%",autoplay:v(c,"autostart"),controls:v(c,"controls"),mute:v(c,"mute"),src:a},e="<video src='"+g.src+"' height='"+g.height+"' "+(g.autoplay?"autoplay":void 0)+" "+(g.controls?"controls":void 0)+" "+(g.mute?"mute":void 0)+">",f=document.getElementById(b),f.innerHTML=e,d(null,f)},t=function(a,b,c,d,f){var g,h,j;return jwplayer.key=CineIO.config.jwPlayerKey,g={file:a,stretching:v(d,"stretching"),width:v(d,"width"),aspectratio:v(d,"aspectratio"),primary:v(d,"primary"),autostart:v(d,"autostart"),metaData:v(d,"metaData"),mute:v(d,"mute"),rtmp:v(d,"rtmp"),controlbar:v(d,"controls")},e("playing",g),h=jwplayer(c).setup(g),v(d,"controls")||h.setControls(!1),j=function(){return i()?f(null,h):p(b,c,d,f)},h.onReady(j),h.onSetupError(j)},o=function(a,b,c,e){return d.getStreamDetails(a,function(a,d){return a?e(a):d?t(d.play.rtmp,d.play.hls,b,c,e):e(new Error("stream not found"))})},j=function(a,b){var c,d,e,f;for(d=null,e=0,f=a.length;f>e;e++)if(c=a[e],c.name===b)return c.url},q=function(a,b,c,e,f){return d.getStreamRecordings(a,function(a,d){var g;return g=j(d,b),a?f(a):g?(e.primary=null,t(g,g,c,e,f)):f(new Error("Recording not found"))})},c.live=function(a,b,c,d){return null==c&&(c={}),null==d&&(d=n),h(function(){return"function"==typeof c&&(d=c,c={}),o(a,b,c,d)})},c.recording=function(a,b,c,d,e){return null==d&&(d={}),null==e&&(e=n),h(function(){return"function"==typeof d&&(e=d,d={}),q(a,b,c,d,e)})},k=a("./vendor/get_script"),i=a("./flash_detect"),d=a("./api_bridge"),u=a("./url_with_protocol")},{"./api_bridge":2,"./debug":3,"./flash_detect":4,"./url_with_protocol":8,"./vendor/get_script":10}],7:[function(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A=function(a,b){return function(){return a.apply(b,arguments)}};r=!1,q=!1,z={},e="Publisher",f="//cdn.cine.io/publisher.swf",t=0,i=a("./debug")("cine:broadcast:publish_stream"),s=function(){},j={serverURL:null,streamName:null,streamKey:null,audioCodec:"NellyMoser",streamWidth:720,streamHeight:404,streamFPS:15,keyFrameInterval:null,intervalSecs:3,bandwidth:1500,videoQuality:0,embedTimecode:!0,timecodeFrequency:1e3,favorArea:!1},p=function(a,b){var c,d,g,h,i,j,k,l,m,n;return l="11.4.0",n="playerProductInstall.swf",g={},i={},c={},i.allowscriptaccess="always",i.allowfullscreen="true",i.wmode="transparent",c.id=a,c.name=e,c.align="middle",d=document.getElementById(a).offsetWidth,k=y(b,"streamWidth"),j=y(b,"streamHeight"),h=d/(k/j),m=""+window.location.protocol+f,swfobject.embedSWF(m,a,"100%",h,l,n,g,i,c,function(c){var d;return c.success?(d=function(){return c.ref.setOptions({jsLogFunction:"_jsLogFunction",jsEmitFunction:b._emitCallback}),v(a)},setTimeout(d,1e3)):void 0})},v=function(a){var b,c,d,e;for(e=z[a],c=0,d=e.length;d>c;c++)b=e[c],b.call();return delete z[a]},k=function(a,b,c){return z[a]||(z[a]=[]),z[a].push(function(){return n(a,b,c)})},l=function(a){var b;return b=document.getElementById(a),b&&b.data===window.location.protocol+f?b:null},w=function(a,b){return function(){return q=!0,p(a,b)}},u=function(a){return null!=z[a]},n=function(a,b,c){var d;return(d=l(a))?c(d):u(a)?k(a,b,c):(k(a,b,c),q?p(a,b):o(x("ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js"),w(a,b,c)))},m=function(a,b){return""+a.streamName+"?"+b},y=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)?a[b]:j[b]},g=function(){function a(a,b,c,d,e){this.streamId=a,this.password=b,this.domNode=c,this.publishOptions=null!=d?d:{},null==e&&(e=s),this._eventHandler=A(this._eventHandler,this),this._setPublisherOptions=A(this._setPublisherOptions,this),"function"==typeof this.publishOptions&&(e=d,this.publishOptions={}),this._ensureLoaded(e),t+=1,this.publishOptions._emitCallback=h(this)}return a.prototype.start=function(a){return null==a&&(a=s),this._ensureLoaded(function(b){return function(c){return i("fetching stream",c),b._setPublisherOptions(c,function(b){return b?a(b):(c.start(),a())})}}(this))},a.prototype.stop=function(a){return null==a&&(a=s),this._ensureLoaded(function(b){var c;try{b.stop()}catch(d){return c=d,a(c)}return a()})},a.prototype.preview=function(a){return null==a&&(a=s),this._ensureLoaded(function(b){return function(c){return b._setPublisherOptions(c,function(b){var d;if(b)return a(b);try{c.preview()}catch(e){return d=e,a(d)}return a()})}}(this))},a.prototype.getMediaInfo=function(a){return null==a&&(a=s),this._ensureLoaded(function(b){var c,d;d=null;try{d=b.getMediaInfo()}catch(e){return c=e,a(c)}return a(null,d)})},a.prototype.sendData=function(a,b){return null==b&&(b=s),this._ensureLoaded(function(c){var d,e;e=null;try{e=c.sendData(a)}catch(f){return d=f,b(d)}return b(null,e)})},a.prototype.selectMicrophone=function(a){return null==a&&(a=s),this._ensureLoaded(function(b){var c,d;d=null;try{d=b.selectMicrophone()}catch(e){return c=e,a(c)}return a(null,d)})},a.prototype.selectCamera=function(a){return null==a&&(a=s),this._ensureLoaded(function(b){var c,d;d=null;try{d=b.selectCamera()}catch(e){return c=e,a(c)}return a(null,d)})},a.prototype._setPublisherOptions=function(a,b){return this._haveSetPublisherOptions?b():d.getStreamDetails(this.streamId,function(c){return function(d,e){var f;return d?b(d):(f=c._options(e),a.setOptions(f),c._haveSetPublisherOptions=!0,b())}}(this))},a.prototype._options=function(a){var b,c;return c={serverURL:this.serverURL||d.defaultBaseUrl(),streamName:m(a,this.password),audioCodec:y(this.publishOptions,"audioCodec"),streamWidth:y(this.publishOptions,"streamWidth"),streamHeight:y(this.publishOptions,"streamHeight"),streamFPS:y(this.publishOptions,"streamFPS"),bandwidth:1024*y(this.publishOptions,"bandwidth"),videoQuality:y(this.publishOptions,"videoQuality"),embedTimecode:y(this.publishOptions,"embedTimecode"),timecodeFrequency:y(this.publishOptions,"timecodeFrequency"),favorArea:y(this.publishOptions,"favorArea")},b=y(this.publishOptions,"intervalSecs"),c.keyFrameInterval=c.streamFPS*b,c},a.prototype._eventHandler=function(a){return"function"==typeof this.publishOptions.eventHandler?this.publishOptions.eventHandler(a):void 0},a.prototype._ensureLoaded=function(a){return null==a&&(a=s),d.nearestServer(function(b){return function(c,d){return b.serverUrl=d.transcode,n(b.domNode,b.publishOptions,a)}}(this))},a}(),c["new"]=function(a,b,c,d,e){return null==d&&(d={}),null==e&&(e=s),new g(a,b,c,d,e)},h=function(a){var b;return b="_publisherEmit"+t,window[b]=a._eventHandler,b},window._jsLogFunction=function(a){return i("_jsLogFunction",a)},o=a("./vendor/get_script"),d=a("./api_bridge"),x=a("./url_with_protocol")},{"./api_bridge":2,"./debug":3,"./url_with_protocol":8,"./vendor/get_script":10}],8:[function(a,b){var c;c=function(a){var b;return b="https:"===c._getProtocol()?"https":"http",""+b+"://"+a},c._getProtocol=function(){return location.protocol},b.exports=c},{}],9:[function(a,b){function c(){return!0}function d(a,b,d,e){return a.global?c(b||x,d,e):void 0}function e(a){a.global&&0===D.active++&&d(a,null,"ajaxStart")}function f(a){a.global&&!--D.active&&d(a,null,"ajaxStop")}function g(a,b){var c=b.context;return b.beforeSend.call(c,a,b)===!1||d(b,c,"ajaxBeforeSend",[a,b])===!1?!1:void d(b,c,"ajaxSend",[a,b])}function h(a,b,c){var e=c.context,f="success";c.success.call(e,a,f,b),d(c,e,"ajaxSuccess",[b,c,a]),j(f,b,c)}function i(a,b,c,e){var f=e.context;e.error.call(f,c,b,a),d(e,f,"ajaxError",[c,e,a]),j(b,c,e)}function j(a,b,c){var e=c.context;c.complete.call(e,b,a),d(c,e,"ajaxComplete",[b,c]),f(c)}function k(){}function l(a){return a&&(a==B?"html":a==A?"json":y.test(a)?"script":z.test(a)&&"xml")||"text"}function m(a,b){return(a+"&"+b).replace(/[&?]{1,2}/,"?")}function n(a){"object"===r(a.data)&&(a.data=p(a.data)),!a.data||a.type&&"GET"!=a.type.toUpperCase()||(a.url=m(a.url,a.data))}function o(a,b,c,d){var e="array"===r(b);for(var f in b){var g=b[f];d&&(f=c?d:d+"["+(e?"":f)+"]"),!d&&e?a.add(g.name,g.value):(c?"array"===r(g):"object"===r(g))?o(a,g,c,f):a.add(f,g)}}function p(a,b){var c=[];return c.add=function(a,b){this.push(E(a)+"="+E(b))},o(c,a,b),c.join("&").replace("%20","+")}function q(a){var b=Array.prototype.slice;return b.call(arguments,1).forEach(function(b){for(u in b)void 0!==b[u]&&(a[u]=b[u])}),a}var r;try{r=a("type-of")}catch(s){var t=a;r=t("type")}var u,v,w=0,x=window.document,y=/^(?:text|application)\/javascript/i,z=/^(?:text|application)\/xml/i,A="application/json",B="text/html",C=/^\s*$/,D=b.exports=function(a){var b=q({},a||{});for(u in D.settings)void 0===b[u]&&(b[u]=D.settings[u]);e(b),b.crossDomain||(b.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(b.url)&&RegExp.$2!=window.location.host);var c=b.dataType,d=/=\?/.test(b.url);if("jsonp"==c||d)return d||(b.url=m(b.url,"callback=?")),D.JSONP(b);b.url||(b.url=window.location.toString()),n(b);var f,j=b.accepts[c],o={},p=/^([\w-]+:)\/\//.test(b.url)?RegExp.$1:window.location.protocol,r=D.settings.xhr();b.crossDomain||(o["X-Requested-With"]="XMLHttpRequest"),j&&(o.Accept=j,j.indexOf(",")>-1&&(j=j.split(",",2)[0]),r.overrideMimeType&&r.overrideMimeType(j)),(b.contentType||b.data&&"GET"!=b.type.toUpperCase())&&(o["Content-Type"]=b.contentType||"application/x-www-form-urlencoded"),b.headers=q(o,b.headers||{}),r.onreadystatechange=function(){if(4==r.readyState){clearTimeout(f);var a,d=!1;if(r.status>=200&&r.status<300||304==r.status||0==r.status&&"file:"==p){c=c||l(r.getResponseHeader("content-type")),a=r.responseText;try{"script"==c?(1,eval)(a):"xml"==c?a=r.responseXML:"json"==c&&(a=C.test(a)?null:JSON.parse(a))}catch(e){d=e}d?i(d,"parsererror",r,b):h(a,r,b)}else i(null,"error",r,b)}};var s="async"in b?b.async:!0;r.open(b.type,b.url,s);for(v in b.headers)r.setRequestHeader(v,b.headers[v]);return g(r,b)===!1?(r.abort(),!1):(b.timeout>0&&(f=setTimeout(function(){r.onreadystatechange=k,r.abort(),i(null,"timeout",r,b)},b.timeout)),r.send(b.data?b.data:null),r)};D.active=0,D.JSONP=function(a){if(!("type"in a))return D(a);var b,c="jsonp"+ ++w,d=x.createElement("script"),e=function(){c in window&&(window[c]=k),j("abort",f,a)},f={abort:e},g=x.getElementsByTagName("head")[0]||x.documentElement;return a.error&&(d.onerror=function(){f.abort(),a.error()}),window[c]=function(d){clearTimeout(b),delete window[c],h(d,f,a)},n(a),d.src=a.url.replace(/=\?/,"="+c),g.insertBefore(d,g.firstChild),a.timeout>0&&(b=setTimeout(function(){f.abort(),j("timeout",f,a)},a.timeout)),f},D.settings={type:"GET",beforeSend:k,success:k,error:k,complete:k,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript",json:A,xml:"application/xml, text/xml",html:B,text:"text/plain"},crossDomain:!1,timeout:0},D.get=function(a,b){return D({url:a,success:b})},D.post=function(a,b,c,d){return"function"===r(b)&&(d=d||c,c=b,b=null),D({type:"POST",url:a,data:b,success:c,dataType:d})},D.getJSON=function(a,b){return D({url:a,success:b,dataType:"json"})};var E=encodeURIComponent},{"type-of":1}],10:[function(a,b){var c=function(a,b){var d=document.createElement("script");d.type="text/javascript",d.async=!1,d.src=a,c.ieCallback=c.ieCallback||function(a,b){"loaded"===a.readyState||"complete"===a.readyState?b():setTimeout(function(){c.ieCallback(a,b)},100)},"function"==typeof b&&("undefined"!=typeof d.addEventListener?d.addEventListener("load",b,!1):d.onreadystatechange=function(){d.onreadystatechange=null,c.ieCallback(d,b)}),c.firstScriptEl=c.firstScriptEl||document.getElementsByTagName("script")[0],c.firstScriptEl.parentNode.insertBefore(d,c.firstScriptEl)};b.exports=c},{}]},{},[5]);