(function () {
    const margin = { top: 20, right: 50, bottom: 50, left: 50 };
  
    const width = 800 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;
  
    // You'll probably need to edit this one
    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g") 
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    const colorScale = d3.scaleOrdinal().range(d3.schemeTableau10);
  
    const xPositionScale = d3.scaleLinear().domain([1990, 2020]).range([0, width]);
    const yPositionScale = d3.scaleLinear().domain([0, 400]).range([height, 0]);
  
    // Read in some external data. When we're done, run the function 'ready'
    d3.csv("data/migrants.csv")
      .then(ready)
      .catch(function (error) {
        console.log("Failed with", error);
      });
  
    function ready(datapoints) {
      console.log("Data is", datapoints);
  
  
    // **add each point
    svg
        .selectAll("circle")
        .data(datapoints)
        .enter()
        .append("circle")
        .attr("cx", (d) => xPositionScale(d.fiscalYear))
        .attr("cy", (d) => yPositionScale(d.recoveredRemains))
        .attr("fill", (d) => colorScale(d.division))
        .attr("opacity", 10)
        .attr("r", 0)
        .transition()
        .duration(2000)
        .ease(d3.easeElastic)
        .attr("r", 5)
        .attr("stroke", function (d) {
            if (d.division == "") {
                return "white";
            }
            return "black";
        });
  
  
  
  
  
  
  // **tick**
  const yAxis = d3.axisLeft(yPositionScale)
    .tickSizeInner(-width)
    .tickSizeOuter(0)
    .tickPadding(2);
  
  svg
    .append("g")
    .attr("class", "axis y-axis")
    .call(yAxis);
  
  const xAxis = d3.axisBottom(xPositionScale)
    .tickSizeInner(-height)
    .tickSizeOuter(20)
    .tickPadding(10);
  
  svg
    .append("g")
    .attr("class", "axis x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
  
   svg
        .append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 6)
        .text("→ ");
  
    svg
        .append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", ".65em")
        .attr("transform", "rotate(-90)")
        .text("→ ");
    svg
        .append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width - 360)
        .attr("y", height + 40)
        .text("Fiscal Year");
    
        svg
        .append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -50)
        .attr("dy", "0.7em")
        .attr("transform", "rotate(-90)")
        .text("Recovered Undocumented Remains Per 100,000  Apprehensions");
  
    }
  })();