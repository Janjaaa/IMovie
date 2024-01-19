const newMovies =
    'https://api.themoviedb.org/3/movie/now_playing?language=pt&page=1&region=pt'

const detailsTMBD = 'https://api.themoviedb.org/3/movie/'
const posterTMDB = 'https://image.tmdb.org/t/p/w500'
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
            fetch('streamAvailability' + imdbId, headersStreamAvailability)
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

fetch(newMovies, options)
    .then(resp => resp.json())
    .then(response => {
        let movies = response.results
        let resultado = document.getElementById('result')

        let dateBetween = document.getElementById('dateBetween')
        dateBetween.innerHTML = `${response.dates.minimum} - ${response.dates.maximum}`
        movies.forEach((value, index) => {
            let div = document.createElement('div')
            div.classList.add('col-md-4', 'mainContent')
            resultado.appendChild(div)

            let movieModalOpener = document.createElement('button')
            movieModalOpener.type = 'button'
            movieModalOpener.setAttribute('data-bs-toggle', 'modal')
            movieModalOpener.setAttribute('data-bs-target', '#exampleModal')
            movieModalOpener.setAttribute('onclick', 'movieModal(this)')
            movieModalOpener.classList.add('buttonModal')
            div.appendChild(movieModalOpener)

            let imgPoster = document.createElement('img')
            imgPoster.setAttribute('movieID', movies[index].id)
            imgPoster.src = posterTMDB + movies[index].poster_path
            imgPoster.classList.add('posters')
            movieModalOpener.appendChild(imgPoster)

            let divInfo = document.createElement('div')
            movieModalOpener.appendChild(divInfo)

            let h4MovieName = document.createElement('h4')
            h4MovieName.classList.add('titleMovies')
            h4MovieName.innerHTML = movies[index].title
            divInfo.appendChild(h4MovieName)

            let pMovieName = document.createElement('p')
            pMovieName.classList.add('generalMovies')
            pMovieName.innerHTML = 'Sinopse: ' + movies[index].overview
            divInfo.appendChild(pMovieName)

            let pNotaMedia = document.createElement('p')
            pNotaMedia.classList.add('averageCount')
            pNotaMedia.innerHTML =
                'Nota média: ' +
                Math.round(movies[index].vote_average * 10) / 10
            divInfo.appendChild(pNotaMedia)

            const small = window.matchMedia('(max-width: 1024px)').matches
            if (small) {
                div.classList.replace('col-md-4', 'col-md-6')
            } else {
            }
        })
    })
