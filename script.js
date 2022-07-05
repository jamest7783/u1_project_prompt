 

let grid        = document.querySelector( 'div'  )
let box         = document.createElement( 'div'  )
let onOff       = document.querySelector( 'button' )
let boxes       = []
let indices     = []
let path        = []
let elements    = []
let snakeLength = 1
let level       = 1
let row         = 0
let column      = 0
let boxNum      = -1
let gameOn      = false




onOff.innerText = 'START GAME'
onOff.addEventListener( 'click', () => {

    onOff.innerText = `Level ${level}`
    gameOn = true

})



/* appending tablets to game board */
box.classList.add( 'box' )
for ( let i = 0; i < 30*30; i++ ) {
    let box = document.createElement( 'div' )
    box.classList.add( 'box' )
    boxes.push( box )
    grid.appendChild( boxes[i] )
}

/* placing all of those tablets in coordinate location */
for ( let r = 1; r < 31; r++ ) {
    for ( let c = 1; c < 31; c++ ) {
        boxNum += 1
        boxes[boxNum].style.gridRow     =  r
        boxes[boxNum].style.gridColumn  =  c
        indices.push([ r,c ])
    }
}
 
/* make power-ups */
let powerUp = boxes[ Math.ceil( Math.random()*900) ]
powerUp.style.backgroundColor = 'green' 


/* potential elements of snake body, stored as transparent */
for ( let i = 0; i < 30*30; i++ ) {
     elements.push( document.createElement( 'div' ) )
     grid.appendChild( elements[i] )
     elements[i].classList.add( 'box' )
     elements[i].style.backgroundColor = 'transparent'
}

/* first element in elements is pre-initialized */
elements[0].style.gridRow    = '15'
elements[0].style.gridColumn = '7'
elements[0].style.backgroundColor = 'blue'
console.log( elements )




 
document.onkeydown = startMove = ( key ) => {
    if ( gameOn === true ) {
        if ( key.keyCode === 38 ) {

            //otherMovements.forEach( item => clearInterval( item ) )
            try { clearInterval( moveDown ) } 
            catch ( error ) { }
            try { clearInterval( moveLeft ) } 
            catch ( error ) { }
            try { clearInterval( moveRight ) } 
            catch ( error ) { }

            moveUp = setInterval( () => {
                
                row     = parseInt( elements[0].style.gridRow ) - 1
                column  = parseInt( elements[0].style.gridColumn )
                
                path.unshift([ row , column ])

                if( elements[0].style.gridRow    === powerUp.style.gridRow &&
                    elements[0].style.gridColumn === powerUp.style.gridColumn ){

                    powerUp.style.backgroundColor = 'transparent'
                    powerUp                       = boxes[ Math.ceil( Math.random()*900) ]
                    powerUp.style.backgroundColor = 'yellow'
                    snakeLength += 1
                }

                for ( let i = 0; i < snakeLength; i++ ) {

                    if ( elements[i].style.gridRow === '1' ) {
                        elements[i].style.gridColumn = path[i][1] + 1 }
                    else {
                        elements[i].style.gridColumn = path[i][1] }
                        
                    elements[i].style.backgroundColor = 'red'
                    elements[i].style.gridRow         = path[i][0]     
                }













                // for ( let i = 0; i < snakeLength; i++ ) {
                //     if ( column === 1 ) {
                //         elements[i].style.gridRow    = path[i][0] + 2 
                //         elements[i].style.gridColumn = path[i][1] 
                // }
                //     else if( elements[i].style.gridRow === '1' && 
                //         (elements[i].style.gridColumn != '1' || elements[i].style.gridColumn != '30')){ 
                //         elements[i].style.gridColumn = path[i][1] - 1
                //         elements[i].style.backgroundColor = 'pink'
                //     }
                //     else { 
                //         elements[i].style.gridRow         = path[i][0]  
                //         elements[i].style.gridColumn      = path[i][1]  
                //     }  
                // }
                // for ( let i = 1; i < snakeLength; i++ ) {
                //     if( elements[i].style.gridRow    === elements[0].style.gridRow &&
                //         elements[i].style.gridColumn === elements[0].style.gridColumn )  
                //         elements[i].style.backgroundColor = 'yellow'
                //         clearInterval( moveUp )
                // }
                
        },100)}
        if ( key.keyCode === 40  ) {

            try { clearInterval( moveUp ) } 
            catch ( error ) { }
            try { clearInterval( moveLeft ) } 
            catch ( error ) { }
            try { clearInterval( moveRight ) } 
            catch ( error ) { }

            moveDown = setInterval( () => {
                if ( row != 30 ) {  
                    row = parseInt( elements[0].style.gridRow ) + 1 }
                else { row = parseInt( elements[0].style.gridRow )     }

                column  = parseInt( elements[0].style.gridColumn )
                path.unshift([ row , column ])

                if( elements[0].style.gridRow    === powerUp.style.gridRow &&
                    elements[0].style.gridColumn === powerUp.style.gridColumn ){

                    powerUp.style.backgroundColor = 'transparent'
                    powerUp                       = boxes[ Math.ceil( Math.random()*900) ]
                    powerUp.style.backgroundColor = 'yellow'
                    snakeLength += 1
                }

                for ( let i = 0; i < snakeLength; i++ ) {

                    if ( elements[i].style.gridRow === '30' ) {
                        elements[i].style.gridColumn = path[i][1] + 1 }
                    else {
                        elements[i].style.gridColumn      = path[i][1] }
                        
                    elements[i].style.backgroundColor = 'red'
                    elements[i].style.gridRow         = path[i][0]     
                }


        },100)}
        if ( key.keyCode === 37 ) {

            try { clearInterval( moveUp ) } 
            catch ( error ) { }
            try { clearInterval( moveDown ) } 
            catch ( error ) { }
            try { clearInterval( moveRight ) } 
            catch ( error ) { }


            moveLeft = setInterval( () => {
                row     = parseInt( elements[0].style.gridRow    )  
                column  = parseInt( elements[0].style.gridColumn ) - 1
                path.unshift([ row , column ])

                if( elements[0].style.gridRow    === powerUp.style.gridRow &&
                    elements[0].style.gridColumn === powerUp.style.gridColumn ){

                    powerUp.style.backgroundColor = 'transparent'
                    powerUp                       = boxes[ Math.ceil( Math.random()*900) ]
                    powerUp.style.backgroundColor = 'yellow'
                    snakeLength += 1
                }


                for ( let i = 0; i < snakeLength; i++ ) {

                    if ( elements[i].style.gridColumn === '1' ) {
                        elements[i].style.gridRow = path[i][0] + 1 }
                    else {
                        elements[i].style.gridRow  = path[i][0] }

                    elements[i].style.backgroundColor = 'red'
                    elements[i].style.gridColumn      = path[i][1]     
                }

        },100)}
        if ( key.keyCode === 39 ) {

            try { clearInterval( moveUp ) } 
            catch ( error ) { }
            try { clearInterval( moveDown ) } 
            catch ( error ) { }
            try { clearInterval( moveLeft ) } 
            catch ( error ) { }

            moveRight = setInterval( () => {
                row     = parseInt( elements[0].style.gridRow    )
                if ( column != 30 ) {
                    column = parseInt( elements[0].style.gridColumn ) + 1 }
                else { column = parseInt( elements[0].style.gridColumn )     }

                path.unshift([ row , column ])

                if( elements[0].style.gridRow    === powerUp.style.gridRow &&
                    elements[0].style.gridColumn === powerUp.style.gridColumn ){

                    powerUp.style.backgroundColor = 'transparent'
                    powerUp                       = boxes[ Math.ceil( Math.random()*900) ]
                    powerUp.style.backgroundColor = 'yellow'
                    snakeLength += 1
                }


                for ( let i = 0; i < snakeLength; i++ ) {

                    if ( elements[i].style.gridColumn === '30' ) {
                        elements[i].style.gridRow = path[i][0] + 1 }
                    else {
                        elements[i].style.gridRow = path[i][0] }

                    elements[i].style.backgroundColor = 'red'
                    elements[i].style.gridColumn      = path[i][1]     
                }

        },100)}
    }

}
    








