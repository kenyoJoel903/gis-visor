export class Layer{
    id: number;
    nombre : string;
    descripcion: string;
    worksapce:string;
    _layer:any;

    constructor(id:number, nombre:string, descripcion:string, workspace:string){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.worksapce = workspace;
    }
}
