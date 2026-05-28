import os
import sys

# Make backend importable from the api/ directory
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

from starlette.applications import Starlette  # noqa: E402 (fastapi dep, already installed)
from starlette.routing import Mount  # noqa: E402

from app.main import app as _fastapi_app  # noqa: E402

# Mount FastAPI under /api so Starlette strips the prefix before forwarding.
# Vercel routes /api/* to this file with the original path intact.
# Starlette matches /api, strips it, and FastAPI sees /personas, /health, etc.
app = Starlette(routes=[Mount("/api", _fastapi_app)])
