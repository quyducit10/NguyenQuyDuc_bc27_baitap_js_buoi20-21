//Dinh nghia lop doi tuong
function Staff(
    user,
    name,
    email,
    password,
    workday,
    salary,
    position,
    worktime,
    // totalsalary,
    // typeofemployee
) {
    this.user = user,
        this.name = name,
        this.email = email,
        this.password = password,
        this.workday = workday,
        this.salary = salary,
        this.position = position,
        this.worktime = worktime,
        this.totalsalary = 0,
        this.typeofemployee = ""

}

Staff.prototype.calTotalSalary = function () {
    if (this.position === "Sếp") {
        return (this.salary * this.worktime) * 3
    }
    if (this.position === "Trưởng phòng") {
        return (this.salary * this.worktime) * 2
    }
    if (this.position === "Nhân viên") {
        return (this.salary * this.worktime)
    }
   
}
Staff.prototype.rank = function () {
    var rank = ""
    if (this.worktime >= 192) {
        rank = "Nhân viên xuất sắc"
        return rank;
    }
    if (this.worktime >= 167) {
        rank = "Nhân viên Giỏi"
        return rank
    }
    if (this.worktime >= 160) {
        rank = "Nhân viên Khá"
        return rank
    } else {
        rank = "Nhân viên trung bình"
        return rank
    }
}
//Tao mang
var staffs = []

//Ham them staff
function addStaff() {
    var user = document.getElementById('tknv').value
    var name = document.getElementById('name').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var workday = document.getElementById('datepicker').value
    var salary = +document.getElementById('luongCB').value
    var position = document.getElementById('chucvu').value
    var worktime = document.getElementById('gioLam').value

    //Kiem tra ky tu co hop le
    var isValid = validation()
    if(!isValid){
        return
    }

    //Khoi tao doi tuong
    var staff = new Staff(
        user,
        name,
        email,
        password,
        workday,
        salary,
        position,
        worktime
    )
    //Them staff vao mang staffs
    staffs.push(staff)
    console.log(staffs)
    display(staffs)
    document.getElementById("tknv").disabled = false;

}

function display(staffs) {

    var tbodyEl = document.getElementById('tableDanhSach')
    var html = ""
    //Duyet mang staffs
    for (var i = 0; i < staffs.length; i++) {
        var staff = staffs[i]
        console.log(staff);
        html += `
        <tr>
            <td>${staff.user}</td>
            <td>${staff.name}</td>
            <td>${staff.email}</td>
            <td>${staff.workday}</td>
            <td>${staff.position}</td>
            <td>${staff.calTotalSalary()}</td>
            <td>${staff.rank()}</td>
            <td>
          <button class="btn btn-success" data-toggle="modal" data-target="#myModal" onclick="selectStaff('${staff.user}')">Cập nhật</button>
          <button class="btn btn-danger" onclick="deleteStaff('${staff.user}')">Xóa</button>
            </td>
        </tr>
        `
    }
    tbodyEl.innerHTML = html
}

function deleteStaff(staffUser) {

    var index = findStaff(staffUser)
    if (index !== -1) {
        staffs.splice(index, 1);
        display(staffs);
    }
}

function selectStaff(staffUser) {
    var index = findStaff(staffUser)
    var staff = staffs[index]

    document.getElementById('tknv').value = staff.user
    document.getElementById('name').value = staff.name
    document.getElementById('email').value = staff.email
    document.getElementById('password').value = staff.password
    document.getElementById('datepicker').value = staff.workday
    document.getElementById('luongCB').value = staff.salary
    document.getElementById('chucvu').value = staff.position
    document.getElementById('gioLam').value = staff.worktime

    document.getElementById("tknv").disabled = true;

}
function searchStaff(){
    var searchValue = document.getElementById('searchName').value
    searchValue = searchValue.toLowerCase()

    var newStaffs = []
    for(var i = 0;i < staffs.length;i++){
        var staff = staffs[i]
        var staffRank = staff.rank().toLowerCase()
        if(staffRank.indexOf(searchValue) !== -1){
            newStaffs.push(staff)
        }
    }
    display(newStaffs)
}

function findStaff(staffUser) {
    var index = -1
    for (var i = 0; i < staffs.length; i++) {
        if (staffs[i].user === staffUser) {
            index = i
            break
        }
    }
    return index
}
function updateStaff(){
    var user = document.getElementById('tknv').value
    var name = document.getElementById('name').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var workday = document.getElementById('datepicker').value
    var salary = +document.getElementById('luongCB').value
    var position = document.getElementById('chucvu').value
    var worktime = document.getElementById('gioLam').value

    var isValid = validation()
    if(!isValid){
        return
    }

    var staff = new Staff(
        user,
        name,
        email,
        password,
        workday,
        salary,
        position,
        worktime
    )

    var index = findStaff(staff.user)
    staffs[index] = staff
    display(staffs)

}
function validation(){
    var user = document.getElementById('tknv').value
    var name = document.getElementById('name').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var workday = document.getElementById('datepicker').value
    var salary = +document.getElementById('luongCB').value
    var position = document.getElementById('chucvu').value
    var worktime = document.getElementById('gioLam').value

    var isValid = true
    document.getElementById('tbTKNV').style.display = 'block'
    //Kiểm tra tên tài khoản
    if(!isRequired(user)){
        isValid = false
        document.getElementById('tbTKNV').innerHTML = 'Tài khoản không được để trống'
    }else if(!minLength(user,4,6)){
        isValid = false
        document.getElementById('tbTKNV').innerHTML = 'Tài khoản tối đa 4 - 6 ký tự'
    }else{
        document.getElementById('tbTKNV').innerHTML = ''
    }
    ///Kiểm tra Tên
    document.getElementById('tbTen').style.display = 'block'
    var namePattern = new RegExp('^[A-Za-z]+$')
    if(!isRequired(name)){
        isValid = false
        document.getElementById('tbTen').innerHTML = 'Tên nhân viên không được để trống'
    }else if(!namePattern.test(name)){
        isValid = false
        document.getElementById('tbTen').innerHTML = 'Tên nhân viên phải là chữ, không để trống'
    }else{
        document.getElementById('tbTen').innerHTML = ''
    }
    //Kiểm tra email
    document.getElementById('tbEmail').style.display = 'block'
    var emailPattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
    if(!isRequired(email)){
        isValid = false
        document.getElementById('tbEmail').innerHTML = 'Email không được để trống'
    }else if(!emailPattern.test(email)){
        isValid = false
        document.getElementById('tbEmail').innerHTML = 'Email chưa đúng định dạng'
    }else{
        document.getElementById('tbEmail').innerHTML = ''
    }
    //Kiểm tra password
    document.getElementById('tbMatKhau').style.display = 'block'
    var pwPattern = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/ 
    if(!isRequired(password)){
        isValid = false
        document.getElementById('tbMatKhau').innerHTML = 'Password không được để trống'
    }else if(!minLength(password,6,10)){
        isValid = false
        document.getElementById('tbMatKhau').innerHTML = 'Mật Khẩu từ 6-10 ký tự'
    }else if(!pwPattern.test(password)){
        isValid = false
        document.getElementById('tbMatKhau').innerHTML = 'Password chưa đúng định dạng (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)'
    }else{
        document.getElementById('tbMatKhau').innerHTML = ''
    }
    //Kiểm tra Ngày làm
    document.getElementById('tbNgay').style.display = 'block'
    if(!isRequired(workday)){
        isValid = false
        document.getElementById('tbNgay').innerHTML = 'Ngày làm không được để trống'
    }else{
        document.getElementById('tbNgay').innerHTML = ''
    }
    //Kiểm tra lương cơ bản
    document.getElementById('tbLuongCB').style.display = 'block'
    if(!isRequired(salary)){
        isValid = false
        document.getElementById('tbLuongCB').innerHTML = 'Tiền lương không được để trống'
    }else if(salary < 1000000 || salary >20000000){
        isValid = false
        document.getElementById('tbLuongCB').innerHTML = 'Lương cơ bản 1 000 000 - 20 000 000'
    }

    else{
        document.getElementById('tbLuongCB').innerHTML = ''
    }
    //Kiểm tra chức vụ
    document.getElementById('tbChucVu').style.display = 'block'

    if(position==="Chọn chức vụ"){
        isValid = false
        document.getElementById('tbChucVu').innerHTML = 'Chức vụ phải chọn chức vụ hợp lệ'
    }
    else{
        document.getElementById('tbChucVu').innerHTML = ''
    }
    //Kiểm tra giờ làm
    document.getElementById('tbGiolam').style.display = 'block'
    if(!isRequired(worktime)){
        isValid = false
        document.getElementById('tbGiolam').innerHTML = 'Giờ làm không được để trống'
    }else if(worktime < 80 || worktime >200){
        isValid = false
        document.getElementById('tbGiolam').innerHTML = 'Số giờ làm trong tháng 80 - 200 giờ'
    }

    else{
        document.getElementById('tbGiolam').innerHTML = ''
    }
    return isValid
}

//Kiem tra iput co rong hay khong
function isRequired(value){
    if(!value){
        return false
    }
    return true
}
// Kiem tra input co du do dai khong
function minLength(value,limit,max){
    if(value.length < limit || value.length > max){
        return false
    }
    return true
}