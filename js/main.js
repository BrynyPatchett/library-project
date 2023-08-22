console.log("Hello World");

const library = [];

const libraryDisplay = document.querySelector(".content");


function Book(name, author, pages, read,id) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.bookid = id;
    this.info = function () {
        console.log(`${this.name}, ${this.author}, ${this.pages}, ${this.read ? "Has been read" : "Yet to read"}`)
    }
    this.toggleRead = function () {
        this.read = !this.read;
    }

}



function addBookToLibrary(name, author, pages, read) {
    //get form data
    let newBook = new Book(name, author, pages, read,library.length);
    //create book
    library.push(newBook);
    //add book to array
    displayBook();

}





function displayBook(newBook) {

    let newBookDisplay = document.createElement('div');
    newBookDisplay.className = "placeholdercard";
    newBookDisplay.dataset.id = newBook.bookid;

    let titleauthor = document.createElement('div');
    titleauthor.className = "titleauthor";

    let title = document.createElement('h1');
    title.textContent = newBook.name;

    let author = document.createElement('h2');
    author.textContent = newBook.author;

    let pagesread = document.createElement('div');
    pagesread.className = "pagesread";

    let pages = document.createElement('h3');
    pages.textContent = newBook.pages;

    let read = document.createElement('h3');
    read.textContent = newBook.read;

    pagesread.appendChild(pages);
    pagesread.appendChild(read);

    titleauthor.appendChild(title);
    titleauthor.appendChild(author);

    newBookDisplay.appendChild(titleauthor);
    newBookDisplay.appendChild(pagesread);

    libraryDisplay.appendChild(newBookDisplay);

}

function displayLibrary() {
    for (let i = 0; i < library.length; i++) {
        console.log(library[i]);
        displayBook(library[i]);
    }
}

let firstBook = new Book("The Lord of the rings", "J.R.R Tolkien", 300, false, 0);
let secondBook = new Book("The Hobbit", "J.R.R Tolkien", 248, true,1);




library.push(firstBook);
library.push(secondBook);
library.push(secondBook);
library.push(firstBook);
// library.push(new Book("The Lord of thasdasdasdasdasdasdasdasdasdasasdasdasdasdasdasasdasdasdasdasdasdasasasde rings", "J.R.R Tolkien", 300, false, 023));

displayLibrary();
// displayLibrary();

// displayLibrary();
// displayLibrary();
// displayLibrary();
// displayLibrary();
// displayLibrary();
// displayLibrary();

