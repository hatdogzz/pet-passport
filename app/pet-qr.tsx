"use client";
import { useEffect, useRef } from "react";
import QRCode from "qrcode";

export default function PetQR({ petId }: { petId: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const url = `${window.location.origin}/pet/${petId}`;
      QRCode.toCanvas(canvasRef.current, url, { width: 200 });
    }
  }, [petId]);

  return <canvas ref={canvasRef} />;
}