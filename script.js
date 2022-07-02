const API_KEY = '7bcc0e7fc8f9bfd152d68c486ea8c927'
const DOMAIN = 'https://api.themoviedb.org/3'
const IMAGE_BASE_PATH = 'https://image.tmdb.org/t/p/original'

let searchInput = document.getElementById( 'search-input' )
const searchButton = document.getElementById( 'search' )
let movieListDisplay = document.querySelector( '.movie-list' )

const renderList = ( section, foundMoviesArray ) => {
    for ( let i = 0; i < foundMoviesArray.length; i++ ) {
        let newDiv = document.createElement( 'div' )
        let newTitle = document.createElement( 'p' )
        let newPoster = document.createElement( 'div' )
        newTitle.innerText = foundMoviesArray[i][0]
        if ( foundMoviesArray[i][1] != 'poster not found' ) {
            newPoster.innerHTML = `<img src=${IMAGE_BASE_PATH+foundMoviesArray[i][1]}>`
        }
        else { newPoster.innerText = foundMoviesArray[i][1] }
        newDiv.appendChild( newTitle )
        newDiv.appendChild( newPoster )
        section.appendChild( newDiv )
    }
}

searchButton.addEventListener( 'click', async () => {

    if ( movieListDisplay.childNodes ) {
        movieListDisplay.innerHTML = ''
    }
    let movieToFind = searchInput.value;
    let moviesFound = await axios.get(`https://api.themoviedb.org/3/search/movie?query=[${movieToFind}]&api_key=${API_KEY}`)
    let titlesAndPosters = []
    moviesFound.data.results.map( item => item.poster_path != null ? titlesAndPosters.push([item.original_title,item.poster_path]) : titlesAndPosters.push([item.original_title,'poster not found'] ))
    console.log( titlesAndPosters )
    renderList( movieListDisplay, titlesAndPosters )
    searchInput.value = ''
})







