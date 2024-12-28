import React from 'react';

interface Camera {
  id: string;
  label: string;
}

interface CameraSelectorProps {
  cameras: Camera[];
  currentCameraId: string;
  onCameraChange: (cameraId: string) => void;
  disabled: boolean;
}

const CameraSelector: React.FC<CameraSelectorProps> = ({
  cameras,
  currentCameraId,
  onCameraChange,
  disabled
}) => {
  if (cameras.length === 0) return null;

  return (
    <div className="flex justify-center">
      {/* <label className="text-sm text-gray-600">Camera:</label> */}
      <select
        value={currentCameraId}
        onChange={(e) => onCameraChange(e.target.value)}
        disabled={disabled}
        className={`px-4 py-2 rounded-lg border ${
          disabled
            ? 'bg-gray-100 text-gray-500'
            : 'bg-white border-gray-300 hover:border-gray-400'
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        {cameras.map((camera) => (
          <option key={camera.id} value={camera.id}>
            {camera.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CameraSelector;