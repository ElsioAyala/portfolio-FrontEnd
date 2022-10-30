import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

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
import { ReactiveFormsModule } from '@angular/forms';
import { TokenSessionInterceptor } from '@core/interceptors/token-session.interceptor';
import { EditEducationComponent } from './components/education/Modals/edit-education/edit-education.component';
import { NewEducationComponent } from './components/education/Modals/new-education/new-education.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NewExperienceComponent } from './components/experience/modals/new-experience/new-experience.component';
import { EditExperienceComponent } from './components/experience/modals/edit-experience/edit-experience.component';
import { ModalComponent } from './components/skills/modal/modal.component';
import { ModalProyectsComponent } from './components/proyects/modal-proyects/modal-proyects.component';
import { ModalProfileComponent } from './components/profile/modal/modal-profile.component';
import { ModalContactComponent } from './components/profile/modal/modal-contact.component';
import { ContactComponent } from './components/contact/contact.component';




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
    EditExperienceComponent,
    NewEducationComponent,
    EditEducationComponent,
    ModalComponent,
    ModalProyectsComponent,
    ModalProfileComponent,
    ModalContactComponent,
    ContactComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      useClass:TokenSessionInterceptor,
      provide:HTTP_INTERCEPTORS,
      multi:true,
    }
  ]
})
export class HomeModule { }
