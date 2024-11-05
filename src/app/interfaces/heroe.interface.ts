export interface ResponseHeroes {
  Ok:    boolean;
  total: number;
  resp:  Resp[];
}

export interface Resp {
  _id:       string;
  nombre:    string;
  bio:       string;
  aparicion: Date;
  casa:      string;
  img:       string;
}