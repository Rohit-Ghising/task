import React, { useEffect, useState, useRef } from "react";

type Cell = {
  row: number;
  col: number;
};

const originalActiveCells: Cell[] = [
  { row: 0, col: 2 },
  { row: 1, col: 1 },
  { row: 1, col: 3 },
  { row: 2, col: 4 },
  { row: 3, col: 3 },
  { row: 4, col: 2 },
  { row: 4, col: 4 },
];

const rows = 6;
const cols = 28;
const totalBoxes = originalActiveCells.length;
const cycleInterval = 3000; // ms
const maxSets = 5; // total sets to cycle (1 original + 4 random)

function generateRandomPositions(n: number, excludeSet: Set<string>): Cell[] {
  const positions: Cell[] = [];
  const used = new Set<string>(excludeSet);

  while (positions.length < n) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    const key = `${r},${c}`;
    if (!used.has(key)) {
      used.add(key);
      positions.push({ row: r, col: c });
    }
  }

  return positions;
}

const Task4Component: React.FC = () => {
  const [sets, setSets] = useState<Cell[][]>([originalActiveCells]); // start with original fixed set
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const intervalRef = useRef<number>();

  useEffect(() => {
    if (sets.length === 0) return;

    intervalRef.current = window.setInterval(() => {
      setFade(true);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          let nextIndex = prevIndex + 1;

          if (nextIndex === 1 && sets.length === 1) {
            // First time moving past original, generate all 4 random sets at once
            const newSets: Cell[][] = [];
            const excludeSet = new Set(
              originalActiveCells.map((c) => `${c.row},${c.col}`)
            );
            let lastSet = originalActiveCells;
            for (let i = 0; i < maxSets - 1; i++) {
              const newSet = generateRandomPositions(totalBoxes, excludeSet);
              // Update excludeSet to avoid repeats with previous sets
              newSet.forEach((c) => excludeSet.add(`${c.row},${c.col}`));
              newSets.push(newSet);
              lastSet = newSet;
            }
            setSets((prev) => [...prev, ...newSets]);
          }

          // After generating sets, cycle through only random sets (indices 1..maxSets-1)
          if (nextIndex >= maxSets) {
            nextIndex = 1; // loop back to first random set, skip original
          }

          setFade(false);
          return nextIndex;
        });
      }, 700); // fade duration
    }, cycleInterval);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [sets]);

  const currentSet = sets[currentIndex] || [];
  const prevSet = sets[currentIndex - 1] || [];

  const currentSetKeys = new Set(currentSet.map((c) => `${c.row},${c.col}`));
  const prevSetKeys = new Set(prevSet.map((c) => `${c.row},${c.col}`));

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div
        className="grid"
        style={{
          gridTemplateRows: `repeat(${rows}, 48px)`,
          gridTemplateColumns: `repeat(${cols}, 24px)`,
          border: "1px solid #9CA3AF",
          gap: 0,
          width: cols * 24,
          height: rows * 48,
        }}
      >
        {[...Array(rows * cols)].map((_, idx) => {
          const row = Math.floor(idx / cols);
          const col = idx % cols;
          const key = `${row},${col}`;

          const showPrev = prevSetKeys.has(key);
          const showCurrent = currentSetKeys.has(key);

          return (
            <div
              key={key}
              style={{
                border: "1px solid #D1D5DB",
                boxSizing: "border-box",
                position: "relative",
                width: "24px",
                height: "48px",
              }}
            >
              {/* Previous set box fading out */}
              {showPrev && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "#7C3AED",
                    opacity: fade ? 0 : 1,
                    transition: "opacity 0.7s ease",
                    borderRadius: "2px",
                    pointerEvents: "none",
                    zIndex: 1,
                  }}
                />
              )}
              {/* Current set box fading in */}
              {showCurrent && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "#7C3AED",
                    opacity: fade ? 1 : 0,
                    transition: "opacity 0.7s ease",
                    borderRadius: "2px",
                    pointerEvents: "none",
                    zIndex: 2,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Task4Component;
