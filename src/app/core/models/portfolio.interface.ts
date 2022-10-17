import { Contact } from "./contact.interface";
import { Education } from "./education.interface";
import { Experience } from "./experience.interface";
import { Profile } from "./profile.interface";
import { Project } from "./project.interface";
import { Skills } from "./skills.interface";

export interface Portfolio {
    /*id_pro : number;
    name: string;
    apellido: string;
    email: string;
    stack: string;
    about: string;
    photo: string;
    cover: string;*/
    profile: Profile;
    educations: Array<Education>;
    experiences: Array<Experience>;
    projects: Array<Project>;
    skills: Array<Skills>;
    contacts: Array<Contact>;
}