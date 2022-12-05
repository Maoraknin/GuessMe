'use strict'

const QUEST_TREE_KEY = 'quest-tree'

var gQuestsTree
var gCurrQuest
var gPrevQuest = null

function createQuestsTree() {
  gQuestsTree = loadFromStorage(QUEST_TREE_KEY)
  if(!gQuestsTree){
    gQuestsTree = createQuest('Male?')
    gQuestsTree.yes = createQuest('Gandhi')
    gQuestsTree.no = createQuest('Rita')
    saveToStorage(QUEST_TREE_KEY, gQuestsTree)
  }
    gCurrQuest = gQuestsTree
    gPrevQuest = null
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  console.log(node);
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  console.log('res:',res)
  // TODO: update the gPrevQuest, gCurrQuest global vars
  gPrevQuest = gCurrQuest
  gCurrQuest = gPrevQuest[res]
  
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // TODO: Create and Connect the 2 Quests to the quetsions tree
  var newQuest = createQuest(newQuestTxt)
  newQuest.yes = createQuest(newGuessTxt)
  newQuest.no = gCurrQuest
  gPrevQuest[lastRes] = newQuest

  saveToStorage(QUEST_TREE_KEY, gQuestsTree)
}

function getCurrQuest() {
  return gCurrQuest
}

function restartGame(){
  gCurrQuest = gQuestsTree
  gPrevQuest = null
}
