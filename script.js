let txtName = document.getElementById("txt-name");
let txtPhone = document.getElementById("txt-phone");
let txtAge = document.getElementById("txt-age");
let txtGender = document.getElementById("txt-gender");
let btnAdd = document.getElementById("btn-add");

// Array list to store staff information
const staffList =JSON.parse(localStorage.getItem("staffList")) || [];
var indexEdit = -1;
displayStaff();
var id =staffList.length +1;
btnAdd.addEventListener("click", function(){
  const staffId = String(id).padStart(3, "0");
  const name = txtName.value;
  const phone = txtPhone.value;
  const age = txtAge.value;
  const gender = txtGender.value;
  // Check if the staff information is being edited or added

  // If indexEdit is not -1, it means we are editing a existing staff member,we update the staff following the index
  if(name ===""|| phone === ""|| age === "" || gender ===""){
    alert("Please fill in all the information");
    return;
  }
   if (indexEdit !== -1) {

    staffList[indexEdit] = {
      ...staffList[indexEdit],
      name: name,
      phone: phone,
      age: age,
      gender: gender
    };

    indexEdit = -1;

  }else{
    staffList.push({id:staffId, name: name, phone: phone, age: age, gender: gender});
  }
  
  // Save staff information to local storage
  localStorage.setItem("staffList", JSON.stringify(staffList));
  displayStaff();
  
})
//================================================================= function Display staff information =================================================================
function displayStaff(){
  var listStaff = "";
  for(let i in staffList){
    listStaff += `
      <tr>
        <td>${staffList[i].id}</td>
        <td>${staffList[i].name}</td>
        <td>${staffList[i].phone}</td>
        <td>${staffList[i].age}</td>
        <td>${staffList[i].gender}</td>
        <td><i class="fa-regular fa-pen-to-square btn-edit" style="color: green; cursor: pointer; size: 20px" align="center" onclick="editStaffInfo(${i})"></i></td>
        <td><i class="fa-solid fa-trash-can btn-delete" style="color: red; cursor: pointer; size: 20px" align="center" onclick="deleteStaffInfo(${i})"></i></td>
      </tr>
    `;
  }
  document.querySelector(".show-information").innerHTML = listStaff;
  clear();
}
//================================================================= function Edit staff information =================================================================
function editStaffInfo(index){
  indexEdit = index;
  txtName.value = staffList[index].name;
  txtPhone.value = staffList[index].phone;
  txtAge.value = staffList[index].age;
  txtGender.value = staffList[index].gender;
}
// ================================================================= function Delete staff information =================================================================
function deleteStaffInfo(index){
  staffList.splice(index, 1);
  localStorage.setItem("staffList", JSON.stringify(staffList));
  displayStaff();
}
function clear(){
  txtName.value = "";
  txtPhone.value = "";
  txtAge.value = "";
  txtGender.value = "";
  txtName.focus();
}
