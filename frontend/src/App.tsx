import { useState } from "react";
import { MapPin, Calendar, TrendingUp, Leaf, Plus, Bell, Cloud, Navigation } from "lucide-react";
import { TripCard } from "./components/TripCard";
import { InsightCard } from "./components/InsightCard";
import { AddTripForm } from "./components/AddTripForm";
import { NavigationBar } from "./components/NavigationBar";
import { TripInsights } from "./components/TripInsights";
import { PopularRoutes } from "./components/PopularRoutes";
import { GoogleMaps } from "./components/GoogleMaps";
import { Weather } from "./components/Weather";
import { Settings } from "./components/Settings";
import { EditProfile } from "./components/EditProfile";
import { ProfileInformation } from "./components/ProfileInformation";
import { PrivacySecurity } from "./components/PrivacySecurity";
import { NotificationSettings } from "./components/NotificationSettings";
import { LanguageSettings } from "./components/LanguageSettings";
import { HelpFAQ } from "./components/HelpFAQ";
import { AboutApp } from "./components/AboutApp";
import { LandingPage } from "./components/LandingPage";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { ForgotPassword } from "./components/ForgotPassword";
import { SOSButton } from "./components/SOSButton";
import { Card, CardHeader, CardContent, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./components/ui/avatar";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { EmergencyServices } from "./components/EmergencyServices";
import { ChevronRight } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface Trip {
  id: number;
  origin: string;
  destination: string;
  date: string;
  mode: string;
  distance: string;
  carbonFootprint: string;
  status: "completed" | "ongoing" | "planned";
}

function AppContent() {
  const { t } = useLanguage();
  const { actualTheme } = useTheme();
  const [currentView, setCurrentView] = useState<'landing' | 'signin' | 'signup' | 'forgot-password' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState('home');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [settingsPage, setSettingsPage] = useState<string | null>(null);
  const [trips, setTrips] = useState<Trip[]>([
    {
      id: 1,
      origin: "Kochi",
      destination: "Alappuzha",
      date: "15 Dec 2024",
      mode: "boat",
      distance: "53 km",
      carbonFootprint: "4.2 kg",
      status: "completed"
    },
    {
      id: 2,
      origin: "Thiruvananthapuram",
      destination: "Kovalam",
      date: "12 Dec 2024",
      mode: "auto",
      distance: "16 km",
      carbonFootprint: "1.9 kg",
      status: "completed"
    },
    {
      id: 3,
      origin: "Munnar",
      destination: "Thekkady",
      date: "10 Dec 2024",
      mode: "bus",
      distance: "94 km",
      carbonFootprint: "7.5 kg",
      status: "completed"
    },
    {
      id: 4,
      origin: "Kozhikode",
      destination: "Wayanad",
      date: "8 Dec 2024",
      mode: "car",
      distance: "76 km",
      carbonFootprint: "13.7 kg",
      status: "completed"
    }
  ]);

  const [user, setUser] = useState({
    name: "Arjun Nair",
    email: "arjun.nair@email.com",
    avatar: "",
    city: "Kochi",
    phone: "",
    isAuthenticated: false
  });

  const [userLocation, setUserLocation] = useState({
    latitude: 9.9312,
    longitude: 76.2673,
    city: "Kochi"
  });

  const handleAddTrip = (newTrip: Trip) => {
    setTrips(prev => [newTrip, ...prev]);
    setActiveTab('home');
  };

  const handleRouteSelect = (route: any) => {
    // Pre-fill form with route data
    setActiveTab('add');
  };

  const handleGetStarted = () => {
    setCurrentView('signup');
  };

  const handleSignIn = (email: string, password: string) => {
    // In a real app, you'd validate credentials here
    setUser(prev => ({ 
      ...prev, 
      email, 
      isAuthenticated: true,
      name: email.includes('arjun') ? 'Arjun Nair' : 'Kerala Traveler'
    }));
    setCurrentView('app');
  };

  const handleSignUp = (userData: any) => {
    // In a real app, you'd create the account here
    setUser({
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      avatar: "",
      city: userData.city || "",
      phone: "",
      isAuthenticated: true
    });
    setCurrentView('app');
  };

  const handleGoToSignIn = () => {
    setCurrentView('signin');
  };

  const handleGoToSignUp = () => {
    setCurrentView('signup');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
  };

  const handleForgotPassword = () => {
    setCurrentView('forgot-password');
  };

  const handleBackToSignIn = () => {
    setCurrentView('signin');
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleSaveProfile = (updatedUser: any) => {
    setUser(prev => ({
      ...prev,
      ...updatedUser
    }));
    setIsEditingProfile(false);
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
  };

  const handleSignOut = () => {
    setUser(prev => ({ ...prev, isAuthenticated: false }));
    setCurrentView('landing');
    setActiveTab('home');
    setIsEditingProfile(false);
    setSettingsPage(null);
  };

  const handleSettingsNavigation = (page: string) => {
    setSettingsPage(page);
  };

  const handleBackToSettings = () => {
    setSettingsPage(null);
    setIsEditingProfile(false);
  };

  const totalDistance = trips.reduce((sum, trip) => sum + parseFloat(trip.distance.replace(' km', '')), 0);
  const totalCarbon = trips.reduce((sum, trip) => sum + parseFloat(trip.carbonFootprint.replace(' kg', '')), 0);
  const thisMonthTrips = trips.filter(trip => {
    const tripDate = new Date(trip.date);
    const now = new Date();
    return tripDate.getMonth() === now.getMonth() && tripDate.getFullYear() === now.getFullYear();
  }).length;

  const carbonSaved = (totalCarbon * 0.3).toFixed(1); // Assuming 30% savings from eco-friendly choices

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6 pb-20">
            {/* Header with User Info */}
            <div className={`flex items-center justify-between p-4 ${
              actualTheme === 'dark' 
                ? 'bg-gradient-to-r from-gray-800/50 to-slate-800/50 backdrop-blur-sm' 
                : 'bg-gradient-to-r from-green-50/80 to-blue-50/80 backdrop-blur-sm'
            } m-4 rounded-2xl border ${
              actualTheme === 'dark' ? 'border-gray-700/50' : 'border-white/50'
            }`}>
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 ring-2 ring-green-500/30">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className={`${
                    actualTheme === 'dark' 
                      ? 'bg-green-900/50 text-green-300' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className={`font-semibold ${
                    actualTheme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {t.welcomeBack}, {user.name.split(' ')[0]}! 👋
                  </h2>
                  <p className={`text-sm ${
                    actualTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {t.trackYourJourney}
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="icon"
                className={`${
                  actualTheme === 'dark' 
                    ? 'border-gray-600 hover:bg-gray-700 text-gray-300' 
                    : 'border-gray-300 hover:bg-gray-50'
                } rounded-full transition-all duration-200`}
              >
                <Bell className="w-5 h-5" />
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 px-4">
              <div className={`p-4 rounded-2xl ${
                actualTheme === 'dark' 
                  ? 'bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-800/30' 
                  : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    actualTheme === 'dark' ? 'bg-blue-800/50' : 'bg-blue-100'
                  }`}>
                    <MapPin className={`w-5 h-5 ${
                      actualTheme === 'dark' ? 'text-blue-300' : 'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <p className={`text-2xl font-bold ${
                      actualTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {thisMonthTrips}
                    </p>
                    <p className={`text-sm ${
                      actualTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {t.tripsThisMonth}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-500 font-medium">+23%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-2xl ${
                actualTheme === 'dark' 
                  ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-800/30' 
                  : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    actualTheme === 'dark' ? 'bg-green-800/50' : 'bg-green-100'
                  }`}>
                    <Leaf className={`w-5 h-5 ${
                      actualTheme === 'dark' ? 'text-green-300' : 'text-green-600'
                    }`} />
                  </div>
                  <div>
                    <p className={`text-2xl font-bold ${
                      actualTheme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {carbonSaved} kg
                    </p>
                    <p className={`text-sm ${
                      actualTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {t.carbonSaved}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-500 font-medium">+15%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <Card className={`mx-4 ${
              actualTheme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700/50 backdrop-blur-sm' 
                : 'bg-white/80 border-white/50 backdrop-blur-sm'
            }`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${
                  actualTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  <span>{t.quickActions}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Button 
                    onClick={() => setActiveTab('add')}
                    className={`h-16 flex flex-col gap-1 rounded-xl transition-all duration-200 ${
                      actualTheme === 'dark'
                        ? 'bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 shadow-lg shadow-green-900/30'
                        : 'bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 shadow-lg shadow-green-600/30'
                    }`}
                  >
                    <Plus className="w-5 h-5" />
                    <span className="text-sm">{t.addTrip}</span>
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setActiveTab('insights')}
                    className={`h-16 flex flex-col gap-1 rounded-xl transition-all duration-200 ${
                      actualTheme === 'dark'
                        ? 'border-gray-600 hover:bg-gray-700/50 text-gray-300 hover:text-white'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-sm">{t.viewInsights}</span>
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline"
                    onClick={() => setActiveTab('maps')}
                    className={`h-14 flex flex-col gap-1 rounded-xl transition-all duration-200 ${
                      actualTheme === 'dark'
                        ? 'border-gray-600 hover:bg-gray-700/50 text-gray-300 hover:text-white'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Navigation className="w-4 h-4" />
                    <span className="text-xs">Maps</span>
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setActiveTab('weather')}
                    className={`h-14 flex flex-col gap-1 rounded-xl transition-all duration-200 ${
                      actualTheme === 'dark'
                        ? 'border-gray-600 hover:bg-gray-700/50 text-gray-300 hover:text-white'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Cloud className="w-4 h-4" />
                    <span className="text-xs">Weather</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Trips */}
            <div className="px-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${
                  actualTheme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {t.recentTrips}
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={actualTheme === 'dark' ? 'text-gray-400 hover:text-white' : ''}
                >
                  {t.viewAll}
                </Button>
              </div>
              <div className="space-y-3">
                {trips.slice(0, 3).map((trip) => (
                  <TripCard key={trip.id} {...trip} />
                ))}
              </div>
            </div>

            {/* Kerala Travel Tip */}
            <Card className={`mx-4 ${
              actualTheme === 'dark'
                ? 'border-orange-800/50 bg-gradient-to-br from-orange-900/20 to-amber-900/20 backdrop-blur-sm'
                : 'border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50'
            }`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${
                  actualTheme === 'dark' ? 'text-orange-300' : 'text-orange-800'
                }`}>
                  <span>🌴</span>
                  {t.keralaTravelTip}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-sm ${
                  actualTheme === 'dark' ? 'text-orange-200' : 'text-orange-700'
                }`}>
                  {t.travelTipText}
                </p>
              </CardContent>
            </Card>
          </div>
        );

      case 'insights':
        return <TripInsights trips={trips} />;

      case 'add':
        return (
          <div className="flex items-center justify-center min-h-[calc(100vh-120px)] p-4">
            <AddTripForm onAddTrip={handleAddTrip} onClose={() => setActiveTab('home')} />
          </div>
        );

      case 'routes':
        return <PopularRoutes onSelectRoute={handleRouteSelect} />;

      case 'maps':
        return <GoogleMaps trips={trips} />;

      case 'weather':
        return <Weather />;

      case 'settings':
        if (isEditingProfile) {
          return (
            <EditProfile
              user={user}
              onSave={handleSaveProfile}
              onCancel={handleCancelEdit}
            />
          );
        }
        
        if (settingsPage) {
          switch (settingsPage) {
            case 'profile-info':
              return (
                <ProfileInformation
                  user={user}
                  onBack={handleBackToSettings}
                  onEdit={handleEditProfile}
                  onUpdateUser={setUser}
                />
              );
            case 'privacy-security':
              return (
                <PrivacySecurity
                  onBack={handleBackToSettings}
                  onNavigate={handleSettingsNavigation}
                />
              );
            case 'notifications':
              return (
                <NotificationSettings
                  onBack={handleBackToSettings}
                />
              );
            case 'language':
              return (
                <LanguageSettings
                  onBack={handleBackToSettings}
                />
              );
            case 'help-faq':
              return (
                <HelpFAQ
                  onBack={handleBackToSettings}
                />
              );
            case 'about-app':
              return (
                <AboutApp
                  onBack={handleBackToSettings}
                />
              );
            case 'emergency-services':
              return (
                <div className="space-y-6 pb-20">
                  <div className="flex items-center gap-4 p-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleBackToSettings}
                      className={`rounded-full ${
                        actualTheme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <ChevronRight className={`w-5 h-5 rotate-180 ${
                        actualTheme === 'dark' ? 'text-white' : 'text-gray-700'
                      }`} />
                    </Button>
                    <div className="flex-1">
                      <h1 className={`text-xl font-semibold ${
                        actualTheme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        Emergency Services
                      </h1>
                      <p className={`text-sm ${
                        actualTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Kerala emergency services and SOS
                      </p>
                    </div>
                  </div>
                  <EmergencyServices 
                    userLocation={userLocation}
                  />
                </div>
              );
            default:
              return (
                <Settings
                  user={user}
                  onEditProfile={handleEditProfile}
                  onSignOut={handleSignOut}
                  onNavigate={handleSettingsNavigation}
                />
              );
          }
        }
        
        return (
          <Settings
            user={user}
            onEditProfile={handleEditProfile}
            onSignOut={handleSignOut}
            onNavigate={handleSettingsNavigation}
          />
        );

      default:
        return null;
    }
  };

  // Handle different views
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-md mx-auto bg-white min-h-screen relative">
          <LandingPage 
            onGetStarted={handleGetStarted} 
            onSignIn={handleGoToSignIn}
            onSignUp={handleGoToSignUp}
            onForgotPassword={handleForgotPassword}
          />
        </div>
      </div>
    );
  }

  if (currentView === 'signin') {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-md mx-auto bg-white min-h-screen relative">
          <SignIn 
            onSignIn={handleSignIn}
            onGoToSignUp={handleGoToSignUp}
            onBackToLanding={handleBackToLanding}
            onForgotPassword={handleForgotPassword}
          />
        </div>
      </div>
    );
  }

  if (currentView === 'signup') {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-md mx-auto bg-white min-h-screen relative">
          <SignUp 
            onSignUp={handleSignUp}
            onGoToSignIn={handleGoToSignIn}
            onBackToLanding={handleBackToLanding}
          />
        </div>
      </div>
    );
  }

  if (currentView === 'forgot-password') {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-md mx-auto bg-white min-h-screen relative">
          <ForgotPassword 
            onBackToSignIn={handleBackToSignIn}
          />
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen bg-background transition-all duration-300 ${
        actualTheme === 'dark' 
          ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
          : 'bg-cover bg-center bg-fixed'
      }`}
      style={actualTheme === 'light' ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1704365159747-1f7b8913044f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHN8YWNod2F0ZXJzJTIwdG91cmlzbSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTg3ODc1OTN8MA&ixlib=rb-4.1.0&q=80&w=1080')`
      } : {}}
    >
      <div className={`max-w-md mx-auto min-h-screen relative transition-all duration-300 ${
        actualTheme === 'dark' 
          ? 'bg-gray-900/95 backdrop-blur-sm border-x border-gray-800' 
          : 'bg-white/95 backdrop-blur-sm'
      }`}>
        {renderContent()}
        <NavigationBar activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* SOS Button - Always available when authenticated */}
        <SOSButton 
          isVisible={user.isAuthenticated} 
          userLocation={userLocation}
          onEmergencyCall={() => {
            toast.success("Emergency services contacted!");
          }}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}