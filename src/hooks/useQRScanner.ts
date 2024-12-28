import { useState, useEffect, useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface Camera {
  id: string;
  label: string;
}

interface UseQRScannerProps {
  onResult: (result: string) => void;
}

export const useQRScanner = ({ onResult }: UseQRScannerProps) => {
  const [scanner, setScanner] = useState<Html5Qrcode | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [currentCameraId, setCurrentCameraId] = useState<string>('');
  const [cameras, setCameras] = useState<Camera[]>([]);

  useEffect(() => {
    const initScanner = async () => {
      const newScanner = new Html5Qrcode('qr-reader');
      setScanner(newScanner);

      try {
        const devices = await Html5Qrcode.getCameras();
        const formattedCameras = devices.map(device => ({
          id: device.id,
          label: device.label || `Camera ${device.id}`
        }));
        setCameras(formattedCameras);
        if (formattedCameras.length > 0) {
          setCurrentCameraId(formattedCameras[0].id);
        }
      } catch (err) {
        console.error('Error getting cameras:', err);
      }
    };

    initScanner();

    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, []);

  const startScanning = useCallback(async () => {
    if (!scanner || !currentCameraId) return;

    try {
      await scanner.start(
        currentCameraId,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          onResult(decodedText);
        },
        () => {}
      );
      setIsScanning(true);
    } catch (err) {
      console.error('Error starting scanner:', err);
    }
  }, [scanner, currentCameraId, onResult]);

  const stopScanning = useCallback(async () => {
    if (!scanner) return;

    try {
      await scanner.stop();
      setIsScanning(false);
    } catch (err) {
      console.error('Error stopping scanner:', err);
    }
  }, [scanner]);

  const selectCamera = useCallback(async (cameraId: string) => {
    if (isScanning) {
      await stopScanning();
    }
    setCurrentCameraId(cameraId);
  }, [isScanning, stopScanning]);

  return {
    isScanning,
    startScanning,
    stopScanning,
    cameras,
    currentCameraId,
    selectCamera
  };
};