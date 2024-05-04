from flask_sqlalchemy import SQLAlchemy

import os
is_production = not os.getenv("FLASK_DEBUG")
SCHEMA = os.environ.get("SCHEMA")


db = SQLAlchemy()

# helper function for adding prefix to foreign key column references in production
def add_prefix_for_prod(attr):
    if is_production:
        return f"{SCHEMA}.{attr}"
    else:
        return attr
