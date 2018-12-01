// Load application styles
import 'styles/index.less';

// ================================
// START YOUR APP HERE
// ================================

var DataMiner = function() {
  this.input = document.querySelector('.textInput');
  this.chart = document.querySelector('.dataChart');
  this.wordsWrapper = document.querySelector('.wordsWrapper');
};

DataMiner.prototype.makeInputReact = function() {
  this.input.addEventListener('keydown', function() {
    this.judgeDatas();
  }.bind(this));
};

DataMiner.prototype.judgeDatas = function() {
  var stringData = this.input.value;
  var characters = stringData.split('');
  var words = stringData.split(' ');

  if ( characters.length <= 5000 ) {
    this.wordsWrapper.innerText = '';
    this.filterWords(words);
  } else {
    alert('please write under 5000 characters');
  }
};

DataMiner.prototype.filterWords = function(words) {
  var source = [];

  words.forEach(function(word) {
    if( word !== 'am' &&
    word !== 'are' &&
    word !== 'were' &&
    word !== 'was') {
      source.push(word);
    }
  });
  this.countWords(source);
};

DataMiner.prototype.countWords = function(source) {
  var countWords = {};

  source.forEach(function(word) {
    if( !countWords[word] ) {
      countWords[word] = 1;
    } else {
      countWords[word] += 1;
    }
  });

  this.printDatas(countWords);
};

DataMiner.prototype.printDatas = function(countWords) {
  for( var key in countWords ) {
    var newWord = document.createElement('div');
    var randomColor = this.makeRandomColor();
    newWord.innerText = key;
    newWord.style = `font-size: ${countWords[key]*15}px; color: ${randomColor}`;
    newWord.classList.add('words');
    this.wordsWrapper.appendChild(newWord);
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
