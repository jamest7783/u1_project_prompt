
/* defining variables */

let grid = document.querySelector( 'div' )
let box = document.createElement( 'div' )
box.classList.add( 'box' )
let boxes = []
let indices = []

let row = 0
let column = 0
let start = false

/* functions  */ 



/* appending tablets to game board */
for ( let i = 0; i < 30*30; i++ ) {
    let box = document.createElement( 'div' )
    box.classList.add( 'box' )
    boxes.push( box )
    grid.appendChild( boxes[i] )
}

/* placing all of those tablets in coordinate location */
let b = -1
for ( let r = 1; r < 31; r++ ) {
    for ( let c = 1; c < 31; c++ ) {
        //console.log(`ROW = ${ r }      COLUMN = ${ c }`)
        b += 1
        boxes[b].style.gridRow     =  r
        boxes[b].style.gridColumn  =  c
        indices.push([ r,c ])
    }
}
 


/* make 'power-ups' */
let food = boxes[ Math.ceil( Math.random()*900) ]
food.style.backgroundColor = 'white' 

/* make snake 'head' and place at starting tile */
let snake = boxes[667]
snake.style.backgroundColor = 'black';

/* make tail */
let tail = document.createElement( 'div' )
tail.classList.add( 'box' )
grid.appendChild( tail )
tail.style.backgroundColor = 'transparent'
tail.style.gridRow    = snake.style.gridRow
tail.style.gridColumn = snake.style.gridColumn

/* tail array */

let tailsArray = []
for ( let i = 0; i < 30*30; i++ ) {
     tailsArray.push( document.createElement( 'div' ) )
     grid.appendChild( tailsArray[i] )
     tailsArray[i].classList.add( 'box' )
     tailsArray[i].style.backgroundColor = 'transparent'
}
console.log( tailsArray )


let snakeLength = 0
let index = 0



document.onkeydown = startMove = ( key ) => {
    console.log( key.keyCode )
    if ( start === false ) {
        const replaceStart = document.createElement( 'div' )
        replaceStart.classList.add( 'box' )
        grid.appendChild( replaceStart )
        replaceStart.style.gridRow = 23
        replaceStart.style.gridColumn = 8
        start = true 
    }
    else { 
        console.log( 'started' ) 
    }

    if ( key.keyCode === 38 ) {
        try {
            clearInterval( moveDown )
        } catch ( error ) {
            console.log( error )
        }
        try {
            clearInterval( moveLeft )
            fromLeft = true
        } catch ( error ) {
            console.log( error )
        }
        try {
            clearInterval( moveRight )
        } catch ( error ) {
            console.log( error )
        }
        index = 0
        moveUp = setInterval( () => {
            index += 1
            row = parseInt( snake.style.gridRow ) - 1
            snake.style.gridRow = row
            if ( snake.style.gridRow === food.style.gridRow &&
                 snake.style.gridColumn=== food.style.gridColumn ){

                    food.style.backgroundColor = 'rgba( 255,255,255,0.4 )'
                    food = boxes[ Math.ceil( Math.random()*900) ]
                    food.style.backgroundColor = 'purple'

                    snakeLength += 1
            }
            for ( let i = 1; i <= snakeLength; i++ ) {
                tailsArray[i].style.backgroundColor    = 'pink'
                tailsArray[i].style.gridRow            = row + i 
                tailsArray[i].style.gridColumn = snake.style.gridColumn
                if ( i > 1 ) {
                    tailsArray[i].style.gridRow            = row + i - index
                }
            }




        },100)
        snake.style.backgroundColor = 'blue'

    }

    else if ( key.keyCode === 39 ) {
        try {
            clearInterval( moveUp )
        } catch ( error ) {
            console.log( error )
        }
        try {
            clearInterval( moveDown )
        } catch ( error ) {
            console.log( error )
        }
        try {
            clearInterval( moveLeft )
        } catch ( error ) {
            console.log( error )
        }
        moveRight = setInterval( () => {
            column = parseInt( snake.style.gridColumn ) + 1
            snake.style.gridColumn = column
            if ( snake.style.gridRow === food.style.gridRow &&
                 snake.style.gridColumn=== food.style.gridColumn ){
                  food.style.backgroundColor = 'rgba( 255,255,255,0.4 )'
                  food = boxes[ Math.ceil( Math.random()*900) ]
                  food.style.backgroundColor = 'purple' 

                  snakeLength += 1
            }
            for ( let i = 1; i <= snakeLength; i++ ) {
                tailsArray[i].style.backgroundColor    = 'pink'
                tailsArray[i].style.gridRow            = snake.style.gridRow
                tailsArray[i].style.gridColumn         = column - i
            }
        },100)
        snake.style.backgroundColor = 'green'
    }

    else if ( key.keyCode === 37 ) {
        try {
            clearInterval( moveUp )
        } catch ( error ) {
            console.log( error )
        }
        try {
            clearInterval( moveDown )
        } catch ( error ) {
            console.log( error )
        }
        try {
            clearInterval( moveRight )
        } catch ( error ) {
            console.log( error )
        }
        moveLeft = setInterval( () => {
            column = parseInt( snake.style.gridColumn ) - 1
            snake.style.gridColumn = column
            if ( snake.style.gridRow === food.style.gridRow &&
                 snake.style.gridColumn=== food.style.gridColumn ){
                   food.style.backgroundColor = 'rgba( 255,255,255,0.4 )'
                   food = boxes[ Math.ceil( Math.random()*900) ]
                   food.style.backgroundColor = 'purple' 

                   snakeLength += 1
            }
            for ( let i = 1; i <= snakeLength; i++ ) {
                tailsArray[i].style.backgroundColor    = 'pink'
                tailsArray[i].style.gridRow            = snake.style.gridRow
                tailsArray[i].style.gridColumn         = column + i
            }
        },100)
        snake.style.backgroundColor = 'red'
    }

    else if ( key.keyCode === 40 ) {
        try {
            clearInterval( moveUp )
        } catch ( error ) {
            console.log( error )
        }
        try {
            clearInterval( moveLeft )
        } catch ( error ) {
            console.log( error )
        }
        try {
            clearInterval( moveRight )
        } catch ( error ) {
            console.log( error )
        }
        let index = 0
        moveDown = setInterval( () => {
            index += 1
            console.log( index )
            row = parseInt( snake.style.gridRow ) + 1
            snake.style.gridRow = row
            if ( snake.style.gridRow === food.style.gridRow &&
                 snake.style.gridColumn=== food.style.gridColumn ){
                   food.style.backgroundColor = 'rgba( 255,255,255,0.4 )'
                   food = boxes[ Math.ceil( Math.random()*900) ]
                   food.style.backgroundColor = 'purple' 

                   snakeLength += 1

           }
        for ( let i = 1; i <= snakeLength; i++ ) {
            tailsArray[i].style.backgroundColor    = 'pink'
            tailsArray[i].style.gridRow            = row - i
            tailsArray[i].style.gridColumn         = snake.style.gridColumn
        }
        },100)
        snake.style.backgroundColor = 'yellow' 
    }
    else { console.log( 'User pressed non-arrow key' ) }
}




