
/* defining variables */

let grid = document.querySelector( 'div' )
let box = document.createElement( 'div' )
box.classList.add( 'box' )
let boxes = []
let indices = []

let row = 0
let column = 0
let start = false




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
 
console.log( grid.children )

/* make start */

let snake = boxes[667]
snake.style.backgroundColor = 'black';



document.onkeydown = startMove = ( key ) => {


    if ( start === false ) {
        const replaceStart = document.createElement( 'div' )
        replaceStart.classList.add( 'box' )
        grid.appendChild( replaceStart )
        replaceStart.style.gridRow = 23
        replaceStart.style.gridColumn = 8
    }
    else { 
        console.log( 'started' ) 
    }

    start = true 

    if ( key.keyCode === 38 ) {
        clearInterval()
        let up = () => {
            row = parseInt(snake.style.gridRow)-1
            snake.style.gridRow = row
        }
        setInterval(up,100) 
    }
    else if ( key.keyCode === 39 ) {
        let right  = () => {
            column = parseInt(snake.style.gridColumn)+1
            snake.style.gridColumn = column
        }
        setInterval(right,100) 
    }
    else if ( key.keyCode === 37 ) {
        let left = () => { 
            column = parseInt(snake.style.gridColumn)-1
            snake.style.gridColumn = column
        }
        setInterval( left,100 )
    }
    else if ( key.keyCode === 40 ) {
        let down = () => { 
            row = parseInt(snake.style.gridRow)+1
            snake.style.gridRow = row
        }
        setInterval( down,100 )
    }
    else { console.log( 'User pressed non-arrow key' ) }
    
 

}



    







 