// DeviceButton.jsx
export const DeviceButton = () => {
  const handleClick = () => {
    fetch("http://localhost:5000/api/devices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deviceName: "Blob ultraviolet right",
        state: "TOGGLE",
      }),
    });
    fetch("http://localhost:5000/api/devices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deviceName: "Blob ultraviolet left",
        state: "TOGGLE",
      }),
    });
  };

  return <button onClick={handleClick}>שינוי מצב תאורת אולטרה סגול</button>;
};
