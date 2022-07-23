import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

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
import { ProyectsComponent } from './components/proyects/proyects.component';
import { NavColumnComponent } from './components/nav-column/nav-column.component';
import { NewExperienceComponent } from './components/new-experience/new-experience.component';
import { ReactiveFormsModule } from '@angular/forms';



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
    SkillsComponent,
    ProyectsComponent,
    NavColumnComponent,
    NewExperienceComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
