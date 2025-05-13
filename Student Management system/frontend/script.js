const apiurl = "http://localhost:8099/students";


document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();


    const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        department: document.getElementById("department").value
    }


    fetch(`${apiurl}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    })
        .then(() => {
            alert("student added successfully")
            loadStudent();
            document.getElementById("studentForm").reset()
        }).catch(err => console.log(err))
});


function loadStudent() {
    fetch(`${apiurl}/get`)
        .then(res => res.json())
        .then(data => {
            const tablebody = document.querySelector("#studentTable  tbody");
            tablebody.innerHTML = "";
            data.forEach(student => {
                const row = `<tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${student.department}</td>
            <td><button onclick="deletestd(${student.id})" style="background-color:red">delete</button></td>
            <td><button onclick="editstd(${student.id},'${student.name}','${student.email}','${student.phone}','${student.department}')" style="background-color:blue">edit</button></td>
        </tr>`;
                tablebody.innerHTML += row;
            });
        }).catch(err => console.log(err))
}


function deletestd(id) {
    fetch(`${apiurl}/delete/${id}`, {
        method: "DELETE"
    })
        .then(() => {
            alert("student deleted successfully")
            loadStudent();
        }).catch(err => console.log(err))
}

let updatedid = null;
function editstd(id, name, email, phone, department) {
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("phone").value = phone;
    document.getElementById("department").value = department;

    updatedid = id;

    document.getElementById("submitbtn").style.display = "none";
    document.getElementById("updatebtn").style.display = "inline-block";

}

document.getElementById("updatebtn").addEventListener("click", function () {
    const updatedstd = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        department: document.getElementById("department").value
    }

    fetch(`${apiurl}/update/${updatedid}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(updatedstd)
    })
    .then(() =>{
        alert("student updated successfully")
        loadStudent();
        document.getElementById("submitbtn").style.display = "inline-block";
        document.getElementById("updatebtn").style.display ="none";
        updatedid = null;
    });
})

loadStudent();