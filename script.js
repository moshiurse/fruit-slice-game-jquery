var playing = false; //check is playing or not
var score; //global score for updating score
var trialsLeft; // Count trial
// Random fruits name array
var randomFruits = ['apple','banana','cherries','grapes','mango','orange','peach','pear','watermelon'];
var step; //count ste time
var action; //action to move fruits
$(function(){
  // check if playing or starting
    $('#startreset').click(function(){
      //check is playing or not
       if(playing){
          location.reload();

       }else{

         playing = true;
         score = 0; //init score before start
         $('.scoreValue').html(score); //update scorebox

         $('#trialsLeft').show(); //show trial
          trialsLeft = 3; //set number of trial

          addHeart(); //function to add heart icon

          $('#gameOver').hide(); //hide gameover banner when playing

          $('#startreset').html('Reset Game'); //show reset text to button

          startFruitAction(); //function for main gameplay
       }     
    });

// mouseover event to detect slice
    $('#fruit1').mouseover(function() {
      score++; //increment score

      $('.scoreValue').html(score); //update score

      $('#slicesound')[0].play(); //play audio when slice

      clearInterval(action); //clear action
      $('#fruit1').hide('explode', 500); //hide after slice

      setTimeout(startFruitAction , 500); //action start for 500 ms
    })

    //add icon for trial
function addHeart() {
  $('#trialsLeft').empty();//emtry trial befor append
  for(i=0; i< trialsLeft; i++){
    $('#trialsLeft').append("<img src='image/heart.png' class='heart'/>");
  }
}

function startFruitAction() {
  $('#fruit1').show(); 

  chooseFruit(); //choose rando fruit
  //add css for set fruit position
  $('#fruit1').css({
    'left': Math.round(550*Math.random()),
    'top': -50
  });

  step = 1+ Math.round(5*Math.random()); //crete step to calculate speed

  action = setInterval(function () {
    $('#fruit1').css('top', $('#fruit1').position().top + step);  

    if($('#fruit1').position().top > $('#fruitsContainer').height()){
        if(trialsLeft > 1){
            $('#fruit1').show();

            chooseFruit();
            $('#fruit1').css({
              'left': Math.round(550*Math.random()),
              'top': -50
            });
          
            step = 1+ Math.round(5*Math.random());

            trialsLeft--;

            addHeart();
        }else{

          playing = false;
          $('startreset').html('Start Game');
          $('#gameOver').show();

          $('#gameOver').html('<p>Game Over!</p><p>Your Score is  '+ score +'</p>');
          $('#trialsLeft').hide();
          stopFruitsAction();

        }
    }

  },10);

}
//choose random fruit
function chooseFruit() {
  $('#fruit1').attr('src', 'image/'+ randomFruits[Math.round(8*Math.random())] +'.png');
}

//stop action
function stopFruitsAction() {
  clearInterval(action);
  $('#fruit1').hide();
}

});