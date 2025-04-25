import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  GridIcon, 
  List as ListIcon,
  Folder,
  Star,
  StarOff,
  MoreVertical,
  ExternalLink,
  Trash2,
  FolderPlus
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookmark } from "@shared/schema";

type ViewMode = "grid" | "list";
type BookmarkFolder = "all" | "teaching" | "research" | "personal" | "unfiled";

export default function BookmarksPage() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [currentFolder, setCurrentFolder] = useState<BookmarkFolder>("all");
  const [starredFilter, setStarredFilter] = useState(false);
  
  const { data: bookmarks, isLoading } = useQuery<Bookmark[]>({
    queryKey: ["/api/bookmarks/1"] // Assuming current user ID is 1
  });
  
  // Filter bookmarks based on search, folder, and starred status
  const filteredBookmarks = bookmarks?.filter(bookmark => 
    bookmark.title.toLowerCase().includes(search.toLowerCase()) &&
    (currentFolder === "all" || bookmark.category === currentFolder) &&
    (!starredFilter || bookmark.id % 3 === 0) // Mock starred status for demo
  ) || [];
  
  // Folder colors for visual distinction
  const getFolderColor = (folder: BookmarkFolder) => {
    switch (folder) {
      case "teaching":
        return "text-blue-600 bg-blue-100 border-blue-200";
      case "research":
        return "text-purple-600 bg-purple-100 border-purple-200";
      case "personal":
        return "text-green-600 bg-green-100 border-green-200";
      case "unfiled":
        return "text-gray-600 bg-gray-100 border-gray-200";
      default:
        return "text-primary-600 bg-primary-100 border-primary-200";
    }
  };
  
  const folders: { id: BookmarkFolder; name: string; count: number }[] = [
    { id: "all", name: "All Bookmarks", count: bookmarks?.length || 0 },
    { id: "teaching", name: "Teaching Materials", count: bookmarks?.filter(b => b.category === "teaching").length || 0 },
    { id: "research", name: "Research Resources", count: bookmarks?.filter(b => b.category === "research").length || 0 },
    { id: "personal", name: "Personal Resources", count: bookmarks?.filter(b => b.category === "personal").length || 0 },
    { id: "unfiled", name: "Unfiled Bookmarks", count: bookmarks?.filter(b => !b.category || b.category === "unfiled").length || 0 },
  ];
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookmarks</h1>
          <p className="text-gray-500">Your saved educational resources</p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <Button variant="outline" className="flex items-center">
            <FolderPlus className="h-4 w-4 mr-2" />
            New Folder
          </Button>
          <Button className="bg-primary-600 hover:bg-primary-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Bookmark
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Folders sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-gray-200">
            <CardHeader className="py-4 px-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Folders</h2>
            </CardHeader>
            <CardContent className="p-0">
              <div className="py-1">
                {folders.map((folder) => (
                  <Button
                    key={folder.id}
                    variant="ghost"
                    className={`w-full justify-start rounded-none px-6 py-3 ${currentFolder === folder.id ? 'bg-gray-100' : ''}`}
                    onClick={() => setCurrentFolder(folder.id)}
                  >
                    <Folder className="h-4 w-4 mr-3" />
                    <span className="flex-1 text-left">{folder.name}</span>
                    <Badge variant="secondary" className="ml-2">
                      {folder.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-4">
            <Button
              variant={starredFilter ? "secondary" : "outline"}
              className="w-full flex items-center"
              onClick={() => setStarredFilter(!starredFilter)}
            >
              <Star className={`h-4 w-4 mr-2 ${starredFilter ? 'text-yellow-500' : ''}`} />
              {starredFilter ? "Showing Starred" : "Show Starred"}
            </Button>
          </div>
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-3">
          <Card className="border-gray-200">
            <CardHeader className="py-4 px-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search bookmarks..."
                    className="pl-8 w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="border rounded-md flex">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="sm"
                    className="rounded-r-none border-r"
                    onClick={() => setViewMode("grid")}
                  >
                    <GridIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="sm"
                    className="rounded-l-none"
                    onClick={() => setViewMode("list")}
                  >
                    <ListIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              {isLoading ? (
                <div className="text-center py-8 text-gray-500">Loading bookmarks...</div>
              ) : filteredBookmarks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No bookmarks found</div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredBookmarks.map((bookmark) => {
                    const isStarred = bookmark.id % 3 === 0; // Mock starred status for demo
                    const folderColor = getFolderColor(bookmark.category as BookmarkFolder || "unfiled");
                    
                    return (
                      <div key={bookmark.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className={`h-3 ${folderColor}`}></div>
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-gray-900 mb-2 line-clamp-1">{bookmark.title}</h3>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-yellow-500"
                              onClick={() => {/* Toggle star in real app */}}
                            >
                              {isStarred ? <Star className="h-4 w-4 fill-yellow-400" /> : <StarOff className="h-4 w-4" />}
                            </Button>
                          </div>
                          <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 line-clamp-1 mb-3 hover:text-primary-600 flex items-center">
                            {bookmark.url}
                            <ExternalLink className="h-3 w-3 ml-1 inline" />
                          </a>
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className="text-xs capitalize">
                              {bookmark.category || "unfiled"}
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Open Link
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FolderPlus className="h-4 w-4 mr-2" />
                                  Move to Folder
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  {isStarred ? (
                                    <>
                                      <StarOff className="h-4 w-4 mr-2" />
                                      Remove Star
                                    </>
                                  ) : (
                                    <>
                                      <Star className="h-4 w-4 mr-2" />
                                      Add Star
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600 focus:text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredBookmarks.map((bookmark) => {
                    const isStarred = bookmark.id % 3 === 0; // Mock starred status for demo
                    
                    return (
                      <div key={bookmark.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow flex items-center">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-yellow-500 mr-3"
                          onClick={() => {/* Toggle star in real app */}}
                        >
                          {isStarred ? <Star className="h-4 w-4 fill-yellow-400" /> : <StarOff className="h-4 w-4" />}
                        </Button>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">{bookmark.title}</h3>
                          <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 truncate hover:text-primary-600 flex items-center">
                            {bookmark.url}
                            <ExternalLink className="h-3 w-3 ml-1 inline" />
                          </a>
                        </div>
                        <div className="flex items-center ml-4">
                          <Badge variant="outline" className="text-xs capitalize mr-2">
                            {bookmark.category || "unfiled"}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Open Link
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FolderPlus className="h-4 w-4 mr-2" />
                                Move to Folder
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                {isStarred ? (
                                  <>
                                    <StarOff className="h-4 w-4 mr-2" />
                                    Remove Star
                                  </>
                                ) : (
                                  <>
                                    <Star className="h-4 w-4 mr-2" />
                                    Add Star
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
