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


// [number, time]
let colorTimes = [];

let blinkTimes = [];
let blinkStartTime;

let incSteps = 50;

let diffs = [];

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

function checkColorTimes(time){
    for(let i = 0; i < colorTimes.length; i++){
        if(time > colorTimes[i][1] && time < colorTimes[i][1] + 20){
            curColors[colorTimes[i][0]] = [colors[colorTimes[i][0]][0],colors[colorTimes[i][0]][1], colors[colorTimes[i][0]][2]];
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

function dropBlinks(startTime){
    blinkTimes.push(startTime);
    blinkTimes.push(startTime + 850);
    blinkTimes.push(startTime + 1700);
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

window.onload = function () {

    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
    let context = canvas.getContext('2d');
    let target = 10;
    let time;
    let offset;
    let started = false;
    let bgColor = "rgb(255,255,255)";

    let circle1x = -125;
    let circle1y = -125;
    let circle2x = 125;
    let circle2y = -125;
    
    let blinkMax = 850;
    let blinkTimer = blinkMax;
    
    context.translate(250,250);
    //context.rotate(11*this.Math.PI/9);

    

    function draw(){

        time = (performance.now() - offset);
        blinkTimer = time - blinkStartTime;

        context.fillStyle = bgColor;
        context.fillRect(-250,-250, 500, 500);


        context.arc(circle1x,circle1y,50,0, 2*Math.PI);
        context.fillStyle = "rgb(0,0,0)";
        context.fill();    

        context.arc(circle2x,circle2y,50,0, 2*Math.PI);
        context.fill();

        // COLOR FADE
        for(let i = 0; i < 9; i++){
            for( let j = 0; j < 3; j++){
                if(curColors[i][j] < 255)
                    curColors[i][j] = Math.min(curColors[i][j] + diffs[i][j], 255);
            }
        }

        // END COLOR FADE

        // TIMING SECTION
        

        checkColorTimes(time);
        checkBlinkTimes(time);



        /*
        

       
        
        if(time > 81250 && time < 81300)
            blinkStartTime = time;
        
        if(time > 82000 && time < 82050)
            blinkStartTime = time;
        
        if(time > 82750 && time < 82800)
            blinkStartTime = time;

        if(time > 94500 && time < 94550)
            blinkStartTime = time;
        
        if(time > 95250 && time < 95300)
            blinkStartTime = time;
        
        if(time > 96000 && time < 96050)
            blinkStartTime = time;

        */

        // END TIMING SECTION
        
        // DRAWING SECTION
        for(let circleCount = 0; circleCount < 2; circleCount++){
            context.save();
            if(circleCount == 0)
                context.translate(circle1x, circle1y);
            else
                context.translate(circle2x, circle2y);
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
                /*
                if(i == target)
                    context.fillStyle = giveColor(colors[i]);
                else
                    context.fillStyle = "rgb(255,255,255)";
                    */
                context.fill();

            }

            context.restore();
    }
        
        //context.stroke();

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