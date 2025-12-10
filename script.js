const myLibrary = [{title: "Metamorphosis", author: "Franz Kafka", pages: 100 , read: true, id: "1"},
    {title: "1984", author: "George Orwell", pages: 278 , read: true, id: "2"},
    {title: "Blood Meridian", author: "Cormac McCarthy", pages: 322 , read: false, id: "3"}
];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
    }

    toggleRead() {
        if (this.read)
            this.read = false;
        else
            this.read = true;
    }
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
const titleError = document.querySelector("#title + .error");
const authorError = document.querySelector("#author + .error");
const pagesError = document.querySelector("#pages + .error");

function display() {
    myLibrary.forEach((book) => {
        let bookRow = document.createElement("tr");
        ["title", "author", "pages", "read"].forEach((bookProperty) => {
            let bookData = document.createElement("td");
            bookData.textContent = book[bookProperty];
            bookRow.appendChild(bookData);
        })
        bookRow.setAttribute("data-id", book.id);
        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("removeBtn");
        bookRow.appendChild(removeBtn);
        table.appendChild(bookRow);
    })
}

function checkError() {
    if (bookTitle.value === "") {
        bookTitle.setCustomValidity("The title must be filled!");
        titleError.textContent = "The title must be filled!";
        titleError.classList.add("active");
    } else {
        bookTitle.setCustomValidity("");
        titleError.textContent = "";
        titleError.className = "error";
    }

    if (bookAuthor.value === "") {
        bookAuthor.setCustomValidity("The author name must be filled!");
        authorError.textContent = "The author name must be filled!";
        authorError.classList.add("active");
    } else {
        bookAuthor.setCustomValidity("");
        authorError.textContent = "";
        authorError.className = "error";
    }

    if (bookPages.value === "") {
        bookPages.setCustomValidity("The page number must be provided!");
        pagesError.textContent = "The page number must be provided!";
        pagesError.classList.add("active");
    } else {
        bookPages.setCustomValidity("");
        pagesError.textContent = "";
        pagesError.className = "error";
    }
}

newBook.addEventListener("click", () => {
    bookDialog.showModal();
})

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    checkError();
    if (bookDialog.firstElementChild.checkValidity()) {
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
        let manageBtns = document.createElement("div");
        manageBtns.classList.add("manageBtns");
        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("removeBtn");
        manageBtns.appendChild(removeBtn);
        let toggleReadBtn = document.createElement("button");
        toggleReadBtn.textContent = "Toggle Read";
        toggleReadBtn.classList.add("toggleRead");
        manageBtns.appendChild(toggleReadBtn);
        bookRow.appendChild(manageBtns);
        table.appendChild(bookRow);
        bookDialog.close();
    }
    else {
        checkError();
    }
})

display();

table.addEventListener("click", (event) => {
    if (event.target.classList.contains("removeBtn")) {
        myLibrary.forEach(book => {
            if (event.target.parentNode.parentNode.getAttribute("data-id") === book.id)
                table.removeChild(event.target.parentNode.parentNode);
        })
    }
    else if (event.target.classList.contains("toggleRead")) {
        myLibrary.forEach(book => {
            if (event.target.parentNode.parentNode.getAttribute("data-id") === book.id) {
                book.toggleRead();
                event.target.parentNode.previousElementSibling.textContent = book.read;
            }
        })
    }
})

