function SkillList({ skills }) {
 return (
 <div className="skill-list">
 <h3>Skills</h3>
 <ul>
 {skills.map((skill, index) => (
 <li key={index}>{skill}</li>
 ))}
 </ul>
 </div>
 );
}
export default SkillList;