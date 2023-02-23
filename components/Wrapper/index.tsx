import Head from "next/head";
import React, { useState } from "react";
import { WrapperContext } from "../../interfaces/context";
import Header from "../Header";
import Modal from "../Modal";

export default function WrapperContent({ children, className }: any) {
  const [isShowModal, setIsShowModal] = useState(false);
  const [movieId, setMovieId] = useState(-1);

  const show = (value: boolean) => setIsShowModal(value);
  const setMovie = (value: number) => setMovieId(value);
  return (
    <WrapperContext.Provider
      value={{
        isShowModal,
        show,
        movieId,
        setMovie,
      }}
    >
      <div
        className={`relative h-screen bg-gradient-to-b lg:h-[140vh] ${className}`}
      >
        <Head>
          <title>Home - Netflix</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />
        <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
          {isShowModal && (
            <Modal
              open={isShowModal}
              movieId={movieId}
              onClose={() => show(false)}
            />
          )}
          {children}
        </main>
      </div>
    </WrapperContext.Provider>
  );
}
