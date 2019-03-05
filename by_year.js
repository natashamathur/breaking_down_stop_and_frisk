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


    const margin = {top: 20, right: 20, bottom: 30, left: 40}
    const width = 1200
    const height = 200
    const label_y = 100

    const svg_year = d3.select(".by_year").append("svg")
      .attr("width", width)
      .attr("height", height)



      const x = d3.scaleLinear()
        .domain([0, 1])
        .range([1, width]).nice()

      const y = d3.scaleBand()
        .domain([0, height])
        .range([height, 0])
        .padding(0.1)


    var year_z = d3.scaleOrdinal()
      .range(["#C732D5", "#8AC437", "#F65D3A","#4369EB", "#32D59B", "#EDA03C", "#F4F4F4", "#C732D5"]);

      var z = d3.scaleOrdinal()
        .range(["#C732D5", "#8AC437", "#F65D3A","#4369EB", "#32D59B", "#C732D5", "#8AC437", "#F65D3A","#4369EB", "#32D59B"]);


svg_year.selectAll("rect")
       .data(year_data)
       .enter()
       .append("rect")
       .attr("fill", function(d) { return year_z(d.val); })
       .attr("width", d => x(Number(d.val)))
       .attr("height", height)
       .attr("y",y)
       .attr('x', d => x(Number(d.offset)))
       .on("mouseover", function() { tooltip_yr.style("display", null); })
   .on("mouseout", function() { tooltip_yr.style("display", "none"); })
   .on("mousemove", function(d) {
     var xPosition = d3.mouse(this)[0]-5;
     var yPosition = d3.mouse(this)[1]-60;
     tooltip_yr.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
     tooltip_yr.select("text").text(d.val*100 + " % ")
     tooltip_yr.attr("fill", "white")
     tooltip_yr.attr("font-family", "Courier")
     tooltip_yr.attr("font-size", "18px");
      });

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

       // Prep the tooltip bits, initial display is hidden
    var tooltip_yr = svg_year.append("g")
    .attr("class", "tooltip")
    .style("display", "none")

    // tooltip.append("rect")
    //     .attr("width", 60)
    //     .attr("height", 20)
    //     .attr("fill", "#F4F4F4")
    //     .style("opacity", 0.5)
    //     .attr("x", d => d.label);

    tooltip_yr.append("text")
      // .attr("x", d => d.label)
      .attr("dy", label_y)
