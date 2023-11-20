status="";
objects=[];
function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}
function draw(){
    image(video,0,0,480,380);
    if(status=="true"){
        objectdetector.detect(video,gotResults);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            fill("darkblue")
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x, objects[i].y);
            noFill();
            rect(objects[i].y, objects[i].x, objects[i].width, objects[i].height);
            if(objects[i].label==store){
                document.getElementById("objects").innerHTML="Objects Found.";
            }
            else{
                document.getElementById("objects").innerHTML="Objects Not Found";
            }
        }
    }
}
function start(){
    objectdetector=ml5.objectDetector("cocossd",modelloaded );
    document.getElementById("status").innerHTML="Status: Detecting Objects.";
    store= document.getElementById("objectname").value;
}
function modelloaded(){
    console.log("Model Loaded");
    status=true;
}
function gotResults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results
    }
    
}