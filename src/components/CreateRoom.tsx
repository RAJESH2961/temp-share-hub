import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Share2, Clock, Plus } from "lucide-react";
// Mock Supabase client - will be replaced with actual Supabase integration
const supabase = {
  from: (table: string) => ({
    insert: async (data: any) => ({ error: null }),
  })
};
import { v4 as uuidv4 } from 'uuid';

export default function CreateRoom() {
  const [roomName, setRoomName] = useState("");
  const [expirationTime, setExpirationTime] = useState("1h");
  const [isCreating, setIsCreating] = useState(false);
  const [createdRoom, setCreatedRoom] = useState<{ id: string; name: string; link: string } | null>(null);
  const { toast } = useToast();

  const getExpirationDate = (timeString: string) => {
    const now = new Date();
    switch (timeString) {
      case "15m":
        return new Date(now.getTime() + 15 * 60 * 1000);
      case "1h":
        return new Date(now.getTime() + 60 * 60 * 1000);
      case "24h":
        return new Date(now.getTime() + 24 * 60 * 60 * 1000);
      case "7d":
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      default:
        return new Date(now.getTime() + 60 * 60 * 1000);
    }
  };

  const createRoom = async () => {
    if (!roomName.trim()) {
      toast({
        title: "Room name required",
        description: "Please enter a name for your room",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    
    try {
      const roomId = uuidv4();
      const expiresAt = getExpirationDate(expirationTime);
      
      const { error } = await supabase
        .from("rooms")
        .insert({
          id: roomId,
          name: roomName,
          expires_at: expiresAt.toISOString(),
          created_at: new Date().toISOString(),
        });

      if (error) throw error;

      const roomLink = `${window.location.origin}/room/${roomId}`;
      
      setCreatedRoom({
        id: roomId,
        name: roomName,
        link: roomLink,
      });

      toast({
        title: "Room created successfully!",
        description: "Your temporary room is ready to use",
      });
    } catch (error) {
      console.error("Error creating room:", error);
      toast({
        title: "Error creating room",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const copyToClipboard = async () => {
    if (createdRoom) {
      await navigator.clipboard.writeText(createdRoom.link);
      toast({
        title: "Link copied!",
        description: "Room link has been copied to your clipboard",
      });
    }
  };

  const resetForm = () => {
    setCreatedRoom(null);
    setRoomName("");
    setExpirationTime("1h");
  };

  if (createdRoom) {
    return (
      <Card className="w-full max-w-md mx-auto" style={{ 
        background: 'var(--gradient-card)',
        boxShadow: 'var(--shadow-card)'
      }}>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center gap-2 justify-center text-primary">
            <Share2 className="w-6 h-6" />
            Room Created!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Room Name</p>
            <p className="font-semibold">{createdRoom.name}</p>
          </div>
          
          <div className="space-y-2">
            <Label>Shareable Link</Label>
            <div className="flex gap-2">
              <Input 
                value={createdRoom.link} 
                readOnly 
                className="text-xs"
              />
              <Button 
                onClick={copyToClipboard}
                variant="outline"
                className="shrink-0"
              >
                Copy
              </Button>
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button 
              onClick={() => window.location.href = `/room/${createdRoom.id}`}
              className="flex-1"
              style={{ background: 'var(--gradient-primary)' }}
            >
              Open Room
            </Button>
            <Button 
              onClick={resetForm}
              variant="outline"
              className="flex-1"
            >
              Create Another
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto" style={{ 
      background: 'var(--gradient-card)',
      boxShadow: 'var(--shadow-card)'
    }}>
      <CardHeader className="text-center">
        <CardTitle className="flex items-center gap-2 justify-center text-primary">
          <Plus className="w-6 h-6" />
          Create Temp Room
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="roomName">Room Name</Label>
          <Input
            id="roomName"
            placeholder="Enter room name..."
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expiration">Expiration Time</Label>
          <Select value={expirationTime} onValueChange={setExpirationTime}>
            <SelectTrigger>
              <SelectValue placeholder="Select expiration time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15m">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  15 minutes
                </div>
              </SelectItem>
              <SelectItem value="1h">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  1 hour
                </div>
              </SelectItem>
              <SelectItem value="24h">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  24 hours
                </div>
              </SelectItem>
              <SelectItem value="7d">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  7 days
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={createRoom} 
          disabled={isCreating}
          className="w-full"
          style={{ background: 'var(--gradient-primary)' }}
        >
          {isCreating ? "Creating..." : "Create Room"}
        </Button>
      </CardContent>
    </Card>
  );
}