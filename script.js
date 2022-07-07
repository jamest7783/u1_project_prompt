 
let grid        = document.querySelector( 'div'  )
let box         = document.createElement( 'div'  )
let onOff       = document.querySelector( '.left-header' )
let rightHeader = document.querySelector( '.right-header' )
let boxes       = []
let indices     = []
let path        = []
let elements    = []
let level       = 0
let snakeLength = 0
let row         = 0
let column      = 0
let boxNum      = -1
let gameOn      = false
const planets   = ["mars","earth","green_planet","purple_planet"]

let getLevel = ( len ) => {
    if      ( len <= 3              ) { level = 0  } 
    else if ( len <= 6  && len > 3  ) { level = 1  } 
    else if ( len <= 10 && len > 6  ) { level = 2  } 
    else if ( len <= 15 && len > 10 ) { level = 3  } 
    else if ( len <= 20 && len > 15 ) { level = 4  } 
    else if ( len <= 25 && len > 20 ) { level = 5  } 
    else if ( len <= 30 && len > 25 ) { level = 6  } 
    else if ( len <= 35 && len > 30 ) { level = 7  } 
    else if ( len <= 40 && len > 35 ) { level = 8  } 
    else if ( len <= 50 && len > 40 ) { level = 9  } 
    else if ( len >  50             ) { level = 10 } 
    return level
}


rightHeader.innerText = 'SCORE: 000'
onOff.innerText = 'START GAME'
onOff.classList.add( 'flashInf' )  


onOff.addEventListener( 'click', () => {
    onOff.innerText = 'Level 0'
    onOff.classList.remove( 'flashInf' )
    gameOn = true
    /* first element in elements is pre-initialized */
    for ( let i = 1; i < snakeLength; i++ ) {
        elements[i].removeAttribute( 'id' )
    }
    snakeLength = 1
    elements[0].style.gridRow    = '15'
    elements[0].style.gridColumn = '7'
    elements[0].setAttribute( "id",'mouth' )
    rightHeader.innerText = 'SCORE: 000'
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
powerUp.setAttribute( "id",planets[ Math.floor( Math.random()*4) ])


/* potential elements of snake body, stored as transparent */
for ( let i = 0; i < 30*30; i++ ) {
     elements.push( document.createElement( 'div' ) )
     grid.appendChild( elements[i] )
     elements[i].classList.add( 'box' )
}


document.onkeydown = startMove = ( key ) => {
    if ( gameOn === true ) {
        if ( key.keyCode === 38 ) {

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

                    powerUp.setAttribute( "id","" )
                    powerUp                       = boxes[ Math.ceil( Math.random()*900) ]
                    powerUp.setAttribute( "id",planets[ Math.floor( Math.random()*4) ])
                    snakeLength += 1
                    onOff.innerText = `Level ${getLevel(snakeLength)}`
                    rightHeader.innerText = `SCORE: ${('00'+snakeLength).slice(-3)}`
                    rightHeader.classList.add( 'flashOnce' )
                    takeOffFlash = setTimeout( () => { 
                        rightHeader.classList.remove( 'flashOnce' )
                    },2000 )   
                }

                for ( let i = 0; i < snakeLength; i++ ) {

                    if ( elements[i].style.gridRow === '1' ) {
                        elements[i].style.gridRow = 30 }
                    else {
                        elements[i].style.gridRow = path[i][0] }
                        
                    elements[i].setAttribute("id", "snake")
                    elements[i].style.gridColumn = path[i][1]     
                }
                elements[0].setAttribute( "id", "mouth" )
                elements[0].style.transform = ( 'rotate(180deg)' )

                for ( let a = 0; a < snakeLength; a++ ) {
                    for ( let b = 0; b < snakeLength; b++ ) {
                        if( a != b &&
                            elements[a].style.gridRow    === elements[b].style.gridRow &&
                            elements[a].style.gridColumn === elements[b].style.gridColumn ) {
                            gameOn = false
                            onOff.innerText = 'RESET GAME?'
                            onOff.classList.add( 'flashInf' )
                            for ( let i = 1; i < snakeLength; i++ ) {
                                elements[i].setAttribute( 'id','deadSnake' )
                                takeOffFlash = setTimeout( () => { 
                                    element[i].classList.remove( 'deadSnake' )
                                },2000 )
                            } 
                            clearInterval( moveUp )
                        }
                    }
                }
                
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

                    powerUp.setAttribute( "id","" )
                    powerUp                       = boxes[ Math.ceil( Math.random()*900) ]
                    powerUp.setAttribute( "id",planets[ Math.floor( Math.random()*4) ])
                    snakeLength += 1
                    onOff.innerText = `Level ${getLevel(snakeLength)}`
                    rightHeader.innerText = `SCORE ${('00'+snakeLength).slice(-3)}`
                    rightHeader.classList.add( 'flashOnce' )
                    takeOffFlash = setTimeout( () => { 
                        rightHeader.classList.remove( 'flashOnce' )
                    },2000 ) 
                }

                for ( let i = 0; i < snakeLength; i++ ) {

                    if ( elements[i].style.gridRow === '30' ) {
                        elements[i].style.gridRow = 1 }
                    else if ( elements[i].style.gridRow === '1' ) {
                        elements[i].style.gridRow = 2 }
                    else {
                        elements[i].style.gridRow = path[i][0] }
                        
                    elements[i].setAttribute("id", "snake")
                    elements[i].style.gridColumn = path[i][1]     
                }
                elements[0].setAttribute( "id", "mouth" )
                elements[0].style.transform = ( '' )

                for ( let a = 0; a < snakeLength; a++ ) {
                    for ( let b = 0; b < snakeLength; b++ ) {
                        if( a != b &&
                            elements[a].style.gridRow    === elements[b].style.gridRow &&
                            elements[a].style.gridColumn === elements[b].style.gridColumn ) {
                            gameOn = false
                            onOff.innerText = 'RESET GAME?'
                            onOff.classList.add( 'flashInf' )
                            for ( let i = 1; i < snakeLength; i++ ) {
                                elements[i].setAttribute( "id","deadSnake" )
                                takeOffFlash = setTimeout( () => { 
                                    element[i].classList.remove( 'deadSnake' )
                                },2000 )
                            } 
                            clearInterval( moveDown )
                        }
                    }
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

                    powerUp.setAttribute( "id","" )
                    powerUp                       = boxes[ Math.ceil( Math.random()*900) ]
                    powerUp.setAttribute( "id",planets[ Math.floor( Math.random()*4) ])
                    snakeLength += 1
                    onOff.innerText = `Level ${getLevel(snakeLength)}`
                    rightHeader.innerText = `SCORE ${('00'+snakeLength).slice(-3)}`
                    rightHeader.classList.add( 'flashOnce' )
                    takeOffFlash = setTimeout( () => { 
                        rightHeader.classList.remove( 'flashOnce' )
                    },2000 ) 
                }


                for ( let i = 0; i < snakeLength; i++ ) {

                    if ( elements[i].style.gridColumn === '1' ) {
                        elements[i].style.gridColumn = 30 }
                    else {
                        elements[i].style.gridColumn = path[i][1] }

                    elements[i].setAttribute("id", "snake")
                    elements[i].style.gridRow = path[i][0]    
                }
                elements[0].setAttribute( "id", "mouth" )
                elements[0].style.transform = ( 'rotate(90deg)' )

                for ( let a = 0; a < snakeLength; a++ ) {
                    for ( let b = 0; b < snakeLength; b++ ) {
                        if( a != b &&
                            elements[a].style.gridRow    === elements[b].style.gridRow &&
                            elements[a].style.gridColumn === elements[b].style.gridColumn ) {
                            gameOn = false
                            onOff.innerText = 'RESET GAME?'
                            onOff.classList.add( 'flashInf' )
                            for ( let i = 1; i < snakeLength; i++ ) {
                                elements[i].setAttribute( "id","deadSnake" )
                                takeOffFlash = setTimeout( () => { 
                                    element[i].classList.remove( 'deadSnake' )
                                },2000 )
                            } 
                            clearInterval( moveLeft )
                        }
                    }
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

                    powerUp.setAttribute( "id","" )
                    powerUp                       = boxes[ Math.ceil( Math.random()*900) ]
                    powerUp.setAttribute( "id",planets[ Math.floor( Math.random()*4) ])
                    snakeLength += 1
                    onOff.innerText = `Level ${getLevel(snakeLength)}`
                    rightHeader.innerText = `SCORE ${('00'+snakeLength).slice(-3)}`
                    rightHeader.classList.add( 'flashOnce' )
                    takeOffFlash = setTimeout( () => { 
                        rightHeader.classList.remove( 'flashOnce' )
                    },2000 ) 
                }


                for ( let i = 0; i < snakeLength; i++ ) {

                    if ( elements[i].style.gridColumn === '30' ) {
                        elements[i].style.gridColumn = 1 }
                    else if ( elements[i].style.gridColumn === '1') {
                        elements[i].style.gridColumn = 2 
                    }
                    else {
                        elements[i].style.gridColumn = path[i][1] }

                    elements[i].setAttribute("id", "snake")
                    elements[i].style.gridRow  = path[i][0]     
                }
                elements[0].setAttribute( "id", "mouth" )
                elements[0].style.transform = ( 'rotate(-90deg)' )

                for ( let a = 0; a < snakeLength; a++ ) {
                    for ( let b = 0; b < snakeLength; b++ ) {
                        if( a != b &&
                            elements[a].style.gridRow    === elements[b].style.gridRow &&
                            elements[a].style.gridColumn === elements[b].style.gridColumn ) {
                            gameOn = false
                            onOff.innerText = 'RESET GAME?'
                            onOff.classList.add( 'flashInf' )
                            for ( let i = 1; i < snakeLength; i++ ) {
                                elements[i].setAttribute( "id","deadSnake" )
                                takeOffFlash = setTimeout( () => { 
                                    element[i].classList.remove( 'deadSnake' )
                                },2000 )
                            } 
                            clearInterval( moveRight )
                        }
                    }
                }

        },100)}
    }

}
    








/* pause game, increasing speed, multiple power-ups,*/