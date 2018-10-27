// InstantClick
declare var InstantClick: any;
// Leaflet
declare var L: any;

// Loads popovers on page
const loadPopovers = () => {
  $('[data-toggle="popover"]').popover({
    html: true
  });
}

// Initialize map
const initMap = () => {
  // Create map
  const mymap = L.map('mapid').setView([45.4167038, -75.7069544], 20);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiaXZhbmZvbiIsImEiOiJjam5yam40eHcwOHdsM2tuMmZsMW9iYm9yIn0.5ug-3K3BGlOZg0Dsttp0WQ'
  }).addTo(mymap);

  // Add marker
  const marker = L.marker([45.4167038, -75.7069544])
    .addTo(mymap)
    .bindPopup("<b>OCE Spacesim</b><br><p>440 Albert Street,<br>Ottawa, ON K1R 5B5</p>")
    .openPopup();
}

// Initial page load
$(document).ready(() => {
  InstantClick.init();

  loadPopovers();
  initMap();
});

// Capture InstantClick page changes
InstantClick.on('change', () => {
  loadPopovers();
});
