import React from 'react';

const StudentModal = ({ student, onClose }) => {
  if (!student) return null;

  const detailsMap = {
    'Name': student.name,
    'Email': student.email,
    'Age': student.age,
    'Class': student.class,
    'Section': student.section,
    'Roll Number': student.rollNumber,
    'Address': student.address,
    'Phone': student.phone,
    'Gender': student.gender,
    'Date of Birth': student.dateOfBirth,
    'Parent Name': student.parentName,
    'Parent Contact': student.parentContact
  };

  return (
    <div className="dashboard-modal-overlay">
      <div className="dashboard-modal-form" style={{ maxWidth: '400px' }}>
        <h2>Student Details</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '10px',
          marginBottom: '20px'
        }}>
          {Object.entries(detailsMap).map(([label, value]) => (
            <React.Fragment key={label}>
              <strong>{label}:</strong>
              <span>{value || 'N/A'}</span>
            </React.Fragment>
          ))}
        </div>
        <button 
          onClick={onClose}
          className="dashboard-action-button"
          style={{ 
            backgroundColor: '#f44336', 
            color: 'white', 
            width: '100%' 
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default StudentModal;