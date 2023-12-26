import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { UbicationsService } from 'src/services/Ubications.service';

@Component({
  selector: 'app-filtesbyubication',
  templateUrl: './filtesbyubication.component.html',
  styleUrls: ['./filtesbyubication.component.scss']
})
export class FiltesbyubicationComponent implements OnInit {
  constructor(private ubicationsService: UbicationsService) { }

  provincias: any[] = [];
  municipios: any[] = [];
  localidades: any[] = [];

  selectedProvincia: string = '';
  selectedMunicipio: string = '';

  @Output() provinciaSeleccionada: EventEmitter<string> = new EventEmitter<string>();
  @Output() municipioSeleccionado: EventEmitter<string> = new EventEmitter<string>()

  ngOnInit() {
    this.cargarProvincias();
  }

  cargarProvincias() {
    this.ubicationsService.getProvincias().subscribe((data: any) => {
      if (data && data.provincias) {
        this.provincias = data.provincias;
      }
    }, (error) => {
      console.error('Error al cargar provincias:', error);
    });
  }

  cargarMunicipios(event: Event) {
    const provincia = (event.target as HTMLSelectElement)?.value;
    if (provincia) {
      this.selectedProvincia = provincia;
      this.ubicationsService.getMunicipios(provincia).subscribe((data: any) => {
        if (data && data.municipios) {
          this.municipios = data.municipios;
          this.provinciaSeleccionada.emit(this.selectedProvincia);
        }
      }, (error) => {
        console.error('Error al cargar municipios:', error);
      });
    }
  }

  cargarLocalidades(event: Event) {
    const municipio = (event.target as HTMLSelectElement)?.value;
    if (municipio) {
      this.selectedMunicipio = municipio;
      this.ubicationsService.getLocalidades(municipio).subscribe((data: any) => {
        if (data && data.localidades) {
          this.localidades = data.localidades;
          this.municipioSeleccionado.emit(this.selectedMunicipio);
        }
      }, (error) => {
        console.error('Error al cargar localidades:', error);
      });
    }
  }
}
