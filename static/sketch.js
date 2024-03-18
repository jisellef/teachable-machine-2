    // Classifier Variable
    let classifier;
    // Model URL
    let imageModelURL = 'https://teachablemachine.withgoogle.com/models/BVaT94d0n/';

    // Video
    let video;
    let flippedVideo;
    // To store the classification
    let label = "";

    // Load the model first
    function preload() {
      classifier = ml5.imageClassifier(imageModelURL + 'model.json');
    }

    function setup() {
        var canvas = createCanvas(500, 450);
        canvas.parent('sketch-holder');
      video = createCapture(VIDEO);
      video.size(500, 420);
      video.hide();

      flippedVideo = ml5.flipImage(video);
      // Start classifying
      classifyVideo();
    }

    function draw() {
      background(0);
      // Draw the video
      if (label === 'Blue Marker') {
        background(0, 0, 255);
        textSize(24);
        textAlign(CENTER);
        text("Blue Marker", width / 2, height - 20);
      }
        else if (label === 'Green Marker') {
        background(0, 255, 0);
        textSize(24);
        textAlign(CENTER);
        text("Green Marker", width / 2, height - 20);
      }
        else if (label === 'Red Marker') {
        background(255, 0, 0);
        textSize(24);
        textAlign(CENTER);
        text("Red Marker", width / 2, height - 20);
      }
        else if (label === 'yellow marker') {
        background(255, 255, 0);
        textSize(24);
        textAlign(CENTER);
        text("Yellow Marker", width / 2, height - 20);
      }
        else if (label === 'Orange Marker') {
        background(255, 165, 0);
        textSize(24);
        textAlign(CENTER);
        text("Orange Marker", width / 2, height - 20);
      } else {
        image(flippedVideo, 0, 0);
      }

      // Draw the label
      fill(255);
      textSize(16);
      textAlign(CENTER);
      text(label, width / 2, height - 4);
    }

    // Get a prediction for the current video frame
    function classifyVideo() {
      flippedVideo = ml5.flipImage(video)
      classifier.classify(flippedVideo, gotResult);
    }

    // When we get a result
    function gotResult(error, results) {
      // If there is an error
      if (error) {
        console.error(error);
        return;
      }
      // The results are in an array ordered by confidence.
      // console.log(results[0]);
      label = results[0].label;
      // Classify again!
      classifyVideo();
    }
