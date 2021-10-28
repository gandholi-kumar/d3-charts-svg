import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { D3Component } from './shared/d3/d3.component';
import { BarchartSimpleComponent } from './shared/d3/barchart-simple/barchart-simple.component';
import { PiechartComponent } from './shared/d3/piechart/piechart.component';
import { AxesComponent } from './shared/d3/axes/axes.component';
import { AxesDatetime } from './shared/d3/axes-datetime/axes-datetime.component';
import { BarchartSimpleWAxes } from './shared/d3/barchart-simplewaxes/barchart-simplewaxes.component';
import { Vbarchart2Filter1 } from './shared/d3/vbarchart2-filter1/vbarchart2-filter1.component';
import { SingleStackedBarComponent } from './shared/d3/single-stacked-bar/single-stacked-bar.component';
import { LegendsComponent } from './shared/d3/legends/legends.component';
import { CurrencyPipe } from '@angular/common';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    D3Component,
    BarchartSimpleComponent,
    AxesComponent,
    BarchartSimpleWAxes,
    SingleStackedBarComponent,
    LegendsComponent,
    AxesDatetime,
    Vbarchart2Filter1,
    PiechartComponent
  ],
  bootstrap: [AppComponent],
  providers: [CurrencyPipe]
})
export class AppModule {}
