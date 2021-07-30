import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Horse } from 'src/model/horse-model';
import { HorseService } from 'src/service/horse-service.service';

@Component({
  selector: 'app-horse-component',
  templateUrl: './horse-component.component.html',
  styleUrls: ['./horse-component.component.scss']
})
export class HorseComponentComponent implements OnInit {

  horses: Observable<Horse[]>
  displayedColumns: String[] = ['horseId', 'name'];

  constructor(horseService: HorseService) { 
      this.horses = horseService.getHorses()

  }

  ngOnInit(): void {
  
  }

  

}
