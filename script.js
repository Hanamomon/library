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

function display() {
    myLibrary.forEach((book) => {
        let bookRow = document.createElement("tr");
        for (let bookProperty in book) {
            let bookData = document.createElement("td");
            bookData.textContent = book[bookProperty];
            bookRow.appendChild(bookData);
        }
        table.appendChild(bookRow);
    })
}

display();