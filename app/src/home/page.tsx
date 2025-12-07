"use client";

import { useState, useEffect } from "react";
import { Modal } from "../modal/index";
import { GiphyFetch } from "@giphy/js-fetch-api";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showNoModal, setShowNoModal] = useState(false);
  const [showGoodDeedModal, setShowGoodDeedModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmCount, setConfirmCount] = useState(0);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [wishText, setWishText] = useState("");
  const [noClickCount, setNoClickCount] = useState(0);
  const [usedMessages, setUsedMessages] = useState<number[]>([]);
  const [currentMessage, setCurrentMessage] = useState({
    emoji: "😢",
    title: "What a shame",
    text: "Don't you believe in Santa?",
  });
  const [gifs, setGifs] = useState({
    santa: "https://media.tenor.com/WOb98MAf-fAAAAAM/merry-christmas.gif",
    thinking:
      "https://media.tenor.com/VIKJWb8sE_cAAAAM/santa-claus-christmas.gif",
    checking: "https://media.tenor.com/NRQbB66SCpAAAAAM/santa-searching.gif",
    celebration:
      "https://media.tenor.com/CtB9vLJe4YsAAAAM/merry-christmas-christmas.gif",
    sad: "https://media.tenor.com/HmLaCS18OlEAAAAM/santa-claus-sad.gif",
  });

  useEffect(() => {
    const loadGifs = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_GIPHY_API_KEY || "YOUR_API_KEY";
        const gf = new GiphyFetch(apiKey);

        // สุ่ม offset เพื่อให้ได้ GIF แบบสุ่ม
        const getRandomOffset = () => Math.floor(Math.random() * 50);

        const [santa, thinking, checking, celebration, sad] = await Promise.all(
          [
            gf.search("santa claus christmas", { limit: 1, offset: getRandomOffset() }),
            gf.search("santa claus thinking", { limit: 1, offset: getRandomOffset() }),
            gf.search("santa checking list", { limit: 1, offset: getRandomOffset() }),
            gf.search("merry christmas celebration", { limit: 1, offset: getRandomOffset() }),
            gf.search("sad santa claus", { limit: 1, offset: getRandomOffset() }),
          ]
        );

        setGifs({
          santa: santa.data[0]?.images.original.url || gifs.santa,
          thinking: thinking.data[0]?.images.original.url || gifs.thinking,
          checking: checking.data[0]?.images.original.url || gifs.checking,
          celebration:
            celebration.data[0]?.images.original.url || gifs.celebration,
          sad: sad.data[0]?.images.original.url || gifs.sad,
        });
      } catch (error) {
        console.error("Failed to load GIFs:", error);
      }
    };
    loadGifs();
  }, []);

  const persuasionMessages = [
    { emoji: "😢", title: "What a shame", text: "Don't you believe in Santa?" },
    { emoji: "🥺", title: "Please!", text: "Just try making a wish! It won't hurt!" },
    {
      emoji: "🎅",
      title: "Santa is sad",
      text: "Santa is waiting for you to ask for a gift...",
    },
    {
      emoji: "✨",
      title: "Just give it a try",
      text: "If you don't like it, you don't have to take it. But try asking first!",
    },
    {
      emoji: "🎁",
      title: "Gifts are waiting!",
      text: "There are nice gifts waiting for you. Won't you really ask?",
    },
    {
      emoji: "😭",
      title: "Don't do this",
      text: "This Christmas might be special. Just give it a try!",
    },
    {
      emoji: "🤗",
      title: "Come on",
      text: "Everyone else is asking. Won't you join them?",
    },
    {
      emoji: "🌟",
      title: "Special opportunity",
      text: "This is a great chance! It might be the last time!",
    },
    {
      emoji: "😔",
      title: "So disappointed",
      text: "Santa flew all this way! Ask for something!",
    },
    {
      emoji: "🎄",
      title: "Christmas is here",
      text: "Today is a special day. Don't miss this great opportunity!",
    },
    {
      emoji: "💝",
      title: "Just ask",
      text: "Don't be afraid! Just tell us your wish!",
    },
    {
      emoji: "🦌",
      title: "Reindeer are waiting",
      text: "The reindeer with the sleigh are waiting outside. Won't you really ask?",
    },
  ];

  const handleNoClick = () => {
    setNoClickCount(noClickCount + 1);

    // สุ่มข้อความใหม่
    const availableIndices = persuasionMessages
      .map((_, index) => index)
      .filter((index) => !usedMessages.includes(index));

    let newUsedMessages = usedMessages;
    let randomIndex;

    if (availableIndices.length === 0) {
      newUsedMessages = [];
      randomIndex = 0;
    } else {
      randomIndex =
        availableIndices[Math.floor(Math.random() * availableIndices.length)];
      newUsedMessages = [...usedMessages, randomIndex];
    }

    setUsedMessages(newUsedMessages);
    setCurrentMessage(persuasionMessages[randomIndex]);
    setShowNoModal(true);
  };

  const handleRequestSubmit = () => {
    if (wishText.trim()) {
      setShowRequestModal(false);
      setShowGoodDeedModal(true);
    }
  };

  const handleGoodDeedConfirm = () => {
    setShowGoodDeedModal(false);
    setConfirmCount(1);
    setShowConfirmModal(true);
  };

  const handleConfirmNext = () => {
    if (confirmCount < 4) {
      setConfirmCount(confirmCount + 1);
    } else {
      setShowConfirmModal(false);
      // Redirect to Christmas celebration page
      window.location.href = "/src/christmas";
    }
  };

  const getConfirmMessage = () => {
    const messages = [
      {
        emoji: "🤔",
        title: "Are you sure?",
        text: "Are you sure you've really done good deeds?",
      },
      {
        emoji: "🧐",
        title: "Really?",
        text: "You're not lying, right? Did you really do good deeds?",
      },
      {
        emoji: "😏",
        title: "Hmm...",
        text: "Santa knows if you're lying... Did you really do good deeds?",
      },
      {
        emoji: "🕵️",
        title: "Double checking!",
        text: "Santa has a list of naughty and nice... Are you 100% sure?",
      },
    ];
    return messages[confirmCount - 1] || messages[0];
  };

  const resetAll = () => {
    setShowRequestModal(false);
    setShowNoModal(false);
    setShowGoodDeedModal(false);
    setShowConfirmModal(false);
    setShowFinalModal(false);
    setConfirmCount(0);
    setWishText("");
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 overflow-hidden relative ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-red-950 to-green-950"
          : "bg-gradient-to-br from-red-100 via-pink-100 to-green-100"
      }`}
    >
      {/* Animated background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-5 text-4xl animate-bounce opacity-40">
          ❄️
        </div>
        <div
          className="absolute top-20 right-10 text-3xl animate-pulse opacity-30"
          style={{ animationDelay: "0.5s" }}
        >
          ⭐
        </div>
        <div
          className="absolute bottom-20 left-10 text-5xl animate-bounce opacity-30"
          style={{ animationDelay: "1s" }}
        >
          🎄
        </div>
        <div
          className="absolute bottom-32 right-8 text-4xl animate-pulse opacity-40"
          style={{ animationDelay: "1.5s" }}
        >
          🎁
        </div>
        <div
          className="absolute top-1/3 left-1/4 text-3xl animate-bounce opacity-20"
          style={{ animationDelay: "0.8s" }}
        >
          ✨
        </div>
        <div
          className="absolute top-2/3 right-1/4 text-3xl animate-pulse opacity-25"
          style={{ animationDelay: "1.2s" }}
        >
          🌟
        </div>
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-md z-10">
        <div
          className={`rounded-3xl shadow-2xl backdrop-blur-lg transition-all duration-500 overflow-hidden ${
            isDarkMode
              ? "bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-2 border-red-500/30"
              : "bg-white/95 border-2 border-red-300/50"
          }`}
          style={{
            boxShadow: isDarkMode
              ? "0 25px 50px -12px rgba(239, 68, 68, 0.5), 0 0 30px rgba(34, 197, 94, 0.3)"
              : "0 25px 50px -12px rgba(220, 38, 38, 0.3), 0 0 20px rgba(21, 128, 61, 0.2)",
          }}
        >
          {/* Card Header */}
          <div className="relative pt-8 pb-6 px-6">
            <div className="text-center">
              <div className="inline-block mb-4 relative">
                <div className="absolute inset-0 bg-red-500/30 blur-3xl "></div>
                <img
                  src={gifs.santa}
                  alt="Santa"
                  className="w-28 h-28 mx-auto   relative z-10 "
                />
              </div>
              <h1
                className={`text-4xl font-bold mb-3 transition-colors duration-300 leading-tight whitespace-nowrap ${
                  isDarkMode ? "text-red-400" : "text-red-600"
                }`}
                style={{
                  textShadow: isDarkMode
                    ? "0 0 20px rgba(248,113,113,0.6)"
                    : "0 0 15px rgba(220,38,38,0.4)",
                }}
              >
                Merry Christmas
              </h1>
              <div className="text-5xl mb-3">🎄</div>
              <p
                className={`text-lg font-medium transition-colors duration-300 px-4 ${
                  isDarkMode ? "text-green-300" : "text-green-700"
                }`}
              >
                Hey! Let's ask Santa for gifts together
              </p>
            </div>
          </div>

          {/* Divider with icons */}
          <div className="flex justify-center items-center gap-3 py-4 px-6">
            <div
              className={`h-px flex-1 ${
                isDarkMode
                  ? "bg-gradient-to-r from-transparent via-red-500/50 to-transparent"
                  : "bg-gradient-to-r from-transparent via-red-300 to-transparent"
              }`}
            ></div>
            <div className="flex gap-2 text-2xl">
              <span className="animate-pulse">✨</span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "0.2s" }}
              >
                🎁
              </span>
              <span
                className="animate-pulse"
                style={{ animationDelay: "0.4s" }}
              >
                ✨
              </span>
            </div>
            <div
              className={`h-px flex-1 ${
                isDarkMode
                  ? "bg-gradient-to-r from-transparent via-red-500/50 to-transparent"
                  : "bg-gradient-to-r from-transparent via-red-300 to-transparent"
              }`}
            ></div>
          </div>

          {/* Card Body - Buttons */}
          <div className="px-6 pb-8 space-y-4">
            <button
              onClick={() => setShowRequestModal(true)}
              className={`group relative w-full py-5 rounded-2xl font-bold text-xl overflow-hidden transition-all duration-300 transform active:scale-95 ${
                isDarkMode
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg shadow-green-500/50"
                  : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white shadow-xl shadow-green-500/40"
              }`}
              style={{
                boxShadow: "0 10px 30px -5px rgba(34, 197, 94, 0.5)",
              }}
            >
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="relative flex items-center justify-center gap-2 whitespace-nowrap">
                <span>Ask for Gift</span>
                <span className="text-2xl animate-bounce">🎁</span>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
            </button>

            <button
              onClick={handleNoClick}
              className={`group relative w-full py-5 rounded-2xl font-bold text-xl overflow-hidden transition-all duration-300 transform active:scale-95 ${
                isDarkMode
                  ? "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-gray-200 shadow-lg shadow-gray-700/50"
                  : "bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-300 hover:to-gray-400 text-white shadow-xl shadow-gray-400/40"
              }`}
            >
              <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="relative flex items-center justify-center gap-2 whitespace-nowrap">
                <span>No Thanks</span>
                <span className="text-2xl">😔</span>
              </div>
            </button>
          </div>

          {/* Card Footer */}
          <div
            className={`py-4 text-center text-sm ${
              isDarkMode
                ? "bg-gradient-to-r from-red-900/30 to-green-900/30 text-gray-400"
                : "bg-gradient-to-r from-red-50 to-green-50 text-gray-600"
            }`}
          ></div>
        </div>
      </div>

      {/* Request Modal - ขอของจากซานต้า */}
      <Modal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        zIndexValue={60}
        className={`max-w-md p-8 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
      >
        <div className="text-center">
          <div className="mb-4">
            <img
              src={gifs.santa}
              alt="Santa"
              className="w-32 h-32 mx-auto rounded-lg"
            />
          </div>
          <h2
            className={`text-3xl font-bold mb-4 whitespace-nowrap ${
              isDarkMode ? "text-red-400" : "text-red-600"
            }`}
          >
            Ask Santa for a Gift
          </h2>
          <p
            className={`mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            If you could ask Santa for anything, what would it be?
          </p>
          <div className="mb-6">
            <textarea
              value={wishText}
              onChange={(e) => setWishText(e.target.value)}
              placeholder="Type your wish here..."
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none min-h-[100px] ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-400"
                  : "bg-white border-gray-300 text-gray-900 focus:border-red-500"
              }`}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowRequestModal(false)}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleRequestSubmit}
              className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold whitespace-nowrap"
            >
              Submit 🎁
            </button>
          </div>
        </div>
      </Modal>

      {/* Good Deed Modal - ทำความดีหรือยัง */}
      <Modal
        isOpen={showGoodDeedModal}
        onClose={() => setShowGoodDeedModal(false)}
        zIndexValue={70}
        className={`max-w-md p-8 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
        showCloseButton={false}
      >
        <div className="text-center">
          <div className="mb-4">
            <img
              src={gifs.thinking}
              alt="Santa thinking"
              className="w-32 h-32 mx-auto rounded-lg"
            />
          </div>
          <h2
            className={`text-3xl font-bold mb-4 whitespace-nowrap ${
              isDarkMode ? "text-red-400" : "text-red-600"
            }`}
          >
            Wait a minute!
          </h2>
          <p
            className={`mb-6 text-lg ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            But Santa only gives gifts to those who do good deeds.
            <br />
            Have you done any good deeds today?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowGoodDeedModal(false)}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Not yet
            </button>
            <button
              onClick={handleGoodDeedConfirm}
              className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold whitespace-nowrap"
            >
              Yes I have! ✨
            </button>
          </div>
        </div>
      </Modal>

      {/* Confirm Modal - ยืนยัน 4 ครั้ง */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          setConfirmCount(0);
        }}
        zIndexValue={80}
        className={`max-w-md p-8 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
        showCloseButton={false}
      >
        <div className="text-center">
          <div className="mb-4">
            <img
              src={gifs.checking}
              alt="Santa checking list"
              className="w-32 h-32 mx-auto rounded-lg"
            />
          </div>
          <div className="text-4xl mb-2">{getConfirmMessage().emoji}</div>
          <h2
            className={`text-3xl font-bold mb-4 ${
              isDarkMode ? "text-orange-400" : "text-orange-600"
            }`}
          >
            {getConfirmMessage().title}
          </h2>
          <p
            className={`mb-6 text-lg ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {getConfirmMessage().text}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowConfirmModal(false);
                setConfirmCount(0);
              }}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Not sure
            </button>
            <button
              onClick={handleConfirmNext}
              className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold whitespace-nowrap"
            >
              Yes I'm sure! ✓
            </button>
          </div>
        </div>
      </Modal>

      {/* Final Modal - ข้อควาวมสุดท้าย */}
      <Modal
        isOpen={showFinalModal}
        onClose={resetAll}
        zIndexValue={90}
        className={`max-w-md p-8 ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-900"
            : "bg-gradient-to-br from-red-100 to-green-100"
        }`}
        showCloseButton={false}
      >
        <div className="text-center">
          <div className="mb-4">
            <img
              src={gifs.celebration}
              alt="Merry Christmas"
              className="w-48 h-48 mx-auto rounded-lg"
            />
          </div>
          <h2
            className={`text-4xl font-bold mb-4 whitespace-nowrap ${
              isDarkMode ? "text-red-400" : "text-red-600"
            }`}
          >
            Congratulations!
          </h2>
          <p
            className={`text-xl mb-4 font-semibold ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            I hope Santa brings you
            <br />
            &quot;{wishText}&quot;
            <br />
            this Christmas!
          </p>
          <p
            className={`text-lg mb-6 ${
              isDarkMode ? "text-green-400" : "text-green-700"
            }`}
          >
            🎄 Merry Christmas 🎄
          </p>
          <button
            onClick={resetAll}
            className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold text-lg whitespace-nowrap"
          >
            Back to Home 🏠
          </button>
        </div>
      </Modal>

      {/* No Modal - ไม่ขอ (ตื้อให้ขอ) */}
      <Modal
        isOpen={showNoModal}
        onClose={() => {}}
        zIndexValue={50}
        className={`max-w-md p-8 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
        showCloseButton={false}
      >
        <div className="text-center">
          <div className="mb-4">
            <img
              src={gifs.sad}
              alt="Sad Santa"
              className="w-32 h-32 mx-auto rounded-lg"
            />
          </div>
          <div className="text-4xl mb-2">{currentMessage.emoji}</div>
          <h2
            className={`text-3xl font-bold mb-4 ${
              isDarkMode ? "text-red-400" : "text-red-600"
            }`}
          >
            {currentMessage.title}
          </h2>
          <p
            className={`mb-6 text-lg ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {currentMessage.text}
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowNoModal(false);
                setShowRequestModal(true);
              }}
              className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold whitespace-nowrap"
            >
              Okay, I'll ask! 🎁
            </button>
            <button
              onClick={handleNoClick}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              Still no
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
