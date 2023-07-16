import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';
import { DatasetService, AbilityType } from 'src/app/services/dataset.service';
import { ProfileService, Profile } from 'src/app/services/profile.service';
import { PathService, PathType } from 'src/app/services/path.service';
import { CategoryService, Category } from 'src/app/services/category.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.page.html',
  styleUrls: ['./profiles.page.scss'],
})
export class ProfilesPage implements OnInit {

  public title: string;
  public openedSection: string;

  public profiles: Observable<any>;

  public hybrids: Observable<any>;
  public hybridList: Observable<any>;

  public pathTypes: Observable<any>;
  public pathTypeList: Observable<any>;

  public categories: Observable<any>;

  public familyConfig: Record<string, boolean>;

  private configKey = `comob.config.${this.datasetService.selected.dbid || ''}`;

  constructor(
    private router: Router,
    private storage: Storage,
    public datasetService: DatasetService,
    public profileService: ProfileService,
    public pathService: PathService,
    public categoryService: CategoryService
  ) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  ngOnInit() {
    this.title = this.datasetService.selected.name || '';
    this.storage.get(this.configKey + '.families')
      .then((value) => {
        this.familyConfig = value;
        this.getProfileList();
        this.getHybridList();
      });
    this.storage.get(this.configKey + '.openedSection')
      .then((value) => {
        this.openedSection = value
      });
    this.getPathTypes();
    this.getCategoryList();
  }

  getProfileList() {
    this.profiles = this.profileService.getProfileList(this.familyConfig);
  }

  getHybridList() {
    this.hybrids = this.profileService.getProfileList(this.familyConfig, true);
  }

  getPathTypes() {
    this.pathTypes = this.pathService.getPathTypes();
  }

  getCategoryList() {
    this.categories = this.categoryService.getCategoryList();
  }

  sectionChange(ev: any) {
    this.openedSection = ev.detail.value || '';
  }

  saveSection() {
    this.storage.set(this.configKey + '.openedSection', this.openedSection);
  }

  showProfilePaths(profile: Profile) {
    this.profileService.selected = profile;
    this.saveSection();
    this.router.navigateByUrl('/paths');
  }

  showOtherPaths(type: PathType) {
    this.profileService.selected = null;
    const navExtras: NavigationExtras = {
      state: {
        pathType: type
      }
    };
    this.saveSection();
    this.router.navigateByUrl('/paths', navExtras);
  }

  showOtherAbilities(type: AbilityType) {
    this.profileService.selected = null;
    this.pathService.selected = null;
    const navExtras: NavigationExtras = {
      state: {
        abilityType: type,
        backButton: 'Profils',
        navBack: '/profiles'
      }
    };
    console.log(navExtras);
    this.saveSection();
    this.router.navigateByUrl('/abilities', navExtras);
  }

  showSubCategories(parent: Category) {
    this.categoryService.selected = parent;
    this.saveSection();
    this.router.navigateByUrl('/categories');
  }

  showConfig() {
    this.saveSection();
    this.router.navigateByUrl('/config');
  }

  homePage() {
    this.saveSection();
    this.router.navigateByUrl('/home');
  }

}
