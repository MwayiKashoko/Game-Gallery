"use strict";
/*Powerups:
	1. Fast Ball
	2. Short Paddle
	3. Long Paddle
	4. Lines in the middle have collision
	5. Move left, right, up, and down
	6. Faster speed
	7. Slower speed
	8. Switches computer and player position
	9. Invert ball speed
*/

var PongWithPowerups = new Gamemode(function() {
	player = player1;
	com = com1;
	
	ball = ball1;

	function reset() {
		player.y = height/2-player.h/2;
		com.y = height/2-com.h/2;
		ball.x = width/2-10;
		ball.y = height/2-10;
		wait = 0;
	}

	function drawLines() {
		for (let i = 0; i < 16; i++) {
			fill(255);
			rect(width/2-5, 25 * i + 5, 10, 15);
		}
	}

	function draw() {
		noStroke();
		player.draw();
		com.draw();
		
		textFont("VT323");
		textSize(75);
		text(comScore, width/5, 100);
		text(playerScore, width-width/3.5, 100);
		drawLines();
		
		ball.draw();
		
		quitButton.draw();
		
		if (com.x < width/2) {
			if (dx < 0 && ball.x < width/2-ball.w/2) {
				if (ball.y < com.y+32.5) {
					com.y = constrain(com.y, 0, height-com.h) - cS;
				} else if (ball.y > com.y+42.5) {
					com.y = constrain(com.y, 0, height-com.h) + cS;
				}
			}
		} else {
			if (dx > 0 && ball.x > width/2-ball.w/2) {
				if (ball.y < com.y+32.5) {
					com.y = constrain(com.y, 0, height-com.h) - cS;
				} else if (ball.y > com.y+42.5) {
					com.y = constrain(com.y, 0, height-com.h) + cS;
				}
			}
		}

		if (interval % maxTime < 1 && !powerupOnScreen && timeUntilPowerupFinishes === 0) {
			powerups.push(new PowerUp(random(60, width - 60), random(60, height - 60), 20, 20));
			powerupOnScreen = true;
		}

		if (powerups.length > 0) {
			powerups[0].decide();
			powerups[0].draw();
			
			// When the powerup is hit it decide which type it is and gives the powerup
			if (ball.hits(powerups[0])) {
				hit = true;
				
				if (dx < 0) {
					playerHit = true;
				} else if (dx > 0) {
					comHit = true;
				}
				
				type = powerups[0].type;
				powerups.pop();
			}
		}
		
		if (hit) {
			if (timeUntilPowerupFinishes < powerupDuration) {
				timeUntilPowerupFinishes++;
			}
				
			if (playerHit) {
				switch(type) {
					case 1:
						if (timeUntilPowerupFinishes < powerupDuration && powerupOnScreen) {
							dx=8;
							powerupOnScreen = false;
						} else if (timeUntilPowerupFinishes >= powerupDuration) {
							dx=3;
						}
					break;
					
					case 2:
						if (timeUntilPowerupFinishes < powerupDuration && powerupOnScreen) {
							player.h*=2;
							cS = 4;
							powerupOnScreen = false;
						} else if (timeUntilPowerupFinishes >= powerupDuration) {
							player.h/=2;
							cS = 5;
						}
					break;
						
					case 3:
						if (timeUntilPowerupFinishes < powerupDuration && powerupOnScreen) {
							player.h*=2/3;
							cS = 6;
							powerupOnScreen = false;
						} else if (timeUntilPowerupFinishes >= powerupDuration) {
							player.h/=2/3;
							cS = 5;
						}
					break;
					
					case 4:
						if (ball.x < width/2+10) {
							dx = abs(dx);
						}
					break;
					
					case 5:
						if (leftPressed) {
							player.x = constrain(player.x, width/2, width) - 4;
						} else if (rightPressed) {
							player.x = constrain(player.x, width/2, width) + 4;
						}
					break;
					
					case 6:
						pS = 10;
					break;
					
					case 7:
						pS = 5;
					break;
					
					case 8:
						player.x = 15;
						com.x = width-30;
					break;
					
					case 9:
						if (timeUntilPowerupFinishes < powerupDuration && powerupOnScreen) {
							dx=-dx;
							powerupOnScreen = false;
						}
					break;
				}
			} else if (comHit) {
				switch(type) {
					case 1:
						if (timeUntilPowerupFinishes < powerupDuration && powerupOnScreen) {
							dx=-8;
							powerupOnScreen = false;
						} else if (timeUntilPowerupFinishes >= powerupDuration) {
							dx=-3;
						}
					break;
					
					case 2:
						if (timeUntilPowerupFinishes < powerupDuration && powerupOnScreen) {
							com.h*=2;
							powerupOnScreen = false;
						} else if (timeUntilPowerupFinishes >= powerupDuration) {
							com.h/=2;
						}
					break;
						
					case 3:
						if (timeUntilPowerupFinishes < powerupDuration && powerupOnScreen) {
							com.h*=2/3;
							powerupOnScreen = false;
						} else if (timeUntilPowerupFinishes >= powerupDuration) {
							com.h/=2/3;
						}
					break;
					
					case 4:
						if (ball.x > width/2-10) {
							dx = -abs(dx);
						}
					break;
					
					case 5:
						if (random(0, 1) <= .5) {
							com.x = constrain(com.x, -com.w, width/2) - 5;
						} else {
							com.x = constrain(com.x, -com.w, width/2) + 5;
						}
					break;
					
					case 6:
						cS = 7;
					break;
					
					case 7:
						cS = 2;
					break;
					
					case 8:
						com.x = width-30;
						player.x = 15;
					break;
					
					case 9:
						if (timeUntilPowerupFinishes < powerupDuration && powerupOnScreen) {
							dx=-dx;
							powerupOnScreen = false;
						}
					break;
				}
			}
			
			if (timeUntilPowerupFinishes >= powerupDuration) {
				interval = 1;
				timeUntilPowerupFinishes = 0;
				powerupOnScreen = false;
				hit = false;
				type = null;
				comHit = false;
				playerHit = false;
				player.x = width-30;
				com.x = 15;
				cS = 4;
				pS = 7;
			}
		}

		// Checking the collisions for the wall
		if (player.x > width/2) {
			if (ball.x < -ball.w/2) {
				reset();
				playerScore++;
				dx = -2;
				dy = 2;
			} else if (ball.x + ball.w > width+ball.w/2) {
				reset();
				comScore++;
				dx = 2;
				dy = -2;
			}
		} else {
			if (ball.x < -ball.w/2) {
				reset();
				comScore++;
				dx = 2;
				dy = -2;
			} else if (ball.x + ball.w > width+ball.w/2) {
				reset();
				playerScore++;
				dx = -2;
				dy = 2;
			}
		}

		if (ball.y < 0) {
			dy = abs(dy);
		} else if (ball.y + ball.h > height) {
			dy = -abs(dy);
		}

		// Collision for the paddles
		if (player.x > width/2) {
			if (ball.hits(player) && dx > 0) {
				dx += 1/8;
				dx = -abs(dx);

				if (ball.y < player.y + player.h/2) {
					dy = random(-5, -2);
				} else if (ball.y > player.y + player.h/2) {
					dy = random(2, 5);
				}
			} else if (ball.hits(com) && dx < 0) {
				dx -= 1/8;
				dx = abs(dx);

				if (ball.y < com.y + com.h/2) {
					dy = random(-5, -2);
				} else if (ball.y > com.y + com.h/2) {
					dy = random(2, 5);
				}
			}
		} else {
			if (ball.hits(player) && dx < 0) {
				dx -= 1/8;
				dx = abs(dx);

				if (ball.y < player.y + player.h/2) {
					dy = random(-5, -2);
				} else if (ball.y > player.y + player.h/2) {
					dy = random(2, 5);
				}
			} else if (ball.hits(com) && dx > 0) {
				dx += 1/8;
				dx = -abs(dx);

				if (ball.y < com.y + com.h/2) {
					dy = random(-5, -2);
				} else if (ball.y > com.y + com.h/2) {
					dy = random(2, 5);
				}
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

		interval++;

		if (interval > maxTime) {
			interval = 0;
		}
	}
	
	update();
});