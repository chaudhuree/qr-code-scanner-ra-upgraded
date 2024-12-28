import React, { useState } from "react";
import { LuCamera, LuCameraOff, LuTrash2 } from "react-icons/lu";
import { useQRScanner } from "../hooks/useQRScanner";
import CameraSelector from "./CameraSelector";
import ScanResult from "./ScanResult";

const QRScanner: React.FC = () => {
  const [scanResult, setScanResult] = useState<string>("");
  const {
    isScanning,
    startScanning,
    stopScanning,
    cameras,
    currentCameraId,
    selectCamera,
  } = useQRScanner({
    onResult: (result) => {
      setScanResult(result);
    },
  });

  const clearResult = () => {
    setScanResult("");
  };

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800">QR Code Scanner</h1>

      <div className="flex flex-col space-y-4 w-full">
        <div className="flex justify-center space-x-4">
          <button
            onClick={startScanning}
            disabled={isScanning}
            className={`flex items-center px-4 py-2 rounded-lg ${
              isScanning
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white transition-colors`}
          >
            <LuCamera className="w-5 h-5 mr-2" />
            Start Scanning
          </button>

          <button
            onClick={stopScanning}
            disabled={!isScanning}
            className={`flex items-center px-4 py-2 rounded-lg ${
              !isScanning
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            } text-white transition-colors`}
          >
            <LuCameraOff className="w-5 h-5 mr-2" />
            Stop Scanning
          </button>
        </div>

        <div className="flex justify-center">
          <CameraSelector
            cameras={cameras}
            currentCameraId={currentCameraId}
            onCameraChange={selectCamera}
            disabled={isScanning}
          />
        </div>

        <div
          id="qr-reader"
          className="w-full max-w-md bg-gray-100 rounded-lg overflow-hidden"
        ></div>

        {scanResult && (
          <div className="flex justify-end">
            <button
              onClick={clearResult}
              className="flex items-center px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white transition-colors"
            >
              <LuTrash2 className="w-5 h-5 mr-2" />
              Clear Result
            </button>
          </div>
        )}

        <ScanResult result={scanResult} />
      </div>
    </div>
  );
};

export default QRScanner;
