Bones="";
Enemy="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_Bones="";
song_Enemy="";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    Bones = loadSound("Bones.mp3");
    Enemy = loadSound("Enemy.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    song_Enemy = Enemy.isPlaying();
    console.log(song_Enemy);

    song_Bones = Bones.isPlaying();
    console.log(song_Bones);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        Bones.stop();
        if(song_Bones == false){
            Enemy.play();
        }
        else{
            console.log("Song Name: Enemy Song");
            document.getElementById("song_id").innerHTML = "Song Name: Enemy Song";
        }
 
    }
    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        Enemy.stop();
        if(song_Enemy == false){
            Bones.play();
        }
        else{
            console.log("Song Name: Bones");
            document.getElementById("song_id").innerHTML = "Song Name: Bones";
        }

    }

}

function modelLoaded(){
    console.log("poseNet Is Activated!");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}