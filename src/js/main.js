$(document).ready(function() {
  // Init time

  var jqNavs = $('li[data-menuanchor]');
  var jqSections = $('.section');
  var activeSection = '';

  // Scroll to position on click
  $('a[href^="#"]').on('click', function(event) {
  jqNavs.removeClass('active');
  $(this).addClass('active');
  activeSection = $(this).data('menuanchor');
  var target = $(this.hash);
  if( target.length ) {
      event.preventDefault();
      $('html, body').animate({
          scrollTop: target.offset().top - 85
      }, 1000);
    }
  });

  var onScrollWindow = function () {
    var scrollY = this.scrollY;
    var selectedElement = null;
    for (var idx = jqSections.length -1 ; idx >= 0; idx--) {
      var sectionItem = jqSections[idx];
      if (scrollY + 95 > sectionItem.offsetTop) {
        selectedElement = sectionItem;
        break;
      }
    }
    if (activeSection === $(selectedElement).attr('id')) {
      return;
    }
    activeSection = $(selectedElement).attr('id');
    jqNavs.removeClass('active');
    jqNavs.filter('[data-menuanchor="' + activeSection + '"]').addClass('active');
    // console.debug('selectedElement', selectedElement );
  };

  $(window).scroll(onScrollWindow);

    // Create a map object
  var map = new YMap(document.getElementById('map'));

  // Add map type control
  map.addTypeControl();

  // Add map zoom (long) control
  map.addZoomLong();

  // Add the Pan Control
  map.addPanControl();

  // Set map type to either of: YAHOO_MAP_SAT, YAHOO_MAP_HYB, YAHOO_MAP_REG
  map.setMapType(YAHOO_MAP_REG);

  // Display the map centered on a geocoded location
  map.drawZoomAndCenter("New York, NY", 4);
});