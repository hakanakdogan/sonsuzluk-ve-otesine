let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

cvs.height = innerHeight;
cvs.width = innerWidth;

//variables

let rocketWidth = 35;
let rocketHeight = 150;
let rocketX = innerWidth / 2;
let rocketY = innerHeight / 2;
let score = 0;
let scoreText = document.getElementById("scoreText");
let animationID;
const button = document.querySelector(".button");
const wrapper = document.querySelector(".wrapper");
let endScoreText = document.querySelector(".endScoreText");
endScoreText.innerHTML = localStorage.getItem("score") + " m";


//define images

let rocket = new Image();
let meteor1 = new Image();
let meteor2 = new Image();




//set src of images

rocket.src = "images/rocket.png";
meteor1.src = "images/meteor1.png";
meteor2.src = "images/meteor2.png";





//define audio

let bgMusic = new Audio();
let gameover = new Audio();
let meteorexp = new Audio();

//set src of audio

bgMusic.src = "sounds/bgmusic.mp3";
bgMusic.loop = true;
gameover.src = "sounds/gameover.wav";
bgMusic.volume = 0.5;
bgMusic.autoplay = "true";
meteorexp.src = "sounds/meteorexp.wav";
meteorexp.volume = 0.3;
gameover.volume = 0.3;





document.addEventListener("mousemove", (e) => {

    if (rocketX >= 0) {
        rocketX = e.x;
    }

    if (rocketX + rocketWidth > innerWidth) {
        rocketX = innerWidth - rocketWidth;
    }


    if (rocketY >= 0) {
        rocketY = e.y;
    }
    if (rocketY + rocketHeight > innerHeight) {
        rocketY = innerHeight - rocketHeight;
    }


})

class MeteorP {
    constructor(x, y, velocity) {
        this.x = x;
        this.y = y;
        this.velocity = velocity;
    }

    draw() {

        ctx.drawImage(meteor1, this.x, this.y);
    }
    update() {
        this.draw()
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

class MeteorW {
    constructor(x, y, velocity) {
        this.x = x;
        this.y = y;
        this.velocity = velocity;
    }

    draw() {

        ctx.drawImage(meteor2, this.x, this.y);
    }
    update() {
        this.draw()
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}
let meteors = [];


//localstorage de bir şey yoksa skoru 0 yap
if (localStorage.getItem("score") === null) {
    endScoreText.innerHTML = "0";
}

// const spawnMeteorP = () => {


//     setInterval(() => {


//         let x, y;
//         if (Math.random() < 0.5) {
//             x = Math.random() < 0.5 ? -50 : cvs.width + 50;
//             y = Math.random() * cvs.height;
//         } else {
//             x = Math.random() * cvs.width;
//             y = Math.random() < .5 ? -50 : cvs.height + 50
//         }





//         const angle = Math.atan2(rocketY - y, rocketX - x);
//         const velocity = {
//             x: Math.cos(angle),
//             y: Math.sin(angle)

//         }


//         meteors.push(new MeteorP(x, y, velocity))
//     }, 1000)



// }

const spawnMeteorP = () => {

    if (score > 50000) {
        setInterval(() => {


            let x, y;
            if (Math.random() < 0.5) {
                x = Math.random() < 0.5 ? -50 : cvs.width + 50;
                y = Math.random() * cvs.height;
            } else {
                x = Math.random() * cvs.width;
                y = Math.random() < .5 ? -50 : cvs.height + 50
            }





            const angle = Math.atan2(rocketY - y, rocketX - x);
            let velocity;
            if (score > 50000) {
                velocity = {
                    x: (Math.cos(angle)) * 2,
                    y: (Math.sin(angle)) * 2
                }
            }
            else {
                velocity = {
                    x: Math.cos(angle),
                    y: Math.sin(angle)

                }
            }



            meteors.push(new MeteorP(x, y, velocity))
        }, 500)
    } else {
        setInterval(() => {


            let x, y;
            if (Math.random() < 0.5) {
                x = Math.random() < 0.5 ? -50 : cvs.width + 50;
                y = Math.random() * cvs.height;
            } else {
                x = Math.random() * cvs.width;
                y = Math.random() < .5 ? -50 : cvs.height + 50
            }





            const angle = Math.atan2(rocketY - y, rocketX - x);
            let velocity;
            if (score > 50000) {
                velocity = {
                    x: (Math.cos(angle)) * 2,
                    y: (Math.sin(angle)) * 2
                }
            }
            else {
                velocity = {
                    x: Math.cos(angle),
                    y: Math.sin(angle)

                }
            }



            meteors.push(new MeteorP(x, y, velocity))
        }, 1000)
    }




}

const spawnMeteorW = () => {


    if (score > 50000) {
        setInterval(() => {


            let x, y;
            if (Math.random() < 0.5) {
                x = Math.random() < 0.5 ? -50 : cvs.width + 50;
                y = Math.random() * cvs.height;
            } else {
                x = Math.random() * cvs.width;
                y = Math.random() < .5 ? -50 : cvs.height + 50
            }





            const angle = Math.atan2(rocketY - y, rocketX - x);
            let velocity;
            if (score > 50000) {
                velocity = {
                    x: (Math.cos(angle)) * 2,
                    y: (Math.sin(angle)) * 2
                }
            }
            else {
                velocity = {
                    x: Math.cos(angle),
                    y: Math.sin(angle)

                }
            }



            meteors.push(new MeteorP(x, y, velocity))
        }, 500)
    } else {
        setInterval(() => {


            let x, y;
            if (Math.random() < 0.5) {
                x = Math.random() < 0.5 ? -50 : cvs.width + 50;
                y = Math.random() * cvs.height;
            } else {
                x = Math.random() * cvs.width;
                y = Math.random() < .5 ? -50 : cvs.height + 50
            }





            const angle = Math.atan2(rocketY - y, rocketX - x);
            let velocity;
            if (score > 50000) {
                velocity = {
                    x: (Math.cos(angle)) * 2,
                    y: (Math.sin(angle)) * 2
                }
            }
            else {
                velocity = {
                    x: Math.cos(angle),
                    y: Math.sin(angle)

                }
            }



            meteors.push(new MeteorW(x, y, velocity))
        }, 1000)
    }


}

const meteorCollision = (a, aIndex,) => {
    meteors.forEach((b, bIndex) => {
        if (a !== undefined && b !== undefined && a !== b) {
            if (a.x < b.x + 50 &&
                a.x + 50 > b.x &&
                a.y < b.y + 50 &&
                a.y + 50 > b.y) {
                meteors.splice(aIndex, 1);
                meteors.splice(bIndex, 1);
                meteorexp.play();
            }
        }
    })


}



const draw = () => {
    animationID = requestAnimationFrame(draw);
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.drawImage(rocket, rocketX, rocketY);

    score += 27;
    scoreText.innerHTML = score + "m";


    meteors.forEach((meteor, meteorIndex) => {
        meteor.update();



        if (meteor.x < rocketX + rocketWidth + 5 &&
            meteor.x + 50 > rocketX + 15 &&
            meteor.y < rocketY + rocketHeight &&
            meteor.y + 50 > rocketY
        ) {
            meteors.splice(meteorIndex, 1);



            localStorage.setItem("score", score.toString());


            score = 0;
            bgMusic.src = "";
            gameover.play();
            cancelAnimationFrame(animationID);
            setTimeout(() => {
                location.reload();
            }, 1800)


        } // Seperating Axis Teorem

        meteorCollision(meteor, meteorIndex);

    })

}



button.addEventListener("click", () => {
    wrapper.style.display = "none";
    bgMusic.src = "sounds/bgmusic.mp3";
    bgMusic.play();
    draw();
    spawnMeteorP();
    spawnMeteorW();


})


