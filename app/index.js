// Load application styles
import 'styles/index.less';

// ================================
// START YOUR APP HERE
// ================================

var DataMiner = {
  countedWords : {},
  input : document.querySelector('.textInput')
};

DataMiner.makeInputReact = function() {
  this.input.addEventListener('keypress', function(event) {
    DataMiner.judgeDatas();
  })
}

DataMiner.judgeDatas = function() {
  var stringData = this.input.value
  var characters = stringData.split('');
  var words = stringData.split(' ');
  console.log(characters);
  console.log(words);

  if ( characters.length <= 5000 ) {
    this.filterWords(words);
  } else {
    alert('please write under 5000 characters');
  }
};

DataMiner.filterWords = function(words) {
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

DataMiner.countWords = function(source) {
  
};

DataMiner.printDatas = function(obj) {

};

DataMiner.makeInputReact();
