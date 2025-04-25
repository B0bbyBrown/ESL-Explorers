import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Send, 
  Megaphone, 
  PlusCircle, 
  ChevronDown, 
  Bell,
  UserCog
} from "lucide-react";
import { Message, Announcement } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDistanceToNow } from "date-fns";

export default function MessagesPage() {
  const [tab, setTab] = useState("messages");
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementContent, setAnnouncementContent] = useState("");
  const [announcementPriority, setAnnouncementPriority] = useState("normal");
  
  // Current user for demo (would come from auth context in real app)
  const currentUserId = 1;
  
  const { data: messages, isLoading: messagesLoading } = useQuery<Message[]>({
    queryKey: [`/api/messages/${currentUserId}`]
  });
  
  const { data: announcements, isLoading: announcementsLoading } = useQuery<Announcement[]>({
    queryKey: ["/api/announcements"]
  });
  
  const sendMessageMutation = useMutation({
    mutationFn: async (newMessage: { senderId: number; receiverId: number; content: string; }) => {
      await apiRequest('POST', '/api/messages', newMessage);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/messages/${currentUserId}`] });
      setMessageText("");
    }
  });
  
  const createAnnouncementMutation = useMutation({
    mutationFn: async (newAnnouncement: { title: string; content: string; priority: string; createdBy: number; }) => {
      await apiRequest('POST', '/api/announcements', newAnnouncement);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/announcements"] });
      setAnnouncementTitle("");
      setAnnouncementContent("");
      setAnnouncementPriority("normal");
    }
  });
  
  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;
    
    sendMessageMutation.mutate({
      senderId: currentUserId,
      receiverId: selectedConversation,
      content: messageText
    });
  };
  
  const handleCreateAnnouncement = () => {
    if (!announcementTitle.trim() || !announcementContent.trim()) return;
    
    createAnnouncementMutation.mutate({
      title: announcementTitle,
      content: announcementContent,
      priority: announcementPriority,
      createdBy: currentUserId
    });
  };
  
  // Simple conversation grouping for demo purposes
  // In a real app, this would be more sophisticated and come from the API
  const conversations = messages
    ? Array.from(new Set(messages.map(msg => 
        msg.senderId === currentUserId ? msg.receiverId : msg.senderId
      )))
        .map(contactId => {
          const conversationMessages = messages.filter(msg => 
            (msg.senderId === currentUserId && msg.receiverId === contactId) || 
            (msg.receiverId === currentUserId && msg.senderId === contactId)
          ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          
          const lastMessage = conversationMessages[conversationMessages.length - 1];
          const unreadCount = conversationMessages.filter(m => 
            m.senderId !== currentUserId && !m.isRead
          ).length;
          
          return {
            contactId,
            contactName: contactId === 2 ? "Sarah Wilson" : "Robert Miller", // Mock names for demo
            lastMessage,
            unreadCount,
            messages: conversationMessages
          };
        })
        .filter(conv => 
          !searchText || conv.contactName.toLowerCase().includes(searchText.toLowerCase())
        )
        .sort((a, b) => 
          new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime()
        )
    : [];
  
  const selectedConversationData = conversations?.find(c => c.contactId === selectedConversation);
  
  const getTimeAgo = (date: Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100">Important</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">Medium</Badge>;
      default:
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">General</Badge>;
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-500">Manage your communications and announcements</p>
        </div>
      </div>
      
      <Tabs value={tab} onValueChange={setTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="settings">Notification Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="messages" className="m-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="border-gray-200">
              <CardHeader className="py-4 px-6 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search conversations..."
                    className="pl-8 w-full"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0 h-[500px] overflow-y-auto">
                {messagesLoading ? (
                  <div className="py-10 text-center text-gray-500">Loading conversations...</div>
                ) : conversations.length === 0 ? (
                  <div className="py-10 text-center text-gray-500">No conversations found</div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {conversations.map((conversation) => (
                      <div 
                        key={conversation.contactId}
                        className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedConversation === conversation.contactId ? 'bg-gray-50' : ''}`}
                        onClick={() => setSelectedConversation(conversation.contactId)}
                      >
                        <div className="flex items-start">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarFallback className="bg-primary-200 text-primary-700">
                              {conversation.contactName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900 truncate">{conversation.contactName}</h4>
                              <span className="text-xs text-gray-500">{getTimeAgo(conversation.lastMessage.createdAt)}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1 truncate">
                              {conversation.lastMessage.content}
                            </p>
                          </div>
                          {conversation.unreadCount > 0 && (
                            <Badge className="ml-2 bg-red-500 text-white hover:bg-red-500">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="border-gray-200 lg:col-span-2">
              {selectedConversation ? (
                <>
                  <CardHeader className="py-4 px-6 border-b border-gray-200">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarFallback className="bg-primary-200 text-primary-700">
                          {selectedConversationData?.contactName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-gray-900">{selectedConversationData?.contactName}</h3>
                        <p className="text-xs text-gray-500">Parent/Guardian</p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-4 h-[400px] overflow-y-auto">
                    <div className="space-y-4">
                      {selectedConversationData?.messages.map((msg, index) => (
                        <div 
                          key={index}
                          className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[70%] rounded-lg px-4 py-2 ${
                              msg.senderId === currentUserId 
                                ? 'bg-primary-100 text-primary-900' 
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <p>{msg.content}</p>
                            <p className={`text-xs mt-1 ${
                              msg.senderId === currentUserId 
                                ? 'text-primary-700' 
                                : 'text-gray-500'
                            }`}>
                              {getTimeAgo(msg.createdAt)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-4 border-t border-gray-200">
                    <div className="flex w-full space-x-2">
                      <Input
                        placeholder="Type your message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        className="flex-1"
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button 
                        onClick={handleSendMessage} 
                        className="bg-primary-600 hover:bg-primary-700"
                        disabled={!messageText.trim() || sendMessageMutation.isPending}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-20">
                  <div className="bg-gray-100 rounded-full p-4 mb-4">
                    <Send className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No Conversation Selected</h3>
                  <p className="text-gray-500 text-center max-w-md">
                    Select a conversation from the left to view messages or start a new conversation.
                  </p>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="announcements" className="m-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="border-gray-200">
                <CardHeader className="py-4 px-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800">All Announcements</h2>
                </CardHeader>
                
                <CardContent className="p-0">
                  {announcementsLoading ? (
                    <div className="py-10 text-center text-gray-500">Loading announcements...</div>
                  ) : announcements?.length === 0 ? (
                    <div className="py-10 text-center text-gray-500">No announcements found</div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {announcements?.map((announcement) => (
                        <div key={announcement.id} className="p-6">
                          <div className="flex items-center mb-2">
                            {getPriorityBadge(announcement.priority)}
                            <span className="ml-auto text-gray-500 text-xs">
                              {getTimeAgo(announcement.createdAt)}
                            </span>
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">{announcement.title}</h3>
                          <p className="text-gray-600">{announcement.content}</p>
                          <div className="flex justify-between items-center mt-4">
                            <div className="text-sm text-gray-500">
                              Posted by: Admin
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">Delete</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="border-gray-200">
                <CardHeader className="py-4 px-6 border-b border-gray-200">
                  <div className="flex items-center">
                    <Megaphone className="h-5 w-5 mr-2 text-primary-600" />
                    <h2 className="text-lg font-semibold text-gray-800">Create Announcement</h2>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <Input
                        id="title"
                        placeholder="Announcement title"
                        value={announcementTitle}
                        onChange={(e) => setAnnouncementTitle(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                        Content
                      </label>
                      <Textarea
                        id="content"
                        placeholder="Announcement content"
                        rows={5}
                        value={announcementContent}
                        onChange={(e) => setAnnouncementContent(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                      </label>
                      <Select value={announcementPriority} onValueChange={setAnnouncementPriority}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">General</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">Important</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        className="w-full bg-primary-600 hover:bg-primary-700"
                        onClick={handleCreateAnnouncement}
                        disabled={!announcementTitle.trim() || !announcementContent.trim() || createAnnouncementMutation.isPending}
                      >
                        {createAnnouncementMutation.isPending ? "Creating..." : "Create Announcement"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="m-0">
          <Card className="border-gray-200">
            <CardHeader className="py-4 px-6 border-b border-gray-200">
              <div className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-primary-600" />
                <h2 className="text-lg font-semibold text-gray-800">Notification Preferences</h2>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium text-gray-800 mb-4">Email Notifications</h3>
                  <div className="space-y-3">
                    {["New messages", "Student updates", "Announcements", "Calendar events", "System updates"].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-700">{item}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked={index < 3} className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base font-medium text-gray-800 mb-4">In-App Notifications</h3>
                  <div className="space-y-3">
                    {["Direct messages", "Mentions", "Assignment submissions", "Reminders", "System notifications"].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-700">{item}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base font-medium text-gray-800 mb-4">Communication Preferences</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="message-frequency" className="block text-sm font-medium text-gray-700 mb-1">
                        Message Digest Frequency
                      </label>
                      <Select defaultValue="daily">
                        <SelectTrigger id="message-frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realtime">Real-time</SelectItem>
                          <SelectItem value="daily">Daily Digest</SelectItem>
                          <SelectItem value="weekly">Weekly Summary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label htmlFor="quiet-hours" className="block text-sm font-medium text-gray-700 mb-1">
                        Quiet Hours
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <Select defaultValue="8pm">
                          <SelectTrigger id="quiet-hours-start">
                            <SelectValue placeholder="Start time" />
                          </SelectTrigger>
                          <SelectContent>
                            {["6pm", "7pm", "8pm", "9pm", "10pm"].map(time => (
                              <SelectItem key={time} value={time}>{time}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select defaultValue="7am">
                          <SelectTrigger id="quiet-hours-end">
                            <SelectValue placeholder="End time" />
                          </SelectTrigger>
                          <SelectContent>
                            {["5am", "6am", "7am", "8am", "9am"].map(time => (
                              <SelectItem key={time} value={time}>{time}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-4 border-t border-gray-200">
                <Button className="bg-primary-600 hover:bg-primary-700">
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
