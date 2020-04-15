const numDivs = 36;
const maxHits = 10;

let hits = 0;
let fails = 0;
let firstHitTime = 0;



function round() {
  $('.target').removeClass('target');
  $('.miss').removeClass('miss')
  $('#button-start').hide();
  
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits+1)
  if (hits === maxHits) $(divSelector).text(1)
  if (hits === 1) {firstHitTime = getTimestamp();}
  if (hits === maxHits) {endGame();
  }
}

function endGame() {
  $('.game-field').hide();
  
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#win-message").removeClass("d-none");
  $('#button-start').show();
}

function handleClick(event) {
  let target = $(event.target)
  if (target.hasClass("target")) {
    hits = hits + 1;
    target.text('');
    round();
  } else {
    fails +=1
    $(target).addClass('miss');
  }
}


function init() {
    round();
    $('.game-field').click(handleClick);
    $('#button-start').click(function() {
      hits = 0;
      fails = 0;
      firstHitTime = 0;
      $('.game-field').show();
      $('#win-message').addClass("d-none");
      $('#button-start').hide();

  });
}

$(document).ready(init);