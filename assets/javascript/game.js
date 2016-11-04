$(document).ready(function(){

//Create a timer for the questioner that can be triggers automatically and manually.
//Start by creating variables for the timers. One is the counter functionality. One is a locally defined variable for the limit.
var counter = setInterval(countDown,1000);
var count = 30;

	// Enable manual restart of the timer.
	$(".starter").on("click", function(){
		count=31;
		$('.counter').text(count);
		countDown();
	});
	// Define the count down function
	function countDown(){
		count--;
		if (count <= 0) {
			// stop the counter
			clearInterval(counter);
			$('.counter').text('30');
			// run the timeout function
			//timeOut();
			return;
		} else {
			$('.counter').html(count);
		}
    }
    // The stop function
    //function timeOut(){
        
        
        // display the timeout message for three seconds.        
    //}
    countDown();














}); /*END OF DOC READY */
















