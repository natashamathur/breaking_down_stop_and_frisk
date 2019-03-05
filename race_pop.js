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
      'race': 'White non-Hispanic',
      'val': '0.33',
      'offset':'0.519',
      'label': 0.58
    },
    {
      'race': "Asian",
      'val': '0.126',
      'offset':'0.849',
      'label': 0.88
    },
    {
      'race': "Other",
      'val': '0.025',
      'offset':'0.975',
      'label': 0.95555
    }
  ]



  const margin = {top: 20, right: 20, bottom: 30, left: 40}
  const width = 1200
  const height = 200
  const label_y = 120

  const svg_pop = d3.select(".race_pop").append("svg")
    .attr("width", width)
    .attr("height", height)

  const svg_g = svg_pop.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

    var z = d3.scaleOrdinal()
      .range(["#C732D5", "#8AC437", "#F65D3A","#4369EB", "#32D59B"]);
      const x = d3.scaleLinear()
        .domain([0, 1])
        .range([1, width]).nice()

      const y = d3.scaleBand()
        .domain([0, height])
        .range([height, 0])
        .padding(0.1)

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
   .attr("y", label_y)
   .attr("font-family", "Courier")
   .attr("font-size", "16px")
   .attr("fill", "white");
