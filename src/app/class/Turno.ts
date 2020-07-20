export class Turno {
  uid: string;
  clienteId: string;
  clienteName: string;
  clienteLastName: string;
  especialistaId: string;
  especialistaFullName: string;
  fecha: string;
  hora: string;
  atendido: boolean;

  toPlainObject() {
    return Object.assign({}, this);
  }
}
