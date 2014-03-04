
// (x, y) is the center point of bird.
function Bird(x, y, vx, vy, ax, ay) {
    this.x = x || 0;
    this.y = y || 0;

    this.vx = vx || 0;
    this.vy = vy || 0;

    this.ax = ax || 0;
    this.ay = ay || 0;

    this.width = 40;
    this.height = 40 / 135 * 100;


    var imageSrc = [
        "res/1.png",
        "res/2.png",
        "res/3.png"
    ]
    var imageIndex = 0;

    this.birdImage = document.createElement("img");
    this.birdImage.setAttribute("src", imageSrc[imageIndex]);

    this.time = 0;
    this.changeTime = 0.1;

    this.update = function (time) {
        this.time += time;

        this.move(time);
    }

    this.move = function (time) {
        this.x += this.vx * time;
        this.y += this.vy * time;

        this.vx += this.ax * time;
        this.vy += this.ay * time;
    }

    this.draw = function (ctx) {
        var color = "#FF0000";

        var x = this.x;
        var y = this.y;
        
        var rotateDeg = this.vy / 7 * Math.PI / 180;

        ctx.translate(x, y);
        ctx.rotate(rotateDeg);
        ctx.drawImage(this.birdImage, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.rotate(-rotateDeg);
        ctx.translate(-x, -y);

        if (this.time > this.changeTime) {
            imageIndex += 1;
            imageIndex %= imageSrc.length;

            this.birdImage.setAttribute("src", imageSrc[imageIndex]);
            this.time = 0;
        }

        //ctx.fillStyle = color;
        //ctx.beginPath();
        //ctx.arc(x, y, size, 0, Math.PI * 2);
        //ctx.closePath();
        //ctx.fill();
    }

    this.onClick = function (vy) {
        this.vy = -200;
    }

    this.getCollisionRect = function () {
        return {
            x: this.x - this.width / 2,
            y: this.y - this.height / 2,
            width: this.width,
            height: this.height,
        };
    }
}