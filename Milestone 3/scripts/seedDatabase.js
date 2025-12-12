const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Professor = require('../models/Professor');
const Course = require('../models/Course');
const User = require('../models/User');
const Review = require('../models/Review');

// Load env vars
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Sample data from Milestone 2 mockData
const professors = [
  {
    firstName: 'Mohamed',
    lastName: 'Shalan',
    email: 'mshalan@aucegypt.edu',
    title: 'Professor',
    department: 'csce',
    departmentName: 'Computer Science & Engineering',
    courses: ['CSCE 2301', 'CSCE 4301'],
    overallRating: 4.7,
    totalReviews: 156,
    ratings: {
      clarity: 4.8,
      helpfulness: 4.6,
      engagement: 4.7,
      grading: 4.5,
      workload: 3.8,
      communication: 4.9,
    },
    tags: ['Helpful', 'Clear Explanations', 'Fair Grader', 'Engaging Lectures'],
  },
  {
    firstName: 'Slim',
    lastName: 'Abdennadher',
    email: 'slim@aucegypt.edu',
    title: 'Professor',
    department: 'csce',
    departmentName: 'Computer Science & Engineering',
    courses: ['CSCE 2101', 'CSCE 3301'],
    overallRating: 4.5,
    totalReviews: 203,
    ratings: {
      clarity: 4.4,
      helpfulness: 4.7,
      engagement: 4.6,
      grading: 4.3,
      workload: 3.5,
      communication: 4.5,
    },
    tags: ['Knowledgeable', 'Challenging', 'Accessible Office Hours'],
  },
  {
    firstName: 'Cherif',
    lastName: 'Salama',
    email: 'cherif@aucegypt.edu',
    title: 'Associate Professor',
    department: 'csce',
    departmentName: 'Computer Science & Engineering',
    courses: ['CSCE 2201', 'CSCE 4201'],
    overallRating: 4.3,
    totalReviews: 89,
    ratings: {
      clarity: 4.2,
      helpfulness: 4.5,
      engagement: 4.1,
      grading: 4.4,
      workload: 3.9,
      communication: 4.3,
    },
    tags: ['Industry Experience', 'Practical Examples', 'Fair Exams'],
  },
  {
    firstName: 'Amr',
    lastName: 'El-Kadi',
    email: 'elkadi@aucegypt.edu',
    title: 'Assistant Professor',
    department: 'csce',
    departmentName: 'Computer Science & Engineering',
    courses: ['CSCE 1001', 'CSCE 2302'],
    overallRating: 4.6,
    totalReviews: 124,
    ratings: {
      clarity: 4.7,
      helpfulness: 4.8,
      engagement: 4.5,
      grading: 4.6,
      workload: 4.0,
      communication: 4.6,
    },
    tags: ['Patient', 'Encouraging', 'Good for Beginners'],
  },
  {
    firstName: 'Mervat',
    lastName: 'Abu-Elkheir',
    email: 'mervat@aucegypt.edu',
    title: 'Associate Professor',
    department: 'csce',
    departmentName: 'Computer Science & Engineering',
    courses: ['CSCE 3401', 'CSCE 4501'],
    overallRating: 4.4,
    totalReviews: 98,
    ratings: {
      clarity: 4.3,
      helpfulness: 4.5,
      engagement: 4.4,
      grading: 4.2,
      workload: 3.7,
      communication: 4.6,
    },
    tags: ['Research-Focused', 'Helpful Feedback', 'Interesting Projects'],
  },
  {
    firstName: 'Sarah',
    lastName: 'Ahmed',
    email: 'sarah.ahmed@aucegypt.edu',
    title: 'Professor',
    department: 'busn',
    departmentName: 'Business Administration',
    courses: ['BUSN3001', 'BUSN4101'],
    overallRating: 4.5,
    totalReviews: 76,
    ratings: {
      clarity: 4.6,
      helpfulness: 4.7,
      engagement: 4.3,
      grading: 4.4,
      workload: 3.6,
      communication: 4.8,
    },
    tags: ['Case Studies', 'Industry Insights', 'Fair Exams'],
  },
  {
    firstName: 'Omar',
    lastName: 'Farouk',
    email: 'omar.farouk@aucegypt.edu',
    title: 'Associate Professor',
    department: 'engr',
    departmentName: 'Engineering',
    courses: ['ENGR2101', 'ENGR3201'],
    overallRating: 4.2,
    totalReviews: 54,
    ratings: {
      clarity: 4.1,
      helpfulness: 4.3,
      engagement: 4.0,
      grading: 4.2,
      workload: 3.9,
      communication: 4.4,
    },
    tags: ['Hands-on Labs', 'Supportive', 'Clear Rubrics'],
  },
  {
    firstName: 'Layla',
    lastName: 'Mansour',
    email: 'layla.mansour@aucegypt.edu',
    title: 'Assistant Professor',
    department: 'econ',
    departmentName: 'Economics',
    courses: ['ECON2011', 'ECON3301'],
    overallRating: 4.4,
    totalReviews: 68,
    ratings: {
      clarity: 4.5,
      helpfulness: 4.4,
      engagement: 4.2,
      grading: 4.3,
      workload: 3.5,
      communication: 4.6,
    },
    tags: ['Data-Driven', 'Challenging', 'Great Feedback'],
  },
  {
    firstName: 'Karim',
    lastName: 'Nassar',
    email: 'karim.nassar@aucegypt.edu',
    title: 'Professor',
    department: 'phys',
    departmentName: 'Physics',
    courses: ['PHYS1011', 'PHYS2101'],
    overallRating: 4.1,
    totalReviews: 59,
    ratings: {
      clarity: 4.0,
      helpfulness: 4.2,
      engagement: 4.1,
      grading: 4.0,
      workload: 3.7,
      communication: 4.3,
    },
    tags: ['Conceptual', 'Strong Examples', 'Fair Grader'],
  },
  {
    firstName: 'Dina',
    lastName: 'Salim',
    email: 'dina.salim@aucegypt.edu',
    title: 'Lecturer',
    department: 'rhet',
    departmentName: 'Rhetoric & Composition',
    courses: ['RHET1010', 'RHET1020'],
    overallRating: 4.6,
    totalReviews: 82,
    ratings: {
      clarity: 4.7,
      helpfulness: 4.6,
      engagement: 4.5,
      grading: 4.4,
      workload: 3.4,
      communication: 4.8,
    },
    tags: ['Great Feedback', 'Engaging Discussions', 'Organized'],
  },
];

const courses = [
  {
    code: 'CSCE2301',
    name: 'Digital Logic Design',
    department: 'csce',
    departmentName: 'Computer Science & Engineering',
    credits: 3,
    description:
      'Introduction to digital systems, Boolean algebra, combinational and sequential logic circuits.',
    overallRating: 4.5,
    totalReviews: 87,
    ratings: {
      difficulty: 3.8,
      workload: 4.0,
      usefulness: 4.7,
      contentQuality: 4.6,
    },
    tags: ['Hardware', 'Lab-Heavy', 'Foundational'],
  },
  {
    code: 'CSCE2101',
    name: 'Data Structures',
    department: 'csce',
    departmentName: 'Computer Science & Engineering',
    credits: 3,
    description:
      'Fundamental data structures including arrays, linked lists, trees, graphs, and hash tables.',
    overallRating: 4.3,
    totalReviews: 145,
    ratings: {
      difficulty: 4.2,
      workload: 4.5,
      usefulness: 4.9,
      contentQuality: 4.4,
    },
    tags: ['Programming', 'Essential', 'Problem Solving'],
  },
  {
    code: 'CSCE2201',
    name: 'Computer Organization',
    department: 'csce',
    departmentName: 'Computer Science & Engineering',
    credits: 3,
    description:
      'Computer architecture, assembly language programming, memory hierarchy, and I/O systems.',
    overallRating: 4.1,
    totalReviews: 72,
    ratings: {
      difficulty: 4.0,
      workload: 3.8,
      usefulness: 4.5,
      contentQuality: 4.2,
    },
    tags: ['Low-Level', 'Assembly', 'Hardware-Software Interface'],
  },
  {
    code: 'CSCE1001',
    name: 'Introduction to Computing',
    department: 'csce',
    departmentName: 'Computer Science & Engineering',
    credits: 3,
    description:
      'Introduction to programming concepts using Python. No prior experience required.',
    overallRating: 4.6,
    totalReviews: 234,
    ratings: {
      difficulty: 2.5,
      workload: 3.0,
      usefulness: 4.4,
      contentQuality: 4.5,
    },
    tags: ['Beginner-Friendly', 'Python', 'No Prerequisites'],
  },
  {
    code: 'CSCE3401',
    name: 'Database Systems',
    department: 'csce',
    departmentName: 'Computer Science & Engineering',
    credits: 3,
    description:
      'Relational database design, SQL, normalization, transaction management, and query optimization.',
    overallRating: 4.4,
    totalReviews: 95,
    ratings: {
      difficulty: 3.5,
      workload: 3.8,
      usefulness: 4.8,
      contentQuality: 4.5,
    },
    tags: ['SQL', 'Practical', 'Industry-Relevant'],
  },
  {
    code: 'BUSN3001',
    name: 'Business Strategy',
    department: 'busn',
    departmentName: 'Business Administration',
    credits: 3,
    description: 'Foundations of strategy, competitive advantage, and case analysis.',
    overallRating: 4.5,
    totalReviews: 52,
    ratings: {
      difficulty: 3.2,
      workload: 3.6,
      usefulness: 4.8,
      contentQuality: 4.6,
    },
    tags: ['Cases', 'Teamwork', 'Practical'],
  },
  {
    code: 'BUSN4101',
    name: 'Operations Management',
    department: 'busn',
    departmentName: 'Business Administration',
    credits: 3,
    description: 'Process analysis, supply chain, quality management, and forecasting.',
    overallRating: 4.3,
    totalReviews: 41,
    ratings: {
      difficulty: 3.4,
      workload: 3.7,
      usefulness: 4.5,
      contentQuality: 4.4,
    },
    tags: ['Quantitative', 'Real-World', 'Simulations'],
  },
  {
    code: 'ENGR2101',
    name: 'Statics and Mechanics',
    department: 'engr',
    departmentName: 'Engineering',
    credits: 3,
    description: 'Forces, equilibrium, structures, and introductory mechanics.',
    overallRating: 4.1,
    totalReviews: 38,
    ratings: {
      difficulty: 3.9,
      workload: 3.8,
      usefulness: 4.3,
      contentQuality: 4.2,
    },
    tags: ['Problem-Solving', 'Math Heavy', 'Clear Notes'],
  },
  {
    code: 'ENGR3201',
    name: 'Materials Science',
    department: 'engr',
    departmentName: 'Engineering',
    credits: 3,
    description: 'Material properties, microstructure, and engineering applications.',
    overallRating: 4.2,
    totalReviews: 33,
    ratings: {
      difficulty: 3.6,
      workload: 3.5,
      usefulness: 4.4,
      contentQuality: 4.3,
    },
    tags: ['Labs', 'Visual', 'Project'],
  },
  {
    code: 'ECON2011',
    name: 'Principles of Economics',
    department: 'econ',
    departmentName: 'Economics',
    credits: 3,
    description: 'Micro and macro fundamentals with applications and data.',
    overallRating: 4.4,
    totalReviews: 64,
    ratings: {
      difficulty: 3.2,
      workload: 3.3,
      usefulness: 4.6,
      contentQuality: 4.5,
    },
    tags: ['Data', 'Discussions', 'Accessible'],
  },
  {
    code: 'ECON3301',
    name: 'Econometrics',
    department: 'econ',
    departmentName: 'Economics',
    credits: 3,
    description: 'Statistical techniques for economic data, regression, and inference.',
    overallRating: 4.2,
    totalReviews: 42,
    ratings: {
      difficulty: 3.8,
      workload: 3.7,
      usefulness: 4.7,
      contentQuality: 4.3,
    },
    tags: ['Quantitative', 'Software', 'Project-Based'],
  },
  {
    code: 'PHYS1011',
    name: 'General Physics I',
    department: 'phys',
    departmentName: 'Physics',
    credits: 3,
    description: 'Mechanics, motion, energy, and introductory physics principles.',
    overallRating: 4.1,
    totalReviews: 58,
    ratings: {
      difficulty: 3.7,
      workload: 3.6,
      usefulness: 4.3,
      contentQuality: 4.2,
    },
    tags: ['Conceptual', 'Problem Sets', 'Labs'],
  },
  {
    code: 'PHYS2101',
    name: 'Electricity and Magnetism',
    department: 'phys',
    departmentName: 'Physics',
    credits: 3,
    description: 'Electric fields, circuits, magnetism, and Maxwell’s equations (intro).',
    overallRating: 4.0,
    totalReviews: 44,
    ratings: {
      difficulty: 3.9,
      workload: 3.8,
      usefulness: 4.2,
      contentQuality: 4.1,
    },
    tags: ['Challenging', 'Math Heavy', 'Labs'],
  },
  {
    code: 'RHET1010',
    name: 'Rhetoric and Composition I',
    department: 'rhet',
    departmentName: 'Rhetoric & Composition',
    credits: 3,
    description: 'Academic writing, critical reading, and argument development.',
    overallRating: 4.6,
    totalReviews: 78,
    ratings: {
      difficulty: 2.8,
      workload: 3.2,
      usefulness: 4.7,
      contentQuality: 4.6,
    },
    tags: ['Writing', 'Feedback', 'Workshops'],
  },
  {
    code: 'RHET1020',
    name: 'Rhetoric and Composition II',
    department: 'rhet',
    departmentName: 'Rhetoric & Composition',
    credits: 3,
    description: 'Advanced composition, research skills, and presentation practice.',
    overallRating: 4.5,
    totalReviews: 69,
    ratings: {
      difficulty: 3.0,
      workload: 3.3,
      usefulness: 4.6,
      contentQuality: 4.5,
    },
    tags: ['Research', 'Presentation', 'Peer Review'],
  },
];

// Department catalog for generating additional data
const departmentsCatalog = [
  { code: 'csce', name: 'Computer Science & Engineering' },
  { code: 'busn', name: 'Business Administration' },
  { code: 'engr', name: 'Engineering' },
  { code: 'econ', name: 'Economics' },
  { code: 'phys', name: 'Physics' },
  { code: 'rhet', name: 'Rhetoric & Composition' },
  { code: 'mact', name: 'Mathematics' },
  { code: 'aric', name: 'Arabic Studies' },
];

const firstNames = [
  'Omar',
  'Aya',
  'Youssef',
  'Sara',
  'Hassan',
  'Mina',
  'Farah',
  'Karim',
  'Laila',
  'Nour',
  'Mostafa',
  'Mariam',
  'Rania',
  'Amr',
  'Heba',
  'Mahmoud',
  'Dina',
  'Tarek',
  'Nadia',
  'Sherif',
];

const lastNames = [
  'Hassan',
  'Mahmoud',
  'Khaled',
  'El-Shafei',
  'Gamal',
  'Ibrahim',
  'Salim',
  'Nassar',
  'Khalifa',
  'Abdelrahman',
  'Saad',
  'Mansour',
  'Ragab',
  'Abouelnaga',
  'Fahmy',
  'Abdelaziz',
  'Hegazy',
  'El-Baz',
  'Sabry',
  'Hafez',
];

const courseTopics = {
  csce: ['Data Structures', 'Algorithms', 'Web Development', 'Database Systems', 'Operating Systems', 'AI Foundations'],
  busn: ['Business Strategy', 'Marketing Principles', 'Financial Accounting', 'Operations Management', 'Organizational Behavior'],
  engr: ['Statics', 'Materials Science', 'Thermodynamics', 'Circuits', 'Fluid Mechanics'],
  econ: ['Microeconomics', 'Macroeconomics', 'Econometrics', 'Development Economics', 'Game Theory'],
  phys: ['Mechanics', 'Electricity and Magnetism', 'Quantum Basics', 'Thermal Physics', 'Optics'],
  rhet: ['Academic Writing', 'Argumentation', 'Research Methods', 'Public Speaking'],
  mact: ['Calculus II', 'Linear Algebra', 'Probability', 'Discrete Math'],
  aric: ['Arabic Literature', 'Modern Arabic', 'Islamic History', 'Translation Techniques'],
};

// Utility to generate additional courses up to target with realistic codes/names
const ensureCourses = (targetCount = 60) => {
  const perDeptCounters = {};
  departmentsCatalog.forEach((d) => (perDeptCounters[d.code] = 2001));

  while (courses.length < targetCount) {
    const dept = departmentsCatalog[courses.length % departmentsCatalog.length];
    const idx = perDeptCounters[dept.code]++;
    const topics = courseTopics[dept.code] || ['Special Topics'];
    const topic = topics[(courses.length + idx) % topics.length];
    const code = `${dept.code.toUpperCase()}${idx}`;
    courses.push({
      code,
      name: `${topic}`,
      department: dept.code,
      departmentName: dept.name,
      credits: 3,
      description: `An AUC ${dept.name} course on ${topic}.`,
      overallRating: 0,
      totalReviews: 0,
      ratings: {
        difficulty: 0,
        workload: 0,
        usefulness: 0,
        contentQuality: 0,
      },
      tags: ['AUC', topic, 'Core'],
    });
  }
};

// Utility to generate additional professors up to target using realistic names
const ensureProfessors = (targetCount = 50) => {
  const courseMap = {};
  courses.forEach((c) => {
    if (!courseMap[c.department]) courseMap[c.department] = [];
    courseMap[c.department].push(c.code);
  });

  while (professors.length < targetCount) {
    const dept = departmentsCatalog[professors.length % departmentsCatalog.length];
    const courseList = courseMap[dept.code] || [];
    const courseSelection = courseList.slice(0, 2).length ? courseList.slice(0, 2) : courseList.slice(0, 1);
    const idx = professors.length;
    const firstName = firstNames[idx % firstNames.length];
    const lastName = lastNames[(idx + dept.code.length) % lastNames.length];
    professors.push({
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${idx}@aucegypt.edu`,
      title: 'Professor',
      department: dept.code,
      departmentName: dept.name,
      courses: courseSelection.length ? courseSelection : [courses[0].code],
      overallRating: 0,
      totalReviews: 0,
      ratings: {
        clarity: 0,
        helpfulness: 0,
        engagement: 0,
        grading: 0,
        workload: 0,
        communication: 0,
      },
      tags: ['AUC Faculty', 'Supportive', 'Approachable'],
    });
  }
};

const sampleStudents = [
  {
    email: 'student1@aucegypt.edu',
    password: 'password123',
    firstName: 'Aya',
    lastName: 'Khaled',
    major: 'Computer Science',
    graduationYear: 2025,
  },
  {
    email: 'student2@aucegypt.edu',
    password: 'password123',
    firstName: 'Omar',
    lastName: 'Hassan',
    major: 'Economics',
    graduationYear: 2026,
  },
  {
    email: 'student3@aucegypt.edu',
    password: 'password123',
    firstName: 'Mina',
    lastName: 'Samir',
    major: 'Engineering',
    graduationYear: 2027,
  },
  {
    email: 'student4@aucegypt.edu',
    password: 'password123',
  firstName: 'Sara',
  lastName: 'Mahmoud',
  major: 'Business Administration',
  graduationYear: 2025,
  },
];

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomRating = (min = 3, max = 5) =>
  Math.round((Math.random() * (max - min) + min) * 10) / 10;
const randomSemester = () => {
  const terms = ['Fall', 'Spring', 'Summer'];
  const year = 2023 + Math.floor(Math.random() * 3);
  return `${randomFrom(terms)} ${year}`;
};
const reviewTemplates = [
  '##NAME## keeps classes engaging and makes tough topics in ##TOPIC## easy to follow.',
  'Appreciated the clear slides and examples. The workload in ##TOPIC## was fair.',
  'Lots of real-world applications to ##TOPIC##. Learned a ton.',
  'Office hours were helpful and feedback was detailed. ##TOPIC## felt well-organized.',
  'Projects in ##TOPIC## were challenging but relevant. Grading felt transparent.',
  'Lectures were structured and paced well. Assignments aligned with exams.',
  'Great energy in class and encourages questions. ##TOPIC## discussions were lively.',
  'Materials were up to date and practical. Definitely recommend this for ##TOPIC##.',
  'Provides many practice problems. Exams matched what we covered.',
  'Group work in ##TOPIC## helped understand the concepts better.',
  'Very approachable and responsive by email. Clear expectations.',
  'Assignments built nicely on each other. Learned step by step.',
  'Syllabus was clear, deadlines reasonable. Appreciated flexible office hours.',
  'Great at breaking down complex ideas into simple parts.',
  'Helpful feedback on submissions. Improved a lot over the semester.',
  'Encourages participation without putting pressure on students.',
  'Uses case studies to connect ##TOPIC## with real life.',
  'Labs were well-prepared and instructions were clear.',
  'Slides available early; easy to preview before class.',
  'Fair grading and offers chances to improve if you put in effort.',
  'Keeps the class on schedule and respects time.',
  'Creates a supportive environment; you feel comfortable asking questions.',
  'Gives useful exam prep hints; no surprises on tests.',
  'Explains why topics in ##TOPIC## matter beyond the course.',
  'Assignments are heavier near the end, but manageable if you start early.',
  'Provides concise summaries at the end of each lecture.',
  'Balances theory and practice well in ##TOPIC##.',
  'Good sense of humor keeps the class attentive.',
  'Uses clear rubrics. You know how to earn points.',
  'Challenging course but worth the effort; learned a lot.',
];

const randomComment = (name, topic) => {
  const template = randomFrom(reviewTemplates);
  return template.replace('##NAME##', name).replace('##TOPIC##', topic);
};

const seedDatabase = async () => {
  try {
    ensureCourses(60);
    ensureProfessors(50);
    // Reset counts to avoid stale static numbers
    professors.forEach((prof) => {
      prof.totalReviews = 0;
    });
    courses.forEach((course) => {
      course.totalReviews = 0;
    });

    console.log('🌱 Starting database seed...');

    // Clear existing data
    await Professor.deleteMany({});
    await Course.deleteMany({});
    await User.deleteMany({});
    await Review.deleteMany({});
    console.log('✅ Cleared existing data');

    // Insert professors
    const createdProfessors = await Professor.insertMany(professors);
    console.log(`✅ Inserted ${createdProfessors.length} professors`);

    // Insert courses and link to professors
    const createdCourses = [];
    for (const course of courses) {
      const newCourse = await Course.create(course);

      // Find professors teaching this course
      const teachingProfs = createdProfessors.filter((prof) =>
        prof.courses.includes(course.code)
      );

      // Link professors to course
      newCourse.professors = teachingProfs.map((p) => p._id);
      await newCourse.save();

      createdCourses.push(newCourse);
    }
    console.log(`✅ Inserted ${createdCourses.length} courses`);

    // Create users
    const createdStudents = await User.insertMany(sampleStudents);
    const adminUser = await User.create({
      email: 'admin@aucegypt.edu',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
    });
    console.log('✅ Created sample users and admin');

    const allUsers = [...createdStudents, adminUser];

    // Helper to pick a user
    const pickUser = (index) => allUsers[index % allUsers.length];

    // Seed professor reviews with random counts
    for (const prof of createdProfessors) {
      const reviewCount = 2 + Math.floor(Math.random() * 4); // 2-5
      let totals = {
        rating: 0,
        clarity: 0,
        helpfulness: 0,
        engagement: 0,
        grading: 0,
        workload: 0,
        communication: 0,
      };

      for (let i = 0; i < reviewCount; i++) {
        const user = pickUser(i);
        const rating = randomRating(3.5, 5);
        const review = await Review.create({
          type: 'professor',
          professor: prof._id,
          user: user._id,
          rating,
          clarity: randomRating(3, 5),
          helpfulness: randomRating(3, 5),
          engagement: randomRating(3, 5),
          grading: randomRating(3, 5),
          workload: randomRating(3, 5),
          communication: randomRating(3, 5),
          comment: randomComment(`${prof.firstName} ${prof.lastName}`, prof.departmentName),
          semester: randomSemester(),
        });
        await Professor.findByIdAndUpdate(prof._id, { $push: { reviews: review._id } });
        await User.findByIdAndUpdate(user._id, { $push: { reviewsSubmitted: review._id } });

        totals.rating += review.rating;
        totals.clarity += review.clarity || 0;
        totals.helpfulness += review.helpfulness || 0;
        totals.engagement += review.engagement || 0;
        totals.grading += review.grading || 0;
        totals.workload += review.workload || 0;
        totals.communication += review.communication || 0;
      }

      await Professor.findByIdAndUpdate(prof._id, {
        totalReviews: reviewCount,
        overallRating: totals.rating / reviewCount,
        'ratings.clarity': totals.clarity / reviewCount,
        'ratings.helpfulness': totals.helpfulness / reviewCount,
        'ratings.engagement': totals.engagement / reviewCount,
        'ratings.grading': totals.grading / reviewCount,
        'ratings.workload': totals.workload / reviewCount,
        'ratings.communication': totals.communication / reviewCount,
      });
    }

    // Seed course reviews with random counts
    for (const course of createdCourses) {
      const reviewCount = 2 + Math.floor(Math.random() * 4); // 2-5
      let totals = {
        rating: 0,
        difficulty: 0,
        workload: 0,
        usefulness: 0,
        contentQuality: 0,
      };

      for (let i = 0; i < reviewCount; i++) {
        const user = pickUser(i + 1); // offset
        const rating = randomRating(3.5, 5);
        const review = await Review.create({
          type: 'course',
          course: course._id,
          user: user._id,
          rating,
          difficulty: randomRating(3, 5),
          workload: randomRating(3, 5),
          usefulness: randomRating(3, 5),
          contentQuality: randomRating(3, 5),
          comment: randomComment(course.name, course.departmentName),
          semester: randomSemester(),
        });
        await Course.findByIdAndUpdate(course._id, { $push: { reviews: review._id } });
        await User.findByIdAndUpdate(user._id, { $push: { reviewsSubmitted: review._id } });

        totals.rating += review.rating;
        totals.difficulty += review.difficulty || 0;
        totals.workload += review.workload || 0;
        totals.usefulness += review.usefulness || 0;
        totals.contentQuality += review.contentQuality || 0;
      }

      await Course.findByIdAndUpdate(course._id, {
        totalReviews: reviewCount,
        overallRating: totals.rating / reviewCount,
        'ratings.difficulty': totals.difficulty / reviewCount,
        'ratings.workload': totals.workload / reviewCount,
        'ratings.usefulness': totals.usefulness / reviewCount,
        'ratings.contentQuality': totals.contentQuality / reviewCount,
      });
    }

    console.log('');
    console.log('🎉 Database seeding completed successfully!');
    console.log('');
    console.log('📝 Test Credentials:');
    console.log('   Students: student1..4@aucegypt.edu / password123');
    console.log('   Admin:   admin@aucegypt.edu / admin123');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
