// Load application styles
import 'styles/index.less';

// ================================
// START YOUR APP HERE
// ================================

function DataMiner() {
  this.input = document.querySelector('.textInput');
  this.chart = document.querySelector('.dataChart');
  this.wordsWrapper = document.querySelector('.wordsWrapper');
  this.singleUsedWords = document.querySelector('.singleUsedWords');
}

DataMiner.prototype.makeInputReact = function() {

  this.input.addEventListener('keydown', function() {
    this.judgeDatas();
  }.bind(this));
};

DataMiner.prototype.judgeDatas = function() {
  var stringData = this.input.value;
  var characters = stringData.split('');
  var words = stringData.split(' ');
  var characterLength = document.querySelector('.characterLength');

  characterLength.innerText = `length: ${characters.length}`;
  if (document.querySelector('.alertMessage')) {
    document.querySelector('.alertMessage').remove();
    this.wordsWrapper.classList.remove('hide');
  }
  if (characters.length <= 5000) {
    this.wordsWrapper.innerText = '';
    this.filterWords(words);
  } else {
    this.wordsWrapper.classList.add('hide');
    var alertMessage = document.createElement('div');
    alertMessage.classList.add('alertMessage');
    alertMessage.innerText= "please type under 5000...";
    this.chart.appendChild(alertMessage);
  }

  characters.every(function(character) {
    if ((45032 < character.charCodeAt(0) && character.charCodeAt(0) < 55203) ||
    (12593 < character.charCodeAt(0) && character.charCodeAt(0) < 12622) ||
    (12623 < character.charCodeAt(0) && character.charCodeAt(0) < 12643)) {
      this.wordsWrapper.classList.add('hide');
      var alertMessage = document.createElement('div');
      alertMessage.classList.add('alertMessage');
      alertMessage.innerText= "please type only ENGLISH";
      this.chart.appendChild(alertMessage);
      return false;
    } else {
      return true;
    }
  }.bind(this));
};

DataMiner.prototype.filterWords = function(words) {
  var source = [];

  words.forEach(function(word) {
    word = word.trim();
    var lowerCasedWord = word.toLowerCase();
    if ( word[0] === '"' ||
     word[0] === '\'' ||
     word[0] === ':' ||
     word[0] === '-') {
      word = word.slice(1);
    }
    if ( word[word.length-1] === '?' ||
    word[word.length-1] === '"' ||
    word[word.length-1] === '\'' ||
    word[word.length-1] === ',' ||
    word[word.length-1] === '-' ||
    word[word.length-1] === ':' ||
    word[word.length-1] === '.') {
      word = word.slice(0, word.length-1);
    }
    if (lowerCasedWord !== 'am' &&
    lowerCasedWord !== 'is' &&
    lowerCasedWord !== 'the' &&
    lowerCasedWord !== 'a' &&
    lowerCasedWord !== 'are' &&
    lowerCasedWord !== 'were' &&
    lowerCasedWord !== 'to' &&
    lowerCasedWord !== 'of' &&
    lowerCasedWord !== 'you' &&
    lowerCasedWord !== 'you\'re' &&
    lowerCasedWord !== 'your' &&
    lowerCasedWord !== 'it\'s' &&
    lowerCasedWord !== 'you\'ve' &&
    lowerCasedWord !== 'i\'m' &&
    lowerCasedWord !== 'this' &&
    lowerCasedWord !== 'she' &&
    lowerCasedWord !== 'he' &&
    lowerCasedWord !== 'there' &&
    lowerCasedWord !== 'it\'s' &&
    lowerCasedWord !== 'and' &&
    lowerCasedWord !== 'be' &&
    lowerCasedWord !== 'can' &&
    lowerCasedWord !== 'do' &&
    lowerCasedWord !== '' &&
    lowerCasedWord !== 'for' &&
    lowerCasedWord !== 'that' &&
    lowerCasedWord !== 'you\'ll' &&
    lowerCasedWord !== 'for' &&
    // lowerCasedWord !== 'for' &&
    // lowerCasedWord !== 'for' &&
    // lowerCasedWord !== 'for' &&

    lowerCasedWord !== 'was') {
      source.push(word);
    }
  }.bind(this));
  this.countWords(source);
};

DataMiner.prototype.countWords = function(source) {
  var countedWords = {};

  source.forEach(function(word) {
    countedWords[word] ? countedWords[word] += 1 : countedWords[word] = 1;
  });
  this.printDatas(countedWords);
};

DataMiner.prototype.printDatas = function(countedWords) {
  var oftenUsedWords = {};
  var wordsWrapper = this.wordsWrapper;
  var top30Words = [];
  var count30 = 0;

  for (var key in countedWords) {
    if (countedWords[key] >= 2) {
      if (oftenUsedWords[countedWords[key]]) {
        oftenUsedWords[countedWords[key]].push(key);
      } else {
        oftenUsedWords[countedWords[key]] = [];
        oftenUsedWords[countedWords[key]].push(key);
      }
      delete countedWords[key];
    }
  }
  console.log('oftenUsedWords: ', oftenUsedWords);
  console.log('countedWords: ', countedWords);
  console.log('keysOfOftenUsedWords: ', Object.keys(oftenUsedWords));

  for (var key in countedWords) {
    var left = Math.random()*100;
    var top = Math.random()*100;
    var newWord = document.createElement('div');
    newWord.classList.add('words');
    newWord.innerText = key;
    newWord.style = `font-size: 15px; color: gray; left: ${left}%; top: ${top}%; z-index: 1;`
    this.wordsWrapper.appendChild(newWord);
  }

  var frequencyList = Object.keys(oftenUsedWords);

  for (var i = frequencyList.length-1; i >= 0; i--) {
    var thisFrequencyWords = oftenUsedWords[frequencyList[i]];

    for (var j = 0; j < thisFrequencyWords.length; j++) {
      var left = Math.random()*100;
      var top = Math.random()*100;
      var newWord = document.createElement('div');
      var randomColor = this.makeRandomColor();
      var fontSize = 100 * ( frequencyList[i]/ frequencyList[frequencyList.length-1]);
      newWord.innerText =thisFrequencyWords[j];
      newWord.classList.add('words');
      console.log(fontSize);
      this.wordsWrapper.appendChild(newWord);
      if ( i === frequencyList.length-1 && j === 0 ) {
        var newWordWidth = (newWord.offsetWidth / newWord.parentNode.offsetWidth) * 100;
        var newWordHeight = (newWord.offsetHeight / newWord.parentNode.offsetHeight) * 100
        newWord.classList.add('textShadowWhite');
        newWord.style = `font-size: ${130}px; color: ${randomColor}; left: ${50 - (newWordWidth*3)}%; top: ${50 - (newWordHeight*3)}%; z-index: ${i+3};`;
      } else {
        newWord.classList.add('textShadowBlack');
        newWord.style = `font-size: ${fontSize}px; color: ${randomColor}; left: ${left}%; top: ${top}%; z-index: ${i+2};`;
      }
    }




    // if (keys[keys.length-1] && keys[keys.length-1] === key) {
      // newWord.style = `font-size: ${oftenUsedWords[key]*15}px; color: ${randomColor}; left: ${left}%; top: ${top}%; z-index: 5;`
    // }
    // if (keys[keys.length-2] && keys[keys.length-2] === key) {
    //   newWord.style = `font-size: ${oftenUsedWords[key]*15}px; color: ${randomColor}; left: ${left}%; top: ${top}%; z-index: 4;`
    // }
    // if (keys[keys.length-3] && keys[keys.length-3] === key) {
    //   newWord.style = `font-size: ${oftenUsedWords[key]*15}px; color: ${randomColor}; left: ${left}%; top: ${top}%; z-index: 3;`
    // }
    // if (keys[keys.length-4] && keys[keys.length-4] === key) {
    //   newWord.style = `font-size: ${oftenUsedWords[key]*15}px; color: ${randomColor}; left: ${left}%; top: ${top}%; z-index: 3;`
    // }

  }
};

DataMiner.prototype.makeRandomColor = function() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};

var dataMiner = new DataMiner();
dataMiner.makeInputReact();

// function locateRandom(word) {
//   var left = Math.random()*100;
//   var top = Math.random()*100;
//   var width = word.offsetWidth / (wordsWrapper.offsetWidth) * 100;
//   var height = word.offsetHeight / (wordsWrapper.offsetHeight) *100;
//   var location = {};
//
//   for (var i = 0; i < occupiedList.length; i++) {
//     console.log(occupiedList[i].start);
//     console.log(occupiedList[i].end);
//
//     debugger;
//     while ( !( left + width < occupiedList[i].start[0] ||
//     occupiedList[i].end[0] < left ||
//     top + height < occupiedList[i].start[1] ||
//     occupiedList[i].end[1] < top ) ) {
//       left = Math.random()*100;
//       top = Math.random()*100;
//     }
//   }
//   location.name =
//   location.start = [left, top];
//   location.end = [left + width, top + height];
//   occupiedList.push(location);
//   console.log('occupiedList: ', occupiedList, word);
//
//   return [left, top];
// }
