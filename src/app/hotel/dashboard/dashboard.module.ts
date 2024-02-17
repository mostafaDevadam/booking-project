import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { ChartComponent } from 'src/app/shared/components/chart/chart.component';
import { FusionChartsModule } from 'angular-fusioncharts';
import * as Charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import * as FusionCharts from "fusioncharts";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HighchartsChartModule } from 'highcharts-angular';


//FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    //FusionChartsModule,
    NgxChartsModule,
    HighchartsChartModule,
  ],
  declarations: [DashboardPage, ChartComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardPageModule { }
