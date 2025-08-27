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