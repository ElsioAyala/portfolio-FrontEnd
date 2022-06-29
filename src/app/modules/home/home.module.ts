import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './components/header/header.component';
import { BannerComponent } from './components/banner/banner.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ExperienceItemsComponent } from './components/experience-items/experience-items.component';
import { EducationComponent } from './components/education/education.component';
import { EducationItemsComponent } from './components/education-items/education-items.component';
import { SkillsComponent } from './components/skills/skills.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    BannerComponent,
    ProfileComponent,
    AboutComponent,
    ExperienceComponent,
    ExperienceItemsComponent,
    EducationComponent,
    EducationItemsComponent,
    SkillsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
