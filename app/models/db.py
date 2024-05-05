from flask_sqlalchemy import SQLAlchemy

import os
is_production = os.environ.get('FLASK_DEBUG') == '0'
SCHEMA = os.environ.get("SCHEMA")


db = SQLAlchemy()

# helper function for adding prefix to foreign key column references in production
def add_prefix_for_prod(attr):
    if is_production:
        return f"{SCHEMA}.{attr}"
    else:
        return attr
