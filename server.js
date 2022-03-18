const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {


  fs.appendFile('./views/visits.txt', req.url + '\n', function (err) {
    if (err) throw err;
    console.log('saved to log file the visited path:', req.url);
  });
  
  // set header content type
  res.setHeader('Content-Type', 'text/html');

  console.log("request url:", req.url);
  // routing
  let path = './views/';
  switch(req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    case '/about-me':
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      break;
    case '/history':
      res.setHeader('Content-Type', 'text/plain');
      path += 'visits.txt';
      res.statusCode = 200;
      break;
    default:
      path += '404.html';
      res.statusCode = 404;
  }

  // send html
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    }
    //res.write(data);
    res.end(data);
  });


});

// localhost is the default value for 2nd argument
server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000');
});
