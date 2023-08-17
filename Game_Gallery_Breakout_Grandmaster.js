"use strict";
var BreakoutGrandmaster = new Gamemode(function() {
	player = player2;
	
	ball = ball2;

	stroke(0);
	
	function draw() {
		player.draw();
		
		for (let i = 0; i < cols2; i++) {
			for (let j = 0; j < rows2; j++) {
				var b = bricks2[i][j];
				
				if (b.status === 1) {
					bricks2[i][j].draw();
					
					if (ball.hits(bricks2[i][j])) {
						if (ball.x > b.x+(b.w-(b.w/5))) {
							dx = abs(dx);
						} else if (ball.x < b.x+(b.w/5)) {
							dx = -abs(dx);
						}
						
						if (ball.y > b.y+(b.h-(b.h/5))) {
							dy = abs(dy);
						} else if (ball.y < b.y+(b.h/5)) {
							dy = -abs(dy);
						}
						
						b.status = 0;
						playerScore += 20;
					}
				}
			}
		}
		
		if (playerScore/20 === cols2*rows2) {
			bricksFinished = true;
			time++;
		}
		
		if (time >= 750) {
			screen = 11;
		}
		
		fill(255);
		textFont("VT323");
		textSize(30);
		text("Score: " + playerScore, 10, 30);
		text("Lives: 1", width-100, 30);
		
		ball.draw();
		
		quitButton.draw();
		
		if (ball.x < 0) {
			dx = abs(dx)
		} else if (ball.x > width-ball.w) {
			dx = -abs(dx);
		}
		
		if (ball.y < 0) {
			dy = abs(dy);
		} else if (ball.y > height-ball.h/2) {
			screen = 10;
			bricksFinished = false;
		}
		
		if (ball.hits(player) && dy > 0) {
			dy += 1/4;
			dy = -abs(dy);
			
			if (ball.x < player.x+player.w/2) {
				dx = random(-5, -2);
			} else {
				dx = random(2, 5);
			}
		}
		
		if (wait === 50) {
			ball.x += dx;
			ball.y += dy;
			
			if (leftPressed) {
				player.x = constrain(player.x, 0, width-player.w) - 7;
			} else if (rightPressed) {
				player.x = constrain(player.x, 0, width-player.w) + 7;
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