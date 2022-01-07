import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  constructor(private heroService: HeroService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
    this.messageService.add('Heroes component: Fetched heroes');
  }

  add(name: string) {
    name = name.trim();
    if (!name) {return;}
    this.heroService.addHero({name} as Hero).subscribe(hero => {
      this.heroes.push(hero);
    })
  }

  delete(hero: Hero) {
    this.heroes = this.heroes.filter(h => h.id !== hero.id);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
