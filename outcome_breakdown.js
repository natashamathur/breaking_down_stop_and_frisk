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

  const data_event= [

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
      }
    ]

    const svg_outcomes = d3.select(".outcomesB").append("svg")
      .attr("width", width)
      .attr("height", height)

    svg_outcomes.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

      var z = d3.scaleOrdinal()
        .range(["#C732D5", "#8AC437", "#F65D3A","#4369EB", "#32D59B"]);

function outBreakout(data) {

  const join = svg_outcomes.selectAll("rect")
       .data(data);

       join.enter()
       .append("rect")
       .attr("width", 0)
       .attr("class","outBlocks")
       .merge(join)
       .attr("fill", function(d) { return z(d.val); })
       // .attr("width", d => x(Number(d.val)))
       .attr("height", height)
       .attr("y",y)
       .attr('x', d => x(Number(d.offset)))
       .on("mouseover", function() { tooltip.style("display", null); })
   .on("mouseout", function() { tooltip.style("display", "none"); })
   .on("mousemove", function(d) {
     var xPosition = d3.mouse(this)[0]-10;
     var yPosition = d3.mouse(this)[1]-60;
     tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
     tooltip.select("text").text(d.tt + "%")
     tooltip.attr("fill", "white")
     tooltip.attr("font-family", "Courier")
     tooltip.attr("font-size", "14px");
      })
      .transition()
      .duration(1000).delay(300)
      .attr("width", d => x(Number(d.val)))
      ;

var join_labels = svg_outcomes.selectAll("outTexts")
   .data(data);

   join_labels.enter()
   .append("text")
   .attr("class","outTexts")
   .text(function(d) {
      return d.race;
   })
   .attr("y", label_y)
   .attr("font-family", "Courier")
   .attr("font-size", "14px")
   .attr("fill", "white")
   .transition().duration(0).delay(1000)
   .attr('x', d => x(Number(d.label)))
;

   // Prep the tooltip bits, initial display is hidden
var tooltip = svg_outcomes.append("g")
.attr("class", "tooltip")
.style("display", "none")

tooltip.append("text")
  .attr("dy", label_y)

}

  d3.select("#OutcomeMover")
  .on("click", function(d,i) {
    outBreakout(data_outcomes)
    d3.select("#outCaption")
      .text("In most cases no actions were taken to follow up on the stop and/or frisk.")
      d3.select("#OutcomeMover")
        .attr("class", "disabledButton")

  });

  outBreakout(data_outcomes.slice(0,2))
