import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { HttpClientService } from '../../../service/http-client.service';

@Component({
  selector: 'ngx-d3-bar',
  template: `
    <ngx-charts-bar-vertical *ngIf="results.length"
      [scheme]="colorScheme"
      [results]="results"
      [xAxis]="showXAxis"
      [yAxis]="showYAxis"
      [legend]="showLegend"
      [legendTitle]="legendTitle"
      [xAxisLabel]="xAxisLabel"
      [yAxisLabel]="yAxisLabel">
    </ngx-charts-bar-vertical>
  `,
})
export class D3BarComponent implements OnDestroy {
  results = []
  showLegend = true;
  legendTitle = "Légende"
  showXAxis = true;
  showYAxis = true;
  xAxisLabel = "Types d'animaux";
  yAxisLabel = "Nombre d'animaux";
  colorScheme: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService, private httpClientService: HttpClientService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
      };
    });
  }

  ngOnInit() {
    this.httpClientService.getPets().subscribe(pets => {
      let types = []

      for (let pet in pets["pets"])
        types.push(pets["pets"][pet].type.toLowerCase())

      const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0)
      for (let type of types)
        this.results.push({ name: type, value: countOccurrences(types, type) })
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
