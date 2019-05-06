function go(){

    var amount=document.getElementById("amount").value;
    var category=document.getElementById("category").value;
    var difficulty=document.getElementById("difficulty").value;


    $.ajax({
        url: "https://opentdb.com/api.php?amount=" + amount + "&category=" + category + "&difficulty=" + difficulty + "&type=multiple",
        dataType: "json",
        success: printQuestions
    });

}

function processResults(data) {

}

function buildAnswers(question){
    // console.log(question.correct_answer);
    // console.log(question.incorrect_answers);

    var allAnswers = question.incorrect_answers;

    allAnswers.push(question.correct_answer);

    //console.log(allAnswers)

    allAnswers = shuffle(allAnswers);

    //console.log(allAnswers)

    return allAnswers;

    //get correct answer
    //get array of wrong answers
    //put them into a single array
    //call arr.shuffle()
    //return shuffled array with 1 correct and 3 incorrect



}

function grader(){

    //go through every question

    //compare every answer to the correct answer

    var score=0;

    //console.log(questions);

    for(var q = 0; q < questions.length;q++) {

        var radios = document.getElementsByName('question' + q);

        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                //console.log(radios[i].value);
                if(questions[q].correct_answer == radios[i].value) {
                    console.log("CORRECT!!!!")
                    score++;
                    console.log(score);
                }
            }
        }

    }

    document.getElementById("score").innerHTML += score + "/" + questions.length;

}



function printQuestions(data){
    questions = data.results;
    //console.log(data);
    var html = "<table border = '1'>";
    for(var i=0; i < questions.length; i++){


        var answerArray = buildAnswers(questions[i]);

        html += "<tr>";
        html += "<td>" + questions[i].question + "</td>";
        html += "<td>";

        for(var j =0; j<answerArray.length;j++) {
            console.log(questions[i].correct_answer);
            html+= "<input type='radio' name='question" + i + "' value='" + answerArray[j] + "'>";
            html+= answerArray[j]  + "<br>"
        }

        html += "</td>"


        html += "</tr>";
    }
    html += "</table>";
    document.getElementById("myDiv").innerHTML = html;
}


function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}



//function listResults(data){
    //var songs = data.results;
    //var html = "<table border = '1'>";
    //for (var i=0; i < songs.length; i++){
        //html += "<tr>";
        //html += "<td>" + songs[i].artistName + "</td>";
        //html += "<td>" + songs[i].collectionName + "</td>";
        //html += "<td>" + songs[i].trackName + "</td>";
        //html += "<td>" + "Play Song:" + "</td>"
        //html += "<td><audio controls='true' src=" + songs[i].previewUrl + " id= audio " + "</td>";
        //html += "<td> <img src='" + songs[i].artworkUrl100 + "'</td>";
        //html += "</tr>";
    //}
    //html += "</table>";
    //document.getElementById("myDiv").innerHTML = html;
//}
