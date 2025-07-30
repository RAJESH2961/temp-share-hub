import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Code, Link, MessageSquare } from "lucide-react";

interface UploadContentProps {
  roomId: string;
  onContentAdded: () => void;
}

export function UploadContent({ roomId, onContentAdded }: UploadContentProps) {
  const [activeTab, setActiveTab] = useState("file");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // File upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Code snippet state
  const [codeTitle, setCodeTitle] = useState("");
  const [codeContent, setCodeContent] = useState("");

  // Link state
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  // Message state
  const [messageTitle, setMessageTitle] = useState("");
  const [messageContent, setMessageContent] = useState("");

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      // Simulate file upload - replace with actual Supabase storage upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "File uploaded successfully!",
        description: `${selectedFile.name} has been added to the room`,
      });
      
      setSelectedFile(null);
      onContentAdded();
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCodeSubmit = async () => {
    if (!codeTitle.trim() || !codeContent.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both title and code content",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      // Simulate code snippet save - replace with actual Supabase insert
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Code snippet added!",
        description: "Your code has been shared in the room",
      });
      
      setCodeTitle("");
      setCodeContent("");
      onContentAdded();
    } catch (error) {
      console.error("Error saving code:", error);
      toast({
        title: "Save failed",
        description: "There was an error saving your code snippet",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleLinkSubmit = async () => {
    if (!linkTitle.trim() || !linkUrl.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both title and URL",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      // Simulate link save - replace with actual Supabase insert
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Link added!",
        description: "Your link has been shared in the room",
      });
      
      setLinkTitle("");
      setLinkUrl("");
      onContentAdded();
    } catch (error) {
      console.error("Error saving link:", error);
      toast({
        title: "Save failed",
        description: "There was an error saving your link",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleMessageSubmit = async () => {
    if (!messageTitle.trim() || !messageContent.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both title and message content",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      // Simulate message save - replace with actual Supabase insert
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Message added!",
        description: "Your message has been shared in the room",
      });
      
      setMessageTitle("");
      setMessageContent("");
      onContentAdded();
    } catch (error) {
      console.error("Error saving message:", error);
      toast({
        title: "Save failed",
        description: "There was an error saving your message",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card style={{ background: 'var(--gradient-card)', boxShadow: 'var(--shadow-card)' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Upload className="w-5 h-5" />
          Add Content to Room
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="file" className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              File
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-1">
              <Code className="w-4 h-4" />
              Code
            </TabsTrigger>
            <TabsTrigger value="link" className="flex items-center gap-1">
              <Link className="w-4 h-4" />
              Link
            </TabsTrigger>
            <TabsTrigger value="message" className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              Message
            </TabsTrigger>
          </TabsList>

          <TabsContent value="file" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file">Select File</Label>
              <Input
                id="file"
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                accept=".pdf,.txt,.doc,.docx,.png,.jpg,.jpeg,.gif"
              />
            </div>
            {selectedFile && (
              <div className="text-sm text-muted-foreground">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            )}
            <Button 
              onClick={handleFileUpload} 
              disabled={!selectedFile || isUploading}
              className="w-full"
              style={{ background: 'var(--gradient-primary)' }}
            >
              {isUploading ? "Uploading..." : "Upload File"}
            </Button>
          </TabsContent>

          <TabsContent value="code" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="codeTitle">Code Title</Label>
              <Input
                id="codeTitle"
                placeholder="e.g., Login function, API endpoint..."
                value={codeTitle}
                onChange={(e) => setCodeTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="codeContent">Code Content</Label>
              <Textarea
                id="codeContent"
                placeholder="Paste your code here..."
                value={codeContent}
                onChange={(e) => setCodeContent(e.target.value)}
                rows={8}
                className="font-mono text-sm"
              />
            </div>
            <Button 
              onClick={handleCodeSubmit} 
              disabled={isUploading}
              className="w-full"
              style={{ background: 'var(--gradient-primary)' }}
            >
              {isUploading ? "Adding..." : "Add Code Snippet"}
            </Button>
          </TabsContent>

          <TabsContent value="link" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="linkTitle">Link Title</Label>
              <Input
                id="linkTitle"
                placeholder="e.g., Documentation, Reference..."
                value={linkTitle}
                onChange={(e) => setLinkTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkUrl">URL</Label>
              <Input
                id="linkUrl"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                type="url"
              />
            </div>
            <Button 
              onClick={handleLinkSubmit} 
              disabled={isUploading}
              className="w-full"
              style={{ background: 'var(--gradient-primary)' }}
            >
              {isUploading ? "Adding..." : "Add Link"}
            </Button>
          </TabsContent>

          <TabsContent value="message" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="messageTitle">Message Title</Label>
              <Input
                id="messageTitle"
                placeholder="e.g., Instructions, Notes..."
                value={messageTitle}
                onChange={(e) => setMessageTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="messageContent">Message</Label>
              <Textarea
                id="messageContent"
                placeholder="Type your message here..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                rows={5}
              />
            </div>
            <Button 
              onClick={handleMessageSubmit} 
              disabled={isUploading}
              className="w-full"
              style={{ background: 'var(--gradient-primary)' }}
            >
              {isUploading ? "Adding..." : "Add Message"}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}