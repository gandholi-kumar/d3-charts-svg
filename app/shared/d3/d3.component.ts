import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { StackedInputs } from './single-stacked-bar/models/stacked-data.model';

@Component({
  selector: 'd3',
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.css'],
})
export class D3Component implements OnInit {
  @ViewChild('chart') private chartContainer: ElementRef;
  stackedValue: StackedInputs;
  index = 0;
  constructor() {}

  ngOnInit() {
    this.stackedValue = {
      barInfo: [
        { label: 'Goal balance', value: 9000 },
        { label: 'Withdrawn', value: 3000 },
        { label: 'Not yet funded', value: 3000 },
      ],
      total: 15000,
    };
  }

  private data = [
    {
      barInfo: [
        { label: 'Goal balance', value: 9000 },
        { label: 'Withdrawn', value: 3000 },
        { label: 'Not yet funded', value: 3000 },
      ],
      total: 15000,
    },
    {
      barInfo: [
        { label: 'Goal balance', value: 3000 },
        { label: 'Withdrawn', value: 0 },
        { label: 'Not yet funded', value: 12000 },
      ],
      total: 15000,
    },
    {
      barInfo: [
        { label: 'Goal balance', value: 15000 },
        { label: 'Withdrawn', value: 0 },
        { label: 'Not yet funded', value: 0 },
      ],
      total: 15000,
    },
    {
      barInfo: [
        { label: 'Goal balance', value: 700 },
        { label: 'Withdrawn', value: 400 },
        { label: 'Not yet funded', value: 3900 },
      ],
      total: 5000,
    },
  ];

  update() {
    if (this.index < this.data.length) this.index += 1;
    else this.index = 0;
    console.log('Index', this.index);
    this.stackedValue = this.data[this.index];
  }
}
