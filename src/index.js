/* eslint-disable */
import './style.css';

const userName = document.querySelector('.name');
const userScore = document.querySelector('.score');
const submitBtn = document.querySelector('.form-btn');
const displayLists = document.querySelector('.list-table');
const refreshBtn = document.querySelector('.button-refresh');

const gameId = 'NPlIWoD8HORIahnyXOzG';

const submitScore = async(userName, userScore) => {
    const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`, {
        method: 'POST',
        body: JSON.stringify({
            user: userName,
            score: userScore,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    const gameResult = await response.json();
    return gameResult;
};

const fetchDataFromAPI = async() => {
    const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`);
    const getResult = await response.json();
    const resultArray = getResult.result;
    const values = resultArray.map((result) => `
                <tr>
                    <td>${result.user}: ${result.score}</td>
                </tr>`).join('');
    displayLists.innerHTML = values;
};

submitBtn.addEventListener('click', () => {
    submitScore(userName.value, userScore.value);
    userName.value = '';
    userScore.value = '';
    fetchDataFromAPI();
});

refreshBtn.addEventListener('click', async() => {
    fetchDataFromAPI();
});

document.addEventListener('DOMContentLoaded', async() => {
    fetchDataFromAPI();
});