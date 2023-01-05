from app.models import db, Payment, environment, SCHEMA
import datetime

def seed_payments():
    payment1 = Payment(
        user_id=1, provider="Visa", account_number="1234567891011121", expiration=datetime.date(2023,1,1)
    )
    
    db.session.add(payment1)
    
    db.session.commit()

def undo_payments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.payments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM payments")

    db.session.commit()