document.addEventListener('DOMContentLoaded', () => {
  const maxPicks = 3;
  const maxBans = 2;
  let pickedMaps = [];
  let bannedMaps = [];

  const maps = document.querySelectorAll('.map');
  const banButton = document.getElementById('banButton');
  const pickButton = document.getElementById('pickButton');
  const resetButton = document.getElementById('resetButton');

  function updateMapStyles() {
    maps.forEach(map => {
      const mapName = map.dataset.map;
      if (bannedMaps.includes(mapName)) {
        map.classList.add('banned');
        map.classList.remove('picked');
      } else if (pickedMaps.includes(mapName)) {
        map.classList.add('picked');
        map.classList.remove('banned');
      } else {
        map.classList.remove('banned', 'picked');
      }
    });
  }

  function handleMapClick(e) {
    const mapElement = e.currentTarget;
    const mapName = mapElement.dataset.map;

    if (banMode) {
      if (bannedMaps.includes(mapName)) {
        // Deselect if already banned
        bannedMaps = bannedMaps.filter(map => map !== mapName);
      } else if (bannedMaps.length < maxBans) {
        // Select if not already banned and under limit
        bannedMaps.push(mapName);
      }
    } else {
      if (pickedMaps.includes(mapName)) {
        // Deselect if already picked
        pickedMaps = pickedMaps.filter(map => map !== mapName);
      } else if (pickedMaps.length < maxPicks) {
        // Select if not already picked and under limit
        pickedMaps.push(mapName);
      }
    }

    updateMapStyles();
  }

  function resetSelections() {
    bannedMaps = [];
    pickedMaps = [];
    updateMapStyles();
  }

  let banMode = false;
  banButton.addEventListener('click', () => banMode = true);
  pickButton.addEventListener('click', () => banMode = false);
  resetButton.addEventListener('click', resetSelections);

  maps.forEach(map => map.addEventListener('click', handleMapClick));
});
