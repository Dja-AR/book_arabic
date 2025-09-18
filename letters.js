// 📌 بيانات الحروف
const letters = [
  { image: "images/1.png", sound: "assets/1.mp3" },
  { image: "images/2.png", sound: "assets/2.mp3" },
  { image: "images/3.png", sound: "assets/3.mp3" },
  { image: "images/4.png", sound: "assets/4.mp3" },
  { image: "images/5.png", sound: "assets/5.mp3" },
  { image: "images/6.png", sound: "assets/6.mp3" },
  { image: "images/7.png", sound: "assets/7.mp3" },
  { image: "images/8.png", sound: "assets/8.mp3" },
  { image: "images/9.png", sound: "assets/9.mp3" },
  { image: "images/10.png", sound: "assets/10.mp3" },
  { image: "images/11.png", sound: "assets/11.mp3" },
  { image: "images/12.png", sound: "assets/12.mp3" },
  { image: "images/13.png", sound: "assets/13.mp3" },
  { image: "images/14.png", sound: "assets/14.mp3" },
  { image: "images/15.png", sound: "assets/15.mp3" },
  { image: "images/16.png", sound: "assets/16.mp3" },
  { image: "images/17.png", sound: "assets/17.mp3" },
  { image: "images/18.png", sound: "assets/18.mp3" },
  { image: "images/19.png", sound: "assets/19.mp3" },
  { image: "images/20.png", sound: "assets/20.mp3" },
  { image: "images/21.png", sound: "assets/21.mp3" },
  { image: "images/22.png", sound: "assets/22.mp3" },
  { image: "images/23.png", sound: "assets/23.mp3" },
  { image: "images/24.png", sound: "assets/24.mp3" },
  { image: "images/25.png", sound: "assets/25.mp3" },
  { image: "images/26.png", sound: "assets/26.mp3" },
  { image: "images/27.png", sound: "assets/27.mp3" },
  { image: "images/28.png", sound: "assets/28.mp3" }
];

let current = 0;

// ✅ تحديث الصورة والصوت حسب العنصر الحالي
function update() {
  const letter = letters[current];
  document.getElementById("image").src = letter.image;
  document.getElementById("audio").src = letter.sound;
}

// ▶️ الحرف التالي
function nextLetter() {
  current++;
  if (current < letters.length) {
    update();
    if (current % 5 === 0) {
      setTimeout(showStarPopup, 500); // popup بعد كل 5 حروف
    }
  } else {
    document.getElementById("success-popup").style.display = "flex";
    document.getElementById("success-audio").play();
  }
}

// ◀️ الحرف السابق
function prevLetter() {
  current = (current - 1 + letters.length) % letters.length;
  update();
}

// 🔊 تشغيل صوت الحرف
function playSound() {
  const mainAudio = document.getElementById("audio");
  mainAudio.pause();
  mainAudio.currentTime = 0;
  mainAudio.play();
}

// 🌟 إظهار نافذة النجوم
function showStarPopup() {
  document.getElementById("star-popup").style.display = "flex";

  const bravoAudio = document.getElementById("bravo-audio");
  const funAudio = document.getElementById("fun-audio");

  bravoAudio.currentTime = 0;
  funAudio.currentTime = 0;

  bravoAudio.play();
  funAudio.play();
}

// ✅ استمرار التعلم بعد البوب أب
function continueLearning() {
  document.getElementById("star-popup").style.display = "none";

  const funAudio = document.getElementById("fun-audio");
  funAudio.pause();
  funAudio.currentTime = 0;
}

// ❌ غلق النافذة النهائية
function closePopup() {
  document.getElementById("success-popup").style.display = "none";
}

// 🎬 عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  update();

  // زر البداية
  const startBtn = document.getElementById("start-btn");
  const intro = document.getElementById("intro-screen");
  const introAudio = document.getElementById("intro-audio");

  startBtn.addEventListener("click", () => {
    // ✅ تشغيل الصوت بعد الكبس
    introAudio.currentTime = 0;
    introAudio.play().catch(() => {});

    // انتظار 3 ثواني قبل الدخول
    setTimeout(() => {
      intro.style.animation = "fadeOut 1s ease-in-out";
      setTimeout(() => {
        intro.style.display = "none";
        document.querySelector(".main-wrapper").style.display = "block";
        update();
      }, 1000);
    }, 3000);
  });
});
