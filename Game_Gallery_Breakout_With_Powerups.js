"use strict";
/*
	Powerups:
	
	1. Shorter Paddle,
	2. Longer Paddle,
	3. Fast Ball,
	4. Faster Paddle,
	5. Slower Paddle,
	6. Bonus Points
*/

var BreakoutWithPowerups = new Gamemode(function() {
	player = player2;
	
	ball = ball2;

	stroke(0);
	
	function reset() {
		player.x = width/2-player.w/2;
		ball.x = width/2-ball.w/2;
		ball.y = height-40;
		wait = 0;
		dx = 2;
		dy = -2;
		lives--;
	}
	
	function draw() {
		player.draw();
		
		textSize(30);
		textFont("VT323");
		
		text("Score: " + playerScore, 10, 30);
		text("Lives: " + lives, width-100, 30);
		
		for (let i = 0; i < cols1; i++) {
			for (let j = 0; j < rows1; j++) {
				var b = bricks1[i][j];
				
				if (bricks1[i][j].status === 1) {
					bricks1[i][j].draw();
					
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
						
						if (random(0, 10) <= 1) {
							powerups.push(new PowerUp2(bricks1[i][j].x + bricks1[i][j].w/4, bricks1[i][j].y, 20, 20));
						}
						
						b.status = 0;
						playerScore += 20;
						track++;
					}
				}
			}
		}
		
		for (let i = 0; i < powerups.length; i++) {
			powerups[i].draw();
			powerups[i].y += 3;
			
			if (player.hits(powerups[i])) {
				powerupGrabbed = true;
				type = powerups[i].type;
				if (powerups[i].type === 3) {
					dy = -7;
				} else if (powerups[i].type === 6) {
					playerScore += 50;
				}
				
				powerups.splice(i, 1);
			} else if (powerups[i].y > height) {
				powerups.splice(i, 1);
			}
		}
		
		if (powerupGrabbed === true && timeUntilPowerupFinishes < maxTime) {
			timeUntilPowerupFinishes++;
			
			switch(type) {
				case 1:
					if (player.w === 112.5) {
						player.w = 75;
					} else if (player.w === 75) {
						player.w = 50;
					} else if (player.w === 50) {
						player.w = 50;
					}
				break;
				
				case 2:
					if (player.w === 112.5) {
						player.w = 112.5;
					} else if (player.w === 75) {
						player.w = 112.5;
					} else if (player.w === 50) {
						player.w = 75;
					}
				break;
				
				case 4:
					if (pS === 10.5) {
						pS = 10.5;
					} else if (pS === 7) {
						pS = 10.5;
					} else if (pS === 4 + (2/3)) {
						pS = 7;
					}
				break;
				
				case 5:
					if (pS === 10.5) {
						pS = 7;
					} else if (pS === 7) {
						pS = 4 + (2/3);
					} else if (pS === 4 + (2/3)) {
						pS = 4 + (2/3);
					}
				break;
			}
		} else {
			powerupGrabbed = false;
			timeUntilPowerupFinishes = 0;
			player.w = 75;
			pS = 7;
		}
		
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
		
		if (lives < 1) {
			screen = 10;
		}
		
		if (track === cols1*rows1) {
			screen = 11;
		}
		
		if (ball.hits(player) && dy > 0) {
			dy += 1/8;
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
				player.x = constrain(player.x, 0, width-player.w)- pS;
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