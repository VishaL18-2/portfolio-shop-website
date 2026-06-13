import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, RefreshCw } from 'lucide-react';

// Premium transparent vector overlays for try-on simulation
const jhumkaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 130" width="100" height="130">
  <!-- Top Stud -->
  <circle cx="50" cy="25" r="14" fill="#E5C185" stroke="#C5A880" stroke-width="1.5"/>
  <circle cx="50" cy="25" r="6" fill="#A83232"/>
  <circle cx="50" cy="15" r="2.5" fill="#FFFFFF"/>
  <circle cx="59" cy="18" r="2.5" fill="#FFFFFF"/>
  <circle cx="62" cy="25" r="2.5" fill="#FFFFFF"/>
  <circle cx="59" cy="32" r="2.5" fill="#FFFFFF"/>
  <circle cx="50" cy="35" r="2.5" fill="#FFFFFF"/>
  <circle cx="41" cy="32" r="2.5" fill="#FFFFFF"/>
  <circle cx="38" cy="25" r="2.5" fill="#FFFFFF"/>
  <circle cx="41" cy="18" r="2.5" fill="#FFFFFF"/>
  
  <!-- Connecting Ring -->
  <circle cx="50" cy="44" r="5" fill="none" stroke="#C5A880" stroke-width="2"/>
  
  <!-- Jhumka Main Dome -->
  <path d="M20,80 C20,50 80,50 80,80 Z" fill="#F3EFE9" stroke="#C5A880" stroke-width="2"/>
  <path d="M23,75 C25,58 75,58 77,75" fill="none" stroke="#C5A880" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="50" y1="52" x2="50" y2="58" stroke="#C5A880" stroke-width="2"/>
  
  <!-- Hanging Little beads -->
  <line x1="25" y1="80" x2="25" y2="92" stroke="#C5A880" stroke-width="1.5"/>
  <circle cx="25" cy="94" r="3.5" fill="#FFFFFF" stroke="#C5A880" stroke-width="0.5"/>
  <line x1="33" y1="80" x2="33" y2="94" stroke="#C5A880" stroke-width="1.5"/>
  <circle cx="33" cy="96" r="3.5" fill="#FFFFFF" stroke="#C5A880" stroke-width="0.5"/>
  <line x1="41" y1="80" x2="41" y2="96" stroke="#C5A880" stroke-width="1.5"/>
  <circle cx="41" cy="98" r="3.5" fill="#A83232" stroke="#C5A880" stroke-width="0.5"/>
  <line x1="50" y1="80" x2="50" y2="98" stroke="#C5A880" stroke-width="1.5"/>
  <circle cx="50" cy="100" r="4.5" fill="#FFFFFF" stroke="#C5A880" stroke-width="0.5"/>
  <line x1="59" y1="80" x2="59" y2="96" stroke="#C5A880" stroke-width="1.5"/>
  <circle cx="59" cy="98" r="3.5" fill="#A83232" stroke="#C5A880" stroke-width="0.5"/>
  <line x1="67" y1="80" x2="67" y2="94" stroke="#C5A880" stroke-width="1.5"/>
  <circle cx="67" cy="96" r="3.5" fill="#FFFFFF" stroke="#C5A880" stroke-width="0.5"/>
  <line x1="75" y1="80" x2="75" y2="92" stroke="#C5A880" stroke-width="1.5"/>
  <circle cx="75" cy="94" r="3.5" fill="#FFFFFF" stroke="#C5A880" stroke-width="0.5"/>
</svg>`;

const goldChokerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 160" width="300" height="160">
  <!-- Main Thick Gold Collar Band -->
  <path d="M40,30 Q150,130 260,30" fill="none" stroke="#C5A880" stroke-width="10" stroke-linecap="round"/>
  <!-- Inner Glistening Yellow Gold Band -->
  <path d="M43,30 Q150,124 257,30" fill="none" stroke="#E5C185" stroke-width="4" stroke-linecap="round"/>
  
  <!-- Kundan Gemstones along the collar -->
  <circle cx="65" cy="40" r="4" fill="#FFFFFF" stroke="#A98C63" stroke-width="1"/>
  <circle cx="85" cy="51" r="4.5" fill="#902C2C" stroke="#A98C63" stroke-width="1"/>
  <circle cx="105" cy="62" r="4" fill="#FFFFFF" stroke="#A98C63" stroke-width="1"/>
  <circle cx="125" cy="71" r="4.5" fill="#1C5E3E" stroke="#A98C63" stroke-width="1"/>
  <circle cx="145" cy="77" r="4" fill="#FFFFFF" stroke="#A98C63" stroke-width="1"/>
  <circle cx="150" cy="79" r="5" fill="#902C2C" stroke="#A98C63" stroke-width="1.5"/>
  <circle cx="155" cy="77" r="4" fill="#FFFFFF" stroke="#A98C63" stroke-width="1"/>
  <circle cx="175" cy="71" r="4.5" fill="#1C5E3E" stroke="#A98C63" stroke-width="1"/>
  <circle cx="195" cy="62" r="4" fill="#FFFFFF" stroke="#A98C63" stroke-width="1"/>
  <circle cx="215" cy="51" r="4.5" fill="#902C2C" stroke="#A98C63" stroke-width="1"/>
  <circle cx="235" cy="40" r="4" fill="#FFFFFF" stroke="#A98C63" stroke-width="1"/>

  <!-- Hanging Gold Beads and Red Pendants -->
  <line x1="85" y1="56" x2="85" y2="70" stroke="#A98C63" stroke-width="1.5"/>
  <path d="M82,70 L88,70 L85,82 Z" fill="#902C2C" stroke="#A98C63" stroke-width="1"/>

  <line x1="115" y1="67" x2="115" y2="82" stroke="#A98C63" stroke-width="1.5"/>
  <path d="M112,82 L118,82 L115,96 Z" fill="#1C5E3E" stroke="#A98C63" stroke-width="1"/>

  <!-- Center Big Pendant -->
  <line x1="150" y1="84" x2="150" y2="105" stroke="#A98C63" stroke-width="2.5"/>
  <circle cx="150" cy="107" r="6" fill="#FFFFFF" stroke="#A98C63" stroke-width="1.5"/>
  <path d="M142,113 L158,113 L150,135 Z" fill="#902C2C" stroke="#A98C63" stroke-width="1.5"/>

  <!-- Right Side Hangers -->
  <line x1="185" y1="67" x2="185" y2="82" stroke="#A98C63" stroke-width="1.5"/>
  <path d="M182,82 L188,82 L185,96 Z" fill="#1C5E3E" stroke="#A98C63" stroke-width="1"/>

  <line x1="215" y1="56" x2="215" y2="70" stroke="#A98C63" stroke-width="1.5"/>
  <path d="M212,70 L218,70 L215,82 Z" fill="#902C2C" stroke="#A98C63" stroke-width="1"/>
</svg>`;

const pendantChainSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="300" height="200">
  <!-- Delicate Silver Chain -->
  <path d="M50,20 L145,145 Q150,150 155,145 L250,20" fill="none" stroke="#D3D3D3" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Highlight inner chain path -->
  <path d="M52,20 L145,143 Q150,147 155,143 L248,20" fill="none" stroke="#FFFFFF" stroke-width="0.8" stroke-linecap="round" stroke-dasharray="2,2"/>
  
  <!-- Pendant Connector -->
  <rect x="147" y="142" width="6" height="10" rx="2" fill="#A98C63" stroke="#D3D3D3" stroke-width="1"/>

  <!-- Teardrop Gemstone Pendant -->
  <path d="M150,152 C142,163 135,178 150,192 C165,178 158,163 150,152 Z" fill="#902C2C" stroke="#A98C63" stroke-width="1.5"/>
  <circle cx="150" cy="172" r="3.5" fill="#FFFFFF"/>
</svg>`;

export default function VirtualTryOnModal({ isOpen, onClose, product }) {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [loadingModel, setLoadingModel] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [loadedAssets, setLoadedAssets] = useState({
    necklace: null,
    leftEarring: null,
    rightEarring: null
  });
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Phase 1: Load MediaPipe scripts dynamically when modal opens
  useEffect(() => {
    if (!isOpen) return;
    
    let isMounted = true;
    
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
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

  // Phase 2: Load the transparent try-on images (custom PNGs if provided, otherwise fallback to SVG templates)
  useEffect(() => {
    if (!product || !isOpen) return;

    setLoadedAssets({ necklace: null, leftEarring: null, rightEarring: null });
    setErrorMsg('');

    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
      });
    };

    const removeWhiteBackground = (img) => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        // Loop through pixels: each pixel has 4 channels (r, g, b, a)
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // Check if pixel is close to white (threshold 240)
          if (r > 240 && g > 240 && b > 240) {
            data[i + 3] = 0; // Set alpha to 0 (make transparent)
          }
        }
        ctx.putImageData(imageData, 0, 0);
        return canvas; // Return processed canvas which drawImage can render directly
      } catch (e) {
        console.warn("Could not remove white background due to canvas error, using original:", e);
        return img;
      }
    };

    const loadAllAssets = async () => {
      try {
        const assets = { necklace: null, leftEarring: null, rightEarring: null };
        const promises = [];

        // Check if custom PNGs are specified
        if (product.tryOnImage || product.tryOnImageLeft || product.tryOnImageRight) {
          if (product.tryOnImage) {
            promises.push(
              loadImage(product.tryOnImage)
                .then(img => { assets.necklace = removeWhiteBackground(img); })
                .catch(err => {
                  console.error("Failed to load tryOnImage:", err);
                  throw new Error("Failed to load necklace image.");
                })
            );
          }
          if (product.tryOnImageLeft) {
            promises.push(
              loadImage(product.tryOnImageLeft)
                .then(img => { assets.leftEarring = removeWhiteBackground(img); })
                .catch(err => {
                  console.error("Failed to load tryOnImageLeft:", err);
                  throw new Error("Failed to load left earring image.");
                })
            );
          }
          if (product.tryOnImageRight) {
            promises.push(
              loadImage(product.tryOnImageRight)
                .then(img => { assets.rightEarring = removeWhiteBackground(img); })
                .catch(err => {
                  console.error("Failed to load tryOnImageRight:", err);
                  throw new Error("Failed to load right earring image.");
                })
            );
          }
          
          await Promise.all(promises);
          setLoadedAssets(assets);
          return;
        }

        // Fallback: compile fallback SVG vectors
        const titleLower = (product.title || "").toLowerCase();
        
        // Check if it's a set/combo containing both necklace and earrings
        const hasNecklaceKeywords = titleLower.includes('necklace') || titleLower.includes('chain') || titleLower.includes('pendant') || titleLower.includes('choker') || titleLower.includes('locket');
        const hasEarringKeywords = titleLower.includes('earring') || titleLower.includes('jhumka') || titleLower.includes('stud') || titleLower.includes('dangler') || titleLower.includes('jhumkas');
        const isSet = titleLower.includes('set') || titleLower.includes('combo');

        if (isSet && hasNecklaceKeywords && hasEarringKeywords) {
          // Load both necklace and earring SVGs
          const necklaceSvg = titleLower.includes('pendant') || titleLower.includes('chain') ? pendantChainSvg : goldChokerSvg;
          const leftEarringPromise = loadImage('data:image/svg+xml;utf8,' + encodeURIComponent(jhumkaSvg))
            .then(img => { assets.leftEarring = img; });
          const rightEarringPromise = loadImage('data:image/svg+xml;utf8,' + encodeURIComponent(jhumkaSvg))
            .then(img => { assets.rightEarring = img; });
          const necklacePromise = loadImage('data:image/svg+xml;utf8,' + encodeURIComponent(necklaceSvg))
            .then(img => { assets.necklace = img; });
            
          await Promise.all([necklacePromise, leftEarringPromise, rightEarringPromise]);
        } else if (hasEarringKeywords) {
          // Just earrings
          const leftEarringPromise = loadImage('data:image/svg+xml;utf8,' + encodeURIComponent(jhumkaSvg))
            .then(img => { assets.leftEarring = img; });
          const rightEarringPromise = loadImage('data:image/svg+xml;utf8,' + encodeURIComponent(jhumkaSvg))
            .then(img => { assets.rightEarring = img; });
          await Promise.all([leftEarringPromise, rightEarringPromise]);
        } else {
          // Just necklace
          const necklaceSvg = titleLower.includes('pendant') || titleLower.includes('chain') ? pendantChainSvg : goldChokerSvg;
          const necklacePromise = loadImage('data:image/svg+xml;utf8,' + encodeURIComponent(necklaceSvg))
            .then(img => { assets.necklace = img; });
          await Promise.all([necklacePromise]);
        }

        setLoadedAssets(assets);
      } catch (err) {
        console.error("Error loading try-on assets:", err);
        setErrorMsg(err.message || "Failed to load product preview images.");
      }
    };

    loadAllAssets();
  }, [product, isOpen]);

  // Phase 3: Setup webcam, media streams, and FaceMesh model
  useEffect(() => {
    const hasAssets = loadedAssets.necklace || loadedAssets.leftEarring || loadedAssets.rightEarring;
    if (!isOpen || !scriptsLoaded || !hasAssets || !videoRef.current || !canvasRef.current) return;

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

            // Earlobe bounding landmarks for distance scale
            const leftEarBoundary = landmarks[234];
            const rightEarBoundary = landmarks[454];
            const faceWidth = Math.hypot(rightEarBoundary.x - leftEarBoundary.x, rightEarBoundary.y - leftEarBoundary.y) * w;

            // Draw Left Earring
            if (loadedAssets.leftEarring) {
              const lEarlobe = landmarks[177];
              const earringSize = faceWidth * 0.22; // Scale size relative to face width
              const aspect = loadedAssets.leftEarring.height / loadedAssets.leftEarring.width;
              const earringHeight = earringSize * aspect;

              // Draw left earring, centered horizontally and hanging down vertically
              canvasCtx.drawImage(
                loadedAssets.leftEarring, 
                lEarlobe.x * w - earringSize / 2, 
                lEarlobe.y * h, 
                earringSize, 
                earringHeight
              );
            }

            // Draw Right Earring
            if (loadedAssets.rightEarring) {
              const rEarlobe = landmarks[401];
              const earringSize = faceWidth * 0.22; // Scale size relative to face width
              const aspect = loadedAssets.rightEarring.height / loadedAssets.rightEarring.width;
              const earringHeight = earringSize * aspect;

              // Draw right earring, centered horizontally and hanging down vertically
              canvasCtx.drawImage(
                loadedAssets.rightEarring, 
                rEarlobe.x * w - earringSize / 2, 
                rEarlobe.y * h, 
                earringSize, 
                earringHeight
              );
            }

            // Draw Necklace
            if (loadedAssets.necklace) {
              const chin = landmarks[152];
              const nose = landmarks[1];

              // Calculate directional vector from nose to chin to project neck center
              const dx = chin.x - nose.x;
              const dy = chin.y - nose.y;

              const neckX = (chin.x + dx * 0.38) * w;
              const neckY = (chin.y + dy * 0.42) * h;

              const necklaceWidth = faceWidth * 1.3;
              const aspect = loadedAssets.necklace.height / loadedAssets.necklace.width;
              const necklaceHeight = necklaceWidth * aspect;

              // Center the necklace on the neck line
              canvasCtx.drawImage(
                loadedAssets.necklace,
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
  }, [isOpen, scriptsLoaded, loadedAssets, product]);

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
                {loadedAssets.necklace && (loadedAssets.leftEarring || loadedAssets.rightEarring)
                  ? "Position your face clearly. The necklace set will align to your neck and ears."
                  : (loadedAssets.leftEarring || loadedAssets.rightEarring)
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
