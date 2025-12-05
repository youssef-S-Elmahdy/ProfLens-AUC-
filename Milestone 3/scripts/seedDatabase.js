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
];

const seedDatabase = async () => {
  try {
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

    // Create test user
    const testUser = await User.create({
      email: 'student@aucegypt.edu',
      password: 'password123',
      firstName: 'Test',
      lastName: 'Student',
      major: 'Computer Science',
      graduationYear: 2025,
    });
    console.log('✅ Created test user (student@aucegypt.edu / password123)');

    // Create admin user
    const adminUser = await User.create({
      email: 'admin@aucegypt.edu',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
    });
    console.log('✅ Created admin user (admin@aucegypt.edu / admin123)');

    console.log('');
    console.log('🎉 Database seeding completed successfully!');
    console.log('');
    console.log('📝 Test Credentials:');
    console.log('   Student: student@aucegypt.edu / password123');
    console.log('   Admin:   admin@aucegypt.edu / admin123');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
