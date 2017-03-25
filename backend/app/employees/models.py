from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app import db
from app.models import BaseModel


class Employee(BaseModel):
    __tablename__ = 'employees'

    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    birth_date = db.Column(db.Date, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(120), unique=True, nullable=False)
    employments = relationship('Employment', back_populates='employee', cascade='all, delete-orphan')
    current_employment_id = db.Column(UUID, db.ForeignKey('employments.id'))
    current_employment = relationship('Employment', cascade='all, delete-orphan')
