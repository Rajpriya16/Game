
lifeline=3;
score=0;
cross=true;
isCollided = false;
console.log("sript is running");
document.onkeydown = function(e){
    console.log("key code  ",e.keyCode);
    if(e.keyCode==38){
        dino=document.querySelector('.dino')
        dino.classList.add('animateDino')
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }
    if(e.keyCode==39){
        dino=document.querySelector('.dino')
        dinoX=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left = dinoX+280+"px";
    }
    if(e.keyCode==37){
        dino=document.querySelector('.dino')
        dinoX=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left = (dinoX-280)+"px";
    }
}
setInterval(() => {
    dino=document.querySelector('.dino')
    gameOver=document.querySelector('.gameOver')
    obstacle=document.querySelector('.obstacle')
    dx=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
    dy=parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));
    ox=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
    oy=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));
    offsetX = Math.abs(dx-ox);
    offsetY = Math.abs(dy-oy);
    if (offsetX < 100 && offsetY < 50 && !isCollided) {
        isCollided = true; // Set collision flag
        if (lifeline > 0) {
            lifeline = lifeline - 1;
            const life = document.querySelector('.life');
            life.innerHTML = "Your lifeline: " + lifeline;
            if (lifeline === 0) {
                showEndScreen(score);
                obstacle.classList.remove('obstacleAnimation');
            }
        }
    } else if (offsetX >= 100 || offsetY >= 50) {
        isCollided = false; // Reset collision flag when no longer colliding
    }
    if(cross && offsetX<180 && offsetY>=50){
        score+=1;
        cross=false;
        updateScore(score);
        setTimeout(()=>{
            cross=true;
        },200);
        setTimeout(()=>{
            aniDur=parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
            newDur=aniDur-0.4;
            obstacle.style.animationDuration = newDur+'s';
        },500);
        
    }
}, 100);
    // Function to show end screen with final score and game over message
function showEndScreen(finalScore) {
    const endScreen = document.querySelector('.endScreen');
    endScreen.innerHTML = `
        <p>Game Over</p>
        <p>Your Final Score: ${finalScore}</p>
    `;
    endScreen.classList.add('show');
}

    function updateScore(score){
        const scoreCont = document.querySelector('.scoreCont');
        scoreCont.innerHTML="Your Score: " + score;
    }
