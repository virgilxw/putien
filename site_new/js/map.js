var default_style = {
    radius: 3,
    fillColor: "rgba(155, 255, 213, 0.3)",
    color: "rgba(0, 0, 0, 0.3)",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
}

// select layer by uid
function highlightlayerUID(UID) {

    var match = false
    console.log(UID)
    Object.keys(highlight_buffer).forEach(function (key) {
        if (key == UID) {
            match = true
            highlight_buffer[UID] = highlight_buffer[UID] + 1
        }
    })

    if (match == false) {
        highlight_buffer[UID] = 1
    }

    var match = Village_Points_Studied.eachLayer(function (layer) {
        if (layer.feature.properties.UID_V == UID) {
            layer.setStyle({
                radius: 7,
                fillColor: "#fff500",
                color: "#ff1400",
                weight: 1,
                opacity: 1,
                fillOpacity: 1
            })
        }
    })
}

function clearlayerUID(UID) {
    Object.keys(highlight_buffer).forEach(function (key) {
        if (key == UID) {
            match = true
            highlight_buffer[UID] = highlight_buffer[UID] - 1

            if (highlight_buffer[UID] < 0) {
                highlight_buffer[UID] = 0
            }
        }
    })

    if (highlight_buffer[UID] == 0) {
        var match = Village_Points_Studied.eachLayer(function (layer) {
            if (layer.feature.properties.UID_V == UID) {
                layer.setStyle(default_style)
            }
        })
    }
}

function clearallUID() {
    for (const k in highlight_buffer) {
        clearlayerUID(k)
    }

    highlight_buffer = {}
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
        return L.circleMarker(latlng, default_style)
    }
}).addTo(mainmap)

Village_Points_Studied.on("click", function (event) {

    clearallUID();
    highlightlayerUID(event.layer.feature.properties.UID_V);

    sidebar.open('home');
    $("#info_uid").text(event.layer.feature.properties.UID_V)

    $.getJSON("./json/raw_data.json", function (raw_data) {
        let obj = raw_data.find(o => o.UID === event.layer.feature.properties.UID_V);

        namestring = obj.Name + " " + obj.Name_zh

        $("#info_village_name").text(namestring)
        $("#village_settlement").text(obj.Village_Settlement)
        $("#Surname_Groups").text(obj.Surname_Groups)
        $("#Village_Temples").text(obj.Village_Temples)
        $("#Rituals_Yuanxiao_Processions").text(obj.Rituals_Yuanxiao_Processions)
        $("#Rituals_Birthday_Celebration_of_gods").text(obj.Rituals_Birthday_Celebration_of_gods)
        $("#Rituals_Ritual_Groups").text(obj.Rituals_Ritual_Groups)
    })
}).on("mouseover", function (event) {
    event.layer.setStyle({
        weight: 3
    });
}).on("mouseout", function (event) {
    event.layer.setStyle({
        weight: 1
    })
})


highlight_buffer = {}

$(document).ready(function () {

    $("#villages_studied").change(function () {
        if (this.checked) {
            mainmap.addLayer(Village_Points_Studied)
        } else {
            mainmap.removeLayer(Village_Points_Studied)
        }
    });



    var $select = $('#select-village').selectize({
        maxItems: null,
        valueField: 'id',
        labelField: 'title',
        searchField: 'title',
        options: [],
        create: false,
        onItemAdd: function (val) {
            highlightlayerUID(val)
        },
        onItemRemove: function (val) {
            clearlayerUID(e.params.data.id)
        },
        load: function (query, callback) {
            if (!query.length) return callback();
            $.ajax({
                url: './json/village_search.json',
                type: 'GET',
                dataType: 'json',
                data: {},
                error: function () {
                    callback();
                },
                success: function (res) {
                    callback(res);
                }
            });
        }
    });


    var $select = $('#select-gods').selectize({
        maxItems: null,
        valueField: 'id',
        labelField: 'title',
        searchField: 'title',
        options: [],
        create: false,
        onItemAdd: function (val) {
            array = val.split(",")
            for (i = 0, len = array.length; i < len; i++) {
                highlightlayerUID(array[i])
                console.log(array[i])
            }
        },
        onItemRemove: function (val) {
            array = val.split(",")
            for (i = 0, len = array.length; i < len; i++) {
                clearlayerUID(array[i])
            }
        },
        load: function (query, callback) {
            if (!query.length) return callback();
            $.ajax({
                url: './json/primary_god_search.json',
                type: 'GET',
                dataType: 'json',
                error: function () {
                    callback();
                },
                success: function (res) {
                    callback(res);
                }
            });
        }
    });

    // clear button
    $("#clear").click(function () {
        clearallUID();
    })
})
