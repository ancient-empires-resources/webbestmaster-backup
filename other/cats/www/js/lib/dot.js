(function(){function n(a,b,e){return("string"===typeof b?b:b.toString()).replace(a.define||h,function(b,c,d,g){0===c.indexOf("def.")&&(c=c.substring(4));c in e||(":"===d?(a.defineParams&&g.replace(a.defineParams,function(b,a,d){e[c]={arg:a,text:d}}),c in e||(e[c]=g)):(new Function("def","def['"+c+"']="+g))(e));return""}).replace(a.use||h,function(b,c){a.useParams&&(c=c.replace(a.useParams,function(b,a,c,d){if(e[c]&&e[c].arg&&d)return b=(c+":"+d).replace(/'|\\/g,"_"),e.__exp=e.__exp||{},e.__exp[b]=
	e[c].text.replace(new RegExp("(^|[^\\w$])"+e[c].arg+"([^\\w$])","g"),"$1"+d+"$2"),a+"def.__exp['"+b+"']"}));var d=(new Function("def","return "+c))(e);return d?n(a,d,e):d})}function k(a){return a.replace(/\\('|\\)/g,"$1").replace(/[\r\t\n]/g," ")}var f={version:"1.0.3",templateSettings:{evaluate:/\{\{([\s\S]+?(\}?)+)\}\}/g,interpolate:/\{\{=([\s\S]+?)\}\}/g,encode:/\{\{!([\s\S]+?)\}\}/g,use:/\{\{#([\s\S]+?)\}\}/g,useParams:/(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
	define:/\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,defineParams:/^\s*([\w$]+):([\s\S]+)/,conditional:/\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,iterate:/\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,varname:"it",strip:!0,append:!0,selfcontained:!1,doNotSkipEncoded:!1},template:void 0,compile:void 0},l;f.encodeHTMLSource=function(a){var b={"&":"&#38;","<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","/":"&#47;"},e=a?/[&<>"'\/]/g:/&(?!#?\w+;)|<|>|"|'|\//g;return function(a){return a?
	a.toString().replace(e,function(a){return b[a]||a}):""}};l=function(){return this||(0,eval)("this")}();"undefined"!==typeof module&&module.exports?module.exports=f:"function"===typeof define&&define.amd?define(function(){return f}):l.doT=f;var p={start:"'+(",end:")+'",startencode:"'+encodeHTML("},q={start:"';out+=(",end:");out+='",startencode:"';out+=encodeHTML("},h=/$^/;f.template=function(a,b,e){b=b||f.templateSettings;var m=b.append?p:q,c,d=0,g;a=b.use||b.define?n(b,a,e||{}):a;a=("var out='"+(b.strip?
	a.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,""):a).replace(/'|\\/g,"\\$&").replace(b.interpolate||h,function(a,b){return m.start+k(b)+m.end}).replace(b.encode||h,function(a,b){c=!0;return m.startencode+k(b)+m.end}).replace(b.conditional||h,function(a,b,c){return b?c?"';}else if("+k(c)+"){out+='":"';}else{out+='":c?"';if("+k(c)+"){out+='":"';}out+='"}).replace(b.iterate||h,function(b,a,c,e){if(!a)return"';} } out+='";d+=1;g=e||"i"+d;a=k(a);return"';var arr"+
		d+"="+a+";if(arr"+d+"){var "+c+","+g+"=-1,l"+d+"=arr"+d+".length-1;while("+g+"<l"+d+"){"+c+"=arr"+d+"["+g+"+=1];out+='"}).replace(b.evaluate||h,function(a,b){return"';"+k(b)+"out+='"})+"';return out;").replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(/\r/g,"\\r").replace(/(\s|;|\}|^|\{)out\+='';/g,"$1").replace(/\+''/g,"");c&&(b.selfcontained||!l||l._encodeHTML||(l._encodeHTML=f.encodeHTMLSource(b.doNotSkipEncoded)),a="var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : ("+f.encodeHTMLSource.toString()+
	"("+(b.doNotSkipEncoded||"")+"));"+a);return new Function(b.varname,a)};f.compile=function(a,b){return f.template(a,null,b)}})();