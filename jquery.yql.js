/**
 * ----------------------------------------------------------------------------
 * jQuery.xdomainrequest
 * jQuery plugin for issue cross domain request with Yahoo Query Language
 * ----------------------------------------------------------------------------
 *
 * yatt/brainfs http://d.hatena.ne.jp/yatt/
 *
 *
 *     this extension enables you to request resource belogns to external domain
 * such as text, xml document, html document, json, and so on. if you specify
 * $.ajax dataType as 'xdomain:*', then request is redirected to
 * Yahoo Query Language API. using this extension, you can access resources
 * in local domain and external domain tranceparently.
 *     in addition, you can pass Array object to url parameter. extension handle
 * requests as one batch process, allows you to cut off unnecessary network turn
 * around and provides less API waste
 *
 * supported datatype ('xdomain:*') below:
 *   - html
 *   - xml
 *   - json
 *   - text
 *   - zip (when jquery.zip.inflate 
 *          at https://github.com/yatt/jquery.zip.inflate
 *          is included then archive will be inflated)
 *
 * ********* REMARK
 * YQL limits base64 encoded datasize less than or equal to 256kB so if you
 * intend to access a bit large size resource, then API may return fail
 * response some time.
 * 
 * see yql detail: http://developer.yahoo.com/yql/
 *
 *
 * sample)
 *
 *     $.ajax({
 *         url: 'http://externalsite.com/resource.txt'
 *         dataType: 'xdomain:text'
 *         success: function(data){
 *             console.log(data)
 *         }
 *     })
 *     $.ajax({
 *         url: ['http://externalsite.com/x.json', 'http://ex.jp/y.json']
 *         dataType: 'xdomain:json'
 *         success: function(data){
 *             console.log(data[0].result.count) // x.json
 *             console.log(data[1].user.id) // y.json
 *         }
 *     })
 *
 *     // if jquery.zip.inflate is included
 *     $.ajax({
 *         url: 'http://ex.com/x.zip'
 *         dataType: 'xdomain:zip'
 *         success: function(data){
 *             console.log(data.files) // file names in zip archive
 *             // get text content
 *             console.log(data.files['tmp/hello.txt'].inflate())
 *         }
 *     })
 */

jQuery.ajax = (function(_ajax){
    return function(o) { // options
        o.type = o.type || 'get'
        var url = o.url,
            dsplit = o.dataType.split(':'),
            isYQLRequest = (dsplit[0] == 'xdomain')
        
        if (isYQLRequest) {
            var YQL = (/https/.test(location.protocol) ? 'https': 'http') + '://query.yahooapis.com/v1/public/yql?callback=?',
                originalDataType = o.dataType,
                urlcond = jQuery.map(url, function(n){ return '"' + n.replace(/"/g, '\\"') + '"' }),
                query = 'select * from data.uri where url in (' + urlcond + ')'
            console.log("query: " + query)
            // redirect request to yql jsonp-x request
            o.url = YQL
            o.dataType = 'json'
            o.data = {
                q: query,
                format: 'json'
            }

            // Since it's a JSONP request
            // complete === success
            if (!o.success && o.complete) {
                o.success = o.complete
                delete o.complete
            }
            
            // 
            o.success = (function(_success){
                return function(data) {
                    if (_success) {
                        // error check
                        
                        var dtype = dsplit[1]
                        var fn = function(n){ return n }
                        if (dtype == 'html') {
                            fn = jQuery
                        }
                        if (dtype == 'xml') {
                            fn = jQuery.parseXML
                        }
                        if (dtype == 'json') {
                            fn = jQuery.parseJSON
                        }
                        // when jquery.zip.inflate is included then try zip binary to archive object
                        if (dtype == 'zip' && jQuery.zip != null && jQuery.zip.inflate != null) {
                            fn = function(raw){
                                return jQuery.zip.inflate(jQuery.zip.unpack(raw))
                            }
                        }
                        // convert response text from api to binary string
                        var proxy = (function(fn) {
                            return function(n){
                                var b64text = n.slice(n.indexOf(',') + 1)
                                var raw = jQuery.base64.decode(b64text)
                                return fn(raw)
                            }
                        })(fn)

                        var args = null
console.log(data)
                        var resp = data.query.results.url
                        if (typeof resp == 'string')
                            args = proxy(resp)
                        else
                            args = jQuery.map(resp, proxy)

                        // Fake XHR callback.
                        _success.call(this, args, 'success')
                    }
                    
                };
            })(o.success)
            
            // error handling
        }
        
        return _ajax.apply(this, arguments)
        
    }
    
})(jQuery.ajax);
