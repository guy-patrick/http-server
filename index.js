const http = require("http");

const port = 3000;

const requestListener = (req, res) => {
  const { url, params } = req;

  if (url === "/friends") {
    /* res.writeHead(200, {
      "Content-Type": "application/json",
    }); */
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        id: 1,
        name: "Sir Isaac Newton",
      })
    );
  } else if (url === "/messages") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<ul>");
    res.write("<li>Hello Isaac!</li>");
    res.write("<li>What are your thoughts on astronomy?</li>");
    res.write("</ul>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
};

const server = http.createServer();
server.on("request", requestListener);

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
