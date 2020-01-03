$(document).ready(function () {
	var mainMap = L.map('MainMap').setView([25.45, 119.12], 12);
	L.control.scale().addTo(mainMap);


	// Base Maps
	var Esri_WorldImagery = new L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	})

	var CartoDB_Voyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
		subdomains: 'abcd',
		maxZoom: 19
	});

	var OSM_Chinese = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	});

	var baseMaps = [
		{
			groupName: "Base Maps",
			expanded: true,
			layers: {
				"Satellite": Esri_WorldImagery,
				"Political": CartoDB_Voyager,
				"Chinese Language": OSM_Chinese
			}
		}
	];

	var Ancient_Shoreline = new L.GeoJSON.AJAX("./geojson/Ancient_Shoreline_Inverted.geojson", {
		style: {
			fillColor: "#9ecae1",
			opacity: 0,
			fillOpacity: 0.8
		}
	})
	var Tang_Shoreline = new L.GeoJSON.AJAX("./geojson/Tang_Shoreline_Inverted.geojson", {
		style: {
			fillColor: "#6baed6",
			opacity: 0,
			fillOpacity: 0.8
		}
	})
	var Song_Shoreline = new L.GeoJSON.AJAX("./geojson/Song_Shoreline_Inverted.geojson", {
		style: {
			fillColor: "#4292c6",
			opacity: 0,
			fillOpacity: 0.8
		}
	})
	var Yuan_Shoreline = new L.GeoJSON.AJAX("./geojson/Yuan_Shoreline_Inverted.geojson", {
		style: {
			fillColor: "#2171b5",
			opacity: 0,
			fillOpacity: 0.8
		}
	})
	var MingQing_Shoreline = new L.GeoJSON.AJAX("./geojson/MingQing_Shoreline_Inverted.geojson", {
		style: {
			fillColor: "#084594",
			opacity: 0,
			fillOpacity: 0.8
		}
	})

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

	var overlays = [
		{
			groupName: "Shorelines",
			expanded: true,
			layers: {
				"Ancient": Ancient_Shoreline,
				"Tang Dynasty (~750 A.D.)": Tang_Shoreline,
				"Song Dynasty (~1100 A.D.)": Song_Shoreline,
				"Yuan Dynasty (~1300 A.D.)": Yuan_Shoreline,
				"Ming-Qing Transition (~1644 A.D.)": MingQing_Shoreline
			}
		}, {
			groupName: "Water and Irrigation",
			expanded: true,
			layers: {
				"Canals": Irrigation_Line,
				"Major Water Bodies": Irrigation_Poly
			}
		}
	];

	var options = {
		container_width: "300px",
		//container_maxHeight: "1000px",
		group_maxHeight: "200px",
		exclusive: false,
		collapsed: false
	};

	mainMap.addLayer(CartoDB_Voyager)
	var control = L.Control.styledLayerControl(baseMaps, overlays, options);
	mainMap.addControl(control);
})
