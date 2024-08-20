import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DatasetService } from 'src/app/services/dataset.service';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.page.html',
  styleUrls: ['./equipment.page.scss'],
})
export class EquipmentPage implements OnInit {

  public title: string;

  public currency: string;

  public equipments: Observable<any>;

  constructor(
    private router: Router,
    public datasetService: DatasetService,
    private equipmentService: EquipmentService
  ) { }

  ngOnInit() {
    this.title = this.equipmentService.subCategory.libelle;
    this.currency = this.datasetService.selected.currency;
    this.getEquipmentList();
  }

  getEquipmentList() {
    this.equipments = this.equipmentService.getEquipmentList();
  }

  public getPrice(price: number): string {
    if (this.currency === "pa") {
      if (price < 1) {
        return price * 10 + " pc";
      } else if (price > 1000) {
        return price / 10 + " po";
      }
    }
    return price + " " + this.currency;
  }

  categoriesPage() {
    this.equipmentService.subCategory = null;
    this.router.navigateByUrl('/categories');
  }

}
