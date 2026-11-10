(() => {
  const colors = [
    [217, 255, 255],
    [215, 250, 247],
    [212, 246, 236],
    [210, 242, 225],
    [208, 238, 214]
  ];
  let scheduled = false;

  function updateBackground() {
    scheduled = false;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.max(0, Math.min(window.scrollY / scrollable, 1)) : 0;
    const position = progress * (colors.length - 1);
    const index = Math.min(Math.floor(position), colors.length - 2);
    const fraction = position - index;
    const color = colors[index].map((channel, i) =>
      Math.round(channel + (colors[index + 1][i] - channel) * fraction)
    );
    document.body.style.setProperty('--project-background', color.join(', '));
  }

  function scheduleUpdate() {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(updateBackground);
    }
  }

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  document.addEventListener('toggle', scheduleUpdate, true);
  updateBackground();
})();
