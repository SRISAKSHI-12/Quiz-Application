const quiz = [
{
question:"What does CPU stand for?",
answers:["Central Processing Unit","Control Program Unit","Computer Power Unit","Central Program Utility"],
correct:0
},
{
question:"Which language is used to style web pages?",
answers:["HTML","Python","CSS","Java"],
correct:2
},
{
question:"Which company developed Java?",
answers:["Google","Apple","Sun Microsystems","Microsoft"],
correct:2
},
{
question:"Which data structure follows FIFO?",
answers:["Stack","Queue","Tree","Graph"],
correct:1
},
{
question:"HTML stands for?",
answers:[
"Hyper Text Markup Language",
"High Text Machine Language",
"Hyper Tool Multi Language",
"Home Tool Markup Language"
],
correct:0
},
{
question:"Which symbol is used for comments in JavaScript?",
answers:["//","<!-- -->","#","**"],
correct:0
},
{
question:"Which keyword declares a variable in JavaScript?",
answers:["int","let","string","char"],
correct:1
},
{
question:"Which operator compares value and type?",
answers:["=","==","===","!="],
correct:2
},
{
question:"Which tag inserts an image?",
answers:["<img>","<image>","<picture>","<src>"],
correct:0
},
{
question:"Which method displays output in browser console?",
answers:["print()","console.log()","display()","echo()"],
correct:1
}
];

quiz.sort(()=>Math.random()-0.5);

let current=0;
let score=0;
let timer=20;
let interval;

const question=document.getElementById("question");
const answers=document.getElementById("answers");
const progress=document.getElementById("progress");
const progressFill=document.getElementById("progressFill");
const timerBox=document.getElementById("timer");
const nextBtn=document.getElementById("nextBtn");

loadQuestion();

function loadQuestion(){

clearInterval(interval);

timer=20;

timerBox.innerHTML=timer;

interval=setInterval(updateTimer,1000);

progress.innerHTML=`Question ${current+1} / ${quiz.length}`;

progressFill.style.width=((current+1)/quiz.length)*100+"%";

question.innerHTML=quiz[current].question;

answers.innerHTML="";

quiz[current].answers.forEach((ans,index)=>{

const btn=document.createElement("button");

/* IMPORTANT */
btn.textContent=ans;

btn.className="option";

btn.onclick=function(){
checkAnswer(index,btn);
};

answers.appendChild(btn);

});

}

function updateTimer(){

timer--;

timerBox.innerHTML=timer;

if(timer<=0){

clearInterval(interval);

nextQuestion();

}

}

function checkAnswer(index,btn){

clearInterval(interval);

const buttons=document.querySelectorAll(".option");

buttons.forEach(button=>button.disabled=true);

if(index===quiz[current].correct){

btn.classList.add("correct");

score++;

}else{

btn.classList.add("wrong");

buttons[quiz[current].correct].classList.add("correct");

}

}

nextBtn.onclick=function(){

nextQuestion();

};

function nextQuestion(){

current++;

if(current<quiz.length){

loadQuestion();

}
else{

showResult();

}

}

function showResult(){

document.querySelector(".quiz-box").style.display="none";

nextBtn.style.display="none";

document.getElementById("result").classList.remove("hide");

document.getElementById("score").innerHTML=
`Your Score : ${score} / ${quiz.length}`;

let high=localStorage.getItem("highScore") || 0;

if(score>high){

high=score;

localStorage.setItem("highScore",high);

}

document.getElementById("highScore").innerHTML=
`Highest Score : ${high}`;

progressFill.style.width="100%";

}

function restartQuiz(){

location.reload();

}

document.getElementById("darkBtn").onclick=function(){

document.body.classList.toggle("dark");

};