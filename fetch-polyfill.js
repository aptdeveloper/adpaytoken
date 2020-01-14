'use strict';



var self = this || global;



// Polyfill from https://github.com/github/fetch/blob/v1.1.1/fetch.js#L8-L21

var support = {

    searchParams: 'URLSearchParams' in self,

    iterable: 'Symbol' in self && 'iterator' in Symbol,

    blob: 'FileReader' in self && 'Blob' in self && (function () {

        try {

            new Blob()

            return true

        } catch (e) {

            return false

        }

    })(),

    formData: 'FormData' in self,

    arrayBuffer: 'ArrayBuffer' in self

}



// Polyfill from https://github.com/github/fetch/blob/v1.1.1/fetch.js#L364-L375

function parseHeaders(rawHeaders) {

    var headers = new Headers()

    rawHeaders.split(/\r?\n/).forEach(function (line) {

        var parts = line.split(':')

        var key = parts.shift().trim()

        if (key) {

            var value = parts.join(':').trim()

            headers.append(key, value)

        }

    });



    return headers;

}



// Polyfill from https://github.com/github/fetch/blob/v1.1.1/fetch.js#L424-L464

export default function fetchPolyfill(input, init) {

    return new Promise(function (resolve, reject) {

        var request = new Request(input, init)

        var xhr = new XMLHttpRequest()



        /* @patch: timeout */

        if (init && init.timeout) {

            xhr.timeout = init.timeout;

        }

        /* @endpatch */



        xhr.onload = function () {

            var options = {

                status: xhr.status,

                statusText: xhr.statusText,

                headers: parseHeaders(xhr.getAllResponseHeaders() || '')

            }

            options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')

            var body = 'response' in xhr ? xhr.response : xhr.responseText

            resolve(new Response(body, options))

        }



        xhr.onerror = function () {

            reject(new TypeError('Network request failed'))

        }



        xhr.ontimeout = function () {

            reject(new TypeError('Network request failed'))

        }



        xhr.open(request.method, request.url, true)



        if (request.credentials === 'include') {

            xhr.withCredentials = true

        }



        if ('responseType' in xhr && support.blob) {

            xhr.responseType = 'blob'

        }



        request.headers.forEach(function (value, name) {

            xhr.setRequestHeader(name, value)

        })



        xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)

    })

}