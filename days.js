// =========================
// نافذة اللعبة
// =========================
function goToGame() {
  document.getElementById("game-frame").src = "gamesDays.html"; // ملف اللعبة
  document.getElementById("game-popup").classList.add("show");
}

function closeGame() {
  document.getElementById("game-popup").classList.remove("show");
  document.getElementById("game-frame").src = ""; // تفريغ عند الإغلاق
}

// =========================
// مصفوفة الأيام
// =========================
const days = [
  { name: "الأحد",     image: "images/sunday.png",    sound: "assets/sunday.mp3" },
  { name: "الإثنين",   image: "images/monday.png",    sound: "assets/monday.mp3" },
  { name: "الثلاثاء",  image: "images/tuesday.png",   sound: "assets/tuesday.mp3" },
  { name: "الأربعاء",  image: "images/wednesday.png", sound: "assets/wednesday.mp3" },
  { name: "الخميس",    image: "images/thursday.png",  sound: "assets/thursday.mp3" },
  { name: "الجمعة",    image: "images/friday.png",    sound: "assets/friday.mp3" },
  { name: "السبت",     image: "images/saturday.png",  sound: "assets/saturday.mp3" }
];

let currentIndex = 0;

// =========================
// عناصر HTML
// =========================
const dayName  = document.getElementById("dayName");
const image    = document.getElementById("image");
const audio    = document.getElementById("audio");
const congrats = document.getElementById("congrats");
const startBtn = document.getElementById("start-btn");
const intro    = document.getElementById("intro-screen");
const welcomeAudio = document.getElementById("welcome-audio");

// =========================
// ضمان وجود مسار صوت صحيح
// =========================
const SAFE_SRC = "assets/introday.mp3";
if (!welcomeAudio.src || !welcomeAudio.src.includes(".mp3")) {
  welcomeAudio.src = SAFE_SRC;
}

// =========================
// الانتقال للشاشة الرئيسية
// =========================
function goToLesson() {
  intro.style.display = "none";
  document.querySelector(".main-wrapper").style.display = "flex"; // إظهار المحتوى الرئيسي
  showDay(currentIndex); // عرض أول يوم
}

// =========================
// حدث زر البداية
// =========================
startBtn.addEventListener("click", async () => {
  try {
    welcomeAudio.currentTime = 0;
    welcomeAudio.volume = 1;
    await welcomeAudio.play();
  } catch (err) {
    console.warn("⚠️ المتصفح منع التشغيل أو الملف غير صالح:", err);
  } finally {
    setTimeout(goToLesson, 2000); // انتقل للدرس بعد ثانيتين
  }
});

// =========================
// عرض اليوم الحالي
// =========================
function showDay(index) {
  if (index >= 0 && index < days.length) {
    dayName.textContent = days[index].name;
    image.src = days[index].image;
    audio.src = days[index].sound;
    congrats.style.display = "none";
  } else if (index >= days.length) {
    congrats.style.display = "flex";
    document.querySelector(".main-wrapper").style.display = "none";
  }
}

// =========================
// تشغيل صوت اليوم
// =========================
function playSound() {
  if (audio && audio.src) audio.play().catch(() => {});
}

// =========================
// التنقل بين الأيام
// =========================
function nextLetter() {
  if (currentIndex < days.length - 1) {
    currentIndex++;
    showDay(currentIndex);
  } else {
    // عند نهاية الأيام
    currentIndex++;
    showDay(currentIndex);
  }
}

function prevLetter() {
  if (currentIndex > 0) {
    currentIndex--;
    showDay(currentIndex);
  }
}

// =========================
// إعادة من البداية
// =========================
function restart() {
  currentIndex = 0;
  showDay(currentIndex);
  document.querySelector(".main-wrapper").style.display = "flex"; 
  congrats.style.display = "none";
}
