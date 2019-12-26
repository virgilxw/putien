var map = L.map('MainMap').setView([25.35, 119.12], 12)
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);

var Ancient_Shoreline = new L.GeoJSON.AJAX("./geojson/1.Ancient_Shoreline.geojson", {
	fillColor: "#FF1654",
	fillOpacity: "0.2",
	color: "#FF1654",
	opacity: "1"
}).addTo(map);
