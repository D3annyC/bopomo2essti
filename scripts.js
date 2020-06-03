var options = new Array(0);
var optionsIndex = new Array(0);

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
      options.push(AnswerObj);
      optionsIndex.shift();

      var QuestionImg = '<img src="/imgs/' + AnswerObj.code + '.png">';
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
    radioHtml += '<input type="radio" id="' + option.code + '"  name= "bopomo" value=' + option.code + ">";
    radioHtml += '<label class="option-label" id="' + option.code + '" for="' + option.code + '"></label>';
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
  const submitObj = document.querySelector("#submit-button");
  submitObj.addEventListener("click", GetTask, false);

  const optionBoj = document.querySelector("#optionDiv");
  optionBoj.addEventListener("click", function (e) {
    var index = options.findIndex(obj => obj.code == e.target.id);
    var sound = new Howl({
      src: [options[index].url]
    });

    sound.play();
  }, false);
};
