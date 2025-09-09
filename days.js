// ✅ شاشة البداية: تشغيل الصوت واختفاء الشاشة بعد 3 ثواني
window.addEventListener("load", () => {
  const intro = document.getElementById("intro-screen");
  const motivationAudio = document.getElementById("motivation-audio");

  // تشغيل صوت الترحيب
  motivationAudio.play().catch(() => {});

  // بعد 3 ثواني يخفي شاشة البداية
  setTimeout(() => {
    intro.style.display = "none";
    showDay(currentIndex); // عرض أول يوم
  }, 3000);
});

// ✅ مصفوفة الأيام (الاسم + الصورة + الصوت)
const days = [
  { name: "الأحد", image: "images/sunday.JPG", sound: "audio/sunday.mp3" },
  { name: "الإثنين", image: "images/monday.JPG", sound: "audio/monday.mp3" },
  { name: "الثلاثاء", image: "images/tuesday.png", sound: "audio/tuesday.mp3" },
  { name: "الأربعاء", image: "images/wednesday.png", sound: "audio/wednesday.mp3" },
  { name: "الخميس", image: "images/thursday.png", sound: "audio/thursday.mp3" },
  { name: "الجمعة", image: "images/friday.png", sound: "audio/friday.mp3" },
  { name: "السبت", image: "images/saturday.png", sound: "audio/saturday.mp3" }
];

let currentIndex = 0;

// ✅ عناصر HTML
const dayName = document.getElementById("dayName");
const image = document.getElementById("image");
const audio = document.getElementById("audio");
const congrats = document.getElementById("congrats");

// ✅ تحديث العرض
function showDay(index) {
  if (index >= 0 && index < days.length) {
    dayName.textContent = days[index].name;
    image.src = days[index].image;
    audio.src = days[index].sound;
    congrats.classList.add("hidden"); // إخفاء التهنئة
  } else if (index === days.length) {
    // عند الانتهاء
    dayName.textContent = "";
    image.src = "";
    audio.src = "";
    congrats.classList.remove("hidden"); // إظهار التهنئة
  }
}

// ✅ تشغيل الصوت لليوم الحالي
function playSound() {
  audio.play();
}

// ✅ زر التالي
function nextDay() {
  if (currentIndex < days.length) {
    currentIndex++;
    showDay(currentIndex);
  }
}

// ✅ زر السابق
function prevDay() {
  if (currentIndex > 0) {
    currentIndex--;
    showDay(currentIndex);
  }
}

// ✅ إعادة من البداية بعد التهنئة
function restart() {
  currentIndex = 0;
  showDay(currentIndex);
}
