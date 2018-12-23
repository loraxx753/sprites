/* I want to use fetch on the server side  */
require('isomorphic-fetch');
// I can one line all the imports thanks to destructuring assignment (1).
const [http, fs, path, url, mimeTypes] = [require('http'), require('fs-extra'), require('path'), require('url'), require('./mimeTypes.js')] // ./mimeTypes is just an object. Go look real quick.
const parser = require('url')
// Without this semi-colon in front, this would try to run [require('http') ...]()
;(async (port) => server(port))(3000) // A compacted self-calling function

/* 
    `server(port)` is called before it's defined, so the function  a declaration and not an expression (2)
*/

/**
 * Creates and maintains the server.
 * @param {Number} port
 */
async function server(port) {
    // http.createServer() is one of node's default features (3)
    http.createServer(async (request, response) => {
        const url = parser.parse(request.url)
        var filePath = './routes' + url.pathname;
        /*    
            This:
                if(await fs.exists(filePath) {
                    console.log('it does!')
                }
            Is the same as this:
                fs.exists(filePath, function() {
                    console.log('it does!')
                })
        */

        switch (url.pathname) {
            case '/':
                // Same with this. instead of a callback function, await makes it return the value.
                const content =  await fs.readFile(`./routes/index.html`)
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(content, 'utf-8');
                break;
            default:
                fs.readFile(filePath, function(error, content) {
                    const extname = String(path.extname(filePath)).toLowerCase();
                    const contentType = mimeTypes[extname] || 'application/octet-stream';

                    if (error) {
                        if(error.code == 'ENOENT') {                        
                            fs.readFile('./404.html', function(error, content) {
                                response.writeHead(200, { 'Content-Type': contentType });
                                response.end(content, 'utf-8');
                            });
                        }
                        else {
                            response.writeHead(500);
                            response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                            response.end();
                        }
                    }
                    else {
                        response.writeHead(200, { 'Content-Type': contentType });
                        response.end(content, 'utf-8');
                    }
                });
                break;
        }

    }).listen(port, '127.0.0.1');
    console.log(`Server running at http://127.0.0.1:${port}/`);
}

const checkPage = async (url, term) => {
    return await fetch(url)
        .then(async resp => resp.text())
        .then(r => {
            if(r.match(term)) {
                const m = r.match(term)
                return r.substring(m.index - 8, m.index + term.length + 8)
            } else {
             return false;   
            }
        }).catch(e => {
            console.log(e.message)
        })
}