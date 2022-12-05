const KEY = 'GuessWhoDB'

var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;


function createQuestsTree() {
    gQuestsTree = loadFromStorage(KEY)

    gQuestsTree = createQuest('Male?');
    gQuestsTree.yes = createQuest('Gandi');
    gQuestsTree.no = createQuest('Rita');
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest
    gCurrQuest = gCurrQuest[res]
    _saveBookssToStorage()

}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    var newQuest = createQuest(newQuestTxt)
    newQuest.yes = createQuest(newGuessTxt)
    newQuest.no = gCurrQuest

    gPrevQuest[lastRes] = newQuest

    gCurrQuest = gQuestsTree;
    _saveBookssToStorage()

}

function getCurrQuest() {
    return gCurrQuest
}

function _saveBookssToStorage() {
    saveToStorage(KEY, gQuestsTree)
}