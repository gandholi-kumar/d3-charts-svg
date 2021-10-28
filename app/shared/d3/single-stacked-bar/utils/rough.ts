private stackedBar(
  selector: string,
  data: StackedBarInformation[],
  total: number
) {
  const texture = this.setTexture("#007A73");
  const colors =
    data.length === 3
      ? ["#007A73", texture.url(), "#D2D2D2"]
      : ["#007A73", "#D2D2D2"];

  const groupedData: GroupedStackedBarInfo[] = groupData(data, total);

  // set up scales for horizontal placement
  const xScale = this.setXScale(total, this.width);
  const dur = 1;
  const t = d3.transition().duration(dur);
  // create svg in passed in div
  const selection = d3
    .select(selector)
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.barHeight);

  // create textures
  selection.call(texture);

  // create single long bar acts a background
  selection
    .append("g")
    .append("rect")
    .attr("x", 0)
    .attr("width", "100%")
    .attr("height", this.barHeight)
    .style("fill", "#D2D2D2");

  // stack rect for each data value
  selection
    .append("g")
    .selectAll("rect")
    .data(groupedData)
    .join(
      (enter) =>
        enter
          .append("rect")
          .attr("class", "bar")
          .attr("x", (bar) => xScale(bar.cumulative))
          .attr("height", this.barHeight)
          .attr("width", (bar) => xScale(bar.value)),
      null,
      (exit) => {
        exit
          .transition()
          .duration(dur / 2)
          .style("fill-opacity", 0)
          .remove();
      }
    )
    .transition(t)
    .delay((d, i) => i * 20)
    .attr("x", (bar) => xScale(bar.cumulative))
    .attr("height", this.barHeight)
    .attr("width", (bar) => xScale(bar.value))
    .style("fill", (bar, i) => colors[i]);
}