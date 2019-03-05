const gpop_data = [

    {
      'race': 'Female',
      'val': '0.52',
      'offset': '0',
      'label': 0.26
    },
    {
      'race':'Male',
      'val': '0.48',
      'offset': '0.52',
      'label': 0.75
    }
  ]

  const gpop_svg = d3.select(".gender_breakdowns").append("svg")
    .attr("width", width)
    .attr("height", height)


  const gpop_g = gpop_svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

    var gen_z = d3.scaleOrdinal()
      .range(["#C732D5","#4369EB"]);


gpop_svg.selectAll("rect")
       .data(gpop_data)
       .enter()
       .append("rect")
       .attr("fill", function(d) { return gen_z(d.val); })
       .attr("width", d => x(Number(d.val)))
       .attr("height", height)
       .attr("y",y)
       .attr('x', d => x(Number(d.offset)))
     ;

    gpop_svg.selectAll("text")
		   .data(gpop_data)
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

   function updateGender() {

     const gstops_data = [

         {
           'race': 'Female',
           'val': '0.069948',
           'offset': '0',
           'label': 0.01
         },
         {
           'race':'Male',
           'val': '0.930052',
           'offset': '0.069948',
           'label': 0.5
         }
       ]

       const gstops_svg = d3.select(".gender_breakdowns").append("svg")
         .attr("width", width)
         .attr("height", height)


       const gstops_g = gstops_svg.append('g')
         .attr('transform', `translate(${margin.left}, ${margin.top})`)


         var gen_z = d3.scaleOrdinal()
           .range(["#C732D5","#4369EB"]);

     gstops_svg.selectAll("rect")
            .data(gstops_data)
            .enter()
            .append("rect")
            .attr("fill", function(d) { return gen_z(d.val); })
            .attr("width", d => x(Number(d.val)))
            .attr("height", height)
            .attr("y",y)
            .attr('x', d => x(Number(d.offset)))
          ;

         gstops_svg.selectAll("text")
     		   .data(gstops_data)
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
