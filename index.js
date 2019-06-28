const express = require("express");

const server = express();

server.use(express.json());

const projects=[];

server.post("/projects", (req, res) => {
  const { id, title, tasks } = req.body;

  projects.push({ id, title, tasks });
  return res.json(projects);
});


server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.listen(6666);
