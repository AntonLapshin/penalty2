define([],function(){return function(e){var t=Array.prototype.slice.call(arguments,1);return e.replace(/{(\d+)}/g,function(e,n){return typeof t[n]!="undefined"?t[n]:e})}});