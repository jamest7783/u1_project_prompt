
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
        } catch ( error ) {
            console.log( error )
        }
        try {
            clearInterval( moveRight )
        } catch ( error ) {
            console.log( error )
        }
        moveUp = setInterval( () => {
            row = parseInt( snake.style.gridRow ) - 1
            snake.style.gridRow = row
            if ( snake.style.gridRow === food.style.gridRow &&
                 snake.style.gridColumn=== food.style.gridColumn ){
                    food.style.backgroundColor = 'rgba( 255,255,255,0.4 )'
                    food = boxes[ Math.ceil( Math.random()*900) ]
                    food.style.backgroundColor = 'purple'
            }

        
            tailsArray[0].style.backgroundColor    = 'pink'
            tailsArray[0].style.gridRow            = row + 1
            tailsArray[0].style.gridColumn         = snake.style.gridColumn 

            tailsArray[1].style.backgroundColor = 'pink'
            tailsArray[1].style.gridRow         = row + 2
            tailsArray[1].style.gridColumn      = snake.style.gridColumn

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
            }
            tail.style.backgroundColor     = 'pink'
            tail.style.gridRow             = snake.style.gridRow  
            tail.style.gridColumn          = column - 1 
            // second tail element 
            newTail.style.backgroundColor  = 'pink'
            newTail.style.gridRow          = snake.style.gridRow
            newTail.style.gridColumn       = column - 2 
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
            }
            tailsArray[0].style.backgroundColor       = 'pink'
            tailsArray[0].style.gridRow               = snake.style.gridRow  
            tailsArray[0].style.gridColumn            = column + 1 
            // second tail element 
            newTail.style.backgroundColor    = 'pink'
            newTail.style.gridRow            = snake.style.gridRow 
            newTail.style.gridColumn         = column + 2
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
        moveDown = setInterval( () => {
            row = parseInt( snake.style.gridRow ) + 1
            snake.style.gridRow = row
            if ( snake.style.gridRow === food.style.gridRow &&
                 snake.style.gridColumn=== food.style.gridColumn ){
                   food.style.backgroundColor = 'rgba( 255,255,255,0.4 )'
                   food = boxes[ Math.ceil( Math.random()*900) ]
                   food.style.backgroundColor = 'purple' 

           }
           tail.style.backgroundColor     = 'pink'
           tail.style.gridRow             = row - 1 
           tail.style.gridColumn          = snake.style.gridColumn 
           // second tail element 
           newTail.style.backgroundColor  = 'pink'
           newTail.style.gridRow          = row - 2 
           newTail.style.gridColumn       = snake.style.gridColumn
        },100)
        snake.style.backgroundColor = 'yellow' 
    }
    else { console.log( 'User pressed non-arrow key' ) }
}




