"use strict"
var Breakout = new Gamemode(function() {
	player = player2;
	
	ball = ball2;
	
	function reset() {
		dx = 2;
		dy = -2;
		ball.x = width/2-ball.w/2;
		ball.y = height-ball.h*2;
		player.x = width/2-player.w/2;
		wait = 0;
		lives--;
	}
	
	function draw() {
		//noStroke();
		player.draw();
		
		textFont("VT323");
		textSize(30);
		text("Score: " + playerScore, 10, 30);
		text("Lives: " + lives, width-100, 30);
		
		for (let i = 0; i < cols1; i++) {
			for (let j = 0; j < rows1; j++) {
				var b = bricks1[i][j];
				
				if (b.status === 1) {
					bricks1[i][j].draw();
					fill(255);
					stroke(0);
					/* rect(b.x, b.y+(b.h-(b.h/5)), b.w, b.h/5);
					rect(b.x, b.y, b.w, b.h/5);
					rect(b.x+(b.w-(b.w/5)), b.y, b.w/5, b.h);
					rect(b.x, b.y, b.w/5, b.h); */
					
					if (ball.hits(bricks1[i][j])) {
						if (ball.y > b.y+(b.h-(b.h/5))) {
							dy = abs(dy);
						} else if (ball.y < b.y+b.h/5) {
							dy = -abs(dy);
						}
						
						if (ball.x > b.x+(b.w-(b.w/5))) {
							dx = abs(dx);
						} else if(ball.x < b.x+b.w/5) {
							dx = -abs(dx);
						}
						
						b.status = 0;
						
						playerScore += 20;
					}
				}
			}
		}
		
		//noStroke();

		ball.draw();
		
		quitButton.draw();
		
		if (ball.x < 0) {
			dx = abs(dx);
		} else if (ball.x > width-ball.w) {
			dx = -abs(dx);
		}
		
		if (ball.y < 0) {
			dy = abs(dy);
		} else if (ball.y > height-ball.h/2) {
			reset();
		}
		
		if (playerScore/20 === cols1*rows1) {
			screen = 11;
		}
		
		if (lives < 1) {
			screen = 10;
		}
		
		if (ball.hits(player) && dy > 0) {
			dy += 1/8;
			dy = -abs(dy);
			
			if (ball.x < player.x + player.w/2) {
				dx = random(-5, -2);
			} else {
				dx = random(2, 5);
			}
		}
		
		if (wait === 50) {
			ball.x += dx;
			ball.y += dy;
			
			if (leftPressed) {
				player.x = constrain(player.x, 0, width-player.w) - pS;
			} else if (rightPressed) {
				player.x = constrain(player.x, 0, width-player.w) + pS;
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