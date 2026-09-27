"use client";
import { useEffect, useRef } from "react";
import QRCode from "qrcode";

export default function PetQR({ url }: { url: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, { width: 200 });
    }
  }, [url]);

  return <canvas ref={canvasRef} />;
}