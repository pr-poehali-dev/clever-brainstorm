import { useState } from "react";
import {
  Search,
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Mic,
  Check,
  CheckCheck,
  Users,
  Hash,
  Star,
  Pin,
  Bell,
  Settings,
  Moon,
  Edit3,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const chats = [
  {
    id: 1,
    name: "Анна Смирнова",
    avatar: "А",
    color: "from-pink-400 to-rose-500",
    lastMessage: "Окей, жду! 😊",
    time: "12:34",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Дизайн-команда",
    avatar: "Д",
    color: "from-violet-500 to-purple-600",
    lastMessage: "Миша: Посмотрите макет!",
    time: "11:58",
    unread: 7,
    online: false,
    isGroup: true,
  },
  {
    id: 3,
    name: "Кирилл Орлов",
    avatar: "К",
    color: "from-sky-400 to-blue-500",
    lastMessage: "Спасибо за помощь 🙏",
    time: "вчера",
    unread: 0,
    online: true,
  },
  {
    id: 4,
    name: "Маркетинг",
    avatar: "М",
    color: "from-emerald-400 to-teal-500",
    lastMessage: "Новый отчёт готов",
    time: "вчера",
    unread: 0,
    online: false,
    isGroup: true,
  },
  {
    id: 5,
    name: "Лена Васильева",
    avatar: "Л",
    color: "from-amber-400 to-orange-500",
    lastMessage: "До встречи!",
    time: "пн",
    unread: 0,
    online: false,
  },
  {
    id: 6,
    name: "Избранное",
    avatar: "⭐",
    color: "from-yellow-400 to-amber-500",
    lastMessage: "Идея для нового проекта...",
    time: "пн",
    unread: 0,
    online: false,
    isSaved: true,
  },
];

const messages = [
  {
    id: 1,
    from: "them",
    name: "Анна Смирнова",
    text: "Привет! Как дела? Ты уже смотрел новый дизайн?",
    time: "12:20",
    read: true,
  },
  {
    id: 2,
    from: "me",
    text: "Привет! Всё отлично 😊 Да, только что открыл — выглядит классно!",
    time: "12:22",
    read: true,
  },
  {
    id: 3,
    from: "them",
    name: "Анна Смирнова",
    text: "Ура! Я рада. Можешь оставить комментарии в Figma?",
    time: "12:25",
    read: true,
  },
  {
    id: 4,
    from: "me",
    text: "Конечно! Сделаю сегодня вечером. Уже вижу несколько идей для улучшения.",
    time: "12:28",
    read: true,
  },
  {
    id: 5,
    from: "them",
    name: "Анна Смирнова",
    text: "Окей, жду! 😊",
    time: "12:34",
    read: false,
  },
];

const Index = () => {
  const [activeChat, setActiveChat] = useState(chats[0]);
  const [messageText, setMessageText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  const filteredChats = chats.filter((c) =>
    c.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const openChat = (chat: (typeof chats)[0]) => {
    setActiveChat(chat);
    setMobileView("chat");
  };

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}
    >
      {/* Шапка приложения */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #2AABEE, #229ED9)" }}
          >
            <Send className="w-4 h-4 text-white rotate-12" />
          </div>
          <span
            className="text-xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Мессенджер
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-9 h-9 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-xl"
          >
            <Moon className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-9 h-9 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-xl"
          >
            <Settings className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-9 h-9 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-xl"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Основной контент */}
      <div className="flex flex-1 overflow-hidden">
        {/* Левая панель — список чатов */}
        <div
          className={`${
            mobileView === "chat" ? "hidden" : "flex"
          } md:flex w-full md:w-80 lg:w-96 flex-col border-r border-white/10 bg-white/5 backdrop-blur-sm`}
        >
          {/* Поиск */}
          <div className="px-3 py-3">
            <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-white/40" />
              <input
                className="flex-1 bg-transparent text-white text-sm placeholder-white/40 outline-none"
                placeholder="Поиск"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>

          {/* Список чатов */}
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => openChat(chat)}
                className={`flex items-center gap-3 px-3 py-3 cursor-pointer transition-all duration-200 hover:bg-white/10 ${
                  activeChat.id === chat.id ? "bg-white/15" : ""
                }`}
              >
                {/* Аватар */}
                <div className="relative flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${chat.color} flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-white font-bold text-base">
                      {chat.avatar}
                    </span>
                  </div>
                  {chat.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#16213e] rounded-full"></div>
                  )}
                  {chat.isGroup && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#2AABEE] border-2 border-[#16213e] rounded-full flex items-center justify-center">
                      <Users className="w-2 h-2 text-white" />
                    </div>
                  )}
                </div>

                {/* Инфо */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span
                      className="text-white font-semibold text-sm truncate"
                      style={{ fontFamily: "'Nunito', sans-serif" }}
                    >
                      {chat.name}
                    </span>
                    <span
                      className={`text-xs flex-shrink-0 ml-2 ${
                        chat.unread > 0 ? "text-[#2AABEE]" : "text-white/40"
                      }`}
                    >
                      {chat.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-xs truncate">
                      {chat.lastMessage}
                    </span>
                    {chat.unread > 0 && (
                      <span className="ml-2 flex-shrink-0 bg-[#2AABEE] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Правая панель — чат */}
        <div
          className={`${
            mobileView === "list" ? "hidden" : "flex"
          } md:flex flex-1 flex-col`}
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, rgba(42,171,238,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(99,102,241,0.05) 0%, transparent 50%)",
          }}
        >
          {/* Заголовок чата */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/5 backdrop-blur-sm">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden w-8 h-8 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-xl mr-1"
              onClick={() => setMobileView("list")}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="relative">
              <div
                className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${activeChat.color} flex items-center justify-center shadow-md`}
              >
                <span className="text-white font-bold">{activeChat.avatar}</span>
              </div>
              {activeChat.online && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#16213e] rounded-full"></div>
              )}
            </div>
            <div className="flex-1">
              <div
                className="text-white font-bold text-base leading-tight"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                {activeChat.name}
              </div>
              <div className="text-xs text-emerald-400">
                {activeChat.online ? "в сети" : "был(а) недавно"}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-9 h-9 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-xl"
              >
                <Phone className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-9 h-9 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-xl"
              >
                <Video className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-9 h-9 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-xl"
              >
                <Search className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-9 h-9 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-xl"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Сообщения */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
            {/* Дата */}
            <div className="flex justify-center my-3">
              <span className="text-xs text-white/40 bg-white/10 rounded-full px-3 py-1">
                сегодня
              </span>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
              >
                {msg.from === "them" && (
                  <div
                    className={`w-8 h-8 rounded-xl bg-gradient-to-br ${activeChat.color} flex items-center justify-center flex-shrink-0 mr-2 mt-1 shadow-md`}
                  >
                    <span className="text-white text-xs font-bold">
                      {activeChat.avatar}
                    </span>
                  </div>
                )}
                <div
                  className={`max-w-xs sm:max-w-md lg:max-w-lg rounded-2xl px-4 py-2.5 shadow-lg ${
                    msg.from === "me"
                      ? "rounded-br-sm text-white"
                      : "rounded-bl-sm bg-white/10 text-white"
                  }`}
                  style={
                    msg.from === "me"
                      ? {
                          background:
                            "linear-gradient(135deg, #2AABEE, #229ED9)",
                        }
                      : {}
                  }
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <div
                    className={`flex items-center gap-1 mt-1 ${
                      msg.from === "me" ? "justify-end" : "justify-end"
                    }`}
                  >
                    <span className="text-xs opacity-60">{msg.time}</span>
                    {msg.from === "me" && (
                      <CheckCheck className="w-3.5 h-3.5 opacity-60" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Поле ввода */}
          <div className="px-4 py-3 border-t border-white/10 bg-white/5">
            <div className="flex items-end gap-2 bg-white/10 rounded-2xl px-3 py-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0 text-white/50 hover:text-white hover:bg-transparent flex-shrink-0"
              >
                <Paperclip className="w-4 h-4" />
              </Button>
              <input
                className="flex-1 bg-transparent text-white text-sm placeholder-white/40 outline-none resize-none py-1"
                placeholder="Написать сообщение..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0 text-white/50 hover:text-white hover:bg-transparent flex-shrink-0"
              >
                <Smile className="w-4 h-4" />
              </Button>
              {messageText.trim() ? (
                <Button
                  size="sm"
                  className="w-9 h-9 p-0 rounded-xl flex-shrink-0 text-white"
                  style={{ background: "linear-gradient(135deg, #2AABEE, #229ED9)" }}
                  onClick={() => setMessageText("")}
                >
                  <Send className="w-4 h-4 rotate-12" />
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0 text-white/50 hover:text-white hover:bg-transparent flex-shrink-0"
                >
                  <Mic className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Пустое состояние на десктопе */}
        {!activeChat && (
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl"
                style={{ background: "linear-gradient(135deg, #2AABEE, #229ED9)" }}
              >
                <Send className="w-10 h-10 text-white rotate-12" />
              </div>
              <h2
                className="text-white text-2xl font-bold mb-2"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Выберите чат
              </h2>
              <p className="text-white/40 text-sm">
                Начните общение с кем-нибудь
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
