let options = [4];
let optionsIndex = [3];
let answerCode = "";
let bopomoCnt = 0;
let worngCnt = 0;
let leftBopomo;
let flag = true;

function GetTask() {
  if ((bopomoCnt + worngCnt) == 37) {
    alert("FINISHED TEST,TUBLI!");
    return false;
  }
  var xmlHttp = new XMLHttpRequest();
  var jsonUrl = "bopomo.json";

  while (optionsIndex.length < 3) {
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

      //get json list
      if (flag) {
        leftBopomo = bopomoArr;
        flag = false;
      }
      var answerR = Math.floor(Math.random() * leftBopomo.length);
      var AnswerObj = leftBopomo[answerR];
      answerCode = AnswerObj.code;
      options.push(AnswerObj);
      leftBopomo = leftBopomo.filter(function (obj) {
        return obj.code !== answerCode;
      });
      // var logStr = "";
      // var logCnt = 1;
      // leftBopomo.forEach((obj) => {
      //   logStr += logCnt + JSON.stringify(obj) + '<br>';
      //   logCnt++;
      // });
      // document.getElementById('log-label').innerHTML = logStr;

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

function GetScore() {
  var scoreLabel = document.querySelector("#score-label");
  scoreLabel.textContent = 'Tubli power : ' + bopomoCnt + '/37';
}

function GetWrong() {
  var scoreLabel = document.querySelector("#wrong-label");
  scoreLabel.textContent = 'Ei Tubli : ' + worngCnt + '/37';
}

window.onload = function () {
  const startObj = document.querySelector("#start-button");
  startObj.addEventListener("click", function (e) {
    GetTask();
    this.disabled = true;
  }, false);

  const optionBoj = document.querySelector("#optionDiv");
  optionBoj.addEventListener("click", function (e) {
    var selectedId = e.target.id;
    var index = options.findIndex(obj => obj.code == selectedId.substring(selectedId.length - 4));
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
      alert('Oops, ei tubli :(');
      worngCnt++;
      GetWrong();
      GetTask();
      return false;
    }
    else {
      alert('Correct! Tubli!');
      bopomoCnt += 1;
      GetScore();
      GetTask();
    }
  });
};
