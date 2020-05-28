let colors = [];
colors.push([255, 222, 218]);
colors.push([255, 193, 207]);
colors.push([248, 189, 196]);
colors.push([249, 173, 160]);
colors.push([239, 121, 138]);
colors.push([226, 175, 222]);
colors.push([206, 132, 173]);
colors.push([141, 134, 201]);
colors.push([90, 82, 161]);

let curColors = [];
curColors.push([255,255,255]);
curColors.push([255,255,255]);
curColors.push([255,255,255]);
curColors.push([255,255,255]);
curColors.push([255,255,255]);
curColors.push([255,255,255]);
curColors.push([255,255,255]);
curColors.push([255,255,255]);
curColors.push([255,255,255]);

let colorAssignments = [];
colorAssignments.push(0);
colorAssignments.push(1);
colorAssignments.push(2);
colorAssignments.push(3);
colorAssignments.push(4);
colorAssignments.push(5);
colorAssignments.push(6);
colorAssignments.push(7);
colorAssignments.push(8);

// [number, time]
let colorTimes = [];

let blinkTimes = [];
let blinkStartTime;

let bigBlinkTimes = [];
let bigBlinkStartTime;

let incSteps = 50;

let diffs = [];

// [number, time]
let bgTimes = [];

let moveTimes = [];
let moveStartTime;



let bgColors = [];
bgColors.push("rgb(9, 0, 87)");
bgColors.push("rgb(88,211, 245)");

let bgColor = bgColors[0];



// [number, assignment, time]
let colorAssignmentTimes = [];

for(let i = 0; i < 9; i++){
    diffs.push([(255 - colors[i][0])/incSteps, (255 - colors[i][1])/incSteps, (255 - colors[i][2])/incSteps]);
}

let audio = new Audio("Home.mp3");


function giveColor(color){
    return "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
}

function veryFirstMelody(startTime){
    for(let i = 0; i < 9; i++){
        colorTimes.push([i, startTime + i*425]);
    }
    
    let checkpoint = startTime + 9*425 + 200;
    colorTimes.push([8, checkpoint]);
    colorTimes.push([7, checkpoint + 200]);
    colorTimes.push([6, checkpoint + 400]);
    colorTimes.push([7, checkpoint + 600]);
    colorTimes.push([8, checkpoint + 800]);

    let checkpoint2 = checkpoint + 1625;
    colorTimes.push([1, checkpoint2]);
    colorTimes.push([2, checkpoint2 + 150]);
    colorTimes.push([1, checkpoint2 + 300]);
    colorTimes.push([2, checkpoint2 + 450]);

    let checkpoint3 = checkpoint2 + 975;

    for(let i = 0; i < 9; i++){
        colorTimes.push([i, checkpoint3 + i*425]);
    }

}

function melody1(startTime){
    for(let i = 0; i < 9; i++){
        colorTimes.push([i, startTime + i*425]);
    }
    
    let checkpoint = startTime + 9*425 + 200;
    colorTimes.push([8, checkpoint]);
    colorTimes.push([7, checkpoint + 200]);
    colorTimes.push([6, checkpoint + 400]);
    colorTimes.push([7, checkpoint + 600]);
    colorTimes.push([8, checkpoint + 800]);

    let checkpoint2 = checkpoint + 1625;
    colorTimes.push([1, checkpoint2]);
    colorTimes.push([2, checkpoint2 + 150]);
    colorTimes.push([1, checkpoint2 + 300]);
    colorTimes.push([2, checkpoint2 + 450]);

    let checkpoint3 = checkpoint2 + 975;

    for(let i = 0; i < 9; i++){
        colorTimes.push([i, checkpoint3 + i*425]);
    }

    let checkpoint4 = checkpoint3 + 9*425 + 200;
    colorTimes.push([8, checkpoint4]);
    colorTimes.push([7, checkpoint4 + 200]);
    colorTimes.push([6, checkpoint4 + 400]);
    colorTimes.push([7, checkpoint4 + 600]);
    colorTimes.push([8, checkpoint4 + 800]);

    
}

function dropMelody1(startTime){
    for(let i = 0; i < 7; i++){
        colorTimes.push([0, startTime + i*425]);
        colorTimes.push([1, startTime + i*425]);
        colorTimes.push([2, startTime + i*425]);
        colorTimes.push([3, startTime + i*425]);
        colorTimes.push([4, startTime + i*425]);
        colorTimes.push([5, startTime + i*425]);
        colorTimes.push([6, startTime + i*425]);
        colorTimes.push([7, startTime + i*425]);
        colorTimes.push([8, startTime + i*425]);

        colorAssignmentTimes.push([0, (8-i) % 9, startTime + i*425 - 200]);
        colorAssignmentTimes.push([1, (9-i) % 9, startTime + i*425 - 200]);
        colorAssignmentTimes.push([2, (10-i) % 9, startTime + i*425 - 200]);
        colorAssignmentTimes.push([3, (11-i) % 9, startTime + i*425 - 200]);
        colorAssignmentTimes.push([4, (12 - i) % 9, startTime + i*425 - 200]);
        colorAssignmentTimes.push([5, (13 - i) % 9, startTime + i*425 - 200]);
        colorAssignmentTimes.push([6, (14 - i) % 9, startTime + i*425 - 200]);
        colorAssignmentTimes.push([7, (15 - i) % 9, startTime + i*425 - 200]);
        colorAssignmentTimes.push([8, (16  - i) % 9, startTime + i*425 - 200]);
        
    }
}

function dropMelody2(startTime){
    for(let i = 0; i < 9; i++){
        colorTimes.push([0, startTime + i*425]);
        colorTimes.push([1, startTime + i*425]);
        colorTimes.push([2, startTime + i*425]);
        colorTimes.push([3, startTime + i*425]);
        colorTimes.push([4, startTime + i*425]);
        colorTimes.push([5, startTime + i*425]);
        colorTimes.push([6, startTime + i*425]);
        colorTimes.push([7, startTime + i*425]);
        colorTimes.push([8, startTime + i*425]);

        colorAssignmentTimes.push([0, (8-i) % 9, startTime + i*425 - 200]);
        colorAssignmentTimes.push([1, (9-i) % 9, startTime + i*425 - 200]);
        colorAssignmentTimes.push([2, (10-i) % 9, startTime + i*425 - 200]);
        colorAssignmentTimes.push([3, (11-i) % 9, startTime + i*425 - 200]);
        colorAssignmentTimes.push([4, (12 - i) % 9, startTime + i*425 - 200]);
        colorAssignmentTimes.push([5, (13 - i) % 9, startTime + i*425 - 200]);
        colorAssignmentTimes.push([6, (14 - i) % 9, startTime + i*425 - 200]);
        colorAssignmentTimes.push([7, (15 - i) % 9, startTime + i*425 - 200]);
        colorAssignmentTimes.push([8, (16  - i) % 9, startTime + i*425 - 200]);
        
    }
}


// also handles color assignment times
function checkColorTimes(time){
    // color times
    for(let i = 0; i < colorTimes.length; i++){
        if(time > colorTimes[i][1] && time < colorTimes[i][1] + 20){
            curColors[colorTimes[i][0]] = [colors[colorAssignments[colorTimes[i][0]]][0],colors[colorAssignments[colorTimes[i][0]]][1], colors[colorAssignments[colorTimes[i][0]]][2]];
        }
    }
    // color assignment times
    for( let i = 0; i < colorAssignmentTimes.length; i++){
        if(time > colorAssignmentTimes[i][2] && time < colorAssignmentTimes[i][2] + 20){
            colorAssignments[colorAssignmentTimes[i][0]] = colorAssignmentTimes[i][1];
        }
    }
}

function checkBgTimes(time){
    for(let i = 0; i < bgTimes.length; i++){
        if(time > bgTimes[i][1] && time < bgTimes[i][1] + 20){
            bgColor = bgColors[bgTimes[i][0]];
        }
    }
}

function checkBlinkTimes(time){
    for(let i = 0; i < blinkTimes.length; i++){
        if(time > blinkTimes[i] && time < blinkTimes[i] + 50){
            blinkStartTime = time;
        }
    }
}

function checkBigBlinkTimes(time){
    for(let i = 0; i < bigBlinkTimes.length; i++){
        if(time > bigBlinkTimes[i] && time < bigBlinkTimes[i] + 50){
            bigBlinkStartTime = time;
        }
    }
}

function checkMovementTimes(time){
    for(let i = 0; i < moveTimes.length; i++){
        if(time > moveTimes[i] && time < moveTimes[i] + 20){
            moveStartTime = time;
        }
    }
}

function dropBlinks(startTime){
  
    for(let i = 0; i < 9; i++){
        colorAssignmentTimes.push([i, 0, startTime + 425 - 50]);
        colorTimes.push([i, startTime +425]);
    }
    blinkTimes.push(startTime);
    
    for(let i = 0; i < 9; i++){
        colorAssignmentTimes.push([i, 6, startTime + 850 + 425 - 50]);
        colorTimes.push([i, startTime + 850 + 425]);
    }
    
    blinkTimes.push(startTime + 850);

    for(let i = 0; i < 9; i++){
        colorAssignmentTimes.push([i, 8, startTime + 1700 + 425 - 50]);
        colorTimes.push([i, startTime + 1700 + 425]);
    }

    blinkTimes.push(startTime + 1700);
}

// sets move time along with color that goes with movements
function setMoveTime(startTime){
    moveTimes.push(startTime);

    colorAssignmentTimes.push([8,8,startTime + 375]);
    colorAssignmentTimes.push([7,8,startTime + 375]);
    colorAssignmentTimes.push([6,8, startTime + 375]);

    colorAssignmentTimes.push([2,4, startTime + 375]);
    colorAssignmentTimes.push([3,4, startTime + 375]);
    colorAssignmentTimes.push([4,4, startTime + 375]);

    colorTimes.push([6,startTime + 425]);
    colorTimes.push([8,startTime + 637]);
    colorTimes.push([7,startTime + 850]);

    colorTimes.push([4,startTime + 1275]);
    colorTimes.push([2,startTime + 1487]);
    colorTimes.push([3,startTime + 1700]);

    colorTimes.push([6,startTime + 2125]);
    colorTimes.push([8,startTime + 2337]);
    colorTimes.push([7,startTime + 2550]);
}

veryFirstMelody(2000);
melody1(15250);
melody1(28500);
melody1(41750);

// exception from pattern strums
colorTimes.push([1, 54025]);
colorTimes.push([2, 54025 + 150]);
colorTimes.push([1, 54025 + 300]);
colorTimes.push([2, 54025 + 450]);

melody1(55000);

blinkTimes.push(27150);
blinkTimes.push(40400);
blinkTimes.push(47025);
blinkTimes.push(53600);
blinkTimes.push(56912.5);
blinkTimes.push(60225);
blinkTimes.push(63537.5);
dropBlinks(67750);
dropBlinks(81000);
dropBlinks(94250);



bigBlinkTimes.push(71075);

dropMelody1(71500);
dropMelody2(78125);
dropMelody1(84750);
dropMelody2(91375);

bgTimes.push([1, 71500]);

//setMoveTime(1000);
setMoveTime(74475);
setMoveTime(87725);



window.onload = function () {

    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
    let context = canvas.getContext('2d');
    let time;
    let offset;
    let started = false;
    

    let circle1x = -125;
    let circle1y = -125;
    
    let blinkMax = 850;
    let moveMax = blinkMax*3;
    let blinkTimer = blinkMax;
    let bigBlinkTimer = blinkMax;
    let moveTimer = moveMax;
    
    context.translate(250,250);
    //context.rotate(11*this.Math.PI/9);

    

    function draw(){

        time = (performance.now() - offset);
        blinkTimer = time - blinkStartTime;
        bigBlinkTimer = time - bigBlinkStartTime;
        moveTimer = time - moveStartTime;

        checkBgTimes(time);
        context.fillStyle = bgColor;
        context.fillRect(-250,-250, 500, 500);

        

        // COLOR FADE
        for(let i = 0; i < 9; i++){
            for( let j = 0; j < 3; j++){
                if(curColors[i][j] < 255)
                    curColors[i][j] = Math.min(curColors[i][j] + diffs[colorAssignments[i]][j], 255);
            }
        }

        // END COLOR FADE

        // TIMING SECTION
        

        checkColorTimes(time);
        checkBlinkTimes(time);
        checkBigBlinkTimes(time);
        checkMovementTimes(time);



        

        // END TIMING SECTION
        
        // DRAWING SECTION

        // location of eyes (for movements)
        
        if(moveTimer <= moveMax){
            if(moveTimer <=425){
                circle1x = -137.94 + 50*Math.cos(5*Math.PI/12 + Math.PI/6 * moveTimer/425);
                circle1y = -76.7 - 50*Math.sin(5*Math.PI/12 + Math.PI/6 * moveTimer/425);
            }
            else if (moveTimer <= 637){
                circle1y = -125 - 10 * (moveTimer-425)/212; 
            }
            else if (moveTimer <= 850){
                circle1y = -135 + 10*(moveTimer-637)/213;
            }
            else if(moveTimer <= 1275){
                circle1x = -125 + 100*Math.cos(7*Math.PI/12 - Math.PI/6 * (moveTimer - 850)/425);
                circle1y = -28.4 - 100*Math.sin(7*Math.PI/12 - Math.PI/6 * (moveTimer - 850)/425);
            }
            else if(moveTimer <= 1487){
                circle1y = -125 - 10 * (moveTimer-1275)/212; 
            }
            else if (moveTimer <= 1700){
                circle1y = -135 + 10*(moveTimer-1487)/213;
            }
            else if(moveTimer <= 2125){
                circle1x = -112.06 + 50*Math.cos(5*Math.PI/12 + Math.PI/6 * (moveTimer-1700)/425);
                circle1y = -76.7 - 50*Math.sin(5*Math.PI/12 + Math.PI/6 * (moveTimer-1700)/425);
            }
            else if(moveTimer <= 2337){
                circle1y = -125 - 10 * (moveTimer-2125)/212; 
            }
            else{
                circle1y = -135 + 10*(moveTimer-2337)/213;
            }
        }

        // cornea 1
        context.beginPath()
        context.arc(circle1x,circle1y,50,0, 2*Math.PI);
        context.closePath();
        context.fillStyle = "rgb(0,0,0)";
        context.fill();    

        // cornea 2
        context.beginPath();
        context.arc(circle1x + 250,circle1y,50,0, 2*Math.PI);
        context.closePath();
        context.fill();

        // drawing eyes w colors and shit
        for(let circleCount = 0; circleCount < 2; circleCount++){
            context.save();
            // Circle 1 is the one being moved in a complex way, circle 2 is just based on circle 1
            if(circleCount == 0)
                context.translate(circle1x, circle1y);
            else
                context.translate(circle1x + 250, circle1y);
            context.rotate(11*Math.PI/9);
            for(let i = 0; i < 9;i++){
                context.beginPath();
                //context.arc(0,0, 50, 0, Math.PI/1.8);
                //BLINK CODE
                if(blinkTimer <= blinkMax/2)
                    context.arc(0,0, 50, 0, Math.PI/(1.8 - .8*blinkTimer/(blinkMax/2)));
                else if(blinkTimer < blinkMax)
                    context.arc(0,0, 50, 0, Math.PI/(1 + .8*(blinkTimer-(blinkMax/2))/(blinkMax/2)));
                else
                    context.arc(0,0, 50, 0, Math.PI/1.8);
                

                context.closePath();
                context.stroke();
                context.rotate(2*Math.PI/9);
                context.fillStyle = giveColor(curColors[i]);
                
                context.fill();

            }

            context.restore();

            


        }

        // BIG BLINKS
        
        if(bigBlinkTimer < 850){
            context.save();
            context.rotate(11*Math.PI/9);
            for(let i = 0; i < 9;i++){
                context.beginPath();
                if(bigBlinkTimer <= blinkMax/2){
                    context.arc(0,0, 600, 0, Math.PI/(1.8 - .8*bigBlinkTimer/(blinkMax/2)));
                }
                else{
                    context.arc(0,0, 600, 0, Math.PI/(1 + .8*(bigBlinkTimer-(blinkMax/2))/(blinkMax/2)));
                }
                context.closePath();
                context.rotate(2*Math.PI/9);
                context.fillStyle =  giveColor(colors[i]);
                context.fill();
                
            }

            

            context.restore();
       }

        // END BIG BLINKS

        //END DRAWING SECTION

    window.requestAnimationFrame(draw);
    
    }
    

    canvas.onclick = function(event){
        
        if(!started){
            offset = performance.now();

            draw();
            audio.play();
            started = true;
        }
        
        
            
            
            

        
    }

}