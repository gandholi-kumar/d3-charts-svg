import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'piechart',
  templateUrl: './piechart.component.html',
  styleUrls: [ './piechart.component.css' ]
})
export class PiechartComponent implements OnInit  {
  @ViewChild('chart') private chartContainer: ElementRef;

  constructor() {}

  ngOnInit() {
    this.renderPiechart();
  }

  renderPiechart() {
    let dataset = [
      { label: 'red', count: 10 },
      { label: 'Betelgeuse', count: 20 },
      { label: 'Cantaloupe', count: 30 },
      { label: 'Dijkstra', count: 40 }
    ];

    let width:number = 360;
    let height:number = 360;
    let radius:number = Math.min(width, height) / 2;

    let color:any = d3.scaleOrdinal(d3.schemeCategory20b);

    let element:any = this.chartContainer.nativeElement;

    // Create element
    let svg = d3.select(element)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", `translate(${width/2}, ${height/2})`);

    // Define the radius
    let arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius);

    // Define start and end angles of the segments
    let pie = d3.pie()
                .value(function(d) {return d.count; })
                .sort(null);

    // Render the chart
    let path = svg.selectAll('path')
                  .data(pie(dataset))
                  .enter().append('path')
                  .attr('d', arc)
                  .attr('fill', function(d, i) {
                    return color(d.data.label);
                  });
  }
}
