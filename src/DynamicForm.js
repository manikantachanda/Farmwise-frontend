import React from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { submitFormData } from './actions'; // Assuming you have an action creator for submitting form data

function DynamicForm() {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.fields);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if all mandatory fields are filled
    const isValid = fields.every((field) => {
      const inputValue = e.target[field.fieldName]?.value || '';
      if (field.mandatory === 'yes' && inputValue.trim() === '') {
        alert('Please fill in all mandatory fields.');
        return false;
      }
      if (field.fieldDataType === 'string' && !/^[a-zA-Z ]*$/.test(inputValue)) {
        alert(`Please enter a valid string for ${field.fieldName}.`);
        return false;
      }
      if (field.fieldDataType === 'number' && isNaN(Number(inputValue))) {
        alert(`Please enter a valid number for ${field.fieldName}.`);
        return false;
      }
      if (field.fieldType === 'datepicker' && field.startDate && field.endDate) {
        const selectedDate = new Date(inputValue);
        const startDate = new Date(field.startDate);
        const endDate = new Date(field.endDate);
        if (selectedDate < startDate || selectedDate > endDate) {
          alert(`Please select a date between ${field.startDate} and ${field.endDate} for ${field.fieldName}.`);
          return false;
        }
      }
      // Add more data type validations as needed
      return true;
    });

    if (!isValid) {
      return;
    }

    // Extract form data from fields
    const formData = fields.map((field) => {
        const fieldValue = e.target[field.fieldName]?.value || ''; // Use optional chaining (?.) to access value safely
        return {
          fieldName: field.fieldName,
          fieldValue: fieldValue
        };
    });

    // Dispatch action to submit form data
    dispatch(submitFormData(formData));
    alert('Data saved successfully!');
    console.log('Form submitted!');
  };

  return (
    <div>
      <h2>Data Collection Form</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => {
          return (
            <div key={index}>
              <label className='labeldata'>{field.fieldName}:</label>
              {field.fieldType === 'textbox' && (
                <input
                  type="text"
                  name={field.fieldName} // Set input name attribute to field name
                  placeholder={field.fieldName}
                  pattern={field.fieldDataType === 'string' ? '[a-zA-Z ]+' : null}
                  required={field.mandatory === 'yes'}
                  maxLength={field.fieldMaxLength} // Add minLength attribute for minimum length validation
                />
              )}
              {field.fieldType === 'dropdown' && (
                <select name={field.fieldName}> {/* Set select name attribute to field name */}
                  <option value="">Select {field.fieldName}</option>
                  {field.fieldData.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>{option}</option>
                  ))}
                </select>
              )}
              {field.fieldType === 'datepicker' && (
                <input type="date" name={field.fieldName} /> 
              )}
            </div>
          );
        })}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DynamicForm;
