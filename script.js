let pass=document.getElementById("pass");
let fill=document.getElementById("fill");
let scoreBox=document.getElementById("score");
let riskBox=document.getElementById("risk");
let timeBox=document.getElementById("time");
let suggestBox=document.getElementById("suggest");

let visible=false;

pass.addEventListener("input",function(){

let v=pass.value;
let score=0;

/* strength engine */
if(v.length>=8) score+=25;
if(/[A-Z]/.test(v)) score+=25;
if(/[0-9]/.test(v)) score+=25;
if(/[@$!%*?&#]/.test(v)) score+=25;

fill.className="";
fill.style.width=score+"%";

/* EMPTY */
if(v.length===0){
  fill.style.width="0%";
  scoreBox.innerHTML="";
  riskBox.innerHTML="";
  timeBox.innerHTML="";
  suggestBox.innerHTML="";
  return;
}

/* LEVELS */
if(score<=25){
  fill.classList.add("weak");
  riskBox.innerHTML="⚠ HIGH RISK";
  timeBox.innerHTML="⏱ Crack Time: Seconds";
  suggestBox.innerHTML="💡 Add uppercase, numbers, symbols";
}
else if(score<=75){
  fill.classList.add("medium");
  riskBox.innerHTML="⚠ MEDIUM SECURITY";
  timeBox.innerHTML="⏱ Crack Time: Hours/Days";
  suggestBox.innerHTML="💡 Increase complexity";
}
else{
  fill.classList.add("strong");
  riskBox.innerHTML="🔒 ENTERPRISE LEVEL SECURITY";
  timeBox.innerHTML="⏱ Crack Time: Years+";
  suggestBox.innerHTML="💡 Excellent password strength";
}

scoreBox.innerHTML="📊 SCORE: "+score+"/100";

});

/* TOGGLE */
function toggle(){
  pass.type = pass.type==="password"?"text":"password";
}

/* GENERATE */
function generate(){
  let c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!";
  let p="";
  for(let i=0;i<14;i++){
    p+=c[Math.floor(Math.random()*c.length)];
  }
  pass.value=p;
  pass.dispatchEvent(new Event("input"));
}

/* COPY */
function copy(){
  navigator.clipboard.writeText(pass.value);
  alert("Password Copied!");
}
/* =========================
   HACKER INTRO ANIMATION
========================= */

let welcomeText = "WELCOME TO PASSWORD STRENGTH CHECKER 1";
let i = 0;

function type() {
  if (i < welcomeText.length) {
    document.getElementById("text").innerHTML += welcomeText.charAt(i);
    i++;
    setTimeout(type, 80);
  }
}

window.onload = function () {
  type();

  // Splash Screen Hide
  setTimeout(function () {
    document.getElementById("splash").style.display = "none";
  }, 4000);

  // Matrix Effect
  const canvas = document.getElementById("matrix");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const chars = letters.split("");

  const fontSize = 14;
  const columns = canvas.width / fontSize;

  const drops = [];

  for (let x = 0; x < columns; x++) {
    drops[x] = 1;
  }

  function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff00";
    ctx.font = fontSize + "px monospace";

    for (let j = 0; j < drops.length; j++) {
      const character = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(character, j * fontSize, drops[j] * fontSize);

      if (drops[j] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[j] = 0;
      }

      drops[j]++;
    }
  }

  setInterval(draw, 35);
};
