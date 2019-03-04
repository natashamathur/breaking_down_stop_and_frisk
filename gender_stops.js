const gstops_data = [

    {
      'race': 'Female',
      'val': '0.069948',
      'offset': '0',
      'label': 0.005
    },
    {
      'race':'Male',
      'val': '0.930052',
      'offset': '0.069948',
      'label': 0.5
    }
  ]

  const gstops_svg = d3.select(".gender_stops").append("svg")
    .attr("width", 1000)
    .attr("height", 400)


  const gstops_g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)


    var gen_z = d3.scaleOrdinal()
      .range(["#C732D5","#4369EB"]);

gstops_svg.selectAll("rect")
       .data(gstops_data)
       .enter()
       .append("rect")
       .attr("fill", function(d) { return gen_z(d.val); })
       .attr("width", d => x(Number(d.val)))
       .attr("height", height)
       .attr("y",y)
       .attr('x', d => x(Number(d.offset)))
     ;

    gstops_svg.selectAll("text")
		   .data(gstops_data)
		   .enter()
		   .append("text")
       .attr("class", "label")
		   .text(function(d) {
		   		return d.race;
		   })
       .attr('x', d => x(Number(d.label)))
		   .attr("y", 200)
		   .attr("font-family", "Courier")
		   .attr("font-size", "13px")
		   .attr("fill", "white");
