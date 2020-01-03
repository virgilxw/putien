$(document).ready(function () {
	var mainMap = L.map('MainMap', {
		zoomControl: false
	}).setView([25.45, 119.12], 12);
	L.control.scale().addTo(mainMap);


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
			opacity: 0,
			fillOpacity: 0.8
		}
	})
	var Tang_Shoreline = new L.GeoJSON.AJAX("./geojson/Tang_Shoreline_Addition.geojson", {
		style: {
			fillColor: "#fdcc8a",
			opacity: 0,
			fillOpacity: 0.8
		}
	})
	var Song_Shoreline = new L.GeoJSON.AJAX("./geojson/Song_Shoreline_Addition.geojson", {
		style: {
			fillColor: "#fc8d59",
			opacity: 0,
			fillOpacity: 0.8
		}
	})
	var Yuan_Shoreline = new L.GeoJSON.AJAX("./geojson/Yuan_Shoreline_Addition.geojson", {
		style: {
			fillColor: "#e34a33",
			opacity: 0,
			fillOpacity: 0.8
		}
	})
	var MingQing_Shoreline = new L.GeoJSON.AJAX("./geojson/MingQing_Shoreline_Addition.geojson", {
		style: {
			fillColor: "#b30000",
			opacity: 0,
			fillOpacity: 0.8
		}
	})

	function purge_Shoreline_Layers() {
		mainMap.removeLayer(Tang_Shoreline)
		mainMap.removeLayer(Song_Shoreline)
		mainMap.removeLayer(Yuan_Shoreline)
		mainMap.removeLayer(MingQing_Shoreline)
		mainMap.removeLayer(Ancient_Shoreline)
	}

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

	// Shoreline checkbox Settings
	$("input").checkboxradio({
		icon: false
	});

	// Irrigation
	var Irrigation_Poly = new L.GeoJSON.AJAX("./geojson/Irrigation_Poly.geojson", {
		style: {
			fillOpacity: 1,
			fillColor: "#53a3ff",
			weight: 0
		}
	})
	var Irrigation_Line = new L.GeoJSON.AJAX("./geojson/Irrigation_Line.geojson", {
		style: {
			color: "#53a3ff",
			weight: 1
		}
	})

	// ScrollMagic
	var controller = new ScrollMagic.Controller();

	// Shoreline Scene Functions
	function s1Enter() {
		inset1.addLayer(PutianMarker)
		inset1.flyTo([25.44, 119.01], 5)
	}

	function s2Enter() {
		$("#radio-Ancient").click()
		add_Ancient_Layer()
	}

	function s2aEnter() {
		$("#radio-Tang").click()
		add_Tang_Layer()
	}

	function s2bEnter() {
		$("#radio-Song").click()
		add_Song_Layer()
	}

	function s2cEnter() {
		$("#radio-Yuan").click()
		add_Yuan_Layer()
	}

	function s2dEnter() {
		$("#radio-Ming").click()
		add_MingQing_Layer()
	}

	function s3Enter() {
		purge_Shoreline_Layers()
		mainMap.addLayer(Irrigation_Poly)
		mainMap.addLayer(Irrigation_Line)
	}

	function s3Exit() {
		mainMap.removeLayer(Irrigation_Poly)
		mainMap.removeLayer(Irrigation_Line)
	}

	function s3aEnter() {

	}

	function s3aExit() {}

	// ScrollMagic Scenes
	var scene1 = new ScrollMagic.Scene({
			triggerElement: "#inset1Map"
		}).on("enter", s1Enter)
		.addIndicators({
			name: "Trigger inset 1"
		})
		.addTo(controller);

	// Shoreline Scene Scenes
	var scene2 = new ScrollMagic.Scene({
			triggerElement: ".shoreline",
			offset: 400,
			triggerHook: 0.4,
			duration: 900
		}).setPin(".shoreline")
		.on("enter", s2Enter)
		.on("leave", purge_Shoreline_Layers)
		.addIndicators({
			name: "Scene 2: pin + add Layer"
		})
		.addTo(controller);

	var scene2a = new ScrollMagic.Scene({
			triggerElement: ".shoreline",
			offset: 550,
			triggerHook: 0.4
		})
		.on("enter", s2aEnter)
		.on("leave", s2Enter)
		.addIndicators({
			name: "add Tang Layer"
		})
		.addTo(controller);

	var scene2b = new ScrollMagic.Scene({
			triggerElement: ".shoreline",
			offset: 700,
			triggerHook: 0.4
		})
		.on("enter", s2bEnter)
		.on("leave", s2aEnter)
		.addIndicators({
			name: "add Song Layer"
		})
		.addTo(controller);

	var scene2c = new ScrollMagic.Scene({
			triggerElement: ".shoreline",
			offset: 850,
			triggerHook: 0.4
		})
		.on("enter", s2cEnter)
		.on("leave", s2bEnter)
		.addIndicators({
			name: "add Yuan Layer"
		})
		.addTo(controller);

	var scene2d = new ScrollMagic.Scene({
			triggerElement: ".shoreline",
			offset: 1000,
			triggerHook: 0.4
		})
		.on("enter", s2dEnter)
		.on("leave", s2cEnter)
		.addIndicators({
			name: "add MingQing Layer"
		})
		.addTo(controller);

	var scene3 = new ScrollMagic.Scene({
			triggerElement: "#s3",
			offset: 200
		})
		.addIndicators({
			name: "Scene 3"
		})
		.on("enter", s3Enter)
		.on("leave", s3Exit)
		.addTo(controller);

	var scene3a = new ScrollMagic.Scene({
			triggerElement: "#s3",
			offset: 500
		})
		.addIndicators({
			name: "Scene 3a"
		})
		.on("enter", s3aEnter)
		.on("leave", s3aExit)
		.addTo(controller);
});
