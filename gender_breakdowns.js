const gpop_data = [
    {'race': 'Female',  'val': '0.52', 'tt': 52,
      'offset': '0','label': 0.26},
    {'race':'Male','val': '0.48','tt': 48,
      'offset': '0.52','label': 0.75}
  ]

  const gstops_data = [
      {'race': 'Female','val': '0.069948', 'tt': 7,
        'offset': '0','label': 0.03},
      {'race':'Male', 'val': '0.930052', 'tt': 93,
        'offset': '0.069948','label': 0.5}
    ]

var population_gender = "The population of NYC is fairly evenly split."
var stops_gender = "But the vast majority of people stopped were male."

var gen_z = d3.scaleOrdinal()
    .range(["#b32dbf", "#2dbf8b"]);

function genderBreakout(data) {

  d3.select("#genderCaption").text(d=>population_gender);

  const gpop_svg = d3.select(".gender_breakdowns").append("svg")
    .attr("width", width)
    .attr("height", height)

  const gpop_g = gpop_svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

gpop_svg.selectAll("rect")
       .data(data)
       .enter()
       .append("rect")
       .attr("class", "genderBlocks")
       .attr("fill", function(d) { return gen_z(d.val); })
       .attr("width", d => x(Number(d.val)))
       .attr("height", height)
       .attr("y",y)
       .attr('x', d => x(Number(d.offset)))
       .on("mouseover", function() { tooltip_gender.style("display", null); })
   .on("mouseout", function() { tooltip_gender.style("display", "none"); })
   .on("mousemove", function(d) {
     var xPosition = d3.mouse(this)[0]-28;
     var yPosition = d3.mouse(this)[1]-25;
     tooltip_gender.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
     tooltip_gender.select("text").text(d.tt + "%")
     tooltip_gender.attr("fill", "white")
     tooltip_gender.attr("font-family", label_font)
     tooltip_gender.attr("font-size", "12px");
      })
     ;

    gpop_svg.selectAll("text")
		   .data(data)
		   .enter()
		   .append("text")
       .attr("class", "genderTexts")
		   .text(function(d) {
		   		return d.race;
		   })
       .attr("text-anchor", "middle")
       .attr('x', d => x(Number(d.offset) + Number(d.val)/2 ))
		   .attr("y", label_y)
		   .attr("font-family", label_font)
		   .attr("font-size", "14px")
		   .attr("fill", "white");

       var tooltip_gender = gpop_svg.append("g")
       .attr("class", "tooltip")
       .style("display", "none")

       tooltip_gender.append("text")
         .attr("dy", label_y)

  }

  // code for buttons
  d3.select("#genderByPopulation")
  .on("click", function(d,i) {

  d3.selectAll(".genderBlocks")
    .data(gpop_data).transition().duration(1000)
    .attr("width", d => x(Number(d.val)))
    .attr('x', d => x(Number(d.offset)))
  d3.selectAll(".genderTexts")
    .data(gpop_data).transition().duration(1000)
    .text(function(d) {
       return d.race;
    })
    .attr('x', d => x(Number(d.label)))
  d3.select("#genderCaption")
    .text(population_gender)
  d3.select("#genderByPopulation")
    .attr("class", "clickedButton")
  d3.select("#genderByStops")
    .attr("class", function(d) {
                    if (this.getAttribute('class').includes('clickedButton'))
                      {return "generalButton";}
                    else {return this.getAttribute('class')}})
  });

  d3.select("#genderByStops")
  .on("click", function(d,i) {

  d3.selectAll(".genderBlocks")
    .data(gstops_data).transition().duration(1000)
    .attr("width", d => x(Number(d.val)))
    .attr('x', d => x(Number(d.offset)))
  d3.selectAll(".genderTexts")
    .data(gstops_data).transition().duration(1000)
    .text(function(d) {
       return d.race;
    })
    .attr('x', d => x(Number(d.label)))
  d3.select("#genderCaption")
    .text(stops_gender)
    d3.select("#genderByStops")
      .attr("class", "clickedButton")
    d3.select("#genderByPopulation")
      .attr("class", "generalButton")
  });

  genderBreakout(gpop_data);
