interface List{
    position: string;
    company: string;
    workingDay:string;
    timeElapsed: string;
    place: string;
    image: string;
}
export interface Experience 
{
    _id:string;
    label: string;
    list: Array<List>;
}


