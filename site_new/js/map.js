// Helper functions fro "Village Information" tab.

// Default style for (studied) village points
var default_style = {
    radius: 3,
    fillColor: "#3182bd",
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

function highlightlayerUID(UID, sec = false) {
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


    if (UID.charAt(0) == "V" && sec == false) {
        var match = Village_Points_Studied.eachLayer(function (layer) {
            if (layer.feature.properties.UID_V == UID) {
                layer.setStyle({
                    radius: 7,
                    fillColor: "#fdae6b",
                    color: "#ff0000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 1
                })
            }
        })
    } else if (UID.charAt(0) == "V" && sec == true) {
        var match = Village_Points_Studied.eachLayer(function (layer) {
            if (layer.feature.properties.UID_V == UID) {
                layer.setStyle({
                    radius: 7,
                    fillColor: "#fee6ce",
                    color: "#ff0000",
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

// Helper functions for "Yuanxiao Processions tab"
function generatebirthdayncard(uid_b) {
    $.getJSON("./json/birthday_celebrations.json", function (data) {
        let obj = data.find(o => o.uid_b === uid_b)

        $.getJSON("./json/raw_data.json", function (data2) {

            let obj2 = data2.find(o => o.UID === uid_b.substring(0, 4));

            var text = "<div class='village_card'> <ul> <li>Ritual ID: <span id='ritual_id'>" + obj.uid_b + "</span></li> <li>Village Name: <span id='ritual_name'>" + obj2.Name + " " + obj2.Name_zh + "</span></li><li>Start Date: <span id='ritual_start_date'>" + obj.startdate + "</span></li> <li>End Date: <span id='ritual_end_date'>" + obj.enddate + "</span></li> <li>Text: <span id='ritual_text'>" + obj.text + "</span></li> </ul> </div>"

            $("#birthdayCardCont").append(text)
        })
    })
}

var mainmap = L.map('mapcont').setView([25.40, 119.1], 11);

var streetmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmlyZ2lseHciLCJhIjoiY2xncjR3cWg5MTU3NTNwbXRvZGR1YTB0aCJ9.3BvcTt_rt9WSPpePiM3kQw', {
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
var Ancient_Shoreline = new L.GeoJSON.AJAX("./geojson/Ancient_Shoreline_Inverted.json", {
    style: {
        fillColor: "#9ecae1",
        opacity: 0,
        fillOpacity: 0.8
    }
})
var Tang_Shoreline = new L.GeoJSON.AJAX("./geojson/Tang_Shoreline_Inverted.json", {
    style: {
        fillColor: "#6baed6",
        opacity: 0,
        fillOpacity: 0.8
    }
})
var Song_Shoreline = new L.GeoJSON.AJAX("./geojson/Song_Shoreline_Inverted.json", {
    style: {
        fillColor: "#4292c6",
        opacity: 0,
        fillOpacity: 0.8
    }
})
var Yuan_Shoreline = new L.GeoJSON.AJAX("./geojson/Yuan_Shoreline_Inverted.json", {
    style: {
        fillColor: "#2171b5",
        opacity: 0,
        fillOpacity: 0.8
    }
})
var MingQing_Shoreline = new L.GeoJSON.AJAX("./geojson/MingQing_Shoreline_Inverted.json", {
    style: {
        fillColor: "#084594",
        opacity: 0,
        fillOpacity: 0.8
    }
})

// Irrigation
var Irrigation_Poly = new L.GeoJSON.AJAX("./geojson/Irrigation_Poly.json", {
    style: {
        fillOpacity: 1,
        fillColor: "#53a3ff",
        weight: 0
    }
})
var Irrigation_Line = new L.GeoJSON.AJAX("./geojson/Irrigation_Line.json", {
    style: {
        color: "#53a3ff",
        weight: 1
    }
})

var Not_studied = new L.GeoJSON.AJAX("./geojson/Non-studiedPoints.json", {
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

var Villagen_Poly = new L.GeoJSON.AJAX("./geojson/Village_Polygon.json", {
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

var Alliance_Polygons_Studied = new L.GeoJSON.AJAX("./geojson/Alliance_Polygons_Studied.json", {
    style: alliance_default_style
}).addTo(mainmap)

var Village_Points_Studied = new L.GeoJSON.AJAX("./geojson/Village_Points_Studied.json", {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, default_style)
    }
}).addTo(mainmap)

// buffer to track what items are selected
highlight_buffer = {}

// Formating text helper function
function month_text_format(month) {
    switch (month) {
        case "1":
            return "First Lunar month";

        case "2":
            return "Second Lunar month";

        case "3":
            return "Third Lunar month";

        case "4":
            return "Fourth Lunar month";

        case "5":
            return "Fifth Lunar month";

        case "6":
            return "Sixth Lunar month";

        case "7":
            return "Seventh Lunar month";

        case "8":
            return "Eighth Lunar month";

        case "9":
            return "Nineth Lunar month";

        case "10":
            return "Tenth Lunar month";

        case "11":
            return "Eleventh Lunar month";

        case "12":
            return "Twelveth Lunar month";

    }
}

// Toggle chinese descriptions
function turn_on_descriptions() {

    Village_Points_Studied.off("click")

    Village_Points_Studied.on("click", function (event) {

        clearallUID();
        highlightlayerUID(event.layer.feature.properties.UID_V);

        var path = "./inscriptions/" + event.layer.feature.properties.UID_V + ".txt"

        var inscriptions_string = $.ajax({
            url: path,
            async: false
        }).responseText;

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

        var path = "./inscriptions/" + event.layer.feature.properties.TOWNSHIP + ".txt"

        var inscriptions_string = $.ajax({
            url: path,
            async: false
        }).responseText;

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

}

function turn_off_descriptions() {
    Village_Points_Studied.off("click")

    Village_Points_Studied.on("click", function (event) {

        clearallUID();
        highlightlayerUID(event.layer.feature.properties.UID_V);

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


    Alliance_Polygons_Studied.off("click")

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
            weight: 3
        });
    }).on("mouseout", function (event) {
        event.layer.setStyle({
            weight: 1
        })
    })

    Alliance_Polygons_Studied.off("click")

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
}

$(document).ready(function () {

    $("#toggle_chinese").change(function () {
        if (this.checked) {
            turn_on_descriptions()
        } else {
            turn_off_descriptions()
        }
    });


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

    function drawProcessionsChart(width = 380) {
        if (width < 30) {
            width = 380
        }
        // yuanxiao chart
        var margin = {
                top: 15,
                right: 15,
                bottom: 100,
                left: 15
            },
            width = width - margin.left - margin.right,
            height = 250
        var procesionsBar = d3.select("#ProcessionsChart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
        var y = d3.scaleLinear()
            .range([height, 0]);

        d3.json("/json/processions.json").then(function (data) {
            data.forEach(function (d) {
                d.weight = +d.weight
            })

            // Scale the range of the data in the domains
            x.domain(data.map(function (d) {
                return d.date;
            }));
            y.domain([0, d3.max(data, function (d) {
                return d.weight;
            })]);

            // append the rectangles for the bar chart
            procesionsBar.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) {
                    return x(d.date);
                })
                .attr("width", x.bandwidth())
                .attr("y", function (d) {
                    return y(d.weight);
                })
                .attr("height", function (d) {
                    return height - y(d.weight);
                });

            // add the x Axis
            procesionsBar.append("g")
                .attr("class", "axis")
                .append("svg").attr("width", width).attr("height", 30)

            procesionsBar.append('rect')
                .attr('x', 1)
                .attr('y', height)
                .attr('width', width / 2)
                .attr('height', 40)
                .attr('stroke', 'black')
                .attr('fill', '#ece2f0')

            procesionsBar.append("text")
                .text("First Lunar Month")
                .attr("text-anchor", "middle")
                .attr('x', width / 4)
                .attr('y', height + 25);

            procesionsBar.append('rect')
                .attr('x', width / 2)
                .attr('y', height)
                .attr('width', width / 2)
                .attr('height', 40)
                .attr('stroke', 'black')
                .attr('fill', '#a6bddb');

            procesionsBar.append("text")
                .text("Second Lunar Month")
                .attr("text-anchor", "middle")
                .attr('x', width * 3 / 4)
                .attr('y', height + 25);

            procesionsBar.append('rect')
                .attr('x', 1)
                .attr('y', height + 40)
                .attr('width', width / 4)
                .attr('height', 40)
                .attr('stroke', 'black')
                .attr('fill', '#fc8d62')

            procesionsBar.append("text")
                .text("Chinese")
                .attr("text-anchor", "middle")
                .attr('x', width / 8)
                .attr('y', height + 55);

            procesionsBar.append("text")
                .text("New Year")
                .attr("text-anchor", "middle")
                .attr('x', width / 8)
                .attr('y', height + 70);

            procesionsBar.selectAll("rect")
                .on("mouseover", function (d) {

                    var xPos = parseFloat(d3.select(this).attr("x"));
                    var yPos = parseFloat(d3.select(this).attr("y"));
                    var height = parseFloat(d3.select(this).attr("height"))

                    procesionsBar.append("rect")
                        .attr("x", xPos - 5)
                        .attr("y", yPos + height / 2 - 13)
                        .attr("width", "40px")
                        .attr("height", "15px")
                        .attr("fill", "#aaceff")
                        .attr("stroke", "black")
                        .attr("pointer-events", "none")
                        .attr("rx", "5")
                        .attr("class", "tooltip");

                    procesionsBar.append("text")
                        .attr("x", xPos)
                        .attr("y", yPos + height / 2)
                        .attr("class", "tooltip")
                        .attr("pointer-events", "none")
                        .text(d.date);

                })
                .on("mouseout", function () {
                    procesionsBar.selectAll(".tooltip").remove();
                })
                .on("click", function (d) {
                    clearallUID()
                    clearVillageCards()
                    $("#selectedDate").text(d.date)


                    for (i = 0; i < d.ID.length; i++) {
                        generateprocessioncard(d.ID[i])
                        highlightlayerUID(d.ID[i].substring(0, 4))
                    }
                })
        })
    }

    drawProcessionsChart()

    $(window).resize(function () {
        $("#ProcessionsChart > svg").remove()
        drawProcessionsChart($("#processions").width())
    })

    // Implementation of clear buton
    $(".clear").click(function () {
        clearallUID();
        clearVillageCards();
    });

    // Waffle calendar
    d3.json("./json/birthdays_cal.json").then(function (data) {

        //tooltips

        // create a tooltip
        var tooltip = d3.select(".calendar_waffle")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")
            .style("position", "absolute")
            .style("left", 0)

        // Three function that change the tooltip when user hover / move / leave a cell
        var mouseover = function (d) {

            $(this).css("border-width", 2)
                .css("cursor", "pointer")

        }
        var mouseleave = function (d) {
            $(this).css("border-width", 1)
        }

        var click = function (d) {
            $("#birthdayCardCont").empty()

            clearallUID()

            for (i in d.ID) {
                generatebirthdayncard(d.ID[i])
                highlightlayerUID(d.ID[i].substring(0, 4))
            }
        }

        const nest = d3.nest()
            .key(d => d.month)
            .entries(data)


        const waffle = d3.select(".calendar_waffle")

        const group = waffle
            .selectAll(".group")
            .data(nest)
            .enter()
            .append("div")
            .attr("class", "group")

        const colorInterpolator = d3.interpolate("#fff5eb", "#8c2d04")

        var color = d3.scaleQuantize()
            .domain([d3.min(data, d => d.weight),
                     d3.max(data, d => d.weight)
                    ])
            .range(d3.quantize(colorInterpolator, 4))

        group.selectAll('.block')
            .data(d => d.values)
            .enter()
            .append('div')
            .attr('class', 'block')
            .style("background-color", d => color(d.weight))
            .on("mouseover", mouseover)
            .on("mouseleave", mouseleave)
            .on("click", click)
            .append("text")
            .attr("class", "date")
            .text(d => d.date.substring(3, 5))


        // add a state label to each group
        group.append('text')
            .text(d => month_text_format(d.key))
            .attr("class", "text")
    })

    // Surname
    var $select = $('#select-surname').selectize({
        maxItems: 1,
        valueField: 'id',
        labelField: 'title',
        searchField: 'title',
        options: [],
        create: false,
        onItemAdd: function (val) {
            array = val.split(",")
            for (e of array) {
                if (e.charAt(0) == "P") {
                    highlightlayerUID(e.slice(1), false)

                } else if (e.charAt(0) == "S") {
                    highlightlayerUID(e.slice(1), true)
                }
            }
        },
        onItemRemove: function (val) {
            clearallUID();
        },
        load: function (query, callback) {
            if (!query.length) return callback();
            $.ajax({
                url: './json/surname_search.json',
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

    sidebar.on('content', function (e) {
        // e.id contains the id of the opened panel

        // if surname clicked
        if (e.id == "surname") {
            clearallUID()

            $.ajax({
                url: './json/surnames.json',
                type: 'GET',
                dataType: 'json',
                data: {},
                error: function () {
                    console.log("error");
                },
                success: function (e) {
                    e.forEach(function (d) {

                        Village_Points_Studied.eachLayer(function (layer) {
                            if (layer.feature.properties.UID_V == d["Village"]) {
                                switch (d["type"]) {
                                    case 1:
                                        layer.setStyle({
                                            fillColor: "#66c2a5"
                                        })
                                        break;
                                    case 2:
                                        layer.setStyle({
                                            fillColor: "#fc8d62"
                                        })
                                        break;
                                    case 3:
                                        layer.setStyle({
                                            fillColor: "#8da0cb"
                                        })
                                        break;
                                    case 4:
                                        layer.setStyle({
                                            fillColor: "#e78ac3"
                                        })
                                        break;
                                    case 5:
                                        layer.setStyle({
                                            fillColor: "#a6d854"
                                        })
                                        break;
                                    default:
                                        break;
                                }
                            }
                        })

                    })
                }
            })
        }
        sidebar.on('closing', function (e) {
            clearallUID()
            Village_Points_Studied.setStyle(default_style)
        })

    });


    turn_off_descriptions()

    mainmap.invalidateSize()

})
