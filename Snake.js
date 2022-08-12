function init(){
    canvas = document.getElementById('mycanvas');
    W = canvas.width = 1000;
    H = canvas.height = 1000;
    pen = canvas.getContext('2d');
    cell_size = 66; // size of each individual cell of snake
    food = getRandomFood();
    game_over = false;

    score = 5;
    food_img = new Image();
    food_img.src = "Assets/apple.png";
    trophy = new Image();
    trophy.src = "Assets/trophy.png";

    snake = {
        intial_len : 5,
        color : "#7D3C98",
        cells : [],
        direction : "right",

        createSnake : function(){
            for(var i = this.intial_len; i>0; i--){
                this.cells.push({x : i, y : 0});
            }
        },

        drawSnake : function(){
            for(var i = 0; i < this.cells.length; i++){
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x * cell_size, this.cells[i].y * cell_size, cell_size - 3, cell_size - 3);
            }
        },

        updateSnake : function(){
            // if snake eats the food, then increase its length, and also produce food at new place
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if(headX == food.x && headY == food.y){
                food = getRandomFood();
                score += 5;
            }
            else{
                this.cells.pop(); 
            }
            

            var nextX;
            var nextY;

            if(this.direction == "right"){
                nextX = headX + 1;
                nextY = headY;
            }
            else if(this.direction == "left"){
                nextX = headX - 1;
                nextY = headY;
            }
            else if(this.direction == "down"){
                nextX = headX;
                nextY = headY + 1;
            }
            else{
                nextX = headX;
                nextY = headY - 1;
            }

            this.cells.unshift({x : nextX, y : nextY});

            // Logic that prevents snake from going out
            var last_x = Math.round(W / cell_size);
            var last_y = Math.round(H / cell_size);

            if(this.cells[0].y < 0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y){
                game_over = true;
            }
        }
    };

    snake.createSnake();

    function keyPressed(e){
        if(e.key == "ArrowRight"){
            snake.direction = "right";
        }
        else if(e.key == "ArrowLeft"){
            snake.direction = "left";
        }
        else if(e.key == "ArrowDown"){
            snake.direction = "down";
        }
        else{
            snake.direction = "up";
        }
    }

    // Adding an Event Listener on the Document Object
    document.addEventListener('keydown', keyPressed);

}

function draw(){
    pen.clearRect(0, 0, W, H); // Erasing the old frame
    snake.drawSnake();

    // For showing food
    pen.fillStyle = food.color; 
    pen.drawImage(food_img, food.x * cell_size, food.y * cell_size, cell_size, cell_size);

    // for showing score
    pen.drawImage(trophy, 20, 20, cell_size, cell_size);    // for showing trophy
    pen.fillStyle = "#A04000";  // and then showing score on trophy
    pen.font = "30px Roboto";
    pen.fillText(score, 50, 50);

    
}

function update(){
    snake.updateSnake();
}

function getRandomFood(){
    var foodX = Math.round(Math.random() * (W - cell_size) / cell_size);
    var foodY = Math.round(Math.random() * (H - cell_size) / cell_size);

    var food = {
        x : foodX,
        y : foodY,
        color : "red",
    }
    return food;
}

function gameLoop(){
    if(game_over == true){
        clearInterval(f);
        alert("Game Over");
        return;
    }
   draw();
   update();
}


init();
var f = setInterval(gameLoop, 100); // setInterval is a special in-uilt function in JS which will call a specified function in every
// specified time range in miliseconds, i.e. gameLoop will be called after every 100 milisecond

                          