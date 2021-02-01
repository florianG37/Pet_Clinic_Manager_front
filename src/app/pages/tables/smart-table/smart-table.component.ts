import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {

  settings = {
    actions: {
      columnTitle: "Modifier / Supprimer",
      position: "right",
      add: false
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      idVisit: {
        title: 'Identifiant de la visite',
        type: 'number',
      },
      idPet: {
        title: 'Identifiant de l\'animal',
        type: 'number',
      },
      name: {
        title: 'Nom de l\'animal',
        type: 'string',
      },
      petWeight: {
        title: 'Poids de l\'animal',
        type: 'number',
      },
      idVet: {
        title: 'Identifiant du vétérinaire',
        type: 'number',
      },
      firstName: {
        title: 'Prénom du vétérinaire',
        type: 'string',
      },
      lastName: {
        title: 'Nom du vétérinaire',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      dateEntry: {
        title: 'Date d\'entrée',
        type: 'date',
      },
      dateLeaving: {
        title: 'Date de sortie',
        type: 'date',
      },
    },
    noDataMessage: ""
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData) {
    const data = this.service.getData();
    this.source.load(data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
