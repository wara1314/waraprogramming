const express = require("express");
const app = express();
const bookRoutes = require("./routes/book.routes");
const reviewRoutes = require("./routes/review.routes")

app.use(express.json());
app.use("/books", bookRoutes);
app.use("/reviews", reviewRoutes)

app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Endpoint tidak ditemukan" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Terjadi kesalahan pada server";
  res.status(statusCode).json({ success: false, message });
});

module.exports = app;
const express = require("express");
const app = express();
const bookRoutes = require("./routes/book.routes");
const reviewRoutes = require("./routes/review.routes")

app.use(express.json());
app.use("/books", bookRoutes);
app.use("/reviews", reviewRoutes)

app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Endpoint tidak ditemukan" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Terjadi kesalahan pada server";
  res.status(statusCode).json({ success: false, message });
});

module.exports = app;

import ProfileCard from "./components/ProfileCard";
import StatsCard from "./components/StatsCard";
import SkillList from "./components/SkillList";
import "./App.css";
function App() {
 const skills = ["React", "JavaScript", "HTML", "CSS"];
 return (
 <div className="app">
 <h1>User Dashboard</h1>
 <ProfileCard
 name="Rey"
 role="Frontend Developer"
 bio="Membangun UI modern menggunakan React"
 />
 <div className="stats-container">
 <StatsCard label="Projects" value={5} />
 <StatsCard label="Experience" value="1 Year" />
 <StatsCard label="Skills" value={4} />
 </div>
 <SkillList skills={skills} />
 </div>
 );
}
export default App;