import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { HttpClientService } from '../../../service/http-client.service';

@Component({
  selector: 'ngx-d3-pie',
  template: `
    <ngx-charts-pie-chart *ngIf="results.length"
      [scheme]="colorScheme"
      [results]="results"
      [legend]="showLegend"
      [legendTitle]="legendTitle"
      [labels]="showLabels">
    </ngx-charts-pie-chart>
  `,
})
export class D3PieComponent implements OnDestroy {
  results = []
  showLegend = true;
  showLabels = true;
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

      let typesWithoutDuplicate = types
      typesWithoutDuplicate = typesWithoutDuplicate.filter((a, b) => typesWithoutDuplicate.indexOf(a) === b)

      const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0)
      for (let type of typesWithoutDuplicate)
        this.results.push({ name: type, value: countOccurrences(types, type) })
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
