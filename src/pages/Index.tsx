import CreateRoom from "@/components/CreateRoom";
import { Share2 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen py-8 px-4" style={{ background: 'var(--gradient-bg)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-xl" style={{ background: 'var(--gradient-primary)' }}>
              <Share2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">TempShare</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            Create temporary rooms to share files, code snippets, links, and messages. 
            Perfect for quick collaborations that expire automatically.
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
            <span className="flex items-center gap-1">✨ No registration required</span>
            <span className="flex items-center gap-1">⏰ Auto-expiring rooms</span>
            <span className="flex items-center gap-1">🔗 Easy sharing</span>
            <span className="flex items-center gap-1">🛡️ Temporary storage</span>
          </div>
        </div>

        {/* Create Room Component */}
        <CreateRoom />

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 rounded-lg" style={{ background: 'var(--gradient-card)', boxShadow: 'var(--shadow-card)' }}>
            <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
              📁
            </div>
            <h3 className="font-semibold mb-2">File Sharing</h3>
            <p className="text-sm text-muted-foreground">Upload documents, images, and files up to 50MB</p>
          </div>
          
          <div className="text-center p-6 rounded-lg" style={{ background: 'var(--gradient-card)', boxShadow: 'var(--shadow-card)' }}>
            <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
              💻
            </div>
            <h3 className="font-semibold mb-2">Code Snippets</h3>
            <p className="text-sm text-muted-foreground">Share code with syntax highlighting and formatting</p>
          </div>
          
          <div className="text-center p-6 rounded-lg" style={{ background: 'var(--gradient-card)', boxShadow: 'var(--shadow-card)' }}>
            <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
              🔗
            </div>
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <p className="text-sm text-muted-foreground">Share important URLs and resources instantly</p>
          </div>
          
          <div className="text-center p-6 rounded-lg" style={{ background: 'var(--gradient-card)', boxShadow: 'var(--shadow-card)' }}>
            <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
              ⏱️
            </div>
            <h3 className="font-semibold mb-2">Auto Expire</h3>
            <p className="text-sm text-muted-foreground">Rooms automatically expire from 15 minutes to 7 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
