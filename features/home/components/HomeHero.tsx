import React from "react";
import { FaPlay } from "react-icons/fa";
import { IoShuffle } from "react-icons/io5";

import GradientButton from "@/features/shared/components/PrimaryButton";

interface HomeHeroProps {
  firstName: string;
}

export default function HomeHero({
  firstName,
}: Readonly<HomeHeroProps>) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="mt-[10px] text-2xl font-light tracking-wide text-slate-100 md:text-3xl">
          Qual será o filme da vez,{" "}
          <span className="bg-gradient-to-r from-purple-300 via-purple-400 to-[#9B4DFF] bg-clip-text font-semibold text-transparent">
            {firstName}?
          </span>
        </h1>

        <p className="text-base text-slate-500 md:text-lg">
          Descubra um filme perfeito para seu humor.
        </p>
      </div>

      <div className="flex flex-row flex-wrap gap-3">
        <GradientButton
          href="/quiz"
          variant="primary"
          size="md"
          icon={<FaPlay size={13} />}
        >
          Descobrir um filme
        </GradientButton>

        <GradientButton
          href="/sorteio"
          variant="outline"
          size="md"
          icon={<IoShuffle size={19} />}
        >
          Surpreenda-me
        </GradientButton>
      </div>
    </section>
  );
}