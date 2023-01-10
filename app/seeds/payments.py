from app.models import db, Payment, environment, SCHEMA
import datetime

def seed_payments():
    payment1 = Payment(
        user_id=1, provider="Visa", account_number="1234567891011121", expiration=datetime.date(2023,1,1)
    )
    payment2 = Payment(
        user_id=1, provider="Mastercard", account_number="1321321321329999", expiration=datetime.date(2023,2,3)
    )
    payment3 = Payment(
        user_id=2, provider="Visa", account_number="4421321324429999", expiration=datetime.date(2023,5,7)
    )

    db.session.add_all([payment1,payment2,payment3])
    db.session.commit()

def undo_payments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.payments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM payments")

    db.session.commit()