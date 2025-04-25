import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  FileText,
  ChevronDown,
  Clock,
  Check,
  Edit,
  Download,
  PencilLine
} from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Curriculum } from "@shared/schema";

export default function CurriculumPage() {
  const [search, setSearch] = useState("");
  const [activeLevel, setActiveLevel] = useState("Level 1 - Pre A1");
  
  const { data: curriculum, isLoading } = useQuery<Curriculum[]>({
    queryKey: ["/api/curriculum"]
  });
  
  // Mock data for the UI structure to match the screenshot
  const mockLevels = [
    "Level 1 - Pre A1",
    "Level 2 - Pre A1",
    "L0 - Pre A1",
    "L1 Pre A1",
    "L2 Pre A1",
    "L3 A1",
    "L4 A1",
    "L5 A1"
  ];
  
  // ELS curriculum units by language skills for Pre A1 level
  const unitTopics = [
    { 
      title: "Basic Greetings and Introductions", 
      description: "Simple greetings, introductions, and basic social expressions for complete beginners"
    },
    { 
      title: "Alphabet and Pronunciation", 
      description: "Learning the alphabet, letter recognition, and basic sound patterns"
    },
    { 
      title: "Numbers and Counting", 
      description: "Cardinal numbers 1-20, asking about quantities, and basic counting skills"
    },
    { 
      title: "Personal Information", 
      description: "Sharing basic personal details, countries, nationalities and simple forms"
    },
    { 
      title: "Family and Friends", 
      description: "Describing immediate family members, possessives, and simple relationships"
    },
    { 
      title: "Colors and Classroom Objects", 
      description: "Basic vocabulary for colors, classroom items, and simple descriptive phrases"
    },
    { 
      title: "Daily Routines", 
      description: "Simple present tense verbs for everyday activities and basic time expressions"
    },
    { 
      title: "Food and Drink", 
      description: "Basic food vocabulary, expressing likes/dislikes, and ordering in simple situations"
    },
    { 
      title: "Places Around Town", 
      description: "Locations, prepositions of place, and asking for/giving basic directions"
    },
    { 
      title: "Simple Conversation", 
      description: "Basic question forms, conversation strategies, and simple responses"
    }
  ];
  
  // Generate lesson status randomly
  const getRandomStatus = () => {
    const statuses = ["published", "draft"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };
  
  // Generate random duration between 30-60 minutes
  const getRandomDuration = () => {
    return `${Math.floor(Math.random() * 31) + 30} min`;
  };
  
  // Generate random number of materials (1-5)
  const getRandomMaterials = () => {
    return Math.floor(Math.random() * 5) + 1;
  };
  
  // Generate lessons for each unit with specific ELS content
  const getLessonsForUnit = (unitIndex: number, unitTopic: any) => {
    // Different lesson types based on language teaching methodology
    const lessonTypes = [
      { type: "Vocabulary", focus: "Introduction and practice of new vocabulary." },
      { type: "Grammar", focus: "Basic grammatical structures and patterns." },
      { type: "Reading", focus: "Simple reading comprehension with visual support." },
      { type: "Listening", focus: "Audio comprehension with guided activities." },
      { type: "Speaking", focus: "Controlled speaking practice and dialogues." },
      { type: "Writing", focus: "Simple guided writing tasks." },
      { type: "Pronunciation", focus: "Sound recognition and production practice." },
      { type: "Integrated Skills", focus: "Combining multiple language skills." },
      { type: "Review", focus: "Consolidation of previously learned material." },
      { type: "Assessment", focus: "Simple evaluation activities." }
    ];
    
    return lessonTypes.map((lessonType, lessonIndex) => ({
      id: lessonIndex + 1,
      title: `Lesson ${lessonIndex + 1}: ${lessonType.type} - ${unitTopic.title}`,
      focus: lessonType.focus,
      duration: getRandomDuration(),
      materials: getRandomMaterials(),
      status: getRandomStatus()
    }));
  };
  
  // Generate 10 units with 10 lessons each
  const mockUnits = unitTopics.map((topic, unitIndex) => {
    return {
      id: unitIndex + 1,
      title: `Unit ${unitIndex + 1}: ${topic.title}`,
      description: topic.description + ` for Level 1 - Pre A1 students`,
      lessons: getLessonsForUnit(unitIndex, topic)
    };
  });
  
  const getLessonStatusBadge = (status: string) => {
    if (status === "published") {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">Published</Badge>;
    }
    return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs">Draft</Badge>;
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Curriculum</h1>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Content
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search curriculum..."
            className="pl-8 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      
      <div className="mb-8">
        <div className="border-b">
          <ul className="flex gap-2 md:gap-4 overflow-x-auto pb-2">
            {mockLevels.map((level) => (
              <li key={level}>
                <Button 
                  variant="ghost" 
                  className={`${activeLevel === level ? 'border-b-2 border-primary text-primary rounded-none' : 'text-muted-foreground'} px-3 py-2`}
                  onClick={() => setActiveLevel(level)}
                >
                  {level}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Level header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-xl font-bold">{activeLevel}</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <PencilLine className="h-4 w-4" />
              Edit Level
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Add Unit
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground">Beginner level for students with no prior knowledge</p>
      </div>
      
      {/* Units and lessons */}
      <div className="space-y-6 bg-background rounded-lg border">
        {mockUnits.map((unit) => (
          <Accordion type="single" collapsible key={unit.id} className="w-full">
            <AccordionItem value={`unit-${unit.id}`} className="border-none">
              <div className="flex items-center justify-between w-full px-4 py-3 hover:bg-muted/50 border-b">
                <AccordionTrigger className="flex-1 justify-start p-0">
                  <div className="font-medium">{unit.title}</div>
                </AccordionTrigger>
                <div className="flex gap-2 items-center">
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    <Edit className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Add Lesson
                  </Button>
                </div>
              </div>
              <AccordionContent className="px-6 pt-4 pb-2">
                <p className="text-muted-foreground mb-6">{unit.description}</p>
                
                <div className="space-y-4">
                  {unit.lessons.map((lesson) => (
                    <div key={lesson.id} className="border bg-card rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium">{lesson.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{lesson.focus}</p>
                            <div className="flex items-center text-xs text-muted-foreground mt-2 gap-4">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{lesson.duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FileText className="h-3.5 w-3.5" />
                                <span>{lesson.materials} materials</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getLessonStatusBadge(lesson.status)}
                          <Button variant="ghost" size="sm" className="h-8">
                            View
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
