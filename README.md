# Simple Quiz App with JavaScript

**DEMO :** https://sparkly-pixie-bb7ee1.netlify.app/

Developed a responsive website for Quiz App where questions are loaded from the data, able to attend and review and view the final results with answers.

> **Technologies used:** HTML, CSS, JS, Bootstrap

# Pseudo Code

 - Create a array called quiz which contains the data.
	 - **id :** Number of the quiz.
	- **question :** Question of the quiz.
	- **options :** Available answers of the quiz.
	- **answer :** Correct answer of the quiz.
	- **score :** Calculated score whether the question is correct or not if attended.
	- **status :** Check whether the question is attended or not, if attended contains the chosen option.
- Display the total questions based on quiz array count and display answered questions as 0.
- Make a global variable of the quiz index, so that can identify the current question of the quiz, If next button clicked, index will increment, else if previous clicked, index will decrement. After that execute buttonStatus function.
- Button status on load, clicking next, previous :
	- Map the quiz array as loop.
	- Choose the question based on quiz index and append the question, options to the screen.
	- Make the checkbox checked, if the status of the question is updated, so that can view the selected answer even when the next, previous buttons are clicked.
	- Disable the next, previous buttons accordingly based on the quiz questions length.
- On choosing an option :
	- Update the chosen value to status.
	- Increment the score to 1 if chosen answer is correct else set it to 0, by comparing the assigned the answer.
	- Loop the array and calculate the number of answered questions and append it to the topbar of the screen.
	- If answered and quiz length is same and completed is 0, the quiz is completed.
		- Update 'completed' to 1.
		- Display the Finish button.
			- If Finish button is clicked, toggle the correct answers to the screen.
			- Disable the Finish button, to avoid resubmitting.
			- Calculate the correct answers by mapping the assigned scores.
			- Display the scores to the result board.
