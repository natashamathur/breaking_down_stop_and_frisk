const race_stops_pop= [
    {'race': 'Black non-Hispanic', 'val': '0.228', 'tt': 22,
      'offset': 0,'label': 0.114},
    {'race':'Hispanic','val': '0.291', 'tt': 29,
      'offset': '0.228',  'label': 0.37},
    {'race': 'White non-Hispanic','val': '0.33','tt': 33,
      'offset':'0.519',  'label': 0.68},
    {'race': "Asian",  'val': '0.126','tt': 13,
      'offset':'0.849',  'label': 0.91},
    {'race': "Other",'val': '0.025','tt': 3,
      'offset':'0.975',  'label': 0.98}
  ]

  const race_stops_data = [
      {'race': 'Black non-Hispanic','val': '0.52','tt': 52,
        'offset': '0',  'label': 0.26},
      {'race':'Hispanic','val': '0.33',  'tt': 33,
        'offset': '0.52','label': 0.68},
      {'race':"", 'val': '0.09', 'tt': 9,
         'offset':'0.85','label': 0.86},
      {'race':  'Other (incl. White)','val': '0.04','tt': 4,
        'offset':'0.93','label': 0.93},
      {'race': "",'val': '0.03', 'tt': 3,
        'offset':'0.97',  'label': 0.}
    ]

var population_race = `New York City is one of the most diverse cities in the
                      world. About 33% of the population is white, compared to 61% nationwide.`;

var stops_race = `Regardless, 85% of the people stopped were Black or Hispanic, disproportionately
                  high compared to the total population.`;

var rz = d3.scaleOrdinal()
  .range(["#b32dbf", "#7cb031", "#dd5334","#3c5ed3", "#2dbf8b"]);

function raceBreakout(data) {

  d3.select("#raceCaption").text(d=>population_race);

  const race_svg = d3.select(".rb").append("svg")
    .attr("width", width)
    .attr("height", height)

  race_svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)


  race_svg.selectAll("rect")
         .data(data)
         .enter()
         .append("rect")
         .attr("class", "raceBlocks")
         .attr("fill", function(d) { return rz(d.val); })
         .attr("width", d => x(Number(d.val)))
         .attr("height", height)
         .attr("y",y)
         .attr('x', d => x(Number(d.offset)))
         .on("mouseover", function() { tooltip_race.style("display", null); })
     .on("mouseout", function() { tooltip_race.style("display", "none"); })
     .on("mousemove", function(d) {
       var xPosition = d3.mouse(this)[0]-28;
       var yPosition = d3.mouse(this)[1]-25;
       tooltip_race.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
       tooltip_race.select("text").text(d.tt + "%")
       tooltip_race.attr("fill", "white")
       tooltip_race.attr("font-family", label_font)
       tooltip_race.attr("font-size", "12px");
        })
     ;

    race_svg.selectAll("text")
		   .data(data)
		   .enter()
		   .append("text")
       .attr("class", "raceTexts")
		   .text(function(d) {
		   		return d.race;
		   })
       .attr("text-anchor", "middle")
       .attr('x', d => x(Number(d.label)))
       //.attr('x', d => x(Number(d.offset) + Number(d.val)/2 ))
		   .attr("y", label_y)
		   .attr("font-family", label_font)
		   .attr("font-size", "16px")
		   .attr("fill", "white");

       var tooltip_race = race_svg.append("g")
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
    .text(population_race)
  d3.select("#raceByPopulation")
    .attr("class", "clickedButton")
  d3.select("#raceByStops")
    .attr("class", function(d) {
                    if (this.getAttribute('class').includes('clickedButton'))
                      {return "generalButton";}
                    else {return this.getAttribute('class')}})
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
    .text(stops_race)
  d3.select("#raceByStops")
    .attr("class", "clickedButton")
  d3.select("#raceByPopulation")
    .attr("class", "generalButton")
  });

raceBreakout(race_stops_pop);
