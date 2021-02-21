/* File System */
const fs = require('fs');
const data = require('../data.json');
const { date } = require('../utils');

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
        birthday: date(foundMember.birth).birthday,
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
    
    birth = Date.parse(request.body.birth);
    const created_at = Date.now();
    const id = (!data.members[data.members.length - 1]) ? 1 : data.members[data.members.length - 1].id + 1;

    data.members.push({id, ...request.body, birth});

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
        birth: date(foundMember.birth).iso
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