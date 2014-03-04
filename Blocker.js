function Blocker(w, h, sh, x, y, vx, vy, ax, ay) {
    this.w = w || 0;
    this.h = h || 0;
    this.sh = sh || 0;

    this.x = x || 0;
    this.y = y || 0;

    this.vx = vx || 0;
    this.vy = vy || 0;

    this.ax = ax || 0;
    this.ay = ay || 0;

    var imageWidth = 80;
    var imageHeight = 400;
    var blockerImageSrc = [
        "res/BlockerUp.png",
        "res/BlockerDown.png"
    ];

    this.blockerImages = [
        document.createElement("img"),
        document.createElement("img")
    ];

    for (var i in this.blockerImages) {
        this.blockerImages[i].setAttribute("src", blockerImageSrc[i]);
    }

    this.move = function (time) {
        this.x += this.vx * time;
        this.y += this.vy * time;

        this.vx += this.ax * time;
        this.vy += this.ay * time;
    }

    this.draw = function (ctx) {
        var color = "#0F0";

        var x = this.x;
        var y = this.y;

        ctx.fillStyle = color;

        var rects = this.getCollisionRects();

        var ratio = imageWidth / this.w;

        for (var i in rects) {
            var rect = rects[i];
            ctx.drawImage(this.blockerImages[i],
                0,
                i > 0 ? 0 : (imageHeight - rect.height * ratio),
                imageWidth,
                rect.height * ratio,
                rect.x,
                rect.y,
                rect.width,
                rect.height);
        }
    }

    this.getCollisionRects = function () {
        return [{
            x: this.x - this.w/2,
            y: 0,
            width: this.w,
            height: this.y - this.sh/2,
        }, {
            x: this.x - this.w / 2,
            y: this.y + this.sh / 2,
            width: this.w,
            height: this.h - this.y + this.sh / 2,
        }];
    }
}