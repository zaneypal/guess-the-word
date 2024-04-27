const allElements = document.querySelectorAll("body *");
Array.from(allElements).forEach(function(allElements) {
    allElements.classList.add('puzzle1');
});

const answerBox = document.getElementsByClassName('answer-box');
Array.from(answerBox).forEach(function(answerBox) {
    answerBox.addEventListener('input', function() {
        if (document.activeElement.value != '') {
            answerBox.nextElementSibling.focus();
            document.activeElement.select();
        }
    });
    answerBox.addEventListener('click', function() {
        document.activeElement.select();
    });
});

const forms = document.querySelectorAll('form');
function check() {
    for (let x=0; x < forms.length; x++) {
        let guess = '';
        const answerBoxes = document.querySelectorAll('#question'+(x+1)+' .answer-box');
        Array.from(answerBoxes).forEach(function(answerBoxes) {
            guess += answerBoxes.value;
        });
        for (let y=0; y < answerBoxes.length; y++) {
            if (answerBoxes[y].value === answers[x][y]) {
                answerBoxes[y].classList.add('correct');
                answerBoxes[y].classList.remove('wrong');
            } else if (answerBoxes[y].value === '') {

            } else {
                answerBoxes[y].classList.remove('correct');
                answerBoxes[y].classList.add('wrong');
            }
        }
    }
};

const answerKey = document.getElementById('answer-key');
const answers = answerKey.innerHTML.split(',');
answerKey.innerHTML = "Answers: " + answerKey.innerHTML.split(',');

