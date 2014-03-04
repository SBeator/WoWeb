function FlappyBird(playgroundId, width, height) {

    var GameType = {
        initialize: 1,
        starting: 2,
        ending: 3,
    }

    var WelcomeBackgroundClass = "welcomebackground";
    var StoppingStartingBackgroundClass = "stoppingMovingbackground";
    var MovingingBackgroundClass = "movingBackground";
    
    this.gameType = GameType.initialize;

    this.initialize = function () {
        this.playground = document.getElementById(playgroundId);

        this.playCanvas = document.createElement("canvas");
        this.playContext = this.playCanvas.getContext("2d");
        this.width = width;
        this.height = height;

        this.playCanvas.setAttribute("width", width);
        this.playCanvas.setAttribute("height", height);
        this.playCanvas.flappyBird = this;

        this.playground.style.width = width + "px";
        this.playground.style.height = height + "px";
        this.playground.appendChild(this.playCanvas);

        this.timeSecend = 0.02;

        this.playCanvas.addEventListener("click", this.onClickCanvas);
        this.intervalNumber = setInterval(this.update, this.timeSecend * 1000, this);

        this.showWelcomePage();
    }

    this.showWelcomePage = function () {
        this.gameType = GameType.initialize;
        this.bird = new Bird(185, 180, 0, 0, 0, 0);

        this.playCanvas.classList.remove(MovingingBackgroundClass)
        this.playCanvas.classList.add(WelcomeBackgroundClass);

        this.drawBackground();
        var cxt = this.playContext;
    }

    this.startGame = function () {
        this.gameType = GameType.starting;

        this.bird = new Bird(100, 100, 0, 0, 0, 500);
        this.blockerManager = new BlockerManager(this.width, this.height);

        this.playCanvas.classList.remove(WelcomeBackgroundClass);
        this.playCanvas.classList.remove(StoppingStartingBackgroundClass);
        this.playCanvas.classList.add(MovingingBackgroundClass);
        
        this.update();
    }

    this.endGame = function () {
        this.gameType = GameType.ending;

        this.playCanvas.classList.add(StoppingStartingBackgroundClass);

        this.endingClick = function () { };

        var flappyBird = this;
        setTimeout(function () {
            flappyBird.endingClick = flappyBird.showWelcomePage;
            },
            1000
        );
    }


    this.onClickCanvas = function (evt) {
        var flappyBird = this.flappyBird;

        switch (flappyBird.gameType) {
            case GameType.initialize:
                flappyBird.startGame();
                break;
            case GameType.starting:
                flappyBird.bird.onClick();
                break;
            case GameType.ending:
                flappyBird.endingClick();
                break;
            default:
        }
    }

    this.birdHit = function () {
        var isHit;

        var rectBird = this.bird.getCollisionRect();

        if (rectBird.y < 0 || (rectBird.y + rectBird.height > this.height)) {
            isHit =  true;
        } else {
            var rectBlockers = this.blockerManager.getCollisionRects();

            isHit = false;
            for (var i in rectBlockers) {
                if (rectIntersection(rectBird, rectBlockers[i])) {
                    isHit = true;
                    break;
                }
            }
        }

        return isHit;
    }

    this.update = function (flappyBird) {
        if (!flappyBird) {
            flappyBird = this;
        }

        switch (flappyBird.gameType) {
            case GameType.initialize:
                flappyBird.bird.update(flappyBird.timeSecend);
                flappyBird.drawStaticBird();
                break;
            case GameType.starting:
                flappyBird.bird.update(flappyBird.timeSecend);
                flappyBird.blockerManager.update(flappyBird.timeSecend);

                if (flappyBird.birdHit()) {
                    flappyBird.endGame();
                }
                flappyBird.draw();
                break;
            default:
                break;
        }

    }

    this.draw = function () {
        this.drawBackground();
        this.bird.draw(this.playContext);
        this.blockerManager.draw(this.playContext);
    }

    this.drawBackground = function () {
        this.playContext.clearRect(0,0,this.width,this.height);
    }

    this.drawStaticBird = function () {
        var rect = this.bird.getCollisionRect();
        this.playContext.clearRect(rect.x, rect.y, rect.width, rect.height);
        this.bird.draw(this.playContext);
    }

    this.initialize();
}

function rectIntersection(rect1, rect2) {
    if ((rect1.x > rect2.x + rect2.width) ||
        (rect2.x > rect1.x + rect1.width) ||
        (rect1.y > rect2.y + rect2.height) ||
        (rect2.y > rect1.y + rect1.height))
    {
        return false;
    } else {
        return true;
    }

}

$(document).ready(function () {
    var play = new FlappyBird("playground", 400, 400);
});
