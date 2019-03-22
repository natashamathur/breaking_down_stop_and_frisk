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

const svg_outcomes = d3.select(".outcomesB").append("svg")
  .attr("width", width)
  .attr("height", height)

svg_outcomes.append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`)

var oz = d3.scaleOrdinal()
  .range(["#b32dbf", "#7cb031", "#dd5334"]);

function outBreakout(data) {

  const join = svg_outcomes.selectAll("rect")
       .data(data);

       join.enter()
       .append("rect")
       .attr("width", 0)
       .attr("class","outBlocks")
       .merge(join)
       .attr("fill", function(d) { return oz(d.val); })
       .attr("height", height)
       .attr("y",y)
       .attr('x', d => x(Number(d.offset)))
       .on("mouseover", function() { tooltip.style("display", null); })
   .on("mouseout", function() { tooltip.style("display", "none"); })
   .on("mousemove", function(d) {
     var xPosition = d3.mouse(this)[0]-28;
     var yPosition = d3.mouse(this)[1]-25;
     tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
     tooltip.select("text").text(d.tt + "%")
     tooltip.attr("fill", "white")
     tooltip.attr("font-family", label_font)
     tooltip.attr("font-size", "12px");
      })
      .transition().duration(2000)
      .attr("width", d => x(Number(d.val)))
      ;

var join_labels = svg_outcomes.selectAll("outTexts")
   .data(data);

   join_labels.enter()
   .append("text")
   .attr("class","outTexts")
   .attr("y", label_y)
   .attr("font-family", label_font)
   .attr("font-size", "4px")
   .attr("fill", "white")
   .attr("text-anchor", "middle")
   .attr('x', d => x(Number(d.offset) + Number(d.val)/2 ))
   .transition().duration(function(d,i) { if (i <= 2) {
     return 0;} else {return 1500;}})
   .text(function(d) {
      return d.race;
   })
   .transition().duration(2000)

   .attr("font-size", "14px")


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
      .text("However, in most cases no follow-up of any kind was made to the stop and/or frisk.")
      d3.select("#OutcomeMover")
        .attr("class", "removedButton")

        .attr("text", function() {
          if (cap_loc === 5) {return '';}});

  });

  outBreakout(data_outcomes.slice(0,2))
