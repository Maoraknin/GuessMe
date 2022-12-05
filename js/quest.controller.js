'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(init)
$('.btn-start').click(onStartGuessing)
$('.btn-yes').click({ ans: 'yes' }, onUserResponse)
$('.btn-no').click({ ans: 'no' }, onUserResponse)
$('.btn-add-guess').click(onAddGuess)
$('.start-again').click(onRestartGame)

function init() {
  console.log('Started...')
  createQuestsTree()
}

function onStartGuessing() {
  // TODO: hide the game-start section
  $('.game-start').hide()

  renderQuest()
  
  // TODO: show the quest section
  $('.quest').show()
}

function renderQuest() {
  // TODO: select the <h2> inside quest and update
  // its text by the currQuest text
  const currQuest = getCurrQuest()
  console.log(currQuest);
  $('h2').text(currQuest.txt)
}

function renderAlert(){
  $('.alert-container').html(`<div class="alert alert-primary alert-dismissible fade show" role="alert">
  <strong>You did it!</strong> lets go again.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`)
}

function onUserResponse(ev) {
  var res = ev.data.ans
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      console.log('here');
      $('h2').text('Yes, i knew it!')
      renderAlert()
      $('.quest').hide()
      $('.start-again').show()
      // TODO: improve UX
      $('img').attr('src','img/layout/right.png')
    } else {
      $('h2').text('Teach Me!')
      $('img').attr('src','img/layout/wrong.png')
      // TODO: hide and show new-quest section
      $('.quest').hide()
      $('.new-quest').show()

    }
  } else {
    // TODO: update the lastRes global var
   console.log(' gCurrQuest[res]:', gCurrQuest[res])
   console.log('res:',res)
    gLastRes = res
    moveToNextQuest(res)
    renderQuest()
  }
}


function onAddGuess(ev) {
  ev.preventDefault()
  // TODO: Get the inputs' values
  var newGuess = $('#newGuess').val()
  var newQuest = $('#newQuest').val()
  // TODO: Call the service addGuess
  addGuess(newQuest, newGuess, gLastRes)

  onRestartGame()
}

function onRestartGame() {
  $('img').attr('src','img/layout/genie.png')
  $('.new-quest').hide()
  $('.start-again').hide()
  $('.game-start').show()
  $('.quest').hide()
  gLastRes = null
  restartGame()
  $('h2').text('Think of Someone...')
}
