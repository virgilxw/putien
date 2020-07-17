// select layer by uid
function highlightlayerUID(UID) {
    var match = Village_Points_Studied.eachLayer(function (layer) {
        if (layer.feature.properties.UID_V == UID) {
            layer.setStyle({
                radius: 7,
                fillColor: "#fff500",
                color: "#ff1400",
                weight: 3,
                opacity: 1,
                fillOpacity: 1
            })
        }
    })
}

// select layer by uid
function clearlayerUID(UID) {
    var match = Village_Points_Studied.eachLayer(function (layer) {
        if (layer.feature.properties.UID_V == UID) {
            layer.setStyle({
                radius: 3,
                fillColor: "rgba(155, 255, 213, 0.3)",
                color: "rgba(0, 0, 0, 0.3)",
                weight: 1,
                opacity: 1,
                fillOpacity: 1
            })
        }
    })
}

var mainmap = L.map('mapcont').setView([25.40, 119.1], 11);

var streetmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mainmap);

// Basemap
var Esri_WorldImagery = new L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
})

// Shorelines
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

// map layer select

var baseMaps = [
    {
        groupName: "Base Maps",
        expanded: true,
        layers: {
            "Satellite": Esri_WorldImagery,
            "Street Map": streetmap,
        }
    }
];

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

var control = L.Control.styledLayerControl(baseMaps, overlays, options);
mainmap.addControl(control);

// Sidebar configuration

var sidebar = L.control.sidebar({
    autopan: true, // whether to maintain the centered map point when opening the sidebar
    closeButton: true, // whether t add a close button to the panes
    container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
    position: 'left', // left or right
}).addTo(mainmap);

var Village_Points_Studied = new L.GeoJSON.AJAX("./geojson/Village_Points_Studied.geojson", {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 3,
            fillColor: "rgba(155, 255, 213, 0.3)",
            color: "rgba(0, 0, 0, 0.3)",
            weight: 1,
            opacity: 1,
            fillOpacity: 1
        })
    }
}).addTo(mainmap)

Village_Points_Studied.on("click", function (event) {

    sidebar.open('home');
    $("#info_uid").text(event.layer.feature.properties.UID_V)

    $.getJSON("./json/raw_data.json", function (raw_data) {
        let obj = raw_data.find(o => o.UID === event.layer.feature.properties.UID_V);
        console.log(obj);

        namestring = obj.Name + " " + obj.Name_zh

        $("#info_village_name").text(namestring)
        $("#village_settlement").text(obj.Village_Settlement)
        $("#Surname_Groups").text(obj.Surname_Groups)
        $("#Village_Temples").text(obj.Village_Temples)
        $("#Rituals_Yuanxiao_Processions").text(obj.Rituals_Yuanxiao_Processions)
        $("#Rituals_Birthday_Celebration_of_gods").text(obj.Rituals_Birthday_Celebration_of_gods)
        $("#Rituals_Ritual_Groups").text(obj.Rituals_Ritual_Groups)
    })
})

$('.select2-search').select2({
    placeholder: "enter search term",
    ajax: {
        url: './json/searchdata.json',
        dataType: 'json'
        // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
    }
});


$(document).ready(function () {

    $("#villages_studied").change(function () {
        if (this.checked) {
            mainmap.addLayer(Village_Points_Studied)
        } else {
            mainmap.removeLayer(Village_Points_Studied)
        }
    });

    $(".select2-search").on("select2:select",
        function (e) {
            highlightlayerUID(e.params.data.id)
        })

    $(".select2-search").on("select2:unselect",
        function (e) {
            clearlayerUID(e.params.data.id)
        })

    $("#clear").on("click", function () {

        Village_Points_Studied.setStyle({
            radius: 3,
            fillColor: "rgba(155, 255, 213, 0.3)",
            color: "rgba(0, 0, 0, 0.3)",
            weight: 1,
            opacity: 1,
            fillOpacity: 1
        })
        $('.select2-search').val(null).trigger('change');
    })
})
