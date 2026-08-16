import { Route, Routes } from "react-router";

import ProgressPage from "../pages/ProgressPage";
import SensorsPage from "../pages/SensorsPage";
import DevicesPage from "../pages/DevicesPage";
import CameraPage from "../pages/cameraPage";
import NotFoundPage from "../pages/NotFoundPage";

export const ConfigRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProgressPage />} />
      <Route path="/sensors" element={<SensorsPage />} />
      <Route path="/devices" element={<DevicesPage />} />
      <Route path="/camera" element={<CameraPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default ConfigRoutes;
