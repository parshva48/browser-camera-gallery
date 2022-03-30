let db;
let createdatabase=indexedDB.open("mygallary",2);
createdatabase.addEventListener("success",function(e){
    console.log("sucess");
    db=createdatabase.result;
})
createdatabase.addEventListener("error",function(e){
    console.log("error");
})
createdatabase.addEventListener("upgradeneeded",function(e){
    console.log("upgradeneeded");
    db=createdatabase.result;
    db.createObjectStore("video",{keyPath:"id"});
    db.createObjectStore("image",{keyPath:"id"});



})