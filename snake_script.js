
onload = function () {
    snake.createMatrix();

    snake.createSnake(10, 10, 5, "left");
    document.body.addEventListener("keyup", snake.move);
    document.getElementById("pause").addEventListener("click", snake.pause);
    console.log("GOVNOKOD Lets start!!!");
}

snake = {
    current_cell_row: 0,
    current_cell_col: 0,
    current_random: 0,
    current_move: 0,
    snake_arr: [],
    
    pause: function () {
        if (snake.current_move != 0) {
            clearInterval(snake.current_move);
        }
    },
    randomInteger: function (min, max) {
        var rand = min + Math.random() * (max - min)
        rand = Math.round(rand);
        snake.current_random = rand;
        return rand;
    },
    createMatrix: function () {
        var matrix = document.getElementById('matrix');
        var n = 20 * 20;

        for (var i = 1; i <= n; i++) {
            var div = document.createElement('div');
            div.className = 'cell';
            //div.setAttribute("id", i);
            matrix.appendChild(div);
        }
        matrix.children[snake.randomInteger(0, 399)].style.backgroundColor = "green";
    },
    //
    // „тение €чейки матрицы.
    //
    getCell: function (row, col) {
        //var matrix = document.getElementById('matrix').children[(row - 1) * 20 + (col - 1)];
        return (row - 1) * 20 + (col - 1);
    },

    // 
    // ”становка €чейки матрицы.
    //
    setCell: function (row, col, val) {
        var matr = document.getElementById('matrix').children[(row - 1) * 20 + (col - 1)];
        // ‘ункци€ принимает координаты €чейки
        // если val == true, закрашивает €чейку,
        // иначе убирает закраску.
        if (val) {
            matr.style.backgroundColor = "red";
        } else {
            matr.style.backgroundColor = "transparent";
        }
    },
    createSnake: function (row, col, count, course) {
        for (var i = 0; i < count; i++) {
            if (course == "left" ) {
                snake.setCell(row, col + i, true);
                snake.snake_arr.push({ row: row, col: col + i });
            } else if (course == "right") {
                snake.setCell(row, col - i, true);
                snake.snake_arr.push({ row: row, col: col - i });
            } else if (course == "down") {
                snake.setCell(row + i, col, true);
                snake.snake_arr.push({ row: row + i, col: col });
            } else if (course == "up") {
                snake.setCell(row - i, col, true);
                snake.snake_arr.push({ row: row - i, col: col });
            }
        }
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
        if (snake.current_random == snake.getCell(snake.snake_arr[0].row, snake.snake_arr[0].col)) {

        }
        if (snake.current_move == 0) {
            snake.current_move = setInterval(function () {
                var tail_row = snake.snake_arr[snake.snake_arr.length - 1].row;
                var tail_col = snake.snake_arr[snake.snake_arr.length - 1].col;
                for (var i = snake.snake_arr.length - 1; i >= 0 ; i--) {
                    if (key == LEFT_KEY) {     //border
                        if (snake.snake_arr[0].col != 1) {
                            if (i == 0) {
                                snake.snake_arr[i].col--;
                            } else {
                                temp.row = snake.snake_arr[i - 1].row;
                                temp.col = snake.snake_arr[i - 1].col;
                                snake.snake_arr[i].row = temp.row;
                                snake.snake_arr[i].col = temp.col;
                                
                            }
                            if (snake.current_random == snake.getCell(snake.snake_arr[0].row, snake.snake_arr[0].col)) {
                                snake.setCell(tail_row, tail_col, true); // or delete this code
                                snake.snake_arr.push({ row: tail_row, col: tail_col });
                                document.getElementById("matrix").children[snake.randomInteger(0, 399)].style.backgroundColor = "green";
                            } else {
                                snake.setCell(tail_row, tail_col, false);
                            }
                        } else {
                            alert("END");
                            clearInterval(snake.current_move);
                            return;
                        }
                    } else if (key == RIGHT_KEY) {
                        if (snake.snake_arr[0].col != 20) {
                            if (i == 0) {
                                snake.snake_arr[i].col++;
                            } else {
                                temp.row = snake.snake_arr[i - 1].row;
                                temp.col = snake.snake_arr[i - 1].col;
                                snake.snake_arr[i].row = temp.row;
                                snake.snake_arr[i].col = temp.col;
                            }
                            if (snake.current_random == snake.getCell(snake.snake_arr[0].row, snake.snake_arr[0].col)) {
                                snake.setCell(tail_row, tail_col, true); // or delete this code
                                snake.snake_arr.push({ row: tail_row, col: tail_col });
                                document.getElementById("matrix").children[snake.randomInteger(0, 399)].style.backgroundColor = "green";
                            } else {
                                snake.setCell(tail_row, tail_col, false);
                            }
                        } else {
                            alert("END");
                            clearInterval(snake.current_move);
                            return;
                        }
                    } else if (key == UP_KEY) {
                        if (snake.snake_arr[0].row != 1) {
                            if (i == 0) {
                                snake.snake_arr[i].row--;
                            } else {
                                temp.row = snake.snake_arr[i - 1].row;
                                temp.col = snake.snake_arr[i - 1].col;
                                snake.snake_arr[i].row = temp.row;
                                snake.snake_arr[i].col = temp.col;
                            }
                            if (snake.current_random == snake.getCell(snake.snake_arr[0].row, snake.snake_arr[0].col)) {
                                snake.setCell(tail_row, tail_col, true); // or delete this code
                                snake.snake_arr.push({ row: tail_row, col: tail_col });
                                document.getElementById("matrix").children[snake.randomInteger(0, 399)].style.backgroundColor = "green";
                            } else {
                                snake.setCell(tail_row, tail_col, false);
                            }
                        } else {
                            alert("END");
                            clearInterval(snake.current_move);
                            return;
                        }
                    } else if (key == DOWN_KEY) {
                        if (snake.snake_arr[0].row != 20) {
                            if (i == 0) {
                                snake.snake_arr[i].row++;
                            } else {
                                temp.row = snake.snake_arr[i - 1].row;
                                temp.col = snake.snake_arr[i - 1].col;
                                snake.snake_arr[i].row = temp.row;
                                snake.snake_arr[i].col = temp.col;
                            }
                            if (snake.current_random == snake.getCell(snake.snake_arr[0].row, snake.snake_arr[0].col)) {
                                snake.setCell(tail_row, tail_col, true); // or delete this code
                                snake.snake_arr.push({ row: tail_row, col: tail_col });
                                document.getElementById("matrix").children[snake.randomInteger(0, 399)].style.backgroundColor = "green";
                            } else {
                                snake.setCell(tail_row, tail_col, false);
                            }
                        } else {
                            alert("END");
                            clearInterval(snake.current_move);
                            return;
                        }
                    }
                    snake.setCell(snake.snake_arr[i].row, snake.snake_arr[i].col, true);
                }
                //snake.setCell(tail_row, tail_col, false);
            }, 300);
        } else {
            clearInterval(snake.current_move);
            snake.current_move = setInterval(function () {
                var tail_row = snake.snake_arr[snake.snake_arr.length - 1].row;
                var tail_col = snake.snake_arr[snake.snake_arr.length - 1].col;
                for (var i = snake.snake_arr.length - 1; i >= 0 ; i--) {
                    if (key == LEFT_KEY) {     //border
                        if (snake.snake_arr[0].col != 1) {
                            if (i == 0) {
                                snake.snake_arr[i].col--;
                            } else {
                                temp.row = snake.snake_arr[i - 1].row;
                                temp.col = snake.snake_arr[i - 1].col;
                                snake.snake_arr[i].row = temp.row;
                                snake.snake_arr[i].col = temp.col;

                            }
                            if (snake.current_random == snake.getCell(snake.snake_arr[0].row, snake.snake_arr[0].col)) {
                                snake.setCell(tail_row, tail_col, true); // or delete this code
                                snake.snake_arr.push({ row: tail_row, col: tail_col });
                                document.getElementById("matrix").children[snake.randomInteger(0, 399)].style.backgroundColor = "green";
                            } else {
                                snake.setCell(tail_row, tail_col, false);
                            }
                        } else {
                            alert("END");
                            clearInterval(snake.current_move);
                            return;
                        }
                    } else if (key == RIGHT_KEY) {
                        if (snake.snake_arr[0].col != 20) {
                            if (i == 0) {
                                snake.snake_arr[i].col++;
                            } else {
                                temp.row = snake.snake_arr[i - 1].row;
                                temp.col = snake.snake_arr[i - 1].col;
                                snake.snake_arr[i].row = temp.row;
                                snake.snake_arr[i].col = temp.col;
                            }
                            if (snake.current_random == snake.getCell(snake.snake_arr[0].row, snake.snake_arr[0].col)) {
                                snake.setCell(tail_row, tail_col, true); // or delete this code
                                snake.snake_arr.push({ row: tail_row, col: tail_col });
                                document.getElementById("matrix").children[snake.randomInteger(0, 399)].style.backgroundColor = "green";
                            } else {
                                snake.setCell(tail_row, tail_col, false);
                            }
                        } else {
                            alert("END");
                            clearInterval(snake.current_move);
                            return;
                        }
                    } else if (key == UP_KEY) {
                        if (snake.snake_arr[0].row != 1) {
                            if (i == 0) {
                                snake.snake_arr[i].row--;
                            } else {
                                temp.row = snake.snake_arr[i - 1].row;
                                temp.col = snake.snake_arr[i - 1].col;
                                snake.snake_arr[i].row = temp.row;
                                snake.snake_arr[i].col = temp.col;
                            }
                            if (snake.current_random == snake.getCell(snake.snake_arr[0].row, snake.snake_arr[0].col)) {
                                snake.setCell(tail_row, tail_col, true); // or delete this code
                                snake.snake_arr.push({ row: tail_row, col: tail_col });
                                document.getElementById("matrix").children[snake.randomInteger(0, 399)].style.backgroundColor = "green";
                            } else {
                                snake.setCell(tail_row, tail_col, false);
                            }
                        } else {
                            alert("END");
                            clearInterval(snake.current_move);
                            return;
                        }
                    } else if (key == DOWN_KEY) {
                        if (snake.snake_arr[0].row != 20) {
                            if (i == 0) {
                                snake.snake_arr[i].row++;
                            } else {
                                temp.row = snake.snake_arr[i - 1].row;
                                temp.col = snake.snake_arr[i - 1].col;
                                snake.snake_arr[i].row = temp.row;
                                snake.snake_arr[i].col = temp.col;
                            }
                            if (snake.current_random == snake.getCell(snake.snake_arr[0].row, snake.snake_arr[0].col)) {
                                snake.setCell(tail_row, tail_col, true); // or delete this code
                                snake.snake_arr.push({ row: tail_row, col: tail_col });
                                document.getElementById("matrix").children[snake.randomInteger(0, 399)].style.backgroundColor = "green";
                            } else {
                                snake.setCell(tail_row, tail_col, false);
                            }
                        } else {
                            alert("END");
                            clearInterval(snake.current_move);
                            return;
                        }
                    }
                    snake.setCell(snake.snake_arr[i].row, snake.snake_arr[i].col, true);
                }
                //snake.setCell(tail_row, tail_col, false);
            }, 300);
        }
    }
}

