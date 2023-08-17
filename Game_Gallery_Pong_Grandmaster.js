"use strict";
var PongGrandmaster = new Gamemode(function () {
	player = player1;
	com = com1;
	
	ball = ball1;
	
	function reset() {
		ball.x = width/2-ball.w/2;
		ball.y = height/2-ball.h/2;
		player.y = height/2-player.h/2;
		com.y = height/2-com.h/2;
		wait = 0;
	}
	
	function drawLines() {
		for (let i = 0; i < 16; i++) {
			fill(255);
			rect(width/2-5, i * 25 + 5, 10, 15);
		}
	}
	
	function draw() {
		noStroke();
		
		player.draw();
		com.draw();
		
		drawLines();
		
		textFont("VT323");
		textSize(75);
		text(comScore, width/5, 100);
		text(playerScore, width-width/3.5, 100);
		
		ball.draw();
		
		quitButton.draw();
		
		if (ball.y < 0) {
			dy = abs(dy);
		} else if (ball.y > height-ball.h) {
			dy = -abs(dy);
		}
		
		if (ball.x < -ball.w/2) {
			reset();
			playerScore++;
			dx = -2
		} else if (ball.x > width-ball.w/2) {
			reset();
			comScore++;
			dx = 2;
		}
		
		if (dx < 0 && ball.x < width/2-ball.w/2) {
			if (ball.y < com.y + 32.5) {
				com.y = constrain(com.y, 0, height-com.h) - (cS * 1.5);
			} else if (ball.y > com.y + 42.5) {
				com.y = constrain(com.y, 0, height-com.h) + (cS * 1.5);
			}
		}
		
		if (ball.hits(player) && dx > 0) {
			dx += .5;
			dx = -abs(dx);
			
			if (ball.y < player.y+37.5) {
				dy = random(-7, -4);
			} else {
				dy = random(4, 7);
			}
		} else if (ball.hits(com) && dx < 0) {
			dx -= .5;
			dx = abs(dx);
			
			if (ball.y < player.y+37.5) {
				dy = random(-7, -4);
			} else {
				dy = random(4, 7);
			}
		}
		
		if (wait === 50) {
			ball.x += dx;
			ball.y += dy;
			
			if (upPressed) {
				player.y = constrain(player.y, 0, height-player.h) - pS;
			} else if (downPressed) {
				player.y = constrain(player.y, 0, height-player.h) + pS;
			}
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