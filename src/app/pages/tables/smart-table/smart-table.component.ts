import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent implements OnInit {

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
        title: 'Identifiant de la visite',
        type: 'number',
        editable: false
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
  visitsTable = true
  addingVisit = false

  idPets = []
  idVets = []
  constructor(private router: Router, public fb: FormBuilder, private http: HttpClient) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', Authorization: 'Bearer ' + sessionStorage.getItem('accessToken') });

    this.http.get("http://localhost:8080/api/visit", { headers }).toPromise().then(visits => {
      let data = []

      for (let visit in visits["visits"]) {
        data.push({
          id: visits["visits"][visit].id,
          dateEntry: visits["visits"][visit].dateEntry,
          dateLeaving: visits["visits"][visit].dateLeaving,
          description: visits["visits"][visit].description,
          petWeight: visits["visits"][visit].petWeight,
          idPet: visits["visits"][visit].idPet.id,
          name: visits["visits"][visit].idPet.name,
          idVet: visits["visits"][visit].idVet.id,
          firstName: visits["visits"][visit].idVet.firstname,
          lastName: visits["visits"][visit].idVet.lastname
        })
      }
      this.source.load(data);
    });

    this.http.get("http://localhost:8080/api/pet", { headers }).toPromise().then(pets => {
      for (let pet in pets["pets"])
        this.idPets.push(pets["pets"][pet].id)
    });

    this.http.get("http://localhost:8080/api/vet", { headers }).toPromise().then(vets => {
      for (let vet in vets["vets"])
        this.idVets.push(vets["vets"][vet].id)
    });
  }

  registrationForm = this.fb.group({
    idPetName: ['', [Validators.required]],
    petWeight: ['', [Validators.required]],
    idVetName: ['', [Validators.required]],
    description: ['', [Validators.required]],
    dateEntry: ['', [Validators.required]],
    dateLeaving: ['', [Validators.required]]
  })

  get idPetName() {
    return this.registrationForm.get('idPetName').value;
  }

  get petWeight() {
    return this.registrationForm.get('petWeight').value;
  }

  get idVetName() {
    return this.registrationForm.get('idVetName').value;
  }

  get description() {
    return this.registrationForm.get('description').value;
  }

  get dateEntry() {
    return this.registrationForm.get('dateEntry').value;
  }

  get dateLeaving() {
    return this.registrationForm.get('dateLeaving').value;
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem("accessToken"))
      this.router.navigate(["pages/dashboard"])
  }

  onEditConfirm(event): void {
    const body = JSON.stringify({
      dateEntry: event.newData.dateEntry,
      dateLeaving: event.newData.dateLeaving,
      description: event.newData.description,
      petWeight: event.newData.petWeight,
      pet: {
        id: event.newData.idPet
      },
      vet: {
        id: event.newData.idVet
      }
    });

    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', Authorization: 'Bearer ' + sessionStorage.getItem('accessToken') })
    this.http.put('http://localhost:8080/api/visit' + '/' + event.data.id, body, { headers }).subscribe()

    event.confirm.resolve();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Voulez-vous vraiment supprimer cette visite ?')) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', Authorization: 'Bearer ' + sessionStorage.getItem('accessToken') })
      this.http.delete('http://localhost:8080/api/visit' + '/' + event.data.id, { headers }).subscribe()

      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  addVisit() {
    this.visitsTable = false
    this.addingVisit = true
  }

  onSubmit() {
    if (this.idPetName && this.idVetName) {
      this.visitsTable = true
      this.addingVisit = false

      const body = JSON.stringify({
        dateEntry: this.dateEntry,
        dateLeaving: this.dateLeaving,
        description: this.description,
        petWeight: this.petWeight,
        pet: {
          id: this.idPetName
        },
        vet: {
          id: this.idVetName
        }
      });

      const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', Authorization: 'Bearer ' + sessionStorage.getItem('accessToken') })
      this.http.post('http://localhost:8080/api/visit', body, { headers }).subscribe()

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(["pages/tables/smart-table"])
    }
    else
      alert("Veuillez renseigner les identifiants")
  }

  cancel(event) {
    event.preventDefault()
    this.registrationForm.reset();
    this.visitsTable = true
    this.addingVisit = false
  }
}
