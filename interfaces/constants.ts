import { SetStateAction } from "react";

export interface PropItem {
    isShowModal: boolean, 
    show: (isShowModal : boolean) => void,
    movieId:number, 
    setMovie: (movieId : number) => void,
}