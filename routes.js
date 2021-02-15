const express = require("express");
const routes = express.Router();
const instructors = require("./controllers/instructors");
const members = require("./controllers/members");


routes.get("/", function(request, response){
    return response.redirect("/instructors");
});

routes.get("/instructors", instructors.list);
routes.get("/instructors/create", instructors.create);
routes.get("/instructors/:id", instructors.show);
routes.get("/instructors/:id/update", instructors.update);
routes.post("/instructors", instructors.post);
routes.put("/instructors", instructors.put);
routes.delete("/instructors", instructors.delete);

routes.get("/members", members.list);
routes.get("/members/create", members.create);
routes.get("/members/:id", members.show);
routes.get("/members/:id/update", members.update);
routes.post("/members", members.post);
routes.put("/members", members.put);
routes.delete("/members", members.delete);

module.exports = routes;