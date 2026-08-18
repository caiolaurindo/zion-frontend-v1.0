'use client';

import { useRef } from 'react';
import { toPng } from 'html-to-image';

interface Props {
  title: string;
  poster: string;
  year: string;
  rating: string;
  runtime: string;
  genres: string[];
}

export default function MovieTicket({ title, poster, year, rating, runtime, genres }: Props) {
  const ticketRef = useRef<HTMLDivElement>(null);

  async function handleDownload() {
    if (!ticketRef.current) return;

    try {
      const dataUrl = await toPng(ticketRef.current, {
        pixelRatio: 3,
        skipFonts: false,
      });
      const link = document.createElement('a');
      link.download = `zion-${title.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating image', err);
    }
  }

  const now = new Date();
  const date = now.toLocaleDateString('pt-BR');
  const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Ticket */}
      <div
        ref={ticketRef}
        className="relative w-[360px] max-w-full aspect-[1080/1920] overflow-hidden bg-transparent"
      >
        {/* Fundo do Story (imagem que você enviou, servirá de fundo para o print) */}
        <img 
          src="/fundo-story.png" 
          alt="Story Background" 
          className="absolute inset-0 w-full h-full object-cover z-0" 
          crossOrigin="anonymous" 
        />

        {/* Fundo Original do SVG (contém a logo em cima, o texto embaixo, o ticket dark e o placeholder verde) */}
        <img 
          src="/ticket MOCKUP TEXT ZION.svg" 
          alt="Ticket background"
          className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
          crossOrigin="anonymous"
        />

        {/* 
          Sobrepomos um SVG inline exatamente sobre o background.
          Usamos a mesma viewport (1080x1920) para que as coordenadas batam perfeitamente.
          O clipPath usa o MESMO path do retângulo verde para recortar o poster com o notch!
        */}
        <svg viewBox="0 0 1080 1920" className="absolute inset-0 w-full h-full z-20 pointer-events-none">
          <defs>
            <clipPath id="ticket-poster-clip">
              {/* O path exato da área verde (cls-17) no topo do ticket */}
              <path d="M789.71,469.87H290.29c-33.97,0-61.52,27.54-61.52,61.52v457.38c36.69,0,66.43,29.74,66.43,66.43,0,4.88-.54,9.63-1.54,14.21h486.34c-1-4.58-1.54-9.33-1.54-14.21,0-36.69,29.74-66.43,66.43-66.43,2.13,0,4.24,.11,6.32,.31v-457.69c0-33.97-27.54-61.52-61.52-61.52Z"/>
            </clipPath>
          </defs>
          
          {/* A imagem do poster, recortada no formato verde exato */}
          <image 
            href={poster} 
            x="200" y="450" width="700" height="650" 
            preserveAspectRatio="xMidYMid slice" 
            clipPath="url(#ticket-poster-clip)" 
            crossOrigin="anonymous" 
          />

          {/* Redesenhamos a borda brilhante e interna por cima do poster para não perder o efeito! */}
          <path 
            fill="none" stroke="#fff" strokeWidth="3" style={{ mixBlendMode: 'screen' }}
            d="M844.9,1121.63c-36.69,0-66.43-29.74-66.43-66.43s29.74-66.43,66.43-66.43c2.13,0,4.24,.11,6.32,.31v-457.69c0-33.97-27.54-61.52-61.52-61.52H290.29c-33.97,0-61.52,27.54-61.52,61.52v457.38c36.69,0,66.43,29.74,66.43,66.43s-29.74,66.43-66.43,66.43v470.02c0,33.97,27.54,61.52,61.52,61.52h499.42c33.97,0,61.52-27.54,61.52-61.52v-470.33c-2.08,.2-4.19,.31-6.32,.31Z"
          />
          <path 
            fill="none" stroke="#6e5baf" strokeWidth="3"
            d="M844.9,1121.63c-36.69,0-66.43-29.74-66.43-66.43s29.74-66.43,66.43-66.43c2.13,0,4.24,.11,6.32,.31v-457.69c0-33.97-27.54-61.52-61.52-61.52H290.29c-33.97,0-61.52,27.54-61.52,61.52v457.38c36.69,0,66.43,29.74,66.43,66.43s-29.74,66.43-66.43,66.43v470.02c0,33.97,27.54,61.52,61.52,61.52h499.42c33.97,0,61.52-27.54,61.52-61.52v-470.33c-2.08,.2-4.19,.31-6.32,.31Z"
          />
        </svg>

        {/* Overlay com os valores do filme (posicionados exatamente onde o SVG já preparou) */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          {/* Título da Obra (nome acima) */}
          <div 
            className="absolute flex justify-center items-center px-4" 
            style={{ top: '56.5%', left: '15%', width: '70%', height: '8%' }}
          >
            <h2 
              className="text-white font-black uppercase text-center leading-tight line-clamp-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]" 
              style={{ fontSize: '22px' }}
            >
              {title}
            </h2>
          </div>

          {/* Valor da Data */}
          <div 
            className="absolute flex justify-center items-end pb-1" 
            style={{ top: '64.5%', left: '46%', width: '28%', height: '3%' }}
          >
            <span className="text-white font-bold text-[16px] tracking-wide drop-shadow-md">
              {date}
            </span>
          </div>

          {/* Valor da Hora (Duração) */}
          <div 
            className="absolute flex justify-center items-end pb-1" 
            style={{ top: '67.0%', left: '46%', width: '28%', height: '3%' }}
          >
            <span className="text-white font-bold text-[16px] tracking-wide drop-shadow-md">
              {runtime}
            </span>
          </div>

          {/* Valor da Nota */}
          <div 
            className="absolute flex justify-center items-end pb-1" 
            style={{ top: '69.5%', left: '46%', width: '28%', height: '3%' }}
          >
            <span className="text-white font-bold text-[16px] tracking-wide drop-shadow-md">
              {rating}
            </span>
          </div>
        </div>
      </div>

      {/* Botão de download */}
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-[0.2em] uppercase border border-purple-500/30 text-purple-300 hover:border-purple-400/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all duration-300"
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        Baixar para story
      </button>
    </div>
  );
}