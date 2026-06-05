import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, RefreshCw } from 'lucide-react';

export default function VirtualTryOnModal({ isOpen, onClose, product }) {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [loadingModel, setLoadingModel] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [overlayImg, setOverlayImg] = useState(null);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Phase 1: Load MediaPipe scripts from Google CDNs dynamically when modal opens
  useEffect(() => {
    if (!isOpen) return;
    
    let isMounted = true;
    
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        // Check if script is already present
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
          if (existingScript.dataset.loaded === 'true') {
            resolve();
            return;
          }
          existingScript.addEventListener('load', () => resolve());
          existingScript.addEventListener('error', (e) => reject(e));
          return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.crossOrigin = 'anonymous';
        script.onload = () => {
          script.dataset.loaded = 'true';
          resolve();
        };
        script.onerror = (e) => reject(e);
        document.head.appendChild(script);
      });
    };

    const initScripts = async () => {
      try {
        if (!window.Camera) {
          await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js');
        }
        if (!window.FaceMesh) {
          await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js');
        }
        if (isMounted) {
          setScriptsLoaded(true);
        }
      } catch (err) {
        console.error("Failed to load MediaPipe dependencies:", err);
        if (isMounted) {
          setErrorMsg("Could not load camera modules. Please check your connection.");
          setLoadingModel(false);
        }
      }
    };

    initScripts();

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  // Phase 2: Pre-load the product's image onto an HTMLImageElement for canvas drawing
  useEffect(() => {
    if (!product || !isOpen) return;

    setOverlayImg(null);
    const img = new Image();
    img.src = product.image;
    img.onload = () => {
      setOverlayImg(img);
    };
    img.onerror = () => {
      console.error("Failed to load overlay image:", product.image);
      setErrorMsg("Failed to load product preview image.");
    };
  }, [product, isOpen]);

  // Phase 3: Setup webcam, media streams, and FaceMesh model
  useEffect(() => {
    if (!isOpen || !scriptsLoaded || !overlayImg || !videoRef.current || !canvasRef.current) return;

    let active = true;
    let cameraInstance = null;
    let faceMeshInstance = null;

    const setupTryOn = async () => {
      try {
        setLoadingModel(true);
        setErrorMsg('');

        // 1. Initialize FaceMesh
        faceMeshInstance = new window.FaceMesh({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
        });

        faceMeshInstance.setOptions({
          maxNumFaces: 1,
          refineLandmarks: true,
          minDetectionConfidence: 0.6,
          minTrackingConfidence: 0.6
        });

        faceMeshInstance.onResults((results) => {
          if (!active || !canvasRef.current) return;
          setLoadingModel(false);

          const canvas = canvasRef.current;
          const canvasCtx = canvas.getContext('2d');
          const w = canvas.width;
          const h = canvas.height;

          canvasCtx.save();
          canvasCtx.clearRect(0, 0, w, h);

          // Mirror the canvas context to make it look natural to the user
          canvasCtx.translate(w, 0);
          canvasCtx.scale(-1, 1);

          // Draw webcam video frame
          canvasCtx.drawImage(results.image, 0, 0, w, h);

          // Draw Overlay if face is detected
          if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
            const landmarks = results.multiFaceLandmarks[0];

            // Determine overlay placement based on product details
            const titleLower = (product.title || "").toLowerCase();
            const isEarring = titleLower.includes('earring') || 
                              titleLower.includes('jhumka') || 
                              titleLower.includes('stud') || 
                              titleLower.includes('dangler') ||
                              titleLower.includes('combo'); // earrings or combos

            // Earlobe bounding landmarks for distance scale
            const leftEarBoundary = landmarks[234];
            const rightEarBoundary = landmarks[454];
            const faceWidth = Math.hypot(rightEarBoundary.x - leftEarBoundary.x, rightEarBoundary.y - leftEarBoundary.y) * w;

            if (isEarring) {
              // Earrings: Draw on Left Earlobe (Landmark 177) and Right Earlobe (Landmark 401)
              const lEarlobe = landmarks[177];
              const rEarlobe = landmarks[401];

              const earringSize = faceWidth * 0.22; // Scale size relative to face width
              const aspect = overlayImg.height / overlayImg.width;
              const earringHeight = earringSize * aspect;

              // Draw both earrings, centered horizontally and hanging down vertically
              canvasCtx.drawImage(overlayImg, lEarlobe.x * w - earringSize / 2, lEarlobe.y * h, earringSize, earringHeight);
              canvasCtx.drawImage(overlayImg, rEarlobe.x * w - earringSize / 2, rEarlobe.y * h, earringSize, earringHeight);
            } else {
              // Necklace / Chain: Extrapolate coordinates below Chin (Landmark 152)
              const chin = landmarks[152];
              const nose = landmarks[1];

              // Calculate directional vector from nose to chin to project neck center
              const dx = chin.x - nose.x;
              const dy = chin.y - nose.y;

              const neckX = (chin.x + dx * 0.38) * w;
              const neckY = (chin.y + dy * 0.42) * h;

              const necklaceWidth = faceWidth * 1.3;
              const aspect = overlayImg.height / overlayImg.width;
              const necklaceHeight = necklaceWidth * aspect;

              // Center the necklace on the neck line
              canvasCtx.drawImage(
                overlayImg,
                neckX - necklaceWidth / 2,
                neckY - necklaceHeight * 0.15,
                necklaceWidth,
                necklaceHeight
              );
            }
          }

          canvasCtx.restore();
        });

        // 2. Initialize Camera Utility
        cameraInstance = new window.Camera(videoRef.current, {
          onFrame: async () => {
            if (active && videoRef.current && faceMeshInstance) {
              await faceMeshInstance.send({ image: videoRef.current });
            }
          },
          width: 640,
          height: 480
        });

        await cameraInstance.start();
        console.log("Virtual Try-On camera active.");
      } catch (err) {
        console.error("Try-on camera execution error:", err);
        if (active) {
          setErrorMsg("Could not access camera. Please allow camera permissions.");
          setLoadingModel(false);
        }
      }
    };

    setupTryOn();

    // Cleanup logic: Runs when modal closes or properties change
    return () => {
      active = false;
      console.log("Shutting down Virtual Try-On camera feed...");

      // Stop camera wrapper
      if (cameraInstance) {
        try {
          cameraInstance.stop();
        } catch (e) {
          console.warn("Failed to stop camera instance:", e);
        }
      }

      // Stop video stream directly to turn off the hardware camera light immediately
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }

      // Close FaceMesh instance to free WASM memory
      if (faceMeshInstance) {
        try {
          faceMeshInstance.close();
        } catch (e) {
          console.warn("Failed to close FaceMesh instance:", e);
        }
      }
    };
  }, [isOpen, scriptsLoaded, overlayImg, product]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="bg-cream border border-gold/25 w-full max-w-2xl overflow-hidden shadow-2xl relative"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gold/15">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-gold font-semibold block mb-1">
                  AI Virtual Try-On
                </span>
                <h3 className="font-serif text-lg text-dark-grey font-normal tracking-wide">
                  Try On: {product?.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 border border-gold/15 hover:border-gold hover:bg-gold hover:text-charcoal transition-all duration-300"
                aria-label="Close Try On"
              >
                <X size={16} />
              </button>
            </div>

            {/* Try On View Area */}
            <div className="relative aspect-video w-full bg-charcoal flex items-center justify-center">
              {/* Hidden Video Feed for MediaPipe input */}
              <video
                ref={videoRef}
                playsInline
                muted
                className="hidden"
                width="640"
                height="480"
              />

              {/* Render Canvas for mirror and overlay output */}
              <canvas
                ref={canvasRef}
                className="w-full h-full object-cover"
                width="640"
                height="480"
              />

              {/* Loading States */}
              {loadingModel && !errorMsg && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-charcoal/90 text-cream gap-4">
                  <RefreshCw className="animate-spin text-gold" size={24} />
                  <p className="text-xs uppercase tracking-widest text-cream/70 font-light">
                    Configuring camera &amp; AI mesh...
                  </p>
                </div>
              )}

              {/* Errors State */}
              {errorMsg && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-charcoal/95 text-center p-6 gap-4">
                  <Camera className="text-red-500 mb-2" size={32} />
                  <p className="text-sm font-serif text-cream max-w-md">
                    {errorMsg}
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-charcoal text-xs uppercase tracking-widest transition-all duration-300"
                  >
                    Close Screen
                  </button>
                </div>
              )}
            </div>

            {/* Instructions Footer */}
            <div className="px-6 py-4 bg-white border-t border-gold/15 text-center">
              <p className="text-[10px] uppercase tracking-wider text-dark-grey/60 font-light">
                {product?.title?.toLowerCase().includes('earring') || 
                 product?.title?.toLowerCase().includes('jhumka') ||
                 product?.title?.toLowerCase().includes('combo')
                  ? "Position your face clearly. The earrings will align to your ears."
                  : "Position your face & neck clearly. The necklace will align to your collar line."}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
