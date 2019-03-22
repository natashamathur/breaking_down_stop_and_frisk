const borough_stops= [
    {'borough': 'Brooklyn', 'val': '0.333', 'tt': 33,
      'offset': 0,'label': 0.14},
    {'borough':'Queens','val': '0.223', 'tt': 22,
      'offset': '0.333',  'label': 0.42},
    {'borough': 'Manhattan','val': '0.2057','tt': 21,
      'offset':'0.5569',  'label': 0.62},
    {'borough': "Bronx",  'val': '0.196','tt': 20,
      'offset':'0.7626',  'label': 0.84},
    {'borough': "S.I.",'val': '0.0414','tt': 4,
      'offset':'0.9586',  'label': 0.965}
  ]

  const borough_pop = [
    {'borough': 'Brooklyn', 'val': '0.308', 'tt': 31,
      'offset': 0,'label': 0.12},
    {'borough':'Queens','val': '0.278', 'tt': 28,
      'offset': '0.308',  'label': 0.42},
    {'borough': 'Manhattan','val': '0.192','tt': 19,
      'offset':'0.587',  'label': 0.64},
    {'borough': "Bronx",  'val': '0.166','tt': 17,
      'offset':'0.779',  'label': 0.84},
    {'borough': "S.I.",'val': '0.055','tt': 6,
      'offset':'0.945',  'label': 0.958}
    ]

var population_borough = "Brooklyn and Queens are the most populous boroughs, while Staten Island is the least. Chicago and Brooklyn have similar populations."
var stops_borough = "The number of stops made is in fact proportional to the relative population of each borough."

var bz = d3.scaleOrdinal()
  .range(["#b32dbf", "#7cb031", "#dd5334","#3c5ed3", "#2dbf8b"]);

function boroughBreakout(data) {

  d3.select("#boroughCaption").text(d=>population_borough);


  var z = d3.scaleOrdinal()
    .range(["#C732D5", "#8AC437", "#F65D3A","#4369EB", "#32D59B"]);

  const svg_borough = d3.select(".borough_breakdowns").append("svg")
    .attr("width", width)
    .attr("height", height)

  svg_borough.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  svg_borough.selectAll("rect")
       .data(data)
       .enter()
       .append("rect")
       .attr("class", "boroughBlocks")
       .attr("fill", function(d) { return bz(d.val); })
       .attr("width", d => x(Number(d.val)))
       .attr("height", height)
       .attr("y",y)
       .attr('x', d => x(Number(d.offset)))
       .on("mouseover", function() { tooltip_borough.style("display", null); })
   .on("mouseout", function() { tooltip_borough.style("display", "none"); })
   .on("mousemove", function(d) {
     var xPosition = d3.mouse(this)[0]-28;
     var yPosition = d3.mouse(this)[1]-25;
     tooltip_borough.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
     tooltip_borough.select("text").text(d.tt + "%")
     tooltip_borough.attr("fill", "white")
     tooltip_borough.attr("font-family", label_font)
     tooltip_borough.attr("font-size", "12px");
      })
    .exit().transition()
     ;

svg_borough.selectAll("text")
   .data(data)
   .enter()
   .append("text")
   .attr("class", "boroughTexts")
   .text(function(d) {
      return d.borough;
   })
   .attr('x', d => x(Number(d.label)))
   .attr("y", label_y)
   .attr("font-family", label_font)
   .attr("font-size", "14px")
   .attr("fill", "white");

   // Prep the tooltip bits, initial display is hidden
var tooltip_borough = svg_borough.append("g")
.attr("class", "tooltip")
.style("display", "none")

tooltip_borough.append("text")
  .attr("dy", label_y)

}
// code for buttons
d3.select("#boroughByPopulation")
.on("click", function(d,i) {
d3.selectAll(".boroughBlocks")
  .data(borough_pop).transition().duration(1000)
  .attr("width", d => x(Number(d.val)))
  .attr('x', d => x(Number(d.offset)))
d3.selectAll(".boroughTexts")
  .data(borough_pop).transition().duration(1000)
  .text(function(d) {
     return d.borough;
  })
  .attr('x', d => x(Number(d.label)))
  d3.select("#boroughCaption")
    .text(population_borough)
    d3.select("#boroughByPopulation")
      .attr("class", "clickedButton")
    d3.select("#boroughByStops")
      .attr("class", function(d) {
                      if (this.getAttribute('class').includes('clickedButton'))
                        {return "generalButton";}
                      else {return this.getAttribute('class')}})
});

d3.select("#boroughByStops")
  .on("click", function(d,i) {
  d3.selectAll(".boroughBlocks")
    .data(borough_stops).transition().duration(1000)
    .attr("width", d => x(Number(d.val)))
    .attr('x', d => x(Number(d.offset)))
  d3.selectAll(".boroughTexts")
    .data(borough_stops).transition().duration(1000)
    .text(function(d) {
       return d.borough;
    })
    .attr('x', d => x(Number(d.label)))
    d3.select("#boroughCaption")
      .text(stops_borough)
    d3.select("#boroughByStops")
      .attr("class", "clickedButton")
      d3.select("#boroughByPopulation")
        .attr("class", "generalButton")
  });

boroughBreakout(borough_pop);
