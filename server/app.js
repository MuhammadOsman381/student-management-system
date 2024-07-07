import express from "express";
import cors from "cors";
import { userRouter } from "./routers/user.router.js";
import { teacherSubjectRouter } from "./routers/teachersSubjects.router.js";
import { studentRoute } from "./routers/student.router.js";
import { subjectRouter } from "./routers/subject.router.js";
import { yearRouter } from "./routers/year.router.js";
import { studentSubjectRouter } from "./routers/studentSubject.router.js";

const app = express();
//using middlewares
app.use(express.json());
app.use(cors());

// routers
app.use("/api/v2/user", userRouter);
app.use("/api/v2/teacher/subject", teacherSubjectRouter);
app.use('/api/v2/student/subject',studentSubjectRouter)
app.use("/api/v2/student", studentRoute);
app.use("/api/v2/subject",subjectRouter)
app.use("/api/v2/year",yearRouter)
export { app };
