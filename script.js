let txtIdNumber = document.getElementById("txt-idnumber");
let txtName = document.getElementById("txt-name");
let txtGender = document.getElementById("txt-gender");
let txtEmail = document.getElementById("txt-email");
let txtPosition = document.getElementById("txt-position");
let txtTimeIn = document.getElementById("txt-timein");
let txtTimeOut = document.getElementById("txt-timeout");
let txtWorkDate = document.getElementById("txt-workdate");
let txtTeam = document.getElementById("txt-team");
let txtPhone = document.getElementById("txt-phone");
// search button and add button
let btnAdd = document.getElementById("btn-add");
let btnSearch = document.getElementById("btn-search");
// Array list to store staff information
const staffList =JSON.parse(localStorage.getItem("staffList")) || [];
var indexEdit = -1;
displayStaff();
var id =staffList.length +1;
//====================================== Event listener for add button ======================================
btnAdd.addEventListener("click", function(){
  const staffId = String(id).padStart(3, "0");
  const idNumber = txtIdNumber.value;
  const name = txtName.value;
  const gender = txtGender.value;
  const email = txtEmail.value;
  const position = txtPosition.value;
  const timeIn = txtTimeIn.value;
  const timeOut = txtTimeOut.value;
  const workDate = txtWorkDate.value;
  const team = txtTeam.value;
  const phone = txtPhone.value;
  // If indexEdit is not -1, it means we are editing a existing staff member,we update the staff following the index
  if(idNumber === "" || name === "" || gender === "" || email === "" || position === "" || timeIn === "" || timeOut === "" || workDate === "" || team === "" || phone === ""){
    alert("Please fill in all the information");
    return;
  }
   if (indexEdit !== -1) {
    staffList[indexEdit] = {
      ...staffList[indexEdit],
      idNumber: idNumber,
      name: name,
      gender: gender,
      email: email,
      position: position,
      timeIn: timeIn,
      timeOut: timeOut,
      workDate: workDate,
      team: team,
      phone: phone,
    };
    indexEdit = -1;
  }else{
    staffList.push({id:staffId, idNumber: idNumber,
      name: name,
      gender: gender,
      email:email,
      position: position,
      timeIn: timeIn,
      timeOut: timeOut,
      workDate: workDate,
      team: team,
      phone: phone,});
  }
  // Save staff information to local storage
  localStorage.setItem("staffList", JSON.stringify(staffList));
  displayStaff();
  
})
// ===================function search staff ==========================
function searchStaff(){
  const searchName = txtName.value;
  const searchStaff =staffList.filter((staff, arr)=> staff.name.toLowerCase().includes(searchName.toLowerCase()));
  if(searchStaff.length ===0){
    alert("No staff found with the name: " + searchName);
    return;
  }
  var listSearch = "";
  for (let i in searchStaff){
    listSearch += `
      <tr>
        <td>${searchStaff[i].id}</td>
        <td>${searchStaff[i].idNumber}</td>
        <td style="text-align:left">${searchStaff[i].name}</td>
        <td>${searchStaff[i].gender}</td>
        <td>${searchStaff[i].email}</td>
        <td>${searchStaff[i].position}</td>
        <td>${searchStaff[i].timeIn}</td>
        <td>${searchStaff[i].timeOut}</td>
        <td>${searchStaff[i].workDate}</td>
        <td>${searchStaff[i].team}</td>
        <td>${searchStaff[i].phone}</td>
        <td><i class="fa-regular fa-pen-to-square btn-edit" style="color: green; cursor: pointer; size: 20px" align="center" onclick="editStaffInfo(${i})"></i></td>
        <td><i class="fa-solid fa-trash-can btn-delete" style="color: red; cursor: pointer; size: 20px" align="center" onclick="deleteStaffInfo(${i})"></i></td>
      </tr>
    `;
    document.querySelector(".show-information").innerHTML = listSearch;
  }
}
//================================================================= function Display staff information =================================================================
function displayStaff(){
  var listStaff = "";
  for(let i in staffList){
    listStaff += `
      <tr>
        <td style="text-align:left">${staffList[i].id}</td>
        <td style="text-align:left">${staffList[i].idNumber}</td>
        <td style="text-align:left">${staffList[i].name}</td>
        <td >${staffList[i].gender}</td>
        <td style="text-align:left">${staffList[i].email}</td>
        <td style="text-align:left">${staffList[i].position}</td>
        <td style="text-align:left">${staffList[i].timeIn}</td>
        <td style="text-align:left">${staffList[i].timeOut}</td>
        <td style="text-align:left">${staffList[i].workDate}</td>
        <td style="text-align:left">${staffList[i].team}</td>
        <td style="text-align:left">${staffList[i].phone}</td>
        <td><i class="fa-regular fa-pen-to-square btn-edit" style="color: green; cursor: pointer; size: 20px" align="center" onclick="editStaffInfo(${i})"></i></td>
        <td><i class="fa-solid fa-trash-can btn-delete" style="color: red; cursor: pointer; size: 20px" align="center" onclick="deleteStaffInfo(${i})"></i></td>
      </tr>
    `;
  }
  document.querySelector(".show-information").innerHTML = listStaff;
  clear();
}
//===================================== function Edit staff information =======================================
function editStaffInfo(index){
  indexEdit = index;
  txtIdNumber.value = staffList[index].idNumber;
  txtEmail.value = staffList[index].email;
  txtPosition.value = staffList[index].position;
  txtTimeIn.value = staffList[index].timeIn;
  txtTimeOut.value = staffList[index].timeOut;
  txtWorkDate.value = staffList[index].workDate;
  txtTeam.value = staffList[index].team;
  txtName.value = staffList[index].name;
  txtPhone.value = staffList[index].phone;
  txtGender.value = staffList[index].gender;
}
// ===========================function Delete staff information ========================================
function deleteStaffInfo(index){
  staffList.splice(index, 1);
  localStorage.setItem("staffList", JSON.stringify(staffList));
  displayStaff();
}
// ============== function clear input =============
function clear(){
  txtIdNumber.value ="";
  txtName.value = "";
  txtGender.value = "";
  txtEmail.value = "";
  txtPosition.value = "";
  txtTimeIn.value = "";
  txtTimeOut.value = "";
  txtWorkDate.value = "";
  txtTeam.value = "";
  txtPhone.value = "";
  txtName.focus();
}
