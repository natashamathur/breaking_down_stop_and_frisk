const data_pop= [

    {
      'race': 'Black non-Hispanic',
      'val': '0.228',
      'offset': 0,
      'label': 0.02
    },
    {
      'race':'Hispanic',
      'val': '0.291',
      'offset': '0.228',
      'label': 0.33
    },
    {
      'race': 'White',
      'val': '0.33',
      'offset':'0.519',
      'label': 0.65
    },
    {
      'race': "Asian",
      'val': '0.126',
      'offset':'0.849',
      'label': 0.9
    },
    {
      'race': "Other",
      'val': '0.025',
      'offset':'0.975',
      'label': 0.97
    }
  ]

  const svg_pop = d3.select(".race_pop").append("svg")
    .attr("width", 1000)
    .attr("height", 400)

  // const margin = {top: 20, right: 20, bottom: 30, left: 40}
  // const width = svg.attr('width') - margin.left - margin.right
  // const height = svg.attr('height') - margin.top - margin.bottom
  const g_pop = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  svg_pop.selectAll("rect")
       .data(data_pop)
       .enter()
       .append("rect")
       .attr("fill", function(d) { return z(d.val); })
       .attr("width", d => x(Number(d.val)))
       .attr("height", height)
       .attr("y",y)
       .attr('x', d => x(Number(d.offset)))
     ;

svg_pop.selectAll("text")
   .data(data_pop)
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
