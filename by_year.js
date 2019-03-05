const year_data = [

    {
      'race': '2009 (581,168 stops)',
      'val': '0.22',
      'offset': '0',
      'label': 0.03
    },
    {
      'race':'2010 (601,285 stops)',
      'val': '0.23',
      'offset': '.22',
      'label': 0.26
    },
    {
      'race': '2011 (685,724 stops)',
      'val': '0.26',
      'offset':'0.45',
      'label': 0.52
    },
    {
      'race': "2012 - 2014 (770,549 stops)",
      'val': '0.20',
      'offset':'0.71',
      'label': 0.78
    },
    {
      // 'race': "2013 (191,851 stops)",
      'race': "",
      'val': '0.07',
      'offset':'0.91',
      'label': 0.8
    },
    {
      'race': "",
      'val': "0.02",
      'offset': "0.98",
      'label': 0.92
    }
  ]

  const svg_year = d3.select(".by_year").append("svg")
    .attr("width", width)
    .attr("height", height)

    var year_z = d3.scaleOrdinal()
      .range(["#C732D5", "#8AC437", "#F65D3A","#4369EB", "#32D59B", "#EDA03C", "#F4F4F4", "#C732D5"]);

svg_year.selectAll("rect")
       .data(year_data)
       .enter()
       .append("rect")
       .attr("fill", function(d) { return year_z(d.val); })
       .attr("width", d => x(Number(d.val)))
       .attr("height", height)
       .attr("y",y)
       .attr('x', d => x(Number(d.offset)))
     ;

    svg_year.selectAll("text")
		   .data(year_data)
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
