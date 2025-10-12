const myLibrary = [{title: "Metamorphosis", author: "Franz Kafka", pages: 100 , read: true, id: "1"},
    {title: "1984", author: "George Orwell", pages: 278 , read: true, id: "2"},
    {title: "Blood Meridian", author: "Cormac McCarthy", pages: 322 , read: false, id: "3"}
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
const bookRead = document.querySelector("#read");
const bookUnread = document.querySelector("#unread");
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
    if (bookTitle.value !== "" && bookAuthor.value !== "" && bookPages.value !== "") {
        if (bookRead.checked)
            addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, true);
        else
            addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, false);
        let bookRow = document.createElement("tr");
        ["title", "author", "pages", "read"].forEach((bookProperty) => {
            let bookData = document.createElement("td");
            bookData.textContent = myLibrary.at(-1)[bookProperty];
            bookRow.appendChild(bookData);
        })
        bookRow.setAttribute("data-id", myLibrary.at(-1).id);
        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("removeBtn");
        bookRow.appendChild(removeBtn);
        table.appendChild(bookRow);
        bookDialog.close();
    }
    else {
        bookDialog.close();
    }
})

display();

table.addEventListener("click", (event) => {
    if (event.target.classList.contains("removeBtn")) {
        myLibrary.forEach(book => {
            if (event.target.parentNode.getAttribute("data-id") === book.id)
                table.removeChild(event.target.parentNode);
        })
    }
})
