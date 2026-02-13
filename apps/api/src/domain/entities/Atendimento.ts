export interface Atendimento {
  id: string;
  animalId: string;
  data: Date;
  descricao: string;
  tipoServico: string; // consulta, vacina, cirurgia, etc
  valor: number;
}
