//VARIABLES
var wins=0;
var losses=0;
var unanswered=0;
var questionBlock = $("#questionBlock");
var timerBlock = $("#timer");
var counter=11;
var arrCount = 0;
var timer;


//Hides trivia questions
questionBlock.hide();


//Displays questions after clicking "play"
$("#play").click(function(){

	$("#instructions").hide();
	questionBlock
.show();

	displayQuestions();
	myTimer();

});


$(document).on("click", ".choice", function(event){

	selectedChoice = $(this).text();

	if (selectedChoice===correctAnswersArr[arrCount]) {
		clearInterval(timer);
		correctAnswer();
	} else {
		clearInterval(timer);		
		wrongAnswer();
	}
});

$(document).on("click", ".reset", function(event){

	playAgain();
});



//Questions array
var allQuestionsArr = [
 	{question: 
 		"Which player once scored 37 points in a quarter?",
 	choices: 
		 ["Monta Ellis", "Klay Thompson", "Steph Curry", "Kevin Durant"]
 	},

	{question: 
 		"Which player got suspended for injuring himself in a moped accident?",
 	choices: 
 		["Steph Curry", "Monta Ellis", "Matt Barnes", "Draymond Green"]
 	},

 	{question: 
 		"Which player became the first unanimous MVP in league history?",
 	choices: 
 		["Klay Thompson", "Draymond Green", "Kevin Durant", "Steph Curry"]
 	},

 	{question: 
 		"Which player got suspended in the 2016 Finals for kicking an opposing player in the groin?",
 	choices: 
 		["Andrew Bogut", "David West", "Draymond Green", "Matt Barnes"]
 	},

 	{question: 
 		"Which player was part of the We Believe team as well as the 2017 championship team?",
 	choices: 
 		["Baron Davis", "Steph Curry", "Matt Barnes", "Andris Biedrins"]
     }
     
];


var correctAnswersArr = ["Klay Thompson", "Monta Ellis", "Steph Curry", "Draymond Green", "Matt Barnes"];


function displayQuestions() {
	
	$(questionBlock
	).html(triviaContent(arrCount));

}


function questionCount() {
	if (arrCount < 4) {
		arrCount++;
		displayQuestions();
		counter=11;
		myTimer();
	} else {
		scoreboard();
	}
}


//Timer for each question
function myTimer() {

	timer = setInterval(tenSeconds, 1000);


	function tenSeconds() {
		
		if (counter === 0) {
			clearInterval(timer);
			noAnswer();		
		}

		if (counter > 0) {
			counter--;
		}

		$("#timer").html("<p>Timer: " + counter + "</p>");
	}

}


function noAnswer() {
	unanswered++;
	$(questionBlock
	).html("<p>Time is up! The correct answer is</p>" + correctAnswersArr[arrCount]);

	setTimeout(questionCount, 3000);
}


function correctAnswer() {
	wins++;
	$(timerBlock).html("");	
	$(questionBlock
	).html("<p>Nice shot!</p>");
	setTimeout(questionCount, 3000);
}

function wrongAnswer() {
	losses++;
	$(timerBlock).html("");		
	$(questionBlock
	).html("<p>You missed! The answer is</p>" + correctAnswersArr[arrCount]);
	setTimeout(questionCount, 3000);	
}

function scoreboard() {
	$(timerBlock).html("");		
	$(questionBlock
	).html("<p>Good Game! </p><p>Wins: " + wins + "</p><p>Losses: " + losses + "</p><p>Unanswered: " + unanswered + "</p><button class='reset'>Play again!</button>");	
}

function playAgain() {
	arrCount = 0;
	wins = 0;
	losses = 0;
	unanswered = 0;
	counter = 11;
	displayQuestions();
	myTimer();
}



//Trivia questions 
function triviaContent(x) {
	var allQuestions = allQuestionsArr[x];
	var allChoices = allQuestions.choices;
	var eachQuestion = allQuestions.question;
	$(questionBlock
	).html("<p>"+ eachQuestion + "</p>");
	var buttonContainer = $("<div>");

	for (var i=0; i<allChoices.length; i++) {
		var myButton = $("<button>");
		myButton.addClass("choice");
		myButton.attr("data-name", allChoices[i]);
		myButton.text(allChoices[i]);
		buttonContainer.append(myButton);
		$(questionBlock
		).append(myButton);
	}
}
