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

function update() {
  const letter = letters[current];
  document.getElementById("image").src = letter.image;
  document.getElementById("audio").src = letter.sound;
}

function nextLetter() {
  current++;
  if (current < letters.length) {
    update();
    if (current % 5 === 0) {
      setTimeout(() => {
        showStarPopup();
      }, 500);
    }
  } else {
    document.getElementById("success-popup").style.display = "flex";
    document.getElementById("success-audio").play();
  }
}

function prevLetter() {
  current = (current - 1 + letters.length) % letters.length;
  update();
}

function playSound() {
  const mainAudio = document.getElementById("audio");

  mainAudio.pause();
  mainAudio.currentTime = 0;
  mainAudio.play();

  // تشغيل مؤثر تفاعلي بعد الصوت
  const interactionAudio = document.getElementById("interaction-audio");
  if (interactionAudio) {
    interactionAudio.currentTime = 0;
    interactionAudio.play();
  }
}

function showStarPopup() {
  document.getElementById("star-popup").style.display = "flex";

  const bravoAudio = document.getElementById("bravo-audio");
  const funAudio = document.getElementById("fun-audio");

  bravoAudio.currentTime = 0;
  funAudio.currentTime = 0;

  bravoAudio.play();
  funAudio.play();

  // إضافة صوت الحكاية التعليمية حسب الرقم
  const storyAudio = document.getElementById("story-audio");
  if (storyAudio) {
    storyAudio.src = `assets/stories/story${current}.mp3`;
    storyAudio.currentTime = 0;
    storyAudio.play();
  }
}

function continueLearning() {
  document.getElementById("star-popup").style.display = "none";

  const funAudio = document.getElementById("fun-audio");
  funAudio.pause();
  funAudio.currentTime = 0;

  const storyAudio = document.getElementById("story-audio");
  if (storyAudio) {
    storyAudio.pause();
    storyAudio.currentTime = 0;
  }
}

function closePopup() {
  document.getElementById("success-popup").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  update();

  const text = "أهلاً بكم يا أصدقاء! اليوم سنبدأ رحلة ممتعة لتعلم الحروف العربية! هل أنتم مستعدون؟ هيا بنا!";
  const textElement = document.getElementById("typed-text");
  const audio = document.getElementById("motivation-audio");

  let index = 0;
  let soundPlayed = false;

  function typeText() {
    if (!soundPlayed) {
      audio.play().catch((error) => {
        console.warn("⚠️ لم يتم تشغيل الصوت تلقائيًا: ", error);
      });
      soundPlayed = true;
    }

    if (index < text.length) {
      textElement.innerHTML += text.charAt(index);
      index++;
      setTimeout(typeText, 80);
    }
  }

  window.onload = typeText;

  setTimeout(() => {
    const intro = document.getElementById("intro-screen");
    if (intro) {
      intro.style.display = "none";
    }
  }, 8000);
});
setTimeout(() => {
    const intro = document.getElementById("intro-screen");
    if (intro) {
      intro.style.display = "none";
    }
  }, 8000); // بعد 8 ثواني

  function goToGame() {
    window.location.href = "games.html";
  }
  // عناصر شاشة البداية
const startBtn = document.getElementById("start-btn");
const intro = document.getElementById("intro-screen");
const welcomeAudio = document.getElementById("welcome-audio");



function goToLesson() {
  intro.style.display = "none";
  // يفترض وجود showDay/currentIndex عندك
  if (typeof showDay === "function") {
    window.currentIndex = window.currentIndex || 0;
    showDay(window.currentIndex);
  }
}

startBtn.addEventListener("click", async () => {
  try {
    // تأكد من المصدر، أعد الضبط، ثم شغّل في حدث النقر (مسموح لجميع المتصفحات)
    if (!welcomeAudio.src.includes(".mp3")) welcomeAudio.src = SAFE_SRC;
    welcomeAudio.currentTime = 0;
    welcomeAudio.volume = 1;
    await welcomeAudio.play();
    console.log("✅ تم تشغيل صوت الترحيب");
  } catch (err) {
    console.warn("⚠️ المتصفح منع التشغيل أو الملف غير صالح:", err);
    // في بعض الأجهزة (iOS) قد يلزم تكرار النقر أو التأكد من مستوى الصوت/زر الصمت
  } finally {
    // انتقل للدرس بع65 ثوانٍ مهما كان
    setTimeout(goToLesson, 9000);
  }
});

// لوجات مفيدة للتشخيص
welcomeAudio.addEventListener("canplaythrough", () => {
  console.log("🎵 ملف الصوت جاهز للتشغيل:", welcomeAudio.src);
});

welcomeAudio.addEventListener("error", () => {
  const e = welcomeAudio.error;
  const codes = {1: "ABORTED", 2: "NETWORK", 3: "DECODE", 4: "SRC_NOT_SUPPORTED"};
  console.error("❌ خطأ في ملف الصوت:", codes[e?.code] || e);
  alert("تعذّر تحميل الصوت. تأكد أن الملف موجود في: " + welcomeAudio.src);
});
