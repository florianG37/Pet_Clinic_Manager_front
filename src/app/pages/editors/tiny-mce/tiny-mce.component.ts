import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'Identifiant',
        type: 'number',
        editable: false
      },
      name: {
        title: 'Nom',
        type: 'string',
      },
      dateBirth: {
        title: 'Date de naissance',
        type: 'string',
      },
      gender: {
        title: 'Genre',
        type: 'string',
      },
      type: {
        title: 'Type',
        type: 'string',
      },
      breed: {
        title: 'Race',
        type: 'string',
      },
      owner: {
        title: 'Propriétaire',
        type: 'string',
      }
    },
    noDataMessage: ""
  };

  source: LocalDataSource = new LocalDataSource();
  petsTable = true
  addingPet = false

  genders = ['Femelle', 'Mâle']
  types = ['Chien', 'Chat', 'Oiseau', 'Cheval', 'Lapin']
  breeds = ['Labrador', 'Beagle', 'Yorkshire', 'Berger allemand']
  constructor(private service: SmartTableData, private router: Router, public fb: FormBuilder, private http: HttpClient) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', Authorization: 'Bearer ' + sessionStorage.getItem('accessToken') });

    this.http.get("http://localhost:8080/api/pet", { headers }).toPromise().then(pets => {
      let data = []

      for (let pet in pets["pets"]) {
        data.push({
          id: pets["pets"][pet].id,
          name: pets["pets"][pet].name,
          dateBirth: pets["pets"][pet].datebirth,
          gender: pets["pets"][pet].gender,
          type: pets["pets"][pet].type,
          breed: pets["pets"][pet].breed,
          owner: pets["pets"][pet].owner
        })
      }

      this.source.load(data);
    });
  }

  registrationForm = this.fb.group({
    name: ['', [Validators.required]],
    dateBirth: ['', [Validators.required]],
    genderName: ['', [Validators.required]],
    typeName: ['', [Validators.required]],
    breedName: ['', [Validators.required]],
    owner: ['', [Validators.required]]
  })

  get name() {
    return this.registrationForm.get('name').value;
  }

  get dateBirth() {
    return this.registrationForm.get('dateBirth').value;
  }

  get genderName() {
    return this.registrationForm.get('genderName').value;
  }

  get typeName() {
    return this.registrationForm.get('typeName').value;
  }

  get breedName() {
    return this.registrationForm.get('breedName').value;
  }

  get owner() {
    return this.registrationForm.get('owner').value;
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem("accessToken"))
      this.router.navigate(["pages/dashboard"])
  }

  onEditConfirm(event): void {
    const body = JSON.stringify({
      breed: event.newData.breed,
      datebirth: event.newData.dateBirth,
      gender: event.newData.gender,
      name: event.newData.name,
      owner: event.newData.owner,
      type: event.newData.type
    });

    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', Authorization: 'Bearer ' + sessionStorage.getItem('accessToken') })
    this.http.put('http://localhost:8080/api/pet' + '/' + event.data.id, body, { headers }).subscribe()

    event.confirm.resolve();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Voulez-vous vraiment supprimer cet animal ?')) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', Authorization: 'Bearer ' + sessionStorage.getItem('accessToken') })
      this.http.delete('http://localhost:8080/api/pet' + '/' + event.data.id, { headers }).subscribe()

      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  addPet() {
    this.petsTable = false
    this.addingPet = true
  }

  onSubmit() {
    this.petsTable = true
    this.addingPet = false

    const body = JSON.stringify({
      breed: this.breedName,
      datebirth: this.dateBirth,
      gender: this.genderName,
      name: this.name,
      owner: this.owner,
      type: this.typeName
    });

    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', Authorization: 'Bearer ' + sessionStorage.getItem('accessToken') })

    this.http.post('http://localhost:8080/api/pet', body, { headers }).subscribe()

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(["pages/editors/tinymce"])
  }

  cancel(event) {
    event.preventDefault()
    this.registrationForm.reset();
    this.petsTable = true
    this.addingPet = false
  }
}
