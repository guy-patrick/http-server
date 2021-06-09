const http = require("http");

const port = 3000;

const server = http.createServer();

const friends = [
  {
    id: 0,
    name: "Nikola Tesla",
  },
  {
    id: 1,
    name: "Sir Isacc Newton",
  },
];

const requestListener = (req, res) => {
  const { url, params } = req;
  const [, endpoint, param] = url.split("/");

  if (endpoint === "friends") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    if (param) {
      res.end(JSON.stringify(friends[+param]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (endpoint === "messages") {
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

server.on("request", requestListener);

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
