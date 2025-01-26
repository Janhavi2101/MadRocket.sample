import React, { useState } from 'react';
import { firestore } from './firebase';

function StudentsPage() {
  const [students, setStudents] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com',
      class: '10th', 
      section: 'A', 
      rollNumber: 'ST001',
      age: 16,
      address: '123 Main St',
      phone: '1234567890',
      gender: 'Male',
      dateOfBirth: '2007-05-15',
      parentName: 'Jane Doe',
      parentContact: '9876543210'
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', age: '', class: '', section: '', 
    rollNumber: '', address: '', phone: '', gender: '', 
    dateOfBirth: '', parentName: '', parentContact: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const newStudent = {
      ...formData,
      id: students.length + 1
    };
    setStudents(prevStudents => [...prevStudents, newStudent]);
    setIsModalOpen(false);
    resetForm();
  };

  const handleUpdateStudent = (e) => {
    e.preventDefault();
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student.id === editingStudent.id ? { ...formData, id: student.id } : student
      )
    );
    setIsModalOpen(false);
    resetForm();
  };

  const handleDeleteStudent = (studentId) => {
    setStudents(prevStudents => 
      prevStudents.filter(student => student.id !== studentId)
    );
  };

  const resetForm = () => {
    setFormData({
      name: '', email: '', age: '', class: '', section: '', 
      rollNumber: '', address: '', phone: '', gender: '', 
      dateOfBirth: '', parentName: '', parentContact: ''
    });
    setEditingStudent(null);
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setFormData(student);
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    window.location.href = '/login';
  };

  // Consolidated styles
  const styles = {
    dashboardContainer: {
      display: 'flex',
      height: '100vh',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
      backgroundColor: '#f4f6f9'
    },
    sidebar: {
      width: '250px',
      backgroundColor: '#1e293b',
      color: 'white',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column'
    },
    sidebarTitle: {
      color: '#64748b',
      fontSize: '1.5rem',
      marginBottom: '30px',
      textAlign: 'center'
    },
    sidebarButton: {
      width: '100%',
      padding: '12px',
      marginBottom: '10px',
      backgroundColor: '#334155',
      color: '#cbd5e1',
      border: 'none',
      borderRadius: '8px',
      transition: 'all 0.3s ease'
    },
    sidebarButtonHover: {
      backgroundColor: '#475569',
      transform: 'translateX(5px)',
      color: 'white'
    },
    logoutButton: {
      marginTop: 'auto',
      backgroundColor: '#dc2626',
      color: 'white',
      border: 'none',
      padding: '12px',
      borderRadius: '8px',
      transition: 'background-color 0.3s ease'
    },
    mainContent: {
      flex: 1,
      overflowY: 'auto',
      backgroundColor: 'white',
      padding: '20px'
    },
    contentHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      paddingBottom: '15px',
      borderBottom: '1px solid #e2e8f0'
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0 10px'
    },
    tableHeader: {
      backgroundColor: '#f8fafc',
      color: '#64748b',
      padding: '15px',
      textAlign: 'left'
    },
    tableRow: {
      backgroundColor: '#f8fafc',
      transition: 'transform 0.2s ease'
    },
    tableRowHover: {
      transform: 'scale(1.02)',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    actionButton: {
      margin: '0 5px',
      padding: '8px 15px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    modalForm: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '12px',
      width: '600px',
      maxHeight: '80%',
      overflowY: 'auto',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '15px'
    },
    formInput: {
      width: '100%',
      padding: '12px',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      transition: 'border-color 0.3s ease'
    }
  };

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Dashboard</h2>
        
        <div>
          <button 
            style={styles.sidebarButton}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = styles.sidebarButtonHover.backgroundColor;
              e.target.style.transform = styles.sidebarButtonHover.transform;
              e.target.style.color = styles.sidebarButtonHover.color;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = styles.sidebarButton.backgroundColor;
              e.target.style.transform = 'none';
              e.target.style.color = styles.sidebarButton.color;
            }}
          >
            Students
          </button>
        </div>
        
        <button 
          style={styles.logoutButton} 
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      
      <div style={styles.mainContent}>
        <div style={styles.contentHeader}>
          <h1>Student Management System</h1>
          <button 
            style={{...styles.logoutButton, padding: '8px 16px'}} 
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <button 
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          style={{...styles.actionButton, backgroundColor: '#4CAF50', color: 'white', marginBottom: '20px'}}
        >
          Add Student
        </button>

        <table style={styles.table}>
          <thead>
            <tr>
              {['Name', 'Class', 'Section', 'Actions'].map((header) => (
                <th key={header} style={styles.tableHeader}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr 
                key={student.id} 
                style={styles.tableRow}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = styles.tableRowHover.transform;
                  e.currentTarget.style.boxShadow = styles.tableRowHover.boxShadow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{student.section}</td>
                <td>
                  {['View', 'Edit', 'Delete'].map((action) => {
                    const buttonColors = {
                      'View': '#2196F3',
                      'Edit': '#FFC107',
                      'Delete': '#F44336'
                    };
                    return (
                      <button
                        key={action}
                        onClick={() => {
                          if (action === 'View') alert(`Viewing ${student.name}`);
                          if (action === 'Edit') openEditModal(student);
                          if (action === 'Delete') handleDeleteStudent(student.id);
                        }}
                        style={{
                          ...styles.actionButton,
                          backgroundColor: buttonColors[action],
                          color: 'white'
                        }}
                      >
                        {action}
                      </button>
                    );
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <div style={styles.modalOverlay}>
            <form 
              onSubmit={editingStudent ? handleUpdateStudent : handleAddStudent}
              style={styles.modalForm}
            >
              <h2>{editingStudent ? 'Edit Student' : 'Add Student'}</h2>
              <div style={styles.formGrid}>
                {Object.keys(formData).map((key) => (
                  <input
                    key={key}
                    type={key === 'email' ? 'email' : key === 'age' ? 'number' : 'text'}
                    name={key}
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={formData[key]}
                    onChange={handleInputChange}
                    style={{
                      ...styles.formInput,
                      ':focus': {
                        outline: 'none',
                        borderColor: '#3b82f6'
                      }
                    }}
                    required={key !== 'age'}
                  />
                ))}
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginTop: '20px' 
              }}>
                <button 
                  type="submit" 
                  style={{...styles.actionButton, backgroundColor: '#4CAF50', color: 'white'}}
                >
                  {editingStudent ? 'Update' : 'Add'} Student
                </button>
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{...styles.actionButton, backgroundColor: '#f44336', color: 'white'}}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentsPage;