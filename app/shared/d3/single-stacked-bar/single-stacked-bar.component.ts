/**
 * Reference https://bl.ocks.org/eesur/287b5700b5881e8899cc7301a5fefb94
 *
 * Update Random:
 * https://bl.ocks.org/HarryStevens/7e3ec1a6722a153a5d102b6c42f4501d
 * https://jsfiddle.net/8gp8x89c/2/
 * toptal.com/d3-js/towards-reusable-d3-js-charts
 *
 * Ref: https://stackoverflow.com/questions/22052694/how-to-update-d3-js-bar-chart-with-new-data
 *
 * https://codepen.io/pen/?editors=0010
 */

import { Component, HostListener, Input, OnInit } from '@angular/core';
import {
  GroupedStackedBarInfo,
  StackedBarInformation,
  StackedInputs,
} from './models/stacked-data.model';
import { groupData } from './utils/group-data';
import * as d3 from 'd3';
import * as loadash from 'lodash';
import textures from 'textures';
import { AfterViewInit, OnChanges } from '@angular/core/src/metadata';

@Component({
  selector: 'single-stacked-bar',
  templateUrl: './single-stacked-bar.component.html',
  styleUrls: ['./single-stacked-bar.component.css'],
})
export class SingleStackedBarComponent implements OnChanges {
  private width = 500;
  private vw = 500;
  private vh = 10;
  private barHeight = 10;
  private textureStrokeWidth = 4;
  private svg: any;
  private cornerRadius = this.barHeight / 2;

  @Input() stackedData: StackedInputs;
  ngOnChanges() {
    const { barInfo, total } = this.stackedData;
    this.ConfigBars(total, this.width);
    this.updateBar(barInfo, total);
  }

  private ConfigBars(total: number, width: number) {
    if (loadash.isEmpty(this.svg)) {
      this.setSvg();
      this.setBackgroundGreyBar();
    }
  }

  private setSvg() {
    this.svg = d3
      .select('#singleStackedBar')
      .append('svg')
      .attr('class', 'chart-container')
      .attr('viewBox', `0 0 ${this.vw} ${this.vh}`)
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('width', '100%')
      .attr('height', '100%');

    this.svg.append('svg:g').classed('background-bar', true);
    this.svg.append('svg:g').classed('data-bars', true);
  }

  private setBackgroundGreyBar() {
    this.svg
      .selectAll('.background-bar')
      .append('rect')
      .attr('x', 0)
      .attr('width', '100%')
      .attr('height', this.barHeight)
      .attr('ry', this.cornerRadius)
      .style('fill', '#D2D2D2');
  }

  // End of call on ngOnIt
  private updateBar(data: StackedBarInformation[], total: number) {
    const texture = this.setTexture();
    const colors =
      data.length === 3
        ? ['#007A73', texture.url(), '#D2D2D2']
        : ['#007A73', '#D2D2D2'];

    const groupedData: GroupedStackedBarInfo[] = groupData(data);
    const xScale = d3.scaleLinear().domain([0, total]).range([0, this.width]);

    this.svg.call(texture);

    // stack rect for each data value
    this.svg
      .selectAll('.data-bars')
      .selectAll('rect')
      .data(groupedData, (d) => d.value)
      .join(
        (enter) =>
          enter
            .append('rect')
            .attr('class', 'rect-bar')
            .attr('x', (bar) => xScale(bar.cumulative))
            .attr('height', this.barHeight)
            .attr('width', (bar) => xScale(bar.value))
            .style('fill', (bar, i) => colors[i]),
        (update) =>
          update
            .attr('x', (bar) => xScale(bar.cumulative))
            .style('fill', (bar, i) => colors[i]),
        (exit) => exit.remove()
      );
  }

  private setTexture(color: string = '#007A73') {
    return textures
      .lines()
      .size(this.barHeight)
      .strokeWidth(this.textureStrokeWidth)
      .stroke(color);
  }

  private rounded_rect(
    x,
    y,
    w,
    h,
    r,
    tl: boolean = false,
    bl: boolean = false,
    tr: boolean = false,
    br: boolean = false
  ) {
    var retval;
    retval = 'M' + (x + r) + ',' + y;
    retval += 'h' + (w - 2 * r);
    if (tr) {
      retval += 'a' + r + ',' + r + ' 0 0 1 ' + r + ',' + r;
    } else {
      retval += 'h' + r;
      retval += 'v' + r;
    }
    retval += 'v' + (h - 2 * r);
    if (br) {
      retval += 'a' + r + ',' + r + ' 0 0 1 ' + -r + ',' + r;
    } else {
      retval += 'v' + r;
      retval += 'h' + -r;
    }
    retval += 'h' + (2 * r - w);
    if (bl) {
      retval += 'a' + r + ',' + r + ' 0 0 1 ' + -r + ',' + -r;
    } else {
      retval += 'h' + -r;
      retval += 'v' + -r;
    }
    retval += 'v' + (2 * r - h);
    if (tl) {
      retval += 'a' + r + ',' + r + ' 0 0 1 ' + r + ',' + -r;
    } else {
      retval += 'v' + -r;
      retval += 'h' + r;
    }
    retval += 'z';
    return retval;
  }
}
