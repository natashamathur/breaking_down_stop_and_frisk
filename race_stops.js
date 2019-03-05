const race_stops_data = [

    {
      'race': 'Black non-Hispanic',
      // 'val': '104070',
      //'offset': '0'
      'val': '0.54',
      'offset': '0',
      'label': 0.20
    },
    {
      'race':'Hispanic',
      // 'val': '54665',
      // 'offset': '104070'
      'val': '0.29',
      'offset': '0.54',
      'label': 0.6
    },
    {
      'race': 'Other (incl. White)',
      // 'val': '20754',
      // 'offset': '158735'
      'val': '0.11',
      'offset':'0.83',
      'label': 0.84
    },
    {
      'race': "",
      // 'val': '6826',
      // 'offset': '179489'
      'val': '0.04',
      'offset':'0.94',
      'label': 0.94
    },
    {
      'race': "",
      // 'val': '3651',
      // 'offset': '183140'
      'val': '0.02',
      'offset':'0.98',
      'label': 0.99
    }
  ]

  const svg_rstops = d3.select(".race_stops").append("svg")
    .attr("width", width)
    .attr("height", height)

svg_rstops.selectAll("rect")
       .data(race_stops_data)
       .enter()
       .append("rect")
       .attr("fill", function(d) { return z(d.val); })
       .attr("width", d => x(Number(d.val)))
       .attr("height", height)
       .attr("y",y)
       .attr('x', d => x(Number(d.offset)))
     ;

    svg_rstops.selectAll("text")
		   .data(race_stops_data)
		   .enter()
		   .append("text")
       .attr("class", "label")
		   .text(function(d) {
		   		return d.race;
		   })
       .attr('x', d => x(Number(d.label)))
		   .attr("y", label_y)
		   .attr("font-family", "Courier")
		   .attr("font-size", "16px")
		   .attr("fill", "white");
