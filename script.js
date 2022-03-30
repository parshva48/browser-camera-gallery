let videoelem=document.querySelector("video");
let recordbtn=document.querySelector(".outer-cover");
let capturebtn=document.querySelectorAll(".outer-cover")[1];
let innerrecordbtn=document.querySelector(".recording");
let innercapturebtn=document.querySelector(".click");
let isrecording=false;
let counter=0;
let timer=document.querySelector(".timer");
let record=[];
let recordingobjectforcurrstream;
let stoptimer;
let filterarr=document.querySelectorAll(".filter");
let filtercover=document.querySelector(".filter-cover");
let filtercolor="";
let zoominbtn=document.querySelector(".zoom-in");
let zoomoutbtn=document.querySelector(".zoom-out");
let zoomin=1;
let videostream;
let constraint={
    video:true,
    audio:true
}
let usermediapromise=navigator.mediaDevices.getUserMedia(constraint);
usermediapromise.then(function(stream){
   videoelem.srcObject=stream;
   videostream=stream;
 recordingobjectforcurrstream=new MediaRecorder(stream);
   recordingobjectforcurrstream.addEventListener("dataavailable",function(e){
       console.log("hiii");
       record.push(e.data);
   })

   recordingobjectforcurrstream.addEventListener("stop",function(){
       const blob=new Blob(record,{type:'video/mp4'});
       let transactionrequest=db.transaction("video","readwrite");
       let videostore=transactionrequest.objectStore("video");
       let videoid=Date.now();
       let videoentry={
           id:"vid"+videoid,
           data:blob

       }
       videostore.add(videoentry);
    //    const url=window.URL.createObjectURL(blob);
    //    let a=document.createElement("a");
    //    a.download="file.mp4";
    //    a.href=url;
    //    a.click();
    //    record=[];
   })



})
.catch(function(err){
    alert("please give permission");
})

capturebtn.addEventListener("click",function(){
    innercapturebtn.classList.add("click-animation");
    let board=document.createElement("canvas");
    let tool=board.getContext("2d");
    
    board.height=videoelem.videoHeight;
        board.width=videoelem.videoWidth;
        tool.scale(zoomin,zoomin);
        const x=(tool.canvas.width/zoomin-videoelem.videoWidth)/2;
        const y=(tool.canvas.height/zoomin-videoelem.videoHeight)/2;
       tool.drawImage(videoelem,x,y);
       if(filtercolor!="")
       {
           tool.fillStyle=filtercolor;
           tool.fillRect(0,0,board.width,board.height);
       }
       let url=board.toDataURL();
    //    let a=document.createElement("a");
    //    a.download="img.png";
    //    a.href=url;
    //    a.click();
    let transactionrequest=db.transaction("image","readwrite");
    let imagestore=transactionrequest.objectStore("image");
    let imageid=Date.now();
    let imageentry={
        id:"img"+imageid,
        data:url

    }
 imagestore.add(imageentry);
      setTimeout(function(){
          innercapturebtn.classList.remove("click-animation");

      },1000)

})

recordbtn.addEventListener("click",function(){
    if(isrecording==false)
    {
        recordingobjectforcurrstream.start();
        innerrecordbtn.classList.add("record-animation");
        startTimer();
    }
    else{
     recordingobjectforcurrstream.stop();
     innerrecordbtn.classList.remove("record-animation");
     stopTimer();
    }
    isrecording=!isrecording;
})
//FILTER WALA KAAM
for(let i=0;i<filterarr.length;i++)
{
    filterarr[i].addEventListener("click",function(){
        filtercolor=filterarr[i].style.backgroundColor;
        filtercover.style.backgroundColor=filtercolor;

    })
}

//TIMER WALA KAAM
function startTimer(){
   timer.style.display="block";
    counter=0;
  stoptimer= setInterval(fn,1000);
    function fn(){
      let hours=Number.parseInt(counter/3600);
      if(hours<10)
      {
          hours="0"+hours;
      }
     let mins=Number.parseInt(counter%3600);
     mins=Number.parseInt(mins/60);
     if(mins<10)
     {
         mins="0"+mins;
     }
     let secs=Number.parseInt(counter%60);
     if(secs<10)
     {
         secs="0"+secs;
     }
     timer.innerText=hours+":"+mins+":"+secs;
     counter++;

    }

}

function stopTimer()
{ 
    timer.style.display="none";
   clearInterval(stoptimer);
}


//ZOOM WALA KAAM
zoominbtn.addEventListener("click",function(){

    if(zoomin<1.5){
      
     zoomin+=0.1;
     videoelem.style.transform=`scale(${zoomin})`;
    }


});

zoomoutbtn.addEventListener("click",function(){
   if(zoomin>1)
   {
       zoomin-=0.1;
       console.log(zoomin);
       videoelem.style.transform=`scale(${zoomin})`;

   }
   

})
