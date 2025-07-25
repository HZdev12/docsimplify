"use client"

import type React from "react"

import { useEffect, useState, useRef, useCallback } from "react"
import { Upload, FileText, Copy, Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSelector } from "@/components/language-selector"
import Link from "next/link"
import mammoth from "mammoth";
import Tesseract from "tesseract.js";
import Header from "@/components/Header";

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string>("")
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const { t } = useLanguage()
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Ouvre la caméra quand showCamera passe à true
  useEffect(() => {
    if (showCamera && videoRef.current) {
      setCameraError(null);
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          streamRef.current = stream;
          videoRef.current!.srcObject = stream;
        })
        .catch((err) => {
          setCameraError("Impossible d'accéder à la caméra : " + err.message);
        });
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [showCamera]);

  // Capture la photo et la transforme en fichier
  const handleCapture = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `photo-${Date.now()}.jpg`, { type: "image/jpeg" });
          setFile(file);
          setResult("");
          setShowCamera(false);
        }
      }, "image/jpeg");
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const droppedFiles = Array.from(e.dataTransfer.files)
      const pdfFile = droppedFiles.find((file) => file.type === "application/pdf")

      if (pdfFile) {
        setFile(pdfFile)
        setResult("")
      } else {
        toast({
          title: t("invalidFileType"),
          description: t("uploadPdfMessage"),
          variant: "destructive",
        })
      }
    },
    [toast, t],
  )

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
      setResult("")
    } else {
      toast({
        title: t("invalidFileType"),
        description: t("uploadPdfMessage"),
        variant: "destructive",
      })
    }
  }

  // Nouvelle fonction d'extraction de texte selon le type de fichier
  async function extractTextFromFile(file: File): Promise<string> {
    if (file.type === "application/pdf") {
      // @ts-ignore
      const pdfjsLib = await import("pdfjs-dist/build/pdf");
      // @ts-ignore
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item: any) => item.str).join(" ") + "\n";
      }
      return text;
    } else if (
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.name.endsWith(".docx")
    ) {
      // Word
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value;
    } else if (file.type.startsWith("image/")) {
      // Image/OCR
      const { data: { text } } = await Tesseract.recognize(file, "eng+fra+deu+spa+ita+ara");
      return text;
    } else {
      throw new Error("Type de fichier non supporté");
    }
  }

  // Helper pour timeout
  function withTimeout<T>(promise: Promise<T>, ms: number, errorMsg: string): Promise<T> {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) => setTimeout(() => reject(new Error(errorMsg)), ms)),
    ]);
  }

  const handleSimplify = async () => {
    if (!file) {
      toast({
        title: t("noFileSelected"),
        description: t("uploadFirstMessage"),
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      // Extraction du texte selon le type de fichier (timeout 30s)
      const extractedText = await withTimeout(
        extractTextFromFile(file),
        30000,
        "L'extraction du texte a pris trop de temps. Veuillez réessayer avec un fichier plus petit."
      );
      // Appel à l'API de résumé (timeout 30s)
      const response = await withTimeout(
        fetch("/api/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: extractedText }),
        }),
        30000,
        "L'appel à l'API de résumé a expiré. Veuillez réessayer plus tard."
      );
      const data = await response.json();
      if (data.summary) {
        setResult(data.summary);
      } else {
        setResult(data.error || "Erreur lors du résumé.");
      }
    } catch (err: any) {
      setResult("Erreur lors de l'extraction ou du résumé : " + (err.message || err));
    }
    setIsLoading(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result)
      toast({
        title: t("copiedToClipboard"),
        description: t("copiedMessage"),
      })
    } catch (err) {
      toast({
        title: t("failedToCopy"),
        description: t("tryAgain"),
        variant: "destructive",
      })
    }
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([result], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "simplified-contract.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    toast({
      title: t("downloadStarted"),
      description: t("downloadMessage"),
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">{t("heroTitle")}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t("heroDescription")}</p>
          </div>

          {/* Upload Section */}
          <Card className="p-8 mb-8">
            {/* Interface caméra modale */}
            {showCamera && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-4 shadow-xl relative w-full max-w-md">
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                    onClick={() => setShowCamera(false)}
                    aria-label="Fermer"
                  >
                    ×
                  </button>
                  <div className="w-full flex flex-col items-center">
                    {cameraError ? (
                      <div className="text-red-600">{cameraError}</div>
                    ) : (
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="rounded-lg w-full max-h-80 bg-black"
                        style={{ objectFit: "cover" }}
                      />
                    )}
                  </div>
                  <Button
                    onClick={handleCapture}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    📸 Capturer
                  </Button>
                </div>
              </div>
            )}
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200 cursor-pointer ${
                isDragOver ? "border-blue-500 bg-blue-50" : "border-blue-300 hover:border-blue-400"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className={`p-6 rounded-full ${isDragOver ? "bg-blue-100" : "bg-blue-50"}`}>
                  <Upload className="w-12 h-12 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{file ? file.name : t("dropText")}</h3>
                  <p className="text-gray-600">{file ? t("fileReady") : t("browseText")}</p>
                </div>
                {file && (
                  <div className="flex items-center space-x-2 text-blue-600">
                    <FileText className="w-5 h-5" />
                    <span className="text-sm font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                )}
                {/* Bouton pour prendre une photo sous le texte d'upload, version lien souligné */}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setShowCamera(true); }}
                  className="mt-4 text-blue-600 underline underline-offset-4 hover:text-blue-800 transition-colors text-lg font-medium bg-transparent border-none p-0 focus:outline-none"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  📸 Prendre une photo
                </button>
              </div>
              <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileSelect} className="hidden" />
            </div>
            <div className="text-center mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleSimplify}
                disabled={isLoading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {t("processingButton")}
                  </>
                ) : (
                  t("simplifyButton")
                )}
              </Button>
            </div>
          </Card>

          {/* Results Section */}
          {result && (
            <Card className="p-8 shadow-lg">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("simplifiedContract")}</h3>
                <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-500">
                  <p className="text-gray-800 text-lg leading-relaxed">{result}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  className="border-blue-500 text-blue-600 hover:bg-blue-50 px-6 py-3 bg-transparent"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {t("copyText")}
                </Button>
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="border-blue-500 text-blue-600 hover:bg-blue-50 px-6 py-3 bg-transparent"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t("downloadPdf")}
                </Button>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
