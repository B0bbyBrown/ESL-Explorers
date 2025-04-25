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
  Download,
  ExternalLink,
  Star,
  Bookmark,
  MoreVertical,
  Folder,
  FileText,
  Video,
  Image,
  Link as LinkIcon,
  Filter
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Material } from "@shared/schema";

type ViewMode = "grid" | "list";
type CategoryFilter = "all" | "documents" | "videos" | "images" | "links" | "other";

export default function MaterialsPage() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  
  const { data: materials, isLoading } = useQuery<Material[]>({
    queryKey: ["/api/materials"]
  });
  
  // Filter materials based on search and category
  const filteredMaterials = materials?.filter(material => 
    material.title.toLowerCase().includes(search.toLowerCase()) &&
    (categoryFilter === "all" || getCategoryFromUrl(material.url) === categoryFilter)
  ) || [];
  
  // Helper function to determine category from URL
  const getCategoryFromUrl = (url: string): CategoryFilter => {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.endsWith('.pdf') || lowerUrl.endsWith('.doc') || lowerUrl.endsWith('.docx')) {
      return "documents";
    } else if (lowerUrl.endsWith('.mp4') || lowerUrl.endsWith('.avi') || lowerUrl.includes('youtube.com') || lowerUrl.includes('vimeo.com')) {
      return "videos";
    } else if (lowerUrl.endsWith('.jpg') || lowerUrl.endsWith('.png') || lowerUrl.endsWith('.gif')) {
      return "images";
    } else if (lowerUrl.startsWith('http') || lowerUrl.startsWith('www')) {
      return "links";
    } else {
      return "other";
    }
  };
  
  // Get category icon
  const getCategoryIcon = (category: CategoryFilter) => {
    switch (category) {
      case "documents":
        return <FileText className="h-5 w-5" />;
      case "videos":
        return <Video className="h-5 w-5" />;
      case "images":
        return <Image className="h-5 w-5" />;
      case "links":
        return <LinkIcon className="h-5 w-5" />;
      default:
        return <Folder className="h-5 w-5" />;
    }
  };
  
  // Get color based on category
  const getCategoryColor = (category: CategoryFilter) => {
    switch (category) {
      case "documents":
        return "text-blue-600 bg-blue-100";
      case "videos":
        return "text-purple-600 bg-purple-100";
      case "images":
        return "text-green-600 bg-green-100";
      case "links":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };
  
  const categories = [
    { id: "all", label: "All Materials", icon: Folder },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "videos", label: "Videos", icon: Video },
    { id: "images", label: "Images", icon: Image },
    { id: "links", label: "Links", icon: LinkIcon },
    { id: "other", label: "Other", icon: Folder },
  ];
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Educational Materials</h1>
          <p className="text-gray-500">Browse and manage your teaching resources</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="bg-primary-600 hover:bg-primary-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Upload Material
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories sidebar */}
        <div className="hidden lg:block">
          <Card className="border-gray-200">
            <CardHeader className="py-4 px-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
            </CardHeader>
            <CardContent className="p-3">
              <div className="space-y-1">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={categoryFilter === category.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setCategoryFilter(category.id as CategoryFilter)}
                  >
                    <category.icon className="h-4 w-4 mr-2" />
                    {category.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200 mt-6">
            <CardHeader className="py-4 px-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Storage</h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Used</span>
                    <span className="text-gray-900 font-medium">4.8 GB of 10 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '48%' }}></div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span>Documents</span>
                    </span>
                    <span className="font-medium">2.1 GB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      <span>Videos</span>
                    </span>
                    <span className="font-medium">1.9 GB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span>Images</span>
                    </span>
                    <span className="font-medium">0.6 GB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                      <span>Other</span>
                    </span>
                    <span className="font-medium">0.2 GB</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-3">
          <Card className="border-gray-200">
            <CardHeader className="py-4 px-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search materials..."
                    className="pl-8 w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="lg:hidden">
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Filter className="h-4 w-4 mr-1" />
                      Filter
                    </Button>
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
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              {isLoading ? (
                <div className="text-center py-8 text-gray-500">Loading materials...</div>
              ) : filteredMaterials.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No materials found</div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMaterials.map((material) => {
                    const category = getCategoryFromUrl(material.url);
                    const categoryColorClass = getCategoryColor(category);
                    
                    return (
                      <div key={material.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className={`h-36 flex items-center justify-center ${categoryColorClass}`}>
                          {getCategoryIcon(category)}
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-gray-900 mb-1">{material.title}</h3>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Bookmark className="h-4 w-4 mr-2" />
                                  Bookmark
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Star className="h-4 w-4 mr-2" />
                                  Add to Favorites
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600 focus:text-red-600">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <p className="text-sm text-gray-500 line-clamp-2 mb-2">{material.description}</p>
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className="text-xs">
                              {material.category}
                            </Badge>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredMaterials.map((material) => {
                    const category = getCategoryFromUrl(material.url);
                    const categoryColorClass = getCategoryColor(category);
                    
                    return (
                      <div key={material.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${categoryColorClass}`}>
                          {getCategoryIcon(category)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900">{material.title}</h3>
                          <p className="text-sm text-gray-500 truncate">{material.description}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Badge variant="outline" className="text-xs">
                            {material.category}
                          </Badge>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Star className="h-4 w-4 mr-2" />
                                Add to Favorites
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Open
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600 focus:text-red-600">Delete</DropdownMenuItem>
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
