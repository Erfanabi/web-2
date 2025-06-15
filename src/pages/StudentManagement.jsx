import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "./StudentManagement.css";

const DEFAULT_AVATAR =
  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    description: "",
    skills: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:3001/students");
      const data = await response.json();
      setStudents(data);
      setLoading(false);
    } catch (err) {
      setError("خطا در دریافت اطلاعات دانشجویان");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      photo: "",
      description: "",
      skills: "",
    });
    setEditingStudent(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const studentData = {
        ...formData,
        photo: formData.photo || DEFAULT_AVATAR,
        skills: formData.skills.split(",").map((skill) => skill.trim()),
      };

      const url = editingStudent
        ? `http://localhost:3001/students/${editingStudent.id}`
        : "http://localhost:3001/students";

      const method = editingStudent ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        throw new Error("خطا در ذخیره اطلاعات");
      }

      await fetchStudents();
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      photo: student.photo,
      description: student.description,
      skills: student.skills.join(", "),
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("آیا از حذف این دانشجو اطمینان دارید؟")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/students/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("خطا در حذف دانشجو");
      }

      await fetchStudents();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="loading">در حال بارگذاری...</div>;
  }

  return (
    <div className="student-management">
      <Header />
      <div className="container management-content">
        <h1>مدیریت دانشجویان</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="student-form">
          <h2>{editingStudent ? "ویرایش دانشجو" : "افزودن دانشجو جدید"}</h2>

          <div className="form-group">
            <label htmlFor="name">نام دانشجو:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="photo">آدرس تصویر (اختیاری):</label>
            <input
              type="url"
              id="photo"
              name="photo"
              value={formData.photo}
              onChange={handleInputChange}
              placeholder="اگر وارد نکنید، آواتار پیش‌فرض استفاده می‌شود"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">توضیحات:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="skills">مهارت‌ها (با کاما جدا کنید):</label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingStudent ? "ویرایش" : "افزودن"}
            </button>
            {editingStudent && (
              <button
                type="button"
                onClick={resetForm}
                className="btn btn-secondary"
              >
                انصراف
              </button>
            )}
          </div>
        </form>

        <div className="students-list">
          <h2>لیست دانشجویان</h2>
          <div className="students-grid">
            {students.map((student) => (
              <div key={student.id} className="student-card">
                <img
                  src={student.photo || DEFAULT_AVATAR}
                  alt={student.name}
                  className="student-photo"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DEFAULT_AVATAR;
                  }}
                />
                <h3>{student.name}</h3>
                <p>{student.description}</p>
                <div className="skills">
                  {student.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="card-actions">
                  <button
                    onClick={() => handleEdit(student)}
                    className="btn btn-secondary"
                  >
                    ویرایش
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="btn btn-danger"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
