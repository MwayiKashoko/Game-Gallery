"use strict";
/*********
    Screen 1: Title Screen,
    Screen 2: Pong against the wall,
    Screen 3: Pong against the computer,
    Screen 4: Pong with powerups
    Screen 5: Pong Grandmaster,
    Screen 6: Breakout,
    Screen 7: Breakout with powerups,
    Screen 8: Breakout Grandmaster,
    Screen 9: Pause screen,
    Screen 10: Game Over screen,
	Screen 11: Win Screen

    ToDo: Add button that allows the user to exit the game,
    Make at least 1 game per day so I finish it in at least 7 days or less,
    Make a pause screen,
    Add both computer and Mobile compatibility
********/

//Variables that stop me from rage quitting
var w = 420;
var h = 400;

//Important variables
var screen = 1;
var oldScreen;

var button1;
var button2;
var button3;
var button4;
var button5;
var button6;
var button7;
var quitButton;
var resetButton;

//variables for Pong and Breakout games and variations
var player1;
var player2;
var player;
var pS = 7;

var com1;
var com;
var cS = 4;

var ball1;
var ball2;
var ball;

var dx = 2;
var dy = -2;

var playerScore = 0;
var comScore = 0;

var wait = 0;
var lives = 3;
var track = 0;
var time = 0;
var bricksFinished = false;

//powerup variables
var powerups = [];
var powerupOnScreen = false;
var powerupGrabbed = false;
var interval = 1;
var maxTime = 500;
var powerupDuration = 500;
var timeUntilPowerupFinishes = 0;
var hit = false;
var type = null;
var comHit = false;
var playerHit = false;

//brick variables
var cols1 = 10;
var rows1 = 8;
var brickWidth1 = w/cols1;
var brickHeight1 = 135/rows1;
var bricks1 = [];

var cols2 = 11;
var rows2 = 9;
var brickWidth2 = w/cols2;
var brickHeight2 = 135/rows2;
var bricks2 = []; 

//variables for controls
var leftPressed = false;
var upPressed = false;
var rightPressed = false;
var downPressed = false;

function mouseClicked() {
	if (screen === 1) {
		if (button1.clicked()) {
			screen = 2;
		} else if (button2.clicked()) {
			screen = 3;
		} else if (button3.clicked()) {
			screen = 4;
		} else if (button4.clicked()) {
			screen = 5;
		} else if (button5.clicked()) {
			screen = 6;
		} else if (button6.clicked()) {
			screen = 7;
		} else if (button7.clicked()) {
			screen = 8;
		}
	}	
	
	if (quitButton.clicked() && screen > 1 && screen < 9) {
		screen = 1;
	}
	
	if (resetButton.clicked()) {
		if (screen === 10 || screen === 11) {
			screen = 1;
		}
	}
}

function keyPressed() {
	if (keyCode === 37) {
		leftPressed = true;
	} else if (keyCode === 39) {
		rightPressed = true;
	} else if (keyCode === 38) {
		upPressed = true;
	} else if (keyCode === 40) {
		downPressed = true;
	}
	
	if (keyCode === 32 && screen > 1 && screen < 9) {
		oldScreen = screen;
		screen = 9;
	} else if (keyCode === 32 && screen === 9) {
		screen = oldScreen;
	}
}

function keyReleased() {
	if (keyCode == 37) {
		leftPressed = false;
	} else if (keyCode == 39) {
		rightPressed = false;
	} else if (keyCode == 38) {
		upPressed = false;
	} else if (keyCode == 40) {
		downPressed = false;
	}
}

function setup() {
	createCanvas(420, 400);
	
	frameRate(55);
	
	button1 = new Button(width/2-125, 100, 250, 25, "Pong Against The Wall", "blue", 20);
	button2 = new Button(width/2-125, button1.y+40, 250, 25, "Pong against Computer", "blue", 20);
	button3 = new Button(width/2-110, button2.y+40, 220, 25, "Pong With Powerups", "blue", 20);
	button4 = new Button(width/2-105, button3.y+40, 210, 25, "Pong Grandmaster", "blue", 20);
	button5 = new Button(width/2-98/2, button4.y+40, 98, 25,"Breakout", "blue", 20);
	button6 = new Button(width/2-265/2, button5.y+40, 265, 25, "Breakout With Powerups", "blue", 20);
	button7 = new Button(width/2-245/2, button6.y+40, 245, 25, "Breakout Grandmaster", "blue", 20);
	quitButton = new Button(width-60, height-30, 50, 20, "Quit", "green", 20);
	resetButton = new Button(width/2-175, height-170, 350, 50, "Go Back to The Title Screen", "blue", 25);
	
	for (let i = 0; i < cols1; i++) {
		bricks1[i] = [];
		for (let j = 0; j < rows1; j++) {
			bricks1[i][j] = new Obj(i * brickWidth1, j * brickHeight1 + 40, brickWidth1, brickHeight1, color(200, 0, 0));
			bricks1[i][j].status = 1;
		}
	}
	
	for (let i = 0; i < cols2; i++) {
		bricks2[i] = [];
		for (let j = 0; j < rows2; j++) {
			bricks2[i][j] = new Obj(i * brickWidth2, j * brickHeight2 + 40, brickWidth2, brickHeight2, color(0, 200, 0));
			bricks2[i][j].status = 1;
		}
	}
	
	player1 = new Obj(width-30, height/2-37.5, 15, 75, "white");
	player2 = new Obj(width/2-37.5, height-15, 75, 15, "white");
	
	com1 = new Obj(15, height/2-37.5, 15, 75, "white");
	
	ball1 = new Obj(width/2-10, height/2-10, 20, 20, "white");
	ball2 = new Obj(width/2-10, height-40, 20, 20, color(0, 100, 255));
}

function decideScreen() {
	if (screen === 1) {
		textSize(50);
		textFont("Arial");
		fill(255);
		text("Game Gallery", width/2-150, 60);
		
		wait = 0;
		playerScore = 0;
		comScore = 0;
		
		player1 = new Obj(width-30, height/2-37.5, 15, 75, "white");
		player2 = new Obj(width/2-37.5, height-20, 75, 15, "white");
		
		com1 = new Obj(15, height/2-37.5, 15, 75, "white");

		ball1 = new Obj(width/2-10, height/2-10, 20, 20, "white");
		ball2 = new Obj(width/2-10, height-40, 20, 20,  color(0, 100, 255));
		
		dx = 2;
		dy = -2;
		
		lives = 3;
		track = 0;
		time = 0;
		bricksFinished = false;
		
		powerups = [];
		powerupOnScreen = false;
		powerupGrabbed = false;
		interval = 1;
		maxTime = 500;
		powerupDuration = 500;
		timeUntilPowerupFinishes = 0;
		hit = false;
		type = null;
		comHit = false;
		playerHit = false;
		
		cS = 4;
		pS = 7;
		
		button1.draw();
		button2.draw();
		button3.draw();
		button4.draw();
		button5.draw();
		button6.draw();
		button7.draw();
		
		for (let i = 0; i < cols1; i++) {
			for (let j = 0; j < rows1; j++) {
				bricks1[i][j].status = 1;
			}
		}
		
		for (let i = 0; i < cols2; i++) {
			for (let j = 0; j < rows2; j++) {
				bricks2[i][j].status = 1;
			}
		}
	} else if (screen === 2) {
		SelfPong.start();
	} else if (screen === 3) {
		Pong.start();
	} else if (screen === 4) {
		PongWithPowerups.start();
	} else if (screen === 5) {
		PongGrandmaster.start();
	} else if (screen === 6) {
		Breakout.start();
	} else if (screen === 7) {
		BreakoutWithPowerups.start();
	} else if (screen === 8) {
		BreakoutGrandmaster.start();
	} else if (screen === 9) {
		textSize(50);
		textFont("VT323");
		fill(255);
		text("Game Paused", width/2-100, height/2);
	} else if (screen === 10) {
		textFont("Arial");
		textSize(50);
		text("Game Over", width/2-125, height/2);
		resetButton.draw();
	} else if (screen === 11) {
		textFont("Arial");
		textSize(50);
		text("You Win!!!", width/2-120, height/2);
		resetButton.draw();
	}
}

function draw() {
	
	if(!bricksFinished) {
		background(0);
	}
	
	decideScreen();
}