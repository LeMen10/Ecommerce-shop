const getNameOfParam = window.location.href.split("?");
const pageController = document.querySelector('.js-page-controller');
var pageNum = '';
function renderPageNumber(resultFilter) {
    if (pageNum === '') {
        if (resultFilter) {
            for (var i = 1; i < ((resultFilter.length) / 8) + 1; i++) {
                pageNum += `<li class="pagination-item js-active">
                                <a class="js-load-page-shop" onclick="changePage()" >${i}</a>
                            </li>
                        `
            }
        }
    }
    pageController.innerHTML = pageNum;
    pageNum = ''
}
function renderPageNumberSearch(resultFilter) {
    if (pageNum === '') {
        if (resultFilter) {
            for (var i = 1; i < ((resultFilter.length) / 8) + 1; i++) {
                pageNum += `<li class="pagination-item js-active">
                                <a class="js-load-page-shop" onclick="changePageSearch()" >${i}</a>
                            </li>
                        `
            }
        }
    }
    pageController.innerHTML = pageNum;
    pageNum = ''
}
const dataSearch = document.querySelector('.js-search-product');

function changePageSearch() {
    window.scrollTo(0, 0)
    var resultProducts = [];
    const numberPage = event.target.innerText;
    var resultSearch = searchProduct();
    var length = resultSearch.length;
    if (resultSearch.length != 0) {
        for (var i = 0; i < length; i++) {
            if (numberPage == 1) {
                if (i < 8) {
                    resultProducts.push(resultSearch[i]);
                }
            }
            else {
                if (((i >= (numberPage - 1) * 8) && (i <= (numberPage * 8)))) {
                    resultProducts.push(resultSearch[i]);
                }
            }
        }
    }
    renderProductFilter(resultProducts);
}

function changePage() {
    window.scrollTo(0, 0)
    var resultProducts = [];
    const numberPage = event.target.innerText;
    arrProductData.forEach(item => {
        if (numberPage == 1) {
            if (item.id <= 8) {
                resultProducts.push(item);
            }
        }
        else {
            if (((item.id > (numberPage - 1) * 8) && (item.id <= (numberPage * 8)))) {
                resultProducts.push(item);
            }
        }
    })
    renderProductFilter(resultProducts);

}
const titleProductList = document.querySelector('.title-product-list');
var arrCategogys = JSON.parse(localStorage.getItem("Category"));
// console.log(arrCategogys)
var s1 = '';
function renderCategory() {
    freshfruit();
    snack();
    coffee();
    vegetable();
    if (s1 === '') {
        arrCategogys.forEach((item) => {
            s1 += `<li class="title-product-item">
                    <div class="product-item">
                        <img src="${item.img}" alt="">
                        <a  class="render-by-category" onclick="renderByCategory()">${item.title}</a>
                    </div>
                <div class="count-product ">${item.count}</div>
            </li>`
        })
        titleProductList.innerHTML = s1;
    }
}


function freshfruit() {
    var length = arrProductData.length, dem = 0;
    for (var i = 0; i < length; i++) {
        if (arrProductData[i].category == 'freshfruit') {
            dem++;
        }
    }

    for (var i = 0; i < arrCategogys.length; i++) {
        if (arrCategogys[i].name == 'freshfruit') {
            arrCategogys[i].count = dem;
        }
    }
    var json = JSON.stringify(arrCategogys)
    localStorage.setItem("Category", json)
}
function vegetable() {
    var length = arrProductData.length, dem = 0;
    for (var i = 0; i < length; i++) {
        if (arrProductData[i].category == 'vegetable') {
            dem++;
        }
    }
    for (var i = 0; i < arrCategogys.length; i++) {
        if (arrCategogys[i].name == 'vegetable') {
            arrCategogys[i].count = dem;
        }
    }
    var json = JSON.stringify(arrCategogys)
    localStorage.setItem("Category", json)
}
function snack() {
    var length = arrProductData.length, dem = 0;
    for (var i = 0; i < length; i++) {
        if (arrProductData[i].category == 'snack') {
            dem++;
        }
    }
    for (var i = 0; i < arrCategogys.length; i++) {
        if (arrCategogys[i].name == 'snack') {
            arrCategogys[i].count = dem;
        }
    }
    var json = JSON.stringify(arrCategogys)
    localStorage.setItem("Category", json)
}
function coffee() {
    var length = arrProductData.length, dem = 0;
    for (var i = 0; i < length; i++) {
        if (arrProductData[i].category == 'coffee') {
            dem++;
        }
    }
    for (var i = 0; i < arrCategogys.length; i++) {
        if (arrCategogys[i].name == 'coffee') {
            arrCategogys[i].count = dem;
        }
    }
    var json = JSON.stringify(arrCategogys)
    localStorage.setItem("Category", json)
}

function renderByCategory() {
    window.scrollTo(0, 0)
    var resultFilter = [];
    var elementCategory = event.target
    var nameCategory = elementCategory.innerText.toLowerCase().replace(/\s/g, '');
    arrProductData.forEach((item) => {
        if (nameCategory.includes(item.category)) {
            resultFilter.push(item);
        }
    })
    renderProductFilter(resultFilter);
    renderPageNumber(resultFilter);
}

// for (const btnPageShop of btnPageShops) {
//     btnPageShop.addEventListener('click', function () {
//         var resultFilter = [];
//         openPageShop();
//         for (var i = 0; i < 8; i++) {
//             resultFilter.push(arrProductData[i]);
//         }
//         renderProductFilter(resultFilter);
//         renderPageNumber(arrProductData);
//     });
// }

function searchProduct() {
    var resultProducts = [];
    if (dataSearch.value != "") {
        localStorage.setItem('pageShop', 'pageShop');
        openPageShop();
        arrProductData.forEach(item => {
            if (item.title.toLowerCase().includes(dataSearch.value)) {
                resultProducts.push(item);
            }
        })

        renderPageNumberSearch(resultProducts)
        renderProductFilter(resultProducts);
        if (resultProducts.length == 0) {
            productLists.innerText = 'Không có sản phẩm bạn cần tìm.'
        }
    }
    console.log(resultProducts)
    // return resultProducts
}

dataSearch.addEventListener('keydown', function (e) {
    if (e.keyCode == 13) {
        searchProduct();
    }
})

var datafilter = '';
function renderProductFilter(resultFilter) {
    var dem = 0;
    if (datafilter === '') {
        resultFilter.forEach((item) => {
            if (dem < 8) {
                datafilter += `<div class="col col-3 col-4 col-6 col-12 mb-24">
                <div class="popular-product-cart-wrap js-page-description-product" onclick="pageDescription()">
                    <div class="product-card-header">
                        <img class="js-product-cart-src img-product-box" src="${item.img}"
                            alt="">
                    </div>

                    <div class="product-cart-content">
                        <a class="product-cart-title js-product-cart-title" >${item.title}</a>
                        <p class="product-cart-description">${item.detail}</p>
                        <div class="product-card-bottom">
                            <span class="js-product-cart-price current-price">$${item.price}</span>
                            <div class="add-cart" onclick="addCartPageShop(event)">
                                <a class="btn">Add</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
            }
            dem++;
        })
        productLists.innerHTML = datafilter;
        datafilter = '';
    }
}

//lọc sản phẩm theo giá
const elementFilter = document.querySelector('.js-filter-by-price');
function filterByPrice() {
    var resultFilter = [];

    arrProductData.forEach(item => {
        if (elementFilter.value == 1) {
            if (item.price > 0 && item.price <= 20) {
                resultFilter.push(item);
                return resultFilter;
            }
        }
        if (elementFilter.value == 2) {
            if (item.price > 20 && item.price <= 40) {
                resultFilter.push(item);
                return resultFilter;
            }
        }
        else if (elementFilter.value == 3) {
            if (item.price > 40 && item.price <= 60) {
                resultFilter.push(item);
            }
        }
        else if (elementFilter.value == 4) {
            if (item.price > 60 && item.price <= 80) {
                resultFilter.push(item);
            }
        }
        else if (elementFilter.value == 5) {
            if (item.price > 80 && item.price <= 100) {
                resultFilter.push(item);
            }
        }
        else if (elementFilter.value == 6) {
            if (item.price > 100) {
                resultFilter.push(item);
            }
        }
    })
    renderProductFilter(resultFilter);
    renderPageNumber(resultFilter);

    if (elementFilter.value == 0) {
        for (var i = 0; i < 8; i++) {
            resultFilter.push(arrProductData[i]);
        }
        renderProductFilter(resultFilter);
        renderPageNumber(arrProductData);
    }

}
//end lọc
