const mosaic_data = [

    {
      'race': 'Black - frisked',
      'x': 0, 'width': .52,
      'y':0, 'height': '0.58', 'tt': 58
    },
    {
      'race': 'Black - not frisked',
      'x': 0, 'width': .52,
      'y':100, 'height': '0.52', 'tt': 52}]
    // },
    // {
    //   'race': 'Hispanic - frisked',
    //   'x': .52, 'width': .33,
    //   'y':
    //   'height': '0.59',  'tt': 59,
    //   'width': .33,'offset':'0.52',  'label': 0.52
    // },
    // {
    //   'race': "Hispanic - not frisked",'height': '0.41','tt': 41,
    //   'width': .33, 'offset':'0.52','label': 0.78
    // },
    // {
    //   'race': "Other - frisked",'height': '0.47',  'tt': 47,
    //   'width': .15,'offset':'0.85','label': 0.8
    // },
    // {
    //   'race': "Other - not frisked",'height': "0.53",'tt': 53,
    //   'width': .15, 'offset': "0.85",'label': 0.92
    // }



    const svg_mosaic = d3.select(".mosaic").append("svg")
      .attr("width", width)
      .attr("height", 200)


        var m_z = d3.scaleOrdinal()
          .range(["#C732D5", "#8AC437", "#F65D3A", "#C732D5", "#8AC437", "#F65D3A"]);

svg_mosaic.selectAll("rect")
       .data(mosaic_data)
       .enter()
       .append("rect")
       .attr("fill", function(d) { return m_z(d.val); })
       .attr("width", d => x(Number(d.width)))
       .attr("height", d => 100)
       .attr("y",d => x(Number(d.y)))
       .attr('x', d => x(Number(d.x)))
       .on("mouseover", function() { tooltip_m.style("display", null); })
   .on("mouseout", function() { tooltip_m.style("display", "none"); })
   .on("mousemove", function(d) {
     var xPosition = d3.mouse(this)[0]-5;
     var yPosition = d3.mouse(this)[1]-60;
     tooltip_m.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
     tooltip_m.select("text").text(d.tt + "%")
     tooltip_m.attr("fill", "white")
     tooltip_m.attr("font-family", "Courier")
     tooltip_m.attr("font-size", "18px")});

    svg_mosaic.selectAll("text")
		   .data(mosaic_data)
		   .enter()
		   .append("text")
       .attr("class", "label")
		   .text(function(d) {
		   		return d.race;
		   })
       .attr('x', d => x(Number(d.x)))
		   .attr("y", d => x(Number(d.y))/2)
		   .attr("font-family", "Courier")
		   .attr("font-size", "16px")
		   .attr("fill", "black");

       // Prep the tooltip bits, initial display is hidden
    var tooltip_m = svg_mosaic.append("g")
    .attr("class", "tooltip")
    .style("display", "none")

    tooltip_m.append("text")
      .attr("dy", label_y)
