import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'axes',
  templateUrl: './axes.component.html',
  styleUrls: [ './axes.component.css' ]
})
export class AxesComponent implements OnInit  {
  @ViewChild('axeschart') private chartContainer: ElementRef;

  constructor() {}

  ngOnInit() {
    this.simpleAxes();
  }

  simpleAxes() {
    let element = this.chartContainer.nativeElement;
    let width:number = 300;
    let height:number = 300;
    let yPad:number = 50;
    let xPad:number = 50;
    let xTicks:number = 10;
    let yTicks:number = 10;

    let xValues = [75, 250, 350, 120, 600, 450, 125, 850];
    let yValues = [25, 150, 250, 320, 400, 550, 325, 815];

    // Step 1: create an svg element
    let svg:any = d3.select(element)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Step 2: define the x and y scales
    let xScale = d3.scaleLinear()
                    .domain([0, d3.max(xValues)])
                    .range([xPad, width - xPad]);

    let yScale = d3.scaleLinear()
                    .domain([0, d3.max(yValues)])
                    .range([height - yPad, yPad]);

    // Step 3: define the x and y axes
    let xAxis = d3.axisBottom(xScale)
                  .ticks(xTicks);

    let yAxis = d3.axisLeft(yScale)
                  .ticks(yTicks);

    // Step 4: render the axes 
    svg.append("g")
        .attr("class", "xaxis")
        .attr("transform", "translate(0, " + (height-yPad) + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "yaxis")
        .attr("transform", "translate(" + xPad + ",0)")
        .call(yAxis)
  }
}
