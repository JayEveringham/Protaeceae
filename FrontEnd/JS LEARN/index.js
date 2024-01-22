
function createCircle(radius) {
    return {
        radius,
        draw: function () {
            console.log(`drawing a ${radius} sercil `);
        }
    };
}

const circle = createCircle(1);

function Circle(radius) {
    console.log('this', this);
    this.radius = radius;
    this.draw = function () {
        console.log('draw');
    }
}

const another = new Circle(1);