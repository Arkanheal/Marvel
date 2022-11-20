import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Character } from "./character";

const PORT : string = '5000';
const URL : string = `http://localhost:${PORT}/`

export interface Comic {
    count: number;
    titles: string[];
};

@Injectable()
export class CharacterService {
    constructor(private http: HttpClient) {}

    getCharacters(offset?: number): Observable<Character[]> {
        return this.http.get<Character[]>(URL+`?offset=${offset}`);
    }

    getComic(id: number): Observable<Comic> {
        return this.http.get<Comic>(URL+id);
    }
}
