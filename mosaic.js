mosaic_mosaic_data = [
              {"race": "Black non-Hispanic", "frisked":"yes", "value": 2500},
              {"race": "Black non-Hispanic", "frisked":"yes", "value": 2000},
              {"race": "Hispanic", "frisked":"yes", "value": 1900},
              {"race": "Hispanic", "frisked":"yes", "value": 1500},
              {"race": "Other", "frisked":"yes", "value": 900},
              {"race": "Other", "frisked":"yes", "value": 500},

]

var mwidth = 960,
    mheight = 500,
    mmargin = 20;

var mx = d3.scale.linear()
    .range([0, mwidth - 3 * mmargin]);

var my = d3.scale.linear()
    .range([0, mheight - 2 * mmargin]);

var mz = d3.scale.category10();

var mn = d3.format(",d"),
    mp = d3.format("%");

var mosaic_svg = d3.select("mosaic_by_frisk").append("mosaic_svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + 2 * margin + "," + margin + ")");


  var offset = 0;

  // Nest values by frisked. We assume each frisked+race is unique.
  var friskeds = d3.nest()
      .key(function(d) { return d.frisked; })
      .entries(mosaic_data);

  // Compute the total sum, the per-frisked sum, and the per-race offset.
  // You can use reduce rather than reduceRight to reverse the ordering.
  // We also record a reference to the parent frisked for each race.
  var sum = friskeds.reduce(function(v, p) {
    return (p.offset = v) + (p.sum = p.values.reduceRight(function(v, d) {
      d.parent = p;
      return (d.offset = v) + d.value;
    }, 0));
  }, 0);

  // Add x-axis ticks.
  var xtick = svg.selectAll(".x")
      .mosaic_data(x.ticks(10))
    .enter().append("g")
      .attr("class", "x")
      .attr("transform", function(d) { return "translate(" + x(d) + "," + y(1) + ")"; });

  xtick.append("line")
      .attr("y2", 6)
      .style("stroke", "#000");

  xtick.append("text")
      .attr("y", 8)
      .attr("text-anchor", "middle")
      .attr("dy", ".71em")
      .text(p);

  // Add y-axis ticks.
  var ytick = svg.selectAll(".y")
      .mosaic_data(y.ticks(10))
    .enter().append("g")
      .attr("class", "y")
      .attr("transform", function(d) { return "translate(0," + y(1 - d) + ")"; });

  ytick.append("line")
      .attr("x1", -6)
      .style("stroke", "#000");

  ytick.append("text")
      .attr("x", -8)
      .attr("text-anchor", "end")
      .attr("dy", ".35em")
      .text(p);

  // Add a group for each frisked.
  var friskeds = svg.selectAll(".frisked")
      .mosaic_data(friskeds)
    .enter().append("g")
      .attr("class", "frisked")
      .attr("xlink:title", function(d) { return d.key; })
      .attr("transform", function(d) { return "translate(" + x(d.offset / sum) + ")"; });

  // Add a rect for each race.
  var races = friskeds.selectAll(".race")
      .mosaic_data(function(d) { return d.values; })
    .enter().append("a")
      .attr("class", "race")
      .attr("xlink:title", function(d) { return d.race + " " + d.parent.key + ": " + n(d.value); })
    .append("rect")
      .attr("y", function(d) { return y(d.offset / d.parent.sum); })
      .attr("height", function(d) { return y(d.value / d.parent.sum); })
      .attr("width", function(d) { return x(d.parent.sum / sum); })
      .style("fill", function(d) { return z(d.race); });
;
