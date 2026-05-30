import { useState, useEffect, useRef } from "react";
import {
  Search,
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Mic,
  CheckCheck,
  Users,
  Settings,
  Moon,
  Edit3,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SNOWFLAKES = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 6 + Math.random() * 8,
  size: 8 + Math.random() * 14,
  opacity: 0.4 + Math.random() * 0.5,
}));

type Chat = { id: number; name: string; avatar: string; color: string; lastMessage: string; time: string; unread: number; online: boolean; isGroup?: boolean; };

const chats: Chat[] = [
  { id: 1, name: "Аня 🎄", avatar: "А", color: "from-pink-400 to-rose-500", lastMessage: "С Новым годом! 🎉", time: "23:58", unread: 3, online: true },
  { id: 2, name: "Команда ✨", avatar: "К", color: "from-violet-500 to-purple-600", lastMessage: "Миша: Шампанское! 🥂", time: "23:55", unread: 12, online: false, isGroup: true },
  { id: 3, name: "Дед Мороз 🎅", avatar: "🎅", color: "from-red-500 to-rose-600", lastMessage: "Подарки уже в пути!", time: "23:50", unread: 1, online: true },
  { id: 4, name: "Семья 🏠", avatar: "С", color: "from-emerald-400 to-teal-500", lastMessage: "Мама: Все за стол! 🍽️", time: "23:45", unread: 0, online: false, isGroup: true },
  { id: 5, name: "Кирилл 🎸", avatar: "К", color: "from-sky-400 to-blue-500", lastMessage: "Встречаем вместе?", time: "23:30", unread: 0, online: true },
  { id: 6, name: "Пожелания ⭐", avatar: "⭐", color: "from-yellow-400 to-amber-500", lastMessage: "Только лучшее!", time: "вчера", unread: 0, online: false },
];

const initialMessages = [
  { id: 1, from: "them", text: "Привет! Уже готовишься к Новому году? 🎄", time: "23:40" },
  { id: 2, from: "me", text: "Да! Ёлка стоит, подарки куплены 🎁", time: "23:42" },
  { id: 3, from: "them", text: "Как здорово! Мы всей семьёй собрались 😄", time: "23:44" },
  { id: 4, from: "me", text: "Классика! 🥂 Шампанское охлаждается?", time: "23:50" },
  { id: 5, from: "them", text: "Конечно! Осталось немного до полуночи ✨", time: "23:55" },
  { id: 6, from: "them", text: "С Новым годом! 🎉🎊🎄 Пусть он будет лучшим!", time: "23:58" },
];

const STICKERS = ["🎄", "🎅", "⛄", "🎁", "🥂", "🎆", "🎇", "✨", "❄️", "🦌"];

const GARLAND_COLORS = ["#ff4444", "#44ff88", "#ffdd44", "#44aaff", "#ff44ff", "#ff8844"];

export default function Index() {
  const [activeChat, setActiveChat] = useState(chats[0]);
  const [messageText, setMessageText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");
  const [showStickers, setShowStickers] = useState(false);
  const [allMessages, setAllMessages] = useState(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  const filteredChats = chats.filter((c) =>
    c.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setAllMessages((prev) => [...prev, { id: Date.now(), from: "me", text, time: "сейчас" }]);
    setMessageText("");
    setShowStickers(false);
  };

  return (
    <div
      className="h-screen flex flex-col overflow-hidden relative"
      style={{ background: "linear-gradient(160deg, #0d1b2a 0%, #1a2744 40%, #0d2137 70%, #1a1a2e 100%)" }}
    >
      {/* Анимации */}
      <style>{`
        @keyframes snowfall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.8; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes glow {
          from { opacity: 0.5; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1.2); }
        }
      `}</style>

      {/* Снежинки */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
        {SNOWFLAKES.map((flake) => (
          <div
            key={flake.id}
            className="absolute top-0 select-none text-white/70"
            style={{
              left: `${flake.left}%`,
              fontSize: `${flake.size}px`,
              opacity: flake.opacity,
              animation: `snowfall ${flake.duration}s linear ${flake.delay}s infinite`,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      {/* Гирлянда */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none z-20">
        <div className="flex justify-around items-start pt-1 px-2">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-px bg-white/20" style={{ height: `${10 + Math.sin(i * 0.7) * 5}px` }} />
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  background: GARLAND_COLORS[i % GARLAND_COLORS.length],
                  boxShadow: `0 0 8px 3px ${GARLAND_COLORS[i % GARLAND_COLORS.length]}99`,
                  animation: `glow ${1.2 + (i % 3) * 0.5}s ease-in-out ${(i % 6) * 0.15}s infinite alternate`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Шапка */}
      <div className="relative z-30 flex items-center justify-between px-4 sm:px-6 py-3 pt-10 border-b border-white/10 bg-white/5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-2xl flex items-center justify-center shadow-lg"
            style={{ background: "linear-gradient(135deg, #2AABEE, #229ED9)" }}
          >
            <span className="text-lg">🎄</span>
          </div>
          <div>
            <span className="text-xl font-extrabold text-white tracking-tight" style={{ fontFamily: "'Nunito', sans-serif" }}>
              НовыйГод
            </span>
            <span className="text-white/40 text-xs block">мессенджер ✨</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://play.google.com/store/search?q=<query>&c=apps"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-white text-sm font-semibold shadow-lg transition-all hover:scale-105 hover:brightness-110"
            style={{ background: "linear-gradient(135deg, #01875f, #00c853)" }}
          >
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.18 23.76a2 2 0 0 0 2.07-.19l11.07-6.4-2.93-2.93-10.21 9.52zM20.7 9.36l-2.77-1.6-3.14 3.13 3.14 3.14 2.8-1.62a2.01 2.01 0 0 0 0-3.05zM3 .26C2.65.45 2.4.83 2.4 1.32v21.36c0 .49.25.87.6 1.06l11.82-11.82L3 .26zm9.31 11.1L3.18.24 14.25 6.64l-2.94 2.94v1.54l2.94 2.94L3.18 19.76 12.31 11.36z"/>
            </svg>
            <span className="hidden sm:inline">Google Play</span>
          </a>
          <Button variant="ghost" size="sm" className="w-9 h-9 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-xl">
            <Moon className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="w-9 h-9 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-xl">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="w-9 h-9 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-xl">
            <Edit3 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Основной контент */}
      <div className="flex flex-1 overflow-hidden relative z-20">

        {/* Список чатов */}
        <div className={`${mobileView === "chat" ? "hidden" : "flex"} md:flex w-full md:w-80 lg:w-96 flex-col border-r border-white/10 bg-black/20 backdrop-blur-sm`}>
          {/* Поиск */}
          <div className="px-3 py-3">
            <div className="flex items-center gap-2 bg-white/10 rounded-2xl px-3 py-2 border border-white/10">
              <Search className="w-4 h-4 text-white/40" />
              <input
                className="flex-1 bg-transparent text-white text-sm placeholder-white/40 outline-none"
                placeholder="Поиск чатов..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>

          {/* Быстрые стикеры */}
          <div className="px-3 pb-3 flex gap-2 overflow-x-auto">
            {["🎄", "🎅", "⛄", "🎁", "🥂", "🎆"].map((emoji) => (
              <div key={emoji} className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all border border-white/10 text-xl hover:scale-110">
                {emoji}
              </div>
            ))}
          </div>

          {/* Чаты */}
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => { setActiveChat(chat); setMobileView("chat"); }}
                className={`flex items-center gap-3 px-3 py-3 cursor-pointer transition-all duration-200 hover:bg-white/10 border-b border-white/5 ${activeChat.id === chat.id ? "bg-white/15" : ""}`}
              >
                <div className="relative flex-shrink-0">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${chat.color} flex items-center justify-center shadow-lg`}>
                    {chat.avatar.length > 1
                      ? <span className="text-xl">{chat.avatar}</span>
                      : <span className="text-white font-bold text-base">{chat.avatar}</span>
                    }
                  </div>
                  {chat.online && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#1a2744] rounded-full" />}
                  {chat.isGroup && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#2AABEE] border-2 border-[#1a2744] rounded-full flex items-center justify-center">
                      <Users className="w-2 h-2 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-white font-semibold text-sm truncate" style={{ fontFamily: "'Nunito', sans-serif" }}>{chat.name}</span>
                    <span className={`text-xs flex-shrink-0 ml-2 ${chat.unread > 0 ? "text-[#2AABEE]" : "text-white/40"}`}>{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-xs truncate">{chat.lastMessage}</span>
                    {chat.unread > 0 && (
                      <span className="ml-2 flex-shrink-0 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #2AABEE, #229ED9)" }}>
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Область чата */}
        <div className={`${mobileView === "list" ? "hidden" : "flex"} md:flex flex-1 flex-col`}>
          {/* Заголовок */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-black/20 backdrop-blur-md">
            <Button variant="ghost" size="sm" className="md:hidden w-8 h-8 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-xl" onClick={() => setMobileView("list")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="relative">
              <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${activeChat.color} flex items-center justify-center shadow-md`}>
                {activeChat.avatar.length > 1
                  ? <span className="text-lg">{activeChat.avatar}</span>
                  : <span className="text-white font-bold">{activeChat.avatar}</span>
                }
              </div>
              {activeChat.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#1a2744] rounded-full" />}
            </div>
            <div className="flex-1">
              <div className="text-white font-bold text-base leading-tight" style={{ fontFamily: "'Nunito', sans-serif" }}>{activeChat.name}</div>
              <div className="text-xs text-emerald-400">{activeChat.online ? "в сети 🟢" : "был(а) недавно"}</div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="w-9 h-9 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-xl"><Phone className="w-4 h-4" /></Button>
              <Button variant="ghost" size="sm" className="w-9 h-9 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-xl"><Video className="w-4 h-4" /></Button>
              <Button variant="ghost" size="sm" className="w-9 h-9 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-xl"><MoreVertical className="w-4 h-4" /></Button>
            </div>
          </div>

          {/* Сообщения */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
            <div className="flex justify-center my-2">
              <span className="text-xs text-white/40 bg-white/10 rounded-full px-3 py-1 border border-white/10">🎄 31 декабря</span>
            </div>
            {allMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                {msg.from === "them" && (
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${activeChat.color} flex items-center justify-center flex-shrink-0 mr-2 mt-1 shadow-md`}>
                    {activeChat.avatar.length > 1
                      ? <span className="text-sm">{activeChat.avatar}</span>
                      : <span className="text-white text-xs font-bold">{activeChat.avatar}</span>
                    }
                  </div>
                )}
                <div
                  className={`max-w-xs sm:max-w-md rounded-2xl px-4 py-2.5 shadow-lg ${msg.from === "me" ? "rounded-br-sm text-white" : "rounded-bl-sm bg-white/10 text-white border border-white/10"}`}
                  style={msg.from === "me" ? { background: "linear-gradient(135deg, #2AABEE, #229ED9)" } : {}}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <div className="flex items-center gap-1 mt-1 justify-end">
                    <span className="text-xs opacity-50">{msg.time}</span>
                    {msg.from === "me" && <CheckCheck className="w-3.5 h-3.5 opacity-50" />}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Стикеры */}
          {showStickers && (
            <div className="px-4 pb-2">
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-3">
                <div className="text-white/50 text-xs mb-2 font-medium">🎄 Новогодние стикеры</div>
                <div className="flex flex-wrap gap-2">
                  {STICKERS.map((s) => (
                    <button key={s} onClick={() => sendMessage(s)} className="w-10 h-10 text-2xl hover:bg-white/10 rounded-xl transition-all hover:scale-125">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Поле ввода */}
          <div className="px-4 py-3 border-t border-white/10 bg-black/20 backdrop-blur-md">
            <div className="flex items-end gap-2 bg-white/10 rounded-2xl px-3 py-2 border border-white/10">
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-white/50 hover:text-white hover:bg-transparent flex-shrink-0">
                <Paperclip className="w-4 h-4" />
              </Button>
              <input
                className="flex-1 bg-transparent text-white text-sm placeholder-white/40 outline-none py-1"
                placeholder="Написать сообщение... 🎄"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(messageText)}
              />
              <Button
                variant="ghost" size="sm"
                className={`w-8 h-8 p-0 hover:bg-transparent flex-shrink-0 transition-colors ${showStickers ? "text-[#2AABEE]" : "text-white/50 hover:text-white"}`}
                onClick={() => setShowStickers(!showStickers)}
              >
                <Smile className="w-4 h-4" />
              </Button>
              {messageText.trim() ? (
                <Button size="sm" className="w-9 h-9 p-0 rounded-xl flex-shrink-0 text-white shadow-lg" style={{ background: "linear-gradient(135deg, #2AABEE, #229ED9)" }} onClick={() => sendMessage(messageText)}>
                  <Send className="w-4 h-4 rotate-12" />
                </Button>
              ) : (
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-white/50 hover:text-white hover:bg-transparent flex-shrink-0">
                  <Mic className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}