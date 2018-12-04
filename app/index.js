// Load application styles
import 'styles/index.less';

// ================================
// START YOUR APP HERE
// ================================
var styleInfo = {};

function DataMiner() {
  this.input = document.querySelector('.textInput');
  this.chart = document.querySelector('.dataChart');
  this.wordsWrapper = document.querySelector('.wordsWrapper');
  this.singleUsedWordsWrapper = document.querySelector('.singleUsedWordsWrapper');
  this.leftRandomLocatingChart = document.querySelector('.leftRandomLocatingChart');
  this.rightRandomLocatingChart = document.querySelector('.rightRandomLocatingChart');
  this.upperRandomLocatingChart = document.querySelector('.upperRandomLocatingChart');
  this.lowerRandomLocatingChart = document.querySelector('.lowerRandomLocatingChart');
  this.oftenUsedWordsWrapper = document.querySelector('.oftenUsedWordsWrapper');
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
  var alertMessage;

  characterLength.innerText = `length: ${characters.length}`;
  if (document.querySelector('.alertMessage')) {
    document.querySelector('.alertMessage').remove();
    this.wordsWrapper.classList.remove('hide');
    this.singleUsedWordsWrapper.classList.remove('hide');
    this.oftenUsedWordsWrapper.classList.remove('hide');
  }
  if (characters.length <= 5000) {
    this.wordsWrapper.innerText = '';
    this.singleUsedWordsWrapper.innerText = '';
    this.leftRandomLocatingChart.innerText = '';
    this.rightRandomLocatingChart.innerText = '';
    this.upperRandomLocatingChart.innerText = '';
    this.lowerRandomLocatingChart.innerText = '';
    this.filterWords(words);
  } else {
    this.singleUsedWordsWrapper.classList.add('hide');
    this.wordsWrapper.classList.add('hide');
    this.oftenUsedWordsWrapper.classList.add('hide');
    alertMessage = document.createElement('div');
    alertMessage.classList.add('alertMessage');
    alertMessage.innerText= "please type under 5000...";
    this.chart.appendChild(alertMessage);
  }
  characters.every(function(character) {
    var alertMessage;

    if ((45032 < character.charCodeAt(0) && character.charCodeAt(0) < 55203) ||
    (12593 < character.charCodeAt(0) && character.charCodeAt(0) < 12622) ||
    (12623 < character.charCodeAt(0) && character.charCodeAt(0) < 12643)) {
      this.wordsWrapper.classList.add('hide');
      this.singleUsedWordsWrapper.classList.add('hide');
      this.oftenUsedWordsWrapper.classList.add('hide');
      alertMessage = document.createElement('div');
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
  var exceptedWords = ['am', 'is', 'the', 'a', 'are', 'were',
  'to', 'of', 'you', 'you\'re', 'your','it\'s', 'you\'ve',
  'i\'m', 'this', 'she', 'he', 'there', 'it\'s', 'and', 'be',
  'can', 'do', '', 'for', 'that', 'on', 'by', 'an', 'in',
  'or', 'it', 'but', 'as', 'if', 'they', 'we', 'for',
  'with', 'could', 'it’s', 'was', '+', '-', 'you’re', 'doesn’t'];

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
    if ( exceptedWords.indexOf(word) === -1 ) {
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
  var randomChartCollection = [];
  var singleWords = {};
  var frequencyList;

  randomChartCollection.push(this.leftRandomLocatingChart);
  randomChartCollection.push(this.rightRandomLocatingChart);
  randomChartCollection.push(this.upperRandomLocatingChart);
  randomChartCollection.push(this.lowerRandomLocatingChart);
  for (var key in countedWords) {
    if (countedWords[key] >= 2) {
      if (oftenUsedWords[countedWords[key]]) {
        oftenUsedWords[countedWords[key]].push(key);
      } else {
        oftenUsedWords[countedWords[key]] = [];
        oftenUsedWords[countedWords[key]].push(key);
      }
    }
    singleWords[key] = countedWords[key];
  }
  for (var key in singleWords) {
    var left = Math.random()*100;
    var top = Math.random()*100;
    var newWord = document.createElement('div');

    newWord.classList.add('singleUsedWord');
    newWord.innerText = key;
    newWord.style = `font-size: 15px; color: #222222; left: ${left}%; top: ${top}%; z-index: 1;`;
    this.singleUsedWordsWrapper.appendChild(newWord);
  }
  frequencyList = Object.keys(oftenUsedWords);
  for (var i = frequencyList.length-1; i >= 0; i--) {
    var thisFrequencyWords = oftenUsedWords[frequencyList[i]];
    var frequency = frequencyList[i];

    for (var j = 0; j < thisFrequencyWords.length; j++) {
      var left = Math.random()*100;
      var top = Math.random()*100;
      var newWord = document.createElement('div');
      var randomColor = this.makeRandomColor();
      var fontSize = 70 * ( frequencyList[i] / frequencyList[frequencyList.length - 1] );
      var width;
      var height;
      var styleBefore;
      var randomIndex;
      var chartToAppend;
      var newWordWidth;
      var newWordHeight;

      newWord.innerText = thisFrequencyWords[j];
      newWord.classList.add('words');
      if (!(i == frequencyList.length-1 && j == 0)) {
        randomIndex = Math.floor(Math.random()*4);
        chartToAppend = randomChartCollection[randomIndex];
        chartToAppend.appendChild(newWord);
      } else {
        this.wordsWrapper.appendChild(newWord);
      }
      if (i === frequencyList.length-1 && j === 0) {
        width = newWord.offsetWidth;
        height = newWord.offsetHeight;
        newWordWidth = (newWord.offsetWidth / newWord.parentNode.offsetWidth) * 100;
        newWordHeight = (newWord.offsetHeight / newWord.parentNode.offsetHeight) * 100;
        newWord.classList.add('textShadowWhite');
        newWord.style = `font-size: ${130}px; color: ${randomColor}; left: ${50 - (newWordWidth*3.5)}%; top: ${50 - (newWordHeight*3)}%; z-index: ${i+2};`;
        newWord.addEventListener('mouseout', function(event) {
          event.target.classList.remove('hoveredCenter');
          event.target.style.zIndex = styleInfo.zIndex;
          event.target.style.fontSize = styleInfo.fontSize;
          event.target.children[0].remove();
        });
        newWord.addEventListener('mouseover', function(event,frequency) {
          var textBox = document.createElement('div');

          textBox.innerText = ` :${countedWords[event.target.innerText]}`;
          styleInfo.zIndex = event.target.style.zIndex;
          styleInfo.fontSize = event.target.style.fontSize;
          event.target.style.zIndex = '';
          event.target.classList.add('hoveredCenter');
          event.target.appendChild(textBox);
        });
      } else {
        newWord.classList.add('textShadowBlack');
        newWord.style = `font-size: ${fontSize}px; color: ${randomColor}; left: ${left}%; top: ${top}%; z-index: ${i+1};`;
        newWord.addEventListener('mouseout', function(event) {
          event.target.classList.remove('hovered');
          event.target.style.zIndex = styleInfo.zIndex;
          event.target.style.fontSize = styleInfo.fontSize;
          event.target.children[0].remove();
        });
        newWord.addEventListener('mouseover', function(event) {
          var textBox = document.createElement('div');

          textBox.innerText = ` :${countedWords[event.target.innerText]}`;
          styleInfo.zIndex = event.target.style.zIndex;
          styleInfo.fontSize = event.target.style.fontSize;
          event.target.style.zIndex = '';
          event.target.style.fontSize = '';
          event.target.classList.add('hovered');
          event.target.appendChild(textBox);
        });
        newWord.addEventListener('click', function(event) {
          function randomLocation () {
            return Math.random()*100;
          }
          event.target.style.left = '';
          event.target.style.top = '';
          event.target.style.left = `${randomLocation()}%`;
          event.target.style.top = `${randomLocation()}%`;
        });
      }
    }
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
