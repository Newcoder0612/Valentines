let noClickcount = 0;
let dodgeEnabled = false;

const noBtn = document.getElementById("noBtn")
const yesBtn = document.getElementById("yesBtn")
const question = document.getElementById("question")
const gif = document.getElementById("gif")
const popup = document.getElementById("popup")
const overlay = document.getElementById("overlay")
const closepopup = document.getElementById("closepopup")

function show(el) {
  el.classList.remove("hidden");
}

function hide(el) {
  el.classList.add("hidden");
}


function showPopup(){
  overlay.style.display= "block";
  popup.style.display= "block";
  popup.classList.add("show");
}
function hidePopup(){
  overlay.style.display="none";
  popup.style.display="none";
  popup.classList.remove("show");
}

closepopup.addEventListener("click", hidePopup);
overlay.addEventListener("click", hidePopup);

noBtn.addEventListener("click", () => {

noClickcount++;

if(noClickcount === 1) {
  question.textContent = "Are you sure? 🤨"
  dodgeEnabled = true;
  showPopup();
}
else if (noClickcount === 2){
  question.textContent = "Wrong Choice 😐"; 
}
else{
  question.style.display = "none";
  gif.style.display = "block";
}
  yesBtn.style.transform = "scale(1.5)";

});

yesBtn.addEventListener("click", () => {
hidePopup();
startcelebration();

// Delay before switching screen
setTimeout(() => {
  hide(document.querySelector(".box"));
  show(document.getElementById("game"));
  startGame();
}, 1500);
});

noBtn.addEventListener("mouseover", () => {

  if (!dodgeEnabled) return;

  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;

  noBtn.style.transform = `translate(${x}px , ${y}px)`;
});

const celebrationcontainer = document.getElementById("celebration");

function startcelebration(){
  for(let i=0; i<60; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    //  random colours 
    confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;

    // Start position 
    confetti.style.left = "50%" ;
    confetti.style.top = "50%" ;

    const x = Math.random() * 600-300 + "px";
    const y = Math.random() * 600-300 + "px";

    confetti.style.setProperty("--x",x);
    confetti.style.setProperty("--y",y);

    celebrationcontainer.appendChild(confetti);

    setTimeout(() =>{
      confetti.remove();
    }, 1000);
  }
}

const heartsContainer = document.getElementById("hearts");

function createHeart(){
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "💖";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 3 + "s";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// spawn hearts continuously
setInterval(createHeart, 300);


let score = 0;
let gameInterval;

function startGame(){
  score = 0;
  document.getElementById("score").textContent = score;
  gameInterval = setInterval(spawnGameHeart, 800);
}

function spawnGameHeart(){
  const heart = document.createElement("div");
  heart.textContent = "💖";
  heart.classList.add("game-heart");

  heart.style.left = Math.random() * 90 + "%";
  heart.style.top = "-30px";

  heart.addEventListener("click", () => {
    score++;
    document.getElementById("score").textContent = score;
    heart.remove();

    if(score >= 10){
      endGame();
    }
  });

  document.getElementById("gameArea").appendChild(heart);

  heart.animate(
    [{ top: "-30px" }, { top: "300px" }],
    { duration: 2500, easing: "linear" }
  );

  setTimeout(() => heart.remove(), 2500);
}

function endGame(){
  clearInterval(gameInterval);
  hide(document.getElementById("game"));
  show(document.getElementById("confession"));
  startTypewriter();
}

const message =
"You did it.\n\n" +
"So I guess I can’t hide it anymore.\n\n" +
"I really, really like you 💖\n" +
"And I was hoping you’d say YES.\n\n" +
"Will you be my Valentine? 🌹";

let i = 0;

function startTypewriter(){
  const output = document.getElementById("typeText");
  output.textContent = "";
  i = 0;
  typeNext();
}

function typeNext(){
  const output = document.getElementById("typeText");
  if(i < message.length){
    output.textContent += message[i];
    i++;
    setTimeout(typeNext, 60);
  }
}
