import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  GroupedStackedBarInfo,
  StackedBarInformation,
  StackedInputs,
} from '../single-stacked-bar/models/stacked-data.model';
import textures from 'textures';
import { groupData } from '../single-stacked-bar/utils/group-data';
import * as d3 from 'd3';
import * as lodash from 'lodash';

import { OnChanges } from '@angular/core/src/metadata';

@Component({
  selector: 'legends',
  templateUrl: './legends.component.html',
  styleUrls: ['./legends.component.css'],
})
export class LegendsComponent implements OnChanges {
  @Input() legendData: StackedInputs;

  private barHeight = 10;
  private textureStrokeWidth = 4;
  private svg: any;

  constructor(private currencyPipe: CurrencyPipe) {}

  ngOnChanges() {
      console.log('*** stacked *****', this.svg);
      const { barInfo, total } = this.legendData;
    this.ConfigBars();
    this.buildLegend(barInfo, total);
  }

  private setTexture(color = '#007A73') {
    return textures
      .lines()
      .size(this.barHeight)
      .id('stripedColor')
      .strokeWidth(this.textureStrokeWidth)
      .stroke(color);
  }

  private ConfigBars() {
    if (lodash.isEmpty(this.svg)) {
      this.setSvg();
    }
  }

  private setSvg() {
    this.svg = d3
      .select('#legend')
      .append('svg')
      .attr('class', 'svg-legend-chart')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('width', '100%')
      .attr('height', '110');

    this.svg.append('svg:g').classed('legend-color-label', true);
    this.svg.append('svg:g').classed('legend-label', true);
    this.svg.append('svg:g').classed('goal-target', true);
    this.svg.append('svg:g').classed('amount-container', true);
    this.svg.append('svg:g').classed('total-amount-container', true);
  }

  private buildLegend(data: StackedBarInformation[], total: number) {
    const texture = this.setTexture();
    const colors = data.length === 3 ? ['#007A73', texture.url(), '#D2D2D2'] : ['#007A73', '#D2D2D2'];
    const groupedData: GroupedStackedBarInfo[] = groupData(data, total);
    this.svg.call(texture);

    // Add legend text for each name.
    this.svg
      .selectAll('.legend-color-label')
      .selectAll('circle')
      .data(groupedData)
      .join(
        (enter: any) =>
          enter
            .append('circle')
            .attr('cx', 10)
            .attr('cy', (legend: GroupedStackedBarInfo, i: number) => {
              return 10 + i * 25;
            })
            .attr('r', 7.5)
            .style('fill', (legend: GroupedStackedBarInfo, i: number) => colors[i]),
        (update: any) =>
          update
            .attr('cx', 10)
            .attr('cy', (legend: GroupedStackedBarInfo, i: number) => {
              return 10 + i * 25;
            })
            .style('fill', (legend: GroupedStackedBarInfo, i: number) => colors[i]),
        (exit: any) => exit.remove()
      );

    // Add legend text for each name.
    this.svg
      .selectAll('.legend-label')
      .selectAll('text')
      .data(groupedData, (legend: GroupedStackedBarInfo) => legend.label)
      .join(
        (enter: any) =>
          enter
            .append('text')
            .attr('x', 25)
            .attr('y', (legend: GroupedStackedBarInfo, i: number) => {
              return 10 + i * 25;
            })
            .text((legend: GroupedStackedBarInfo) => legend.label)
            .style('alignment-baseline', 'middle'),
        (update: any) =>
          update.attr('y', (legend: GroupedStackedBarInfo, i: number) => {
            return 10 + i * 25;
          }),
        (exit: any) => exit.remove()
      );

    // Add Goal target legend
    this.svg
      .select('.goal-target')
      .selectAll('text')
      .data(groupedData, (legend: GroupedStackedBarInfo) => legend.total)
      .join(
        (enter: any) =>
          enter
            .append('text')
            .attr('x', 5)
            .attr('y', () => {
              return 20 + groupedData.length * 25;
            })
            .text('Goal target')
            .style('alignment-baseline', 'middle')
            .attr('font-weight', 700),
        (update: any) => update,
        (exit: any) => exit.remove()
      );

    // Add amount to each legends
    this.svg
      .select('.amount-container')
      .selectAll('text')
      .data(groupedData, (legend: GroupedStackedBarInfo) => legend.value)
      .join(
        (enter: any) =>
          enter
            .append('text')
            .attr('x', '100%')
            .attr('y', (legend: GroupedStackedBarInfo, i: number) => {
              return 10 + i * 25;
            })
            .text((legend: GroupedStackedBarInfo) => {
              return `${this.currencyPipe.transform(legend.value, 'USD', 'symbol', '1.2')}`;
            })
            .style('text-anchor', 'end')
            .style('alignment-baseline', 'middle'),
        (update: any) =>
          update.attr('y', (legend: GroupedStackedBarInfo, i: number) => {
            return 10 + i * 25;
          }),
        (exit: any) => exit.remove()
      );

    // Add total amount
    this.svg
      .select('.total-amount-container')
      .selectAll('text')
      .data(groupedData, (legend: GroupedStackedBarInfo) => legend.total)
      .join(
        (enter: any) =>
          enter
            .append('text')
            .attr('x', '100%')
            .attr('y', () => {
              return 20 + groupedData.length * 25;
            })
            .text(`${this.currencyPipe.transform(total, 'USD', 'symbol', '1.2')}`)
            .style('text-anchor', 'end')
            .style('alignment-baseline', 'middle')
            .attr('font-weight', 700),
        null,
        (exit: any) => exit.remove()
      );
  }
}
