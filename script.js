function goTo(page) {
  window.location.href = page;
}

// يبدأ عند الضغط على زر "ابدأ"
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  startBtn.addEventListener("click", () => {
    document.getElementById("startScreen").style.display = "none";
    initApp();
  });
});
// 🔁 تشغيل intro.mp3 كخلفية مستمرة مع بداية الموقع
function initApp() {
  const intro = document.getElementById("introSound");
  intro.muted = false;
  intro.loop = true;
  intro.volume = 0.4;

  intro.play()
    .then(() => {
      startIntro();
    })
    .catch(() => {
      // ⛔ منع المتصفح للصوت ← المستخدم يجب أن ينقر أولاً
      document.body.addEventListener("click", () => {
        intro.muted = false;
        intro.play();
        startIntro();
      }, { once: true });
    });
}

// 🔤 عرض النصوص مع الصوت بشكل متزامن
function startIntro() {
  const container = document.getElementById("mainContainer");
  const title = document.getElementById("mainTitle");

  const intro = document.getElementById("introSound");
  const welcome = document.getElementById("welcomeSound");
  const learnPrompt = document.getElementById("learnPromptSound");

  const card1Sound = document.getElementById("card1Sound");
  const card2Sound = document.getElementById("card2Sound");
  const card3Sound = document.getElementById("card3Sound");

  // 🎧 رفع مستوى الأصوات
  [welcome, learnPrompt, card1Sound, card2Sound, card3Sound].forEach(audio => {
    audio.volume = 1;
  });

  // 📌 إظهار الواجهة
  container.style.display = "block";

  // ⏱️ بعد 2 ثانية: النص + الصوت معًا
  setTimeout(() => {
    welcome.play(); // ✅ تشغيل الصوت مباشرة
    animateText(title, "✨ مرحبًا يا أصدقاء!", () => {
      // ⏱️ بعد انتهاء welcome.mp3 + 1 ثانية
      welcome.onended = () => {
        setTimeout(() => {
          learnPrompt.play(); // ✅ صوت السؤال
          animateText(title, "ماذا تريدون أن تتعلموا اليوم؟", () => {
            // ⏱️ بعد انتهاء learnPrompt + 1 ثانية
            learnPrompt.onended = () => {
              setTimeout(() => {
                showCardsWithSounds([card1Sound, card2Sound, card3Sound]);
              }, 1000);
            };
          });
        }, 1000);
      };
    });
  }, 2000);
}

// 🖋️ كتابة النص حرف بحرف
function animateText(element, text, callback) {
  element.innerHTML = "";
  let i = 0;
  const interval = setInterval(() => {
    element.innerHTML += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 70);
}

// 🧩 عرض البطاقات بالتدريج + أصواتها
function showCardsWithSounds(sounds) {
  const cards = [
    document.getElementById("card1"),
    document.getElementById("card2"),
    document.getElementById("card3")
  ];

  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("show");
      sounds[index].play();
    }, index * 1800); // ⏱️ كل 1.8 ثانية بطاقة
  });
}
