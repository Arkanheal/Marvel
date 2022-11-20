import { Component, OnInit } from '@angular/core';
import { Character } from "../character";
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.less'],
  providers: [CharacterService]
})
export class CharactersComponent implements OnInit {

    characters : Character[] = [];
    selectedCharacter?: Character;

    loading: boolean = false;
    errorMessage : string = "";

    constructor(private characterService: CharacterService) {  }

    ngOnInit(): void {
        console.log("here");
        this.getCharacters();
    }

      public getCharacters() {
            this.loading = true;
            this.errorMessage = "";
            this.characterService.getCharacters(0).subscribe({
            next: (response) => {
                          console.log('response received')
                          this.characters = response; 
            },
            error: (error) => {
                          console.error('Request failed with error')
                          this.errorMessage = error;
                          this.loading = false;
                        },
        });
    }

    onSelect(character: Character): void {
        this.selectedCharacter = character;
    }

}
