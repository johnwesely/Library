const addBookClick = document.querySelector("#add-book").addEventListener("click", () => {
    displayBookFormModal();
    console.log("clcik");
});

const closeModal = document.addEventListener("click", (evt) => {
    detectClickOutsideModal(evt);
});

let myLibrary = [];
let libraryIndex = 0;

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author; 
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    if (this.read) {
        this.read = false;
    } else {
        this.read = true;
    }
}

function addBookToLibrary(book) {
    book.index = libraryIndex++;
    myLibrary.push(book);
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    --libraryIndex;

    myLibrary.forEach((book) => {
        if (book.index > index) {
            --book.index;
        }
    });

    renderBooks();
}

function renderBooks() {
    const cardContainer = document.querySelector(".card-container");
    deleteAllChildren(cardContainer);

    myLibrary.forEach((book) => {
        renderBook(book);
    });
}

function renderBook(book) {
    const cardContainer = document.querySelector(".card-container");

    const card = document.createElement("div");
    card.classList.add("card");

    let title = document.createElement("p"); 
    title.textContent = book.title;
    card.appendChild(title);

    let author = document.createElement("p");
    author.textContent = book.author;
    card.appendChild(author);

    let pages = document.createElement("p");
    pages.textContent = `${book.pages} pages`;
    card.appendChild(pages);

    let read = document.createElement("p");
    read.textContent = `I ${(book.read) ? "have read" : "want to read"} this book`;
    card.appendChild(read);

    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const readButton = document.createElement("button");
    readButton.classList.add("read-button");
    readButton.textContent = (book.read) ? "I have read" : "I want to read";

    readButton.addEventListener("click", () => {
        book.toggleRead();
        renderBooks();
    });

    buttonContainer.appendChild(readButton);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove Book";

    removeButton.addEventListener("click", () => {
        removeBookFromLibrary(book.index);
    });

    buttonContainer.appendChild(removeButton);

    card.appendChild(buttonContainer);
    cardContainer.appendChild(card);
}

function displayBookFormModal() {
    const modal = document.querySelector("#book-form-modal");
    modal.style.display = "flex";
}

function hideBookFormModal() {
    const modal = document.querySelector("#book-form-modal");
    modal.style.display = "none";
    resetFields(document.querySelector("#book-form"));

}

function resetFields(form) {
    form.title.value = "";
    form.author.value = "";
    form.pageCount.value = "";
    form.read.checked = false;
}

function createBook(form) {
    if (!validateForm(form)) return false;

    const newBook = new Book(form.title.value, form.author.value, form.pageCount.value, 
        (form.read.value === "true" ? true : false));
    addBookToLibrary(newBook);
    renderBook(newBook);
    hideBookFormModal();
}

function validateForm(form) {
    if (form.title.value === "") {
        alert("Book Must Include Title");   
        return false;
    } else if (form.author.value === "") {
        alert("Book Must Include Author");
        return false;
    } else if (form.pageCount.value === "") {
        alert("Book Must Include Page Count");
        return false;
    } else {
        return true;
    }

}

function deleteAllChildren(parentElement) {
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}

function detectClickOutsideModal(event) {
    const modal = document.querySelector(".form-container");
    const addBookButton = document.querySelector("#add-book");
    let targetElement = event.target;
    let foundModal = false;

    while (targetElement) {
        if (targetElement === modal || targetElement === addBookButton) {
            foundModal = true;
        }
        targetElement = targetElement.parentNode;
    } 

    if (!foundModal) {
        hideBookFormModal();
    }
}

