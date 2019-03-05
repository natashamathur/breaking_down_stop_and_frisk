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



  const svg_race = d3.select(".race_breakdowns").append("svg")
    .attr("width", width)
    .attr("height", height)

  svg_race.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  svg_race.selectAll("rect")
       .data(data_pop)
       .enter()
       .append("rect")
       .attr("fill", function(d) { return z(d.val); })
       .attr("width", d => x(Number(d.val)))
       .attr("height", height)
       .attr("y",y)
       .attr('x', d => x(Number(d.offset)))
       .on("mouseover", function() { tooltip_race.style("display", null); })
   .on("mouseout", function() { tooltip_race.style("display", "none"); })
   .on("mousemove", function(d) {
     var xPosition = d3.mouse(this)[0]-5;
     var yPosition = d3.mouse(this)[1]-60;
     tooltip_race.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
     tooltip_race.select("text").text(d.val*100 + " % ")
     tooltip_race.attr("fill", "white")
     tooltip_race.attr("font-family", "Courier")
     tooltip_race.attr("font-size", "18px");
      })
     ;

svg_race.selectAll("text")
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

   // Prep the tooltip bits, initial display is hidden
var tooltip_race = svg_race.append("g")
.attr("class", "tooltip")
.style("display", "none")

tooltip_race.append("text")
  .attr("dy", label_y)

   function updateRace() {

    // Get the data again
    const race_stops_data = [

        {
          'race': 'Black non-Hispanic',
          'val': '0.54',
          'offset': '0',
          'label': 0.20
        },
        {
          'race':'Hispanic','val': '0.29',
          'offset': '0.54',
          'label': 0.6
        },
        {
          'race': 'Other (incl. White)','val': '0.11',
          'offset':'0.83',
          'label': 0.84
        },
        {
          'race': "",  'val': '0.04',
          'offset':'0.94',
          'label': 0.94
        },
        {
          'race': "",  'val': '0.02',
          'offset':'0.98',
          'label': 0.99
        }
      ]

      const svg_race = d3.select(".race_breakdowns").append("svg")
        .attr("width", width)
        .attr("height", height);
    // Select the section we want to apply our changes to
    var z2 = d3.scaleOrdinal()
      .range(["#C732D5", "#8AC437", "#F65D3A","#4369EB", "#32D59B"]);

  svg_race.selectAll("rect")
         .data(race_stops_data)
         .enter()
         .append("rect")
         .attr("fill", function(d) { return z2(d.val); })
         .attr("width", d => x(Number(d.val)))
         .attr("height", height)
         .attr("y",y)
         .attr('x', d => x(Number(d.offset)))
         .on("mouseover", function() { tooltip_race.style("display", null); })
     .on("mouseout", function() { tooltip_race.style("display", "none"); })
     .on("mousemove", function(d) {
       var xPosition = d3.mouse(this)[0]-50;
       var yPosition = d3.mouse(this)[1];
       tooltip_race.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
       tooltip_race.select("text").text(d.val*100 + " % ")
       tooltip_race.attr("fill", "white")
       tooltip_race.attr("font-family", "Courier")
       tooltip_race.attr("font-size", "18px");
        })
       ;

      svg_race.selectAll("text")
  		   .data(race_stops_data)
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
       }

       var tooltip_race = svg_race.append("g")
       .attr("class", "tooltip")
       .style("display", "none")

       tooltip_race.append("text")
         .attr("dy", label_y)
