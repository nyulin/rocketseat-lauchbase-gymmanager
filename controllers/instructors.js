/* File System */
const fs = require('fs');
const data = require('../data.json');
const { age, date } = require('../utils');

/* List */
exports.list = function(request, response){
    return response.render("instructors/index", {instructors: data.instructors});
}

/* Show */
exports.show = function(request, response){
    const {id} = request.params;

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id;
    });
    
    if(!foundInstructor){
        return response.send("404 - Instructor Not Found");
    }

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at)
    };

   
    return response.render("instructors/show", { instructor});
}

/* Create */
exports.create = function(request, response){
    return response.render("instructors/create");
}

exports.post = function(request, response){
    const keys = Object.keys(request.body);

    for(key of keys){
        if (request.body[key] == "") {
            return response.send("400 - All fields are required");
        }
    }

    let {avatar, name, birth, gender, services} = request.body;
    
    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = Number(data.instructors.length + 1);

    data.instructors.push({id, avatar, name, birth, gender, services, created_at});

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
        if (err) {
            return response.send("Error");
        }
        
        return response.redirect(`/instructors/${id}`);
        
    });
}

/* Update */
exports.update = function(request, response){
    const {id} = request.params;

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id;
    });
    
    if(!foundInstructor){
        return response.send("404 - Instructor Not Found");
    }

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth).iso
    };
    return response.render("instructors/update", { instructor});
}

exports.put = function(request, response){
    const {id} = request.body;
    let index = 0;

    const foundInstructor = data.instructors.find(function(instructor, foundIndex){
        if(instructor.id == id){
            index = foundIndex;
            return true;
        }
    });
    
    if(!foundInstructor){
        return response.send("404 - Instructor Not Found");
    }

    const instructor = {
        ...foundInstructor,
        ...request.body,
        birth: Date.parse(request.body.birth),
        id: Number(request.body.id)
    }

    data.instructors[index] = instructor;
    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err){
        if(err){
            return response.send("Error");
        }
        return response.redirect(`/instructors/${id}`);
    });
}

/* Delete */
exports.delete = function(request, response){
    const {id} = request.body;
    const filteredInstructors = data.instructors.filter(function(instructor){
        return instructor.id != id;
    });

    data.instructors = filteredInstructors;
    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err){
        if(err){
            return response.send("Error");
        }
        return response.redirect("/instructors");
    });
}