import { prisma } from "./index.js";

const student = await prisma.student.create({
  data: {
    name: "David",
    instructorId: "fca18c9e-0faf-451c-a73c-5f024ddf37ae",
  },
});

console.log(student);
