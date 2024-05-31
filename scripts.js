document.addEventListener('DOMContentLoaded', (event) => {
    const addPlayer = document.getElementById("add-player");
    const leaderBoard = document.getElementById("leaderBoard");

    function createNewElement(name, date, Lname, country, score) {
        return `
            <div class="data-items">
                <div class="name-div">
                    <p class="data-name">${name} ${Lname}</p>
                    <p class="data-date">${date}</p>
                </div>
                <p class="data-country">${country}</p>
                <div class="data-score">${score}</div>
                <i class="material-icons delete-icon" style="cursor: pointer;">&#xe872;</i>
                <div class="addScore" style="cursor: pointer;">+5</div>
                <div class="subScore" style="cursor: pointer;">-5</div>
            </div>
        `;
    }

    addPlayer.addEventListener('click', () => {
        const input_name = document.getElementById('name').value;
        const input_Lname = document.getElementById('Lname').value;
        const input_country = document.getElementById('country').value;
        const input_score = document.getElementById('score').value;
        const date = new Date().toLocaleDateString();
        
        if (input_Lname !== "" && input_name !== "" && input_country !== "" && input_score !== "") {
            let newelement = createNewElement(input_name, date, input_Lname, input_country, input_score);
            let tempDiv = document.createElement('div');
            tempDiv.innerHTML = newelement;
            console.log(tempDiv);
           
            while (tempDiv.firstChild) {
                leaderBoard.appendChild(tempDiv.firstChild);
            }

            // Attach event listeners to the new elements
            attachEventListeners();
            sortLeaderboard();
        } else {
            alert("Fill all fields");
        }
    });

    function attachEventListeners() {
        const deleteIcons = document.querySelectorAll(".delete-icon");
        deleteIcons.forEach(icon => {
            icon.removeEventListener('click', deleteEntry); // Remove previous event listeners to avoid duplicates
            icon.addEventListener('click', deleteEntry);
        });

        const addScores = document.querySelectorAll(".addScore");
        addScores.forEach(button => {
            button.removeEventListener('click', incrementScore); // Remove previous event listeners to avoid duplicates
            button.addEventListener('click', incrementScore);
        });

        const subScores = document.querySelectorAll(".subScore");
        subScores.forEach(button => {
            button.removeEventListener('click', decrementScore); // Remove previous event listeners to avoid duplicates
            button.addEventListener('click', decrementScore);
        });
    }

    function deleteEntry(e) {
        const entry = e.target.closest('.data-items');
        if (entry) {
            leaderBoard.removeChild(entry);
        }
    }

    function incrementScore(e) {
        const entry = e.target.closest('.data-items');
        const scoreElement = entry.querySelector('.data-score');
        let score = parseInt(scoreElement.textContent);
        score += 5;
        scoreElement.textContent = score;
        sortLeaderboard();
    }

    function decrementScore(e) {
        const entry = e.target.closest('.data-items');
        const scoreElement = entry.querySelector('.data-score');
        let score = parseInt(scoreElement.textContent);
        score -= 5;
        scoreElement.textContent = score;
        sortLeaderboard();
    }

    function sortLeaderboard() {
        const items = Array.from(leaderBoard.children);
        items.sort((a, b) => {
            const scoreA = parseInt(a.querySelector('.data-score').textContent);
            const scoreB = parseInt(b.querySelector('.data-score').textContent);
            return scoreB - scoreA;
        });
        items.forEach(item => leaderBoard.appendChild(item));
    }

    // Initial call to attach event listeners to existing items
    attachEventListeners();
});
