#!/usr/bin/env python
"""
Database initialization script for FraudNova AI.
Creates tables and populates with default data.
"""

import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(__file__))

from app import app, db
from models import User, Transaction, ShapExplanation
from auth import hash_password


def init_database():
    """Initialize the database with tables and default data."""
    print("Initializing FraudNova AI database...")
    
    with app.app_context():
        # Drop all tables (optional, comment out to preserve existing data)
        # db.drop_all()
        
        # Create all tables
        db.create_all()
        print("✓ Database tables created")
        
        # Create default admin user
        admin = User.query.filter_by(username='admin').first()
        if not admin:
            admin = User(
                username='admin',
                password_hash=hash_password('admin123'),
                role='admin'
            )
            db.session.add(admin)
            db.session.commit()
            print("✓ Admin user created (username: admin, password: admin123)")
        else:
            print("✓ Admin user already exists")
        
        # Check if demo transactions already exist
        existing_count = Transaction.query.count()
        if existing_count == 0:
            # Add a few demo transactions
            demo_txns = [
                {
                    "transaction_id": "TXN1001",
                    "customer_id": "CUST1001",
                    "amount": 2500,
                    "transaction_time": "2026-08-01 10:30",
                    "merchant_category": "Electronics",
                    "payment_method": "Credit Card",
                    "location": "Mumbai",
                    "device_type": "Known Device",
                    "transaction_frequency": 1,
                    "average_spending": 2000,
                    "previous_transaction_amount": 1200,
                    "distance_from_previous_location": 5,
                    "prediction": "Not Fraud",
                    "risk_score": 5,
                    "confidence": 0.95
                },
                {
                    "transaction_id": "TXN1002",
                    "customer_id": "CUST1002",
                    "amount": 85000,
                    "transaction_time": "2026-08-01 10:31",
                    "merchant_category": "Electronics",
                    "payment_method": "Credit Card",
                    "location": "Delhi",
                    "device_type": "New Device",
                    "transaction_frequency": 2,
                    "average_spending": 15000,
                    "previous_transaction_amount": 1200,
                    "distance_from_previous_location": 850,
                    "prediction": "Fraud",
                    "risk_score": 94,
                    "confidence": 0.945
                },
                {
                    "transaction_id": "TXN1003",
                    "customer_id": "CUST1003",
                    "amount": 1200,
                    "transaction_time": "2026-08-01 10:32",
                    "merchant_category": "Grocery",
                    "payment_method": "Debit Card",
                    "location": "Mumbai",
                    "device_type": "Known Device",
                    "transaction_frequency": 3,
                    "average_spending": 1500,
                    "previous_transaction_amount": 800,
                    "distance_from_previous_location": 2,
                    "prediction": "Not Fraud",
                    "risk_score": 8,
                    "confidence": 0.92
                },
            ]
            
            for txn_data in demo_txns:
                txn = Transaction(**txn_data)
                db.session.add(txn)
            
            db.session.commit()
            print(f"✓ {len(demo_txns)} demo transactions inserted")
        else:
            print(f"✓ Database already contains {existing_count} transactions")
        
        print("\n✓ Database initialization complete")
        print(f"Database location: {os.path.join(os.path.dirname(__file__), 'fraudnova.db')}")


if __name__ == '__main__':
    init_database()
