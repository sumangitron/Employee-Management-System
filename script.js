const form = document.querySelector("form");
const table = document.querySelector("tbody");
const popup = document.querySelector(".popup");
const submitButton = document.querySelector("form > button");

let idNmbr = 1;

// using this object implement the functionality of edit button
let editOption = {
    isEdit : false,
    rowElement : null
}

// manage submit event when click submit button on form
form.addEventListener("submit", function(event) {
    event.preventDefault();

    let employee = {
        name : form.name.value,
        role : form.role.value,
        salary : form.salary.value,
        phoneNumber : form.phoneNumber.value,
        email : form.email.value,
        companyName : form.companyName.value
    }

    if (editOption.isEdit) {
        updateEmployee(employee);
    }
    else {
        addEmployee(employee);
    }
    
    toggleForm();
    form.reset();
})

function addEmployee(employee) { //this function responsible for add employee data on table
    const row = document.createElement("tr");

    //creat a new cell and add into the row
    const idCell = document.createElement("td");
    idCell.innerText = idNmbr++;
    row.appendChild(idCell);
    
    //iterate on the employee object and add data one bye one into cell and the cell add into row
    for(let key in employee) {
        const cell = document.createElement("td");
        cell.innerText = employee[key];
        row.appendChild(cell);
    }

    //creat delete button
    const dltBtn = document.createElement("button");
    dltBtn.innerText = "Delete";
    dltBtn.classList.add("delButton");

    //event for delete row
    dltBtn.addEventListener("click", deleteRow);

    //creat edit button
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("edtButton");

    //event for edit record
    editBtn.addEventListener("click", onEditClick);

    //creat a new cell at last,add delete and edit button
    const actionCell = document.createElement("td");
    actionCell.append(dltBtn, editBtn);

    row.appendChild(actionCell);

    table.appendChild(row);
}

//this function is responsible for popup
function toggleForm() {
    if(popup.style.display == "none") {
        popup.style.display = "flex";
    }
    else {
        popup.style.display = "none";
    }
}

//this function is responsible for delete the select row on which delete button is clicked 
function deleteRow(event) {
    let td = event.target.parentNode;
    let tr = td.parentNode;
    tr.remove();
}

//this function is responsible for edit the form for the specific record on which edit button is clicked 
function onEditClick(event) {
    let row = event.target.parentNode.parentNode;

    let cell = row.querySelectorAll("td");

    //this is the object of that record which user want to edit
    let employeeData = {
        name : cell[1].innerText,
        role : cell[2].innerText,
        salary : cell[3].innerText,
        phoneNumber : cell[4].innerText,
        email : cell[5].innerText,
        companyName : cell[6].innerText
    }

    preFillForm(employeeData);
    toggleForm();

    submitButton.innerText = "Update";

    //when isEdit is true then it is on edit mood
    editOption = {
        isEdit : true,
        rowElement : row
    }
}

//this funtion is responsible for pre fill the form which data user want to edit
function preFillForm(employeeObj) {
    for (let key in employeeObj) {
        form[key].value = employeeObj[key];
    }
}

//this funtion is responsible for upadte the edited data on table
function updateEmployee(employeeObj) {
    let rowElement = editOption.rowElement;

    let cells = rowElement.querySelectorAll("td");

    //take the data from form and assign to the cells
    cells[1].innerText = employeeObj.name;
    cells[2].innerText = employeeObj.role;
    cells[3].innerText = employeeObj.salary;
    cells[4].innerText = employeeObj.phoneNumber;
    cells[5].innerText = employeeObj.email;
    cells[6].innerText = employeeObj.companyName;

    submitButton.innerText = "Add Employee";

    //when isEdit is false then it is on Add mood
    editOption = {
        isEdit : false,
        rowElement : null
    }
}