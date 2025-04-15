const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = '#29323c';
	} else {
		header.style.backgroundColor = 'transparent';
	}
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});



/*
//// Script to open and close sidebar
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}
 
function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    //document.getElementById("myOverlay").style.display = "none";
}
*/




////set of images ina loop changing as per the time given (2sec)
var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 2000); // Change image every 2 seconds
}



/*
////progress bar to give 0 to max value animation
function progressBarAndCountNumber () {
  const progress = document.querySelectorAll('.progress');
  let count = 0;
  // You must put the maximum number in the MAX variable.
  let MAX = 80;

  let run = setInterval(() => {
      count++;
      progress.forEach(element => {
          if (count <= element.dataset.progress) {
              element.parentElement.style.background = `conic-gradient(#f9004d ${count}%, #212428 0)`;
              element.firstElementChild.textContent = `${count}%`;
          };
          if (count == MAX) {
              clearInterval(run);
          };
      });
  }, 20);
}
progressBarAndCountNumber();


*/


/////calculator interface
window.onload = function() {//event listner ensure code execute once entire doc loaded
  var buttons = document.getElementsByTagName('span'), // Select all buttons
    result = document.querySelectorAll('.result p')[0], // Select the result-field
    clear = document.getElementsByClassName('clear')[0], // Select the clearAll-button
    equation = [], // create the equation array
    operator = false; // helper variable, tracks if operator was last button pushed


    //calls diff fns
  for (var i = 0; i < buttons.length; i += 1) { //selects all buttons and binds diff fns
    if (buttons[i].innerHTML === '=') {//calls calculate fn
      buttons[i].addEventListener("click", calculate(i));
    } else if (buttons[i].innerHTML === '+/-') {//calls invert fn
      buttons[i].addEventListener("click", invert(i));
    } else if (buttons[i].innerHTML === '%') {//calls percent fn
      buttons[i].addEventListener("click", percent(i));
    } else if (buttons[i].innerHTML === 'AC') {//clears the equation array
      equation = [];
    } else {
      buttons[i].addEventListener("click", addValue(i));
    }
  }
  

  //reset calcy
  clear.onclick = function() {//clear result field and resets eqn array and operator
      result.innerHTML = '';
      equation = [];
      operator = false;
    }
    

    //based on operator perform
  function addValue(i) {//add values to eqn array and result based on operator
    return function() {
      if (buttons[i].innerHTML === '÷') {
        clicked(this);
        ifOperatorThanSwap('/');
      } else if (buttons[i].innerHTML === 'x') {
        clicked(this);
        ifOperatorThanSwap('*');
      } else if (buttons[i].innerHTML === '+') {
        clicked(this);
        ifOperatorThanSwap('+');
      } else if (buttons[i].innerHTML === '-') {
        clicked(this);
        ifOperatorThanSwap('-');
      } else {
        removeClicked();
        if (checkIfNum(equation[equation.length - 1])) {
          equation = [];
          equation.push(buttons[i].innerHTML);
          operator = true;
        } else {
          equation.push(buttons[i].innerHTML);
        }
        if (operator) {
          result.innerHTML = buttons[i].innerHTML;
        } else {
          result.innerHTML += buttons[i].innerHTML;
        }
        operator = false;
      }
    };
  }
  
  //first remove any button pressed
  function clicked(i) {//First removes any button with clicked class, then adds .clicked to pressed button
    removeClicked(i);
    i.classList.add('clicked');
  }
  
  //remove class 
  function removeClicked(i) {//Finds any elements with the clicked class and removes the class.
    var elems = document.querySelectorAll(".clicked");
    [].forEach.call(elems, function(el) {
      el.classList.remove("clicked");
    });
  }
  
  //display result(int/float)
  function calculate(i) {//evaluate eqn array,diaplay result,checek result is int/float result accordingly
    return function() {
      if (equation.length == 0) { // If nothing in array, do nothing
        return;
      } else {
        var answer = eval(equation.join(''));
        if (answer % 1 === 0) { // check if interger or float
          result.innerHTML = answer;
        } else { // if float than round to four numbers after decimal
          result.innerHTML = answer.toFixed(4);
        }
        equation = [];
        equation.push(answer);
        operator = false;
      }
    };
  }
  
  //invert fn
  function invert(i) {//Invert the current item in the viewer to and from a negative number by mul -1
    return function() {
      if (equation.length == 0) {
        return;
      } else {
        var number = result.innerHTML; // Grab number currently typed in
        popNumberOfDigits(number); // remove number of digits from equation array
        var invert = number * -1; // create inverted number by multiplying by -1
        equation.push(invert); // push to equation
        result.innerHTML = invert; // push to results display
      }
    }
  }
  
  //% fn
  function percent(i) {//Changes the current number entered into a percentage by mul 0.01
    return function() {
      var number = result.innerHTML; // Grab number currently typed in
      popNumberOfDigits(number); // remove number of digits from equation array
      var percent = number * 0.01; // create percentage
      equation.push(percent); // push to equation
      result.innerHTML = percent.toFixed(2); // show in results display
    }
  }
  
  //operator replace
  function ifOperatorThanSwap(str) {//handle operator replacement
    if (!operator) {
      equation.push(str);
      operator = true;
    } else {
      equation.pop();
      equation.push(str);
    }
  }
  
  //check given is string/num
  function checkIfNum(v) {//Checks if a number is of type string or number.
    if (typeof v == 'string') {
      return false;
    } else if (typeof v == 'number') {
      return true;
    }
  }
  
  //display limited digits that fit on screen
  function popNumberOfDigits(number) {//Checks the number of digits in the screen and removes them from the equation array. 
    var arr = number.split(''); // Create an array holding each part of the number (eg. 13 = ['1', '3'] )
    for (i = 0; i < arr.length; i++) { // Removes the last few elements from equation array
      equation.pop();
    }
  }
};





/*

////updates proficiency levels for various languages
var lang = {
  "temawork": "90%",
  "creativity": "75%",
  "ProjectManagement": "90%",
};

var multiply = 4;

$.each( lang, function( language, pourcent) {

  var delay = 700;
  
  setTimeout(function() {
    $('#'+language+'-pourcent').html(pourcent);
  },delay*multiply);
  
  multiply++;

});*/