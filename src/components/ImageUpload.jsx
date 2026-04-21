"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function ImageUpload({ value, onChange, label = "Image du projet" }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(value || "");
  const fileInputRef = useRef(null);

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier le type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setError("Type de fichier non autorisé. Utilisez JPG, PNG, WebP ou GIF.");
      return;
    }

    // Vérifier la taille (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("Fichier trop volumineux. Maximum 5MB.");
      return;
    }

    setError("");
    setUploading(true);

    try {
      // Créer un preview local
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload vers le serveur
      const formData = new FormData();
      formData.append("file", file);

      const token = localStorage.getItem("auth_token");
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de l'upload");
      }

      const data = await res.json();
      onChange(data.url);
      setPreview(data.url);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message);
      setPreview("");
    } finally {
      setUploading(false);
    }
  }

  function handleRemove() {
    setPreview("");
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      {preview ? (
        <Card hover={false} className="relative overflow-hidden">
          <img
            src={preview}
            alt="Preview"
            className="h-48 w-full object-cover"
          />
          <div className="absolute right-2 top-2">
            <Button
              type="button"
              onClick={handleRemove}
              variant="ghost"
              size="sm"
              className="bg-slate-900/80 backdrop-blur-sm hover:bg-red-500/20"
            >
              <X size={16} />
              Supprimer
            </Button>
          </div>
        </Card>
      ) : (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
            className="hidden"
            disabled={uploading}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-slate-700 bg-slate-900/50 transition-colors hover:border-indigo-500/50 hover:bg-slate-800/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading ? (
              <div className="flex flex-col items-center gap-2 text-slate-400">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="text-sm">Upload en cours...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-slate-400">
                <Upload className="h-8 w-8" />
                <span className="text-sm">Cliquez pour uploader une image</span>
                <span className="text-xs text-slate-500">
                  JPG, PNG, WebP ou GIF (max 5MB)
                </span>
              </div>
            )}
          </button>
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
