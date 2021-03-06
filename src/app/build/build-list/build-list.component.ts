import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pageable } from 'src/app/core/model/page/Pageable';
import { AuthService } from 'src/app/login/auth.service';
import { BuildService } from '../build.service';
import { Build } from '../model/Build';
import { BuildState } from '../model/BuildState';

@Component({
  selector: 'app-build-list',
  templateUrl: './build-list.component.html',
  styleUrls: ['./build-list.component.scss']
})
export class BuildListComponent implements OnInit {

  property: string = 'id';
  direction: string = 'asc';

  pageNumber: number = 0;
  pageSize: number = 13;
  totalElements: number = 0;

  dataSource = new MatTableDataSource<Build>();
  displayedColumns: string[] = ['name', 'createdby', 'level', 'dexterity', 'strength', 'intelect', 'faith', 'arcane', 'weapon1', 'weapon2', 'created'];

  builds: Build[] = [];
  buildStates: BuildState[] = [];

  adminMode: boolean = false;
  role: string = 'ADMIN';

  filterUsername: string |null | undefined;
  filterName: string |null | undefined;
  filterWeapon1name: string |null | undefined;
  filterWeapon2name: string |null | undefined;
  filterStartDate: FormControl = new FormControl;
  filterEndDate: FormControl = new FormControl;
  filterState: string |null | undefined;

  username: string |null | undefined;
  name: string |null | undefined;
  weapon1name: string |null | undefined;
  weapon2name: string |null | undefined;
  startDate: FormControl = new FormControl(null);
  endDate: FormControl = new FormControl(null);
  state: string |null | undefined; 

  constructor(
    public authService: AuthService,
    private buildService: BuildService,
  ) { }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(event?: PageEvent) {

    let pageable : Pageable =  {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        sort: [{
            property: this.property,
            direction: this.direction
        }]
    }

    if (event != null) {
        pageable.pageSize = event.pageSize
        pageable.pageNumber = event.pageIndex;
    }

    if(this.adminMode==false)
      this.buildService.getPublicBuilds(pageable, this.username, this.name, this.weapon1name, this.weapon2name, this.startDate.value, this.endDate.value).subscribe(data => {
          this.dataSource.data = data.content;
          this.pageNumber = data.pageable.pageNumber;
          this.pageSize = data.pageable.pageSize;
          this.totalElements = data.totalElements;
      });
    else{

      this.buildService.getAllBuilds(pageable, this.username, this.name, this.weapon1name, this.weapon2name, this.startDate.value, this.endDate.value, this.state).subscribe(data => {
        this.dataSource.data = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalElements = data.totalElements;
      });

      this.buildService.getBuildStates().subscribe(buildStates =>{
        this.buildStates = buildStates;
      });
    }

  }

  sortPage(sort: Sort){

    if(!sort.active || sort.direction === ''){
      this.direction = 'asc';
      this.property = 'id';
      this.loadPage();
      return
    }

    switch(sort.active){
      case 'name':
          this.property = 'name';
          break;
      case 'createdby':
          this.property = 'createdby';
          break;
      case 'level':
          this.property = 'level';
          break;
      case 'dexterity':
          this.property = 'dexterity';
          break;
      case 'strength':
          this.property = 'strength';
          break;
      case 'intelect':      
          this.property = 'intelect';
          break;
      case 'faith':      
          this.property = 'faith';
          break;
      case 'arcane':      
          this.property = 'arcane';
          break;
      case 'weapon1':      
          this.property = 'weapon1.name';
          break;
      case 'weapon2':      
          this.property = 'weapon2.name';
          break;
      case 'created':      
          this.property = 'created';
          break;
      case 'state':      
          this.property = 'state.name';
          break;
      default:
        this.property = 'id';
    }

    this.direction = sort.direction;

    this.loadPage();
  }

  onCleanFilter(){
    this.filterName = '';
    this.filterUsername = '';
    this.filterWeapon1name = null;
    this.filterWeapon2name = null;
    this.filterStartDate = new FormControl(null);
    this.filterEndDate = new FormControl(null);
    this.filterState = null;

    this.onSearch();
  }

  onSearch(): void{

    if(!this.filterWeapon1name)
      this.filterWeapon1name = null;

    if(!this.filterWeapon2name)
      this.filterWeapon2name = null;

    if(!this.filterName)
      this.filterName = null;

    if(!this.filterUsername)
      this.filterUsername = null;
    
    if(!this.filterState)
      this.filterState = null;

    this.name = this.filterName;
    this.username = this.filterUsername;
    this.weapon1name = this.filterWeapon1name;
    this.weapon2name = this.filterWeapon2name;
    this.startDate = this.filterStartDate;
    this.endDate = this.filterEndDate;
    this.state = this.filterState;

    this.loadPage();
  }

  changeMode(): void{
    if(this.adminMode == true)
      this.displayedColumns = ['name', 'createdby', 'level', 'dexterity', 'strength', 'intelect', 'faith', 'arcane', 'weapon1', 'weapon2', 'created', 'state'];
    else
      this.displayedColumns = ['name', 'createdby', 'level', 'dexterity', 'strength', 'intelect', 'faith', 'arcane', 'weapon1', 'weapon2', 'created'];

    this.loadPage();
  }

}
