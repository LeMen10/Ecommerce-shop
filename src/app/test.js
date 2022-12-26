const FileSystem = require("fs");
const category = [{
    "key": "cate_id",
    "name": "snack", // unique
    "title": "Snack",
    "count": 4,
    "img": "/img/category-1.svg",
}, {
    "key": "cate_id",
    "name": "vegetable",
    "title": "Vegetable",
    "count": 4,
    "img": "/img/category-9.svg",
}, {
    "key": "cate_id",
    "name": "freshfruit",
    "title": "Fresh Fruit",
    "count": 4,
    "img": "/img/category-5.svg",
}, {
    "key": "cate_id",
    "name": "coffee",
    "title": "Coffee & Water",
    "count": 4,
    "img": "/img/category-2.svg",
}];

// var json = JSON.stringify(category)
// localStorage.setItem("Category", json)


FileSystem.writeFile('file.json', JSON.stringify(category), (error) => {
    if (error) throw error;
});


// var obj = JSON.parse(FileSystem.readFileSync('file.json'))
// console.log(obj)
