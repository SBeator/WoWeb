function BlockerManager(width, height) {
    this.width = width;
    this.height = height;

    this.blockerWidth = 80;
    this.blockerSpaceHeight = 100;
    this.blockerSpeed = -100;
    this.borderSize = 30;

    this.timeCount = 0;
    this.timeCreate = 2;

    this.blockers = [];

    this.update = function (time) {
        this.timeCount += time;

        if (this.timeCount > this.timeCreate) {
            this.timeCount = 0;
            this.createBlocker();
        }

        var blockersOut = [];

        for (var i in this.blockers) {
            var blocker = this.blockers[i];
            blocker.move(time);

            if (this.isBlockerOut(blocker, width, height)) {
                blockersOut.push(blocker);
            }
        }

        for (var i in blockersOut) {
            this.deleteBlocker(blockersOut[i]);
        }
    }

    this.createBlocker = function () {
        var y = (this.height - this.blockerSpaceHeight - this.borderSize*2) * Math.random();

        var blocker = new Blocker(
            this.blockerWidth,
            this.height,
            this.blockerSpaceHeight,
            this.width + this.blockerWidth / 2,
            y + this.blockerSpaceHeight / 2 + this.borderSize,
            this.blockerSpeed);

        this.blockers.push(blocker);
    }

    this.deleteBlocker = function (blocker) {
        for (var i in this.blockers) {
            if (this.blockers[i] == blocker) {
                this.blockers = this.blockers.slice(0, i).concat(this.blockers.slice(i + 1, this.blockers.length));
            }
        }
    }

    this.isBlockerOut = function (blocker, width, height) {
        return blocker.x < -blocker.w;
    }

    this.draw = function (ctx) {
        for (var i in this.blockers) {
            this.blockers[i].draw(ctx);
        }
    }

    this.getCollisionRects = function () {
        var rects = [];

        for (var i in this.blockers) {
            var blockerRects = this.blockers[i].getCollisionRects();
            for (var j in blockerRects) {
                rects.push(blockerRects[j]);
            }
        }

        return rects;
    }
}