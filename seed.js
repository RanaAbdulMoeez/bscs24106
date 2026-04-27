// seed.js
// =============================================================================
//  Seed the database with realistic test data.
//  Run with: npm run seed
//
//  Required minimum:
//    - 2 users
//    - 4 projects (split across the users)
//    - 5 tasks (with embedded subtasks and tags arrays)
//    - 5 notes (some attached to projects, some standalone)
//
//  Use the bcrypt module to hash passwords before inserting users.
//  Use ObjectId references for relationships (projectId, ownerId).
// =============================================================================

require('dotenv').config();
const bcrypt = require('bcryptjs');
const { connect } = require('./db/connection');

(async () => {
  const db = await connect();

  // OPTIONAL: clear existing data so re-seeding is idempotent
  await db.collection('users').deleteMany({});
  await db.collection('projects').deleteMany({});
  await db.collection('tasks').deleteMany({});
  await db.collection('notes').deleteMany({});

  // =============================================================================
  //  TODO: Insert your seed data below.
  //
  //  Hints:
  //    - Hash passwords:   const hash = await bcrypt.hash('password123', 10);
  //    - Capture inserted ids:
  //        const u = await db.collection('users').insertOne({ ... });
  //        const userId = u.insertedId;
  //    - Use those ids when inserting projects/tasks/notes.
  //    - Demonstrate schema flexibility: include at least one optional field
  //      on SOME documents but not all (e.g. dueDate on some tasks only).
  //
  //  Sample task shape:
  //    {
  //      ownerId: <ObjectId>,
  //      projectId: <ObjectId>,
  //      title: "Write report introduction",
  //      status: "todo",
  //      priority: 3,
  //      tags: ["writing", "urgent"],
  //      subtasks: [
  //        { title: "Outline sections", done: true },
  //        { title: "Draft", done: false }
  //      ],
  //      createdAt: new Date()
  //    }
  // =============================================================================

  //users
  const u1pass = await bcrypt.hash('rohail123', 10);
  const u1 = await db.collection('users').insertOne({
    username: 'rohail',
    email: 'rohail@gmail.com',
    password: hashedPassword,
    createdAt: new Date()
  });
  const uID1 = u1.insertedId

  const u2pass = await bcrypt.hash('talha123', 10);
  const u2 = await db.collection('users').insertOne({
    username: 'talha',
    email: 'talha@gmail.com',
    password: hashedPassword,
    createdAt: new Date()
  });
  const uID2 = u2.insertedId

  //projects
  const pID1 = (await db.collection('projects').insertOne({
    ownerId: uID1,
    name: "Project 1",
    description: "Website Frontend",
    archived: false,
    createdAt: new Date()
  })).insertedId;

  const pID2 = (await db.collection('projects').insertOne({
    ownerId: uID1,
    name: "Project 2",
    description: "Website Backend",
    archived: false,
    createdAt: new Date()
  })).insertedId;

  const pID3 = (await db.collection('projects').insertOne({
    ownerId: uID2,
    name: "Project 3",
    description: "App Frontend",
    archived: false,
    createdAt: new Date()
  })).insertedId;

  const pID4 = (await db.collection('projects').insertOne({
    ownerId: uID2,
    name: "Project 4",
    description: "App Backend",
    archived: false,
    createdAt: new Date()
  })).insertedId;

  //tasks
  await db.collection('tasks').insertOne({
    ownerId: uID1,
    projectId: pID1,
    title: "Design UI",
    status: "in-progress",
    priority: 1,
    tags: ["ui", "frontend"],
    subtasks: [
      { title: "Color Theme", done: true },
      { title: "Design Theme", done: false }
    ],
    dueDate: new Date("2026-09-15"),
    createdAt: new Date()
  });  

  await db.collection('tasks').insertOne({
    ownerId: uID1,
    projectId: pID2,
    title: "Middleware Design",
    status: "in-progress",
    priority: 2,
    tags: ["backend"],
    subtasks: [
      { title: "selecting hashing protocol", done: true },
    ],
    dueDate: new Date("2026-6-25"),
    createdAt: new Date()
  });  

  await db.collection('tasks').insertOne({
    ownerId: uID2,
    projectId: pID3,
    title: "Design UI",
    status: "in-progress",
    priority: 1,
    tags: ["ui", "frontend"],
    subtasks: [
      { title: "Color Theme", done: true },
      { title: "Design Theme", done: false }
    ],
    dueDate: new Date("2026-10-15"),
    createdAt: new Date()
  });  

  await db.collection('tasks').insertOne({
    ownerId: uID2,
    projectId: pID4,
    title: "Middleware Design",
    status: "in-progress",
    priority: 2,
    tags: ["backend"],
    subtasks: [
      { title: "selecting hashing protocol", done: true },
    ],
    dueDate: new Date("2026-11-25"),
    createdAt: new Date()
  });  

  await db.collection('tasks').insertOne({
    ownerId: uID2,
    projectId: pID4,
    title: "Payment Gateway Setup",
    status: "in-progress",
    priority: 1,
    tags: [],
    subtasks: [
      { title: "Hello Jalal, this lab was pointless", done: false }
    ],
    dueDate: new Date("2026-09-15"),
    createdAt: new Date()
  });  





  console.log('TODO: implement seed.js');
  process.exit(0);
})();