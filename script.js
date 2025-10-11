const myLibrary = [{title: "Metamorphosis", author: "Franz Kafka", pages: 100 , read: true},
    {title: "1984", author: "George Orwell", pages: 278 , read: true},
    {title: "Blood Meridian", author: "Cormac McCarthy", pages: 322 , read: false}
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

let table = document.querySelector("table");

const newBook = document.getElementById("showDialog");
const bookDialog = document.querySelector("dialog");
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const bookRead = document.querySelector("#read-status");
const confirmBtn = document.querySelector("#confirmBtn");

function display() {
    myLibrary.forEach((book) => {
        let bookRow = document.createElement("tr");
        ["title", "author", "pages", "read"].forEach((bookProperty) => {
            let bookData = document.createElement("td");
            bookData.textContent = book[bookProperty];
            bookRow.appendChild(bookData);
        })
        table.appendChild(bookRow);
    })
}

newBook.addEventListener("click", () => {
    bookDialog.showModal();
})

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (bookTitle.value !== "" && bookAuthor.value !== "" && bookPages.value !== "" && bookRead.value !== "") {
        addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.value);
        let bookRow = document.createElement("tr");
        ["title", "author", "pages", "read"].forEach((bookProperty) => {
            let bookData = document.createElement("td");
            bookData.textContent = myLibrary.at(-1)[bookProperty];
            bookRow.appendChild(bookData);
        })
        table.appendChild(bookRow);
        bookDialog.close();
    }
    else {
        bookDialog.close();
    }
})

display();