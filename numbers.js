// تعريف متغير للحرف الحالي
let current = 0;

// دالة لتحديث الصورة والصوت حسب current
function update() {
  const letters = [
    { image: "images/N0.png", sound: "assets/N0.mp3" },
    { image: "images/N1.png", sound: "assets/N1.mp3" },
    { image: "images/N2.png", sound: "assets/N2.mp3" },
    { image: "images/N3.png", sound: "assets/N3.mp3" },
    { image: "images/N4.png", sound: "assets/N4.mp3" },
    { image: "images/N5.png", sound: "assets/N5.mp3" },
    { image: "images/N6.png", sound: "assets/N6.mp3" },
    { image: "images/N7.png", sound: "assets/N7.mp3" },
    { image: "images/N8.png", sound: "assets/N8.mp3" },
    { image: "images/N9.png", sound: "assets/N9.mp3" },
    { image: "images/N10.png", sound: "assets/N10.mp3" },
  ];
  document.getElementById("image").src = letters[current].image;
  document.getElementById("audio").src = letters[current].sound;
}

// دالة التالي مع إظهار النافذة عند مضاعف 3
function nextLetter() {
current++;
const lettersLength = 11; // عدد الحروف
if (current >= lettersLength) {
  current = lettersLength - 1; // لا تتجاوز العدد
}
update();

// هنا التعديل المطلوب:
if ((current + 1) % 4 === 0) { // نافذة تظهر بعد مرور 4 أرقام
  document.getElementById("game-popup").style.display = "flex";
}
}
// دالة السابق
function prevLetter() {
  current--;
  if (current < 0) current = 0;
  update();
}

// دالة تشغيل الصوت
function playSound() {
  const audio = document.getElementById("audio");
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}

// إغلاق نافذة اللعبة
function closeGamePopup() {
  document.getElementById("game-popup").style.display = "none";
}

// تحميل الصورة الأولى عند فتح الصفحة
window.onload = () => {
  update();
}
