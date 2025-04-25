import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  User, 
  Lock, 
  Bell, 
  Palette, 
  Key, 
  Mail, 
  Phone, 
  Upload, 
  Moon, 
  Sun, 
  Monitor
} from "lucide-react";

export default function SettingsPage() {
  const [tab, setTab] = useState("profile");
  const [theme, setTheme] = useState("light");
  const [colorScheme, setColorScheme] = useState("purple");
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your account settings and preferences</p>
      </div>
      
      <Tabs value={tab} onValueChange={setTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex flex-col items-center gap-3">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="bg-primary-100 text-primary-800 text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Upload className="h-3 w-3" />
                    Change Photo
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@teachpro.edu" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue="Science Teacher" readOnly className="bg-gray-50" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input id="contactEmail" type="email" defaultValue="john.personal@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" rows={3} defaultValue="123 Education Street, Teaching City, TC 12345" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea 
                  id="bio" 
                  rows={4} 
                  placeholder="Tell us about your teaching experience, specializations, and interests..."
                  defaultValue="Science teacher with 10+ years of experience specializing in chemistry and biology. Passionate about hands-on learning and incorporating technology into science education."
                />
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-primary-600 hover:bg-primary-700">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <h2 className="text-lg font-semibold text-gray-800">Teaching Preferences</h2>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Primary Subject</Label>
                  <Select defaultValue="science">
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade Level</Label>
                  <Select defaultValue="middle">
                    <SelectTrigger id="grade">
                      <SelectValue placeholder="Select grade level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="elementary">Elementary School</SelectItem>
                      <SelectItem value="middle">Middle School</SelectItem>
                      <SelectItem value="high">High School</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="classroom">Preferred Classroom</Label>
                  <Select defaultValue="102">
                    <SelectTrigger id="classroom">
                      <SelectValue placeholder="Select classroom" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="102">Room 102 (Science Lab)</SelectItem>
                      <SelectItem value="205">Room 205</SelectItem>
                      <SelectItem value="118">Room 118</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule">Preferred Schedule</Label>
                  <Select defaultValue="morning">
                    <SelectTrigger id="schedule">
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (8AM-12PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12PM-4PM)</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-primary-600 hover:bg-primary-700">Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <h2 className="text-lg font-semibold text-gray-800">Change Password</h2>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                  <p className="text-xs text-gray-500 mt-1">
                    Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-primary-600 hover:bg-primary-700">Update Password</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <h2 className="text-lg font-semibold text-gray-800">Two-Factor Authentication</h2>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Two-Factor Authentication</div>
                  <div className="text-sm text-gray-500">
                    Add an extra layer of security to your account by requiring a verification code.
                  </div>
                </div>
                <Switch id="twoFactorAuth" />
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <span className="font-medium">Email Authentication</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Receive verification codes via email.
                    </div>
                  </div>
                  <Switch id="emailAuth" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <span className="font-medium">SMS Authentication</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Receive verification codes via text message.
                    </div>
                  </div>
                  <Switch id="smsAuth" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Key className="h-5 w-5 text-gray-500" />
                      <span className="font-medium">Authenticator App</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Use an authenticator app for verification codes.
                    </div>
                  </div>
                  <Switch id="appAuth" />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-primary-600 hover:bg-primary-700">Save Security Settings</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <h2 className="text-lg font-semibold text-gray-800">Session Management</h2>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Current Session</div>
                      <div className="text-sm text-gray-500">
                        Chrome on macOS • New York, USA • Active Now
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Current
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Safari on iPad</div>
                      <div className="text-sm text-gray-500">
                        Chicago, USA • Last active 2 days ago
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Edge on Windows</div>
                      <div className="text-sm text-gray-500">
                        Boston, USA • Last active 5 days ago
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button variant="destructive">Sign Out All Devices</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <h2 className="text-lg font-semibold text-gray-800">Email Notifications</h2>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Messages</div>
                    <div className="text-sm text-gray-500">
                      Receive email notifications when you get a new message.
                    </div>
                  </div>
                  <Switch id="emailMessages" defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Student Updates</div>
                    <div className="text-sm text-gray-500">
                      Notifications about student activity and performance.
                    </div>
                  </div>
                  <Switch id="emailStudentUpdates" defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Announcements</div>
                    <div className="text-sm text-gray-500">
                      School-wide and department announcements.
                    </div>
                  </div>
                  <Switch id="emailAnnouncements" defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Calendar Events</div>
                    <div className="text-sm text-gray-500">
                      Reminders for upcoming classes and events.
                    </div>
                  </div>
                  <Switch id="emailCalendarEvents" />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">System Updates</div>
                    <div className="text-sm text-gray-500">
                      Information about platform changes and updates.
                    </div>
                  </div>
                  <Switch id="emailSystemUpdates" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <h2 className="text-lg font-semibold text-gray-800">In-App Notifications</h2>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Messages and Mentions</div>
                    <div className="text-sm text-gray-500">
                      Receive notifications for direct messages and mentions.
                    </div>
                  </div>
                  <Switch id="appMessages" defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Assignment Submissions</div>
                    <div className="text-sm text-gray-500">
                      Notifications when students submit assignments.
                    </div>
                  </div>
                  <Switch id="appAssignments" defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Reminders</div>
                    <div className="text-sm text-gray-500">
                      Task and calendar reminder notifications.
                    </div>
                  </div>
                  <Switch id="appReminders" defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">System Notifications</div>
                    <div className="text-sm text-gray-500">
                      Updates, maintenance, and other system messages.
                    </div>
                  </div>
                  <Switch id="appSystemNotifications" defaultChecked />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-primary-600 hover:bg-primary-700">Save Notification Settings</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <h2 className="text-lg font-semibold text-gray-800">Notification Schedule</h2>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="digestFrequency">Message Digest Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="digestFrequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Summary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Quiet Hours</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quietHoursStart" className="text-xs text-gray-500">Start Time</Label>
                      <Select defaultValue="8pm">
                        <SelectTrigger id="quietHoursStart">
                          <SelectValue placeholder="Start time" />
                        </SelectTrigger>
                        <SelectContent>
                          {["6pm", "7pm", "8pm", "9pm", "10pm"].map(time => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quietHoursEnd" className="text-xs text-gray-500">End Time</Label>
                      <Select defaultValue="7am">
                        <SelectTrigger id="quietHoursEnd">
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
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="weekendNotifications" className="cursor-pointer">
                      Pause Weekend Notifications
                    </Label>
                    <Switch id="weekendNotifications" />
                  </div>
                  <p className="text-xs text-gray-500">
                    Only critical notifications will be delivered on weekends
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-primary-600 hover:bg-primary-700">Save Schedule</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <h2 className="text-lg font-semibold text-gray-800">Theme</h2>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  variant={theme === "light" ? "default" : "outline"} 
                  className="flex flex-col items-center justify-center h-24 w-full gap-2"
                  onClick={() => setTheme("light")}
                >
                  <Sun className="h-8 w-8" />
                  <span>Light</span>
                </Button>
                
                <Button 
                  variant={theme === "dark" ? "default" : "outline"} 
                  className="flex flex-col items-center justify-center h-24 w-full gap-2"
                  onClick={() => setTheme("dark")}
                >
                  <Moon className="h-8 w-8" />
                  <span>Dark</span>
                </Button>
                
                <Button 
                  variant={theme === "system" ? "default" : "outline"} 
                  className="flex flex-col items-center justify-center h-24 w-full gap-2"
                  onClick={() => setTheme("system")}
                >
                  <Monitor className="h-8 w-8" />
                  <span>System</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <h2 className="text-lg font-semibold text-gray-800">Color Scheme</h2>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  variant={colorScheme === "purple" ? "default" : "outline"} 
                  className="flex flex-col items-center justify-center h-24 w-full gap-2 bg-primary-600 hover:bg-primary-700 text-white"
                  onClick={() => setColorScheme("purple")}
                >
                  <div className="h-4 w-4 rounded-full bg-white" />
                  <span>Purple</span>
                </Button>
                
                <Button 
                  variant={colorScheme === "blue" ? "default" : "outline"} 
                  className="flex flex-col items-center justify-center h-24 w-full gap-2 bg-secondary-600 hover:bg-secondary-700 text-white"
                  onClick={() => setColorScheme("blue")}
                >
                  <div className="h-4 w-4 rounded-full bg-white" />
                  <span>Blue</span>
                </Button>
                
                <Button 
                  variant={colorScheme === "green" ? "default" : "outline"} 
                  className="flex flex-col items-center justify-center h-24 w-full gap-2 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => setColorScheme("green")}
                >
                  <div className="h-4 w-4 rounded-full bg-white" />
                  <span>Green</span>
                </Button>
                
                <Button 
                  variant={colorScheme === "orange" ? "default" : "outline"} 
                  className="flex flex-col items-center justify-center h-24 w-full gap-2 bg-orange-600 hover:bg-orange-700 text-white"
                  onClick={() => setColorScheme("orange")}
                >
                  <div className="h-4 w-4 rounded-full bg-white" />
                  <span>Orange</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <h2 className="text-lg font-semibold text-gray-800">Display Options</h2>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="density">Layout Density</Label>
                  <Select defaultValue="comfortable">
                    <SelectTrigger id="density">
                      <SelectValue placeholder="Select density" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                      <SelectItem value="spacious">Spacious</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fontSize">Font Size</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="fontSize">
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="animations" className="cursor-pointer">
                      Interface Animations
                    </Label>
                    <Switch id="animations" defaultChecked />
                  </div>
                  <p className="text-xs text-gray-500">
                    Enable animations for a more dynamic interface
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="reducedMotion" className="cursor-pointer">
                      Reduce Motion
                    </Label>
                    <Switch id="reducedMotion" />
                  </div>
                  <p className="text-xs text-gray-500">
                    Decrease the amount of motion effects for accessibility
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-primary-600 hover:bg-primary-700">Save Display Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
