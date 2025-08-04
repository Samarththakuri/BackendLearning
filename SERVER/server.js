// these all are modules needed for http , fs, path
const http = require("http");
const fs = require("fs");
const path = require("path");
const { ifError } = require("assert");

const port = 3000;

const server = http.createServer((request, response) => {
  // accessing current directory
  const filepath = path.join(
    __dirname,
    request.url === "/" ? "index.html" : request.url
  );
  console.log(filepath);

  const extName = String(path.extname(filepath)).toLowerCase();
  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "img/png",
  };
  //   the server supports the extension type Unknown files: Fall back to
  // "application/octet-stream" → browser downloads them
  const contentType = mimeTypes[extName] || "applicaton/octet-stream";

  fs.readFile(filepath, (error, content) => {
    if (error) {
      if (error.code === "ENOENT") {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end("404: File Not Found");
      }
    } else {
      // head has the status code and body has the content
      response.writeHead(200, { "Content-Type": contentType });
      response.end(content, "utf-8");
    }
  });
});

// .listen() method is used to start a server and make it listen for incoming
//  connections on a specific port and optionally on a specific IP address (host).
server.listen(port, () => {
  console.log(`server is listening on port ${port} `);
});
