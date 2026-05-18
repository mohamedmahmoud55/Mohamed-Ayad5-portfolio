/* ============================================
   Form Handler - Contact Form Validation & Submission
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  initializeFormHandler();
});

function initializeFormHandler() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    // Add real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', validateField);
      input.addEventListener('input', clearErrorOnInput);
    });
    
    // Form submission
    contactForm.addEventListener('submit', handleFormSubmit);
  }
}

// === FORM VALIDATION ===
function validateField(event) {
  const field = event.target;
  const fieldName = field.name;
  const value = field.value.trim();
  const errorElement = document.getElementById(fieldName + 'Error');
  
  let isValid = true;
  let errorMessage = '';
  
  switch (fieldName) {
    case 'name':
      if (!value) {
        isValid = false;
        errorMessage = 'Please enter your name';
      } else if (value.length < 2) {
        isValid = false;
        errorMessage = 'Name must be at least 2 characters';
      }
      break;
      
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        isValid = false;
        errorMessage = 'Please enter your email';
      } else if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
      break;
      
    case 'subject':
      if (!value) {
        isValid = false;
        errorMessage = 'Please enter a subject';
      } else if (value.length < 3) {
        isValid = false;
        errorMessage = 'Subject must be at least 3 characters';
      }
      break;
      
    case 'message':
      if (!value) {
        isValid = false;
        errorMessage = 'Please enter your message';
      } else if (value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters';
      }
      break;
  }
  
  if (!isValid) {
    field.classList.add('error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('show');
  } else {
    field.classList.remove('error');
    errorElement.classList.remove('show');
    errorElement.textContent = '';
  }
  
  return isValid;
}

function clearErrorOnInput(event) {
  const field = event.target;
  const errorElement = document.getElementById(field.name + 'Error');
  
  field.classList.remove('error');
  errorElement.classList.remove('show');
  errorElement.textContent = '';
}

// === FORM SUBMISSION ===
async function handleFormSubmit(event) {
  event.preventDefault();
  
  // Validate all fields
  const inputs = event.target.querySelectorAll('input, textarea');
  let isFormValid = true;
  
  inputs.forEach(input => {
    if (!validateField({ target: input })) {
      isFormValid = false;
    }
  });
  
  if (!isFormValid) {
    showNotification('Please fix the errors above', 'error');
    return;
  }
  
  // Get form data
  const formData = new FormData(event.target);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
    timestamp: new Date().toISOString()
  };
  
  // Submit form (using Formspree or similar service)
  try {
    // Example: Using Formspree (replace with your endpoint)
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
      event.target.reset();
      inputs.forEach(input => input.classList.remove('error'));
    } else {
      showNotification('Failed to send message. Please try again.', 'error');
    }
  } catch (error) {
    // Fallback: Log to console if no backend
    console.log('Form data:', data);
    showNotification('Thank you! Your message has been received. (Demo mode)', 'success');
    event.target.reset();
    inputs.forEach(input => input.classList.remove('error'));
  }
}

// === NOTIFICATION SYSTEM ===
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <p>${message}</p>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Add notification styles dynamically if not in CSS
  if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 400px;
        padding: 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
      }
      
      .notification-success {
        background-color: #10b981;
        color: white;
      }
      
      .notification-error {
        background-color: #ef4444;
        color: white;
      }
      
      .notification-info {
        background-color: #3b82f6;
        color: white;
      }
      
      .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
      }
      
      .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
      }
      
      @media (max-width: 768px) {
        .notification {
          right: 10px;
          left: 10px;
          max-width: none;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// === HELPER FUNCTIONS ===
function sanitizeInput(input) {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
