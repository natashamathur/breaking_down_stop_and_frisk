const year_data = [

    {'race': '2009 (581,168 stops)','val': '0.22', 'tt': 22,
      'offset': '0','label': 0.11, 'yr': 2009},
    {'race':'2010 (601,285 stops)','val': '0.23',  'tt': 23,
      'offset': '.22','label': 0.33, 'yr': 2010},
    {'race': '2011 (685,724 stops)','val': '0.26',  'tt': 26,
      'offset':'0.45',  'label': 0.58, 'yr': 2011},
    {'race': "",'val': '0.20','tt': 20,
      'offset':'0.71','label': 0.81, 'yr': 2012},
    {  'race': "2012 - 2014 (770,549 stops)",'val': '0.07',  'tt': 7,
      'offset':'0.91','label': 0.88, 'yr': 2013},
    {  'race': "",'val': "0.02",'tt': 2,
      'offset': "0.98",'label': 0.92, 'yr': 2014}
  ]

  var yearFirst = "The number of stops increased steadily in the late 2000s"
  var yearSecond = "By 2011 it had peaked throughout the city."
  var yearThird = `After much protest, including a March to Mayor Bloombergs
                  residence the number of stops decreased after 2012`

  const year_height = 200
  const year_label_y = 100

  const margin = {top: 20, right: 20, bottom: 30, left: 40}
  const width = screen.width*.8;
  const height = screen.height * .15
  const label_y = height / 2
  const tt_y = -60

  const x = d3.scaleLinear()
    .domain([0, 1])
    .range([1, width]).nice()

  const y = d3.scaleBand()
    .domain([0, year_height])
    .range([year_height, 0])
    .padding(0.1)


    var year_z = d3.scaleOrdinal()
      .domain([2009, 2010, 2011, 2012, 2013, 2014])
      .range(["#0000ff","#0000cd","#00008f", "#1908a8","#0000cd","#6666e1"]);

  var z = d3.scaleOrdinal()
    .range(["#C732D5", "#8AC437", "#F65D3A","#4369EB", "#32D59B",
    ]);

    const svg_year = d3.select(".by_year").append("svg")
      .attr("width", width)
      .attr("height", year_height)

function yearBreakout (data, firstCaption) {

  d3.select("#yearCaption").text(d=>firstCaption);


  const joinYearBlocks = svg_year.selectAll("rect")
       .data(data);

       joinYearBlocks.enter()
       .append("rect")
       .attr("width", 0)
       .attr("class", "yearBlocks")
       .merge(joinYearBlocks)
       .attr("fill", function(d) { return year_z(d.yr); })
       .attr("height", year_height)
       .attr("y",y)
       .attr('x', d => x(Number(d.offset)))
       .on("mouseover", function() { tooltip_yr.style("display", null); })
       .on("mouseout", function() { tooltip_yr.style("display", "none"); })
       .on("mousemove", function(d) {
         var xPosition = d3.mouse(this)[0]-5;
         var yPosition = d3.mouse(this)[1]-60;
         tooltip_yr.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
         tooltip_yr.select("text").text(d.tt + "%")
         tooltip_yr.attr("fill", "white")
         tooltip_yr.attr("font-family", "Courier")
         tooltip_yr.attr("font-size", "14px");
      })
      .transition()
      .duration(300).delay(function(d,i) {return i * 250})
      .attr("width", d => x(Number(d.val)));

    const joinYearTexts = svg_year.selectAll(".yearTexts")
		   .data(data);

		   joinYearTexts.enter()
		   .append("text")
       .attr("class", "yearTexts")
       .attr("text-anchor", "middle")
       .attr('x', d => x(Number(d.label)))
       .attr("y", year_label_y)
       .attr("font-size", "1px")
		   .attr("font-family", "Courier")
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
    var tooltip_yr = svg_year.append("g")
    .attr("class", "tooltip")
    .style("display", "none")

    tooltip_yr.append("text")
      .attr("dy", year_label_y)

    }

      // code for buttons
      yend = 3
      caption = "second"
      d3.select("#all_years")
      .on("click", function(d,i) {
        yearBreakout(year_data.slice(0,yend))
        d3.select("#yearCaption")
          .text(function(yend) {
                if (caption === "second") {
                  greeting = yearSecond;
                } else if (caption === "third") {
                  greeting = yearThird;
                }
              return greeting})
        d3.select("#all_years")
          .text(function(yend) {
              if (caption === "second") {
                greeting = "Peak";
              } else if (caption === "third") {
                greeting = "Decline";
              }
                return greeting})
        d3.select("#all_years")
          .attr("class", function() {
            if (caption === "third")
              {return "disabledButton";
            } else return "secondButton"})
        yend = 6
        caption = "third"

      });

  yearBreakout(year_data.slice(0,2), yearFirst)
