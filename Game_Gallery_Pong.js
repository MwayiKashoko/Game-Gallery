"use strict";
var Pong = new Gamemode(function() {
	player = player1;
	com = com1;
	
	ball = ball1;
	
	function lines() {
		for (let i = 0; i < 16; i++) {
			fill(255);
			rect(width/2-5, 25 * i + 5, 10, 15);
		}
	}
	
	function reset() {
		wait = 0;
		ball.x = width/2-10;
		ball.y = height/2-10;
		player.y = height/2 - player.h/2;
		com.y = height/2 - com.h/2;
	}
	
	function draw() {
		noStroke();
		player.draw();
		com.draw();
		lines();
		textSize(75);
		textFont("VT323");
		text(playerScore, width-width/3.5, 100);
		text(comScore, width/5, 100);
		ball.draw();
		quitButton.draw();
		
		if (dx < 0 && ball.x < width/2-ball.w/2) {
			if (ball.y < com.y+32.5) {
				com.y = constrain(com.y, 0, height-com.h) - cS;
			} else if (ball.y > com.y+42.5) {
				com.y = constrain(com.y, 0, height-com.h) + cS;
			}
		}
		
		if (ball.x < -ball.w/2) {
			reset();
			playerScore++;
			dx = 2;
			dy = -2;
		} else if (ball.x > width-ball.w/2) {
			reset();
			comScore++;
			dx = -2;
			dy = 2;
		}
		
		if (ball.y < 0) {
			dy = abs(dy);
		} else if (ball.y > height-ball.h) {
			dy = -abs(dy);
		}
		
		if (ball.hits(player)&& dx > 0) {
			dx += 1/8;
			dx = -abs(dx);
			
			if (ball.y < player.y+37.5) {
				dy = random(-5, -2);
			} else {
				dy = random(2, 5);
			}
		} else if (ball.hits(com) && dx < 0) {
			dx -= 1/8;
			dx = abs(dx);
			
			if (ball.y < com.y+37.5) {
				dy = random(-5, -2);
			} else {
				dy = random(2, 5);
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