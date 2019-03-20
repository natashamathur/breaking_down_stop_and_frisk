const mr_data = [

    {'race': '2009 (471)','val': 0.18, 'tt': 22,
      'offset': 0,'label': 0.11, 'yr': 2009},
    {'race':'2010 (536)','val': 0.21,  'tt': 25,
      'offset': .18,'label': 0.30, 'yr': 2010},
    {'race': '2011 (515)','val': 0.21,  'tt': 21,
      'offset':0.38,  'label': 0.5, 'yr': 2011},
    {'race': '2012 (419)','val': 0.16,'tt': 20,
      'offset':0.58, 'label': 0.66, 'yr': 2012},
    {  'race': "2013 (335)",'val': 0.13,  'tt': 13,
      'offset':0.74,'label': 0.81, 'yr': 2013},
    {  'race': "2014 (333)",'val': 0.13,'tt': 13,
      'offset': 0.87,'label': 0.93, 'yr': 2014}
  ]



  var mr_z = d3.scaleOrdinal()
    .domain([2009, 2010, 2011, 2012, 2013, 2014])
    .range(["#0000ff","#0000cd","#00008f", "#1908a8","#0000cd","#6666e1"]);

  var z = d3.scaleOrdinal()
    .range(["#C732D5", "#8AC437", "#F65D3A","#4369EB", "#32D59B",
    ]);

  var mr_height = screen.height * 0.07

  const svg_mr = d3.select(".by_mr").append("svg")
    .attr("width", width)
    .attr("height", mr_height)


function mrBreakout (data, firstCaption) {

  d3.select("#mrCaption").text(d=>firstCaption);


  const joinmrBlocks = svg_mr.selectAll("rect")
       .data(data);

       joinmrBlocks.enter()
       .append("rect")
       .attr("width", 0)
       .attr("class", "mrBlocks")
       .merge(joinmrBlocks)
       .attr("fill", function(d) { return year_z(d.yr); })
       .attr("height", mr_height)
       .attr("y",y)
       .attr('x', d => x(Number(d.offset)))
       .on("mouseover", function() { tooltip_yr.style("display", null); })
       .on("mouseout", function() { tooltip_yr.style("display", "none"); })
       .on("mousemove", function(d) {
         var xPosition = d3.mouse(this)[0]-20;
         var yPosition = d3.mouse(this)[1]-40;
         tooltip_yr.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
         tooltip_yr.select("text").text(d.tt + "%")
         tooltip_yr.attr("fill", "white")
         tooltip_yr.attr("font-family", label_font)
         tooltip_yr.attr("font-size", "14px");
      })
      .transition()
      .duration(300).delay(function(d,i) {return i * 250})
      .attr("width", d => x(Number(d.val)));

    const joinmrTexts = svg_mr.selectAll(".mrTexts")
		   .data(data);

		   joinmrTexts.enter()
		   .append("text")
       .attr("class", "mrTexts")
       .attr("text-anchor", "middle")
       .attr('x', d => (x(Number(d.label))))
       .attr("y", mr_height / 2)
       .attr("font-size", "1px")
		   .attr("font-family", label_font)
		   .attr("fill", "white")
       .transition().duration(400).delay(function(d,i) {
                                            if (i <= 3) {
                                              return i * 300;
                                            } else if (i > 3) {
                                              return i * 300;
                                            }})

       .text(function(d) {
         return d.race;
      })
      .attr("font-size", "16px")



       // Prep the tooltip bits, initial display is hidden
    var tooltip_yr = svg_mr.append("g")
    .attr("class", "tooltip")
    .style("display", "none")

    tooltip_yr.append("text")
      .attr("dy", label_y)

    }

    // mr_end = 1
    // d3.select("#all_mrs")
    // .on("click", function(d,i) {
    //   mr_end = mr_end + 1
    //   mrBreakout(mr_data.slice(0,mr_end))
    //   d3.select("#all_mrs")
    //     .attr("class", function() {
    //       if (cap_loc === 4)
    //         {return "disabledButton";
    //       } else return "secondButton"});
    //
    //
    //
    // });

  mrBreakout(mr_data.slice(0,2), mrFirst)
