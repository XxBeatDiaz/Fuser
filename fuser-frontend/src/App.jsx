// src/App.jsx
import MainLayout from './layout/Layout';
import ConfigRoutes from './router/AppRouter'; 
import { useSocketSensors } from './hooks/useSocketSensors'; 
import { useRoomAutomation } from './hooks/useRoomAutomation';

export const App = () => {
  useSocketSensors();
  useRoomAutomation();

  return (
    <MainLayout>
      <ConfigRoutes />
    </MainLayout>
  );
};

export default App;