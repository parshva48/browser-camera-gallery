let maincontainer=document.querySelector(".main-container");
setTimeout(function(){
  if(db){

     let transactionvideo=db.transaction("video","readonly");
     let videostore=transactionvideo.objectStore("video");
     let allvideos=videostore.getAll();
     console.log(allvideos);
     allvideos.addEventListener("success",function(){
         let videoarr=allvideos.result;
         for(let i=0;i<videoarr.length;i++)
         {
             let url=URL.createObjectURL(videoarr[i].data);
             let mediacontainer=document.createElement("div");
             mediacontainer.setAttribute("class","media-container");
             mediacontainer.setAttribute("id",videoarr[i].id);
             mediacontainer.innerHTML=`<div class="media">
             <video  autoplay loop src="${url}"></video>
         </div>
         <div class="download action-btn">Download</div>
         <div class="delete action-btn">Delete</div>`
         maincontainer.appendChild(mediacontainer);
         let downloadbtn=mediacontainer.querySelector(".download");
         downloadbtn.addEventListener("click",function(){
          let a=document.createElement("a");
          a.download="file.mp4";
          a.href=url;
          a.click();
         });

         let deletebtn=mediacontainer.querySelector(".delete");
         deletebtn.addEventListener("click",function(){
          let transactionvideo=db.transaction("video","readwrite");
          let videostore=transactionvideo.objectStore("video");
             videostore.delete(videoarr[i].id);
             mediacontainer.remove();
         });

         }
     })
     
     let transactionimage=db.transaction("image","readonly");
     let imagestore=transactionimage.objectStore("image");
     let allimages=imagestore.getAll();
     allimages.addEventListener("success",function(){
         let imagearr=allimages.result;
         for(let i=0;i<imagearr.length;i++)
         {
             let url=imagearr[i].data;
             let mediacontainer=document.createElement("div");
             mediacontainer.setAttribute("class","media-container");
             mediacontainer.setAttribute("id",imagearr[i].id);
             mediacontainer.innerHTML=`<div class="media">
             <img src="${url}">
         </div>
         <div class="download action-btn">Download</div>
         <div class="delete action-btn">Delete</div>`
         maincontainer.appendChild(mediacontainer);
         let downloadbtn=mediacontainer.querySelector(".download");
         downloadbtn.addEventListener("click",function(){
          let a=document.createElement("a");
          a.download="img.png";
          a.href=url;
          a.click();

         });
         
         let deletebtn=mediacontainer.querySelector(".delete");
         deletebtn.addEventListener("click",function(){
          let transactionimage=db.transaction("image","readwrite");
          let imagestore=transactionimage.objectStore("image");
             imagestore.delete(imagearr[i].id);
             mediacontainer.remove();
         });

         }
     })


   
  }


},100)

