export type Task = {
  id: string | number;
  title: string;
  assignee: string;
  dueDate: string;
  priority: "No Priority" | "Urgent" | "High" | "Medium" | "Low";
  tags?: string[];
};

export type Column = {
  id: number;
  title: string;
  tasks: Task[];
};

export const columns: Column[] = [
  {
    id: 1,
    title: "To Do",
    tasks: [
      {
        id: 1,
        title: "Write API Documentation",
        assignee: "Admin",
        dueDate: "29 Jul",
        priority: "High",
        tags: ["Deployment", "Deployment"],
      },
      {
        id: 2,
        title: "Implement Search Function",
        assignee: "Admin",
        dueDate: "29 Jul",
        priority: "Medium",
        tags: ["Deployment", "Deployment"],
      },
      {
        id: 3,
        title: "Deploy to Production",
        assignee: "Admin",
        dueDate: "29 Jul",
        priority: "High",
        tags: ["Deployment", "Deployment"],
      },
    ],
  },

  {
    id: 2,
    title: "Doing",
    tasks: [
      {
        id: 4,
        title: "Code Review Completed",
        assignee: "Admin",
        dueDate: "29 Jul",
        priority: "High",
        tags: ["Deployment", "Deployment"],
      },
      {
        id: 5,
        title: "Design Mockups Finalized",
        assignee: "Admin",
        dueDate: "29 Jul",
        priority: "Medium",
        tags: ["Deployment", "Deployment"],
      },
    ],
  },

  {
    id: 3,
    title: "Completed",
    tasks: [
      {
        id: 6,
        title: "Feature Testing Passed",
        assignee: "QA Team",
        dueDate: "30 Jul",
        priority: "High",
        tags: ["Testing", "Passed"],
      },
      {
        id: 7,
        title: "UI Design Updated",
        assignee: "Designer",
        dueDate: "31 Jul",
        priority: "Medium",
        tags: ["Design", "Updated"],
      },
      {
        id: 8,
        title: "Security Audit Scheduled",
        assignee: "Security",
        dueDate: "01 Aug",
        priority: "High",
        tags: ["Audit", "Scheduled"],
      },
    ],
  },

  {
    id: 4,
    title: "On Hold",
    tasks: [
      {
        id: 9,
        title: "UI Review",
        assignee: "Designer",
        dueDate: "02 Aug",
        priority: "Medium",
        tags: ["Review", "Pending"],
      },
      {
        id: 10,
        title: "Backend Integration",
        assignee: "Dev Team",
        dueDate: "03 Aug",
        priority: "High",
        tags: ["Development", "API"],
      },
      {
        id: 11,
        title: "User Feedback",
        assignee: "Product",
        dueDate: "04 Aug",
        priority: "Low",
        tags: ["Research", "Feedback"],
      },
      {
        id: 12,
        title: "Performance Optimization",
        assignee: "Engineering",
        dueDate: "05 Aug",
        priority: "Medium",
        tags: ["Optimization"],
      },
    ],
  },
];