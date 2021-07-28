const http = require('http');
const fs = require('fs').promises;
const books = JSON.stringify(require('../json/books.json'));
const authors = JSON.stringify(require('../json/authors.json'));

const host = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');
    switch (req.url) {

        case "/":
            var projectPathname = __dirname.substring(0, (__dirname.lastIndexOf('webserver2') + 10));
            fs.readFile(projectPathname + '/src/index.html')
                .then(contents => {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(contents);
                })
                .catch (err => {
                    res.writeHead(500);
                    res.end(err);
                    return;
                });
        break;

        case "/books":
            res.writeHead(200);
            res.end(books);
            break

        case "/authors":
            res.writeHead(200);
            res.end(authors);
            break
    
        default:
            res.writeHead(404);
            res.end(JSON.stringify({error:"Resource not found"}));
            break
    };
});

server.listen(port, host, () => {
    console.log(`Server running at hthp://${host}:${port}`);
});