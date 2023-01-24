prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id = "capture_image" src = "' + data_uri + '"/>';
    });
}

console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/drudG4WmS/model.json", modelLoaded);

function check() {
    img = document.getElementById('capture_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_2 = results[1].label;
        speak();
        if(results[1].label == "Thumbs up")
        {
            document.getElementById("update_emoji2").innerHTML = "&#9996;";
        }
        else if(results[1].label == "Peace")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128076;";
        }
        else if(results[1].label == "Amazing")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128077;";
        }
    }
}

function modelLoaded(){
    console.log("Model loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_2 = "First prediction is- " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}