import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuildService } from 'src/app/build/build.service';
import { Build } from 'src/app/build/model/Build';
import { BuildClass } from 'src/app/build/model/BuildClass';
import { BuildState } from 'src/app/build/model/BuildState';
import { Role } from 'src/app/login/model/Role';
import { User } from 'src/app/login/model/User';
import { Weapon } from 'src/app/weapon/model/Weapon';
import { WeaponService } from 'src/app/weapon/weapon.service';
import { CalculatorService } from '../calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  buildclasses: BuildClass[] = [];
  weapons: Weapon[] = [];

  name: string = '';

  build: Build = new Build;

  constructor(
    private calculatorService: CalculatorService,
    private weaponService: WeaponService,
    private buildService: BuildService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.calculatorService.getBuildClasses().subscribe(
      buildclass =>{
        this.buildclasses = buildclass;
        this.build.buildclass = buildclass[0]; 
        this.addAttributes();
      });

      this.weaponService.getWeapons().subscribe(
        weapons =>{ 
          this.weapons = weapons
          this.weapons.unshift(new Weapon)
        });
  }

  addAttributes(){
    this.build.level = this.build.buildclass.level;
    this.build.dexterity = this.build.buildclass.dexterity;
    this.build.strength = this.build.buildclass.strength;
    this.build.intelect = this.build.buildclass.intelect;
    this.build.faith = this.build.buildclass.faith;
    this.build.arcane = this.build.buildclass.arcane;
  }

  changeClass(){
    this.addAttributes();
  }

  onSave(){
    this.build.created = new Date;

    this.build.name = this.name;

    this.build.createdby.username = 'ivan';

    this.build.createdby.role.name= 'USER';

    this.build.state.name = 'PUBLICO';

    console.log(this.build)
    this.buildService.saveBuild(this.build).subscribe(
      result =>  this.router.navigate(['builds'])
    );
  }

  putOffDex(){
    this.build.level -= 1;
    this.build.dexterity -=1;
  }

  addDex(){
    this.build.level += 1;
    this.build.dexterity +=1;
  }

  putOffStreng(){
    this.build.level -= 1;
    this.build.strength -=1;
  }

  addStreng(){
    this.build.level += 1;
    this.build.strength +=1;
  }

  putOffInt(){
    this.build.level -= 1;
    this.build.intelect -=1;
  }

  addInt(){
    this.build.level += 1;
    this.build.intelect +=1;
  }

  putOffFaith(){
    this.build.level -= 1;
    this.build.faith -=1;
  }

  addFaith(){
    this.build.level += 1;
    this.build.faith +=1;
  }

  putOffArc(){
    this.build.level -= 1;
    this.build.arcane -=1;
  }

  addArc(){
    this.build.level += 1;
    this.build.arcane +=1;
  }

}