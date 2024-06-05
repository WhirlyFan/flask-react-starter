from sqlalchemy import text
from app.models import db, User, is_production, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(username="Demo", email="demo@test.com", password="password")
    marnie = User(username="Marnie", email="marnie@test.com", password="password")
    bobbie = User(username="Bobbie", email="bobbie@test.com", password="password")
    whirlyfan = User(username="Whirlyfan", email="whirly@test.com", password="password")

    db.session.add_all([demo, marnie, bobbie, whirlyfan])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if is_production:
        db.session.execute(text(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;"))
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
