//declare layers
var standard = L.tileLayer.provider('OpenStreetMap.Mapnik');
var sat = L.tileLayer.provider('Esri.WorldImagery');
var stamentoner = L.tileLayer.provider('Stamen.Toner');

//basemaps
var basemaps = {
    'Standard Map': standard,
    'Satellite Image': sat,
    'Toner': stamentoner
}

//Main map
var map = L.map('map', {
    center:[8.13248217875694, 124.33622360229494], //lat, long
    zoom: 11,
    layers: [standard]
});


//Iligan City boundary geoJSON wikidata:Q285488 export geoJSON on overpass turbo, finalize on geojson.io
var geoOptions = {
    maxZoom: 16,
    tolerance: 0,
    debug: 0,
    style:{
        color: "#0000FF",
    },
};
//OSM wikidata Q285488
var ic_admin = L.geoJson(lineJSON, geoOptions).addTo(map);

//shapefile
// var ic_full_admin = L.geoJson(ic_full_admin, geoOptions).addTo(map);

//declare overlays
var labels = L.tileLayer.provider('Stamen.TonerLabels');
var streets = L.tileLayer.provider('Stamen.TonerLines');

//initialize overlays
var overlays = {
    "Iligan Admin Boundary": ic_admin,
    //"full admin boundaries": ic_full_admin,
    "labels": labels,
    'streets': streets
}

//map layers/ control layer of basemaps and overlays
var maplayers = L.control.layers(basemaps,overlays).addTo(map);

//search Control plugin https://github.com/perliedman/leaflet-control-geocoder
L.Control.geocoder().addTo(map);
//leaflet-locate plugin https://github.com/domoritz/leaflet-locatecontrol
L.control.locate().addTo(map);


var addMarker = false;
var marker = null;

document.querySelector(".addev").addEventListener("click", function() {
  addMarker = !addMarker; // toggle addMarker variable

  if (addMarker) {
    // enable marker adding
    map.on("click", function(ev) {
      if (marker !== null) {
        map.removeLayer(marker); // remove previous marker
      }
      marker = new L.marker(ev.latlng).addTo(map);
      var coordinates = map.mouseEventToLatLng(ev.originalEvent);
      showModal(coordinates.lat, coordinates.lng);
    });
  } else {
    // disable marker adding
    map.off("click");
  }
});


function showModal(latitude, longitude) {
    var modalWrap = null;
/**
 * 
 * @param {string} title 
 * @param {string} description content of modal body 
 * @param {string} yesBtnLabel label of Yes button 
 * @param {string} noBtnLabel label of No button 
 * @param {function} callback callback function when click Yes button
 */
  if (modalWrap !== null) {
    modalWrap.remove();
  }

  modalWrap = document.createElement('div');
  modalWrap.innerHTML = `
    <div class="modal fade" tabindex="-1" data-bs-backdrop="static">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-light">
            <h5 class="modal-title">Add Report Description</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
        <form id="addevform">
          <div class="row g-3">
            <div class="col-sm-6">
            <div class="input-group">
          <input type="text" id="fname" class="form-control" placeholder="First Name">
          </div>
          </div>

          <div class="col-sm-6">
          <div class="input-group">
          <input type="text" id="lname" class="form-control" placeholder="Last Name">
        </div>
        </div>
        </div>

        <div class="input-group pt-2 col-auto">
          <span class="input-group-text">Lat and Lng</span>
          <input type="text" id="forlat" class="form-control " value="${latitude}" disabled>
          <input type="text" id="forlng" class="form-control " value="${longitude}" disabled>
        </div>

        <div class="pt-2">
        <textarea class="form-control pt-2" id="eventdesc" rows="3" placeholder = "Enter Event Description"></textarea>
        </div>
          </div>
          
          <div class="modal-footer bg-light">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-primary modal-success-btn save_btn" id="saverepbtn">Save</button>
          </div>
          </form>
        </div>
      </div>
    </div>
  `;

  document.body.append(modalWrap);

  var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
  modal.show();

  const form = modalWrap.querySelector('#addevform');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fname = form.querySelector('#fname').value;
    const lname = form.querySelector('#lname').value;
    const lat = form.querySelector('#forlat').value;
    const lng = form.querySelector('#forlng').value;
    const eventDesc = form.querySelector('#eventdesc').value;

    const reportData = { fname, lname, lat, lng, eventDesc };
    handleReportData(reportData);

    modal.hide();
  });
}
//create marker onclick

//create lat and lng on click
//map.on('click', function(ev))
/*
- Decide if mag butang pa ug layer for barangays or IC admin boundary nalang
- find ways na malimit ang marker to iligan city
*/

/* 
important resources for geoJson
mapshaper
overpass turbo
geojson.io
*/