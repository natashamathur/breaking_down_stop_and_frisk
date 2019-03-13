const mosaic_data= [
    {'race': 'Black non-Hispanic frisked', 'val': '0.228', 'tt': 22,
      'offset': 0,'label': 0.02, 'y_offset':0.58, 'yheight':0.42},
      {'race': 'Black non-Hispanic not frisked', 'val': '0.228', 'tt': 22,
        'offset': 0,'label': 0.02, 'y_offset':0, 'yheight':0.58}
  ]



var mwidth = 960
var mheight = 500
var mmargin = 20


const mx = d3.scaleLinear()
  .domain([0, 3000])
  .range([1, mwidth]).nice()

const my = d3.scaleBand()
  .domain([0, 3000])
  .range([1, 0])
  .padding(0.1)

const svg_mosaic = d3.select(".mosaic_by_frisk").append("svg")
  .attr("width", mwidth)
  .attr("height", mheight)

svg_mosaic.append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`)

  var oz = d3.scaleOrdinal()
    .range(["#C732D5", "#8AC437", "#F65D3A","#4369EB", "#32D59B"]);

function mosaic(data) {

const join = svg_mosaic.selectAll("rect")
   .data(data);

   join.enter()
   .append("rect")
   .attr("width", 0)
   .attr("class","outBlocks")
   .merge(join)
   .attr("fill", function(d) { return oz(d.val); })
   .attr("width", d => x(Number(d.val)))
   .attr("height", x(Number(d.y_height)))
   .attr("y",d => x(Number(d.y_offset)))
   .attr('x', d => x(Number(d.offset)))
   .on("mouseover", function() { tooltip.style("display", null); })
.on("mouseout", function() { tooltip.style("display", "none"); })
.on("mousemove", function(d) {
 var xPosition = d3.mouse(this)[0]-5;
 var yPosition = d3.mouse(this)[1]-30;
 tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
 tooltip.select("text").text(d.tt + "%")
 tooltip.attr("fill", "white")
 tooltip.attr("font-family", "Courier")
 tooltip.attr("font-size", "14px");
})
.transition().delay(function(d,i) {return i * 1000}).duration(1000)
.attr("width", d => x(Number(d.val)));

var join_labels = svg_mosaic.selectAll("outTexts")
.data(data);

join_labels.enter()
.append("text")
.attr("class","outTexts")
.text(function(d) {
  return d.race;
})
.attr('x', d => x(Number(d.label)))
.attr("y", label_y)
.attr("font-family", "Courier")
.attr("font-size", "14px")
.attr("fill", "white");

// Prep the tooltip bits, initial display is hidden
var tooltip = svg_mosaic.append("g")
.attr("class", "tooltip")
.style("display", "none")

tooltip.append("text")
  .attr("dy", label_y)

}

mosaic(mosaic_data)
