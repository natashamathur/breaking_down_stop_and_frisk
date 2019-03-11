const data = [

    {
      'race': 'B',
      'val': '104070',
      'offset': '0'
    },
    {
      'race':'H',
      'val': '54665',
      'offset': '104070'
    },
    {
      'race': 'W',
      'val': '20754',
      'offset': '158735'
    },
    {
      'race': "A",
      'val': '6826',
      'offset': '179489'
    },
    {
      'race': "O",
      'val': '3651',
      'offset': '183140'
    }
  ]

  const svg = d3.select(".first").append("svg")
    .attr("width", 800)
    .attr("height", 400)

  const margin = {top: 20, right: 20, bottom: 30, left: 40}
  const width = svg.attr('width') - margin.left - margin.right
  const height = svg.attr('height') - margin.top - margin.bottom
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const x = d3.scaleLinear()
    .domain([0, 200000])
    .range([1, width]).nice()

  const y = d3.scaleBand()
    .domain([0, height])
    .range([height, 0])
    .padding(0.1)

  var ncmColors = ["#C732D5", "#8AC437", "#F65D3A","#4369EB", "#32D59B", "#EDA03C"]
  var z = d3.scaleOrdinal()
    .range(["#C732D5", "#8AC437", "#F65D3A","#4369EB", "#32D59B", "#EDA03C"]);

  rectangles =  svg.selectAll("rect")
       .data(data)
       .enter()
       .append("rect")
       .attr("fill", function(d) { return z(d.val); })
       .attr("width", d => x(Number(d.val)))
       .attr("height", height)
       .attr("y",y)
       .attr('x', d => x(Number(d.offset)))
     ;

     rectangles.append("text")
            .attr("class", "label")
            .attr("y",100)
            .attr('x', d => x(Number(d.offset)))
            .text(function(d){
                return d.label;
            });
