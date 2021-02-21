const form = document.querySelector("#form-delete");
form.addEventListener("submit", function(event){
    if(!confirm("Are you sure?")){
        event.preventDefault();
    }                    
});