from fastapi import FastAPI

app = FastAPI()

# Routers will be included here

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI backend!"} 