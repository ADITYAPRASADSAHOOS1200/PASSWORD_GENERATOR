const lengthSlider = document.querySelector(".pass-length input"),
options=document.querySelectorAll(".option input"),
copyIcon=document.querySelector(".input-box span")
passwordInput=document.querySelector(".input-box input"),
passIndicator=document.querySelector(".pass-indicator")
generatebtn=document.querySelector(".generate-btn");


const charcters ={// object of letters ,spaces,numbers and symbols
     lowercase:"abcdefghijklmnopqrstuvwxyz",
     Uppercase:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
     numbers:"123456789",
     symbols:"!$%|{}[]():;.,*#+-@<>~^&"
}


const generatePassword=()=>{
    let staticpassword="",
    randompassword = " ",
    exludeDuplicate=false,
    passlength=lengthSlider.value;
  

   options.forEach(option =>{//looping htrough the each option's  checkbox
          if(option.checked){//if the checkbox is checked

           if(option.id != "exc-duplicate" && option.id != "spaces"){
      //adding particular key value from character object to staticPassword
            staticpassword+=charcters[option.id];
          }else if(option.id === "spaces"){  //  if the checkbox id is spaces
            staticpassword+=`  ${staticpassword}  `;//adding spaces at the beginning and end of the static keyword
          }else{//else pass true value to exclude duplicate
              exludeDuplicate=true;
          }

          }
        });

    for(let i=0;i<passlength;i++){
     let randomchar = staticpassword[Math.floor(Math.random() * staticpassword.length)]

if(exludeDuplicate){/// if excludeDuplicate is true
    //if randompassword doesn't contains the current random char or random characeter is equal
    //to space " " then add random charcter to randompassword else decrement 1 by -1;
!randompassword.includes(randomchar) || randomchar == " " ? randompassword += randomchar:i--;

}else{//else add random character to random password
     randompassword+=randomchar;
   }
}    
  passwordInput.value = randompassword
  //passing randompassword to passwordInputvalue;
}

const updatePassindicator=()=>{
    // if the length slider is less than 8 then pass " weak" as passindicator id else if lengthslider
    //value is less than 16 then pass "medium" as id  else pass strong as id
    passIndicator.id=lengthSlider.value <= 8 ? "weak":lengthSlider.value<=16 ?"medium":"strong";
}


const updateSlider = () =>{
    //passing the slider value as context text
   document.querySelector(".pass-length span").innerText=lengthSlider.value;
   generatePassword();
   updatePassindicator();
}
updateSlider();

const copypassword=()=>{
  navigator.clipboard.writeText(passwordInput.value)//copying random Password
  copyIcon.innerText="check";//changing copy icon to tick
  setTimeout(() => {
    copyIcon.innerText="copy_all";
  }, 1550);
}






lengthSlider.addEventListener("input",updateSlider);

generatebtn.addEventListener("click",generatePassword);

copyIcon.addEventListener("click",copypassword);