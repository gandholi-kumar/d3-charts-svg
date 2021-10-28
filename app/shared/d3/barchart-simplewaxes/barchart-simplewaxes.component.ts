import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'BarchartSimpleWAxes',
  templateUrl: './barchart-simplewaxes.component.html',
  styleUrls: [ './barchart-simplewaxes.component.css' ]
})
export class BarchartSimpleWAxes implements OnInit  {
  @ViewChild('chart') private chartContainer: ElementRef;

  constructor() {}

  ngOnInit() {
    this.createChart()
  }

  createChart() {
    let element = this.chartContainer.nativeElement;
    let width:number = 600;
    let height:number = 300;
    let yPad:number = 50;
    let xPad:number = 50;
    let xTicks:number = 10;
    let yTicks:number = 10;

    let yValues = [815, 150, 250, 320, 400, 550, 325, 625];
    let xValues = d3.range(yValues.length+1);
    let barColors = ["red", "yellow", "blue", "green"];

    // Step 1: create the svg element
    let svg = d3.select(element)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("fill", "blue");

    // Step 2: define the scales
    let xScale = d3.scaleLinear()
                    .domain([0, d3.max(xValues)])
                    .range([xPad, width - xPad]);
    
    let yScale = d3.scaleLinear()
                    .domain([0, d3.max(yValues)])
                    .range([height-yPad, yPad]);

    // Step 3: define the axes
    let xAxis = d3.axisBottom(xScale)
                  .ticks(xTicks);
    
    let yAxis = d3.axisLeft(yScale)
                  .ticks(yTicks);

    // Step 4: render the axes
    svg.append("g")
        .attr("class", "xaxis")
        .attr("transform", "translate(0," + (height - yPad) + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "yaxis")
        .attr("transform", "translate(" + xPad + ",0)")
        .call(yAxis);

    // Step 5: render the bar chart elements
    svg.selectAll("rect")
        .data(yValues)
        .enter().append("rect")
        .attr("x", function(d, i) {
          return xScale(i);
        })
        .attr("y", function(y, i) {
          return yScale(y);
        })
        .attr("width", xScale(0))
        .attr("height", function(y, i) {
          return (yScale(0)-yScale(y));
        })
        .attr("fill", function(d, i) {
          return barColors[i % barColors.length];
        })

  }
}
