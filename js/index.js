(function() {
  var questions = [{
    question: "What does HTML stand for?",
    choices: [" Home Tool Markup Language", " Hyper Text Markup Language", " Hyperlinks and Text Markup Language", " Hyper Tool Markup Language"],
    correctAnswer: 1
  }, {
    question: " Who is making the Web standards?",
    choices: [" Mozilla", " Google", " Microsoft", " The World Wide Web Consortium"],
    correctAnswer: 3
  }, {
    question: "A webpage displays a picture. What tag was used to display that picture?",
    choices: [" picture", " image", " img", " src"],
    correctAnswer: 2
  }, {
    question: "What does vlink attribute mean?",
    choices: [" visited link", " virtual link", " very good link", " active link"],
    correctAnswer: 0
  }, {
    question: "Marquee is a tag in HTML to",
    choices: [" Mark the list of items to maintaininqueue", " Mark the text so that it is hidden in browser", " Display text with scrolling effect", " None of above"],
    correctAnswer: 2
  }, {
	question: "In HTML document the tags",
	choices: [" Should be written in upper case", " Should be written in lower case", " Should be written in propercase", " Can be written in both uppercase or lowercase"],
	correctAnswer: 3
  }, {
	question: "Choose the correct HTML tag for the smallest size heading?",
	choices: [" head", " header", " h6", " h1"],
	correctAnswer: 2
  }, {
	question: "WYSIWYG Stand for?",
	choices: [" When You Start Is When You Go", " What You See Is What You Gain", " What You See Is What You Get", " None of the Above"],
	correctAnswer: 2
  }, {
	question: "The <\ title >\  tag belongs where in your HTML ?",
	choices: [" Body", " Head", " Arm", " None of Above"],
	correctAnswer: 1
  }, {
	question: "HTML is considered as _________ language.",
	choices: [" Markup Language", " Higher Level Language", " OOP Language", " Programming Language"],
	correctAnswer: 0
  }, {
	question: "HTML tags are used to describe document ___________.",
	choices: [" Definition", " Language", " Content", " None of these"],
	correctAnswer: 2
  }, {
	question: "HTML program is saved using ____________ extension.",
	choices: [" .htnl", " .htl", " .hml", " .html"],
	correctAnswer: 3
  }, {
	question: "Who was the primary author of HTML (Hyper Text Markup Language).?",
	choices: [" Brendan Eich", " Tim Berners-Lee", " Google Inc.", " Sabeer Bhatiya"],
	correctAnswer: 1
  }, {
	question: "HTML was firstly proposed in year _______.",
	choices: [" 1995", " 2000", " 1990", " 1980"],
	correctAnswer: 2
  }, {
	question: "<\ b >\  tag makes the enclosed text bold. What is other tag to make text bold?",
	choices: [" <\ dar >\ ", " <\ strong >\ ", " <\ black >\ ", " <\ emp>\ "],
	correctAnswer: 1
  }, {
	question: "How can you make a bulleted list?",
	choices: [" <\ list >\ ", " <\ nl >\ ", " <\ ul >\ ", " <\ ol >\ "],
	correctAnswer: 2
  }, {
	question: "HTML documents are saved in",
	choices: [" ASCII text", " Machine language codes", " Special binary format", " None of above"],
	correctAnswer: 0
  }, {
	question: "To create a blank line in your web page",
	choices: [" press Enter two times", " press Shift + Enter", " insert <\ BLINE >\ ", " insert <\ BR >\ tag"],
	correctAnswer: 3
  }, {
	question: "Which of the following are commonly found on web pages?",
	choices: [" internet", " intranet", " hyperlinks", " All of the above"],
	correctAnswer: 2
  }, {
	question: "What is a FTP program used for?",
	choices: [" Transfer files to and from an Internet Server", " Designing a website", " Connecting to the internet", " None of the above"],
	correctAnswer: 0
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();