import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'axes-datetime',
  templateUrl: './axes-datetime.component.html',
  styleUrls: [ './axes-datetime.component.css' ]
})
export class AxesDatetime implements OnInit  {
  @ViewChild('axeschart') private chartContainer: ElementRef;

  constructor() {}

  ngOnInit() {
    this.simpleAxes();
  }

  simpleAxes() {
    let element = this.chartContainer.nativeElement;
    let width:number = 600;
    let height:number = 300;
    let yPad:number = 50;
    let xPad:number = 50;
    let xTicks:number = 10;
    let yTicks:number = 10;

    let now = d3.utcHour(new Date);

    let timeValues = [
                  d3.utcHour.offset(now, -8),
                  d3.utcHour.offset(now, -7),
                  d3.utcHour.offset(now, -6),
                  d3.utcHour.offset(now, -5),
                  d3.utcHour.offset(now, -4),
                  d3.utcHour.offset(now, -3),
                  d3.utcHour.offset(now, -2),
                  d3.utcHour.offset(now, -1),
                  d3.utcHour.offset(now, 0)
    ];

    //let xValues = [75, 250, 350, 120, 600, 450, 125, 850];
    let yValues = [25, 150, 250, 320, 400, 550, 325, 815];

    // Step 1: create an svg element
    let svg:any = d3.select(element)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Step 2: define the x and y scales
    let xScale = d3.scaleTime()
                    .domain([new Date(timeValues[0]), 
                              d3.timeDay.offset(new Date(timeValues[timeValues.length-1]),1)])
                    .rangeRound([1*xPad, width - 2*xPad]);

    let yScale = d3.scaleLinear()
                    .domain([0, d3.max(yValues)])
                    .range([height - yPad, yPad]);

    // Step 3: define the x and y axes
    let xAxis = d3.axisBottom(xScale)
                  .ticks(xTicks)
                  .tickFormat(d3.timeFormat("%m-%d"));

    let yAxis = d3.axisLeft(yScale)
                  .tickSize(yTicks)
                  

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
