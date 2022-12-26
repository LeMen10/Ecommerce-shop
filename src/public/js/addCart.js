function addCartPageShop(event) {
    event.stopPropagation();
    var button = event.target
    var product = button.parentElement.parentElement.parentElement.parentElement
    var title = product.getElementsByClassName("product-cart-title")[0].innerText
    var img = product.getElementsByClassName("js-product-cart-src")[0].src
    var price = product.getElementsByClassName("current-price")[0].innerText.replace("$", "")
    add_to_cart(title, img, price);
    var abc = document.querySelector('.amount-product');
    abc.style.animation = 'abc .5s ease-in-out'
    updateTotal()
}

function addCartPageDescription() {
    if (isLogined()) {
        var button = event.target
        var product = button.parentElement.parentElement.parentElement.parentElement
        var title = product.getElementsByClassName("title-detail")[0].innerText
        var img = product.getElementsByClassName("src-src-src")[0].src
        var price = product.getElementsByClassName("current-price")[0].innerText.replace("$", "")
        add_to_cart(title, img, price);
        updateTotal()
    }
    else {
        showModalLogin();
    }
}

function update() {
    var cart_dropdown_item = document.getElementsByClassName("cart-dropdown-item")
    var amount_product = document.getElementsByClassName("amount-product")[0]
    amount_product.innerText = cart_dropdown_item.length
}

function updateTotal() {
    var cart_dropdown_item = document.getElementsByClassName("cart-dropdown-item")
    var total = 0;
    for (var i = 0; i < cart_dropdown_item.length; i++) {
        var quantity = cart_dropdown_item[i].getElementsByClassName("cart-quantity")[0].value
        var price = cart_dropdown_item[i].getElementsByClassName("price-product")[0]
        price = parseFloat(price.innerText)
        total = total + (quantity * price)
    }
    document.getElementsByClassName("cart-dropdown-total-bill")[0].innerText = "$" + Math.round(total * 100) / 100
}

const ContentCart = []
if (localStorage.getItem("ContentCart")) {
    var json = localStorage.getItem("ContentCart")
    var json1 = JSON.parse(json)
    for (var i = 0; i < json1.length; i++) {
        ContentCart[i] = json1[i]
    }
}
function add_to_cart(title, img, price) {
    var abc = document.querySelector('.amount-product');
    abc.style.animation = 'abc .5s ease-in-out'
    var cart_dropdown_list = document.getElementsByClassName("cart-dropdown-list")[0]
    var cart_dropdown_title = cart_dropdown_list.getElementsByClassName("cart-dropdown-title")
    for (var i = 0; i < cart_dropdown_title.length; i++) {
        if (cart_dropdown_title[i].innerText == title) {
            toast({
                title: 'Thông báo!',
                message: 'Sản phẩm này đã có trong giỏ hàng &#128578&#128578',
                type: 'warning',
                duration: 4000
            })
            return
        }
    }
    var newProductCart = {
        title: title,
        img: img,
        price: price,
    }
    ContentCart.push(newProductCart)
    var json = JSON.stringify(ContentCart)
    localStorage.setItem("ContentCart", json)
    var li = document.createElement("li")
    li.classList.add("cart-dropdown-item")
    var content = `
    <div class="cart-dropdown-img">
        <a href="">
            <img class="img-product-img" src="${img}" alt="">
        </a>
        </div>
        <div>
            <h4 class="cart-dropdown-title">${title}</h4>
            <p class="cart-dropdown-price">
                <span><input class="cart-quantity" type="number" value="1"  style="width: 80px;"> ×</span>
                $<span class="price-product">${price}</span>
            </p>
        </div>
        <div class="cart-dropdown-delete" onclick="remove_product()">
            <i class="fa-solid fa-xmark"></i>
    </div>
    `
    li.innerHTML = content
    cart_dropdown_list.append(li)
    update()
    var cart_quantity = cart_dropdown_list.getElementsByClassName("cart-quantity")
    for (var i = 0; i < cart_quantity.length; i++) {
        cart_quantity[i].addEventListener("change", function () {
            var input = event.target
            if (isNaN(input.value) || input.value <= 0) {
                input.value = 1
            }
            updateTotal()
        })
    }

    // var remover_cart = cart_dropdown_list.getElementsByClassName("fa-solid fa-xmark")
    // for (var i = 0; i < remover_cart.length; i++) {
    //     remover_cart[i].addEventListener("click", function () {
    //         var button = event.target;
    //         console.log(button.parentElement.parentElement)
    //         for(var i = 0 ; i < ContentCart.length ; i++) {
    //             if(ContentCart[i].img == img && ContentCart[i].title == title && ContentCart[i].price == price) {
    //                 alert("dung")
    //                 ContentCart.splice(i,1);
    //                 var json = JSON.stringify(ContentCart)
    //                 localStorage.setItem("ContentCart",json)
    //                 break;
    //             }
    //         }
    //         button.parentElement.parentElement.remove();
    //         update()
    //         updateTotal()
    //     })
    // }

}
function remove_product() {
    var button = event.target
    var img = button.parentElement.parentElement.getElementsByClassName("img-product-img")[0].src
    var title = button.parentElement.parentElement.getElementsByClassName("cart-dropdown-title")[0].innerText
    var price = button.parentElement.parentElement.getElementsByClassName("price-product")[0].innerText
    // var json = localStorage.getItem("ContentCart")
    // var json1 = JSON.parse(json)
    // for(var i = 0 ; i < json1.length ; i++) {
    //     ContentCart[i] = json1[i]
    // }
    for (var i = 0; i < ContentCart.length; i++) {
        if (ContentCart[i].img == img && ContentCart[i].title == title && ContentCart[i].price == price) {
            ContentCart.splice(i, 1);
            var json = JSON.stringify(ContentCart)
            localStorage.setItem("ContentCart", json)
            break;
        }
    }
    button.parentElement.parentElement.remove()
    update()
    updateTotal()
}

// const SanPhamDaMua = []
if (localStorage.getItem("SanPhamDaMua")) {
    var SanPhamKhachHang = localStorage.getItem("SanPhamDaMua")
    var json = JSON.parse(SanPhamKhachHang)
    for (var i = 0; i < json.length; i++) {
        SanPhamDaMua[i] = json[i]
    }
}
const btnCheckOut = document.querySelector('.js-check-out');
btnCheckOut.addEventListener('click', buy)
function buy() {
    var cart_dropdown_list = document.getElementsByClassName("cart-dropdown-list")[0]
    var now = localStorage.getItem("Now")
    if (cart_dropdown_list.innerText == "") {
        toast({
            title: 'Thông báo!',
            message: 'Giỏ hàng trống. Vui lòng thêm sản phẩm &#128522&#128522',
            type: 'warning',
            duration: 2000
        })
    }
    else if (localStorage.getItem("Now")) {
        localStorage.removeItem("ContentCart")
        var date = new Date()
        var cart_dropdown_item = cart_dropdown_list.getElementsByClassName("cart-dropdown-item")
        for (var i = 0; i < cart_dropdown_item.length; i++) {
            var title = cart_dropdown_item[i].getElementsByClassName("cart-dropdown-title")[0].innerText
            var img = cart_dropdown_item[i].getElementsByClassName("img-product-img")[0].src
            var quantity = cart_dropdown_item[i].getElementsByClassName("cart-quantity")[0].value
            var price = cart_dropdown_item[i].getElementsByClassName("price-product")[0].innerText
            var productBuy = {
                username: now,
                image: img,
                title: title,
                quantity: quantity,
                price: price,
                date: date.getDate(),
                month: (date.getMonth() + 1),
                year: date.getFullYear(),
                tinhtrang: 0,
            }
            SanPhamDaMua.push(productBuy)
        }
        for (var i = 0; i < SanPhamDaMua.length - 1; i++) {
            for (var j = i + 1; j < SanPhamDaMua.length; j++) {
                if (SanPhamDaMua[i].year < SanPhamDaMua[j].year) {
                    var temp = SanPhamDaMua[i]
                    SanPhamDaMua[i] = SanPhamDaMua[j]
                    SanPhamDaMua[j] = temp
                }
                else if (SanPhamDaMua[i].year == SanPhamDaMua[j].year) {
                    if (SanPhamDaMua[i].month < SanPhamDaMua[j].month) {
                        var temp = SanPhamDaMua[i]
                        SanPhamDaMua[i] = SanPhamDaMua[j]
                        SanPhamDaMua[j] = temp
                    }
                    else if (SanPhamDaMua[i].month == SanPhamDaMua[j].month) {
                        if (SanPhamDaMua[i].date < SanPhamDaMua[j].date) {
                            var temp = SanPhamDaMua[i]
                            SanPhamDaMua[i] = SanPhamDaMua[j]
                            SanPhamDaMua[j] = temp
                        }
                    }
                }
            }
        }


        var sanpham = JSON.stringify(SanPhamDaMua)
        localStorage.setItem("SanPhamDaMua", sanpham)
        toast({
            title: 'Thành công!',
            message: 'Chúc mừng! Bạn mua hàng thành công &#128525&#129297&#129297',
            type: 'success',
            duration: 2000
        })
        cart_dropdown_list.innerHTML = ""
        updateTotal()
        update()
    }
    else {
        showModalLogin();
        return
    }
}