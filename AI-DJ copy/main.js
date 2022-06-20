song = "";
song_2="";
leftwrist_x = 0;
rightwrist_x = 0;
leftwrist_y = 0;
rightwrist_y = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    song = loadSound('music.mp3')
    song_2 = loadSound('music2.mp3')
}

function setup() {
    canvas = createCanvas(600, 400);
    canvas.position(700, 400);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("PoseNet Started")
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#acf0fc");
    stroke("#a2dbd9");
    if (scoreLeftWrist > 0.2) {
        
        square(rightwrist_x, rightwrist_y, 20,20);
        num = Number(leftwrist_y);
        remove_decimal = floor(num);
     song_2.pause();
    }
    if (song=false) {
        square(rightwrist_x, rightwrist_y, 20,20);
       song.play();
       document.getElementById("s").innerHTML="Song being played is song 1"
           
    }

      
}



function play() {
    song_2.play();
    song.setVolume(0.1);
    song.rate(2);
}


function gotPoses(results) {
    if (results.length > 0) {
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("score Left Wrist=" + scoreLeftWrist);
        console.log(results);
        leftwrist_x = results[0].pose.leftWrist.x;
        leftwrist_y = results[0].pose.leftWrist.y;
        rightwrist_x = results[0].pose.rightWrist.x;
        rightwrist_y = results[0].pose.rightWrist.y;
        console.log("LeftWrist X=" + leftwrist_x + "  LeftWrist Y=" + leftwrist_y)
        console.log("RightWrist X=" + rightwrist_x + "  RightWrist Y=" + rightwrist_y)
    }

    if (results.length > 0) {
        scoreRightWrist = results[0].keypoints[10].score;
        console.log('score right wrist =' + scoreRightWrist);
        console.log(results);

    }
}