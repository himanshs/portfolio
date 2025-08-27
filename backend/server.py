from fastapi import FastAPI, APIRouter, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime

# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactEmail(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    read: bool = False
    ip_address: Optional[str] = None

class ContactEmailCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class Visitor(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    page: str = "/"
    user_agent: Optional[str] = None
    ip_address: Optional[str] = None
    session_id: Optional[str] = None

class VisitorTrack(BaseModel):
    page: str = "/"
    user_agent: Optional[str] = None

class VisitorCount(BaseModel):
    total_visitors: int
    unique_visitors: int
    today_visitors: int

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Contact Email Routes
@api_router.post("/contact")
async def create_contact_email(email_data: ContactEmailCreate, request: Request):
    try:
        # Get client IP address
        client_ip = request.client.host
        
        # Create email record
        email_dict = email_data.dict()
        email_dict[\'ip_address\'] = client_ip
        email_obj = ContactEmail(**email_dict)
        
        # Save to database
        result = await db.contact_emails.insert_one(email_obj.dict())
        
        logger.info(f"Contact email received from {email_data.name} ({email_data.email})")
        
        return {
            "success": True,
            "message": "Email received successfully! I\'ll get back to you soon.",
            "id": email_obj.id
        }
    except Exception as e:
        logger.error(f"Error saving contact email: {str(e)}")
        return {
            "success": False,
            "message": "Sorry, there was an error sending your message. Please try again.",
            "error": str(e)
        }

@api_router.get("/contact", response_model=List[ContactEmail])
async def get_contact_emails():
    try:
        emails = await db.contact_emails.find().sort("timestamp", -1).to_list(1000)
        return [ContactEmail(**email) for email in emails]
    except Exception as e:
        logger.error(f"Error fetching contact emails: {str(e)}")
        return []

# Visitor Tracking Routes
@api_router.post("/visitors/track")
async def track_visitor(visitor_data: VisitorTrack, request: Request):
    try:
        # Get client info
        client_ip = request.client.host
        user_agent = request.headers.get("user-agent", "")
        
        # Create visitor record
        visitor_dict = visitor_data.dict()
        visitor_dict[\'ip_address\'] = client_ip
        visitor_dict[\'user_agent\'] = user_agent
        visitor_obj = Visitor(**visitor_dict)
        
        # Save to database
        await db.visitors.insert_one(visitor_obj.dict())
        
        # Get total visitor count
        total_visitors = await db.visitors.count_documents({})
        
        logger.info(f"Visitor tracked: {client_ip} on page {visitor_data.page}")
        
        return {
            "success": True,
            "total_visitors": total_visitors
        }
    except Exception as e:
        logger.error(f"Error tracking visitor: {str(e)}")
        return {
            "success": False,
            "total_visitors": 0
        }

@api_router.get("/visitors/count", response_model=VisitorCount)
async def get_visitor_count():
    try:
        # Total visitors
        total_visitors = await db.visitors.count_documents({})
        
        # Unique visitors by IP
        pipeline = [
            {"$group": {"_id": "$ip_address"}},
            {"$count": "unique_count"}
        ]
        unique_result = await db.visitors.aggregate(pipeline).to_list(1)
        unique_visitors = unique_result[0]["unique_count"] if unique_result else 0
        
        # Today\'s visitors
        today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
        today_visitors = await db.visitors.count_documents({
            "timestamp": {"$gte": today_start}
        })
        
        return VisitorCount(
            total_visitors=total_visitors,
            unique_visitors=unique_visitors,
            today_visitors=today_visitors
        )
    except Exception as e:
        logger.error(f"Error getting visitor count: {str(e)}")
        return VisitorCount(
            total_visitors=0,
            unique_visitors=0,
            today_visitors=0
        ) 

    