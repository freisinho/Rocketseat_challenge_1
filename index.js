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

server.post("/projects/:id/tasks", checkIfExistProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => {
    if (project.id === parseInt(id)) return project;
  });

  project.tasks.push(title);

  return res.json(projects);
});


server.delete("/projects/:id", checkIfExistProject, (req, res) => {
  const { id } = req.params;

  projects = projects.filter(function(project) {
    return project.id !== parseInt(id);
  });

  return res.json(projects);
});


server.listen(6666);
