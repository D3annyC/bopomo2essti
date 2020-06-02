function GetTask() {
  var xmlHttp = new XMLHttpRequest();
  var jsonUrl = "bopomo.json";
  xmlHttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var bopomoArr = JSON.parse(this.responseText);
      var bopomoIndex = Math.floor(Math.random() * 37);
      var options = new Array(0);
      var AnswerObj = bopomoArr[bopomoIndex];
      options.push(AnswerObj);
      document.getElementById("showMsg").textContent = AnswerObj.code;

      for (i = 1; i < 4; i++) {
        var optionIndex = Math.floor(Math.random() * 37);
        var optionObj = bopomoArr[optionIndex];
        options.push(optionObj);
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
    radioHtml += '<label class="option-label" for="' + option.code + '">' + option.url + '</label>';
    radioHtml += "<br>";
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

function VoicePlay() {
  var sound = new Howl({
    src: ["https://stroke-order.learningweb.moe.edu.tw/bopomo_sound/M/M1.WAV"],
  });

  sound.play();
}
