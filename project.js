const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films")


// Tüm Eventleri Yükleme

addEventListeners();

function addEventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);

    });

    cardBody.addEventListener("click",deleteFilm);
    document.addEventListener("click",clearAllFilms);
}
function addFilm(e){    
    const title = titleElement.value;  // input alanlarından değeri alma
    const director = directorElement.value;
    const url = urlElement.value;


    if (title === "" || director === "" || url === ""){
        // HATA
        UI.displayMessages("Tüm alanları doldurun...","danger");
    }
    else {
        // Yeni Film Oluşturma
        const newFilm = new Film (title,director,url);

        UI.addFilmToUI(newFilm);    // Arayüze Film Ekleme
        Storage.addFilmToStorage(newFilm);  // Storage Film Ekleme
        UI.displayMessages("Film başarıyla eklendi...","success")
    }


    UI.clearInputs(titleElement,urlElement,directorElement);

    e.preventDefault();     
}

function deleteFilm(e){

    if (e.target.id === "delete-film") {
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        UI.displayMessages("Silme işlemi başarılı","success");
        
    }
}
