const data = [

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
      'race': 'White',
      // 'val': '20754',
      // 'offset': '158735'
      'val': '0.11',
      'offset':'0.83',
      'label': 0.87
    },
    {
      'race': "Asian" + "\n" + "Other",
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

  const svg = d3.select(".race_stops").append("svg")
    .attr("width", 1000)
    .attr("height", 400)

  const margin = {top: 0, right: 20, bottom: 0, left: 40}
  const width = svg.attr('width') - margin.left - margin.right
  const height = svg.attr('height') - margin.top - margin.bottom
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const x = d3.scaleLinear()
    .domain([0, 1])
    .range([1, width]).nice()

  const y = d3.scaleBand()
    .domain([0, height])
    .range([height, 0])
    .padding(0.1)

  var ncmColors = ["#C732D5", "#8AC437", "#F65D3A","#4369EB", "#32D59B", "#EDA03C"]
  var z = d3.scaleOrdinal()
    .range(["#C732D5", "#8AC437", "#F65D3A","#4369EB", "#32D59B"]);

svg.selectAll("rect")
       .data(data)
       .enter()
       .append("rect")
       .attr("fill", function(d) { return z(d.val); })
       .attr("width", d => x(Number(d.val)))
       .attr("height", height)
       .attr("y",y)
       .attr('x', d => x(Number(d.offset)))
     ;

    svg.selectAll("text")
		   .data(data)
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
