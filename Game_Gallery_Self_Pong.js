"use strict";
var SelfPong = new Gamemode(function () {
    player = player1;
	ball = ball1;
	
	function lines() {
		for (let i = 0; i < 16; i++) {
			fill(255);
			rect(width/2-5, 25 * i + 5, 10, 15);
		}
	}
	
	function reset() {
		wait = 0;
		dx = 2;
		dy = -2;
		ball.x = width/2-10;
		ball.y = height/2-10;
		player.y = height/2 - player.h/2;
	}
    
    function draw() {
		noStroke();
        player.draw();
		lines();
		textSize(75);
		fill(255);
		textFont("VT323");
		text(playerScore, width/5, 100);
		ball.draw();
		quitButton.draw();
		
		if (ball.x < 0) {
			dx = abs(dx);
			playerScore++;
		} else if (ball.x > width-ball.w) {
			reset();
			playerScore = 0;
		}
		
		if (ball.y < 0) {
			dy = abs(dy);
		} else if (ball.y > height-ball.h) {
			dy = -abs(dy);
		}
		
		if (ball.hits(player) && dx > 0) {
			dx += 1/8;
			dx = -abs(dx);
			
			if (ball.y < player.y+37.5) {
				dy = random(-5, -2);
			} else {
				dy = random(2, 5);
			}
		}
		
		if (wait === 50) {
			if (upPressed) {
				player.y = constrain(player.y, 0, height-player.h) - pS;
			} else if (downPressed) {
				player.y = constrain(player.y, 0, height-player.h) + pS;
			}
			
			ball.x+=dx;
			ball.y+=dy;
		}
    }
    
    function update() {
        draw();
		
		if (wait < 50) {
			wait++;
		}
    }
	
	update();
});