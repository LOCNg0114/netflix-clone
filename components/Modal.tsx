import React, { useEffect, useState } from 'react'
import MuiModal from "@mui/material/Modal"
import { SlClose } from "react-icons/sl"
import { Element, Genre ,Movie } from '../typings'
import utilPath from '../utils/util-path'
import ReactPlayer from 'react-player'
import { FaPlay, FaThumbsUp, FaVolumeOff, FaVolumeUp } from 'react-icons/fa'


interface ModalProps {
    open:boolean
    onClose: () => void
    movieId: number
}

function Modal({open, movieId, onClose}: ModalProps) {
    const [movie, setMovie] = useState<Movie | null>(null)
    const [trailer, setTrailer] = useState('')
    const [genres, setGenres] = useState<Genre[]>([])
    const [muted, setMuted] = useState(true)
    const [videoHeight, setVideoHeight] = useState(500)

    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth
            if(width > 900){
                setVideoHeight(500)
            }
            if(width < 900){
                setVideoHeight(300) 
            }
            if(width < 700){
                setVideoHeight(200) 
            }
            // Set window width/height to state
            // setWindowSize({
            // width: window.innerWidth,
            // height: window.innerHeight,
            // });
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    },[])
    useEffect(() => {
        if(movieId < 0) return 

        async function fetchMovie() {
            const url = utilPath.mergePath(`/${
                movie?.media_type === 'tv' ? 'tv' : 'movie'
                }/${movieId}`)
            const data = await fetch(url)
            
            const movieData = await data.json()
            // console.log('movie Data fetch----', movieData);
            setMovie(movieData)
            if (movieData?.videos) {
                const index = movieData.videos.results.findIndex((element: Element) => element.type === 'Trailer')
                setTrailer(movieData.videos?.results[index]?.key)
            }
            if (movieData?.genres) {
                setGenres(movieData.genres)
            }
        }
        fetchMovie()
    }, [movieId])
    const handleClose = () => {
        onClose()
    }
    
    // console.log('trailer----', trailer);
    return (
        <MuiModal
            open={open}
            onClose={handleClose}
            className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
        >
            <>
                <button 
                    onClick={handleClose} 
                    className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
                >
                    <SlClose className='h-6 w-6'/>
                </button>            
                <div className='relative pt-[56,25%] '>                    
                    {
                        trailer && 
                        <>
                        <ReactPlayer 
                            url={`https://www.youtube.com/watch?v=${trailer}`}
                            width="100"
                            height={`${videoHeight}px`}
                            // style={{ position: 'absolute', top: '0', left: '0' }}
                            playing
                            muted={muted}
                        />                    
                    
                    <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
                        <div className='flex space-x-2'>
                            <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                                <FaPlay className="h-7 w-7 text-black" />
                                Play
                            </button>
                            <button className="modalButton">
                                <FaThumbsUp className="h-7 w-7" />
                            </button>
                        </div>
                        <button className="modalButton" onClick={() => setMuted(!muted)}>
                            {muted ? (
                                <FaVolumeOff className="h-6 w-6" />
                                ) : (
                                    <FaVolumeUp className="h-6 w-6" />
                                    )}
                        </button>
                    </div>
                    </> 
                    }
                </div>
                {trailer && 
                <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
                    <div className="space-y-6 text-lg">
                        <div className="flex items-center space-x-2 text-sm">
                            {movie?.vote_average  && (
                            <p className="font-semibold text-green-400">
                                {movie?.vote_average * 10}% Match
                            </p>
                            )}
                            <p className="font-light">
                                {movie?.release_date || movie?.first_air_date}
                            </p>
                            <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                                HD
                            </div>
                        </div>

                        <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
                            <p className="w-5/6">{movie?.overview}</p>
                            <div className="flex flex-col space-y-3 text-sm">
                                <div>
                                    <span className="text-[gray]">Genres: </span>
                                    {genres.map((genre) => genre.name).join(', ')}
                                </div>

                                <div>
                                    <span className="text-[gray]">Original language: </span>
                                    {movie?.original_language}
                                </div>

                                <div>
                                    <span className="text-[gray]">Total votes: </span>
                                    {movie?.vote_count}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </>
        </MuiModal>
    )  
}

export default Modal