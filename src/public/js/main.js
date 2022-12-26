function generateToken() {
    return (Math.random() + 1).toString(36).substring(7);
}

(function sliderHome() {
    var count = 1;
    setInterval(function () {
        const checkIdRadio = document.getElementById("radio" + count);
        if (checkIdRadio != null) {
            checkIdRadio.checked = true;
            count++;
            if (count > 2) {
                count = 1;
            }
        }
    }, 5000);
})();

const container__loading = document.querySelector('.container__loading')
function hide__loading() {
    container__loading.style.display = "none"
}
window.onload = function () {
    if (container__loading) {
        container__loading.style.display = "flex"
        setTimeout(hide__loading, 500)
    }
    var newAdmin = {
        username: 'admin',
        password: '12345678',
    }
    var json = JSON.stringify(newAdmin)
    localStorage.setItem('admin', json)
    if (localStorage.getItem("ContentCart")) {
        var json = localStorage.getItem("ContentCart")
        var json1 = JSON.parse(json)
        var cart_dropdown_list = document.getElementsByClassName("cart-dropdown-list")[0]
        cart_dropdown_list.innerHTML = ""
        for (var i = 0; i < json1.length; i++) {
            cart_dropdown_list.innerHTML += `
            <li class="cart-dropdown-item">
                <div class="cart-dropdown-img">
                    <a href="">
                        <img class="img-product-img" src="${json1[i].img}" alt="">
                    </a>
                    </div>
                    <div>
                        <h4 class="cart-dropdown-title">${json1[i].title}</h4>
                        <p class="cart-dropdown-price">
                            <span><input class="cart-quantity" type="number" value="1" style="width: 80px;"> ×</span>
                            $<span class="price-product">${json1[i].price}</span>
                        </p>
                    </div>
                    <div class="cart-dropdown-delete" onclick="remove_product()">
                        <i class="fa-solid fa-xmark"></i>
                </div>
            </li>
            `
        }
        update()
    }
}

window.addEventListener("scroll", load_animate)
function load_animate() {
    var load__animate = document.querySelectorAll('.load__animate')
    for (var i = 0; i < load__animate.length; i++) {
        var windowheigth = window.innerHeight
        var load__animateTop = load__animate[i].getBoundingClientRect().top
        if (load__animateTop < windowheigth) {
            load__animate[i].classList.add('active__load')
        }
        else {
            load__animate[i].classList.remove('active__load')
        }
    }
}

const changeHeader = document.querySelector('.header-top');
function scrolled() {
    if ((window.pageYOffset) > 31) {
        changeHeader.classList.add('header-top-z-index');
    }
    else {
        changeHeader.classList.remove('header-top-z-index');
    }
}
window.addEventListener('scroll', scrolled);

function toast({
    title = '',
    message = '',
    type = 'info',
    duration = 2000
}) {
    const main = document.getElementById('toast');
    if (main) {
        const toast = document.createElement('div');

        const autoRemove = setTimeout(function () {
            main.removeChild(toast);
        }, duration + 1000);

        toast.onclick = function (e) {
            if (e.target.closest('.toast__close')) {
                main.removeChild(toast);
                clearTimeout(autoRemove);
            }
        }
        const icons = {
            success: 'fa-solid fa-circle-check',
            info: 'fa-solid fa-circle-info',
            warning: 'fa-solid fa-circle-exclamation'
        }
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);
        toast.classList.add('toast', `toast--${type}`);
        toast.style.animation = `slideInleft ease .6s, fadeOut linear 1s ${delay}s forwards`;

        toast.innerHTML = `
                <div class="toast__icon">
                    <i class="${icon}"></i>
                </div>
                <div class="toast__body">
                    <h3 class="toast__title">${title}</h3>
                    <p class="toast__msg">${message}</p>
                </div>
                <div class="toast__close">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            `;
        main.appendChild(toast);

    }
}

// Modal register & modal login 
const registerBtn = document.querySelector('.js-register');
const modalRegister = document.querySelector('.js-modal-register');
const modalContainer = document.querySelector('.js-modal-container')

function showModalRegister() {
    modalLogin.classList.remove('open-modal-login');
    modalRegister.classList.add('open-modal-register');
}
function hindeModalRegister() {
    modalRegister.classList.remove('open-modal-register');
}

var formRegister = document.querySelector('#form-register');
const Taikhoan_Dangky = [];
if (localStorage.getItem("TaiKhoanDangKy")) {
    var taikhoan = localStorage.getItem("TaiKhoanDangKy");
    var json = JSON.parse(taikhoan);

    for (var i = 0; i < json.length; i++) {
        Taikhoan_Dangky[i] = json[i];
    }
}





function register() {
    var user = localStorage.getItem(username.value);
    var checkUser = JSON.parse(user);

    if (username.value != "" && email.value != "" && password.value != "" && confirmPassword.value != "") {


        if (password.value == confirmPassword.value) {
            //check local co trong hay khong neu khong check thi checkUser tai else if se loi (null)
            if (checkUser == null) {
                var day = new Date();
                var Day = day.getDate();
                var month = day.getMonth() + 1;
                var year = day.getFullYear();

                var newUser = {
                    email: email.value,
                    username: username.value,
                    // password: password.value,
                    day: Day,
                    month: month,
                    year: year,
                }
                var taiKhoanDk = {
                    email: email.value,
                    username: username.value,
                    password: password.value,
                }
                Taikhoan_Dangky.push(newUser);
                var Taikhoan = JSON.stringify(Taikhoan_Dangky);
                localStorage.setItem("TaiKhoanDangKy", Taikhoan);

                var json = JSON.stringify(taiKhoanDk)
                localStorage.setItem(username.value, json)
                toast({
                    title: 'Thành công!',
                    message: 'Bạn đã đăng ký thành công &#128526',
                    type: 'success',
                    duration: 2000
                })
                showModalLogin();
                username.value = "";
                email.value = "";
                password.value = "";
                confirmPassword.value = "";
                // form.getElementsByClassName("error")[0].style.color = "#fff";
            }
            else if (username.value == checkUser.username) {
                toast({
                    title: 'Thông báo!',
                    message: 'Tài khoản đã có người đăng ký &#128524',
                    type: 'warning',
                    duration: 2000
                })
                username.value = ""
                username.focus()
            }
        }
    }
}

var formLogin = document.querySelector('#form-login');
let isLogin = !!localStorage.getItem("Now");

var logInUsername = document.getElementById("auth-form__user-login");
var logInPassword = document.getElementById("auth-form__password-login");


function logIn() {

    var user = localStorage.getItem(logInUsername.value)
    var checkUser = JSON.parse(user);

    if (logInUsername.value != "" && logInPassword.value != "") {
        if (checkUser == null) {
            toast({
                title: 'Thông báo!',
                message: 'Bạn chưa có tài khoản! Mời bạn đăng ký &#128521',
                type: 'warning',
                duration: 2000
            })
        }
        else {
            if (logInUsername.value == 'admin' && logInPassword.value == '12345678') {
                hindeModalLogin();
                localStorage.setItem("Now", logInUsername.value);
                localStorage.setItem('sessionID', generateToken());
                localStorage.setItem('sessionUser', checkUser.username);
            }
            else if (logInUsername.value == checkUser.username && logInPassword.value == checkUser.password) {
                hindeModalLogin();
                localStorage.setItem("Now", logInUsername.value);
                localStorage.setItem('sessionID', generateToken());
                localStorage.setItem('sessionUser', checkUser.username);
            }
            else {
                if (!(logInPassword.value == checkUser.password)) {
                    toast({
                        title: 'Thông báo!',
                        message: 'Password chưa đúng &#128566&#128566',
                        type: 'warning',
                        duration: 2000
                    })
                    logInPassword.focus();
                }
            }
        }
    }

    else {
        if (logInUsername.value == "" && logInPassword.value == "") {
            toast({
                title: 'Thông báo!',
                message: 'Bạn chưa nhập Username và Password &#128566&#128566',
                type: 'warning',
                duration: 2000
            })
            logInUsername.focus();
        }
        else if (logInUsername.value == "") {
            toast({
                title: 'Thông báo!',
                message: 'Bạn chưa nhập Username &#128566&#128566',
                type: 'warning',
                duration: 2000
            })
            logInUsername.focus();
        }
        else if (logInPassword.value == "") {
            toast({
                title: 'Thông báo!',
                message: 'Bạn chưa nhập Password &#128566&#128566',
                type: 'warning',
                duration: 2000
            })
            logInPassword.focus();
        }
    }
}

function isLogined() {
    return localStorage.getItem('sessionID') != null && localStorage.getItem('sessionUser') != null;
}

//Thay đổi icon user
const changeUser = document.querySelector('.header-action-logged');
const accountUser = document.getElementById('js-accout-user');

if (isLogined()) {
    changeUser.classList.add('js-change-icon-user');
    // loginBtnInitial.classList.add('js-remove-icon-user-init');
    const sessionUser = localStorage.getItem('sessionUser');
    accountUser.innerText = `${sessionUser}`
}

if (localStorage.getItem("Now") != "admin") {
    document.querySelector('.js-icon-admin').classList.add('close-icon-admin');
}
//end thay đổi icon user

const btnLogout = document.querySelector('.js-log-out');
let historyLength = history.length
function logOut() {

    localStorage.removeItem('sessionID');
    localStorage.removeItem('sessionUser');
    localStorage.removeItem('Now');
    localStorage.removeItem("ContentCart")
}

btnLogout.addEventListener('click', logOut);


const totop = document.querySelector('.toTop')
totop.addEventListener("click", toHeader)
function toHeader() {
    window.scrollTo(0, 0)
}



