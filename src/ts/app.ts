// Import InstantClick (sorta)
declare var InstantClick: any;

// Loads popovers on page
const loadPopovers = () => {
  $('[data-toggle="popover"]').popover({
    html: true
  });
}

// Initial page load
$(document).ready(loadPopovers);

// Capture InstantClick page changes
InstantClick.on('change', () => {
  loadPopovers();
});
