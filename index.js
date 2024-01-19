const popularMovies =
    'https://api.themoviedb.org/3/movie/popular?language=pt&page=1'
const topRated = 'https://api.themoviedb.org/3/movie/top_rated'
const newMovies =
    'https://api.themoviedb.org/3/movie/now_playing?language=pt&page=1'
const detailsTMBD = 'https://api.themoviedb.org/3/movie/'
const posterTMDB = 'https://image.tmdb.org/t/p/w500'
const creditsTMDB = posterTMDB + '/credits' //atores
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzI5ZWRmMWUzZGUwZTFjYjc3MDU0N2I3YmEyYmUyZSIsInN1YiI6IjY1NzFhYzU5ODg2MzQ4MDBjNmVkYTk4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CAyQbKHTefUv9gkvxEIuLvxFAFDkBVvF3mJVKfim9Fw'
    }
}

const streamAvailability =
    'https://streaming-availability.p.rapidapi.com/get?output_language=en&imdb_id='
const headersStreamAvailability = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '3886d827c4msh7e0caee933cf072p12cdc4jsn3bd6186b306a',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }
}

fetch(popularMovies, options)
    .then(resp => resp.json())
    .then(response => {
        let firstMovie = response.results[0].id
        let secondMovie = response.results[1].id
        let thirdMovie = response.results[2].id
        let fourthMovie = response.results[3].id
        let fifthMovie = response.results[4].id
        let sixthMovie = response.results[5].id
        fetch(detailsTMBD + firstMovie + '?language=pt', options)
            .then(resp => resp.json())
            .then(response => {
                //Poster
                let imgPoster = document.getElementById('poster')
                imgPoster.setAttribute('movieID', response.id)
                imgPoster.src = posterTMDB + response.poster_path

                //Titulo
                let info = document.getElementById('informative')
                let nameMovie = document.createElement('h1')
                nameMovie.innerHTML = response.title
                info.append(nameMovie)

                //Sinopse
                let movieDescription = document.createElement('p')
                movieDescription.innerHTML = 'Sinopse: ' + response.overview
                info.append(movieDescription)

                //Data de lançamento
                let movieReleaseDate = document.createElement('p')
                movieReleaseDate.innerHTML =
                    'Data de Lançamento: ' + response.release_date
                info.append(movieReleaseDate)
            })
        fetch(detailsTMBD + secondMovie + '?language=pt', options)
            .then(resp => resp.json())
            .then(response => {
                //Poster
                let imgPoster = document.getElementById('poster1')
                imgPoster.setAttribute('movieID', response.id)
                imgPoster.src = posterTMDB + response.poster_path

                //Titulo
                let nameMovie = document.getElementById('title1')
                nameMovie.innerHTML = response.title
                let infoMovie = document.getElementById('infoMovies1')
                infoMovie.innerHTML = response.overview
            })
        fetch(detailsTMBD + thirdMovie + '?language=pt', options)
            .then(resp => resp.json())
            .then(response => {
                //Poster
                let imgPoster = document.getElementById('poster2')
                imgPoster.setAttribute('movieID', response.id)
                imgPoster.src = posterTMDB + response.poster_path

                //Titulo
                let nameMovie = document.getElementById('title2')
                nameMovie.innerHTML = response.title
                let infoMovie = document.getElementById('infoMovies2')
                infoMovie.innerHTML = response.overview
            })
        fetch(detailsTMBD + fourthMovie + '?language=pt', options)
            .then(resp => resp.json())
            .then(response => {
                //Poster
                let imgPoster = document.getElementById('poster3')
                imgPoster.setAttribute('movieID', response.id)
                imgPoster.src = posterTMDB + response.poster_path

                //Titulo
                let nameMovie = document.getElementById('title3')
                nameMovie.innerHTML = response.title

                let infoMovie = document.getElementById('infoMovies3')
                infoMovie.innerHTML = response.overview
            })
        fetch(detailsTMBD + fifthMovie + '?language=pt', options)
            .then(resp => resp.json())
            .then(response => {
                //Poster
                let imgPoster = document.getElementById('poster4')
                imgPoster.setAttribute('movieID', response.id)
                imgPoster.src = posterTMDB + response.poster_path

                //Titulo
                let nameMovie = document.getElementById('title4')
                nameMovie.innerHTML = response.title
                let infoMovie = document.getElementById('infoMovies4')
                infoMovie.innerHTML = response.overview
            })
        fetch(detailsTMBD + sixthMovie + '?language=pt', options)
            .then(resp => resp.json())
            .then(response => {
                //Poster
                let imgPoster = document.getElementById('poster5')
                imgPoster.setAttribute('movieID', response.id)
                imgPoster.src = posterTMDB + response.poster_path

                //Titulo
                let nameMovie = document.getElementById('title5')
                nameMovie.innerHTML = response.title
                let infoMovie = document.getElementById('infoMovies5')
                infoMovie.innerHTML = response.overview
            })
    })

function movieModal(elem) {
    let name = elem.firstElementChild

    let movieID = name.getAttribute('movieid')

    fetch(detailsTMBD + movieID + '?language=pt', options)
        .then(resp => resp.json())
        .then(response => {
            let modalTitle = document.getElementById('exampleModalLabel')
            modalTitle.innerHTML = response.title

            let modalPoster = document.getElementById('modalPoster')
            modalPoster.src = posterTMDB + response.poster_path

            let modalOverview = document.getElementById('modalOverview')
            modalOverview.innerHTML = 'Sinopse: ' + response.overview

            let modalReleaseDate = document.getElementById('modalReleaseDate')
            modalReleaseDate.innerHTML =
                'Data de lançamento: ' + response.release_date

            let imdbId = response.imdb_id
            fetch(streamAvailability + imdbId, headersStreamAvailability)
                .then(resp => resp.json())
                .then(response => {
                    let streaming = response.result.streamingInfo.pt
                    if (streaming != undefined) {
                        let streamDropdown =
                            document.getElementById('streamDropdown')
                        streamDropdown.innerHTML = ''
                        for (let i = 0; i < streaming.length; i++) {
                            let streamList = document.createElement('li')
                            let streamIten = document.createElement('a')
                            streamIten.classList.add('dropdown-item')
                            streamIten.innerHTML = `${streaming[i].service} - ${streaming[i].streamingType}`
                            streamList.appendChild(streamIten)
                            streamDropdown.appendChild(streamList)
                        }
                    } else {
                        let streamDropdown =
                            document.getElementById('streamDropdown')
                        streamDropdown.innerHTML = ''
                        let streamList = document.createElement('li')
                        let streamIten = document.createElement('a')
                        streamIten.classList.add('dropdown-item')
                        streamIten.innerHTML = 'Unavailable in Portugal'
                        streamList.appendChild(streamIten)
                        streamDropdown.appendChild(streamList)
                    }
                })
        })
}

function searchMovie() {
    sessionStorage.clear()
    let searchLabel = document.getElementById('searchLabel')
    let movieName = searchLabel.value
    console.log(movieName)
    sessionStorage.setItem('movieName', movieName)
}
