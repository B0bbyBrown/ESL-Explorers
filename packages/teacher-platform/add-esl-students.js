// Generate 50 ESL students across Pre-A1, A1, A2, B1, and B2 levels
import pg from 'pg';
const { Pool } = pg;

// Create a connection to the database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Define student data by language groups
const studentData = {
  // Spanish speaking
  spanish: {
    firstNames: ['Maria', 'Carlos', 'Sofia', 'Diego', 'Elena', 'Juan', 'Isabella', 'Miguel', 'Gabriela', 'Pablo'],
    lastNames: ['Garcia', 'Rodriguez', 'Sanchez', 'Martinez', 'Lopez', 'Fernandez', 'Gonzalez', 'Perez', 'Ramirez', 'Diaz'],
    guardianFirstNames: ['Ana', 'Jose', 'Carmen', 'Miguel', 'Laura', 'Antonio', 'Rosa', 'Francisco', 'Teresa', 'Alejandro'],
    note: 'Native Spanish speaker'
  },
  
  // Mandarin speaking
  mandarin: {
    firstNames: ['Wei', 'Li', 'Zhang', 'Yan', 'Ming', 'Lin', 'Hui', 'Jie', 'Chen', 'Xiu'],
    lastNames: ['Wang', 'Li', 'Zhang', 'Chen', 'Liu', 'Yang', 'Huang', 'Wu', 'Zhou', 'Sun'],
    guardianFirstNames: ['Wei', 'Ling', 'Yong', 'Mei', 'Jun', 'Hong', 'Ying', 'Tao', 'Ping', 'Jian'],
    note: 'Native Mandarin speaker'
  },
  
  // Arabic speaking
  arabic: {
    firstNames: ['Ahmed', 'Fatima', 'Mohammed', 'Aisha', 'Ali', 'Mariam', 'Yusuf', 'Layla', 'Omar', 'Zainab'],
    lastNames: ['Al-Farsi', 'Al-Rahman', 'Al-Said', 'Al-Mutawa', 'Al-Hashemi', 'Al-Dosari', 'Al-Suwaidi', 'Al-Mansoori', 'Al-Thani', 'Al-Nasser'],
    guardianFirstNames: ['Samir', 'Huda', 'Khalid', 'Amina', 'Tariq', 'Nadia', 'Ibrahim', 'Leila', 'Hassan', 'Fatiha'],
    note: 'Native Arabic speaker'
  },
  
  // Russian speaking
  russian: {
    firstNames: ['Ivan', 'Anastasia', 'Dmitri', 'Ekaterina', 'Sergei', 'Olga', 'Mikhail', 'Tatiana', 'Alexei', 'Natalia'],
    lastNames: ['Petrov', 'Ivanova', 'Smirnov', 'Kuznetsova', 'Popov', 'Sokolova', 'Lebedev', 'Novikova', 'Kozlov', 'Morozova'],
    guardianFirstNames: ['Vladimir', 'Svetlana', 'Andrei', 'Irina', 'Nikolai', 'Elena', 'Yuri', 'Marina', 'Boris', 'Galina'],
    note: 'Native Russian speaker'
  },
  
  // Japanese speaking
  japanese: {
    firstNames: ['Takashi', 'Yuki', 'Hiroshi', 'Aiko', 'Kenji', 'Haruka', 'Daiki', 'Sakura', 'Kazuki', 'Misaki'],
    lastNames: ['Tanaka', 'Suzuki', 'Sato', 'Watanabe', 'Takahashi', 'Yamamoto', 'Nakamura', 'Kobayashi', 'Kato', 'Ito'],
    guardianFirstNames: ['Hiroki', 'Yumiko', 'Toshiro', 'Naomi', 'Akira', 'Emi', 'Kenta', 'Yui', 'Satoshi', 'Aya'],
    note: 'Native Japanese speaker'
  }
};

// ESL levels with their characteristics
const eslLevels = [
  { grade: 'Pre-A1', classId: 'Pre-A1', description: 'Beginner English learner' },
  { grade: 'A1', classId: 'A1', description: 'Elementary English learner' },
  { grade: 'A2', classId: 'A2', description: 'Pre-intermediate English learner' },
  { grade: 'B1', classId: 'B1', description: 'Intermediate English learner' },
  { grade: 'B2', classId: 'B2', description: 'Upper-intermediate English learner' }
];

// Generate a random number between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Pick a random item from an array
function getRandomItem(array) {
  return array[getRandomInt(0, array.length - 1)];
}

// Generate a random phone number
function generatePhoneNumber() {
  return `555-${getRandomInt(100, 999)}-${getRandomInt(1000, 9999)}`;
}

// Generate random attendance rate (80-100)
function generateAttendanceRate() {
  return getRandomInt(80, 100);
}

// Generate random performance grade
function generatePerformanceGrade() {
  const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C'];
  return getRandomItem(grades);
}

// Create an array of 50 student records
async function generateStudents() {
  const students = [];
  const languages = Object.keys(studentData);
  const totalStudents = 50;
  
  // Number of students per level, starting with more at lower levels
  const levelDistribution = [12, 14, 10, 8, 6]; // Pre-A1, A1, A2, B1, B2
  
  let studentCount = 0;
  for (let i = 0; i < levelDistribution.length; i++) {
    const level = eslLevels[i];
    const studentsForLevel = levelDistribution[i];
    
    for (let j = 0; j < studentsForLevel; j++) {
      const language = languages[studentCount % languages.length];
      const languageData = studentData[language];
      
      const firstName = getRandomItem(languageData.firstNames);
      const lastName = getRandomItem(languageData.lastNames);
      const guardianFirstName = getRandomItem(languageData.guardianFirstNames);
      
      students.push({
        full_name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@student.edu`,
        grade: level.grade,
        class_id: level.classId,
        guardian_name: `${guardianFirstName} ${lastName}`,
        guardian_contact: generatePhoneNumber(),
        attendance_rate: generateAttendanceRate(),
        performance_grade: generatePerformanceGrade(),
        notes: `${level.description}, ${languageData.note}`
      });
      
      studentCount++;
    }
  }
  
  return students;
}

// Add the students to the database
async function addStudents() {
  try {
    const students = await generateStudents();
    
    console.log(`Generating ${students.length} ESL students...`);
    
    // Check if we already have students to avoid duplicating them
    const { rows } = await pool.query('SELECT COUNT(*) FROM students');
    const existingCount = parseInt(rows[0].count);
    
    if (existingCount > 4) { // We already have our original 4 ESL students
      console.log('Students already exist in the database. Skipping insertion to avoid duplicates.');
      return;
    }
    
    // Insert the students in batches
    const batchSize = 10;
    for (let i = 0; i < students.length; i += batchSize) {
      const batch = students.slice(i, i + batchSize);
      
      // Create the query placeholders and values
      const placeholders = batch.map((_, index) => {
        const offset = index * 9;
        return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6}, $${offset + 7}, $${offset + 8}, $${offset + 9})`;
      }).join(', ');
      
      const values = batch.flatMap(student => [
        student.full_name,
        student.email,
        student.grade,
        student.class_id,
        student.guardian_name,
        student.guardian_contact,
        student.attendance_rate,
        student.performance_grade,
        student.notes
      ]);
      
      // Execute the batch insert
      const query = `
        INSERT INTO students (full_name, email, grade, class_id, guardian_name, guardian_contact, attendance_rate, performance_grade, notes)
        VALUES ${placeholders}
        RETURNING id
      `;
      
      const result = await pool.query(query, values);
      console.log(`Inserted batch of ${result.rowCount} students`);
    }
    
    console.log('Successfully added all students!');
    
  } catch (error) {
    console.error('Error adding students:', error);
  } finally {
    pool.end();
  }
}

// Run the script
addStudents();