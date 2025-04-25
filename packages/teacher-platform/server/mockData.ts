export const mockData = {
  students: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      grade: "10th",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      grade: "11th",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  lessons: [
    {
      id: 1,
      title: "Introduction to ESL",
      description: "Basic ESL concepts",
      subject: "English",
      classId: "ESL101",
      date: new Date().toISOString().split("T")[0],
      startTime: "09:00",
      endTime: "10:30",
      location: "Room 101",
      status: "upcoming",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Advanced Grammar",
      description: "Complex sentence structures",
      subject: "English",
      classId: "ESL102",
      date: new Date().toISOString().split("T")[0],
      startTime: "11:00",
      endTime: "12:30",
      location: "Room 102",
      status: "upcoming",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  curriculum: [
    {
      id: 1,
      title: "ESL Basics",
      description: "Fundamental ESL curriculum",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  events: [
    {
      id: 1,
      title: "ESL Workshop",
      description: "Interactive ESL workshop",
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  messages: [
    {
      id: 1,
      content: "Welcome to ESL class!",
      senderId: 1,
      receiverId: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  announcements: [
    {
      id: 1,
      title: "Welcome Announcement",
      content: "Welcome to the new semester!",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  tasks: [
    {
      id: 1,
      title: "First Assignment",
      description: "Complete the introduction exercise",
      completed: false,
      dueDate: new Date(Date.now() + 86400000).toISOString().split("T")[0], // Tomorrow
      userId: 1,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Grade Student Essays",
      description: "Review and grade the latest student essays",
      completed: true,
      dueDate: new Date().toISOString().split("T")[0], // Today
      userId: 1,
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      title: "Prepare Lesson Plan",
      description: "Create a detailed lesson plan for next week",
      completed: false,
      dueDate: new Date(Date.now() + 172800000).toISOString().split("T")[0], // Day after tomorrow
      userId: 1,
      createdAt: new Date().toISOString(),
    },
  ],
  materials: [
    {
      id: 1,
      title: "ESL Textbook",
      description: "Basic ESL textbook",
      url: "https://example.com/textbook",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  bookmarks: [
    {
      id: 1,
      userId: 1,
      resourceId: 1,
      resourceType: "lesson",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};
