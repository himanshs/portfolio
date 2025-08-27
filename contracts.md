# API Contracts - Portfolio Backend Integration

## Overview
This document outlines the backend API contracts needed to replace mock functionality with real backend services for email handling and visitor tracking.

## Current Mock Data (to be replaced)
- Contact form submission (currently shows success message without backend)
- Static visitor count display (need real-time tracking)

## Backend Endpoints to Implement

### 1. Email Management
**POST /api/contact**
```json
Request:
{
  "name": "string",
  "email": "string", 
  "subject": "string",
  "message": "string"
}

Response:
{
  "success": true,
  "message": "Email received successfully",
  "id": "email_id"
}
```

**GET /api/contact** (Admin view - optional)
```json
Response:
{
  "emails": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "subject": "string", 
      "message": "string",
      "timestamp": "datetime",
      "read": boolean
    }
  ]
}
```

### 2. Visitor Tracking
**POST /api/visitors/track**
```json
Request:
{
  "page": "string",
  "user_agent": "string",
  "ip": "string" (optional)
}

Response:
{
  "success": true,
  "total_visitors": number
}
```

**GET /api/visitors/count**
```json
Response:
{
  "total_visitors": number,
  "unique_visitors": number,
  "today_visitors": number
}
```

## Database Models

### ContactEmail Model
```python
class ContactEmail(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    read: bool = False
    ip_address: Optional[str] = None
```

### Visitor Model
```python
class Visitor(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    page: str = "/"
    user_agent: Optional[str] = None
    ip_address: Optional[str] = None
    session_id: Optional[str] = None
```

## Frontend Integration Changes

### Contact Form (ContactForm.js)
- Remove mock setTimeout simulation
- Replace with actual API call to `/api/contact`
- Handle real success/error responses
- Show proper error messages if API fails

### Visitor Counter
- Add visitor tracking on page load in Portfolio.js
- Display real-time visitor count in hero or footer section
- Call `/api/visitors/track` on component mount
- Fetch and display count from `/api/visitors/count`

## Implementation Steps
1. Create database models in backend
2. Implement API endpoints
3. Update frontend to use real API calls
4. Test email logging functionality
5. Test visitor tracking and display

## Notes
- Email logging system ready for easy migration to real email service later
- Visitor tracking respects privacy (no personal data stored)
- All endpoints follow existing API structure with `/api` prefix
- Error handling included for robust user experience --status