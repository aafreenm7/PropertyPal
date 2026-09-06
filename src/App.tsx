import React from 'react';
import { HomeOSProvider, useHomeOS } from './context/HomeOSContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';
import { DashboardView } from './components/dashboard/DashboardView';
import { DigitalHomeTwinView } from './components/twin/DigitalHomeTwinView';
import { DocumentsView } from './components/documents/DocumentsView';
import { AppliancesView } from './components/appliances/AppliancesView';
import { MaintenanceView } from './components/maintenance/MaintenanceView';
import { ExpensesView } from './components/expenses/ExpensesView';
import { InsuranceView } from './components/insurance/InsuranceView';
import { CalendarView } from './components/calendar/CalendarView';
import { FamilyView } from './components/family/FamilyView';
import { AIAssistantView } from './components/assistant/AIAssistantView';
import { GovernmentIntegrationView } from './components/future/GovernmentIntegrationView';
import { SettingsView } from './components/settings/SettingsView';

import { DocumentUploadModal } from './components/documents/DocumentUploadModal';
import { ConflictModal } from './components/documents/ConflictModal';
import { EmergencyModeModal } from './components/emergency/EmergencyModeModal';
import { HomeHealthDetailModal } from './components/health/HomeHealthDetailModal';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { JudgeDemoTour } from './components/demo/JudgeDemoTour';

const AppContent: React.FC = () => {
  const { activeTab, activeNotification } = useHomeOS();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'twin':
        return <DigitalHomeTwinView />;
      case 'documents':
        return <DocumentsView />;
      case 'appliances':
        return <AppliancesView />;
      case 'maintenance':
        return <MaintenanceView />;
      case 'expenses':
        return <ExpensesView />;
      case 'insurance':
        return <InsuranceView />;
      case 'calendar':
        return <CalendarView />;
      case 'family':
        return <FamilyView />;
      case 'assistant':
        return <AIAssistantView />;
      case 'future_gov':
        return <GovernmentIntegrationView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="app-container">
      {/* Desktop Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="main-content">
        <Header />

        <main className="content-body">
          {renderActiveView()}
        </main>
      </div>

      {/* Floating Notification Toast */}
      {activeNotification && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#111827',
          color: '#FFFFFF',
          padding: '12px 24px',
          borderRadius: 'var(--radius-full)',
          boxShadow: 'var(--shadow-xl)',
          zIndex: 110,
          fontSize: '13px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          {activeNotification}
        </div>
      )}

      {/* Modals & Tour Stepper */}
      <DocumentUploadModal />
      <ConflictModal />
      <EmergencyModeModal />
      <HomeHealthDetailModal />
      <OnboardingModal />
      <JudgeDemoTour />

      {/* Mobile Bottom Navigation (Visible on screen < 1024px) */}
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <HomeOSProvider>
      <AppContent />
    </HomeOSProvider>
  );
};

export default App;
