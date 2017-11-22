/**
 * @file gitbook baidu anaylise plugin
 */

function getScript(token) {
    return "<script>var _hmt = _hmt || [];(function() {var hm = document.createElement('script');hm.src = '//hm.baidu.com/hm.js?" + token + "';var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(hm, s);})();</script>";
}

module.exports = {
    website: {
        html: {
            "body:end": function() {
                return getScript(this.options.pluginsConfig.ba.token);
            }
        }
    },
    hooks: {
        "page": function (page) {
            if (page.type !== "markdown") {
                return page;
            }
            // Rewrite content (add baidu anaylise script)
            page.content += getScript( this.config.get('pluginsConfig').ba.token);

            return page;
        }
    }
};