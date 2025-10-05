"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Image as ImageIcon, Link2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface VaultItem {
  id: string;
  type: "note" | "image" | "video" | "link";
  title: string;
  text?: string;
  contentUrl?: string;
  category: string;
  tags: string[];
  createdAt: string;
  summary: string;
}

export default function UploadPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("note");
  const [dragActive, setDragActive] = useState(false);
  
  // Note form
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteTags, setNoteTags] = useState("");
  
  // Link form
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkDescription, setLinkDescription] = useState("");
  const [linkTags, setLinkTags] = useState("");
  
  // Image upload
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageTitle, setImageTitle] = useState("");
  const [imageTags, setImageTags] = useState("");

  const saveToVault = (item: VaultItem) => {
    try {
      const existingItems = localStorage.getItem("vaultItems");
      const items: VaultItem[] = existingItems ? JSON.parse(existingItems) : [];
      items.unshift(item); // Add to beginning
      localStorage.setItem("vaultItems", JSON.stringify(items));
      return true;
    } catch (error) {
      console.error("Error saving to vault:", error);
      return false;
    }
  };

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!noteTitle.trim() || !noteContent.trim()) {
      toast.error("Please fill in title and content");
      return;
    }

    const newNote: VaultItem = {
      id: crypto.randomUUID(),
      type: "note",
      title: noteTitle,
      text: noteContent,
      category: "Notes",
      tags: noteTags.split(",").map(t => t.trim()).filter(t => t),
      createdAt: new Date().toISOString(),
      summary: noteContent.substring(0, 100),
    };

    if (saveToVault(newNote)) {
      toast.success("Note added to vault!");
      setNoteTitle("");
      setNoteContent("");
      setNoteTags("");
      setTimeout(() => router.push("/dashboard"), 500);
    } else {
      toast.error("Failed to save note");
    }
  };

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!linkTitle.trim() || !linkUrl.trim()) {
      toast.error("Please fill in title and URL");
      return;
    }

    const newLink: VaultItem = {
      id: crypto.randomUUID(),
      type: "link",
      title: linkTitle,
      text: linkDescription,
      contentUrl: linkUrl,
      category: "Links",
      tags: linkTags.split(",").map(t => t.trim()).filter(t => t),
      createdAt: new Date().toISOString(),
      summary: linkDescription || linkUrl,
    };

    if (saveToVault(newLink)) {
      toast.success("Link added to vault!");
      setLinkTitle("");
      setLinkUrl("");
      setLinkDescription("");
      setLinkTags("");
      setTimeout(() => router.push("/dashboard"), 500);
    } else {
      toast.error("Failed to save link");
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image is too large (max 10MB)");
        return;
      }
      setSelectedImage(file);
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
    }
  };

  const handleImageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedImage || !imageTitle.trim()) {
      toast.error("Please select an image and add a title");
      return;
    }

    const newImage: VaultItem = {
      id: crypto.randomUUID(),
      type: "image",
      title: imageTitle,
      contentUrl: imagePreview,
      category: "Media",
      tags: imageTags.split(",").map(t => t.trim()).filter(t => t),
      createdAt: new Date().toISOString(),
      summary: `Image: ${imageTitle}`,
    };

    if (saveToVault(newImage)) {
      toast.success("Image added to vault!");
      setSelectedImage(null);
      setImagePreview("");
      setImageTitle("");
      setImageTags("");
      setTimeout(() => router.push("/dashboard"), 500);
    } else {
      toast.error("Failed to save image");
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add to Your Vault</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Create notes, save links, or upload images to your vault
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="note" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Note
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            Image
          </TabsTrigger>
          <TabsTrigger value="link" className="flex items-center gap-2">
            <Link2 className="w-4 h-4" />
            Link
          </TabsTrigger>
        </TabsList>

        {/* Note Tab */}
        <TabsContent value="note">
          <Card>
            <CardHeader>
              <CardTitle>Create a Note</CardTitle>
              <CardDescription>
                Write down your thoughts, ideas, or important information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNoteSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="note-title">Title</Label>
                  <Input
                    id="note-title"
                    placeholder="Enter note title..."
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="note-content">Content</Label>
                  <Textarea
                    id="note-content"
                    placeholder="Write your note here..."
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    rows={8}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="note-tags">Tags (comma-separated)</Label>
                  <Input
                    id="note-tags"
                    placeholder="work, personal, ideas..."
                    value={noteTags}
                    onChange={(e) => setNoteTags(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Save Note
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Image Tab */}
        <TabsContent value="image">
          <Card>
            <CardHeader>
              <CardTitle>Upload an Image</CardTitle>
              <CardDescription>
                Add photos, screenshots, or any visual content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleImageSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image-file">Select Image</Label>
                  <Input
                    id="image-file"
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    required
                  />
                </div>
                {imagePreview && (
                  <div className="relative w-full h-48 bg-slate-100 dark:bg-neutral-800 rounded-lg overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="image-title">Title</Label>
                  <Input
                    id="image-title"
                    placeholder="Enter image title..."
                    value={imageTitle}
                    onChange={(e) => setImageTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image-tags">Tags (comma-separated)</Label>
                  <Input
                    id="image-tags"
                    placeholder="design, screenshot, photo..."
                    value={imageTags}
                    onChange={(e) => setImageTags(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={!selectedImage}>
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Save Image
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Link Tab */}
        <TabsContent value="link">
          <Card>
            <CardHeader>
              <CardTitle>Save a Link</CardTitle>
              <CardDescription>
                Bookmark articles, resources, or any web content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLinkSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="link-title">Title</Label>
                  <Input
                    id="link-title"
                    placeholder="Enter link title..."
                    value={linkTitle}
                    onChange={(e) => setLinkTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link-url">URL</Label>
                  <Input
                    id="link-url"
                    type="url"
                    placeholder="https://example.com"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link-description">Description (optional)</Label>
                  <Textarea
                    id="link-description"
                    placeholder="Add a brief description..."
                    value={linkDescription}
                    onChange={(e) => setLinkDescription(e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link-tags">Tags (comma-separated)</Label>
                  <Input
                    id="link-tags"
                    placeholder="article, research, tutorial..."
                    value={linkTags}
                    onChange={(e) => setLinkTags(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Link2 className="w-4 h-4 mr-2" />
                  Save Link
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
