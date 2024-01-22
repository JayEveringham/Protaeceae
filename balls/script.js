// Getting the canvas and context
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to set canvas size to full viewport
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Initial canvas size setup
setCanvasSize();

// Resize canvas with the viewport
window.addEventListener('resize', function () {
    setCanvasSize();
});

// Function to play a tone
function playTone(frequency) {
    // Create an oscillator
    var oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine'; // Sine wave
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime); // frequency

    // Connect the oscillator to the destination (speakers)
    oscillator.connect(audioCtx.destination);

    // Start the oscillator
    oscillator.start();

    // Stop the oscillator after a short period
    setTimeout(function () {
        oscillator.stop();
    }, 200); // stop after 200ms
}

// Ball object constructor
function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };

    this.update = function () {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
            playTone(440); // Play a tone at 440Hz (A4)
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
            playTone(440); // Play a tone at 440Hz (A4)
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };
}

// Create multiple balls
var balls = [];
for (let i = 0; i < 5; i++) {
    var radius = 30;
    var x = Math.random() * (canvas.width - radius * 2) + radius;
    var y = Math.random() * (canvas.height - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 4;
    var dy = (Math.random() - 0.5) * 4;
    var color = `hsl(${360 * Math.random()}, 70%, 85%)`; // Pastel color
    balls.push(new Ball(x, y, dx, dy, radius, color));
}

// Animation loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(function (ball) {
        ball.update();
    });
    requestAnimationFrame(draw);
}

// User interaction to start the audio context
document.getElementById('startButton').addEventListener('click', function () {
    // Check if the context is in a suspended state (autoplay policy)
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    // Start the visual animation
    draw();
    // Hide the start button
    this.style.display = 'none';
});
