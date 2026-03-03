import { AuthContext } from "../../context/AuthContext";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Badge,
  user,
} from "@heroui/react";
import nextifylogo from "../../assets/images/nextifyLogo2.png";
import { FiSearch, FiSun, FiMoon } from "react-icons/fi";
import { IoIosNotifications } from "react-icons/io";
import userIcon from "../../assets/images/userIcon.png";
import { LuMessageCircleMore } from "react-icons/lu";
import { useContext, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggededUserData } from "../../services/UserServices";
import { UserContext } from "../../context/UserContext";
export default function App() {
  const { token, logout } = useContext(AuthContext);
  const { userData, isLoading } = useContext(UserContext);
  // const [userData, setuserData] = useState("");
  const navigate = useNavigate();

  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("theme") === "dark"; } catch { return false; }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const signedInAs = useMemo(() => {
    try {
      const t = localStorage.getItem("token") || token;
      if (!t) return null;
      const payload = JSON.parse(
        atob(t.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
      );
      return payload?.email || payload?.username || payload?.userName || null;
    } catch (e) { return null; }
  }, [token]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');

        .mnav-wrap * { font-family: 'Outfit', sans-serif !important; }

        .mnav-wrap {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: all 0.4s ease;
        }

        /* ═══ LIGHT MODE navbar ═══ */
        .mnav-wrap nav {
          background: rgba(255,255,255,0.92) !important;
          border-bottom: 1px solid #f0f0f5 !important;
          box-shadow: 0 2px 16px rgba(99,102,241,0.06), 0 1px 0 rgba(0,0,0,0.04) !important;
          backdrop-filter: blur(16px) !important;
          transition: all 0.4s ease !important;
        }

        /* ═══ DARK MODE navbar — vivid aurora ═══ */
        .mnav-wrap.dark-mode nav {
          background: rgba(8, 6, 18, 0.88) !important;
          border-bottom: 1px solid transparent !important;
          border-image: linear-gradient(90deg,
            transparent 0%,
            rgba(139,92,246,0.5) 25%,
            rgba(99,102,241,0.6) 50%,
            rgba(236,72,153,0.4) 75%,
            transparent 100%
          ) 1 !important;
          box-shadow:
            0 1px 0 rgba(139,92,246,0.15),
            0 4px 30px rgba(99,102,241,0.12),
            0 0 60px rgba(139,92,246,0.06) !important;
          backdrop-filter: blur(24px) !important;
        }

        /* Animated aurora background strip in dark mode */
        .mnav-aurora {
          display: none;
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          border-radius: inherit;
        }
        .dark-mode .mnav-aurora { display: block; }
        .mnav-aurora::before {
          content: '';
          position: absolute;
          top: -60px; left: -20%;
          width: 140%;
          height: 120px;
          background: radial-gradient(ellipse 60% 50% at 30% 50%,
            rgba(139,92,246,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 50% 50% at 70% 50%,
            rgba(236,72,153,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 50% 50%,
            rgba(99,102,241,0.1) 0%, transparent 70%);
          animation: aurora-drift 8s ease-in-out infinite alternate;
        }
        @keyframes aurora-drift {
          0%   { transform: translateX(-5%) scaleX(1); opacity: 0.8; }
          100% { transform: translateX(5%)  scaleX(1.05); opacity: 1; }
        }

        /* Brand */
        .mnav-brandname {
          font-size: 18px; font-weight: 700; letter-spacing: -0.02em;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .dark-mode .mnav-brandname {
          background: linear-gradient(135deg, #a78bfa 0%, #f472b6 60%, #fb923c 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        /* ── Search light ── */
        .mnav-search [data-slot="input-wrapper"] {
          background: #f4f4f8 !important;
          border: 1.5px solid transparent !important;
          border-radius: 12px !important;
          transition: all 0.25s !important;
        }
        .mnav-search [data-slot="input-wrapper"]:focus-within {
          border-color: rgba(99,102,241,0.4) !important;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1) !important;
          background: #fff !important;
        }
        .mnav-search input::placeholder { color: #b0b0c0 !important; }
        .mnav-search input { font-size: 13.5px !important; color: #1e1e2e !important; }

        /* ── Search dark ── */
        .dark-mode .mnav-search [data-slot="input-wrapper"] {
          background: rgba(139,92,246,0.07) !important;
          border-color: rgba(139,92,246,0.2) !important;
        }
        .dark-mode .mnav-search [data-slot="input-wrapper"]:focus-within {
          background: rgba(139,92,246,0.12) !important;
          border-color: rgba(139,92,246,0.55) !important;
          box-shadow: 0 0 0 3px rgba(139,92,246,0.15), 0 0 20px rgba(139,92,246,0.1) !important;
        }
        .dark-mode .mnav-search input { color: #e9d5ff !important; }
        .dark-mode .mnav-search input::placeholder { color: rgba(167,139,250,0.4) !important; }
        .dark-mode .mnav-search [data-slot="start-content"] { color: rgba(167,139,250,0.6) !important; }

        /* ── Icon btn light ── */
        .mnav-icon-btn {
          width: 40px; height: 40px;
          border-radius: 12px;
          border: 1.5px solid #ebebf0;
          background: #fafafa;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #6b7280;
          transition: all 0.2s; flex-shrink: 0;
        }
        .mnav-icon-btn:hover {
          background: #f0f0ff; border-color: rgba(99,102,241,0.3); color: #6366f1;
          box-shadow: 0 2px 8px rgba(99,102,241,0.12); transform: translateY(-1px);
        }
        .mnav-icon-btn:active { transform: translateY(0); }

        /* ── Icon btn dark ── */
        .dark-mode .mnav-icon-btn {
          background: rgba(139,92,246,0.08);
          border-color: rgba(139,92,246,0.2);
          color: rgba(167,139,250,0.7);
        }
        .dark-mode .mnav-icon-btn:hover {
          background: rgba(139,92,246,0.18);
          border-color: rgba(167,139,250,0.5);
          color: #c4b5fd;
          box-shadow: 0 4px 16px rgba(139,92,246,0.25), 0 0 0 1px rgba(139,92,246,0.15);
          transform: translateY(-2px);
        }

        /* Notification icon glow in dark */
        .dark-mode .mnav-notif-btn:hover {
          background: rgba(251,146,60,0.12) !important;
          border-color: rgba(251,146,60,0.4) !important;
          color: #fb923c !important;
          box-shadow: 0 4px 16px rgba(251,146,60,0.2), 0 0 0 1px rgba(251,146,60,0.1) !important;
        }
        .dark-mode .mnav-msg-btn:hover {
          background: rgba(52,211,153,0.1) !important;
          border-color: rgba(52,211,153,0.35) !important;
          color: #34d399 !important;
          box-shadow: 0 4px 16px rgba(52,211,153,0.18), 0 0 0 1px rgba(52,211,153,0.1) !important;
        }

        /* ── Theme toggle light ── */
        .mnav-theme-btn {
          width: 40px; height: 40px;
          border-radius: 12px;
          border: 1.5px solid #ebebf0;
          background: #fafafa;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #6b7280;
          transition: all 0.25s; flex-shrink: 0;
          position: relative; overflow: hidden;
        }
        .mnav-theme-btn:hover {
          background: #fff9e6; border-color: rgba(234,179,8,0.4); color: #ca8a04;
          box-shadow: 0 2px 8px rgba(234,179,8,0.15); transform: translateY(-1px);
        }

        /* ── Theme toggle dark ── */
        .dark-mode .mnav-theme-btn {
          background: linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.1));
          border-color: rgba(167,139,250,0.3);
          color: #c4b5fd;
        }
        .dark-mode .mnav-theme-btn:hover {
          background: linear-gradient(135deg, rgba(139,92,246,0.28), rgba(236,72,153,0.2));
          border-color: rgba(196,181,253,0.5);
          color: #f0abfc;
          box-shadow: 0 4px 20px rgba(139,92,246,0.3), 0 0 30px rgba(236,72,153,0.1);
          transform: translateY(-2px);
        }

        /* Sun/Moon icon animation */
        .mnav-theme-icon {
          position: absolute;
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s;
        }
        .mnav-theme-icon.sun  { transform: rotate(0deg) scale(1); opacity: 1; }
        .mnav-theme-icon.moon { transform: rotate(90deg) scale(0.4); opacity: 0; }
        .dark-mode .mnav-theme-icon.sun  { transform: rotate(-90deg) scale(0.4); opacity: 0; }
        .dark-mode .mnav-theme-icon.moon { transform: rotate(0deg) scale(1); opacity: 1; }

        /* ── Avatar pill light ── */
        .mnav-avatar-trigger {
          display: flex; align-items: center; gap: 6px;
          padding: 5px 10px 5px 5px;
          border-radius: 40px;
          border: 1.5px solid #ebebf0;
          background: #fafafa;
          cursor: pointer; transition: all 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .mnav-avatar-trigger:hover {
          border-color: rgba(99,102,241,0.35);
          background: #f5f5ff;
          box-shadow: 0 2px 10px rgba(99,102,241,0.1);
        }

        /* ── Avatar pill dark ── */
        .dark-mode .mnav-avatar-trigger {
          background: linear-gradient(135deg, rgba(139,92,246,0.1), rgba(236,72,153,0.06));
          border-color: rgba(139,92,246,0.25);
        }
        .dark-mode .mnav-avatar-trigger:hover {
          background: linear-gradient(135deg, rgba(139,92,246,0.2), rgba(236,72,153,0.12));
          border-color: rgba(196,181,253,0.45);
          box-shadow: 0 4px 20px rgba(139,92,246,0.2), 0 0 30px rgba(236,72,153,0.08);
        }

        .mnav-avatar-label {
          font-size: 12.5px; font-weight: 500; color: #6b7280;
          max-width: 120px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          display: none; transition: color 0.3s;
        }
        .dark-mode .mnav-avatar-label {
          background: linear-gradient(90deg, #c4b5fd, #f9a8d4);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        @media (min-width: 640px) { .mnav-avatar-label { display: block; } }
      `}</style>

      <div className={`mnav-wrap ${dark ? "dark-mode" : ""}`}>
        <Navbar isBordered maxWidth="xl" className="py-1" style={{ position: "relative" }}>

          {/* Aurora glow layer (dark only) */}
          <div className="mnav-aurora" />

          {/* Brand */}
          <NavbarBrand className="mr-4 gap-2" style={{ position: "relative", zIndex: 1 }}>
            <img src={nextifylogo} alt="Nextify Logo" className="w-8 h-8 object-contain" />
            <span className="mnav-brandname hidden sm:block">Nextify</span>
          </NavbarBrand>

          {/* Search */}
          <NavbarContent className="flex-1 max-w-md" justify="center" style={{ position: "relative", zIndex: 1 }}>
            <NavbarItem className="w-full">
              <Input
                className="mnav-search w-full"
                classNames={{
                  base: "h-10",
                  mainWrapper: "h-full",
                  input: "text-small",
                  inputWrapper: "h-full font-normal",
                }}
                placeholder="Search anything…"
                size="sm"
                startContent={<FiSearch />}
                type="search"
                radius="lg"
              />
            </NavbarItem>
          </NavbarContent>

          {/* Right */}
          <NavbarContent as="div" className="items-center gap-2" justify="end" style={{ position: "relative", zIndex: 1 }}>

            {/* Theme toggle */}
            <NavbarItem>
              <button
                className="mnav-theme-btn"
                onClick={() => setDark((d) => !d)}
                title={dark ? "Switch to light mode" : "Switch to dark mode"}
              >
                <FiSun className="mnav-theme-icon sun" size={16} />
                <FiMoon className="mnav-theme-icon moon" size={15} />
              </button>
            </NavbarItem>

            {/* Notifications */}
            <NavbarItem>
              <Badge color="danger" content="5" size="sm">
                <button className="mnav-icon-btn mnav-notif-btn">
                  <IoIosNotifications className="text-xl" />
                </button>
              </Badge>
            </NavbarItem>

            {/* Messages */}
            <NavbarItem>
              <Badge color="danger" content="2" size="sm">
                <button className="mnav-icon-btn mnav-msg-btn">
                  <LuMessageCircleMore className="text-xl" />
                </button>
              </Badge>
            </NavbarItem>

            {/* Avatar dropdown */}
            <Dropdown placement="bottom-end">
              <DropdownTrigger className="cursor-pointer">
                <div className="mnav-avatar-trigger">
                  <Avatar
                    isBordered
                    as="span"
                    className="transition-transform"
                    color="secondary"
                    size="sm"
                    src={userData?.user?.photo || userIcon}
                  />
                  <span className="mnav-avatar-label">
                    {userData?.user?.name ? userData.user.name.split(" ")[0] : signedInAs || "User"}
                  </span>
                </div>
              </DropdownTrigger>

              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2" isReadOnly>
                  <p className="font-semibold text-xs text-slate-400">Signed in as</p>
                  <p className="font-semibold text-sm truncate">
                    {userData?.user?.email || "user@example.com"}
                  </p>
                </DropdownItem>
                <DropdownItem key="settings" onClick={() => navigate("/profile")}>
                  My Profile
                </DropdownItem>
                <DropdownItem key="logout" color="danger" onClick={logout}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

          </NavbarContent>
        </Navbar>
      </div>

      {/* Spacer */}
      <div style={{ height: 64 }} />
    </>
  );
}