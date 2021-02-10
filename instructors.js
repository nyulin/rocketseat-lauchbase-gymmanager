/* File System */
const fs = require("fs");
const data = require("./data.json");

/* Create */
exports.post = function(request, response){
    const keys = Object.keys(request.body);

    for(key of keys){
        if (request.body[key] == "") {
            return response.send("Error");
        }
    }

    data.instructors.push(request.body);

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
        if (err) {
            return response.send("Error");
        }

        return response.redirect("/instructors");
    });

    return response.send(request.body);
}


/* Update */

/* Delete */