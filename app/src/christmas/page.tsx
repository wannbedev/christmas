"use client";

import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useRouter } from "next/navigation";

export default function ChristmasCelebration() {
  const router = useRouter();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [snowflakes, setSnowflakes] = useState<
    Array<{ id: number; left: number; delay: number; duration: number }>
  >([]);

  useEffect(() => {
    // Set window size for confetti
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Generate snowflakes
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
    }));
    setSnowflakes(flakes);

    // Stop confetti after 10 seconds
    const timer = setTimeout(() => setShowConfetti(false), 10000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
          : "bg-gradient-to-br from-red-100 via-pink-100 to-yellow-100"
      }`}
    >
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      {/* Snowflakes */}
      <div className="fixed inset-0 pointer-events-none">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className={`absolute text-2xl animate-fall ${
              isDarkMode ? "text-white" : "text-blue-200"
            }`}
            style={{
              left: `${flake.left}%`,
              animationDelay: `${flake.delay}s`,
              animationDuration: `${flake.duration}s`,
            }}
          >
            ❄️
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header with Animation */}
        <div className="text-center mb-12 animate-bounce-slow">
          <h1
            className={`text-7xl font-bold mb-6 animate-pulse ${
              isDarkMode
                ? "text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-300 to-green-400"
                : "text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-500 to-green-600"
            }`}
          >
            🎉 Merry Christmas! 🎄
          </h1>
          <p
            className={`text-3xl font-semibold mb-8 ${
              isDarkMode ? "text-pink-300" : "text-red-600"
            }`}
          >
            ขอให้มีความสุขในเทศกาลคริสต์มาสนี้! ✨
          </p>
        </div>
        {/* Celebration Messages */}
        <div
          className={`max-w-3xl mx-auto ${
            isDarkMode ? "bg-gray-800/90" : "bg-white/90"
          } backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-12 border-4 ${
            isDarkMode ? "border-pink-500" : "border-red-500"
          }`}
        >
          <div className="text-center space-y-6">
            <div className="text-5xl animate-bounce">🎅</div>
            <h2
              className={`text-3xl font-bold ${
                isDarkMode ? "text-red-400" : "text-red-600"
              }`}
            >
              ขอบคุณที่เข้าร่วมกับเรา!
            </h2>
            <p
              className={`text-xl ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              หวังว่าความปรารถนาของคุณจะเป็นจริง 🌟
              <br />
              ขอให้ทุกวันของคุณเต็มไปด้วยความสุข ความรัก และเสียงหัวเราะ
            </p>
            <div className="flex justify-center gap-4 text-4xl mt-6">
              <span className="animate-bounce" style={{ animationDelay: "0s" }}>
                ❤️
              </span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "0.1s" }}
              >
                🎁
              </span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "0.2s" }}
              >
                ✨
              </span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "0.3s" }}
              >
                🎄
              </span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "0.4s" }}
              >
                🎉
              </span>
            </div>
          </div>
        </div>

        {/* Santa and Reindeer Animation */}
        <div className="mb-12 overflow-hidden">
          <div className="animate-fly-across text-6xl whitespace-nowrap">
            🦌🦌🦌🛷🎅
          </div>
        </div>

        {/* Dancing Emojis */}
        <div className="flex justify-center gap-8 mt-12">
          <span className="text-5xl animate-dance">💃</span>
          <span
            className="text-5xl animate-dance"
            style={{ animationDelay: "0.2s" }}
          >
            🕺
          </span>
          <span
            className="text-5xl animate-dance"
            style={{ animationDelay: "0.4s" }}
          >
            💃
          </span>
          <span
            className="text-5xl animate-dance"
            style={{ animationDelay: "0.6s" }}
          >
            🕺
          </span>
        </div>
      </div>

      {/* Floating Presents */}
      <div className="fixed bottom-10 left-10 text-6xl animate-float">🎁</div>
      <div
        className="fixed bottom-20 right-20 text-5xl animate-float"
        style={{ animationDelay: "1s" }}
      >
        🎀
      </div>
      <div
        className="fixed top-1/3 left-20 text-4xl animate-float"
        style={{ animationDelay: "2s" }}
      >
        ⭐
      </div>
      <div
        className="fixed top-1/2 right-10 text-5xl animate-float"
        style={{ animationDelay: "1.5s" }}
      >
        🎊
      </div>
      {""}
    </div>
  );
}
/////