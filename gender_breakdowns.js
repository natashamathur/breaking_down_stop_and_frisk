const gpop_data = [
    {'race': 'Female',  'val': '0.52', 'tt': 52,
      'offset': '0','label': 0.26},
    {'race':'Male','val': '0.48','tt': 48,
      'offset': '0.52','label': 0.75}
  ]

  const gstops_data = [
      {'race': 'Female','val': '0.069948', 'tt': 7,
        'offset': '0','label': 0.01},
      {'race':'Male', 'val': '0.930052', 'tt': 93,
        'offset': '0.069948','label': 0.5}
    ]

function genderBreakout(data) {

  const gpop_svg = d3.select(".gender_breakdowns").append("svg")
    .attr("width", width)
    .attr("height", height)

  const gpop_g = gpop_svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  var gen_z = d3.scaleOrdinal()
      .range(["#C732D5","#4369EB"]);

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
     var xPosition = d3.mouse(this)[0]-5;
     var yPosition = d3.mouse(this)[1]-60;
     tooltip_gender.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
     tooltip_gender.select("text").text(d.tt + "%")
     tooltip_gender.attr("fill", "white")
     tooltip_gender.attr("font-family", "Courier")
     tooltip_gender.attr("font-size", "18px");
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
       .attr('x', d => x(Number(d.label)))
		   .attr("y", label_y)
		   .attr("font-family", "Courier")
		   .attr("font-size", "16px")
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
  });

  genderBreakout(gpop_data);
