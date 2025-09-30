const http = require("node:http");
const fs = require("node:fs/promises");

const server = http.createServer();

server.on(`request`, (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  const path = url.pathname;

  let fileLoc = "views/404.html";

  if (path == `/` || path == `/home`) {
    fileLoc = "views/index.html";
  } else if (path == `/about`) {
    fileLoc = "views/about.html";
  } else if (path == `/contact-us`) {
    fileLoc = "views/contact-us.html";
  }

  serveFile(fileLoc, res);
});

server.listen(8080, () => {
  console.log("Server is listening on port 8080");
});

async function serveFile(fileLoc, res) {
  try {
    const data = await fs.readFile(fileLoc);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(data);
  } catch (err) {
    const errorData = await fs.readFile("views/404.html");
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end(errorData);
  }
}
