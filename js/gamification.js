class Question {
    constructor(backId, id, questionText, options) {
        this.backId = backId;
        this.id = id;
        this.questionText = questionText;
        this.options = options;
    }
}

class QuestionOption {
    constructor(optionText, loadNextId) {
        this.optionText = optionText;
        this.loadNextId = loadNextId;
    }
}

class Result {
    constructor(backId, id, resultTitle, resultText) {
        this.backId = backId;
        this.id = id;
        this.resultTitle = resultTitle;
        this.resultText = resultText;
    }
}

var questions = [];
var results = [];

var currentItem;

$( document ).ready(function() {

    $('.selectMenu').change(function() {
        var selectedIndex = $( ".selectMenu option:selected" ).index();
        if (selectedIndex != 0) {
            $('#nextButton').show();
        } else {
            $('#nextButton').hide();
        }
    });

    $('#backButton').click(function() {
        loadNext(currentItem.backId);
    });

    $('#nextButton').click(function() {
        var selectedIndex = $( ".selectMenu option:selected" ).index();
        if (selectedIndex != 0) {

            var nextId = currentItem.options[selectedIndex-1].loadNextId;

            loadNext(nextId);
        }
    });

    loadAllData();
    loadNext("q1");
});

function loadNext(id) {

    if (id.charAt(0) == 'q') { //is a question
        $.each(questions, function(index, question) {
            if (question.id == id) {

                currentItem = question;

                //hide text
                $('#results').hide();
                $('.select').show();
                
                $('#nextButton').hide();
                if (currentItem.backId == "") {
                    $('#backButton').hide();
                } else {
                    $('#backButton').show();
                }

                //set question text
                $('#questionResultText').text(question.questionText);
    
                //set options
                setOptions(question.options);
            }
        });
    } else { //is a result
        $.each(results, function(index, result) {

            if (result.id == id) {

                currentItem = result;

                //hide selector
                $('#results').show();
                $('.select').hide();


                $('#nextButton').hide();
                $('#backButton').show();


                //set result title
                $('#questionResultText').text(result.resultTitle);
    
                //set result text
                $('#results').text(result.resultText);
            }
        });
    }
}


function loadQuestion(id) {
    $.each(questions, function(index, question) {

        if (question.id == id) {
            //set question text
            $('#questionResultText').text(question.questionText);

            //set options
            setOptions(question.options);
        }
    });
}

function setOptions(questionOptions) {
    var selectMenu = $(".selectMenu");
    selectMenu.empty();

    var option = new Option(0, "Choose an option:", true, true);
    option.disabled = true;
    $(option).html("Choose an option:");
    selectMenu.append(option);

    $.each(questionOptions, function(index, questionOption) {
        var option = new Option(index + 1, questionOption.optionText);
        $(option).html(questionOption.optionText);
        selectMenu.append(option);
    });
}







function loadAllData() {
    //load all questions
    var q1 = new Question(
        "",
        "q1",
        "What enviroment are you considering implementing gamification?",
        [
            new QuestionOption("Workplace", "r1"), 
            new QuestionOption("Classroom", "q2"),
            new QuestionOption("App / Website / Digital Service", "q3")
        ]
    );
    questions.push(q1);

    var q2 = new Question(
        "q1",
        "q2",
        "Is the learning style based on?",
        [
            new QuestionOption("Memorization (key terms, concepts, theory)", "r2"), 
            new QuestionOption("Application Based (math, applying concepts, critical thinking)", "r3")
        ]
    );
    questions.push(q2);
    
    var q3 = new Question(
        "q1",
        "q3",
        "Will this be:",
        [
            new QuestionOption("Primary - implemented by organization, central hub, used very regularly", "q4"), 
            new QuestionOption("Secondary - used as support, accessed on need by need basis", "r4")
        ]
    );
    questions.push(q3);

    var q4 = new Question(
        "q3",
        "q4",
        "Is the user trying to achieve a long term goal?",
        [
            new QuestionOption("Yes", "r5"), 
            new QuestionOption("No", "r6")
        ]
    );
    questions.push(q4);


    //load all results
    var r1 = new Result(
        "q1",
        "r1",
        "The workplace is not the best enviroment for gamification.",
        "tell story of Disney"
    );
    results.push(r1);

    var r2 = new Result(
        "q2",
        "r2",
        "Memorization in the classroom is great for gamification!",
        "Discuss existing tools (Quizlet, Duolingo, etc.)"
    );
    results.push(r2);

    var r3 = new Result(
        "q2",
        "r3",
        "Application based learning is not the best use for gamification.",
        "Could be a good way to review, but is not good for learning. Need to find research supporting this"
    );
    results.push(r3);

    var r4 = new Result(
        "q3",
        "r4",
        "Secondary applications are not the best use for gamification.",
        "give example of Khan Academy"
    );
    results.push(r4);

    var r5 = new Result(
        "q4",
        "r5",
        "Gamification is great for making long term goals attainable!",
        "cite study about fitness apps"
    );
    results.push(r5);
    
    var r6 = new Result(
        "q4",
        "r6",
        "Achieving short term goals / tasks is not the best fit for gamification.",
        "Could be a good way to review, but is not good for learning. Need to find research supporting this"
    );
    results.push(r6)
    
}