// Creating a Book Class
class Book{
    constructor(name, author, type){
        this.name = name;
        this.author = author;
        this.type = type;
        console.log("New Book Created with name: " + this.name + ", author: " + this.author + ", type: " + this.type);
    }
}

// Creating a Display Class
class Display{
    constructor(){
        let booksData = localStorage.getItem("booksData"); 
    }
    showData(){
        let booksData = localStorage.getItem("booksData"); 
        console.log(booksData);
        let tableBody = document.getElementById('tableBody');
        let uiString;
        if (booksData == null || JSON.parse(booksData).length == 0){
            uiString = `<tr>
                            <td colspan="3" rowspan="5" style="text-align: center; vertical-align: middle; background-color: white;">Nothing to show! Use "Add a Book" section above to add books.</td>
                        </tr>
                        <tr><td style="background-color: white; border: none;"></td></tr>
                        <tr><td style="background-color: white; border: none;"></td></tr>
                        <tr><td style="background-color: white; border: none;"></td></tr>
                        <tr><td style="background-color: white; border: none;"></td></tr>
                        <tr><td style="background-color: white;"></td></tr>`;
        tableBody.innerHTML = "";
        tableBody.innerHTML += uiString;
        }
        else{
            let dataObj = JSON.parse(booksData);
            uiString = ""
            dataObj.forEach(function (element, index){
                uiString += `<tr>
                                <td>${element[0]}</td>
                                <td>${element[1]}</td>
                                <td>${element[2]}</td>
                            <td id="${index}" style="background-color: white; border: none;" onclick="deleteBook(this.id)"><button class="btn btn-primary">Delete Book</button></td>
                            </tr>`;
            });
            tableBody.innerHTML = "";
            tableBody.innerHTML += uiString;
        }
    }
    validateData(name, author){
        if (name.length<2 || author.length<2){
            return false;
        }
        else{
            let booksData = localStorage.getItem("booksData");
            if (booksData == null){
                return true;
            }
            else{
                let validate = true;
                let booksObj = JSON.parse(booksData);
                for (let i=0; i<booksObj.length; i++){
                    if (booksObj[i][0] == name && booksObj[i][1] == author){
                        return false;
                    }
                }
                return true;
            }
        }
    }
    addData(book){
        let booksData = localStorage.getItem("booksData"); 
        let bookName = book.name;
        let bookAuthor = book.author;
        let bookType = book.type;
        let dataObj;
        if (booksData == null){
            dataObj = [];
        }
        else{
            dataObj = JSON.parse(booksData);
        }
        dataObj.push([bookName, bookAuthor, bookType]);
        localStorage.setItem("booksData", JSON.stringify(dataObj));
        this.showData();
    }
    showMessage(type, displayMessage){
        let message = document.getElementById("message");
        let boldText;
        if (type=="success"){
            boldText = "Success";
        }
        else{
            boldText = "Error";
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function(){
            message.innerHTML = "";
        }, 5000);
    }
    showSearch(arr){
        let tableBody = document.getElementById('tableBody');
        let uiString = "";
        arr.forEach(function (element, index){
            uiString += `<tr>
                            <td>${element[0]}</td>
                            <td>${element[1]}</td>
                            <td>${element[2]}</td>
                        <td id="${index}" style="background-color: white; border: none;" onclick="deleteBook(this.id)"><button class="btn btn-primary">Delete Book</button></td>
                        </tr>`;
        });
        tableBody.innerHTML = "";
        tableBody.innerHTML += uiString;
    }
}

// Driver Code
let display = new Display();
display.showData();

// Adding a new Book
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener('submit', addBook);

function addBook(e){
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let type;
    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");
    if (fiction.checked){
        type = "Fiction";
    }
    else if (programming.checked){
        type = "Programming";
    }
    else{
        type = "Cooking";
    }
    if (display.validateData(name, author)){
        let newBook = new Book(name, author, type);
        display.addData(newBook);
        display.showMessage('success', 'Your book has been successfully added')
        libraryForm.reset();
    }
    else{
        display.showMessage('danger', 'Sorry you cannot add this book');
        libraryForm.reset();
    }

    e.preventDefault();
} 

// Deleting a book
function deleteBook(index){
    let inputVal = document.getElementById("searchTxt").value.toLowerCase();
    let booksObj = [];
    let booksData = localStorage.getItem("booksData");
    let trs = document.querySelectorAll("#tableBody tr");
    let y = trs[index];
    let z = y.innerHTML;
    let arr = z.split("</td>");
    let ind = 0;
    if (inputVal.trim() == ""){
        let arr1 = [arr[0].slice(37), arr[1].slice(37), arr[2].slice(37)];
        if (booksData == null){
            booksObj = [];
        }
        else{
            booksObj = JSON.parse(booksData);
        }
        for (let i=0; i<booksObj.length; i++){
            let count = 0;
            for(let j=0; j<3; j++){
                if (booksObj[i][j] == arr1[j]){
                    count += 1;
                    if (count == 2){
                        console.log("true: " + i);
                        ind = i;
                    }
                }
                else{
                    console.log("false");
                    break;
                }
            }
        }
        // console.log(booksObj[ind]);
    }
    else{
        let arr1 = [arr[0].slice(33), arr[1].slice(33), arr[2].slice(33)];
        if (booksData == null){
            booksObj = [];
        }
        else{
            booksObj = JSON.parse(booksData);
        }
        for (let i=0; i<booksObj.length; i++){
            let count = 0
            for(let j=0; j<3; j++){
                if (booksObj[i][j] == arr1[j]){
                    count ++;
                    if (count == 2){
                        console.log("true: " + i);
                        ind = i;
                    }
                }
                else{
                    console.log("false");
                    break;
                }
            }
        }
    }
    console.log(ind);
    console.log(booksObj[ind]);
    booksObj.splice(ind, 1);
    localStorage.setItem("booksData", JSON.stringify(booksObj));
    document.getElementById("searchTxt").value = "";
    display.showMessage('success', 'Your book has been successfully deleted');
    display.showData();
}
    // booksObj.splice(index, 1);
    // localStorage.setItem("booksData", JSON.stringify(booksObj));
    // display.showData();
// Searching for a book
let search = document.getElementById("searchTxt");
let searchBtn = document.getElementById("searchBtn")

searchBtn.addEventListener("click", function(){
    search.value = ""
    display.showData();
});
search.addEventListener("input", function(){
    let inputVal = search.value.toLowerCase();
    let arr = [];
    let booksObj;
    if (inputVal.trim() != ""){
        let booksData = localStorage.getItem("booksData");
        if  (booksData != null){
            booksObj = JSON.parse(booksData);
        }
        else{
            booksObj = [];
        }
        for (let i=0; i<booksObj.length; i++){
            if (booksObj[i][0].toLowerCase().includes(inputVal) || booksObj[i][1].toLowerCase().includes(inputVal)){
                arr.push(booksObj[i]);
            }
        }
        if (arr.length != 0){
            console.log(arr);
            display.showSearch(arr);
        }
        else{
            document.getElementById('tableBody').innerHTML= "";
        }
    }
    else{
        display.showData();
    }
});