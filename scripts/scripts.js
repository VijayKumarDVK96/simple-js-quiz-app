'use strict';

const question = document.getElementById('question');
let question_options = document.getElementById('question-options');
let options = '';
let question_number = document.getElementById('qid');
let total_questions = document.getElementById('tque');
let answered_questions = document.getElementById('aque');
let previous = document.getElementById('previous');
let next = document.getElementById('next');
let form = document.getElementById('quizForm');
let finishModal = document.getElementById('finishModal');
let quiz_index = 0;
let checked = '';
let completed = 0;

/*
01 - Create a array called quiz which contains the data.

- id : Number of the quiz,
- question : Question of the quiz,
- options : Available answers of the quiz
- answer : Correct answer of the quiz
- score : Calculated score whether the question is correct or not if attended
- status : Check whether the question is attended or not, if attended contains the chosen option
*/

let quiz = [
    {
        "id": 1,
        "question": "Which is the wild animal?",
        "options": ["Lion", "Cow", "Dog", "Rat"],
        "answer": "Lion",
        "score": 0,
        "status": ""
    },
    {
        "id": 2,
        "question": "What is the capital of India?",
        "options": ["New Delhi", "Mumbai", "Kolkata"],
        "answer": "New Delhi",
        "score": 0,
        "status": ""
    },
    {
        "id": 3,
        "question": "When Gandhi Jayanthi is celebrated?",
        "options": ["2 oct", "3 oct", "4 oct"],
        "answer": "2 oct",
        "score": 0,
        "status": ""
    },
    {
        "id": 4,
        "question": "Which colour is not present in Indian National Flag?",
        "options": ["Saffron", "White", "Green", "Black"],
        "answer": "Black",
        "score": 0,
        "status": ""
    },
    {
        "id": 5,
        "question": "MS Dhoni is a cricketer",
        "options": ["True", "False"],
        "answer": "True",
        "score": 0,
        "status": ""
    },
];

/*
02 - Display the total questions based on quiz array count and display answered questions as 0
*/

total_questions.innerText = quiz.length;
answered_questions.innerText = 0;

/*
03 - Make a global variable of the quiz index, so that can identify the current question of the quiz, If next button clicked, index will increment, else if previous clicked, index will decrement. After that execute buttonStatus function
*/

next.addEventListener('click', function() {
    if(quiz.length > quiz_index) {
        quiz_index++;
    }

    buttonStatus();
});

previous.addEventListener('click', function() {
    if(quiz.length > quiz_index) {
        quiz_index--;
    }

    buttonStatus();
});

/*
04, - Map the quiz array as loop.
    - Choose the question based on quiz index and append the question, options to the screen.
    - Make the checkbox checked, if the status of the question is updated, so that can view the selected answer even when the next, previous buttons are clicked.
    - Disable the next, previous buttons accordingly based on the quiz questions length.
*/

function buttonStatus() {

    quiz.map(function(values, index) {

        if(index == quiz_index) {
            options = '';
            
            question_number.innerText = quiz_index + 1;
            question.innerHTML = values.question;
            values.options.map(function(option, index_op) {

                checked = (values.status !== '' && index_op == values.status) ? 'checked' : '';

                options += `<div class='form-check option-block'><label class='form-check-label'>
                    <input type='radio' class='form-check-input' name='option' id='choose_${index_op}' value='${index_op}' onchange='chooseAnswer(this.value)' ${checked}>
                    <span>${option}</span>
                </label></div>`;
            });
            // console.log(values.answer);
            if(completed) {
                options += '<strong>Answer:</strong> '+values.answer;
            }
        }
        
    });

    question_options.innerHTML = options;

    if(quiz_index == 0) {
        previous.disabled = true;
        next.disabled = false;
    } else if(quiz_index == quiz.length - 1) {
        previous.disabled = false;
        next.disabled = true;
    } else {
        previous.disabled = false;
        next.disabled = false;
    }
}

/*
05 - Update the chosen value to status.
   - Increment the score to 1 if chosen answer is correct else set it to 0, by comparing the assigned the answer.
   - Loop the array and calculate the number of answered questions and append it to the topbar of the screen.
   - If answered and quiz length is same and completed is 0, the quiz is completed.
        - Update 'completed' to 1.
        - Display the Finish button.
            - If Finish button is clicked, toggle the correct answers to the screen.
            - Disable the Finish button, to avoid resubmitting.
            - Calculate the correct answers by mapping the assigned scores.
            - Display the scores to the result board.
*/

function chooseAnswer(value) {
    quiz[quiz_index]['status'] = Number(value);
    quiz[quiz_index]['score'] = (quiz[quiz_index]['options'][value] == quiz[quiz_index]['answer']) ? 1 : 0;

    let answered = quiz.reduce((i, val) => { return i + ((val.status !== '') ? 1 : 0); }, 0);

    answered_questions.innerText = answered;

    // console.log(quiz);

    if(answered == quiz.length && completed == 0) {
        completed = 1;
        form.insertAdjacentHTML('beforeend','<button id="finish" type="button" class="btn btn-primary finish-btn">Finish</button>');
        let finish_btn = document.getElementById('finish');

        finish_btn.addEventListener('click', function() {
            buttonStatus();
            finishModal.style.display = 'block';
            finish_btn.disabled = true;
            let correct_answers = quiz.reduce((i, val) => { return i + ((val.score !== 0) ? 1 : 0); }, 0);

            document.getElementById('total_display').innerText = quiz.length;
            document.getElementById('answered_display').innerText = answered;
            document.getElementById('correct_display').innerText = correct_answers;
        });
    }
}

/*
06, Init the buttonStatus function for the first question to load.
*/

buttonStatus();