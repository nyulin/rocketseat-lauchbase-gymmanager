const modalOverlay = document.querySelector(".modal_overlay");
const cards = document.querySelectorAll(".card");

for (let card of cards){
    card.addEventListener("click", function(){
        window.location.href = `http://localhost:5000/video?id=${card.id}`;
    });
}