import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Clock, Upload, FileText, Code, Link, MessageSquare, AlertTriangle } from "lucide-react";
import { UploadContent } from "./UploadContent";

interface Room {
  id: string;
  name: string;
  expires_at: string;
  created_at: string;
}

interface Content {
  id: string;
  type: 'file' | 'code' | 'link' | 'message';
  title: string;
  content: string;
  created_at: string;
}

export default function RoomView() {
  const { roomId } = useParams<{ roomId: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const [content, setContent] = useState<Content[]>([]);
  const [isExpired, setIsExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (roomId) {
      fetchRoom();
      fetchContent();
    }
  }, [roomId]);

  useEffect(() => {
    if (room) {
      const timer = setInterval(() => {
        updateTimeLeft();
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [room]);

  const fetchRoom = async () => {
    try {
      // Simulated API call - replace with actual Supabase call
      const mockRoom: Room = {
        id: roomId || "",
        name: "Sample Room",
        expires_at: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
        created_at: new Date().toISOString(),
      };
      setRoom(mockRoom);
    } catch (error) {
      console.error("Error fetching room:", error);
      toast({
        title: "Error loading room",
        description: "Could not load room data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchContent = async () => {
    try {
      // Simulated content - replace with actual Supabase call
      const mockContent: Content[] = [
        {
          id: "1",
          type: "message",
          title: "Welcome Message",
          content: "Welcome to this temporary room! Share files, code, and links here.",
          created_at: new Date().toISOString(),
        },
        {
          id: "2",
          type: "code",
          title: "Sample Code",
          content: `function hello() {\n  console.log("Hello, TempShare!");\n}`,
          created_at: new Date().toISOString(),
        }
      ];
      setContent(mockContent);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const updateTimeLeft = () => {
    if (!room) return;

    const now = new Date();
    const expiry = new Date(room.expires_at);
    const diff = expiry.getTime() - now.getTime();

    if (diff <= 0) {
      setIsExpired(true);
      setTimeLeft("Expired");
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (hours > 0) {
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    } else if (minutes > 0) {
      setTimeLeft(`${minutes}m ${seconds}s`);
    } else {
      setTimeLeft(`${seconds}s`);
    }
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'file': return <FileText className="w-4 h-4" />;
      case 'code': return <Code className="w-4 h-4" />;
      case 'link': return <Link className="w-4 h-4" />;
      case 'message': return <MessageSquare className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const renderContent = (item: Content) => {
    switch (item.type) {
      case 'code':
        return (
          <pre className="bg-muted p-3 rounded-md overflow-x-auto text-sm">
            <code>{item.content}</code>
          </pre>
        );
      case 'link':
        return (
          <a 
            href={item.content} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline break-all"
          >
            {item.content}
          </a>
        );
      default:
        return <p className="whitespace-pre-wrap">{item.content}</p>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--gradient-bg)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading room...</p>
        </div>
      </div>
    );
  }

  if (isExpired || !room) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--gradient-bg)' }}>
        <Card className="w-full max-w-md mx-4" style={{ boxShadow: 'var(--shadow-card)' }}>
          <CardContent className="text-center py-8">
            <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Room Expired</h2>
            <p className="text-muted-foreground mb-4">
              This temporary room is no longer accessible.
            </p>
            <Button onClick={() => window.location.href = "/"}>
              Create New Room
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 px-4" style={{ background: 'var(--gradient-bg)' }}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Room Header */}
        <Card style={{ background: 'var(--gradient-card)', boxShadow: 'var(--shadow-card)' }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                {room.name}
              </CardTitle>
              <Badge variant={isExpired ? "destructive" : "secondary"} className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {timeLeft}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Upload Button */}
        {!isExpired && (
          <div className="text-center">
            <Button
              onClick={() => setShowUpload(!showUpload)}
              size="lg"
              style={{ background: 'var(--gradient-primary)' }}
              className="flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              {showUpload ? "Hide Upload" : "Add Content"}
            </Button>
          </div>
        )}

        {/* Upload Component */}
        {showUpload && !isExpired && (
          <UploadContent 
            roomId={roomId || ""} 
            onContentAdded={() => {
              fetchContent();
              setShowUpload(false);
            }} 
          />
        )}

        {/* Content List */}
        <div className="space-y-4">
          {content.map((item) => (
            <Card key={item.id} style={{ background: 'var(--gradient-card)', boxShadow: 'var(--shadow-card)' }}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getContentIcon(item.type)}
                    <span className="font-medium">{item.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(item.created_at).toLocaleTimeString()}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {renderContent(item)}
              </CardContent>
            </Card>
          ))}
          
          {content.length === 0 && (
            <Card style={{ background: 'var(--gradient-card)', boxShadow: 'var(--shadow-card)' }}>
              <CardContent className="text-center py-8">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No content shared yet. Be the first to add something!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}