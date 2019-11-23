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
                $('#results').text(result.resultText + results[results.length - 1]);
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
        "In which enviroment are you considering implementing gamification?",
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
        "What is the learning style based on?",
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
        "Professor of information technology Kai Reimer discusses how Gamification is disrespectful of employees. Laundry workers at Disney were upset when a real-time productivity leaderboard was implemented in 2008. Not only was the system called “the electronic whip” by employees, but additionally injuries occurred, bathroom breaks were skipped, and the environment was hostile. Reimer believes employees will not fall for the gimmicks of gamification and in result, they will be even more “cynical” about how the company treats them. “...Does this not amount to trickery? – “You don’t want to do this task, so I make you play a game in the course of which you will do it anyway?”” (Kai Reimer, 2014)\n\nAdditionally, Riemer cites on his blog a study by Gallup, an analytics and advisory company founded in 1935, that conducted research showing about 70% of employees are disengaged at their job. Riemer wants disengagement to be fixed rather than trying to “cover it up” with gamification. To re-engage employees he states that workers need to be shown they have an important role in a larger organization, and need to see the vision of the entire company. Without fixing these underlying issues “...no gamification will ultimately save the day.” (Kai Riemer, 2014)\n\nRiemer is absolutely correct that gamification should not be used to cover up the real problem. It would be nice if it was that easy but the effects will soon wear off resulting in a situation worse than the original. When employees have a passion and a purpose they can do immeasurably more than possible by playing a simple game. In my opinion, Disney could have better spend their money and time by creating culture among the employees and their leaders. Personally, when I have gotten to connect with my coaches, teachers, or bosses I feel a responsibility to not let them down."
    );
    results.push(r1);

    var r2 = new Result(
        "q2",
        "r2",
        "Memorization in the classroom is great for gamification!",
        "Researchers of the Universidad de Valladolid and Universitat Autònoma de Barce'lona added to the debate with their findings. They used Kahoot, a popular classroom quiz game, to assist in teaching and reviewing for a Chemistry course. Three main benefits were observed: i) students were more interested due to it being an enjoyable activity; ii) students were required to reflect on what they have learned in order to play; iii) teachers and students received immediate feedback on what was learned. The class that incorporated Kahoot had final exam scores ~25%  higher than the previous years class that did not use Kahoot.\n\nTwo additional popular education tools are Duolingo and Quizlet. Duolingo has gamified learning new languages by implementing levels, rewards, and social interaction. It is easy to see that the entire experience has been created with gamification in mind, which gives the levels, points, etc. value. Amalia Nelson, a teacher and learning specialist at Barton Middle School in Texas, has noticed huge benefits of using Quizlet for her students:\n\n“Now that the basic information is in the study set, the academic vocabulary and discussion in class has increased. We are able to dive deeper into the content and, therefore, students are retaining more and at a quicker rate.” (Amalia Nelson, 2017)\n\nHaving great tools will do a lot for a student, but motivation is far more important. A study about motivation by the National Research Council has found that more than 40 percent of high school students are unmotivated (Engaging Schools, 2004). A series of papers from the Center on Education Policy (CEP) at the George Washington University conclude from this statistic that students will not benefit from better schools, curriculum, or teaching if the motivation problem is not fixed. The CEP notes that students who are motivated, among other reasons, can see a direct link between their actions and outcomes. This looks like something gamification could improve because positions, results, and rankings all fluctuate quickly in games allowing students to see a direct link between their actions and outcomes. However, a paper titled “Impacts of gamification on intrinsic motivation” written by Camilla Dahlstrøm discusses how gamification can actually harm intrinsic motivation. The author concludes that whether gamification increases or decreases intrinsic motivation depends on individual factors."
    );
    results.push(r2);

    var r3 = new Result(
        "q2",
        "r3",
        "Application based learning is not the best use for gamification.",
        "Using gamification for memorization purposes makes the mundane task easier and more fun to accomplish. Because comprehension based topics require the student to be genuinely motivated gamification should not be used, but it could be a fun way to review!\n\nHaving great tools will do a lot for a student, but motivation is far more important. A study about motivation by the National Research Council has found that more than 40 percent of high school students are unmotivated (Engaging Schools, 2004). A series of papers from the Center on Education Policy (CEP) at the George Washington University conclude from this statistic that students will not benefit from better schools, curriculum, or teaching if the motivation problem is not fixed. The CEP notes that students who are motivated, among other reasons, can see a direct link between their actions and outcomes. This looks like something gamification could improve because positions, results, and rankings all fluctuate quickly in games allowing students to see a direct link between their actions and outcomes.\n\nA paper titled “Impacts of gamification on intrinsic motivation” written by Camilla Dahlstrøm discusses how gamification can actually harm intrinsic motivation. The author concludes that whether gamification increases or decreases intrinsic motivation depends on individual factors (Camilla Dahlstrøm, 2017)."
    );
    results.push(r3);

    var r4 = new Result(
        "q3",
        "r4",
        "Secondary applications are not the best use for gamification.",
        "Khan Academy is an example of where gamification has been implemented poorly. Khan Academy provides fantastic tutorials covering a vast number of subjects from kindergarten math to entrepreneurship. The otherwise great experience has been weakened by the complicated and distracting reward system. Featuring badges, streaks, and far too many badges the system does not entice one to learn further.\n\nIn this example the students school is “primary” and the Khan Academy website is “secondary.” Anything gained through the website’s gamification implementation (ex: points) does not have a direct effect on school. Therefore, the site’s gamification becomes meaningless and does not result in one watching more videos or taking additional quizzes."
    );
    results.push(r4);

    var r5 = new Result(
        "q4",
        "r5",
        "Gamification is great for making long term goals attainable!",
        "An article in the International Journal of Research in Marketing stresses that gamification can bring significant benefits when time-based behavioral changes need to be made. In their study, the writers asked interviewees how they felt about gamified health/fitness apps. Many interviewees expressed how solid goals kept them using the app. “It gives me a certain goal. I want to achieve it. Otherwise, I kind of feel bad about it. Having a clear goal helps me a lot. It really does motivate me”. Encouraging users to perform planned activities makes long term goals feasible and trackable. This study reveals that gamification can make an ordinarily difficult commitment based task more enjoyable and easy to accomplish.\n\nI have personally used the sharing & competitions features capable with an Apple Watch that made a long term goal of improved fitness fun! My brother and I were able to share our daily “rings” and have weekly competitions to see who would have the most activity. This not only motivated me to go and workout, but also to push myself further during a workout. The Apple Watch also has badges / trophies and daily move, exercise, and stand goals. While the badges are fun to recieve I am not motivated by them. However, the three daily goals do persuade me to be more active. As a competitive person, being able to share and compare my stats with others is a great feature that Apple implemented very well. Badges and trophies, for me at least, do not have enough value or real world connection to make them meaningful."
    );
    results.push(r5);

    var r6 = new Result(
        "q4",
        "r6",
        "Achieving short term goals / tasks is not the best fit for gamification.",
        "Khan Academy is an example of where gamification has been implemented poorly. Khan Academy provides fantastic tutorials covering a vast number of subjects from kindergarten math to entrepreneurship. Featuring badges, streaks, and far too many badges the system does not entice one to learn further.\n\nKhan Academy is accessed on a need by need basis which makes the current gamification implementation distracting when a user wants to get help quickly. For example, a student who is working on homework may need help on a concept. After watching a video related to their homework they will not want to watch more videos or taking additional quizzes, but rather complete the rest of their initial task."
    );
    results.push(r6)

    results.push("\n\n\n\nGoals of Gamification:\n“On the one hand, we have disengaged people; on the other hand, we have a method that engages people. This looks like a perfect match, doesn’t it?” (Kai Reimer, 2014)\n\nIn some cases this is true, and if carefully applied the results can be very rewarding! However, if applied to the wrong situation without determining the appropriateness the results can be negative in the long term. A continual goal that schools, workplaces, and companies should work towards is fostering an environment where users push themselves and are motivated to do so. If gamification cannot help achieve this goal in a particular situation, then other methods should be pursued.")
    
}