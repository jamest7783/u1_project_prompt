
/* defining variables */

let grid = document.querySelector( 'div' )
let box = document.createElement( 'div' )
box.classList.add( 'box' )
let boxes = []
let indices = []


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
food.style.backgroundColor = 'green' 

/* make snake 'head' and place at starting tile */
let head = boxes[667]
head.style.backgroundColor = 'black';

/* make tail */
let tail = document.createElement( 'div' )
tail.classList.add( 'box' )
grid.appendChild( tail )
tail.style.backgroundColor = 'transparent'
tail.style.gridRow    = head.style.gridRow
tail.style.gridColumn = head.style.gridColumn

/* tail array */

let tailsArray = []
for ( let i = 0; i < 30*30; i++ ) {
     tailsArray.push( document.createElement( 'div' ) )
     grid.appendChild( tailsArray[i] )
     tailsArray[i].classList.add( 'box' )
     tailsArray[i].style.backgroundColor = 'transparent'
}
//console.log( tailsArray )

let elements = []
for ( let i = 0; i < 30*30; i++ ) {
     elements.push( document.createElement( 'div' ) )
     grid.appendChild( elements[i] )
     elements[i].classList.add( 'box' )
     elements[i].style.backgroundColor = 'transparent'
}

elements[0].style.gridRow    = '15'
elements[0].style.gridColumn = '7'
elements[0].style.backgroundColor = 'blue'
console.log( elements )



let snakeLength = 1
// let passes = 0
// let fromRight = false
// let fromLeft  = false
let path = [ ]

let row = 0
let column = 0

 
console.log( row, column )


document.onkeydown = startMove = ( key ) => {
    
    if ( key.keyCode === 38 ) {

        //otherMovements.forEach( item => clearInterval( item ) )
        try { clearInterval( moveDown ) } 
        catch ( error ) { }
        try { clearInterval( moveLeft ) } 
        catch ( error ) { }
        try { clearInterval( moveRight ) } 
        catch ( error ) { }

        moveUp  = setInterval( () => {
            row     = parseInt( elements[0].style.gridRow ) - 1
            column  = parseInt( elements[0].style.gridColumn )
            path.unshift([ row , column ])

            for( let i = 0; i < snakeLength; i++ ) {
                elements[i].style.backgroundColor = 'red'
                elements[i].style.gridRow         = path[i][0]
                elements[i].style.gridColumn      = path[i][1]
            }

            if( elements[0].style.gridRow === food.style.gridRow &&
                elements[0].style.gridColumn=== food.style.gridColumn ){

                food.style.backgroundColor = 'rgba( 255,255,255,0.4 )'
                food = boxes[ Math.ceil( Math.random()*900) ]
                food.style.backgroundColor = 'purple'
                snakeLength += 1
            }
    },100)}
    if ( key.keyCode === 40 ) {

        try { clearInterval( moveUp ) } 
        catch ( error ) { }
        try { clearInterval( moveLeft ) } 
        catch ( error ) { }
        try { clearInterval( moveRight ) } 
        catch ( error ) { }

        moveDown  = setInterval( () => {
            row     = parseInt( elements[0].style.gridRow ) + 1
            column  = parseInt( elements[0].style.gridColumn )
            path.unshift([ row , column ])

            for( let i = 0; i < snakeLength; i++ ) {
                elements[i].style.backgroundColor = 'red'
                elements[i].style.gridRow         = path[i][0]
                elements[i].style.gridColumn      = path[i][1]
            }

            if( elements[0].style.gridRow === food.style.gridRow &&
                elements[0].style.gridColumn=== food.style.gridColumn ){

                food.style.backgroundColor = 'rgba( 255,255,255,0.4 )'
                food = boxes[ Math.ceil( Math.random()*900) ]
                food.style.backgroundColor = 'purple'
                snakeLength += 1
            }
    },100)}
    if ( key.keyCode === 37 ) {

        try { clearInterval( moveUp ) } 
        catch ( error ) { }
        try { clearInterval( moveDown ) } 
        catch ( error ) { }
        try { clearInterval( moveRight ) } 
        catch ( error ) { }


        moveLeft  = setInterval( () => {
            row     = parseInt( elements[0].style.gridRow    )  
            column  = parseInt( elements[0].style.gridColumn ) - 1
            path.unshift([ row , column ])

            for( let i = 0; i < snakeLength; i++ ) {
                elements[i].style.backgroundColor = 'red'
                elements[i].style.gridRow         = path[i][0]
                elements[i].style.gridColumn      = path[i][1]
            }

            if( elements[0].style.gridRow === food.style.gridRow &&
                elements[0].style.gridColumn=== food.style.gridColumn ){

                food.style.backgroundColor = 'rgba( 255,255,255,0.4 )'
                food = boxes[ Math.ceil( Math.random()*900) ]
                food.style.backgroundColor = 'purple'
                snakeLength += 1
            }
    },100)}
    if ( key.keyCode === 39 ) {

        try { clearInterval( moveUp ) } 
        catch ( error ) { }
        try { clearInterval( moveDown ) } 
        catch ( error ) { }
        try { clearInterval( moveLeft ) } 
        catch ( error ) { }

        moveRight  = setInterval( () => {
            row     = parseInt( elements[0].style.gridRow    )
            column  = parseInt( elements[0].style.gridColumn ) + 1
            path.unshift([ row , column ])

            for( let i = 0; i < snakeLength; i++ ) {
                elements[i].style.backgroundColor = 'red'
                elements[i].style.gridRow         = path[i][0]
                elements[i].style.gridColumn      = path[i][1]
            }

            if( elements[0].style.gridRow    === food.style.gridRow &&
                elements[0].style.gridColumn === food.style.gridColumn ){

                food.style.backgroundColor = 'rgba( 255,255,255,0.4 )'
                food = boxes[ Math.ceil( Math.random()*900) ]
                food.style.backgroundColor = 'purple'
                snakeLength += 1
            }
    },100)}
}
    
















/*

document.onkeydown = startMove = ( key ) => {
    //console.log( key.keyCode )
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
        }
        try {
            clearInterval( moveLeft )
        } catch ( error ) {
        }
        try {
            clearInterval( moveRight )
        } catch ( error ) {
        }
        // if ( tailsArray[1].style.gridColumn < snake.style.gridColumn ) {
        //     ///console.log( 'recently moving right -> ' )
        //     ///fromRight = true
        //     fromLeft = false
        // }
        // else if ( tailsArray[1].style.gridColumn > snake.style.gridColumn ) {
        //     console.log( 'recently moving left <- ' )
        //     fromLeft = true
        //     fromRight = false
        // }
        // else { 
        //     fromRight = false
        //     fromLeft  = false
        // }








        moveUp = setInterval( () => {
            row                       = parseInt( elements[0].gridRow ) - 1
            column                    = parseInt( elements[0].gridRow )
            path.unshift( [ row , column ] )

            for ( let i = 0; i < snakeLength; i++ ) {

                elements[i].style.backgroundColor = 'red'
                elements[i].style.gridRow         = path[i][0]
                elements[i].style.gridColumn      = path[i][1]
            }
            if ( head.style.gridRow === food.style.gridRow &&
                head.style.gridColumn=== food.style.gridColumn ){

                   food.style.backgroundColor = 'rgba( 255,255,255,0.4 )'
                   food = boxes[ Math.ceil( Math.random()*900) ]
                   food.style.backgroundColor = 'purple'

                   snakeLength += 1
           }
        },100)
        









        //passes = 0
        //moveUp = setInterval( () => {
            
            //passes += 1
            //row = parseInt( snake.style.gridRow ) - 1
            //snake.style.gridRow = row

            // decreasing rows forces movement upwards
            //row                       = parseInt( elements[0].gridRow ) - 1
            //column                    = parseInt( elements[0].gridRow )
            //path.unshift( [ row , column ] )

            //for ( let i = 0; i < snakeLength; i++ ) {

                //elements[i].style.gridRow    = path[i][0]
                //elements[i].style.gridColumn = path[i][1]
           // }


            // eating power-ups
            //if ( head.style.gridRow === food.style.gridRow &&
                // head.style.gridColumn=== food.style.gridColumn ){

                   // food.style.backgroundColor = 'rgba( 255,255,255,0.4 )'
                   // food = boxes[ Math.ceil( Math.random()*900) ]
                  //  food.style.backgroundColor = 'purple'

                   // snakeLength += 1
          //  }






            /* this only achieves a right angle when traveling from right to up *//*
            if ( fromRight ) {
                for ( t = 1; t <= snakeLength; t++  ) {

                    tailsArray[t].style.backgroundColor    = 'pink'
                    
                    if ( t > passes ) {
                        tailsArray[t].style.gridRow = row + passes
                    }
                    else{
                        tailsArray[t].style.gridRow = row + t
                    }

                    if ( tailsArray[t].style.gridColumn !=  head.style.gridColumn ) {
                        tailsArray[t].style.gridColumn = column + ( passes - t )
                    }
                    else {
                        console.log( "caught up" )
                    }

                }
            }
            if ( fromLeft ) {
                for ( t = 1; t <= snakeLength; t++  ) {

                    tailsArray[t].style.backgroundColor    = 'pink'
                    
                    if ( t > passes ) {
                        tailsArray[t].style.gridRow = row + passes
                    }
                    else{
                        tailsArray[t].style.gridRow = row + t
                    }

                    if ( tailsArray[t].style.gridColumn !=  head.style.gridColumn ) {
                        tailsArray[t].style.gridColumn = column - ( passes - t )
                    }
                    else {
                        console.log( "caught up" )
                    }

                }
            }

        },100)
        head.style.backgroundColor = 'blue'

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
            column = parseInt( head.style.gridColumn ) + 1
            head.style.gridColumn = column
            if ( head.style.gridRow === food.style.gridRow &&
                 head.style.gridColumn=== food.style.gridColumn ){
                  food.style.backgroundColor = 'rgba( 255,255,255,0.4 )'
                  food = boxes[ Math.ceil( Math.random()*900) ]
                  food.style.backgroundColor = 'purple' 

                  snakeLength += 1
            }

            for ( let i = 1; i <= snakeLength; i++ ) {
                tailsArray[i].style.backgroundColor    = 'pink'
                tailsArray[i].style.gridRow            = head.style.gridRow
                tailsArray[i].style.gridColumn         = column - i
            }


       
       // },100)
       // head.style.backgroundColor = 'green'
       // }

        if ( key.keyCode === 37 ) {
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
            head.style.gridColumn = column
            if ( head.style.gridRow === food.style.gridRow &&
                 head.style.gridColumn=== food.style.gridColumn ){
                   food.style.backgroundColor = 'rgba( 255,255,255,0.4 )'
                   food = boxes[ Math.ceil( Math.random()*900) ]
                   food.style.backgroundColor = 'purple' 

                   snakeLength += 1
            }
            for ( let i = 1; i <= snakeLength; i++ ) {
                tailsArray[i].style.backgroundColor    = 'pink'
                tailsArray[i].style.gridRow            = head.style.gridRow
                tailsArray[i].style.gridColumn         = column + i
            }
        },100)
        head.style.backgroundColor = 'red'
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
            row = parseInt( head.style.gridRow ) + 1
            head.style.gridRow = row
            if ( head.style.gridRow === food.style.gridRow &&
                 head.style.gridColumn=== food.style.gridColumn ){
                   food.style.backgroundColor = 'rgba( 255,255,255,0.4 )'
                   food = boxes[ Math.ceil( Math.random()*900) ]
                   food.style.backgroundColor = 'purple' 

                   snakeLength += 1

           }
        for ( let i = 1; i <= snakeLength; i++ ) {
            tailsArray[i].style.backgroundColor    = 'pink'
            tailsArray[i].style.gridRow            = row - i
            tailsArray[i].style.gridColumn         = head.style.gridColumn
        }
        },100)
        head.style.backgroundColor = 'yellow' 
    }
    else { console.log( 'User pressed non-arrow key' ) }
}


}

*/ 