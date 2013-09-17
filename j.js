function Place() {
    var _place = $("#place");
    var _numBall = 0;
    addBall();

    function addBall() {
        _place.html(_place.html() + '<div id="ball' + _numBall + '" class="ball"></div>');
        new Ball(_numBall);
        _numBall = _numBall + 1;
    }
}

function Ball(index) {
    var _place = $("#place");
    var _ball = $("#ball" + index);
    var _cx = 200.0;
    var _cy = 200.0;
    var _x = 200.0;
    var _y = 240.0;
    var _r = 10.0;
    var _vx = 2.0;
    var _vy = 0.0;
    var _ax = 0.0;
    var _ay = 0.0;
    var _timeSpace = 50;
    var _slow = 1
    var _force = 200;

    setRadius(_r);
    setLocation(_x, _y);

    onTimer();

    function onTimer() {
        updateSpeed();
        move();
        slowdown();
        setTimeout(onTimer, _timeSpace);
    }

    function updateSpeed() {
        _vx = _vx + _ax;
        _vy = _vy + _ay;

        var dx = _cx - _x;
        var dy = _cy - _y;
        //var a = _force / Math.abs( dx + dy);

        var a = _force / (dx * dx + dy * dy);
        //var a =  (dx * dx + dy * dy)/_force;
        //var a = 0;
        if (dx == 0) {
            _ax = 0;
        }
        else {
            _ax = a * Math.abs(dx * Math.sin(Math.atan(dx / dy))) / dx;
        }
        if (dy == 0) {
            _ax = 0;
        }
        else {
            _ay = a * Math.abs(dy * Math.sin(Math.atan(dy / dx))) / dy;
        }
    }

    function reflection() {
        if (out()) {
            undoMove();
            reflecteSpeed();
            move();
        }
    }

    function slowdown() {
        _vx = _vx * _slow;
        _vx = _vx * _slow;
    }

    function out() {
        var dx = _cx - _x;
        var dy = _cy - _y;
        var clen = Math.sqrt(dx * dx + dy * dy);

        if (clen > _cx) {
            return true;
        } else {
            return false;
        }
    }

    function reflecteSpeed() {
        var dx = _cx - _x;
        var dy = _cy - _y;
        var clen = Math.sqrt(dx * dx + dy * dy);
        var ix = dx / clen;
        var iy = dy / clen;

        var l = -2 * (_vx * ix + _vy * iy);

        _vx = _vx + ix * l;
        _vy = _vy + iy * l;

    }

    function undoMove() {
        _x = _x - _vx;
        _y = _y - _vy;
    }

    function move() {
        _x = _x + _vx;
        _y = _y + _vy;

        reflection();

        setLocation(_x, _y);
    }

    function setLocation(x, y) {
        _x = x;
        _y = y;
        _ball.css({
            'left': (x - _r / 2) + 'px',
            'top': (y - _r / 2) + 'px'
        })
    }

    function setRadius(r) {
        var dpx = r + 'px';
        var rpx = r + 'px';
        _r = r;
        _ball.css({
            'width': dpx,
            'height': dpx,
            '-moz-border-radius': rpx,
            '-webkit-border-radius': rpx,
            'border-radius': rpx,
        })
    }
}



$(document).ready(Place);