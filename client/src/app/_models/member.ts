import { IPhoto } from './photo';

export interface IMember {
    id: number;
    userName: string;
    age: number;
    photoUrl: string;
    knownAs: string;
    created: Date;
    lastActive: Date;
    gender: string;
    introduction: string;
    interests: string;
    lookingFor: string;
    city: string;
    country: string;
    photos: IPhoto[];
}
