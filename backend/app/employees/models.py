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
    current_employment_id = db.Column(UUID, db.ForeignKey('employments.id'))
    current_employment = relationship(
        'Employment',
        foreign_keys=current_employment_id,
        cascade='all, delete-orphan',
        single_parent=True)
    employments = relationship(
        'Employment',
        foreign_keys='Employment.employee_id',
        back_populates='employee',
        cascade='all, delete-orphan')

    def works_in_department(self, department_id):
        return self.current_employment and self.current_employment.department_id == department_id
