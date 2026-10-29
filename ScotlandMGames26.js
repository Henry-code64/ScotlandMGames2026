// Fade cards in as they scroll into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // animate only once
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 0.05}s`; // small stagger across a row
  observer.observe(el);
});

// Countdown to event day (date comes from data-date in the HTML)
const countdown = document.querySelector('.countdown');

if (countdown) {
  const target = new Date(countdown.dataset.date);
  const units = { days: 86400000, hours: 3600000, mins: 60000, secs: 1000 };

  const update = () => {
    let left = Math.max(0, target - Date.now());
    for (const [unit, ms] of Object.entries(units)) {
      const el = countdown.querySelector(`[data-unit="${unit}"]`);
      const value = String(Math.floor(left / ms)).padStart(2, '0');
      left %= ms;
      if (el.textContent !== value) {
        el.textContent = value;
        el.classList.remove('tick');
        void el.offsetWidth; // restart the animation
        el.classList.add('tick');
      }
    }
  };

  update();
  setInterval(update, 1000);
}
