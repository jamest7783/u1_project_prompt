/* VARIABLES */ 
let grid           = document.querySelector( 'div'  )
let box            = document.createElement( 'div'  )
let onOff          = document.querySelector( '.left-header' )
let rightHeader    = document.querySelector( '.right-header' )
let boxes          = []
let indices        = []
let path           = []
let elements       = []
let gameOn         = false
let powerUp        = false
let blackHoleEntry = false
let blackHoleExit  = false
let inBlackHole    = false
let boxNum         = -1
let level          = 0
let snakeLength    = 0
let row            = 0
let column         = 0
let speed          = 110
const planets      = ["mars","earth","green_planet","purple_planet"]


/* FUNCTIONS */ 
const makeGameBoard    = () => {
    box.classList.add( 'box' )
    for ( let i = 0; i < 30*30; i++ ) {
        let box = document.createElement( 'div' )
        box.classList.add( 'box' )
        boxes.push( box )
        grid.appendChild( boxes[i] )
    }
    for ( let r = 1; r < 31; r++ ) {
        for ( let c = 1; c < 31; c++ ) {
            boxNum += 1
            boxes[boxNum].style.gridRow     =  r
            boxes[boxNum].style.gridColumn  =  c
            indices.push([ r,c ])
        }
    }
    powerUp = boxes[435]
    powerUp.setAttribute( "id",planets[ Math.floor( Math.random()*4) ])
}
const makeSnake        = () => {
    for ( let i = 0; i < 30*30; i++ ) {
        elements.push( document.createElement( 'div' ) )
        grid.appendChild( elements[i] )
        elements[i].classList.add( 'box' )
   }
}
const startGame        = () => {
    onOff.innerText = 'Level 0'
    onOff.classList.remove( 'flashInf' )
    gameOn = true
    for ( let i = 1; i < snakeLength; i++ ) {
        elements[i].removeAttribute( 'id' )
    }
    snakeLength = 1
    elements[0].style.gridRow    = '15'
    elements[0].style.gridColumn = '7'
    elements[0].setAttribute( "id",'mouth' )
    rightHeader.innerText = 'SCORE: 000'
}
const getLevel         = (len) => {
    if ( len <= 3 ) { level = 0  } 
    else if ( len <= 6  && len > 3 ) { 
        level = 1  
        speed = 105 } 
    else if ( len <= 10 && len > 6 ) { 
        level = 2  
        speed = 100 } 
    else if ( len <= 15 && len > 10 ) { 
        level = 3  
        speed = 95 } 
    else if ( len <= 20 && len > 15 ) { 
        level = 4  
        speed = 90 } 
    else if ( len <= 25 && len > 20 ) { 
        level = 5  
        speed = 85 } 
    else if ( len <= 30 && len > 25 ) { 
        level = 6  
        speed = 80 }  
    else if ( len <= 35 && len > 30 ) { 
        level = 7  
        speed = 75 }  
    else if ( len <= 40 && len > 35 ) { 
        level = 8  
        speed = 70 } 
    else if ( len <= 50 && len > 40 ) { 
        level = 9  
        speed = 65 } 
    else if ( len >  50 ) { 
        level = 10 
        speed = 60 }  
    return level
}
const clearAllMovement = () => {
    try { clearInterval( moveUp ) } 
    catch ( error ) { }
    try { clearInterval( moveDown ) } 
    catch ( error ) { }
    try { clearInterval( moveLeft ) } 
    catch ( error ) { }
    try { clearInterval( moveRight ) } 
    catch ( error ) { }
}
const eatPlanet        = () => {
    if( elements[0].style.gridRow    === powerUp.style.gridRow &&
        elements[0].style.gridColumn === powerUp.style.gridColumn ){

        powerUp.setAttribute( 'id','' )
        powerUp = boxes[ Math.ceil( Math.random()*900) ]
        powerUp.setAttribute( 'id',planets[ Math.floor( Math.random()*4) ])
        snakeLength += 1
        onOff.innerText = `Level ${getLevel(snakeLength)}`
        rightHeader.innerText = `SCORE: ${('00'+snakeLength).slice(-3)}`
        rightHeader.classList.add( 'flashOnce' )
        takeOffFlash = setTimeout( () => { 
            rightHeader.classList.remove( 'flashOnce' )
        },2000 )   
    }
}
const gameOver         = () => {
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
                clearAllMovement()
            }
        }
    }
}
const makeBlackHoles = () => {
    /* generating a new black-hole */
    if ( snakeLength > 1 && inBlackHole === false ) {
        blackHoleEntry = boxes[ Math.ceil( Math.random()*900) ]
        blackHoleEntry.setAttribute( 'id','blackHole' )
        inBlackHole = true
    }

    /* generating a black-hole-exit if in black-hole */
    if ( elements[0].style.gridRow    === blackHoleEntry.style.gridRow &&
        elements[0].style.gridColumn === blackHoleEntry.style.gridColumn ) {
            blackHoleExit = boxes[ Math.ceil( Math.random()*900) ]
            elements[0].style.gridRow = blackHoleExit.style.gridRow
            elements[0].style.gridColumn = blackHoleExit.style.gridColumn
            blackHoleExit.setAttribute( 'id','blackHole' )
    }

    /* removing black-holes if snake passes through */
    if ( elements[snakeLength-1].style.gridRow    === blackHoleEntry.style.gridRow &&
        elements[snakeLength-1].style.gridColumn === blackHoleEntry.style.gridColumn ) {
            blackHoleEntry.removeAttribute( 'id' )
            removeBlackHoleExit = setInterval( () => {
                blackHoleExit.setAttribute( 'id','' )
            },5000)
            inBlackHole = false
    }
}
const moveNorth        = () => {
    moveUp = setInterval( () => {
                
        row    = parseInt( elements[0].style.gridRow ) - 1
        column = parseInt( elements[0].style.gridColumn )
        path.unshift([ row , column ])

        eatPlanet()

        for ( let i = 0; i < snakeLength; i++ ) {
            if ( elements[i].style.gridRow === '1' ) {
                elements[i].style.gridRow = 30 }
            else {
                elements[i].style.gridRow = path[i][0] }    
            elements[i].setAttribute('id', 'snake')
            elements[i].style.gridColumn = path[i][1]     
        }

        elements[0].setAttribute( 'id', 'mouth' )
        elements[0].style.transform = ( 'rotate(180deg)' )

        makeBlackHoles()
        gameOver()
        
    },speed)
    
}
const moveSouth        = () => {
    moveDown = setInterval( () => {

        if ( row != 30 ) {  
            row = parseInt( elements[0].style.gridRow ) + 1 }
        else if ( row === 30 ) {
            row = 1
        }
        else { row = parseInt( elements[0].style.gridRow )     }
        column  = parseInt( elements[0].style.gridColumn )
        path.unshift([ row , column ])

        eatPlanet()

        for ( let i = 0; i < snakeLength; i++ ) {
                
            elements[i].setAttribute('id', 'snake')
            elements[i].style.gridRow    = path[i][0] 
            elements[i].style.gridColumn = path[i][1]     
        }

        elements[0].setAttribute( 'id', 'mouth' )
        elements[0].style.transform = ( '' )

        makeBlackHoles()
        gameOver()


        },speed)
}
const moveEast         = () => {
    moveRight = setInterval( () => {
               
        row = parseInt( elements[0].style.gridRow    )
        if ( column != 30 ) {
            column = parseInt( elements[0].style.gridColumn ) + 1 }
        else if ( column === 30 ) {
            column = 1
        }
        else { column = parseInt( elements[0].style.gridColumn )     }
        path.unshift([ row , column ])

        eatPlanet()


        for ( let i = 0; i < snakeLength; i++ ) {

            elements[i].setAttribute('id', 'snake')
            elements[i].style.gridRow    = path[i][0] 
            elements[i].style.gridColumn = path[i][1]      
        }

        elements[0].setAttribute( 'id', 'mouth' )
        elements[0].style.transform = ( 'rotate(-90deg)' ) 

        makeBlackHoles()
        gameOver()

    },speed)
}
const moveWest         = () => {
    moveLeft = setInterval( () => {

        row     = parseInt( elements[0].style.gridRow    )  
        column  = parseInt( elements[0].style.gridColumn ) - 1
        path.unshift([ row , column ])

        eatPlanet()


        for ( let i = 0; i < snakeLength; i++ ) {

            if ( elements[i].style.gridColumn === '1' ) {
                elements[i].style.gridColumn = 30 }
            else {
                elements[i].style.gridColumn = path[i][1] }

            elements[i].setAttribute('id', 'snake')
            elements[i].style.gridRow = path[i][0]    
        }

        elements[0].setAttribute( 'id', 'mouth' )
        elements[0].style.transform = ( 'rotate(90deg)' )

        makeBlackHoles()
        gameOver()

    },speed)
}

/* MAIN */ 
onOff.addEventListener( 'click', startGame )

rightHeader.innerText = 'SCORE: 000'
onOff.innerText       = 'click to start'
onOff.classList.add( 'flashInf' )  

makeGameBoard()
makeSnake()

document.onkeydown = startMove = ( key ) => {
    if ( gameOn === true ) {
        if ( key.keyCode === 38 ) {
            clearAllMovement()
            moveNorth()
        }
        if ( key.keyCode === 40  ) {
            clearAllMovement()
            moveSouth()
        }
        if ( key.keyCode === 37 ) {
            clearAllMovement()
            moveWest()
        }
        if ( key.keyCode === 39 ) {
            clearAllMovement()
            moveEast()
        }
    }
}
    

/* 
TO DO:
    pause game, increasing speed, multiple power-ups
*/