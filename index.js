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
  const { url, method } = req;

  const items = url.split("/");
  // ex: output ["", "friends", "2"]
  //            ["", "messages"]

  const [, query, param] = items;

  if (method === "POST" && query === "friends") {
    req.on("data", (data) => {
      const friend = data.toString();
      console.log("Request:", friend);
      friends.push(JSON.parse(friend));
    });
    req.pipe(res);
  } else if (method === "GET" && query === "friends") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    if (items.length === 3) {
      res.end(JSON.stringify(friends[+param]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (method === "GET" && query === "messages") {
    res.statusCode = 200;
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
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
