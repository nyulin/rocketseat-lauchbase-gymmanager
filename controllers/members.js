/* File System */
const fs = require('fs');
const data = require('../data.json');
const { age, date } = require('../utils');

/* List */
exports.list = function(request, response){
    return response.render("members/index", {members: data.members});
}

/* Show */
exports.show = function(request, response){
    const {id} = request.params;

    const foundMember = data.members.find(function(member){
        return member.id == id;
    });
    
    if(!foundMember) return response.send("404 - Member Not Found");

    const member = {
        ...foundMember,
        age: age(foundMember.birth),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundMember.created_at)
    };

   
    return response.render("members/show", { member});
}

/* Create */
exports.create = function(request, response){
    return response.render("members/create");
}

exports.post = function(request, response){
    const keys = Object.keys(request.body);

    for(key of keys){
        if (request.body[key] == "") {
            return response.send("400 - All fields are required");
        }
    }

    let {avatar, name, birth, gender} = request.body;
    
    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = Number(data.members.length + 1);

    data.members.push({id, avatar, name, birth, gender, created_at});

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
        if (err) {
            return response.send("Error");
        }
        
        return response.redirect(`/members/${id}`);
        
    });
}

/* Update */
exports.update = function(request, response){
    const {id} = request.params;

    const foundMember = data.members.find(function(member){
        return member.id == id;
    });
    
    if(!foundMember) return response.send("404 - Member Not Found");

    const member = {
        ...foundMember,
        birth: date(foundMember.birth)
    };
    return response.render("members/update", { member});
}

exports.put = function(request, response){
    const {id} = request.body;
    let index = 0;

    const foundMember = data.members.find(function(member, foundIndex){
        if(member.id == id){
            index = foundIndex;
            return true;
        }
    });
    
    if(!foundMember) return response.send("404 - Member Not Found");

    const member = {
        ...foundMember,
        ...request.body,
        birth: Date.parse(request.body.birth),
        id: Number(request.body.id)
    }

    data.members[index] = member;
    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err){
        if(err){
            return response.send("Error");
        }
        return response.redirect(`/members/${id}`);
    });
}

/* Delete */
exports.delete = function(request, response){
    const {id} = request.body;
    const filteredMembers = data.members.filter(function(member){
        return member.id != id;
    });

    data.members = filteredMembers;
    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err){
        if(err){
            return response.send("Error");
        }
        return response.redirect("/members");
    });
}