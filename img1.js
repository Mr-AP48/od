objects = []
img = ""
stats = ""

function preload() {
    img = loadImage('img1.jpg')
    console.warn("Images Loaded!")
}

function setup() {
    canvas = createCanvas(600, 400)
    canvas.center()

    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
}

function modelLoaded() {
    console.warn("Model Loaded!!!!!!!")
    stats = true;
    objectDetector.detect(img, gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.error(error)
    }
    console.warn(results)
    objects = results
}

function draw() {
    image(img, 0, 0, 600, 400)

    if (stats != "") {
        for (x = 0; x < objects.length; x++) {
            document.getElementById("status").innerHTML = "Staus: Object Detected"
            fill("#FF0000")
            percent = floor(objects[x].confidence * 100)
            text(objects[x].label + " " + percent + "%", objects[x].x + 15, objects[x].y + 15)
            noFill()
            stroke("#FF0000")
            rect(objects[x].x, objects[x].y, objects[x].width, objects[x].height)
        }
    }
}