import { PrismaClient } from "@prisma/client";
import express from "express";

export const prisma = new PrismaClient();
const app = express();

// tell express we are going to use json
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Welcome to Hello World Bootcamp Server",
  });
});

// GET /students to return students
app.get("/students", async (req, res) => {
  const students = await prisma.student.findMany();
  res.send({
    success: true,
    students,
  });
});

// GET /students/:studentId to return one student
app.get("/students/:studentId", async (req, res) => {
  const { studentId } = req.params;
  const student = await prisma.student.findFirst({
    where: { id: studentId },
  });
  if (!student) {
    return res.send({
      success: false,
      error: "Student with that id was not found.",
    });
  }
  res.send({
    success: true,
    student,
  });
});

// searches by name
app.get("/students/name/:studentName", async (req, res) => {
  const { studentName } = req.params;
  const student = await prisma.student.findFirst({
    where: { name: studentName },
  });
  if (!student) {
    return res.send({
      success: false,
      error: "Student with that id was not found.",
    });
  }
  res.send({
    success: true,
    student,
  });
});

// PUT i want to update the name of a student:
app.put("/students/:studentId", async (req, res) => {
  const { studentId } = req.params;
  const { name } = req.body;
  // const name = req.body.name
  if (!name) {
    return res.send({
      success: false,
      error: "Name wasn't included in your update request.",
    });
  }
  const student = await prisma.student.update({
    where: { id: studentId },
    data: { name },
  });
  res.send({
    success: true,
    student,
  });
});

// GET /instructors to return students
app.get("/instructors", async (req, res) => {
  const instructors = await prisma.instructor.findMany({
    include: { students: true },
  });
  res.send({
    success: true,
    instructors,
  });
});

app.use((error, req, res, next) => {
  res.send({
    success: false,
    errror: error.message,
  });
});

app.use((req, res) => {
  res.send({
    success: false,
    errror: "No route found.",
  });
});

app.listen(3000, () => console.log("Server is up!"));
