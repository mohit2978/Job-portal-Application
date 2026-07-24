import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "@/store/user/userAuth"
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  User,
  Building2,
  Settings,
  LogOut,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Navbar({ onMenuClick }) {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  // Derive initials from fullName
  const getInitials = (fullName) => {
    if (!fullName) return "E"
    const parts = fullName.trim().split(" ")
    if (parts.length === 1) return parts[0][0].toUpperCase()
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
  }
  const initials = getInitials(user?.fullName)

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-4 border-b border-slate-200 bg-white px-4 lg:px-6">
      {/* Mobile hamburger */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden text-slate-600"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Search bar */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="search"
            placeholder="Search jobs, candidates, applications..."
            className="pl-9 bg-slate-50 border-slate-200 text-sm focus-visible:ring-slate-300"
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2 ml-auto">

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-slate-600 hover:text-slate-900">
              <Bell className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel className="flex items-center justify-between py-3">
              <span className="font-semibold">Notifications</span>
              <span className="text-xs font-normal text-slate-400">0 unread</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col items-center justify-center py-10 text-center text-slate-400">
              <Bell className="h-8 w-8 mb-2 text-slate-300" />
              <p className="text-sm font-medium">No notifications yet</p>
              <p className="text-xs mt-0.5">You're all caught up!</p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2 hover:bg-slate-100">
              <Avatar className="h-8 w-8">
                {user?.profileImage && <AvatarImage src={user.profileImage} alt={user.fullName} />}
                <AvatarFallback className="bg-gradient-to-br bg-brand text-white text-xs font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-slate-900 leading-tight">
                  {user?.fullName || "Employer"}
                </p>
                <p className="text-[11px] text-slate-500">Employer</p>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400 hidden md:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div>
                <p className="font-semibold text-slate-900">{user?.fullName || "Employer"}</p>
                <p className="text-xs text-slate-500 font-normal mt-0.5">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/employer/company")}>
              <Building2 className="mr-2 h-4 w-4" />
              Company Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/employer/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 focus:text-red-600 focus:bg-red-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  )
}
