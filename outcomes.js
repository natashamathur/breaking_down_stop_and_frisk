const data_outcomes= [

    {
      'race': 'Summons',
      'val': '0.0588',
      'tt': '6',
      'offset': 0,
      'label': 0
    },
    {
      'race':'Arrests',
      'val': '0.059959',
      'tt': '6',
      'offset': '0.0588',
      'label': 0.062
    },
    {
      'race':'No Action Taken',
      'val': '0.8812409',
      'tt': '88',
      'offset': '0.118',
      'label': 0.5
    }
  ]

function outBreakout(data) {
  const svg_outcomes = d3.select(".outcomes").append("svg")
    .attr("width", width)
    .attr("height", height)

  svg_outcomes.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

    var z = d3.scaleOrdinal()
      .range(["#C732D5", "#8AC437", "#F65D3A","#4369EB", "#32D59B"]);


  svg_outcomes.selectAll("rect")
       .data(data_outcomes)
       .enter()
       .append("rect")
       .attr("class","outBlocks")
       .attr("fill", function(d) { return z(d.val); })
       .attr("width", d => x(Number(d.val)))
       .attr("height", height)
       .attr("y",y)
       .attr('x', d => x(Number(d.offset)))
       .on("mouseover", function() { tooltip.style("display", null); })
   .on("mouseout", function() { tooltip.style("display", "none"); })
   .on("mousemove", function(d) {
     var xPosition = d3.mouse(this)[0]-5;
     var yPosition = d3.mouse(this)[1]-60;
     tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
     tooltip.select("text").text(d.tt + "%")
     tooltip.attr("fill", "white")
     tooltip.attr("font-family", "Courier")
     tooltip.attr("font-size", "18px");
      });

svg_outcomes.selectAll("text")
   .data(data_outcomes)
   .enter()
   .append("text")
   .attr("class","outTexts")
   .text(function(d) {
      return d.race;
   })
   .attr('x', d => x(Number(d.label)))
   .attr("y", label_y)
   .attr("font-family", "Courier")
   .attr("font-size", "16px")
   .attr("fill", "white");

   // Prep the tooltip bits, initial display is hidden
var tooltip = svg_outcomes.append("g")
.attr("class", "tooltip")
.style("display", "none")

tooltip.append("text")
  .attr("dy", label_y)

}
otrack = "Summons"
  d3.select("#Outcomes")
  .on("click", function(d,i) {
    if (otrack == "Summons") {
      otrack = "Arrests"
    } else {
      otrack = "No Action Taken"
    }
  d3.selectAll(".outBlocks")
    .data(data_outcomes.filter((row) => row.race === otrack)).transition().duration(1000)
    .attr("width", d => x(Number(d.val)))
    .attr('x', d => x(Number(d.offset)))
  d3.selectAll(".outTexts")
    .data(data_outcomes.filter((row) => row.race === otrack)).transition().duration(1000)
    .text(function(d) {
       return d.race;
    })
    .attr('x', d => x(Number(d.label)))

  });

  // outBreakout(data_outcomes.filter((row) => row.race !== 'No Action Taken'))
  outBreakout(data_outcomes)
