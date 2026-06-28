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
