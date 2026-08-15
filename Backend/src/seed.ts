import * as dotenv from 'dotenv';
import { connect } from 'mongoose';

dotenv.config();

async function run() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ablespace';
  await connect(uri);
  console.log('Connected to MongoDB for seeding');

  const tasks = [
    {
      title: 'Write API Documentation',
      description: 'Create API documentation',
      status: 'To Do',
      priority: 'High',
      assignee: 'Admin',
      dueDate: '2026-07-29',
      labels: ['Documentation', 'API'],
    },
    {
      title: 'Implement Search Function',
      description: 'Add search endpoint and frontend integration',
      status: 'To Do',
      priority: 'Medium',
      assignee: 'Admin',
      dueDate: '2026-07-29',
      labels: ['Search'],
    },
    {
      title: 'Deploy to Production',
      description: 'Deploy app',
      status: 'To Do',
      priority: 'High',
      assignee: 'Admin',
      dueDate: '2026-07-29',
      labels: ['Deployment'],
    },
    {
      title: 'Code Review Completed',
      description: 'Completed code review',
      status: 'Doing',
      priority: 'High',
      assignee: 'Admin',
      dueDate: '2026-07-29',
      labels: ['Review'],
    },
    {
      title: 'Design Mockups Finalized',
      description: 'Finalize mockups',
      status: 'Doing',
      priority: 'Medium',
      assignee: 'Admin',
      dueDate: '2026-07-29',
      labels: ['Design'],
    },
    {
      title: 'Feature Testing Passed',
      description: 'Testing results',
      status: 'Completed',
      priority: 'High',
      assignee: 'QA Team',
      dueDate: '2026-07-30',
      labels: ['Testing'],
    },
    {
      title: 'UI Design Updated',
      description: 'Update UI design',
      status: 'Completed',
      priority: 'Medium',
      assignee: 'Designer',
      dueDate: '2026-07-31',
      labels: ['Design'],
    },
  ];

  const { default: mongoose } = await import('mongoose');
  const taskCollection = mongoose.connection.collection('tasks');
  await taskCollection.deleteMany({});
  await taskCollection.insertMany(tasks);

  console.log('Seeded tasks');
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
