import clsx from "clsx";

type Props = {
  isItemGuessedAlready: boolean;
  currentGuess: string;
  finalWord: string;
};

export const LetterItem = ({ isItemGuessedAlready, currentGuess, finalWord }: Props) => {
  return (
    <div className="flex gap-2 mb-[4px]">
      {Array.from({ length: 5 })
        .fill("")
        // @ts-expect-error
        .map((item, i) => {
          const exact =
            isItemGuessedAlready && currentGuess[i]?.toLowerCase() === finalWord[i]?.toLowerCase();
          const partial = isItemGuessedAlready && !exact && finalWord.includes(currentGuess[i]);
          const style = { "--delay": `${(i + 1) * 250}ms` };

          return (
            <div
              key={i}
              id={`letter-item-${i}`}
              style={style as React.CSSProperties}
              className={clsx(
                `grid place-items-center border-2 border-zinc-700 w-[50px] h-[50px] sm:w-[56px] sm:h-[56px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] text-white uppercase font-bold text-2xl lg:text-3xl transition`,
                {
                  "bg-green-500 border-green-500": exact,
                  "bg-yellow-600 border-yellow-600": partial,
                  "animate-flip [transform-style:preserve-3d]": isItemGuessedAlready,
                  "bg-zinc-900": !isItemGuessedAlready,
                }
              )}
            >
              {currentGuess[i]}
            </div>
          );
        })}
    </div>
  );
};
