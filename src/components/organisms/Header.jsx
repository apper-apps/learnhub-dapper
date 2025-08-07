import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "@/App";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const AuthButtons = ({ mobile = false }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const authContext = useContext(AuthContext);
  
  if (isAuthenticated) {
    return (
      <Button 
        variant="ghost" 
        size="sm" 
        className={mobile ? "justify-center" : ""}
        onClick={authContext?.logout}
      >
        <ApperIcon name="LogOut" className="w-4 h-4" />
        로그아웃
      </Button>
    );
  }
  
  return (
    <>
      <Link to="/login">
        <Button variant="ghost" size="sm" className={mobile ? "justify-center w-full" : ""}>
          로그인
        </Button>
      </Link>
      <Link to="/signup">
        <Button variant="primary" size="sm" className={mobile ? "justify-center w-full" : ""}>
          회원가입
        </Button>
      </Link>
    </>
  );
};
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "홈" },
    { path: "/membership", label: "멤버십" },
    { path: "/master", label: "마스터" },
    { path: "/insights", label: "인사이트" },
    { path: "/testimonials", label: "도전 후기" }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
              <ApperIcon name="GraduationCap" className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              LearnHub Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                  isActive(item.path)
                    ? "bg-gradient-to-r from-primary to-secondary text-white"
                    : "text-gray-700 hover:text-primary hover:bg-purple-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

{/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <AuthButtons />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ApperIcon 
              name={isMobileMenuOpen ? "X" : "Menu"} 
              className="h-6 w-6" 
            />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-primary to-secondary text-white"
                      : "text-gray-700 hover:text-primary hover:bg-purple-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
<div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <AuthButtons mobile />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;