import express from "express";
import cors from "cors";
import { userRouter } from "./routers/user.router.js";
import { teacherSubjectRouter } from "./routers/teachersSubjects.router.js";
import { studentRoute } from "./routers/student.router.js";
import { subjectRouter } from "./routers/subject.router.js";
import { yearRouter } from "./routers/year.router.js";
import { studentSubjectRouter } from "./routers/studentSubject.router.js";
import { isAuthentication } from "./middleware/authentication.js";
import cookieParser from "cookie-parser";
import { reportRouter } from "./routers/report.router.js";
import {teacherAuth} from './middleware/teacherAuthenticator.js';

const app = express();
//using middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// routers
app.use("/api/v2/user",userRouter);
app.use("/api/v2/teacher/subject", isAuthentication,teacherSubjectRouter);
app.use("/api/v2/student/subject", isAuthentication,studentSubjectRouter);
app.use("/api/v2/student", isAuthentication,studentRoute);
app.use("/api/v2/subject", isAuthentication,subjectRouter);
app.use("/api/v2/year", isAuthentication,yearRouter);
app.use('/api/v2/report',isAuthentication,teacherAuth,reportRouter)
export { app };

