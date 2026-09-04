from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User


def hash_password(password):
    """Hash a password using werkzeug security."""
    return generate_password_hash(password, method='pbkdf2:sha256')


def verify_password(password_hash, password):
    """Verify a password against its hash."""
    return check_password_hash(password_hash, password)


def create_or_get_admin_user():
    """Create default admin user if it doesn't exist."""
    admin = User.query.filter_by(username='admin').first()
    if not admin:
        admin = User(
            username='admin',
            password_hash=hash_password('admin123'),
            role='admin'
        )
        db.session.add(admin)
        db.session.commit()
        print("✓ Admin user created (admin/admin123)")
    return admin


def authenticate_user(username, password):
    """Authenticate user by username and password."""
    user = User.query.filter_by(username=username).first()
    if user and verify_password(user.password_hash, password):
        return user
    return None
