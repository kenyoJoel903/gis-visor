import { Component, OnInit, ViewChild } from '@angular/core';
import * as L from "leaflet";
import { MapaService } from './service/mapa.service';
import { CENTRO_MAPA } from './shared/constantes';
import { Layer } from './model/layer';
import { MatSelectionList, MatSelectionListChange } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Visor';
  showFiller = false;
  capas:Array<Layer>=[];

  capasSelecionadas:Array<Layer>=[];


  constructor(private mapaService: MapaService){

  }

  ngOnInit(){
    setTimeout(() => {
      this.iniciarMap();
    }, 500);
    this.capas = this.mapaService.obtenerCapas();
  }

  iniciarMap(){
    const centroMapa = L.latLng(CENTRO_MAPA.latitud, CENTRO_MAPA.longitud);
    const mapa =  L.map("map", {
      zoomControl: false,
      center: centroMapa,
      zoom: 16,
      minZoom: 2,
      maxZoom: 19,
      layers: [this.mapaService.mapasBase.CartoDB]
    });
    L.control.zoom({ position: "topright" }).addTo(mapa);
    const controlLayer = L.control.layers(this.mapaService.mapasBase, this.mapaService.overlayers).addTo(mapa);
    L.control.scale().addTo(mapa);
    this.mapaService.map = mapa;
    this.mapaService.controlLayer = controlLayer;
  }


  openMenu(){
    this.showFiller = !this.showFiller;
  }

  seleccionarCapa(e:MatSelectionListChange){
    if(e.option.selected){
      this.mostrarCapaEnMapa(this.buscarLayer(e.option.value));
    }else{
      this.quitarCapaDeMapa(this.buscarLayer(e.option.value));
    }
  }

  private buscarLayer(id:any){
    return this.capas.find(_l  => {
      return _l.id == id;
    })
  }

  mostrarCapaEnMapa(layer:Layer){
    this.capasSelecionadas.push(this.mapaService.agregregarCapa(layer));
    console.log(this.capasSelecionadas);
  }

  quitarCapaDeMapa(layer:Layer){
    if(this.mapaService.removerCapa(layer)){
      let indice = 0;
      this.capasSelecionadas.find(_l => {
        indice++;
        return _l.id == layer.id;
      });
      this.capasSelecionadas.splice(indice-1, 1);
    }   
  }
}
