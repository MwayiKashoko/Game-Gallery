"use strict";
function Button(x, y, w, h, text, fill, size) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
	this.fill = fill;
	this.size = size;
}

Button.prototype.draw = function() {
    fill(this.fill);
    rect(this.x, this.y, this.w, this.h);
    fill(255);
    textSize(this.size);
	
	if (this.text !== "Go Back to The Title Screen") {
		text(this.text, this.x+this.w/10, this.y+this.h/1.25);
	} else {
		text(this.text, this.x+this.w/14, this.y+this.h/1.5);
	}
};

Button.prototype.clicked = function() {
	if (mouseX > this.x && mouseX < this.x+this.w && mouseY > this.y && mouseY < this.y+this.h) {
		return true;
	} else {
		return false;
	}
};

function Gamemode(game) {
    this.game = game;
}

Gamemode.prototype.start = function() {
    this.game();
};

function Obj(x, y, w, h, fill) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.fill = fill;
}

Obj.prototype.draw = function() {
    fill(this.fill);
    rect(this.x, this.y, this.w, this.h);
};

Obj.prototype.hits = function(obj) {
    if (this.x+this.w > obj.x && this.x < obj.x+obj.w && this.y+this.h > obj.y && this.y < obj.y+obj.h) {
        return true;
    } else {
        return false;
    }
};

function PowerUp(x, y) {
	this.x = x;
	this.y = y;
	this.w = 30;
	this.h = 30;
	this.fill;
	this.type = round(random(1, 9));
}

PowerUp.prototype.decide = function() {
    switch (this.type) {
		case 1:
			this.fill = "red";
		break;

		case 2:
			this.fill = "green";
		break;

		case 3:
			this.fill = "blue";
		break;
			
		case 4:
			this.fill = "orange";
		break;
			
		case 5:
			this.fill = "purple";
		break;
			
		case 6:
			this.fill = "pink";
		break;
		
		case 7:
			this.fill = "yellow";
		break;
		
		case 8:
			this.fill = "brown";
		break;
		
		case 9:
			this.fill = "white";
		break;
    }
};

PowerUp.prototype.draw = function() {
	fill(this.fill);
	rect(this.x, this.y, this.w, this.h);
};

function PowerUp2(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.type = round(random(1, 6));
	this.fill;
	
	switch(this.type) {
		case 1:
			this.fill = "red";
		break;
		
		case 2:
			this.fill = "yellow";
		break;
		
		case 3:
			this.fill = "purple";
		break;
		
		case 4:
			this.fill = "green";
		break;
		
		case 5:
			this.fill = "orange";
		break;
		
		case 6:
			this.fill = "blue";
		break;
	}
}

PowerUp2.prototype.draw = function() {
	fill(this.fill);
	rect(this.x, this.y, this.w, this.h);
};