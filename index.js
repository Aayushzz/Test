const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  /*if (req.url === "/") {
    fs.readFile(path.join(__dirname, "public", "index.html"), (err, data) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }
  if (req.url === "/api/users") {
    const user = [
      { name: "Bob", age: 40 },
      { name: "John", age: 41 },
    ];
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  }*/

  //build file path
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );
 //extension of file
 let extname = path.extname(filePath);

 //initital content type 
 let contentType = 'text/html';

 //checl lext and set content type
 switch(extname){

 }

 //read file
 fs.readFile(filePath, (err, content) => {
    if(err) {
        if(err.code == "ENOENT") {
            //page not found
            fs.readFile(path.join(__dirname, 'public', '404.html'), (err,content) => {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.end(content, 'utf8');
            })
        }else{
            //some server error
            res.writeHead(500);
            res.end(`Server Error: ${err.code}`);
        }
    } else{
        //success 
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.end(content, 'utf8')
    }
 })
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
