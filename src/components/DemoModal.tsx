import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface OutfitOption {
  id: string;
  outfit: string;
}

export const DemoModal = ({ open, onOpenChange }: DemoModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedOutfit, setSelectedOutfit] = useState<string>("");
  const [outfitOptions, setOutfitOptions] = useState<OutfitOption[]>([]);
  const [isLoadingOutfits, setIsLoadingOutfits] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch outfit options when modal opens
  useEffect(() => {
    if (open) {
      fetchOutfitOptions();
    }
  }, [open]);

  const fetchOutfitOptions = async () => {
    setIsLoadingOutfits(true);
    setError(null);
    try {
      const response = await fetch(
        "https://visual-fabric-be-924005728925.europe-west1.run.app/prompts/",
        {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setOutfitOptions(data);
      } else {
        setError("Failed to load outfit options. Please try again.");
        toast.error("Failed to load outfit options");
      }
    } catch (err) {
      setError("Failed to load outfit options. Please try again.");
      toast.error("Failed to load outfit options");
      console.error(err);
    } finally {
      setIsLoadingOutfits(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      toast.success(`File selected: ${file.name}`);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile || !selectedOutfit) {
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const formData = new FormData();
      formData.append("prompt_id", selectedOutfit);
      formData.append("file", selectedFile);

      const response = await fetch(
        "https://visual-fabric-be-924005728925.europe-west1.run.app/generate_mockup/",
        {
          method: "POST",
          body: formData,
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setGeneratedImageUrl(imageUrl);
        toast.success("Mockup generated successfully!");
      } else {
        setError("Generation failed. Please try again.");
        toast.error("Generation failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setSelectedOutfit("");
    setGeneratedImageUrl(null);
    setError(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">VisualFabric Demo</DialogTitle>
          <DialogDescription>
            Upload a fabric image to see how it would look as a finished garment
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {!generatedImageUrl ? (
            <>
              <div className="space-y-4">
                <label htmlFor="fabric-upload" className="block">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      {selectedFile ? selectedFile.name : "Click to upload fabric image"}
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                  </div>
                  <input
                    id="fabric-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isGenerating}
                  />
                </label>

                {previewUrl && (
                  <div className="flex justify-center">
                    <img
                      src={previewUrl}
                      alt="Fabric preview"
                      className="w-64 h-64 object-cover rounded-lg border border-border"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="outfit-select" className="text-sm font-medium">
                  Select Outfit
                </label>
                {isLoadingOutfits ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Select
                    value={selectedOutfit}
                    onValueChange={setSelectedOutfit}
                    disabled={isGenerating}
                  >
                    <SelectTrigger id="outfit-select">
                      <SelectValue placeholder="Choose an outfit style" />
                    </SelectTrigger>
                    <SelectContent>
                      {outfitOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.outfit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}

              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                  <Loader2 className="w-12 h-12 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Generating your mockup...
                  </p>
                </div>
              ) : (
                <Button
                  onClick={handleSubmit}
                  variant="cta"
                  className="w-full"
                  size="lg"
                  disabled={!selectedFile || !selectedOutfit || isLoadingOutfits}
                >
                  Generate Mockup
                </Button>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <img
                  src={generatedImageUrl}
                  alt="Generated mockup"
                  className="max-w-full rounded-lg border border-border"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleReset} variant="outline" className="flex-1">
                  Try Another
                </Button>
                <Button
                  onClick={() => onOpenChange(false)}
                  variant="cta"
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
