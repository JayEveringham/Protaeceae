// Initialize canvas and context
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
setCanvasSize();

Tone.setContext(new Tone.Context({ latencyHint: "playback" }))
const synth = new Tone.PolySynth().toDestination();
const pingPong = new Tone.PingPongDelay("8n", 0.6);
const reverb = new Tone.Reverb();
pingPong.connect(reverb);
synth.connect(pingPong);
pingPong.toDestination();
const leftPanner = new Tone.Panner(-1).toDestination(); // Left channel
const rightPanner = new Tone.Panner(1).toDestination(); // Right channel


const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5", "A5", "B5", "C6"];

// Set canvas to full browser width and height
function setCanvasSize() {
    canvas.width = Math.floor(window.innerWidth / 10) * 10;
    canvas.height = window.innerHeight;
}

// Handle window resize
window.addEventListener('resize', function () {
    setCanvasSize();
});

// Ball constructor
function Ball(x, y, dx, radius, note) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.radius = radius;
    this.note = note;

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'white'; // Color of the ring
        ctx.lineWidth = 2; // Width of the ring line
        ctx.shadowBlur = 5; // Glow effect size
        ctx.shadowColor = "white"; // Color of the glow effect
        ctx.stroke(); // Draw the ring
        ctx.closePath();
    };

    this.update = function () {
        if (this.x + this.radius > canvas.width) {
            // Play the note from the right channel
            synth.triggerAttackRelease(this.note, "8n", undefined, undefined, rightPanner);
            this.dx = -this.dx.toFixed(1);
            this.x -= 2 * ((this.x + this.radius - canvas.width));
        } else if (this.x - this.radius < 0) {
            // Play the note from the left channel
            synth.triggerAttackRelease(this.note, "8n", undefined, undefined, leftPanner);
            this.dx = -this.dx.toFixed(1);
            this.x += -2 * ((this.x - this.radius));
        }

        this.x += this.dx;
        this.draw();
    };

}

// Create 15 balls with spacing
var balls = [];
var numberOfBalls = 15; // Now 15 balls
var gap = canvas.height / (numberOfBalls + 1); // Adjust gap based on canvas height


for (let i = 0; i < numberOfBalls; i++) {
    let radius = 10;
    let x = Math.floor(canvas.width);
    let y = (i + 1) * (canvas.height / (numberOfBalls + 1));
    let dx = parseFloat((3 - i * 0.1).toFixed(1)); // Adjust speed if you want variability
    console.log(dx);
    // Assign notes from high to low
    let noteIndex = numberOfBalls - 1 - i; // This inverses the note assignment
    balls.push(new Ball(x, y, dx, radius, notes[noteIndex]));
}

// Animation loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    balls.forEach(function (ball) {
        ball.update(); // Update and draw each ball
    });
    requestAnimationFrame(draw);
}

// Start the animation
draw();






const playBTN = document.getElementById("play-btn");




playBTN.addEventListener("click", () => {
    if (Tone.context.state != "running") {
        Tone.start();
        console.log('started');
    }
    synth.triggerAttackRelease("C5", "8n");
});