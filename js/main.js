
const library = [];

const libraryDisplay = document.querySelector(".content");
const form = document.querySelector("form");
const titleField = document.querySelector("#title");
titleField.required = true;
const authorField = document.querySelector("#author");
authorField.required = true;
const pagesField = document.querySelector("#pages");
pagesField.required = true;
const readCheck = document.querySelector("#read");

window.onload = () => {
    titleField.oninput = validateTitle;
    authorField.oninput = validateAuthor;
    pagesField.oninput = validatePages;
    titleField.onload = validateTitle;
}




//Allows the running of default validation, but stops from submitting the page
form.addEventListener("submit",addBook,false)
function addBook(event){
 event.preventDefault();
    let title = titleField.value;
    let author = authorField.value;
    let pages = pagesField.value;

    let read = readCheck.checked;
    addBookToLibrary(title,author,pages,read,library.length);
    form.reset();
    

}


function validateTitle(){
    let title = titleField.value;
    if(title.length <= 0){
        titleField.setCustomValidity("Please provide a book title.");
        return false;
    }else{
        titleField.setCustomValidity("");
    }
    return true;
}



function validateAuthor(){
    let author = authorField.value;
    if(author.length <= 0){
        authorField.setCustomValidity("Please provide a name for the author.");
        return false;
    }else{
        authorField.setCustomValidity("");
    }
    return true;
}


function validatePages(){
    let pages = pagesField.value;
    if(isNaN(pages) || pages <= 0){
        pagesField.setCustomValidity("Please enter the number of pages for this book.");
        return false;
    }else{
        pagesField.setCustomValidity("");
    }
    return true;
}




class Book {

    constructor(name, author, pages, read,id){
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.bookid = id;
    };
    get info() {
        console.log(`${this.name}, ${this.author}, ${this.pages}, ${this.read ? "Has been read" : "Yet to read"}`)
    };
    set read(value){
        this._read = value;
    };
    get read(){
        return this._read;
    };

}



function addBookToLibrary(name, author, pages, read,id) {
    //get form data
    let newBook = new Book(name, author, pages, read,id);
    //create book
    library.push(newBook);
    //add book to array
    displayBook(newBook);

}





function displayBook(newBook) {

    let newBookDisplay = document.createElement('div');

    newBookDisplay.className = "placeholdercard";
    newBookDisplay.dataset.id = newBook.bookid;

    let titleauthor = document.createElement('div');
    titleauthor.className = "titleauthor";

    let cardcontrol = document.createElement('div');
    cardcontrol.className = "cardcontrol";

    let deleteIcon = document.createElement('img');
    let readIcon = document.createElement('img');


    deleteIcon.setAttribute("src","./images/delete.svg") ;

    let icon = "./images/readcross.svg";;
    if(!newBook.read){
        icon = "./images/readtick.svg";
        readIcon.classList.add("notread");
    }
    readIcon.setAttribute("src",icon) ;


    readIcon.classList.add("readIcon");
    deleteIcon.classList.add("deleteIcon");

    deleteIcon.setAttribute("alt","deleteBook") ;
    readIcon.setAttribute("alt","toggleReadBook") ;


    let title = document.createElement('h1');
    title.textContent = newBook.name;

    let author = document.createElement('h2');
    author.textContent = newBook.author;

    let pagesread = document.createElement('div');
    pagesread.className = "pagesread";

    let pages = document.createElement('h3');
    pages.textContent = "Pages: " + newBook.pages;

    let read = document.createElement('h3');
    read.textContent = "Read: " + newBook.read;
    read.id = "beenread";

    pagesread.appendChild(pages);
    pagesread.appendChild(read);

    titleauthor.appendChild(title);
    titleauthor.appendChild(author);

    cardcontrol.appendChild(deleteIcon);
    cardcontrol.appendChild(readIcon);

    readIcon.addEventListener("click", (e) =>{
        let bookElement = e.target.parentElement.parentElement;
        let updateIndex = bookElement.dataset.id;
        library[updateIndex].read = !library[updateIndex].read ;
        let updateRead = bookElement.querySelector("#beenread")
        updateRead.textContent =  "Read: " + library[updateIndex].read;

        let imageSrc ="./images/readtick.svg";
        if(library[updateIndex].read){
            imageSrc = "./images/readcross.svg";
            e.target.classList.remove("notread");
        }else{
            e.target.classList.add("notread");
        }
        console.log( e.target);
        e.target.src = imageSrc;
        
    });


    deleteIcon.addEventListener("click",(e) => {
        //get the card the represents the book
        console.log(e.target.parentElement.parentElement);
        let bookElement = e.target.parentElement.parentElement;
        let deleteIndex = bookElement.dataset.id;
        console.log(deleteIndex);
        library.splice(deleteIndex,1)
        //remove self from dom
        bookElement.parentElement.removeChild(bookElement);

    });

    newBookDisplay.appendChild(titleauthor);
    newBookDisplay.appendChild(pagesread);
    newBookDisplay.appendChild(cardcontrol);
    libraryDisplay.appendChild(newBookDisplay);



}

function displayLibrary() {
    for (let i = 0; i < library.length; i++) {
        console.log(library[i]);
        displayBook(library[i]);
    }
}


displayLibrary();


