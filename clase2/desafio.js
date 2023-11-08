class TicketManager {
  #precioBaseDeGanancia = 1.15;

  constructor() {
    this.eventos = [];
  }
  getEventos() {
    return this.eventos;
   // console.log(this.eventos);
  }

  agregarEvento(nombre, lugar, precio) {
  let  id_evento = (this.getEventos()).length; 

  let evento = {
    nombre:nombre,
    lugar:lugar,
    precio:precio * this.#precioBaseDeGanancia,
    capacidad: 50,
    participantes: [],
    fechas: Date(),
    id: ++id_evento
  }
  this.eventos.push(evento)
  return this.eventos;

  }
traerEvento(idEvento){
    let evento = this.evento.find(event => evento.id == idEvento)
    if(evento){
        return(evento)
    }else{
        return null
    }
}
estaRegistrado(idEvento, idPersona){
    const evento = this.traerEvento(idEvento)
    if(evento==null){
        return ['El evento no existe']
       
    }
    let registro = evento.participantes.find(idParticipante=> idParticipante == idPersona)

    if(registo== undefined){
        return true
    }else{
        return false
    }
}
agregarParticipantes(idEvento, idParticipante){
    const evento = this.traerEvento(idEvento)
    if(evento==null){
        return ['El evento no existe'];
}
if(this.estaRegistrado(idEvento, idParticipante)){
    evento.participantes.push(idParticipante)
    return evento
}else{
    return['La persona ya esta registrada']
}

}
ponerEventoEnGira(idEvento, nLocalidad, nFecha){
    const evento = this.traerEvento(idEvento);

    let id_evento = (this.getEventos()).length;

    if(!evento){
        return 'El evento no existe'
    }
    let nuevoEvento = {...evento};
     nuevoEvento.lugar = nLocalidad;
     nuevoEvento.fecha = nFecha;
     nuevoEvento.id = ++id_evento;
     this.evento.push(nuevoEvento)
     return eventos;
}
 }

 const ticketManager = new TicketManager();

 const eventos = ticketManager.agregarEvento('Lincoln Rock', 'Lincoln', 1000)
 console.log(eventos);