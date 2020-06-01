var bopomo = {
  "3105": "ㄅ",
  "3106": "ㄆ",
  "3107": "ㄇ",
  "3108": "ㄈ",
  "3109": "ㄉ",
  "3110": "ㄊ",
  "3111": "ㄋ",
  "3112": "ㄌ",
  "3113": "ㄍ",
  "3114": "ㄎ",
  "3115": "ㄏ",
  "3116": "ㄐ",
  "3117": "ㄑ",
  "3118": "ㄒ",
  "3119": "ㄓ",
  "3120": "ㄔ",
  "3121": "ㄕ",
  "3122": "ㄖ",
  "3123": "ㄗ",
  "3124": "ㄘ",
  "3125": "ㄙ",
  "3126": "ㄧ",
  "3127": "ㄨ",
  "3128": "ㄩ",
  "3129": "ㄚ",
  "3130": "ㄛ",
  "3131": "ㄜ",
  "3132": "ㄝ",
  "3133": "ㄞ",
  "3134": "ㄟ",
  "3135": "ㄠ",
  "3136": "ㄡ",
  "3137": "ㄢ",
  "3138": "ㄣ",
  "3139": "ㄤ",
  "3140": "ㄥ",
  "3141": "ㄦ",
};

function GetTask() {
  var bopomoIndex = Math.floor(Math.random() * 37);
  var options = new Array(0);
  var key = Object.keys(bopomo)[bopomoIndex];
  options.push(key);
  document.getElementById("showMsg").textContent = bopomo[key];
  for (i = 1; i < 4; i++) {
    var optionIndex = Math.floor(Math.random() * 37);
    var optionKey = Object.keys(bopomo)[optionIndex];
    options.push(optionKey);
  }

  GetOption(shuffArray(options));
}

function GetOption(options) {
  var optionsObj = document.getElementById("optionDiv");
  optionsObj.innerHTML = "";
  var radioHtml = "<form>";
  radioHtml += '<fieldset id="options" >';
  options.forEach((option) => {
    radioHtml += '<input type="radio" name= "bopomo" value=' + option + ">";
    radioHtml += bopomo[option] + "<br>";
  });
  radioHtml += "</fieldset>";
  radioHtml += "</form>";
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
    src: ["voices/M2.wav"],
  });

  sound.play();
}
