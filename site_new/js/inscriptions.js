// Helper functions fro "Village Information" tab.

// Default style for (studied) village points
var default_style = {
    radius: 3,
    fillColor: "rgb(248, 108, 108)",
    color: "rgba(0, 0, 0, 0.3)",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
}

// Default style for alliance polygons
var alliance_default_style = {
    "color": "#000000",
    "weight": 2,
    "opacity": 0.3,
    "fillColor": "#67ff73",
    "fillOpacity": 0.1
}

function clearallUID() {
    // Helper function to clear all highlights

    for (const k in highlight_buffer) {
        clearlayerUID(k)
    }
    highlight_buffer = {};
    Village_Points_Studied.setStyle(default_style);
}

function highlightlayerUID(UID) {
    // Helper function to highlight village points by UID
    var match = false

    // Highlighting village
    Object.keys(highlight_buffer).forEach(function (key) {
        if (key == UID) {
            match = true
            highlight_buffer[UID] = highlight_buffer[UID] + 1
        }
    })

    if (match == false) {
        highlight_buffer[UID] = 1
    }


    if (UID.charAt(0) == "V") {
        var match = Village_Points_Studied.eachLayer(function (layer) {
            if (layer.feature.properties.UID_V == UID) {
                layer.setStyle({
                    radius: 7,
                    fillColor: "#cec719",
                    color: "#ff1400",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 1
                })
            }
        })
    } else if (UID.charAt(0) == "A") {
        // Highlighting alliance polygons

        var match = Alliance_Polygons_Studied.eachLayer(function (layer) {
            if (layer.feature.properties.TOWNSHIP == UID) {
                layer.setStyle({
                    fillColor: "#fff500",
                    color: "#ff1400",
                    weight: 4,
                    opacity: 1,
                    fillOpacity: 0.4
                })
            }
        })
    }
}

function clearlayerUID(UID) {

    // Helper function to clear highlight of a specific point
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
        if (UID.charAt(0) == "V") {
            var match = Village_Points_Studied.eachLayer(function (layer) {
                if (layer.feature.properties.UID_V == UID) {
                    layer.setStyle(default_style)
                }
            })
        } else if (UID.charAt(0) == "A") {
            var match = Alliance_Polygons_Studied.eachLayer(function (layer) {
                if (layer.feature.properties.TOWNSHIP == UID) {
                    layer.setStyle(alliance_default_style)
                }
            })
        }
    }
}

// Helper functions for "Yuanxiao Processions tab"
function generateprocessioncard(uid_r) {
    $.getJSON("./json/processions_info.json", function (data) {
        let obj = data.find(o => o.uid_r === uid_r)

        var text = "<div class='village_card'> <ul> <li>Ritual ID: <span id='ritual_id'>" + obj.uid_r + "</span></li> <li>Village Name: <span id='ritual_name'>" + obj.VillageName + "</span></li><li>Alliance Membership: <span id='ritual_alliance'>" + obj.UID_A + "</span></li><li>Start Date: <span id='ritual_start_date'>" + obj.startdate + "</span></li> <li>End Date: <span id='ritual_end_date'>" + obj.enddate + "</span></li> <li>Text: <span id='ritual_text'>" + obj.text + "</span></li> </ul> </div>"

        $("#ritualCardsCont").append(text)
    })
}

function clearVillageCards() {
    $("#ritualCardsCont").empty()
}

function clearallUID() {
    // Helper function to clear all highlights

    for (const k in highlight_buffer) {
        clearlayerUID(k)
    }
    highlight_buffer = {};
    Village_Points_Studied.setStyle(default_style);
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

var Not_studied = new L.GeoJSON.AJAX("./geojson/Non-studiedPoints.geojson", {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 2,
            fillColor: "rgb(108, 248, 151)",
            color: "rgba(0, 0, 0, 0.3)",
            weight: 1,
            opacity: 1,
            fillOpacity: 1
        })
    }
})

var Villagen_Poly = new L.GeoJSON.AJAX("./geojson/Village_Polygon.geojson", {
    style: {
        fillOpacity: 1,
        fillColor: "#6c6c6c",
        weight: 0
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
    }, {
        groupName: "Villages",
        expanded: true,
        layers: {
            "Villages Not Studied": Not_studied,
            "Buildings": Villagen_Poly
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

var Alliance_Polygons_Studied = new L.GeoJSON.AJAX("./geojson/Alliance_Polygons_Studied.geojson", {
    style: alliance_default_style
}).addTo(mainmap)

var Village_Points_Studied = new L.GeoJSON.AJAX("./geojson/Village_Points_Studied.geojson", {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, default_style)
    }
}).addTo(mainmap)

Village_Points_Studied.on("click", function (event) {

    clearallUID();
    highlightlayerUID(event.layer.feature.properties.UID_V);

    var path = "./inscriptions/" + event.layer.feature.properties.UID_V + ".txt"

    var inscriptions_string = $.ajax({
        url: path,
        async: false
    }).responseText;

    console.log(inscriptions_string)

    console.log(event.latlng)
    var popup = L.popup({
            maxHeight: 500,
            maxWidth: 600,
            closeOnClick: false,
            keepInView: true
        })
        .setLatLng(event.latlng)
        .setContent(inscriptions_string)
        .openOn(mainmap);



    sidebar.open('home');
    $("#info_uid").text(event.layer.feature.properties.UID_V)

    $.getJSON("./json/raw_data.json", function (raw_data) {
        let obj = raw_data.find(o => o.UID === event.layer.feature.properties.UID_V);

        namestring = obj.Name + " " + obj.Name_zh

        $("#info_village_name").text(namestring)

        field_data = "<span> <h4>Village Settlement:</h4> </span> <span id='village_settlement'>" + obj.Village_Settlement + "</span> <span> <h4>Surname Groups:</h4> </span> <span id='Surname_Groups'>" + obj.Surname_Groups + "</span> <span> <h4>Village Temples:</h4> </span> <span id='Village_Temples'>" + obj.Village_Temples + "</span> <span> <h4>Yuanxiao Processions:</h4> </span> <span id='Rituals_Yuanxiao_Processions'>" + obj.Rituals_Yuanxiao_Processions + "</span> <span> <h4>Birthday Celebration of gods:</h4> </span> <span id='Rituals_Birthday_Celebration_of_gods'>" + obj.Rituals_Birthday_Celebration_of_gods + "</span> <span> <h4>Ritual Groups (if present):</h4> </span> <span id='Rituals_Ritual_Groups'>" + obj.Rituals_Ritual_Groups + "</span>"

        $("#info_field").html(field_data)
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


Alliance_Polygons_Studied.on("click", function (event) {

    clearallUID();
    highlightlayerUID(event.layer.feature.properties.TOWNSHIP)
    sidebar.open('home');

    $.getJSON("./json/Alliance_raw_text.json", function (raw_data) {

        let obj = raw_data.find(o => o.UID_A === event.layer.feature.properties.TOWNSHIP);

        namestring = obj.name + " " + obj.name_zh

        $("#info_village_name").text(namestring)

        $("#info_field").html(obj.raw_text)
    })
}).on("mouseover", function (event) {
    event.layer.setStyle({
        weight: 5,
    });
}).on("mouseout", function (event) {
    event.layer.setStyle({
        weight: 2
    })
})

// buffer to track what items are selected
highlight_buffer = {}

$(document).ready(function () {


    $("#alliances_studied").change(function () {
        if (this.checked) {
            mainmap.addLayer(Alliance_Polygons_Studied)
        } else {
            mainmap.removeLayer(Alliance_Polygons_Studied)
        }
    });

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

    var $select = $('#select-alliance').selectize({
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
            clearlayerUID(val)
        },
        load: function (query, callback) {
            if (!query.length) return callback();
            $.ajax({
                url: './json/Alliance_search.json',
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
    })

    mainmap.invalidateSize()

})
