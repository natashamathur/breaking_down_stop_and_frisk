const mosaic_data= [
    {'combined': 'Black non-Hispanic', 'lloc': .26,
      'race': 'black', 'frisked': 'yes',
      'x_offset': 0,'x_val': 0.52,
      'y_offset': 0,'y_val':0.58},
    {'combined': '',
      'race': 'black', 'frisked': 'no','lloc': .26,
      'x_offset': 0,'x_val': 0.52,
      'y_offset':0.58, 'y_val':0.42},
    {'combined': 'Hispanic', 'lloc': .67,
      'race': 'hispanic', 'frisked': 'yes',
      'x_offset': 0.52,'x_val': 0.33,
      'y_offset': 0,'y_val':0.59},
    {'combined': '','lloc': .67,
      'race': 'hispanic', 'frisked': 'no',
      'x_offset': 0.52,'x_val': 0.33,
      'y_offset':0.59, 'y_val':0.41},
    {'combined': 'White','lloc':.9,
      'race': 'white', 'frisked': 'yes',
      'x_offset': 0.85,'x_val': 0.09,
      'y_offset': 0,'y_val':0.45},
    {'combined': '','lloc':.92,
      'race': 'white', 'frisked': 'no',
      'x_offset': 0.85,'x_val': 0.09,
      'y_offset':0.45, 'y_val':0.55},
    {'combined': 'O','lloc': .955,
      'race': 'other','frisked': 'yes',
      'x_offset': 0.94,'x_val': 0.03,
      'y_offset': 0,'y_val':0.51},
    {'combined': '',
      'race': 'other', 'frisked': 'no',
      'x_offset': 0.94,'x_val': 0.03,
      'y_offset':0.51, 'y_val':0.49},
    {'combined': 'A','lloc': .985,
    'race': 'asian', 'frisked': 'yes',
      'x_offset': 0.97,'x_val': 0.03,
      'y_offset': 0,'y_val':0.48},
    {'combined': '','race': 'asian', 'frisked': 'no',
      'x_offset': 0.97,'x_val': 0.03,
      'y_offset':0.48, 'y_val':0.52}

  ]

  mwidth = width
  mheight = height * 4

  var bCap = "Black"
  var hCap = "Hispanic"
  var wCap = "White"
  var oCap = "Other"
  var aCap = "Asian"

  mosaic_captions = [bCap, hCap, wCap, oCap, aCap]

  const mx = d3.scaleLinear()
    .domain([0, 1])
    .range([1, mwidth]).nice()

  const my = d3.scaleBand()
    .domain([0, 1])
    .range([mheight, 0])
    .padding(0.1)

    var z = d3.scaleOrdinal()
      .domain(["black yes", "hispanic yes", "white yes", "other yes", "asian yes",
                "black no", "hispanic no", "white no", "other no", "asian no"])
      .range(["#b32dbf", "#7cb031", "#dd5334","#3c5ed3", "#2dbf8b",
            "#DD84E5", "#B8DB87","#F99D88","#8EA5F3","#84E5C3"]);

    const svg_mosaic = d3.select(".mosaic_by_frisk").append("svg")
      .attr("width", width)
      .attr("height", height * 6)

    svg_mosaic.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

function mosaicBreakout(data) {

  d3.select("#mC").text(mosaic_captions[0]);


  joinMosaic = svg_mosaic.selectAll("rect")
       .data(data, function d() {return d.race});

       joinMosaic.enter()
       .append("rect")
       .attr("class", "mosaicBlocks")
       .merge(joinMosaic)
       .attr("fill", function(d, i) { return z((d.race + " "+ d.frisked)); })
       .attr("height", d => x(Number(d.y_val)/4))
       .attr('x', d => x(Number(d.x_offset)))
       .attr("y",d => x(Number(d.y_offset)/4))
       .on("mouseover", function() { tooltip_mosaic.style("display", null); })
   .on("mouseout", function() { tooltip_mosaic.style("display", "none"); })
   .on("mousemove", function(d) {
     var xPosition = d3.mouse(this)[0]-100;
     var yPosition = d3.mouse(this)[1]-40;
     tooltip_mosaic.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
     tooltip_mosaic.select("text").text(function() {
        if (d.frisked === 'yes') {
          return `${Math.round(d.y_val * 100)}% frisked`;
        } else {
          return `${Math.round(d.y_val * 100)}% not frisked`;
        }})
     tooltip_mosaic.attr("text-align", "center")
     tooltip_mosaic.attr("fill", "white")
     tooltip_mosaic.attr("font-family", label_font)
     tooltip_mosaic.attr("font-size", "16px");
      })
      .transition()
      .duration(400)
      .attr("width", d => x(Number(d.x_val)))

     ;

joinMosaicText = svg_mosaic.selectAll("mosaicTexts")
   .data(data);

   joinMosaicText.enter()
   .append("text")
   .attr("class", "mosaicTexts")
   .attr("text-anchor", "middle")
   .attr('x', d => x(Number(d.lloc)))
   .attr("y", label_y*4)
   .attr("font-family", label_font)
   .attr("font-size", "16px")
   .attr("fill", "white")
   // .transition()
   // .delay(500)
   .text(function(d) {
      return d.combined
   })



   // Prep the tooltip bits, initial display is hidden
var tooltip_mosaic = svg_mosaic.append("g")
.attr("class", "tooltip")
.style("display", "none")

tooltip_mosaic.append("text")
  .attr("dy", label_y)

}

end = 2
cap_loc = 1
d3.select("#MosaicMover")
.on("click", function(d,i) {
  end = end + 2
  mosaicBreakout(mosaic_data.slice(0,end))
  d3.select("#mC").text(mosaic_captions[cap_loc])
  cap_loc = cap_loc + 1
  console.log(cap_loc)
  d3.select("#MosaicMover")
    .attr("class", function() {
      if (cap_loc === 5)
        {return "removedButton";
      } else return "secondButton"})
      .attr("text", function() {
        if (cap_loc === 5) {return '';}});

});

mosaicBreakout(mosaic_data.slice(0,2));
