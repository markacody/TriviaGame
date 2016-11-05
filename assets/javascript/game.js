$(document).ready(function(){

//Create a timer for the questioner that can be triggers automatically and manually.
//Start by creating variables for the timers. One is the counter functionality. One is a locally defined variable for the limit.
var counter = setInterval(countDown,1000);
var count = 30;

	// Enable manual restart of the timer.
	$(".restart").on("click", function(){
		count=31;
		$('.counter').text(count);
		countDown();
	}); /*END restart button listener */
	// Define the count down function. Because setInterval is continuous, no loop is required to "make it go"
	function countDown(){
		count--;
		if (count <= 0) {
			// stop the counter
			clearInterval(counter);
			$('.counter').text('30');
			// run the timeout function
			timeOut();
			return;
		} else {
			$('.counter').html(count);
		}
    } /*END define the countDown function */
    // Define variables to identify the current question, correct answer, and the end of the quiz
    var currentQuestion = 0;
    var correctAnswer = 0;
    var endQuiz = false;
    // Define an object with questions and answers. Use an array to contain answers and to identify the correct one.
    var questions = [{
            question: "What is the diameter of the earth, in miles?",
            choices: ["7915", "8015.3", "10123.3", "15120"],
            correctAnswer: 0
        }, {
            question: "What is the distance to the center of the earth, in miles?",
            choices: ["4008", "5062", "3959", "6371"],
            correctAnswer: 2
        }, {
            question: "What is the distance to the nearest star, in light years?",
            choices: ["2", "4.22", "12.4", "100"],
            correctAnswer: 1
        }, {
            question: "What is the name of the nearest star?",
            choices: ["Alpha Omega", "Chiron", "The North Star", "Alpha Centauri"],
            correctAnswer: 3
        }, {
            question: "What is the nearest galaxy?",
            choices: ["Gynomastia", "Herculania", "Andromeda", "Achilles"],
            correctAnswer: 2
        }]; /*END OF questions OBJECT */
    //display the first question
    displayCurrentQuestion();
    //define the display current questions function
    function displayCurrentQuestion() {
        //create variables in memory to handle the question, where to put the question, and the choices
        var question = questions[currentQuestion].question;
        var questionClass = $(".question");
        var allChoices = questions[currentQuestion].choices.length;
        //Assign questionClass to the text of the current question
        $(questionClass).text(question);
        // Remove previous responses, if any
        $(".responses").empty();
        $(".timeout").empty();
        $(".correct").empty();
        $(".incorrect").empty();
        //use a loop to cycle through the array of choices create a list on the page 
        var choice;
        for (i = 0; i < allChoices; i++) {
            choice = questions[currentQuestion].choices[i];
            $('<li><input type="radio" value=' + i + '/>' + choice + '</li>').appendTo(".responses");
        }
        //call the countdown function    
        countDown();
    }
    // Define the timeout function
    function timeOut(){    
    // display the timeout message.
        $(".timeout").html("<p>You timed out. The next question will begin in three seconds.</p>");
    // after three seconds call for the next question.
        currentQuestion++;
        setTimeout(displayCurrentQuestion, 3000);
        return;
    }
    // Define the correct answer function.
    function correct(){
    // display celebration
         $(".correct").html("<p>That's right! The next question will begin in three seconds.</p>");
    // after three seconds call for the next question.
        currentQuestion++;
        setTimeout(displayCurrentQuestion, 3000);
        return;
    }
    // Define the wrong answer function.
    function incorrect(){
    // display anti-celebration
        $(".incorrect").html("<p>That's incorrect. The next question will begin in three seconds.</p>");
    // after three seconds call for the next question
        currentQuestion++;
        setTimeout(displayCurrentQuestion, 3000);
        return;
    }
    // Listen to and judge the responses.
    
    
    // Detect and announce the end of the game.
    
    
}); /*END OF DOC READY */
















