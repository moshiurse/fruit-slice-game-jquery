var playing = false;
var score;
var trialsLeft;
var randomFruits = ['apple','banana','cherries','grapes','mango','orange','peach','pear','watermelon'];
var step;
var action;
$(function(){
  // check if playing or starting
    $('#startreset').click(function(){
       if(playing){
          location.reload();

       }else{

         playing = true;
         score = 0;
         $('#scoreValue').html(score);

         $('#trialsLeft').show();
          trialsLeft = 3;

          addHeart();

          $('#gameOver').hide();

          $('#startreset').html('Reset Game');

          startFruitAction();
       }     
    });


    $('#fruit1').mouseover(function() {
      score++;
      $('#scoreValue').html(score);

      $('#slicesound')[0].play();

      clearInterval(action);
      $('#fruit1').hide('explode', 500)

      setTimeout(startFruitAction , 500);
    })

function addHeart() {
  $('#trialsLeft').empty();
  for(i=0; i< trialsLeft; i++){
    $('#trialsLeft').append("<img src='image/heart.png' class='heart'/>");
  }
}

function startFruitAction() {
  $('#fruit1').show();

  chooseFruit();
  $('#fruit1').css({
    'left': Math.round(550*Math.random()),
    'top': -50
  });

  step = 1+ Math.round(5*Math.random());

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

function chooseFruit() {
  $('#fruit1').attr('src', 'image/'+ randomFruits[Math.round(8*Math.random())] +'.png');
}

function stopFruitsAction() {
  clearInterval(action);
  $('#fruit1').hide();
}

});