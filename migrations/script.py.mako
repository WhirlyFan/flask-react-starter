"""${message}

Revision ID: ${up_revision}
Revises: ${down_revision | comma,n}
Create Date: ${create_date}

"""
from alembic import op
import sqlalchemy as sa
import os
is_production = os.environ.get('FLASK_DEBUG') == '0'
SCHEMA = os.environ.get("SCHEMA")
${imports if imports else ""}

# revision identifiers, used by Alembic.
revision = ${repr(up_revision)}
down_revision = ${repr(down_revision)}
branch_labels = ${repr(branch_labels)}
depends_on = ${repr(depends_on)}


def upgrade():
    ${upgrades if upgrades else "pass"}
    # Remove this line of code after table_name has been added
    print("ADD APPLICABLE TABLE FOR MODIFIED SCHEMA FOR PRODUCTION!!")
    # table_name = ""
    if is_production:
        op.execute(sa.text(f"ALTER TABLE {table_name} SET SCHEMA {SCHEMA};"))

def downgrade():
    ${downgrades if downgrades else "pass"}
