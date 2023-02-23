import { createContext, useState } from "react";
import { PropItem } from "./constants";


const initialState = {
    isShowModal: false, 
    show: (isShowModal: boolean) => {},
    movieId: -1, 
    setMovie: (movieId: number) => {},
}
export const WrapperContext = createContext<PropItem>(initialState)