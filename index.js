const express = require("express");

const server = express();

server.use(express.json());

const projects=[];



function checkIfExistProject(req, res, next) {
  const { id } = req.params;

  const project = projects.find(project => {
    if (project.id === parseInt(id)) return project;
  });

  if (!project) {
    return res.status(400).json({ error: "Project does not exist" });
  }

  return next();
}

server.post("/projects", (req, res) => {
  const { id, title, tasks } = req.body;

  projects.push({ id, title, tasks });
  return res.json(projects);
});


server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.get("/projects/:id",checkIfExistProject, (req, res) => {
  const { id } = req.params;

  const project = projects.find(project => {
    if (project.id === parseInt(id)) return project;
  });

  return res.json(project);
});



server.listen(6666);
