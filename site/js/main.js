$(document).ready(function () {
	var mainMap = L.map('MainMap').setView([25.45, 119.12], 12)
	var inset1 = L.map('inset1Map', {
		zoomControl: false,
		attributionControl: false
	}).setView([25.44, 119.01], 12)


	var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	}).addTo(mainMap);

	var Esri_NatGeoWorldMap = new L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
		maxZoom: 16
	}).addTo(inset1)

	var PutianMarker = new L.Marker([25.44, 119.01]);

	// Shorelines
	var Ancient_Shoreline = new L.GeoJSON.AJAX("./geojson/Ancient_Shoreline.geojson", {
		style: {
			fillColor: "#fef0d9",
			color: "black",
			opacity: 0.5,
			fillOpacity: 0.8
		}
	})
	var Tang_Shoreline = new L.GeoJSON.AJAX("./geojson/Tang_Shoreline_Addition.geojson", {
		style: {
			fillColor: "#fdcc8a",
			color: "black",
			opacity: 0.5,
			fillOpacity: 0.8
		}
	})
	var Song_Shoreline = new L.GeoJSON.AJAX("./geojson/Song_Shoreline_Addition.geojson", {
		style: {
			fillColor: "#fc8d59",
			color: "black",
			opacity: 0.5,
			fillOpacity: 0.8
		}
	})
	var Yuan_Shoreline = new L.GeoJSON.AJAX("./geojson/Yuan_Shoreline_Addition.geojson", {
		style: {
			fillColor: "#e34a33",
			color: "black",
			opacity: 0.5,
			fillOpacity: 0.8
		}
	})
	var MingQing_Shoreline = new L.GeoJSON.AJAX("./geojson/MingQing_Shoreline_Addition.geojson", {
		style: {
			fillColor: "#b30000",
			color: "black",
			opacity: 0.5,
			fillOpacity: 0.8
		}
	})

	function add_Ancient_Layer() {
		mainMap.removeLayer(Tang_Shoreline)
		mainMap.removeLayer(Song_Shoreline)
		mainMap.removeLayer(Yuan_Shoreline)
		mainMap.removeLayer(MingQing_Shoreline)
		mainMap.addLayer(Ancient_Shoreline)
	}

	function add_Tang_Layer() {
		mainMap.removeLayer(Ancient_Shoreline)
		mainMap.removeLayer(Song_Shoreline)
		mainMap.removeLayer(Yuan_Shoreline)
		mainMap.removeLayer(MingQing_Shoreline)
		mainMap.addLayer(Ancient_Shoreline)
		mainMap.addLayer(Tang_Shoreline)
	}

	function add_Song_Layer() {
		mainMap.removeLayer(Ancient_Shoreline)
		mainMap.removeLayer(Tang_Shoreline)
		mainMap.removeLayer(Yuan_Shoreline)
		mainMap.removeLayer(MingQing_Shoreline)
		mainMap.addLayer(Ancient_Shoreline)
		mainMap.addLayer(Tang_Shoreline)
		mainMap.addLayer(Song_Shoreline)
	}

	function add_Yuan_Layer() {
		mainMap.removeLayer(Ancient_Shoreline)
		mainMap.removeLayer(Tang_Shoreline)
		mainMap.removeLayer(Song_Shoreline)
		mainMap.removeLayer(MingQing_Shoreline)
		mainMap.addLayer(Ancient_Shoreline)
		mainMap.addLayer(Tang_Shoreline)
		mainMap.addLayer(Song_Shoreline)
		mainMap.addLayer(Yuan_Shoreline)
	}

	function add_MingQing_Layer() {
		mainMap.removeLayer(Ancient_Shoreline)
		mainMap.removeLayer(Tang_Shoreline)
		mainMap.removeLayer(Song_Shoreline)
		mainMap.removeLayer(Yuan_Shoreline)
		mainMap.addLayer(Ancient_Shoreline)
		mainMap.addLayer(Tang_Shoreline)
		mainMap.addLayer(Song_Shoreline)
		mainMap.addLayer(Yuan_Shoreline)
		mainMap.addLayer(MingQing_Shoreline)
	}
	$('.shoreline label').click(function () {
		switch ($(this)[0].htmlFor) {
			case "radio-Ancient":
				add_Ancient_Layer()
				break;
			case "radio-Tang":
				add_Tang_Layer()
				break;
			case "radio-Song":
				add_Song_Layer()
				break;
			case "radio-Yuan":
				add_Yuan_Layer()
				break;
			case "radio-Ming":
				add_MingQing_Layer()
				break;
		}
	})

	// Shoreline slider
	$("input").checkboxradio({
		icon: false
	});


	// ScrollMagic
	var controller = new ScrollMagic.Controller();

	// ScrollMagic Scenes
	function s1Enter() {
		inset1.addLayer(PutianMarker)
		inset1.flyTo([25.44, 119.01], 5)
	}

	function s1Exit() {}

	var scene1 = new ScrollMagic.Scene({
			triggerElement: "#inset1Map"
		}).on("enter", s1Enter)
		.addIndicators({
			name: "s1"
		})
		.addTo(controller);
});
