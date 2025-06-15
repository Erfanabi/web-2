import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import './Home.css'

export default function Home() {
  const [courseData, setCourseData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, professorRes, studentsRes] = await Promise.all([
          fetch('http://localhost:3001/course'),
          fetch('http://localhost:3001/professor'),
          fetch('http://localhost:3001/students')
        ])

        const course = await courseRes.json()
        const professor = await professorRes.json()
        const students = await studentsRes.json()

        setCourseData({ course, professor, students })
        setLoading(false)
      } catch (err) {
        setError('خطا در دریافت اطلاعات')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="loading">در حال بارگذاری...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  const { course, professor, students } = courseData

  return (
    <div className="home">
      <Header />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <a href="#course-info" className="btn btn-primary">
            مشاهده جزئیات درس
          </a>
        </div>
      </section>

      {/* Course Info Section */}
      <section id="course-info" className="course-info">
        <div className="container">
          <h2>سرفصل‌های درس</h2>
          <div className="topics-grid">
            {course.topics.map((topic, index) => (
              <div key={index} className="topic-card">
                {topic}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professor Section */}
      <section className="professor">
        <div className="container">
          <h2>استاد درس</h2>
          <div className="professor-card">
            <img src={professor.photo} alt={professor.name} className="professor-photo" />
            <div className="professor-info">
              <h3>{professor.name}</h3>
              <p>{professor.bio}</p>
              <div className="expertise">
                <h4>تخصص‌ها:</h4>
                <div className="tags">
                  {professor.expertise.map((exp, index) => (
                    <span key={index} className="tag">{exp}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Students Section */}
      <section className="students">
        <div className="container">
          <h2>دانشجویان</h2>
          <div className="students-grid">
            {students.map(student => (
              <div key={student.id} className="student-card">
                <img src={student.photo} alt={student.name} className="student-photo" />
                <h3>{student.name}</h3>
                <p>{student.description}</p>
                <div className="skills">
                  {student.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
                <Link to={`/student/${student.id}`} className="btn btn-primary">
                  مشاهده پروفایل
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 