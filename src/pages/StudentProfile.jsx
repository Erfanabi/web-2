import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import './StudentProfile.css'

export default function StudentProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`http://localhost:3001/students/${id}`)
        if (!response.ok) {
          throw new Error('دانشجو یافت نشد')
        }
        const data = await response.json()
        setStudent(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchStudent()
  }, [id])

  if (loading) {
    return <div className="loading">در حال بارگذاری...</div>
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>خطا</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            بازگشت به صفحه اصلی
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="student-profile">
      <Header />
      
      <div className="profile-hero">
        <div className="container">
          <div className="profile-header">
            <img src={student.photo} alt={student.name} className="profile-photo" />
            <h1>{student.name}</h1>
          </div>
        </div>
      </div>

      <div className="container profile-content">
        <section className="about-section">
          <h2>درباره دانشجو</h2>
          <p>{student.description}</p>
        </section>

        <section className="skills-section">
          <h2>مهارت‌ها</h2>
          <div className="skills-grid">
            {student.skills.map((skill, index) => (
              <div key={index} className="skill-card">
                <span className="skill-name">{skill}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="actions">
          <button onClick={() => navigate('/')} className="btn btn-primary">
            بازگشت به صفحه اصلی
          </button>
        </div>
      </div>
    </div>
  )
} 