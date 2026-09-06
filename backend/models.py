from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=True)
    full_name = db.Column(db.String(120), nullable=True)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=False, default='analyst')  # admin, analyst, investigator
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email or '',
            'full_name': self.full_name or self.username,
            'role': self.role,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

    def __repr__(self):
        return f'<User {self.username}>'


class Transaction(db.Model):
    __tablename__ = 'transactions'
    
    id = db.Column(db.Integer, primary_key=True)
    transaction_id = db.Column(db.String(50), unique=True, nullable=False)
    customer_id = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    transaction_time = db.Column(db.String(100), nullable=False)
    merchant_category = db.Column(db.String(100), nullable=False)
    payment_method = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    device_type = db.Column(db.String(50), nullable=False)
    transaction_frequency = db.Column(db.Integer, nullable=False)
    average_spending = db.Column(db.Float, nullable=False)
    previous_transaction_amount = db.Column(db.Float, nullable=False)
    distance_from_previous_location = db.Column(db.Float, nullable=False)
    
    # Prediction results
    prediction = db.Column(db.String(20), nullable=True)  # Fraud or Not Fraud
    risk_score = db.Column(db.Float, nullable=True)
    confidence = db.Column(db.Float, nullable=True)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationship to SHAP explanations
    shap_explanations = db.relationship('ShapExplanation', backref='transaction', lazy=True, cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<Transaction {self.transaction_id}>'


class ShapExplanation(db.Model):
    __tablename__ = 'shap_explanations'
    
    id = db.Column(db.Integer, primary_key=True)
    transaction_id = db.Column(db.String(50), db.ForeignKey('transactions.transaction_id'), nullable=False)
    feature_name = db.Column(db.String(100), nullable=False)
    feature_value = db.Column(db.String(100), nullable=False)
    shap_value = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<ShapExplanation {self.transaction_id} - {self.feature_name}>'
