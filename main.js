image1 = "";
status = "";
object = [];

function preload(){
    image1 = loadImage("dog_cat.jpg")
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);

    ObjectDetection = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Object Detection has started.";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}

function getResults(error, results){

    if(error){
        console.log(error);
    }

    else{
        console.log(results);
        object = results;
    }
}

function draw(){
    image(video, 0, 0, 380, 380);
    
    if(status != ""){

        r = random(255);
        g = random(255);
        b = random(255);
        ObjectDetection.detect(video, getResults);

        for(i = 0; i < object.length; i++){
            document.getElementById("no.of_objects").innerHTML = "Number of objects detected are: " + object.length;
            document.getElementById("status").innerHTML = "Objects Detected.";
            percent = floor(object[i].confidence * 100);
            fill(r, g, b);
            text(object[i].label + " " + percent + "%" , object[i].x + 15, object[i].y + 15);
            noFill();
            stroke(r, g, b);
            strokeWeight(3);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}

