function createXHR () {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }
    else if (typeof ActiveXObject !== 'undefined') {
        if (typeof arguments.callee.activeXString !== 'undefined') {
            var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'];
            var i, len;
            for (i = 0, len = versions.length; i < len; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (error) {
                    
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    }
    else {
        throw new Error('No XHR Object available.')
    }
}