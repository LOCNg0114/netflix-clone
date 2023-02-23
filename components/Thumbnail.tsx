import Image from 'next/image'
import { useContext } from 'react';
import { WrapperContext } from '../interfaces/context';
import { Movie } from '../typings'
interface Props {
    movie: Movie 
}

function Thumbnail({ movie }: Props) {
    const {show, setMovie, isShowModal, movieId} = useContext(WrapperContext)
    return (
        <div
            className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
            onClick={() => {
                setMovie(movie.id)
                show(true)
            }}
        >
            <Image
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
                className="rounded-sm object-cover md:rounded"
                layout="fill"
                alt=""
            />            
        </div>        
    )
}

export default Thumbnail
