from contextlib import asynccontextmanager
from datetime import datetime, timezone
from typing import AsyncIterator
import time

from fastapi import FastAPI, Form, status
from fastapi.responses import JSONResponse
from typing_extensions import TypedDict

from services.database import JSONDatabase


class Quote(TypedDict):
    name: str
    message: str
    time: str


database: JSONDatabase[list[Quote]] = JSONDatabase("data/database.json")


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Handle database management when running app."""
    if "quotes" not in database:
        print("Adding quotes entry to database")
        database["quotes"] = []

    yield

    database.close()


app = FastAPI(lifespan=lifespan)


@app.post("/quote")
def post_message(name: str = Form(), message: str = Form()) -> JSONResponse:
    """
    Process a user submitting a new quote.
    You should not modify this function except for the return value.
    """
    now = datetime.now(timezone.utc) # record UTC time
    quote = Quote(name=name, message=message, time=now.isoformat(timespec="seconds"))
    database["quotes"].append(quote)

    return JSONResponse({"status": "success"})

@app.post("/history")
def quote_history(span: int = Form(ge=-1, le=365)) -> JSONResponse:
	resp = []
	ct = time.time()
	diff = span * 86400
	if diff >= 0:
		for q in reversed(database["quotes"]):
			qt = time.mktime(datetime.fromisoformat(q["time"]).timetuple())
			if ct - qt < diff:
				resp.append(q)
	else:
		resp = list(reversed(database["quotes"]))
	return JSONResponse({"quotes": resp})
