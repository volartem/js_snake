
onload = function () {
    snake.createMatrix();
    snake.createSnake(5, 10, 5, "left");
    snake.randomInteger(0, 399);
    document.body.addEventListener("keydown", snake.move);
    document.getElementById("pause").addEventListener("click", snake.pause);
    console.log("Lets start!!!");
}

snake = {
    current_random: 0,
    current_move: 0,
    snake_arr: [],
    count: 0,

    pause: function () {
        if (snake.current_move != 0) {
            clearInterval(snake.current_move);
        }
    },
    randomInteger: function (min, max) {  //rekurs variant
        var stop = true;
        var matrix = document.getElementById('matrix');
        var rand = min + Math.random() * (max - min)
        rand = Math.round(rand);
        snake.current_random = rand;
        for (var i = 0; i < snake.snake_arr.length; i++) {
            var rrr = snake.getCell(snake.snake_arr[i].row, snake.snake_arr[i].col);
            if (rrr === rand) {
                stop = false;
                snake.randomInteger(min, max);
            }
        }
        if (stop) {
            return matrix.children[rand].style.backgroundColor = "#ff6a00";
        }
    },

    createMatrix: function () {
        var matrix = document.getElementById('matrix');
        var n = 400;

        for (var i = 1; i <= n; i++) {
            var div = document.createElement('div');
            div.className = 'cell';
            matrix.appendChild(div);
        }

    },

    getCell: function (row, col) {
        return (row - 1) * 20 + (col - 1);
    },

    setCell: function (row, col, val) {
        var matr = document.getElementById('matrix').children[(row - 1) * 20 + (col - 1)];
        if (val) {
            matr.style.backgroundColor = "#7d11be";
        } else {
            matr.style.backgroundColor = "transparent";
        }
    },
    createSnake: function (row, col, count, course) {
        for (var i = 0; i < count; i++) {
            if (course === "left") {
                snake.setCell(row, col + i, true);
                snake.snake_arr.push({ row: row, col: col + i });
            } else if (course === "right") {
                snake.setCell(row, col - i, true);
                snake.snake_arr.push({ row: row, col: col - i });
            } else if (course === "down") {
                snake.setCell(row + i, col, true);
                snake.snake_arr.push({ row: row + i, col: col });
            } else if (course === "up") {
                snake.setCell(row - i, col, true);
                snake.snake_arr.push({ row: row - i, col: col });
            }
        }
        document.getElementById("matrix").children[snake.getCell(snake.snake_arr[0].row, snake.snake_arr[0].col)].style.backgroundColor = "#ff6a00";
    },
    snakeTrueCell: function (row, col) {
        for (var i = 0; i < snake.snake_arr.length; i++) {
            if (snake.getCell(snake.snake_arr[i].row, snake.snake_arr[i].col) === snake.getCell(row, col)) {
                return true;
            }
        }
    },
    snakeReset: function () {
        alert(snake.count);
        clearInterval(snake.current_move);
        for (var i = snake.snake_arr.length - 1; i >= 0; i--) {
            snake.setCell(snake.snake_arr[i].row, snake.snake_arr[i].col, false);
            snake.snake_arr.pop();
        }
        document.getElementById("matrix").children[snake.current_random].style.backgroundColor = "transparent";
        snake.createSnake(10, 10, 5, "right");
        snake.randomInteger(0, 399);
        snake.count = 0;
    },

    move: function (event) {
        var LEFT_KEY = 37;
        var UP_KEY = 38;
        var RIGHT_KEY = 39;
        var DOWN_KEY = 40;
        var key = event.keyCode;
        var temp = {
            row: 0,
            col: 0
        };

        if (key < 37 || key > 40) { return; }
        clearInterval(snake.current_move);
        snake.current_move = setInterval(function () {
            var tail_row = snake.snake_arr[snake.snake_arr.length - 1].row;
            var tail_col = snake.snake_arr[snake.snake_arr.length - 1].col;
            for (var i = snake.snake_arr.length - 1; i >= 0 ; i--) {
                if (key === LEFT_KEY) {
                    if (!snake.snakeTrueCell(snake.snake_arr[0].row, snake.snake_arr[0].col - 1)) { //proverka na svoi
                        if (snake.snake_arr[0].col !== 1) {
                            if (i === 0) {
                                snake.snake_arr[i].col--;
                            } else {
                                temp.row = snake.snake_arr[i - 1].row;
                                temp.col = snake.snake_arr[i - 1].col;
                                snake.snake_arr[i].row = temp.row;
                                snake.snake_arr[i].col = temp.col;
                            }
                            if (snake.current_random === snake.getCell(snake.snake_arr[0].row, snake.snake_arr[0].col)) {
                                snake.count++;
                                snake.snake_arr.push({ row: tail_row, col: tail_col });
                                snake.randomInteger(0, 399);
                            }
                        } else {

                            snake.snakeReset();
                            return;
                        }
                    } else {
                        console.log("LEFT");
                        snake.snakeReset();
                        return;
                    }
                } else if (key === RIGHT_KEY) {
                    if (!snake.snakeTrueCell(snake.snake_arr[0].row, snake.snake_arr[0].col + 1)) {
                        if (snake.snake_arr[0].col !== 20) {
                            if (i === 0) {
                                snake.snake_arr[i].col++;
                            } else {
                                temp.row = snake.snake_arr[i - 1].row;
                                temp.col = snake.snake_arr[i - 1].col;
                                snake.snake_arr[i].row = temp.row;
                                snake.snake_arr[i].col = temp.col;
                            }
                            if (snake.current_random === snake.getCell(snake.snake_arr[0].row, snake.snake_arr[0].col)) {
                                snake.count++;
                                snake.snake_arr.push({ row: tail_row, col: tail_col });
                                snake.randomInteger(0, 399);
                            }
                        } else {
                            snake.snakeReset();
                            return;
                        }
                    } else {
                        console.log("RIGHT");
                        snake.snakeReset();
                        return;
                    }
                } else if (key === UP_KEY) {
                    if (!snake.snakeTrueCell(snake.snake_arr[0].row - 1, snake.snake_arr[0].col)) {
                        if (snake.snake_arr[0].row !== 1) {
                            if (i === 0) {
                                snake.snake_arr[i].row--;
                            } else {
                                temp.row = snake.snake_arr[i - 1].row;
                                temp.col = snake.snake_arr[i - 1].col;
                                snake.snake_arr[i].row = temp.row;
                                snake.snake_arr[i].col = temp.col;
                            }
                            if (snake.current_random === snake.getCell(snake.snake_arr[0].row, snake.snake_arr[0].col)) {
                                snake.count++;
                                snake.snake_arr.push({ row: tail_row, col: tail_col });
                                snake.randomInteger(0, 399);
                            }
                        } else {
                            snake.snakeReset();
                            return;
                        }
                    } else {
                        console.log("UP");
                        snake.snakeReset();
                        return;
                    }
                } else if (key === DOWN_KEY) {
                    if (!snake.snakeTrueCell(snake.snake_arr[0].row + 1, snake.snake_arr[0].col)) {
                        if (snake.snake_arr[0].row !== 20) {
                            if (i === 0) {
                                snake.snake_arr[i].row++;
                            } else {
                                temp.row = snake.snake_arr[i - 1].row;
                                temp.col = snake.snake_arr[i - 1].col;
                                snake.snake_arr[i].row = temp.row;
                                snake.snake_arr[i].col = temp.col;
                            }
                            if (snake.current_random === snake.getCell(snake.snake_arr[0].row, snake.snake_arr[0].col)) {
                                snake.count++;
                                snake.snake_arr.push({ row: tail_row, col: tail_col });
                                snake.randomInteger(0, 399);
                            }
                        } else {
                            snake.snakeReset();
                            return;
                        }
                    } else {
                        console.log("DOWN");
                        snake.snakeReset();
                        return;
                    }
                }
                snake.setCell(snake.snake_arr[i].row, snake.snake_arr[i].col, true);
            }
            snake.setCell(tail_row, tail_col, false);
            document.getElementById("matrix").children[snake.getCell(snake.snake_arr[0].row, snake.snake_arr[0].col)].style.backgroundColor = "#ff6a00";
            //snake.current_move = setTimeout(snake.current_move, 100);
        }, 100);
    }

}
