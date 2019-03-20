const year_data = [

    {'race': '2009 (581,168 stops)','val': '0.22',
      'offset': '0','label': 0.09, 'yr': 2009},
    {'race':'2010 (601,285 stops)','val': '0.23',
      'offset': '.22','label': 0.33, 'yr': 2010},
    {'race': '2011 (685,724 stops)','val': '0.26',
      'offset':'0.45',  'label': 0.57, 'yr': 2011},
    {'race': "",'val': '0.20','tt': 20,
      'offset':'0.71','label': 0.99, 'yr': 2012},
    {  'race': "2012 - 2014 (770,549 stops)",'val': '0.07',
      'offset':'0.91','label': 0.9, 'yr': 2013},
    {  'race': "",'val': "0.02",
      'offset': "0.98",'label': 0.92, 'yr': 2014}
  ]

  var yearFirst = `Stop-and-Frisk officially started in New York City in the early 1990s under Police Commissioner William
                    Bratton and Mayor Rudy Giuliani. It codified the practice of making "Terry Stops" and followed the
                    ideas put forth by the infamous broken windows theory.`
  var yearSecond = `The number of stops continually increased for the next 15+ years even though the rates of violent crimes
                    had been steadily decreasing. This reduction has been attributed to an improved economy, more educated
                    police officers, and many other reasons - but not Stop-and-Frisk.`
  var yearThird = `After much protest, including marches throughout the city that culminated in a silent march to Mayor Bloombergs
                  residence, the number of stops decreased after 2011. The practice was eventually deemed unconstitutional in 2013.`

  yC = [yearFirst, yearSecond, yearThird]

  var mrFirst = `The number murders each year has been steadily decreasing since 1990.`
  var mrSecond = `City officials claimed
  that stop-frisk-contributed to decreasing the number of murders but as can be seen here there is no clear correlation`
  var mrThird = `Contrary to supporters' claims, the rates of violent crimes did not increase once the number of stops decreased.`

  mrC = [mrFirst, mrSecond, mrThird]

  const year_height = 200
  const year_label_y = 100

  const margin = {top: 20, right: 20, bottom: 30, left: 40}
  const width = screen.width*.8;
  const height = screen.height * .06
  const label_y = height / 2
  const tt_y = -60
  var label_font = "Tahoma"

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
    .range(["#b32dbf", "#7cb031", "#dd5334","#3c5ed3", "black"]);




  const svg_year = d3.select(".by_year").append("svg")
    .attr("width", width)
    .attr("height", year_height)

function yearBreakout (data) {

  d3.select("#yearCaption").text(d=>yearFirst);
  d3.select("#mrCaption").text(d=>mrFirst);


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
         var xPosition = d3.mouse(this)[0]-30;
         var yPosition = d3.mouse(this)[1]-110;
         tooltip_yr.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
         tooltip_yr.select("text").text(`${Math.round(d.val * 100)}%`)
         tooltip_yr.attr("fill", "white")
         tooltip_yr.attr("font-family", label_font)
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
		   .attr("font-family", label_font)
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
      loc_counter = 1


      d3.select("#all_years")
      .on("click", function(d,i) {
        yearBreakout(year_data.slice(0,yend))
        mrBreakout(mr_data.slice(0,yend))
        d3.select("#yearCaption").text(yC[loc_counter])
        d3.select("#mrCaption").text(mrC[loc_counter])
        d3.select("#all_years")
          .text(function(yend) {
              if (loc_counter === 1) {
                return "Peak";
              } else if (loc_counter === 2) {
                return "Decline";
              }})
        d3.select("#all_years")
          .attr("class", function() {
            if (loc_counter === 2)
              {return "disabledButton";
            } else return "secondButton"})
        yend = 6
        loc_counter = loc_counter + 1
      });

  yearBreakout(year_data.slice(0,2))
