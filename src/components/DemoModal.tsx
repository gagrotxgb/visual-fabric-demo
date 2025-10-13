import { useState } from "react";
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
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface DemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OUTFIT_OPTIONS = [
  "Men Short Kurta",
  "Men Long Kurta",
  "Sherwani",
  "Bandhgala",
  "Nehru Jacket over Kurta",
  "Pathani Suit",
  "Saree (Nivi drape)",
  "Lehenga–Choli",
  "Anarkali Suit",
  "Salwar–Kameez",
  "Womens Kurti with Jeans",
];

export const DemoModal = ({ open, onOpenChange }: DemoModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedOutfit, setSelectedOutfit] = useState<string>("");

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
    if (!selectedFile) {
      toast.error("Please upload a fabric image first");
      return;
    }
    if (!selectedOutfit) {
      toast.error("Please select an outfit option");
      return;
    }

    try {
      // Dummy API call
      const formData = new FormData();
      formData.append("fabric", selectedFile);
      formData.append("outfit", selectedOutfit);

      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Demo submitted successfully!");
        setSelectedFile(null);
        setPreviewUrl(null);
        setSelectedOutfit("");
        onOpenChange(false);
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">VisualFabric Demo</DialogTitle>
          <DialogDescription>
            Upload a fabric image to see how it would look as a finished garment
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
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
            <Select value={selectedOutfit} onValueChange={setSelectedOutfit}>
              <SelectTrigger id="outfit-select">
                <SelectValue placeholder="Choose an outfit style" />
              </SelectTrigger>
              <SelectContent>
                {OUTFIT_OPTIONS.map((outfit) => (
                  <SelectItem key={outfit} value={outfit}>
                    {outfit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleSubmit} 
            variant="cta" 
            className="w-full"
            size="lg"
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
