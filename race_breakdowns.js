const race_stops_pop= [
    {'race': 'Black non-Hispanic', 'val': '0.228', 'tt': 22,
      'offset': 0,'label': 0.02},
    {'race':'Hispanic','val': '0.291', 'tt': 29,
      'offset': '0.228',  'label': 0.33},
    {'race': 'White non-Hispanic','val': '0.33','tt': 33,
      'offset':'0.519',  'label': 0.58},
    {'race': "Asian",  'val': '0.126','tt': 13,
      'offset':'0.849',  'label': 0.88},
    {'race': "Other",'val': '0.025','tt': 3,
      'offset':'0.975',  'label': 0.96}
  ]

  const race_stops_data = [
      {'race': 'Black non-Hispanic','val': '0.52','tt': 52,
        'offset': '0',  'label': 0.20},
      {'race':'Hispanic','val': '0.33',  'tt': 33,
        'offset': '0.52','label': 0.65},
      {'race': 'Other (incl. White)', 'val': '0.09', 'tt': 9,
         'offset':'0.85','label': 0.86},
      {'race': "",'val': '0.04','tt': 4,
        'offset':'0.93','label': 0.94},
      {'race': "",'val': '0.03', 'tt': 3,
        'offset':'0.97',  'label': 0.}
    ]


function raceBreakout(data) {

  var z = d3.scaleOrdinal()
    .range(["#C732D5", "#8AC437", "#F65D3A","#4369EB", "#32D59B"]);

  const svg_race = d3.select(".race_breakdowns").append("svg")
    .attr("width", width)
    .attr("height", height)





  svg_race.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)


  svg_race.selectAll("rect")
       .data(data, function d() {return d.race})
       .enter()
       .append("rect")
       .attr("class", "raceBlocks")
       .attr("fill", function(d) { return z(d.val); })
       .attr("width", d => x(Number(d.val)))
       .attr("height", height)
       .attr("y",y)
       .attr('x', d => x(Number(d.offset)))
       .on("mouseover", function() { tooltip_race.style("display", null); })
   .on("mouseout", function() { tooltip_race.style("display", "none"); })
   .on("mousemove", function(d) {
     var xPosition = d3.mouse(this)[0]-5;
     var yPosition = d3.mouse(this)[1]-60;
     tooltip_race.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
     tooltip_race.select("text").text(d.tt + "%")
     tooltip_race.attr("fill", "white")
     tooltip_race.attr("font-family", "Courier")
     tooltip_race.attr("font-size", "18px");
      })
    .exit().transition()
     ;



svg_race.selectAll("text")
   .data(data)
   .enter()
   .append("text")
   .attr("class", "raceTexts")
   .text(function(d) {
      return d.race;
   })
   .attr('x', d => x(Number(d.label)))
   .attr("y", label_y)
   .attr("font-family", "Courier")
   .attr("font-size", "16px")
   .attr("fill", "white");



   // Prep the tooltip bits, initial display is hidden
var tooltip_race = svg_race.append("g")
.attr("class", "tooltip")
.style("display", "none")

tooltip_race.append("text")
  .attr("dy", label_y)

}
// code for buttons
d3.select("#raceByPopulation")
.on("click", function(d,i) {

d3.selectAll(".raceBlocks")
  .data(race_stops_pop).transition().duration(1000)
  .attr("width", d => x(Number(d.val)))
  .attr('x', d => x(Number(d.offset)))

d3.selectAll(".raceTexts")
  .data(race_stops_pop).transition().duration(1000)
  .text(function(d) {
     return d.race;
  })
  .attr('x', d => x(Number(d.label)))
  d3.select("#raceCaption")
    .text("New York City is one of the most diverse cities in the world.")
});

d3.select("#raceByStops")
  .on("click", function(d,i) {

  d3.selectAll(".raceBlocks")
    .data(race_stops_data).transition().duration(600)
    .attr("width", d => x(Number(d.val)))
    .attr('x', d => x(Number(d.offset)))
  d3.selectAll(".raceTexts")
    .data(race_stops_data).transition().duration(1000)
    .text(function(d) {
       return d.race;
    })
    .attr('x', d => x(Number(d.label)))
  d3.select("#raceCaption")
    .text("Yet most of the people stopped were Black.")
  });

raceBreakout(race_stops_pop);
