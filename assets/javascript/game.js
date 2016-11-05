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
    var correctAnswers = 0;
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
        }]; /*END OF questions ARRAY of OBJECTS */
    //display the first question
    displayCurrentQuestion();
   
    //define the display current questions function
    function displayCurrentQuestion() {
        //clear the timeout between questions.
        clearTimeout(stop);
        // call the countDown function.
        countDown();
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
        //I used to call the countDown function here
    }
    // Define the timeout function
    function timeOut(){    
        // display the timeout message.
        $(".timeout").html("<p>You timed out. The next question will begin in three seconds.</p>");
        // after three seconds call for the next question.
        clearInterval(counter);
        currentQuestion++;
        if (currentQuestion <= 4) {
            var stop = setTimeout(displayCurrentQuestion, 3000);
        } else if (currentQuestion > 4) {
            endQuiz=true;
            displayScore();
        } else {
            restart();
        }
    }
        // Define the correct answer function.
    function correct(){
        // display celebration
         $(".correct").html("<p>That's right! The next question will begin in three seconds.</p>");
        // after three seconds call for the next question.
        clearInterval(counter);
        correctAnswers++;
        currentQuestion++;
        if (currentQuestion <= 4) {
            var stop = setTimeout(displayCurrentQuestion, 3000);
        } else if (currentQuestion > 4) {
            endQuiz=true;
            displayScore();
        } else {
            restart();
        }
    }
    // Define the wrong answer function.
    function incorrect(){
        // display anti-celebration
        $(".incorrect").html("<p>That's incorrect. The next question will begin in three seconds.</p>");
        // after three seconds call for the next question
        clearInterval(counter);
        currentQuestion++;
        if (currentQuestion <= 4) {
            var stop = setTimeout(displayCurrentQuestion, 3000);
        } else if (currentQuestion > 4) {
            endQuiz=true;
            displayScore();
        } else {
            restart();
        }
    }
    // Listen to and judge the responses.
    $(".responses").on("click", function(){
        if(endQuiz=true){
            //create a variable in memory to read the value of the clicked item. Find the input tag with the state checked and get the value, which matches the index in the array of choices.
            var value = $("input[type='radio']:checked").val();
            if (value == questions[currentQuestion].correctAnswer) {
                correct();
            } else if (value !== questions[currentQuestion].correctAnswer) {
                incorrect();
            } else {
                $(document).find(".quizMessage").text("Please select an answer");
            }
        } else {
            displayScore();
        }
    });
    
    // Announce the end of the game and display score.
    function displayScore() {
        $(".message").text("Game Over! You scored: " + correctAnswers + " out of " + questions.length);
        $(".message").show();
    }
    //Allow user to restart    
    function restart() {
        currentQuestion = 0;
        correctAnswers = 0;
        $(document).find(".result").hide();
        displayCurrentQuestion();
    }
    $(".play-again").on("click", restart());
    
}); /*END OF DOC READY */
















