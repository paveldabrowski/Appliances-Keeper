import { Observable } from "rxjs";

export interface ContentDescriptor {

  getTitle(): string;
}

export interface ServiceKeeper<T> {

  findAll(): Observable<T[]>;
}
