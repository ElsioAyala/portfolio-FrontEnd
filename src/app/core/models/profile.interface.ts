interface Contact{
    name: string;
    icon: string;
    link: string;

}

export interface Profile{
    photo: string;
    cover: string;
    name: string;
    stack: string;
    contacts: Array<Contact>;
}