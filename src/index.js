// write your code here

const ramens_URL = "http://localhost:3000/ramens/"


function ramenLoad () {
    fetch(ramens_URL)
        .then(res => res.json())
        .then(ramens => {
            createRamenMenu(ramens)
            showRamenDetails(ramens[0])
        })
        .catch(error => console.log(error))
}


function createRamenMenu (ramens) {
    ramens.forEach((ramen) => {
    
    const ramenMenu = document.querySelector("#ramen-menu")

    const ramenImg = document.createElement("img")
        ramenImg.src = ramen.image
        ramenImg.addEventListener("click", () => showRamenDetails(ramen))


    ramenMenu.append(ramenImg)
    })
}


function showRamenDetails (ramen) {

    // const ramenDetail = document.querySelector("#ramen-detail")
    
    const ramenName = document.querySelector(".name")
        ramenName.textContent = ramen.name
    
    const ramenRestaurant = document. querySelector(".restaurant")
        ramenRestaurant.textContent = ramen.restaurant

    const ramenDetailImg  = document.querySelector(".detail-image")
        ramenDetailImg.src = ramen.image
        ramenDetailImg.alt = ramen.name
        ramenDetailImg.id = ramen.id

    const ramenRating = document.querySelector("#rating-display")
        ramenRating.textContent = ramen.rating

    const ramenComment = document.querySelector("#comment-display")
        ramenComment.textContent = ramen.comment

    const editForm = document.querySelector("#edit-ramen")

    const editRating = editForm.querySelector("#new-rating")
        editRating.value = ramen.rating

    const editComment = editForm.querySelector("#new-comment")
        editComment.value = ramen.comment
    
}

function newRamenSubmit () {
    const ramenForm = document.querySelector("#new-ramen")

    ramenForm.addEventListener("submit", (e) => submitNewRamen(e, ramenForm))
}

function submitNewRamen (e, ramenForm) {
    e.preventDefault()
    
    const newRamen = {}

    const newName = ramenForm.querySelector("#new-name")
    const newRestaurant = ramenForm.querySelector("#new-restaurant")
    const newImage = ramenForm.querySelector("#new-image")
    const newRating = ramenForm.querySelector("#new-rating")
    const newComment = ramenForm.querySelector("#new-comment")

    newRamen.name = newName.value
    newRamen.restaurant = newRestaurant.value
    newRamen.image = newImage.value
    newRamen.rating = newRating.value
    newRamen.comment = newComment.value

    const postNewRamen = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newRamen)
    }

    fetch(ramens_URL, postNewRamen)
        .then(res =>  res.json())
        .then(ramen => console.log(ramen))
        .catch(error => console.log(error))

    ramenForm.reset()
}

function editRamenSubmit () {
    const editForm = document.querySelector("#edit-ramen")

    editForm.addEventListener("submit", (e) => submitEditRamen(e, editForm))
}


function submitEditRamen (e, editForm) {
    e.preventDefault()

    const editRamen = {}

    const editRating = editForm.querySelector("#new-rating")
        editRamen.rating = parseInt(editRating.value)
    const editComment = editForm.querySelector("#new-comment")
        editRamen.comment = editComment.value

    editRamen.id = document.querySelector(".detail-image").id

    patchRamen = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(editRamen)
    }
    
    fetch(ramens_URL + editRamen.id, patchRamen)
        .then(res => res.json())
        .then(ramen => console.log(ramen))


}

function init () {
    ramenLoad();
    newRamenSubmit();
    editRamenSubmit();

}

document.addEventListener("DOMContentLoaded", init)