let audio = new Audio("teleportal.mp3");

window.onload = function(){
    let offset;
    let started = false;

    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
    let context = canvas.getContext('2d');
    context.translate(250,250);
    
    let max = 58000;

    let r = 0;
    let g = 0;
    let b = 0;

    let br = 255;
    let bg = 255;
    let bb = 255;

    let color = "rgb(" + r + "," + g + "," + b + ")";
    let bColor = "rgb(" + br + "," + bg + "," + bb + ")";
    //let invColor = "rgb(" + (255 - r) + "," + (255-g) + "," + (255-b) + ")";
    //let invBColor = "rgb(" + (255 - br) + "," + (255-bg) + "," + (255-bb) + ")";

    let time;

    
    let chunkOff = -1;
    let chunkRange = 10;
    let chunkTimerStart = 0;
    let chunkArray = [];
    let jerkArray = [];
    let jerkSpan = 75;
    let jerkTimerStart = -500;
    let fullRotation = Math.PI/4;
    let rotSaved = false;
    


    //insertChunkArray(2000, 0);

    insertJerkArray(62750);
    insertJerkArray(63750);

    insertJerkArray(65000);
    insertJerkArray(65625);
    
    insertChunkNoJerk(66000, 0);
    insertChunkNoJerk(66063, 10);
    insertChunkNoJerk(66125, 20);
    insertChunkNoJerk(66188, 30);
    insertChunkNoJerk(66250, 40);
    insertChunkNoJerk(66313, 50);
    insertChunkNoJerk(66375, 60);
    insertChunkNoJerk(66438, 70);
    insertChunkNoJerk(66500, 80);
    insertChunkNoJerk(66563, 90);
    
    insertChunkArray(67500, 0);

    insertChunkArray(68625, 10);
    insertChunkArray(69750, 20);
    insertChunkArray(70875, 30);

    insertChunkArray(73375, 20);
    insertChunkArray(74500, 30);

    insertChunkArray(78250, 10);
    insertChunkArray(79375, 20);
    insertChunkArray(80500, 30);

    insertChunkArray(83000, 20);
    insertChunkArray(84125, 30);

    insertChunkArray(89000, 40);
    insertChunkArray(90125, 50);

    insertChunkArray(92625, 50);
    insertChunkArray(93750, 60);

    insertChunkArray(97500, 60);
    insertChunkArray(98625, 70);
    insertChunkArray(99750, 80);

    insertChunkArray(102250, 80);
    insertChunkArray(103375, 90);
    

    function checkChunks(){
        
        for(let i = 0; i < chunkArray.length;i++){
            if(time > chunkArray[i][0] && time < chunkArray[i][0] + 50){
                chunkOff = chunkArray[i][1];
                chunkTimerStart = time;
            }
        }
        
    }

    function checkJerks(){
        for(let i = 0; i < jerkArray.length;i++){
            if(time > jerkArray[i] && time < jerkArray[i] + 50){
                
                jerkTimerStart = time;
            }
        }
    }

    function insertChunkArray(timeToStart, newChunkOff){
        chunkArray.push([timeToStart,  newChunkOff]);
        jerkArray.push(timeToStart-jerkSpan);
    }

    function insertChunkNoJerk(timeToStart, newChunkOff){
        chunkArray.push([timeToStart,  newChunkOff]);
    }

    function insertJerkArray(timeToStart){
        jerkArray.push(timeToStart-jerkSpan);
    }


    function draw4RectWithBorders(c,bc){
        context.fillStyle = bc;
        context.fillRect(-250, -250, 500, 20);
        context.fillStyle = c;
        context.fillRect(-249, -249, 499, 19);

        context.fillStyle = bc;
        context.fillRect(230, -250, 20, 500);
        context.fillStyle = c;
        context.fillRect(231, -249, 19, 499);

        context.fillStyle = bc;
        context.fillRect(-250, 230, 500, 20);
        context.fillStyle = c;
        context.fillRect(-249, 231, 499, 19);

        context.fillStyle = bc;
        context.fillRect(-250, -250, 20, 500);
        context.fillStyle = c;
        context.fillRect(-249, -249, 19, 499);
    }

    function draw(){
        let useColor;
        let useBColor;
        if(chunkOff == -1){
            useColor = color;
            useBColor = bColor;
        }
        else if(Math.trunc((time / 75)) % 2 == 1 ){
            useColor = color;
            useBColor = bColor;
        }
        else{
            useColor = bColor;
            useBColor = color;
        }
        time = (performance.now() - offset);
        checkChunks();
        checkJerks();
        let chunkTimer = time - chunkTimerStart;
        if(chunkTimer > 750)
            chunkOff = -1;


        let rotateValue;
        if(time > max)
            rotateValue = 0;
        else
            rotateValue = .7168 - .7168 * time/max;

        // reset canvas
        context.fillStyle = "rgb(255,255,255)";
        context.fillRect(-250,-250, 500, 500);

        context.save();
        let jerkTimer = time - jerkTimerStart;
        
        if(jerkTimer < jerkSpan){
            context.rotate(fullRotation + jerkTimer/jerkSpan*Math.PI/4);
            rotSaved = false;
        }
        else{
            
            if(!rotSaved){
                rotSaved = true;
                fullRotation += Math.PI/4;
            }
            context.rotate(fullRotation);
        }
        
        
        for(let i=0; i< 100; i++){
            context.save();
                context.scale(i/100, i/100);
                context.rotate(rotateValue*i);
                if(!(chunkOff != -1 && i >= chunkOff && i < chunkOff + chunkRange)){
                    draw4RectWithBorders(useColor, useBColor);
                }
            context.restore();
        }

        if(chunkOff != -1){
            context.save();
                context.rotate(2*Math.PI * (chunkTimer % 400)/400 )
                for(let i = chunkOff; i< chunkOff + chunkRange; i++){
                    context.save();
                        context.scale(i/100, i/100);
                        context.rotate(.7168*i);
                        draw4RectWithBorders(useColor, useBColor);
                    context.restore();
                }
            context.restore();
        }

        context.restore()
        window.requestAnimationFrame(draw);
    }

    canvas.onclick = function(event){
        
        if(!started){
            
            offset = performance.now() % max;

            draw();
            audio.play();
            started = true;
        }
        
        
            
            
            

        
    }

}