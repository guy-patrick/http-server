const http = require("http");

const PORT = 3000;

const server = http.createServer();

const friends = [
  {
    id: 0,
    name: "Nikola Tesla",
  },
  {
    id: 1,
    name: "Sir Isaac Newton",
  },
  {
    id: 2,
    name: "Albert Einstein",
  },
];

server.on("request", (req, res) => {
  // url extraction
  const { url } = req;

  const items = url.split("/");
  // ex: output ["", "friends", "2"]
  //            ["", "messages"]

  const [, query, param] = items;

  switch (query) {
    case "friends":
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      if (items.length === 3) {
        res.end(JSON.stringify(friends[+param]));
      } else {
        res.end(JSON.stringify(friends));
      }
      break;
    case "messages":
      res.setHeader("Content-Type", "text/html");
      res.write("<html>");
      res.write("<body>");
      res.write("<ul>");
      res.write("<li>Hello Isaac!</li>");
      res.write("<li>What are your throughts as astronomy?</li>");
      res.write("</ul>");
      res.write("</body>");
      res.write("</html>");
      res.end();
    default:
      res.statusCode = 404;
      res.end();
      break;
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
