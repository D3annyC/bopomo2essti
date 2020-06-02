var options = new Array(0);

function GetTask() {
  var xmlHttp = new XMLHttpRequest();
  var jsonUrl = "bopomo.json";
  xmlHttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var bopomoArr = JSON.parse(this.responseText);
      var bopomoIndex = Math.floor(Math.random() * 37);
      var AnswerObj = bopomoArr[bopomoIndex];
      options[0] = AnswerObj;
      document.getElementById("showMsg").textContent = AnswerObj.code;

      for (i = 1; i < 4; i++) {
        var optionIndex = Math.floor(Math.random() * 37);
        var optionObj = bopomoArr[optionIndex];
        options[i] = optionObj;
      }

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
