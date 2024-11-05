export interface ResponsePersonajes {
  info:    Info;
  results: Result[];
}

export interface Info {
  count: number;
  pages: number;
  next:  string;
  prev:  null;
}

export interface Result {
  id:       number;
  name:     string;
  status:   Status;
  species:  Species;
  type:     string;
  gender:   Gender;
  location: Location;
  image:    string;
  url:      string;
  created:  Date;
  origin?:   Location;
  episode?:  string[];
}

export enum Gender {
  Female = "Female",
  Male = "Male",
  Unknown = "unknown",
}

export interface Location {
  name: string;
  url:  string;
}

export enum Species {
  Alien = "Alien",
  Human = "Human",
}

export enum Status {
  Alive = "Alive",
  Dead = "Dead",
  Unknown = "unknown",
}
