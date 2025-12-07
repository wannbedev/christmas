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
    title: "เสียดายจัง",
    text: "เธอไม่เชื่อเรื่องซานต้าหรอ?",
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

        const [santa, thinking, checking, celebration, sad] = await Promise.all(
          [
            gf.search("santa claus christmas", { limit: 1 }),
            gf.search("santa claus thinking", { limit: 1 }),
            gf.search("santa checking list", { limit: 1 }),
            gf.search("merry christmas celebration", { limit: 1 }),
            gf.search("sad santa claus", { limit: 1 }),
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
    { emoji: "😢", title: "เสียดายจัง", text: "เธอไม่เชื่อเรื่องซานต้าหรอ?" },
    { emoji: "🥺", title: "โปรดเถอะนะ", text: "ลองขอพรดูสิ จะไม่เสียหายหรอก!" },
    {
      emoji: "🎅",
      title: "ซานต้าเศร้าแล้ว",
      text: "ซานต้ารอให้เธอขอของขวัญอยู่นะ...",
    },
    {
      emoji: "✨",
      title: "แค่ลองเท่านั้นเอง",
      text: "ถ้าไม่ชอบก็ไม่เอาก็ได้นะ แต่ลองขอดูก่อนสิ!",
    },
    {
      emoji: "🎁",
      title: "ของขวัญรออยู่!",
      text: "มีของขวัญดีๆ รออยู่นะ ไม่ขอจริงๆ หรอ?",
    },
    {
      emoji: "😭",
      title: "อย่าทำแบบนี้เลย",
      text: "คริสต์มาสปีนี้อาจจะพิเศษนะ ลองขอดูสิ!",
    },
    {
      emoji: "🤗",
      title: "มาเถอะนะ",
      text: "ทุกคนก็ขอกันหมดแล้ว เธอจะไม่ขอเหรอ?",
    },
    {
      emoji: "🌟",
      title: "โอกาสพิเศษนะ",
      text: "นี่คือโอกาสที่ดีนะ อาจจะเป็นครั้งสุดท้ายก็ได้!",
    },
    {
      emoji: "😔",
      title: "ผิดหวังจัง",
      text: "ซานต้าบินมาไกลขนาดนี้เลยนะ ขออะไรสักอย่างสิ!",
    },
    {
      emoji: "🎄",
      title: "คริสต์มาสก็มาแล้ว",
      text: "วันนี้คือวันพิเศษนะ อย่าพลาดโอกาสดีๆ เลย!",
    },
    {
      emoji: "💝",
      title: "แค่ขอเท่านั้นเอง",
      text: "ไม่ต้องกลัวหรอก แค่บอกความปรารถนาเท่านั้นเอง!",
    },
    {
      emoji: "🦌",
      title: "กวางเรนเดียร์รอแล้ว",
      text: "กวางลากเลื่อนรออยู่ข้างนอกแล้วนะ จะไม่ขอจริงๆ หรอ?",
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
        title: "แน่ใจนะ?",
        text: "แน่ใจว่าทำความดีแล้วจริงๆ หรือ?",
      },
      {
        emoji: "🧐",
        title: "จริงๆ นะ?",
        text: "ไม่ได้โกหกใช่มั้ย? ทำความดีจริงๆ?",
      },
      {
        emoji: "😏",
        title: "อืมมม...",
        text: "ซานต้ารู้นะถ้าโกหก... ทำความดีจริงๆ หรอ?",
      },
      {
        emoji: "🕵️",
        title: "ตรวจสอบอีกครั้ง!",
        text: "ซานต้ามีรายชื่อคนดีคนเลว... แน่ใจ 100% นะ?",
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
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900"
          : "bg-gradient-to-br from-red-50 via-green-50 to-red-100"
      }`}
    >
      {/* Header Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1
            className={`text-6xl font-bold mb-4 transition-colors duration-300 ${
              isDarkMode ? "text-red-400" : "text-red-600"
            }`}
          >
            🎅 สวัสดีวันคริสต์มาสต์ 🎄
          </h1>
          <p
            className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
              isDarkMode ? "text-green-400" : "text-green-700"
            }`}
          >
            เฮ้! พวกเรามาร่วมขอของจากซานต้ากัน
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button
            onClick={() => setShowRequestModal(true)}
            className="px-8 py-4 rounded-xl border-2 border-green-400 bg-green-200 hover:bg-green-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span className="text-lg font-semibold text-green-900">ขอ 🎁</span>
          </button>
          <button
            onClick={handleNoClick}
            className="px-8 py-4 rounded-xl border-2 border-gray-400 bg-gray-200 hover:bg-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span className="text-lg font-semibold text-gray-900">ไม่ขอ</span>
          </button>
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
            className={`text-3xl font-bold mb-4 ${
              isDarkMode ? "text-red-400" : "text-red-600"
            }`}
          >
            ขอของจากซานต้า
          </h2>
          <p
            className={`mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            ถ้าขออะไรกับซานต้าได้ อยากจะขออะไร?
          </p>
          <div className="mb-6">
            <textarea
              value={wishText}
              onChange={(e) => setWishText(e.target.value)}
              placeholder="พิมพ์ความปรารถนาของคุณที่นี่..."
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
              className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
            >
              ตกลง 🎁
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
            className={`text-3xl font-bold mb-4 ${
              isDarkMode ? "text-red-400" : "text-red-600"
            }`}
          >
            เดี๋ยวก่อน!
          </h2>
          <p
            className={`mb-6 text-lg ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            แต่ซานต้าจะให้ของกับคนที่ทำความดีนะ
            <br />
            แล้ววันนี้ทำความดีหรือยัง?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowGoodDeedModal(false)}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              ยังไม่ได้ทำ
            </button>
            <button
              onClick={handleGoodDeedConfirm}
              className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              ทำแล้ว! ✨
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
              ไม่แน่ใจ
            </button>
            <button
              onClick={handleConfirmNext}
              className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              แน่ใจ! ✓
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
            className={`text-4xl font-bold mb-4 ${
              isDarkMode ? "text-red-400" : "text-red-600"
            }`}
          >
            ยินดีด้วย!
          </h2>
          <p
            className={`text-xl mb-4 font-semibold ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            หวังว่าซานต้าจะเอา
            <br />
            &quot;{wishText}&quot;
            <br />
            มาให้นะ
          </p>
          <p
            className={`text-lg mb-6 ${
              isDarkMode ? "text-green-400" : "text-green-700"
            }`}
          >
            🎄 พร้อมกับเทศกาล Christmas 🎄
          </p>
          <button
            onClick={resetAll}
            className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold text-lg"
          >
            กลับหน้าแรก 🏠
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
              className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              โอเคๆ ขอดีกว่า! 🎁
            </button>
            <button
              onClick={handleNoClick}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              ยังไม่ขอ
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
