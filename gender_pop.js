const gpop_data = [

    {
      'race': 'Female',
      'val': '0.52',
      'offset': '0',
      'label': 0.26
    },
    {
      'race':'Male',
      'val': '0.48',
      'offset': '0.52',
      'label': 0.75
    }
  ]

  const gpop_svg = d3.select(".gender_pop").append("svg")
    .attr("width", 1000)
    .attr("height", 400)


  const gpop_g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

    var gen_z = d3.scaleOrdinal()
      .range(["#C732D5","#4369EB"]);


gpop_svg.selectAll("rect")
       .data(gpop_data)
       .enter()
       .append("rect")
       .attr("fill", function(d) { return gen_z(d.val); })
       .attr("width", d => x(Number(d.val)))
       .attr("height", height)
       .attr("y",y)
       .attr('x', d => x(Number(d.offset)))
     ;

    gpop_svg.selectAll("text")
		   .data(gpop_data)
		   .enter()
		   .append("text")
       .attr("class", "label")
		   .text(function(d) {
		   		return d.race;
		   })
       .attr('x', d => x(Number(d.label)))
		   .attr("y", 200)
		   .attr("font-family", "Courier")
		   .attr("font-size", "16px")
		   .attr("fill", "white");
