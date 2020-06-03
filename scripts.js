let options = [4];
let optionsIndex = [4];
let answerCode = "";

function GetTask() {
  var xmlHttp = new XMLHttpRequest();
  var jsonUrl = "bopomo.json";

  while (optionsIndex.length < 4) {
    var r = Math.floor(Math.random() * 37);
    if (optionsIndex.includes(r)) {
      continue;
    } else {
      optionsIndex.push(r);
    }
  }
  options = [];

  xmlHttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var bopomoArr = JSON.parse(this.responseText);
      var AnswerObj = bopomoArr[optionsIndex[0]];
      answerCode = AnswerObj.code;
      options.push(AnswerObj);
      optionsIndex.shift();

      var QuestionImg = '<img id="' + AnswerObj.code + '" src="/imgs/' + AnswerObj.code + '.png">';
      document.getElementById("showMsg").innerHTML = QuestionImg;

      optionsIndex.forEach((index) => {
        var optionObj = bopomoArr[index];
        options.push(optionObj);
      });

      GetOption(shuffArray(options));
    }
  };
  xmlHttp.open("GET", jsonUrl, true);
  xmlHttp.send();
}

function GetOption(options) {
  var optionsObj = document.getElementById("optionDiv");
  optionsObj.innerHTML = "";
  var radioHtml = "";
  options.forEach((option) => {
    radioHtml += '<input type="radio" id="input-' + option.code + '"  name= "bopomo" value=' + option.code + ">";
    radioHtml += '<label class="option-label" for="input-' + option.code + '"></label>';
  });
  optionsObj.innerHTML = radioHtml;
}

function shuffArray(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

window.onload = function () {
  const startObj = document.querySelector("#start-button");
  startObj.addEventListener("click", GetTask, false);

  const optionBoj = document.querySelector("#optionDiv");
  optionBoj.addEventListener("click", function (e) {
    var selectedId = e.target.id;
    var index = options.findIndex(obj => obj.code == selectedId.substring(selectedId.length - 4, selectedId.length));
    var sound = new Howl({
      src: [options[index].url]
    });

    sound.play();
  }, false);

  const submitObj = document.querySelector("#submit-button");
  submitObj.addEventListener('click', function () {
    var answer = document.querySelector('img[id="' + answerCode + '"]').id;
    var score = document.querySelector('input[name="bopomo"]:checked').value;
    if (score != answer) {
      alert('Oops, Try again...');
      return false;
    }
    else {
      alert('Correct! Tubli!');
      GetTask();
    }
  });
};
