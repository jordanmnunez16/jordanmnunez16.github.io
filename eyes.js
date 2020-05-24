let colors = [];
colors.push([255,120,255]);
colors.push([255,120,255]);
colors.push([255,120,255]);
colors.push([255,120,255]);
colors.push([255,120,255]);
colors.push([255,120,255]);
colors.push([255,120,255]);
colors.push([255,120,255]);
colors.push([255,120,255]);

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

let incSteps = 50;

let diffs = [];

for(let i = 0; i < 9; i++){
    diffs.push([(255 - colors[i][0])/incSteps, (255 - colors[i][1])/incSteps, (255 - colors[i][2])/incSteps]);
}

let audio = new Audio("Home.mp3");


function giveColor(color){
    return "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
}



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
    
    let blinkMax = 750;
    let blinkTimer = blinkMax;
    let blinkStartTime;
    
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
        
        // melody 1

        if(time > 2000 && time < 2020)
            curColors[0] = colors[0];

        if(time > 2425 && time < 2445)
            curColors[1] = colors[1];

        if(time > 2850 && time < 2870)
            curColors[2] = colors[2];

        if(time > 3275 && time < 3295)
            curColors[3] = colors[3];

        if(time > 3700 && time < 3720)
            curColors[4] = colors[4];

        if(time > 4125 && time < 4145)
            curColors[5] = colors[5];

        if(time > 4550 && time < 4570)
            curColors[6] = colors[6];

        if(time > 4975 && time < 4995)
            curColors[7] = colors[7];

        if(time > 5400 && time < 5420)
            curColors[8] = colors[8];

        // first clap
        if(time > 27100 && time < 27150)
            blinkStartTime = time;

        // second clap
        if(time > 40900 && time < 40950)
            blinkStartTime = time;


        if(time > 68000 && time < 68050)
            blinkStartTime = time;
        
        if(time > 68750 && time < 68800)
            blinkStartTime = time;
        
        if(time > 69500 && time < 69550)
            blinkStartTime = time;
        
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