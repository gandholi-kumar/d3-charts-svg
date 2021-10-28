import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'barchart-simple',
  templateUrl: './barchart-simple.component.html',
  styleUrls: [ './barchart-simple.component.css' ]
})
export class BarchartSimpleComponent implements OnInit  {
  @ViewChild('chart') private chartContainer: ElementRef;

  constructor() {}

  ngOnInit() {
    this.simpleHorizontalBarChart();
  }

  simpleHorizontalBarChart() {
    let dataValues:number[] = [10,5,25,15,20,35];
    let multiplier:number = 10; 
    let textColor:string ="white"
    let padding:string ="2px";
    let barColors:string[] = ["red", "green", "blue"];
    let element = this.chartContainer.nativeElement;

    d3.select(element)
    .selectAll("div")
    .data(dataValues)
    .enter().append("div")
    .style("width", function (d) {
        return d*multiplier + "px";
    })
    .style("background-color", function (d) {
        return barColors[d % barColors.length];
    })
    .style("border","1px solid white")
    .style("color", textColor)
    .style("padding","2px")
    .text(function (d) { return d; });
  }

}
