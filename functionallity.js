
//the struct that holds the observations numbers of each bird, over the months
let months = [{ name: '01', observationsFS: 0, observationsEG: 0, observationsHP: 0, observationsSM: 0, observationsSD: 0 },
{ name: '02', observationsFS: 0, observationsEG: 0, observationsHP: 0, observationsSM: 0, observationsSD: 0 },
{ name: '03', observationsFS: 0, observationsEG: 0, observationsHP: 0, observationsSM: 0, observationsSD: 0 },
{ name: '04', observationsFS: 0, observationsEG: 0, observationsHP: 0, observationsSM: 0, observationsSD: 0 },
{ name: '05', observationsFS: 0, observationsEG: 0, observationsHP: 0, observationsSM: 0, observationsSD: 0 },
{ name: '06', observationsFS: 0, observationsEG: 0, observationsHP: 0, observationsSM: 0, observationsSD: 0 },
{ name: '07', observationsFS: 0, observationsEG: 0, observationsHP: 0, observationsSM: 0, observationsSD: 0 },
{ name: '08', observationsFS: 0, observationsEG: 0, observationsHP: 0, observationsSM: 0, observationsSD: 0 },
{ name: '09', observationsFS: 0, observationsEG: 0, observationsHP: 0, observationsSM: 0, observationsSD: 0 },
{ name: '10', observationsFS: 0, observationsEG: 0, observationsHP: 0, observationsSM: 0, observationsSD: 0 },
{ name: '11', observationsFS: 0, observationsEG: 0, observationsHP: 0, observationsSM: 0, observationsSD: 0 },
{ name: '12', observationsFS: 0, observationsEG: 0, observationsHP: 0, observationsSM: 0, observationsSD: 0 }];

//set position of the bar chart
var margin = { top: 30, right: 30, bottom: 20, left: 60 },
    width = 550 - margin.left - margin.right,
    height = 340 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .05); //x-axis range

var y = d3.scale.linear().range([height, 0]);//y-axis range

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

//append the bar chart to the html view
var svg = d3.select("#data").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


//get the data from the birds_observations.csv
d3.csv("birds_observations.csv", function (error, data) {

    data.forEach(function (d) {
        if (d["species_latin"] == "Sylvia melanocephala") {
            temp = d["date"].substring(5, 7); //get the monthe from the date
            num = parseInt(temp);
            months[num - 1].observationsSM = months[num - 1].observationsSM + 1; //add observations 
        }
        else if (d["species_latin"] == "Falco subbuteo") {
            temp = d["date"].substring(5, 7); //get the monthe from the date
            num = parseInt(temp);
            months[num - 1].observationsFS = months[num - 1].observationsFS + 1;//add observations
        } else if (d["species_latin"] == "Erythropygia galactotes") {
            temp = d["date"].substring(5, 7);//get the monthe from the date
            num = parseInt(temp);
            months[num - 1].observationsEG = months[num - 1].observationsEG + 1;//add observations
        } else if (d["species_latin"] == "Hippolais pallida") {
            temp = d["date"].substring(5, 7);//get the monthe from the date
            num = parseInt(temp);
            months[num - 1].observationsHP = months[num - 1].observationsHP + 1;//add observations
        } else if (d["species_latin"] == "Streptopelia decaocto") {
            temp = d["date"].substring(5, 7);//get the monthe from the date
            num = parseInt(temp);
            months[num - 1].observationsSD = months[num - 1].observationsSD + 1;//add observations
        }
    });

    //append the title of the graph  
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - ((margin.top / 2) - 5))
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("text-decoration", "bold")
        .text("The number of observations recorded over the months");

    //set the data in the axis
    x.domain(months.map(function (d) { return d.name; }));
    y.domain([0, 160]);

    //set x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
    svg.append("text")
        .attr("class", "label")
        .attr("x", width / 2)
        .attr("y", height + 30)
        .style("text-anchor", "middle")
        .text("months");

    //set y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
    svg.append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("x", -40)
        .attr("y", -40)
        .style("text-anchor", "end")
        .text("Number of Observations");

});

//update the data in the bar chart to the Erythropygia galactotes bird info 
function updateEG(data) {

    svg.selectAll("rect").remove();

    var u = svg.selectAll("bar")
        .data(data)
    u
        .enter().append("rect")
        .transition()
        .duration(1000)
        .style("fill", "#493e8e")
        .attr("x", function (d) { return x(d.name); })
        .attr("width", x.rangeBand())
        .attr("y", function (d) { return y(d.observationsEG); })
        .attr("height", function (d) { return height - y(d.observationsEG); });
}

//update the data in the bar chart to the Streptopelia decaocto bird info 
function updateSD(data) {
    svg.selectAll("rect").remove();

    var u = svg.selectAll("bar")
        .data(data)
    u
        .enter().append("rect")
        .transition()
        .duration(1000)
        .style("fill", "#493e8e")
        .attr("x", function (d) { return x(d.name); })
        .attr("width", x.rangeBand())
        .attr("y", function (d) { return y(d.observationsSD); })
        .attr("height", function (d) { return height - y(d.observationsSD); });
}

//update the data in the bar chart to the Falco subbuteo bird info 
function updateFS(data) {
    svg.selectAll("rect").remove();

    var u = svg.selectAll("bar")
        .data(data)
    u
        .enter().append("rect")
        .transition()
        .duration(1000)
        .style("fill", "#493e8e")
        .attr("x", function (d) { return x(d.name); })
        .attr("width", x.rangeBand())
        .attr("y", function (d) { return y(d.observationsFS); })
        .attr("height", function (d) { return height - y(d.observationsFS); });
}

//update the data in the bar chart to the Hippolais pallida bird info 
function updateHP(data) {
    svg.selectAll("rect").remove();
    var u = svg.selectAll("bar")
        .data(data)
    u
        .enter().append("rect")
        .transition()
        .duration(1000)
        .style("fill", "#493e8e")
        .attr("x", function (d) { return x(d.name); })
        .attr("width", x.rangeBand())
        .attr("y", function (d) { return y(d.observationsHP); })
        .attr("height", function (d) { return height - y(d.observationsHP); });
}

//update the data in the bar chart to the Sylvia melanocephala bird info 
function updateSM(data) {
    svg.selectAll("rect").remove();
    var u = svg.selectAll("bar")
        .data(data)
    u
        .enter().append("rect")
        .transition()
        .duration(1000)
        .style("fill", "#493e8e")
        .attr("x", function (d) { return x(d.name); })
        .attr("width", x.rangeBand())
        .attr("y", function (d) { return y(d.observationsSM); })
        .attr("height", function (d) { return height - y(d.observationsSM); });
}


mapboxgl.accessToken = 'pk.eyJ1IjoiZW5qYWxvdCIsImEiOiJjaWhtdmxhNTIwb25zdHBsejk0NGdhODJhIn0.2-F2hS_oTZenAWc0BMf_uw'

//Setup mapbox-gl map
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/enjalot/cihmvv7kg004v91kn22zjptsc',
    center: [35, 31.44],
    zoom: 6.6,
})
map.scrollZoom.disable()
map.addControl(new mapboxgl.Navigation());

// Setup our svg layer that we can manipulate with d3
var canvasContainer = map.getCanvasContainer()
var svgMap = d3.select(canvasContainer).append("svg")

var dots

function project(d) {
    return map.project(getLL(d));
}
function getLL(d) {
    return new mapboxgl.LngLat(+d.lon, +d.lat)
}

//adding the tooltip to the webpage
var tooltip = svgMap.append("g")
    .attr("class", "tooltip")
    .style("opacity", 0);

d3.csv("birds_observations.csv", function (err, data) {
    //console.log(data[0], getLL(data[0]), project(data[0]))
    dots = svgMap.selectAll("circle.dot")
        .data(data)

    dots.enter().append("circle").classed("dot", true)
        .attr("r", 1)
        .style({
            fill: "#0082a3",
            "fill-opacity": 0.6,
            stroke: "#004d60",
            "stroke-width": 1
        })
        .transition().duration(1000)

    // Add legend to the map
    mapLegend(svgMap, dots);

    // render our initial visualization
    render()

    // re-render our visualization whenever the view changes
    map.on("viewreset", function () {
        render()
    })
    //.transition().duration(1000)

    map.on("move", function () {
        render()
    })
    //.transition().duration(1000)
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////-------------Functions--------------///////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Hides all the dots
function hideall() {
    dots.attr("r", 0)
}

// legend
function mapLegend(svgMap, dots) {

    var color_hash = {
        0: ["Spring mean route", "blue"],
        1: ["Winter mean route", "red"],
        2: ["Spring observation", "blue"],
        3: ["Winter observation", "red"]
    }

    for (i = 0; i < 4; i++) {
        // triangles
        if (i == 0 || i == 1) {
            var shape = "polygon";
            var attribute1 = "points";
            var attribute2 = "x";
            var attribute3 = "x";
            var value2 = 10;
            var value3 = 10;
            if (i == 0)
                var value1 = "0,10 10,10 5,0";
            else if (i == 1)
                var value1 = "0,35 10,35 5,25";
        }
        // circles
        else if (i == 2 || i == 3) {
            var shape = "circle";
            var attribute1 = "cx";
            var attribute2 = "cy";
            var attribute3 = "r";
            var value1 = 5;
            var value2 = 5 + i * 25;
            var value3 = 6;
        }

        var legend = svgMap.append("g")
            .attr("class", "legend")
            .attr("id", "legend" + i.toString())
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", 100)
            .attr("width", 100)
            .attr('transform', 'translate(20,20)')

        legend.selectAll('rect')
            .data(dots)
            .enter()
            .append(shape)
            .attr(attribute1, value1)
            .attr(attribute2, value2)
            .attr(attribute3, value3)
            .attr("fill", function (d) {
                var color = color_hash[i][1];
                return color;
            })
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .attr("x", 10)
            .attr("y", 10 + i * 25)
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", function (d) {
                var color = color_hash[i][1];
                return color;
            })

        legend.selectAll('text')
            .data(dots)
            .enter()
            .append("text")
            .attr("x", 20)
            .attr("y", 10 + i * 25)
            .text(function (d) {
                var text = color_hash[i][0];
                return text;
            })

    }
}

// Views the dots of the chosen types on the map
function render() {
    // hide all the dots - very important, dletes former selection
    dots.attr("r", 0)

    // Gets the chosen types from the checkboxes
    chosenTypes = getInputs()

    // Filter only the relevant north-headed birds tuples according to the input
    var relevantDotsNorth = d3.selectAll('circle').classed('dot', true)
        .filter(function (d) {
            for (i = 0; i < chosenTypes.length; i++) {
                if (d.species_latin == chosenTypes[i] && d.season == "Spring") {
                    // Add this dot
                    return true;
                }
            }
        })
    console.log(relevantDotsNorth);

    // Filter only the relevant south-headed birds tuples according to the input
    var relevantDotsSouth = d3.selectAll("circle").classed("dot", true)
        .filter(function (d) {
            for (i = 0; i < chosenTypes.length; i++) {
                if (d.species_latin == chosenTypes[i] && d.season == "Winter") {
                    // Add this dot
                    return true
                }
            }
        })

    // The user selected all the types ("All" checkbox)
    // Collect all spring dots
    if (chosenTypes.includes("All")) {
        relevantDotsNorth = d3.selectAll("circle").classed("dot", true)
            .filter(function (d) {
                for (i = 0; i < chosenTypes.length; i++) {
                    if (d.season == "Spring") {
                        // Add this dot
                        return true
                    }
                }
            })
        // Collect all winter dots
        relevantDotsSouth = d3.selectAll("circle").classed("dot", true)
            .filter(function (d) {
                for (i = 0; i < chosenTypes.length; i++) {
                    if (d.season == "Winter") {
                        // Add this dot
                        return true
                    }
                }
            })
    }
    // Locate and style the spring (north) dots
    relevantDotsNorth
        .attr({
            cx: function (d) {
                var x = project(d).x
                return x
            },
            cy: function (d) {
                var y = project(d).y
                return y
            },
            r: 6,
        })
        .style("fill", "0000ff")
        .style("stroke", "000000")


    // Locate and style the winter (south) dots
    relevantDotsSouth
        .attr({
            cx: function (d) {
                var x = project(d).x
                return x
            },
            cy: function (d) {
                var y = project(d).y
                return y
            },
            r: 6,
        })
        .style("fill", "ff0000")
        .style("stroke", "000000")


    // Sort the dots by their y (primary criterion) and x (secondary) values
    relevantDotsNorth[0].sort(function (x, y) {
        //var val = x.lat - y.lat; //real world values - problematic
        var val = x.cy.animVal.value - y.cy.animVal.value; //svg values - better!
        return val;
    })
    relevantDotsSouth[0].sort(function (x, y) {
        //var val = x.lat - y.lat; //real world values - problematic
        var val = x.cy.animVal.value - y.cy.animVal.value; //svg values - better!
        return val;
    })


    // Create 2D arrays to hold the sorted points by their y values
    var migrationNorth = Array();
    for (i = 0; i < 35; i++) {
        migrationNorth[i] = Array();
        migrationNorth[i][0] = Array();	// .cx values
        migrationNorth[i][1] = 0;		// Holds sum of .cx
        migrationNorth[i][2] = Array(); // .cy values
        migrationNorth[i][3] = 0;		// Holds sum of .cy
    }
    var migrationSouth = Array();
    for (i = 0; i < 35; i++) {
        migrationSouth[i] = Array();
        migrationSouth[i][0] = Array();	// .cx values
        migrationSouth[i][1] = 0;		// Holds sum of .cx
        migrationSouth[i][2] = Array(); // .cy values
        migrationSouth[i][3] = 0;		// Holds sum of .cy
    }

    // Fill the .cx values at the array of the indexed using the latitude (geographical y) value
    for (i = 0; i < relevantDotsNorth[0].length; i++) {
        var indexByLatitude = (10 * relevantDotsNorth[0][i].__data__.lat).toFixed(0) - 298;
        // Add .cx value by latitude
        migrationNorth[indexByLatitude][0].push(relevantDotsNorth[0][i].cx.animVal.value);
        // Add to index 0 of this sub-array to calculate the average later
        migrationNorth[indexByLatitude][1] += relevantDotsNorth[0][i].cx.animVal.value;
        // Add .cy value by latitude
        migrationNorth[indexByLatitude][2].push(relevantDotsNorth[0][i].cy.animVal.value);
        // Add to index 0 of this sub-array to calculate the average later
        migrationNorth[indexByLatitude][3] += relevantDotsNorth[0][i].cy.animVal.value;
    }
    for (i = 0; i < relevantDotsSouth[0].length; i++) {
        var indexByLatitude = (10 * relevantDotsSouth[0][i].__data__.lat).toFixed(0) - 298;
        // Add .cx value by latitude
        migrationSouth[indexByLatitude][0].push(relevantDotsSouth[0][i].cx.animVal.value);
        // Add to index 0 of this sub-array to calculate the average later
        migrationSouth[indexByLatitude][1] += relevantDotsSouth[0][i].cx.animVal.value;
        // Add .cy value by latitude
        migrationSouth[indexByLatitude][2].push(relevantDotsSouth[0][i].cy.animVal.value);
        // Add to index 0 of this sub-array to calculate the average later
        migrationSouth[indexByLatitude][3] += relevantDotsSouth[0][i].cy.animVal.value;
    }

    var averageMigrationNorth = Array();
    averageMigrationNorth[0] = Array(); //cx values
    averageMigrationNorth[1] = Array(); //cy values
    var averageMigrationSouth = Array();
    averageMigrationSouth[0] = Array(); //cx values
    averageMigrationSouth[1] = Array(); //cy values

    // Calculate the average .cx & cy values for each latitude value
    for (i = 0; i < migrationNorth.length; i++) {
        averageMigrationNorth[0][i] = (migrationNorth[i][1] / (migrationNorth[i][0].length)).toFixed(0);
        if (isNaN(averageMigrationNorth[0][i]) || "Infinity" === averageMigrationNorth[0][i] || "-Infinity" === averageMigrationNorth[0][i])
            averageMigrationNorth[0][i] = "0";
        averageMigrationNorth[1][i] = (migrationNorth[i][3] / (migrationNorth[i][2].length)).toFixed(0);
        if (isNaN(averageMigrationNorth[1][i]) || "Infinity" === averageMigrationNorth[1][i] || "-Infinity" === averageMigrationNorth[1][i])
            averageMigrationNorth[1][i] = "0";
    }
    for (i = 0; i < migrationSouth.length; i++) {
        averageMigrationSouth[0][i] = (migrationSouth[i][1] / (migrationSouth[i][0].length)).toFixed(0);
        if (isNaN(averageMigrationSouth[0][i]) || "Infinity" === averageMigrationSouth[0][i] || "-Infinity" === averageMigrationSouth[0][i])
            averageMigrationSouth[0][i] = "0";
        averageMigrationSouth[1][i] = (migrationSouth[i][3] / (migrationSouth[i][2].length)).toFixed(0);
        if (isNaN(averageMigrationSouth[1][i]) || "Infinity" === averageMigrationSouth[1][i] || "-Infinity" === averageMigrationSouth[1][i])
            averageMigrationSouth[1][i] = "0";
    }

    // Create migration paths
    createPathFromDots(averageMigrationNorth, "pathNorth");
    averageMigrationSouth[0] = averageMigrationSouth[0].reverse();
    averageMigrationSouth[1] = averageMigrationSouth[1].reverse();
    createPathFromDots(averageMigrationSouth, "pathSouth");


    createArrows("North");
    createArrows("South");
}


// Gets the inputs from the checkboxes
function getInputs() {
    var chosenTypes = [];
    // d3.select("body").selectAll(".className")
    var inputs = d3.selectAll(".container")[0];
    console.log(inputs);
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].children[0].checked == true)
            chosenTypes.push(inputs[i].innerText);
    }
    //console.log(chosenTypes);
    return chosenTypes;
}

function checkListener(inputid) {
    // Unclicks all the other checkboxes (mutually exlusive)
    console.log(inputid);
    var inputs = d3.selectAll(".container")[0];
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].children[0].id != inputid)
            inputs[i].children[0].checked = false;
    }
    render();
}

/////////////////////////////////////////-------------Moving Arrows--------------///////////////////////////////////////////////
// pathDirection == North or South
function createArrows(pathDirection) {

    var path = document.querySelector("#path" + pathDirection),
        totalLength = path.getTotalLength(),
        //group = totalLength / 20,
        group = totalLength * 0.05,
        start;

    var arrowheads = d3.select("#svg" + pathDirection).selectAll("use")
        // insert number of arrows to range()
        //.data(d3.range(20).map(function (d) { return d * group + 140; }))
        .data(d3.range(group / 2.1).map(function (d) { return d * group + 140; }))
        .enter()
        .append("use")
        .attr("xlink:href", "#arrowhead" + pathDirection);

    path.style.strokeDasharray = "140," + (group - 140);

    requestAnimationFrame(update);

    function update(t) {
        if (!start) {
            start = t;
        }

        var offset = -group * ((t - start) % 900) / 900;

        path.style.strokeDashoffset = offset;

        arrowheads.attr("transform", function (d) {

            var l = d - offset;

            if (l < 0) {
                l = totalLength + l;
            } else if (l > totalLength) {
                l -= totalLength;
            }

            var p = pointAtLength(l);
            return "translate(" + p + ") rotate( " + angleAtLength(l) + ")";
        });

        requestAnimationFrame(update);
    }

    function pointAtLength(l) {

        var xy = path.getPointAtLength(l);
        return [xy.x, xy.y];

    }

    // Approximate tangent
    function angleAtLength(l) {

        var a = pointAtLength(Math.max(l - 0.01, 0)), // this could be slightly negative
            b = pointAtLength(l + 0.01); // browsers cap at total length

        return Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI;

    }
}

// 'averageMigration' is 2D array of cx and cy values over svg map:
// averageMigration[0] = Array();  <--  cx values
// averageMigration[1] = Array();  <--  cy values	
function createPathFromDots(averageMigration, pathID) {
    // Create path with initial point
    var pathString;
    for (i = 0; i < averageMigration[0].length; i++) {
        if (0 != averageMigration[0][i] && 0 != averageMigration[1][i]) {
            pathString = "M" + averageMigration[0][i] + "," + averageMigration[1][i] + " ";
            break;
        }
    }
    var nextToZero = false;

    // Building curves by the following structure:
    // C(xi,yi) (avg(xi + xi+1) ,avg(yi + yi+1)) (xi+1,yi+1)
    // for example: C340,100 320,100 380,100
    // Begin at the index after the initial point ("M")
    for (i = i + 1; i < averageMigration[0].length - 1; i++) {

        // Skip over zeros
        if (averageMigration[0][i] == 0 && averageMigration[1][i] == 0)
            continue;

        // Temporarly change i+1 if it's zeros
        if (averageMigration[0][i + 1] == 0 && averageMigration[1][i + 1] == 0) {
            averageMigration[0][i + 1] = averageMigration[0][i];
            averageMigration[1][i + 1] = averageMigration[1][i];
            var nextToZero = true;
        }

        // C(xi,yi):
        pathString += "L" + averageMigration[0][i] + "," + averageMigration[1][i] + " ";
        console.log("L" + averageMigration[0][i] + "," + averageMigration[1][i] + " ");
        pathString += averageMigration[0][i + 1] + "," + averageMigration[1][i + 1] + " ";
        console.log(averageMigration[0][i + 1] + "," + averageMigration[1][i + 1] + " ");

        //  Set i+1 back if needed
        if (nextToZero) {
            averageMigration[0][i + 1] = 0;
            averageMigration[1][i + 1] = 0;
            var nextToZero = false;
        }
    }
    console.log("the path string is: " + pathString);
    document.getElementById(pathID).setAttribute("d", pathString);
}