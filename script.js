const seats = document.querySelector('.seats');
const allSeats = document.querySelectorAll('.seats .seat:not(.occupied)')
const seatCountText = document.getElementById('count');
const seatTotalText = document.getElementById('total');
const movieList = document.getElementById('movie');
const restartBtn = document.querySelector('button');
let ticketPrice = +movieList.value;

populateUI();

// Update Count Function

function updateCount() {
    const selectedSeat = document.querySelectorAll('.seats .selected');
    const selectedSeatCount = selectedSeat.length;

    const seatsIndex = [...selectedSeat].map((seat) => [...allSeats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    seatCountText.innerText = selectedSeatCount;
    seatTotalText.innerText = selectedSeatCount * ticketPrice;
}

// Save selected movie index and price Function

function setMovieData(listIndex, listPrice) {
    localStorage.setItem('selectedMovieIndex', listIndex);
    localStorage.setItem('selectedMoviePrice', listPrice)
}

// Get data from local storage and populate UI

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        allSeats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null)
    movieList.selectedIndex = selectedMovieIndex;

}

// Movie list change eventlistener

movieList.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateCount();
})

// seats clicking eventlistener

seats.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied'))
    e.target.classList.toggle('selected');
    updateCount();
})


// restarting function
function removeSelected() {
    const bookedSeats = document.querySelectorAll('.seats .selected')

    bookedSeats.forEach((seat) => {
        if (seat.classList.contains('selected'))
        seat.classList.remove('selected')
    })

    updateCount();
}

// restarting eventlistener

restartBtn.addEventListener('click', removeSelected)

updateCount();