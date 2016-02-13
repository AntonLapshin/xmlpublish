/*
*  C9Charts API iFrame
*/
;(function(window){

    String.prototype.f = function() {
        var s = this, i = arguments.length;
        while (i--) { s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]); }
        return s;
    };

    var _default = {
        title: false,
        filter: false,
        border: false,
        setting: false,
        resize: false,
        menu: false,
        actions: false,
        drag: false
    };

    var _template = 
        '<form target="c9login" action="https://www.cloud9charts.com/touchdown?{0}" method="post">' +
	    '<input type="hidden" name="username" value="{1}" />' +
	    '<input type="hidden" name="password" value="{2}" />' +
        '</form>' +
        '<iframe src="" name="c9login" style="border: 0;width:100%;height:100%"></iframe>';

    window.C9Charts = {
    	render: function(selector, options){
            var $container = $(selector);
            var opts = $.extend(true, _default, options.view);
            var search = '?' + $.map(opts, function(value, name){
            	return name + '=' + value;
            }).join('&');
            $container.html(_template.f(search, options.username, options.password));
            var $form = $container.find('form');
            $form.submit();
            options.onload && $container.find('iframe').on('load', options.onload);
        }
    };
    
})(window);
