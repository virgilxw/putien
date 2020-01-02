$(document).ready(function () {
	var mainMap = L.map('MainMap').setView([25.35, 119.12], 12)
	var inset1 = L.map('inset1', {
		zoomControl: false,
		attributionControl: false
	}).setView([25.44, 119.01], 12)


	var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	}).addTo(mainMap);

	var Ancient_Shoreline = new L.GeoJSON.AJAX("./geojson/1.Ancient_Shoreline.geojson", {
		fillColor: "#FF1654",
		fillOpacity: "0.2",
		color: "#FF1654",
		opacity: "1"
	}).addTo(mainMap);

	var Esri_NatGeoWorldMap = new L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
		maxZoom: 16
	}).addTo(inset1)

	var PutianMarker = new L.Marker([25.44, 119.01]);

	// ScrollMagic Scenes
	function s1Enter() {
		mainMap.flyTo([25.35, 119.12], 10)
		// $(".leaflet-marker-icon").position()
	}

	function s1Exit() {

		mainMap.flyTo([25.35, 119.12], 12)
	}

	// ScrollMagic Scenes
	function s2Enter() {
		inset1.addLayer(PutianMarker)
		inset1.flyTo([25.44, 119.01], 5)
	}

	function s2Exit() {

		mainMap.flyTo([25.35, 119.12], 10)
	}


	// ScrollMagic
	var controller = new ScrollMagic.Controller();

	var scene1 = new ScrollMagic.Scene({
			triggerElement: "#landing",
			offset: $("#landing").height()
		}).on("enter", s1Enter)
		.on("leave", s1Exit)
		.addIndicators({
			name: "s1"
		})
		.addTo(controller);

	var scene2 = new ScrollMagic.Scene({
			triggerElement: "#s2"
		}).on("enter", s2Enter)
		.on("leave", s2Exit)
		.addIndicators({
			name: "s2"
		})
		.addTo(controller);
});
