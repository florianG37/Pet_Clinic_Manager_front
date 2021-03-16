import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-tiny-mce-page',
  templateUrl: './tiny-mce.component.html',
  styleUrls: ['./tiny-mce.component.scss']
})
export class TinyMCEComponent implements OnInit {
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
      id: {
        title: 'Identifiant',
        type: 'number',
      },
      name: {
        title: 'Nom',
        type: 'string',
      },
      type: {
        title: 'Type',
        type: 'string',
      },
      breed: {
        title: 'Race',
        type: 'string',
      }
    },
    noDataMessage: ""
  };

  source: LocalDataSource = new LocalDataSource();
  petsTable = true
  addingPet = false
  editingPet = false

  types = ['chien', 'chat', 'oiseau']
  breeds = ['labrador', 'persan', 'york']
  constructor(private service: SmartTableData, private router: Router, public fb: FormBuilder) {
    const data = this.service.getData();
    this.source.load(data);
  }

  registrationForm = this.fb.group({
    name: ['', [Validators.required]],
    typeName: ['', [Validators.required]],
    breedName: ['', [Validators.required]]
  })

  get name() {
    return this.registrationForm.get('name');
  }

  get typeName() {
    return this.registrationForm.get('typeName');
  }

  get breedName() {
    return this.registrationForm.get('breedName');
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem("accessToken"))
      this.router.navigate(["pages/dashboard"])
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  addPet() {
    this.petsTable = false
    this.addingPet = true
    this.editingPet = false
  }

  onSubmit() {
    this.petsTable = true
    this.addingPet = false
    this.editingPet = false
  }

  cancel(event) {
    event.preventDefault()
    this.registrationForm.reset();
    this.petsTable = true
    this.addingPet = false
    this.editingPet = false
  }
}
